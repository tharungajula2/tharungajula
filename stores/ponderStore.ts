"use client";

import { create } from "zustand";
import { 
  PonderDocument, 
  PonderChunk, 
  PonderDocumentStatus, 
  ActiveMobilePanel, 
  PonderSearchResult, 
  VectorStoreStats,
  PonderChatMessage,
  PonderTraceStep,
  PonderCitation,
  PonderConfidence
} from "@/types/ponder";
import { createDocumentFromText } from "@/lib/ponder/rag";

interface PonderState {
  // Existing client-side state
  documents: PonderDocument[];
  chunks: PonderChunk[];
  selectedDocumentId: string | null;
  documentError: string | null;
  activeMobilePanel: ActiveMobilePanel;

  // Embedding & Search state
  sessionId: string;
  isEmbedding: boolean;
  embeddingError: string | null;
  searchQuery: string;
  isSearching: boolean;
  searchResults: PonderSearchResult[];
  searchError: string | null;
  vectorStats: VectorStoreStats | null;

  // New Live Agent Reasoner state
  chatMessages: PonderChatMessage[];
  isAgentThinking: boolean;
  agentError: string | null;
  currentTraceSteps: PonderTraceStep[];
  citations: PonderCitation[];
  latestConfidence: PonderConfidence | null;

  // Existing Actions
  addDocumentFromText: (title: string, content: string, sourceType: "paste" | "file") => boolean;
  removeDocument: (documentId: string) => void;
  clearDocuments: () => void;
  setSelectedDocument: (documentId: string | null) => void;
  setActiveMobilePanel: (panel: ActiveMobilePanel) => void;
  clearDocumentError: () => void;

  // Embedding & Search Actions
  setDocumentStatus: (documentId: string, status: PonderDocumentStatus) => void;
  embedDocument: (documentId: string) => Promise<boolean>;
  embedAllDocuments: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  runSemanticSearch: (query: string) => Promise<void>;
  clearSearchResults: () => void;
  clearSearchError: () => void;

  // New Live Agent Actions
  askPonder: (question: string) => Promise<boolean>;
  clearAgentError: () => void;
  resetConversation: () => void;
  addTraceStep: (step: PonderTraceStep) => void;
  setLatestConfidence: (confidence: PonderConfidence | null) => void;
}

// Client-safe secure random UUID generator with timestamp fallbacks
const generateSessionId = (): string => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const usePonderStore = create<PonderState>((set, get) => ({
  // 1. STATE INITIALIZATION
  documents: [],
  chunks: [],
  selectedDocumentId: null,
  documentError: null,
  activeMobilePanel: "chat",

  sessionId: generateSessionId(),
  isEmbedding: false,
  embeddingError: null,
  searchQuery: "",
  isSearching: false,
  searchResults: [],
  searchError: null,
  vectorStats: null,

  // New live chat variables
  chatMessages: [],
  isAgentThinking: false,
  agentError: null,
  currentTraceSteps: [],
  citations: [],
  latestConfidence: null,

  // 2. CORE ACTIONS
  addDocumentFromText: (title: string, content: string, sourceType: "paste" | "file") => {
    const trimmed = content.trim();
    if (!trimmed || trimmed.length < 5) {
      set({ documentError: "Document content is too short (minimum 5 characters)." });
      return false;
    }

    const currentDocsCount = get().documents.length;
    if (currentDocsCount >= 5) {
      set({ documentError: "Context capacity reached (maximum 5 documents allowed)." });
      return false;
    }

    if (content.length > 50000) {
      set({ documentError: "Document exceeds maximum size of 50,000 characters." });
      return false;
    }

    try {
      const { document, chunks } = createDocumentFromText(title, content, sourceType);
      
      set((state) => ({
        documents: [...state.documents, document],
        chunks: [...state.chunks, ...chunks],
        selectedDocumentId: state.selectedDocumentId || document.id,
        documentError: null,
      }));
      
      return true;
    } catch (err: any) {
      set({ documentError: err.message || "Failed to process and index document locally." });
      return false;
    }
  },

  removeDocument: (documentId: string) => {
    const sessionId = get().sessionId;
    
    // Synchronize vector store index cleanup with the server
    fetch(`/api/ponder/embed?sessionId=${sessionId}&documentId=${documentId}`, {
      method: "DELETE"
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.stats) {
          set({ vectorStats: data.stats });
        }
      }
    }).catch((err) => {
      console.warn("[Server Vector Ingestion Purge Warn]:", err);
    });

    set((state) => {
      const filteredDocs = state.documents.filter((d) => d.id !== documentId);
      const filteredChunks = state.chunks.filter((c) => c.documentId !== documentId);
      
      let nextSelected = state.selectedDocumentId;
      if (state.selectedDocumentId === documentId) {
        nextSelected = filteredDocs.length > 0 ? filteredDocs[0].id : null;
      }

      return {
        documents: filteredDocs,
        chunks: filteredChunks,
        selectedDocumentId: nextSelected,
      };
    });

    // Clean up stats locally if store becomes completely empty
    if (get().documents.length === 0) {
      set({ 
        vectorStats: null, 
        searchResults: [], 
        chatMessages: [], 
        currentTraceSteps: [],
        citations: [],
        latestConfidence: null
      });
    }
  },

  clearDocuments: () => {
    const sessionId = get().sessionId;
    
    // Purge the entire session context on the server
    fetch(`/api/ponder/embed?sessionId=${sessionId}`, {
      method: "DELETE"
    }).catch((err) => {
      console.warn("[Server Vector Session Purge Warn]:", err);
    });

    set({
      documents: [],
      chunks: [],
      selectedDocumentId: null,
      documentError: null,
      searchResults: [],
      vectorStats: null,
      chatMessages: [],
      currentTraceSteps: [],
      citations: [],
      latestConfidence: null
    });
  },

  setSelectedDocument: (documentId: string | null) => {
    set({ selectedDocumentId: documentId });
  },

  setActiveMobilePanel: (panel: ActiveMobilePanel) => {
    set({ activeMobilePanel: panel });
  },

  clearDocumentError: () => {
    set({ documentError: null });
  },

  setDocumentStatus: (documentId: string, status: PonderDocumentStatus) => {
    set((state) => ({
      documents: state.documents.map((d) => 
        d.id === documentId ? { ...d, status } : d
      )
    }));
  },

  // 3. ASYNC EMBEDDING ACTION
  embedDocument: async (documentId: string): Promise<boolean> => {
    const doc = get().documents.find((d) => d.id === documentId);
    if (!doc) return false;

    // Transition status to 'embedding' loading indicator
    get().setDocumentStatus(documentId, "embedding");
    set({ isEmbedding: true, embeddingError: null });

    try {
      const response = await fetch("/api/ponder/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: get().sessionId,
          document: {
            id: doc.id,
            title: doc.title,
            content: doc.content,
            sourceType: doc.sourceType
          }
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP Ingestion Error (Status ${response.status})`);
      }

      // Success transitions: set to 'embedded'
      get().setDocumentStatus(documentId, "embedded");
      set({ 
        vectorStats: data.stats,
        isEmbedding: false 
      });
      return true;

    } catch (err: any) {
      console.error("[Store Embed Ingestion Failure]:", err);
      get().setDocumentStatus(documentId, "embedding_error");
      set({ 
        embeddingError: err.message || "Failed to embed document via server APIs.",
        isEmbedding: false 
      });
      return false;
    }
  },

  embedAllDocuments: async () => {
    const targets = get().documents.filter(
      (d) => d.status === "indexed_local" || d.status === "embedding_error"
    );
    if (targets.length === 0) return;

    await Promise.all(targets.map((d) => get().embedDocument(d.id)));
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  runSemanticSearch: async (query: string) => {
    if (!query.trim()) return;

    set({ isSearching: true, searchError: null, searchResults: [] });

    try {
      const response = await fetch("/api/ponder/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: get().sessionId,
          query,
          maxResults: 3
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP Search Error (Status ${response.status})`);
      }

      set({ 
        searchResults: data.results,
        vectorStats: data.stats,
        isSearching: false 
      });

    } catch (err: any) {
      console.error("[Store Vector Search Failure]:", err);
      set({ 
        searchError: err.message || "Query retrieval request failed.",
        isSearching: false 
      });
    }
  },

  clearSearchResults: () => {
    set({ searchResults: [], searchQuery: "" });
  },

  clearSearchError: () => {
    set({ searchError: null });
  },

  // 4. LIVE COGNITIVE AGENT ACTIONS
  askPonder: async (question: string): Promise<boolean> => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return false;

    // Check embedding status guard
    const hasEmbeddedDocs = get().documents.some((d) => d.status === "embedded");
    if (!hasEmbeddedDocs) {
      set({ agentError: "Please embed at least one document before asking Ponder." });
      return false;
    }

    set({ isAgentThinking: true, agentError: null });

    // Instantly append Visitor User message
    const userMsgId = `msg-${Date.now()}-user`;
    const visitorMessage: PonderChatMessage = {
      id: userMsgId,
      role: "user",
      content: trimmedQuestion
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, visitorMessage]
    }));

    // Inject initial planning step onto trace timeline
    set({
      currentTraceSteps: [
        {
          id: "step-init-planning",
          type: "planning",
          title: "Planning request",
          detail: `Received visitor question. Initiating cognitive retrieval loop.`,
          duration: "0.1s",
          status: "active"
        }
      ]
    });

    try {
      const response = await fetch("/api/ponder/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: get().sessionId,
          question: trimmedQuestion
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Agent Ingestion Error (Status ${response.status})`);
      }

      // Append parsed assistant bubble
      const assistantMsg: PonderChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: data.answer,
        citations: data.citations,
        confidence: data.confidence
      };

      set((state) => ({
        chatMessages: [...state.chatMessages, assistantMsg],
        currentTraceSteps: data.traceSteps,
        citations: data.citations,
        latestConfidence: data.confidence,
        vectorStats: data.stats,
        isAgentThinking: false
      }));

      return true;

    } catch (err: any) {
      console.error("[Agent Dialogue Failure]:", err);
      
      const assistantErrorMsg: PonderChatMessage = {
        id: `msg-${Date.now()}-assistant-error`,
        role: "assistant",
        content: `Error: ${err.message || "Failed to communicate with Ponder reasoning agent."}`
      };

      set((state) => ({
        chatMessages: [...state.chatMessages, assistantErrorMsg],
        agentError: err.message || "Failed to compile agent answer.",
        isAgentThinking: false
      }));
      
      return false;
    }
  },

  clearAgentError: () => {
    set({ agentError: null });
  },

  resetConversation: () => {
    set({
      chatMessages: [],
      currentTraceSteps: [],
      citations: [],
      latestConfidence: null,
      agentError: null,
      isAgentThinking: false
    });
  },

  addTraceStep: (step: PonderTraceStep) => {
    set((state) => ({
      currentTraceSteps: [...state.currentTraceSteps, step]
    }));
  },

  setLatestConfidence: (confidence: PonderConfidence | null) => {
    set({ latestConfidence: confidence });
  }
}));
