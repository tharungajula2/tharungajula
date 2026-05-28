import { PonderChunk } from "@/types/ponder";

// 1. SPECIFICATION OF EMBEDDED CHUNK ENTRY IN MEMORY
export interface StoredVectorChunk {
  sessionId: string;
  documentId: string;
  documentTitle: string;
  chunkId: string;
  chunkIndex: number;
  content: string;
  embedding: number[];
  wordCount: number;
  charCount: number;
  createdAt: string;
}

// 2. CORE VECTOR STORE CONTROLLER
export class VectorStore {
  // In-memory array of vector chunks
  private store: StoredVectorChunk[] = [];

  constructor() {
    console.log("[Ponder VectorStore] In-memory database singleton initialized.");
  }

  // Pure cosine similarity implementation (dot product divided by magnitudes)
  public cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  public addChunks(
    sessionId: string,
    documentId: string,
    documentTitle: string,
    chunks: PonderChunk[],
    embeddings: number[][]
  ): void {
    if (chunks.length !== embeddings.length) {
      throw new Error("Vector Store Error: Mismatch between chunk counts and embeddings vectors.");
    }

    // Overwrite document: remove any pre-existing chunks for the same sessionId + documentId
    this.removeByDocument(sessionId, documentId);

    const now = new Date().toISOString();
    const storedChunks: StoredVectorChunk[] = chunks.map((chunk, i) => ({
      sessionId,
      documentId,
      documentTitle,
      chunkId: chunk.id,
      chunkIndex: chunk.chunkIndex,
      content: chunk.content,
      embedding: embeddings[i],
      wordCount: chunk.wordCount,
      charCount: chunk.charCount,
      createdAt: now,
    }));

    this.store.push(...storedChunks);
    console.log(`[Ponder VectorStore] Ingested ${storedChunks.length} embedded chunks for "${documentTitle}" under session "${sessionId}". Store aggregate: ${this.store.length}`);
  }

  public search(
    sessionId: string,
    queryEmbedding: number[],
    maxResults: number = 5
  ) {
    // Filter strictly by the current user's session ID to isolate contexts
    const sessionChunks = this.store.filter((chunk) => chunk.sessionId === sessionId);

    // Map and score via cosine similarity
    const scoredResults = sessionChunks.map((chunk) => {
      const score = this.cosineSimilarity(queryEmbedding, chunk.embedding);
      return {
        score,
        documentTitle: chunk.documentTitle,
        chunkIndex: chunk.chunkIndex,
        content: chunk.content,
      };
    });

    // Sort descending by similarity score
    return scoredResults
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }

  public removeByDocument(sessionId: string, documentId: string): void {
    this.store = this.store.filter(
      (chunk) => !(chunk.sessionId === sessionId && chunk.documentId === documentId)
    );
  }

  public removeBySession(sessionId: string): void {
    this.store = this.store.filter((chunk) => chunk.sessionId !== sessionId);
  }

  public getStats(sessionId: string) {
    const sessionChunks = this.store.filter((chunk) => chunk.sessionId === sessionId);
    const uniqueDocs = new Set(sessionChunks.map((chunk) => chunk.documentId));

    return {
      sessionId,
      documentCount: uniqueDocs.size,
      chunkCount: sessionChunks.length,
      embeddedChunkCount: sessionChunks.length,
    };
  }
}

// 3. SERVERLESS-SAFE SINGLETON PATTERN
// Ensures that Hot Module Replacement (HMR) or cold serverless runs do not purge our in-memory similarity stores
const globalStore = globalThis as unknown as { vectorStore: VectorStore };
if (!globalStore.vectorStore) {
  globalStore.vectorStore = new VectorStore();
}

export const vectorStore = globalStore.vectorStore;
