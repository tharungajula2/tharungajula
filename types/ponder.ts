export type PonderDocumentStatus = 
  | 'ready' 
  | 'indexing_mock' 
  | 'indexed_local' 
  | 'embedding' 
  | 'embedded' 
  | 'embedding_error'
  | 'error';

export type ActiveMobilePanel = 'chat' | 'trace' | 'docs';

export interface PonderChunk {
  id: string;
  documentId: string;
  documentTitle: string;
  content: string;
  chunkIndex: number;
  sentenceStart: number;
  sentenceEnd: number;
  wordCount: number;
  charCount: number;
}

export interface PonderDocument {
  id: string;
  title: string;
  wordCount: number;
  charCount: number;
  chunkCount: number;
  status: PonderDocumentStatus;
  sourceType: 'paste' | 'file';
  colour: string;
  content: string;
}

export interface PonderCitation {
  id: string;
  marker: string;
  documentTitle: string;
  chunkIndex: number;
  content: string;
  score?: number;
}

export interface PonderChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: PonderCitation[];
  confidence?: PonderConfidence;
  createdAt?: string;
}

export interface PonderMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  confidence?: PonderConfidence;
  citations?: string[];
}

export interface PonderTraceStep {
  id: string;
  type: 'planning' | 'searching' | 'analyzing' | 'evaluating' | 'complete' | 'error' | 'system';
  title: string;
  detail: string;
  duration: string;
  status: 'complete' | 'active' | 'pending' | 'error';
}

export interface PonderConfidence {
  faithfulness: number;
  relevance: number;
  completeness: number;
  overall: number;
}

export interface PonderSearchResult {
  score: number;
  documentTitle: string;
  chunkIndex: number;
  content: string;
}

export interface VectorStoreStats {
  sessionId: string;
  documentCount: number;
  chunkCount: number;
  embeddedChunkCount: number;
}
