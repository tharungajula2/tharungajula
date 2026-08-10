'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MiniSearch from 'minisearch';
import { Search as SearchIcon, X, CornerDownLeft, Clock } from 'lucide-react';

interface SearchDoc {
  id: string;
  type: 'note' | 'deck' | 'case' | 'library';
  title: string;
  parentTitle: string;
  url: string;
  tags: string[];
  snippet: string;
  text: string;
}

export default function SearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<'all' | 'note' | 'deck' | 'case'>('all');
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoadingIndex, setIsLoadingIndex] = useState(false);
  const [docCount, setDocCount] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  const miniSearchRef = useRef<MiniSearch<SearchDoc> | null>(null);
  const docsRef = useRef<SearchDoc[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check window width for responsive placeholder below 640px
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('recentSearches');
      if (raw) setRecentSearches(JSON.parse(raw));
    } catch {}
  }, []);

  // Keyboard shortcut listener (Cmd/Ctrl + K and Esc) + Custom Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-notebook-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-notebook-search', handleCustomOpen);
    };
  }, [isOpen]);

  // Lazy-load search index when modal opens for the first time
  useEffect(() => {
    if (!isOpen || miniSearchRef.current) return;

    setIsLoadingIndex(true);
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((docs: SearchDoc[]) => {
        docsRef.current = docs;
        setDocCount(docs.length);

        const ms = new MiniSearch<SearchDoc>({
          fields: ['title', 'parentTitle', 'snippet', 'text'],
          storeFields: ['id', 'type', 'title', 'parentTitle', 'url', 'snippet'],
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 3, parentTitle: 2, snippet: 1 },
          },
        });
        ms.addAll(docs);
        miniSearchRef.current = ms;
        setIsLoadingIndex(false);
      })
      .catch((err) => {
        console.error('Failed to load search index:', err);
        setIsLoadingIndex(false);
      });
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Perform search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    if (!miniSearchRef.current) return;

    let hits = miniSearchRef.current.search(query) as unknown as SearchDoc[];

    if (scope !== 'all') {
      hits = hits.filter((h) => h.type === scope);
    }

    setResults(hits.slice(0, 15));
    setSelectedIndex(0);
  }, [query, scope]);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch {}
  };

  const handleSelectResult = (doc: SearchDoc) => {
    saveRecentSearch(query);
    setIsOpen(false);
    router.push(doc.url);
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      }
    }
  };

  const placeholderText = isMobile
    ? 'Search notebooks...'
    : 'Search technical notes, slide decks & case studies...';

  return (
    <>
      {/* SEARCH MODAL DIALOG */}
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md font-sans">
          <div
            className="w-full max-w-2xl bg-surface border border-hairline rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* INPUT & SCOPE BAR */}
            <div className="p-4 border-b border-hairline bg-surface-raised flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <SearchIcon className="w-5 h-5 text-accent shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDownInInput}
                  placeholder={placeholderText}
                  className="w-full bg-transparent text-ink placeholder:text-ink-faint text-base focus:outline-none font-mono"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-ink-faint hover:text-ink p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 text-xs font-mono text-ink-faint hover:text-ink border border-hairline rounded-lg min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* SCOPE SELECTOR TABS (Clean, responsive, bracket-less) */}
              <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto">
                <span className="text-ink-faint text-[10px] uppercase mr-1">Scope:</span>
                <button
                  onClick={() => setScope('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors uppercase min-h-[36px] flex items-center justify-center whitespace-nowrap cursor-pointer ${
                    scope === 'all'
                      ? 'bg-accent text-surface font-bold'
                      : 'bg-surface-sunken text-ink-muted hover:text-ink'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setScope('note')}
                  className={`px-2.5 py-1 rounded-lg transition-colors uppercase min-h-[36px] flex items-center justify-center whitespace-nowrap cursor-pointer ${
                    scope === 'note'
                      ? 'bg-signal text-surface font-bold'
                      : 'bg-surface-sunken text-ink-muted hover:text-ink'
                  }`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setScope('deck')}
                  className={`px-2.5 py-1 rounded-lg transition-colors uppercase min-h-[36px] flex items-center justify-center whitespace-nowrap cursor-pointer ${
                    scope === 'deck'
                      ? 'bg-accent text-surface font-bold'
                      : 'bg-surface-sunken text-ink-muted hover:text-ink'
                  }`}
                >
                  Decks
                </button>
                <button
                  onClick={() => setScope('case')}
                  className={`px-2.5 py-1 rounded-lg transition-colors uppercase min-h-[36px] flex items-center justify-center whitespace-nowrap cursor-pointer ${
                    scope === 'case'
                      ? 'bg-cyan-500 text-surface font-bold'
                      : 'bg-surface-sunken text-ink-muted hover:text-ink'
                  }`}
                >
                  Case Studies
                </button>
              </div>
            </div>

            {/* RESULTS LIST OR INITIAL STATE */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {isLoadingIndex ? (
                <div className="p-8 text-center font-mono text-xs text-ink-muted">
                  Loading search index...
                </div>
              ) : query.trim() === '' ? (
                <div>
                  {recentSearches.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-ink-faint uppercase mb-2">
                        <Clock className="w-3 h-3 text-accent" />
                        <span>Recent Searches</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="px-2.5 py-1 rounded-lg border border-hairline bg-surface-raised font-mono text-xs text-ink-muted hover:text-accent hover:border-accent transition-colors cursor-pointer"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-8 text-center text-ink-faint font-serif text-sm">
                    Type any keyword (e.g. <code className="font-mono text-accent font-semibold">silicon</code>, <code className="font-mono text-accent font-semibold">kv cache</code>, <code className="font-mono text-accent font-semibold">retrieval</code>) to search across all notebooks.
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-ink-faint font-mono text-xs">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((doc, idx) => (
                  <div
                    key={doc.id}
                    onClick={() => handleSelectResult(doc)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      idx === selectedIndex
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-hairline bg-surface-raised hover:border-hairline-faint'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                        {doc.parentTitle}
                      </span>
                      <CornerDownLeft className="w-3 h-3 text-ink-faint" />
                    </div>

                    <h4 className="text-sm font-bold text-ink uppercase tracking-tight mb-1">
                      {doc.title}
                    </h4>

                    {doc.snippet && (
                      <p className="text-xs font-serif text-ink-muted line-clamp-2 leading-relaxed">
                        {doc.snippet}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="px-4 py-2 border-t border-hairline bg-surface-sunken flex items-center justify-between text-[10px] font-mono text-ink-faint">
              <span>Use ↑ ↓ to navigate · Enter to select · Esc to close</span>
              <span>{results.length} {results.length === 1 ? 'result' : 'results'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
