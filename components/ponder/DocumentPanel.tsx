"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { 
  FileText, 
  Plus, 
  AlertCircle, 
  Sparkles, 
  Trash2, 
  UploadCloud,
  FileType,
  Database,
  CheckCircle2
} from "lucide-react";
import { usePonderStore } from "@/stores/ponderStore";

export default function DocumentPanel() {
  const { 
    documents, 
    addDocumentFromText, 
    removeDocument, 
    documentError, 
    clearDocumentError,
    embedDocument,
    embedAllDocuments,
    isEmbedding,
    embeddingError
  } = usePonderStore();

  // Paste Input State
  const [pasteContent, setPasteContent] = useState("");
  const [pasteTitle, setPasteTitle] = useState("");

  // File Upload Drag State
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. HANDLE PASTE ACTION
  const handlePasteSubmit = () => {
    if (!pasteContent.trim()) {
      return;
    }
    
    const title = pasteTitle.trim() || `Pasted Research Notes #${documents.length + 1}`;
    const success = addDocumentFromText(title, pasteContent, "paste");
    
    if (success) {
      setPasteContent("");
      setPasteTitle("");
      clearDocumentError();
    }
  };

  // 2. HANDLE FILE UPLOAD SYSTEM
  const processUploadedFile = (file: File) => {
    // Validate file type
    const isTxt = file.name.endsWith(".txt");
    const isMd = file.name.endsWith(".md");
    
    if (!isTxt && !isMd) {
      usePonderStore.setState({ 
        documentError: `Unsupported file type "${file.name.slice(file.name.lastIndexOf("."))}". Only .txt or .md files are supported.` 
      });
      return;
    }

    // Validate size limit (50,000 chars roughly equals 50KB-100KB depending on encoding, let's keep it safe)
    if (file.size > 150000) {
      usePonderStore.setState({ 
        documentError: "File is too large. Live system supports up to 50,000 characters." 
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) {
        usePonderStore.setState({ documentError: "Could not read empty file contents." });
        return;
      }
      
      const success = addDocumentFromText(file.name, text, "file");
      if (success) {
        clearDocumentError();
      }
    };
    reader.onerror = () => {
      usePonderStore.setState({ documentError: "File ingestion failed during read process." });
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processUploadedFile(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processUploadedFile(files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Determine top-level embed candidates
  const needsEmbedDocs = documents.filter(
    (d) => d.status === "indexed_local" || d.status === "embedding_error"
  );
  
  // Resolve current general status
  const hasDocuments = documents.length > 0;
  const isCurrentlyEmbedding = documents.some((d) => d.status === "embedding");
  const hasEmbeddingError = documents.some((d) => d.status === "embedding_error") || !!embeddingError;
  const allEmbedded = hasDocuments && documents.every((d) => d.status === "embedded");
  const hasEmbeddedDocs = documents.some((d) => d.status === "embedded");

  let footerStatusLabel = "Local chunks ready";
  let footerStatusDetail = "Local chunking active. Embed documents to vectorize context for reasoning.";
  
  if (!hasDocuments) {
    footerStatusLabel = "Local engine standby";
    footerStatusDetail = "Awaiting source document material to index.";
  } else if (isCurrentlyEmbedding) {
    footerStatusLabel = "Embedding pending";
    footerStatusDetail = "Generating Gemini embeddings and updating vector stores...";
  } else if (hasEmbeddingError) {
    footerStatusLabel = "Embedding failed";
    footerStatusDetail = "Vector generation failed. Check API key settings or try individual retries.";
  } else if (hasEmbeddedDocs) {
    footerStatusLabel = "Agent ready";
    footerStatusDetail = "Cognitive RAG index built. Ponder dialogue interface is fully unlocked.";
  } else {
    footerStatusLabel = "Embed context to unlock agent";
    footerStatusDetail = "Files indexed locally. Embed documents to vectorize context for reasoning.";
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden p-5 space-y-4 select-none">
      
      {/* Title block */}
      <div className="space-y-1 shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold block">
            // DOCUMENT_CONTEXT
          </span>
          <span className="text-[9px] font-mono text-white/30 uppercase">
            {documents.length} / 5 INGESTED
          </span>
        </div>
        <p className="text-[11px] text-white/50 leading-relaxed font-sans">
          Upload or paste source material. Ponder will chunk, embed, retrieve, and cite from this context.
        </p>
      </div>

      {/* ERROR ALERT DISPLAY */}
      {(documentError || embeddingError) && (
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-3 flex gap-2.5 items-start relative shrink-0">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-wider block">
              SYSTEM_ALERT
            </span>
            <p className="text-[10px] text-white/70 leading-relaxed font-sans pr-4">
              {documentError || embeddingError}
            </p>
          </div>
          <button 
            onClick={() => {
              clearDocumentError();
              usePonderStore.setState({ embeddingError: null });
            }}
            className="absolute top-2 right-2 text-white/30 hover:text-white/60 text-[10px] font-mono"
          >
            ×
          </button>
        </div>
      )}

      {/* Ingestion Workspace - Tabs for Paste vs Drop */}
      <div className="space-y-3 shrink-0">
        {/* Upload Dropzone */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`border border-dashed transition-all rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer group ${
            isDragging 
              ? "border-cyan-400 bg-cyan-950/20" 
              : "border-white/10 hover:border-cyan-400/50 bg-zinc-950/30 hover:bg-cyan-950/5"
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.md"
            className="hidden"
          />
          <div className="w-8 h-8 rounded-full bg-cyan-950/30 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors">
            <UploadCloud className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono tracking-wider font-bold text-white/70 uppercase block">
              DROP .TXT / .MD FILES
            </span>
            <span className="text-[9px] font-mono text-cyan-400/40 uppercase block">
              or click to browse local drives
            </span>
          </div>
        </div>

        {/* Paste block */}
        <div className="border border-white/5 bg-zinc-950/50 rounded-xl p-3.5 space-y-3.5">
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block">
              Context Title
            </span>
            <input
              type="text"
              value={pasteTitle}
              onChange={(e) => setPasteTitle(e.target.value)}
              placeholder="Context title (optional)..."
              className="w-full bg-black/40 border border-white/5 rounded-lg px-2.5 py-2 text-[11px] font-mono text-white placeholder:text-white/20 outline-none focus:border-cyan-400/30"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block">
              Paste Content
            </span>
            <textarea
              value={pasteContent}
              onChange={(e) => {
                setPasteContent(e.target.value);
                if (documentError) clearDocumentError();
              }}
              rows={4}
              placeholder="Paste raw technical research notes, markdown pages, or content context here..."
              className="w-full bg-black/40 border border-white/5 rounded-lg p-2.5 text-[11px] font-sans text-white/80 placeholder:text-white/20 outline-none focus:border-cyan-400/30 resize-none min-h-[80px]"
            />
          </div>
          <button
            onClick={handlePasteSubmit}
            disabled={!pasteContent.trim()}
            className={`w-full py-2.5 rounded-xl font-mono text-[9px] font-bold tracking-widest transition-all shrink-0 flex items-center justify-center gap-1.5 uppercase ${
              pasteContent.trim()
                ? "bg-cyan-950/80 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-950 hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                : "bg-white/5 text-white/25 border border-transparent cursor-not-allowed"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>INDEX_CONTEXT</span>
          </button>
        </div>
      </div>

      {/* Document cards list */}
      <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-1">
        <span className="text-[9px] font-mono tracking-wider text-white/30 uppercase block">
          INGESTED_CONTEXTS
        </span>
        
        {/* EMBED_ALL_CONTEXT Trigger button */}
        {needsEmbedDocs.length > 0 && (
          <button
            onClick={embedAllDocuments}
            disabled={isCurrentlyEmbedding}
            className="w-full mb-2.5 px-3 py-2 bg-gradient-to-r from-cyan-950 to-slate-950 hover:from-cyan-900 hover:to-slate-900 border border-cyan-400/30 hover:border-cyan-400/60 rounded-xl font-mono text-[10px] font-bold tracking-widest text-cyan-400 uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isCurrentlyEmbedding ? "animate-spin" : "animate-pulse"}`} />
            <span>EMBED_ALL_CONTEXT ({needsEmbedDocs.length})</span>
          </button>
        )}
        
        {documents.length === 0 ? (
          /* Cinematic empty state */
          <div className="border border-white/5 bg-zinc-950/20 rounded-xl p-6 text-center space-y-2 select-none">
            <FileType className="w-6 h-6 text-white/10 mx-auto" strokeWidth={1.5} />
            <p className="text-[11px] text-white/40 leading-relaxed font-sans max-w-[200px] mx-auto">
              No context indexed yet. Add source material to activate the research workspace.
            </p>
          </div>
        ) : (
          /* Real Document Cards with vectoring controls */
          documents.map((doc) => (
            <div
              key={doc.id}
              className={`border-l-2 ${doc.colour} bg-zinc-950/80 border border-white/5 rounded-r-xl p-3 space-y-2.5 hover:bg-zinc-900/40 transition-all relative overflow-hidden`}
            >
              <div className="absolute right-0 top-0 w-[40px] h-[40px] rounded-full bg-cyan-400/5 blur-xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <FileText className="w-3.5 h-3.5 text-cyan-400/70 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <h4 className="text-xs font-mono font-bold text-white/80 truncate">
                      {doc.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono text-white/40 mt-1">
                      <span className="uppercase text-[8px] bg-white/5 px-1 rounded text-white/50">{doc.sourceType}</span>
                      <span className="text-white/10">•</span>
                      <span>{doc.wordCount.toLocaleString()} W</span>
                      <span className="text-white/10">•</span>
                      <span>{doc.charCount.toLocaleString()} C</span>
                      <span className="text-white/10">•</span>
                      <span>{doc.chunkCount} chunks</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => removeDocument(doc.id)}
                  className="text-white/30 hover:text-red-400/80 p-1 rounded hover:bg-white/5 transition-all shrink-0"
                  title="Remove document context"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
              
              {/* Dynamic Vector status / embedding controls */}
              <div className="flex justify-between items-center pt-2 border-t border-white/5 gap-3">
                
                {/* Embed trigger buttons depending on node states */}
                {doc.status === "indexed_local" && (
                  <button
                    onClick={() => embedDocument(doc.id)}
                    className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-900/40 text-[9px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1 shadow-[0_0_8px_rgba(6,182,212,0.1)]"
                  >
                    <Database className="w-3 h-3" />
                    <span>EMBED</span>
                  </button>
                )}

                {doc.status === "embedding" && (
                  <button
                    disabled
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-white/40 text-[9px] font-mono font-bold tracking-wider uppercase cursor-not-allowed flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                    <span>EMBEDDING...</span>
                  </button>
                )}

                {doc.status === "embedded" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono tracking-wider uppercase font-bold">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    <span>VECTOR_READY</span>
                  </span>
                )}

                {doc.status === "embedding_error" && (
                  <button
                    onClick={() => embedDocument(doc.id)}
                    className="px-2.5 py-1 rounded bg-red-950 border border-red-500/40 text-red-400 hover:bg-red-900/40 text-[9px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>RETRY_EMBED</span>
                  </button>
                )}

                <span className="font-mono text-white/20 text-[9px]">
                  ID: {doc.id.split("-").slice(-1)[0].toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer observability note */}
      <div className="border border-white/5 bg-zinc-900/30 rounded-xl p-3 flex gap-2.5 items-start shrink-0">
        <Database className={`w-3.5 h-3.5 text-cyan-400/60 mt-0.5 shrink-0 ${isCurrentlyEmbedding ? "animate-spin" : "animate-pulse"}`} strokeWidth={1.5} />
        <div className="space-y-0.5">
          <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-bold block uppercase">
            VECTOR_STATUS: {footerStatusLabel}
          </span>
          <p className="text-[9px] text-white/30 font-mono leading-relaxed uppercase">
            {footerStatusDetail}
          </p>
        </div>
      </div>

    </div>
  );
}
