import { PonderDocument, PonderChunk } from "@/types/ponder";

// 1. SIMPLE WHITESPACE-BASED WORD COUNT
export function countWords(text: string): number {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

// 2. STABLE SENTENCE SPLITTER
export function splitIntoSentences(text: string): string[] {
  if (!text) return [];
  
  // Clean raw newlines and double spaces
  const cleanedText = text
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  
  // Standard sentence boundary regex split
  // Looks for terminators (. ! ?) followed by whitespace and an uppercase letter/number or end of string
  const sentences = cleanedText.split(/(?<=[.!?])\s+(?=[A-Z0-9])/g);
  
  return sentences
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// 3. SANITIZE DOCUMENT TITLE
export function sanitizeTitle(rawTitle: string): string {
  if (!rawTitle) return "Untitled Document";
  
  // Remove common extensions
  let cleaned = rawTitle.replace(/\.(txt|md)$/i, "");
  
  // Take first non-empty line
  const lines = cleaned.split(/[\r\n]+/);
  const firstLine = lines.find(line => line.trim().length > 0) || "";
  cleaned = firstLine.trim();
  
  if (!cleaned) return "Untitled Document";
  
  if (cleaned.length > 60) {
    return cleaned.slice(0, 57) + "...";
  }
  
  return cleaned;
}

// 4. OVERLAPPING SLIDING WINDOW CHUNKER (4 sentences size, 1 sentence overlap)
export function chunkDocument(
  documentId: string, 
  title: string, 
  content: string
): PonderChunk[] {
  const sentences = splitIntoSentences(content);
  const totalSentences = sentences.length;
  if (totalSentences === 0) return [];
  
  const chunks: PonderChunk[] = [];
  const chunkSize = 4;
  const overlap = 1;
  
  let startIndex = 0;
  let chunkIndex = 0;
  
  while (startIndex < totalSentences) {
    const endIndex = Math.min(startIndex + chunkSize, totalSentences);
    const chunkSentences = sentences.slice(startIndex, endIndex);
    
    // Skip tiny trailing chunks (e.g. 1 sentence left) when the whole document is large
    if (chunkSentences.length < 2 && totalSentences >= 2 && chunkIndex > 0) {
      break;
    }
    
    const chunkContent = chunkSentences.join(" ");
    const wordCount = countWords(chunkContent);
    const charCount = chunkContent.length;
    
    chunks.push({
      id: `${documentId}-chunk-${chunkIndex}`,
      documentId,
      documentTitle: title,
      content: chunkContent,
      chunkIndex,
      sentenceStart: startIndex,
      sentenceEnd: endIndex - 1,
      wordCount,
      charCount
    });
    
    chunkIndex++;
    startIndex += (chunkSize - overlap);
    
    // Safety guard against infinite loops
    if (chunkSize <= overlap) {
      break;
    }
  }
  
  return chunks;
}

// 5. DOCUMENT CREATION ENGINE
export function createDocumentFromText(
  title: string, 
  content: string, 
  sourceType: "paste" | "file" = "paste"
): { document: PonderDocument; chunks: PonderChunk[] } {
  const docId = `doc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const sanitizedTitle = sanitizeTitle(title);
  const chunks = chunkDocument(docId, sanitizedTitle, content);
  
  const document: PonderDocument = {
    id: docId,
    title: sanitizedTitle,
    wordCount: countWords(content),
    charCount: content.length,
    chunkCount: chunks.length,
    status: "indexed_local",
    sourceType,
    colour: sourceType === "file" ? "border-purple-400/50" : "border-cyan-400/50",
    content // Persist full content for similarity checks in next phase
  };
  
  return { document, chunks };
}
