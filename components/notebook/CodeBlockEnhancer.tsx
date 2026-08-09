'use client';

import { useEffect } from 'react';

export default function CodeBlockEnhancer() {
  useEffect(() => {
    function enhanceCodeBlocks() {
      const figures = document.querySelectorAll('.prose-reading figure[data-rehype-pretty-code-figure], .prose-reading pre');

      figures.forEach((element) => {
        // If element is a pre inside a figure, let figure handle it
        if (element.tagName.toLowerCase() === 'pre' && element.closest('figure[data-rehype-pretty-code-figure]')) {
          return;
        }

        // Avoid adding duplicate headers
        if (element.querySelector('.code-block-header')) {
          return;
        }

        const preElement = element.tagName.toLowerCase() === 'pre' ? element : element.querySelector('pre');
        if (!preElement) return;

        // Detect language
        let lang = 'CODE';
        const langAttr = element.getAttribute('data-language') || preElement.getAttribute('data-language');
        const codeElement = preElement.querySelector('code');
        const classNames = (codeElement?.className || '') + ' ' + (preElement.className || '');
        const langMatch = classNames.match(/language-([a-zA-Z0-9_-]+)/);

        if (langAttr) {
          lang = langAttr.toUpperCase();
        } else if (langMatch && langMatch[1]) {
          lang = langMatch[1].toUpperCase();
        }

        // Create Header Bar
        const header = document.createElement('div');
        header.className = 'code-block-header';

        const langSpan = document.createElement('span');
        langSpan.className = 'code-block-lang';
        langSpan.textContent = lang;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-block-copy-btn';
        copyBtn.setAttribute('type', 'button');
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        copyBtn.innerHTML = `
          <svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="copy-text">Copy</span>
        `;

        copyBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Get clean code text
          const codeText = preElement.textContent || '';

          try {
            await navigator.clipboard.writeText(codeText);
            
            // Visual Feedback
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = `
              <svg class="check-icon text-signal" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span class="copy-text text-signal">Copied!</span>
            `;

            setTimeout(() => {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = `
                <svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span class="copy-text">Copy</span>
              `;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy code:', err);
          }
        });

        header.appendChild(langSpan);
        header.appendChild(copyBtn);

        // Prepend header to element
        element.insertBefore(header, element.firstChild);
      });
    }

    enhanceCodeBlocks();

    // Re-run if DOM updates dynamically
    const observer = new MutationObserver(enhanceCodeBlocks);
    const targetNode = document.querySelector('.prose-reading');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
