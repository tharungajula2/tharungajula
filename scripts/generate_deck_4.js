const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '../content/slides/4_AI_Engineering_Notebook/4_AI_Engineering_Notebook.md');
const outPath = path.join(__dirname, '../content/slides/4_AI_Engineering_Notebook/AI Engineering Stack Master Deck.dc.html');

const mdContent = fs.readFileSync(mdPath, 'utf8');
const lines = mdContent.split('\n');

let slides = [];
let currentSlide = null;
let currentPart = 'PART 0 · ORIENTATION';
let slideCount = 0;

function flushSlide() {
    if (currentSlide) {
        slides.push(currentSlide);
    }
}

let inCodeBlock = false;
let codeBuffer = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# PART ')) {
        currentPart = line.replace('# ', '').replace(' — ', ' · ').toUpperCase();
        continue;
    }

    if (line.startsWith('## ') && line.includes('—')) {
        flushSlide();
        slideCount++;
        const titleMatch = line.match(/## ([\d\.]+) — (.*)/);
        const sectionNum = titleMatch ? titleMatch[1] : '';
        const titleText = titleMatch ? titleMatch[2] : line.replace('## ', '');
        
        currentSlide = {
            num: slideCount,
            sectionLabel: sectionNum,
            title: titleText,
            part: currentPart,
            hero: '',
            blocks: []
        };
        continue;
    }

    if (!currentSlide) continue;

    // Inside a slide
    if (line.startsWith('**In one line.**')) {
        currentSlide.hero = line.replace('**In one line.** ', '');
        continue;
    }

    if (line.startsWith('> **SAY THIS:**') || line.startsWith('> **SAY THIS:**')) {
        let sayThisText = line.replace('> **SAY THIS:** ', '').replace('> **SAY THIS:**', '').trim();
        if (sayThisText.startsWith('"') && sayThisText.endsWith('"')) {
            sayThisText = sayThisText; // keep quotes
        } else {
             sayThisText = `"${sayThisText}"`; // add quotes if missing
        }
        currentSlide.blocks.push({ type: 'say-this', content: sayThisText });
        continue;
    }

    if (line.startsWith('**Failure mode.**')) {
        currentSlide.blocks.push({ type: 'failure', content: line.replace('**Failure mode.** ', '') });
        continue;
    }

    if (line.startsWith('**Why it exists.**')) {
        currentSlide.blocks.push({ type: 'prose', title: 'Why it exists', content: [line.replace('**Why it exists.** ', '')] });
        continue;
    }
    if (line.startsWith('**The mechanics.**')) {
        currentSlide.blocks.push({ type: 'prose', title: 'The mechanics', content: [line.replace('**The mechanics.** ', '')] });
        continue;
    }
    if (line.startsWith('**The numbers.**')) {
        currentSlide.blocks.push({ type: 'prose', title: 'The numbers', content: [line.replace('**The numbers.** ', '')] });
        continue;
    }
    if (line.startsWith('**')) {
        // generic bold heading
        const heading = line.substring(2, line.indexOf('**', 2));
        const rest = line.substring(line.indexOf('**', 2) + 2).trim();
        currentSlide.blocks.push({ type: 'prose', title: heading.replace('.', ''), content: rest ? [rest] : [] });
        continue;
    }

    // Code blocks
    if (line.startsWith('```')) {
        if (inCodeBlock) {
            inCodeBlock = false;
            let lastBlock = currentSlide.blocks[currentSlide.blocks.length - 1];
            if (!lastBlock || lastBlock.type !== 'code') {
                currentSlide.blocks.push({ type: 'code', content: codeBuffer.join('\n') });
            } else {
                lastBlock.content = codeBuffer.join('\n');
            }
            codeBuffer = [];
        } else {
            inCodeBlock = true;
            codeBuffer = [];
        }
        continue;
    }
    if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
    }

    // Tables
    if (line.startsWith('|')) {
        let lastBlock = currentSlide.blocks[currentSlide.blocks.length - 1];
        if (!lastBlock || lastBlock.type !== 'table') {
            currentSlide.blocks.push({ type: 'table', rows: [] });
            lastBlock = currentSlide.blocks[currentSlide.blocks.length - 1];
        }
        if (!line.includes('---')) { // Skip separator
            const cells = line.split('|').filter(c => c.trim() !== '' || line.indexOf('|') > 0).map(c => c.trim()).slice(1, -1);
            if (cells.length > 0) {
               lastBlock.rows.push(cells);
            }
        }
        continue;
    }

    // Normal prose paragraphs or lists
    if (line.trim() !== '' && !line.startsWith('> **Status:**') && !line.startsWith('> **Companion') && !line.startsWith('> **Designed')) {
        let lastBlock = currentSlide.blocks[currentSlide.blocks.length - 1];
        if (lastBlock && lastBlock.type === 'prose') {
            lastBlock.content.push(line);
        } else {
            currentSlide.blocks.push({ type: 'prose', title: '', content: [line] });
        }
    }
}
flushSlide();

// Filter out orientation preamble before the first real slide
slides = slides.filter(s => s.sectionLabel && s.title);

let totalSlides = slides.length;

function parseMarkdownInline(text) {
    if (!text) return '';
    // Handle math
    // text = text.replace(/\$\$(.+?)\$\$/g, '$$$$$1$$$$'); // leave alone, KaTeX handles it
    
    // Bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    // Italic
    text = text.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    // Code inline
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    return text;
}

let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Serif:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<style>
html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
:root{
  --bg:#0a0e13; --bg2:#0d1219; --card:#141920; --fg:#e4ebf2; --dim:#8593a3; --line:rgba(255,255,255,0.09);
  --cyan:#38bdf8; --emerald:#34d399; --amber:#e8b44c; --purple:#c792ea; --rose:#e2645c; --blue:#7d9bff;
  --sans:'IBM Plex Sans',system-ui,sans-serif;
  --mono:'IBM Plex Mono',monospace;
  --serif:'IBM Plex Serif',Georgia,serif;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--fg);font-family:var(--sans)}
section{background:var(--bg); color:var(--fg); font-family:var(--sans); padding:40px 72px 26px; display:flex; flex-direction:column; box-sizing:border-box; width:100%; height:100%; position:relative}
nav{display:flex; justify-content:space-between; align-items:baseline; font-family:var(--mono); font-size:20px; color:#5b6878; letter-spacing:0.18em; padding-bottom:14px; border-bottom:1px solid var(--line); flex:none; margin-bottom:14px}
h1{font-family:var(--serif); font-size:84px; font-weight:600; line-height:0.96; margin:0 0 16px; color:#ffffff; letter-spacing:-0.02em}
h2{font-family:var(--serif); font-size:46px; font-weight:600; line-height:1.06; margin:0 0 10px; color:#ffffff; letter-spacing:-0.01em}
h3{font-family:var(--mono); font-size:19px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:var(--cyan); margin:0 0 8px}
p{margin:0 0 10px; font-size:24px; line-height:1.38; color:#cbd5e1}
b,strong{color:#ffffff; font-weight:600}
code{font-family:var(--mono); font-size:0.9em; color:var(--cyan); background:rgba(56,189,248,0.1); padding:2px 8px; border-radius:4px}
pre{font-family:var(--mono); font-size:18px; line-height:1.38; background:#07090d; border:1px solid var(--line); padding:16px; border-radius:6px; color:#e4ebf2; margin:0; overflow:hidden}
table{width:100%; border-collapse:collapse; font-size:22px; line-height:1.3; margin-top:8px}
th{text-align:left; font-family:var(--mono); font-weight:600; color:#8593a3; font-size:18px; letter-spacing:0.1em; text-transform:uppercase; padding:10px 14px 10px 0; border-bottom:1px solid var(--line)}
td{padding:10px 14px 10px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:#c9d4e0; vertical-align:top}
tr:last-child td{border-bottom:none}
.hero-line{background:#0d1522; border-left:5px solid var(--cyan); padding:14px 22px; margin-bottom:16px; font-size:26px; line-height:1.38; color:#ffffff}
.grid-2{display:grid; grid-template-columns:1fr 1fr; gap:20px; flex:1; min-height:0; align-items:stretch}
.box{background:var(--card); border:1px solid var(--line); padding:18px 24px; display:flex; flex-direction:column; min-height:0; overflow-y:auto}
.box-title{font-family:var(--mono); font-size:18px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:10px}
.say-this{background:#151a2c; border-left:5px solid var(--blue); padding:16px 24px; margin-top:auto}
.say-this-title{font-family:var(--mono); font-size:18px; font-weight:600; letter-spacing:0.18em; color:#9db2ff; margin-bottom:6px}
.say-this-text{font-family:var(--serif); font-size:24px; line-height:1.4; color:#dfe4f7; margin:0}
.fail-box{background:#241413; border-left:5px solid var(--rose); padding:14px 20px; margin-top:auto}
.fail-title{font-family:var(--mono); font-size:17px; font-weight:600; letter-spacing:0.16em; color:#f19277; margin-bottom:4px}
.fail-text{font-size:21px; line-height:1.35; color:#f0d5cd; margin:0}
.sig-foot{margin-top:auto; display:flex; justify-content:space-between; font-family:var(--mono); font-size:17px; letter-spacing:0.12em; color:#454b54; padding-top:10px}
.katex{font-size:1.15em !important}
</style>
</helmet>
<x-import component-from-global-scope="deck-stage" from="./deck-stage.js" width="1920" height="1080" hint-size="100%,100%">
`;

html += `
<!-- COVER -->
<section data-label="Cover" style="justify-content:center; padding:64px 88px">
  <nav><span>AI ENGINEERING STACK · MASTER REFERENCE</span><span>${totalSlides} SLIDES · 16 PARTS</span></nav>
  <div style="display:grid; grid-template-columns:1.35fr 1fr; gap:70px; margin-top:20px; align-items:stretch">
    <div style="display:flex; flex-direction:column; gap:26px">
      <h1>The AI Engineering<br>Stack Master Deck</h1>
      <p style="font-size:30px; line-height:1.35; color:var(--dim); max-width:900px">Zero to God-Mode: Silicon → Tokens → Models → Serving → Retrieval → Agents → Product → Governance</p>
      <div style="height:1px; background:var(--line); width:100%"></div>
      <p style="font-size:25px; line-height:1.48; color:var(--fg)">The complete production field manual — 16 parts, ${totalSlides} slide-sized units covering the 10 layers of enterprise AI architecture. Verified against frontier research and production deployment standards as of August 2026.</p>
      <div style="margin-top:auto; display:flex; gap:36px; font-family:var(--mono); font-size:20px; color:var(--dim)">
        <span>10-LAYER STACK</span><span>vLLM & SERVING</span><span>MCP & AGENTS</span>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px; border-left:1px solid var(--line); padding-left:40px; font-family:var(--mono); font-size:21px; color:var(--dim)">
      <div style="color:var(--cyan); letter-spacing:0.16em; margin-bottom:8px">STACK MAP · 16 PARTS</div>
      <div style="display:flex; justify-content:space-between"><span>00 Orientation & Stack</span><span style="color:#5b6878">01–04</span></div>
      <div style="display:flex; justify-content:space-between"><span>01 Foundations & Tensors</span><span style="color:#5b6878">05–12</span></div>
      <div style="display:flex; justify-content:space-between"><span>02 Compute & Hardware</span><span style="color:#5b6878">13–17</span></div>
      <div style="display:flex; justify-content:space-between"><span>03 Model Layer Landscape</span><span style="color:#5b6878">18–21</span></div>
      <div style="display:flex; justify-content:space-between"><span>04 Inference & Serving</span><span style="color:#5b6878">22–29</span></div>
      <div style="display:flex; justify-content:space-between"><span>05 Context & Prompting</span><span style="color:#5b6878">30–35</span></div>
      <div style="display:flex; justify-content:space-between"><span>06 RAG & Retrieval</span><span style="color:#5b6878">36–45</span></div>
      <div style="display:flex; justify-content:space-between"><span>07 Tools, Functions & MCP</span><span style="color:#5b6878">46–50</span></div>
      <div style="display:flex; justify-content:space-between"><span>08 Agents & Orchestration</span><span style="color:#5b6878">51–56</span></div>
      <div style="display:flex; justify-content:space-between"><span>09 Evals & Observability</span><span style="color:#5b6878">57–61</span></div>
      <div style="display:flex; justify-content:space-between"><span>10 Security & Guardrails</span><span style="color:#5b6878">62–66</span></div>
      <div style="display:flex; justify-content:space-between"><span>11 Governance & EU Act</span><span style="color:#5b6878">67–70</span></div>
      <div style="display:flex; justify-content:space-between"><span>12 Product & UX</span><span style="color:#5b6878">71–73</span></div>
      <div style="display:flex; justify-content:space-between"><span>13 FDE Enterprise Playbook</span><span style="color:#5b6878">74–77</span></div>
      <div style="display:flex; justify-content:space-between"><span>14 Capstone Copilot</span><span style="color:#5b6878">78–80</span></div>
      <div style="display:flex; justify-content:space-between"><span>15 Mastery & Drills</span><span style="color:#5b6878">81–${totalSlides}</span></div>
    </div>
  </div>
  <div class="sig-foot"><span>Tharun Gajula</span><span>REV 2026.08</span></div>
</section>
`;

slides.forEach((s, idx) => {
    let slideNum = String(idx + 1).padStart(2, '0');
    
    html += `\n<!-- SLIDE ${slideNum} -->\n`;
    html += `<section data-label="${s.sectionLabel} ${s.title}" data-screen-label="${slideNum}">\n`;
    html += `  <nav><span>${parseMarkdownInline(s.part)}</span><span>SLIDE ${slideNum} / ${totalSlides}</span></nav>\n`;
    html += `  <h2>${s.sectionLabel} — ${parseMarkdownInline(s.title)}</h2>\n`;
    
    if (s.hero) {
        html += `  <div class="hero-line"><b>In one line:</b> ${parseMarkdownInline(s.hero)}</div>\n`;
    }

    let sayThisBlock = s.blocks.find(b => b.type === 'say-this');
    let failBlock = s.blocks.find(b => b.type === 'failure');
    let contentBlocks = s.blocks.filter(b => b.type !== 'say-this' && b.type !== 'failure');

    html += `  <div class="grid-2">\n`;
    
    // Distribute blocks into two columns
    let col1 = [];
    let col2 = [];
    let toggle = true;
    
    for (let block of contentBlocks) {
        if (toggle) col1.push(block);
        else col2.push(block);
        toggle = !toggle;
    }

    const renderBlock = (b) => {
        let out = '';
        if (b.type === 'prose') {
            if (b.title) out += `<div class="box-title" style="color:var(--amber)">${b.title.toUpperCase()}</div>\n`;
            b.content.forEach(line => {
                if (line.startsWith('- ')) {
                    out += `<li style="margin-bottom:6px; font-size:22px; color:#cbd5e1">${parseMarkdownInline(line.substring(2))}</li>\n`;
                } else {
                    out += `<p>${parseMarkdownInline(line)}</p>\n`;
                }
            });
            // Wrap loose lis in ul if needed, but for simplicity they're just styled blocks.
            out = out.replace(/(<li.*<\/li>\n)+/g, '<ul style="margin:0; padding-left:20px">$&</ul>\n');
        } else if (b.type === 'code') {
            out += `<pre>\n${parseMarkdownInline(b.content)}</pre>\n`;
        } else if (b.type === 'table') {
            out += `<table>\n`;
            b.rows.forEach((row, rIdx) => {
                out += `  <tr>`;
                row.forEach(cell => {
                    if (rIdx === 0) out += `<th>${parseMarkdownInline(cell)}</th>`;
                    else out += `<td>${parseMarkdownInline(cell)}</td>`;
                });
                out += `</tr>\n`;
            });
            out += `</table>\n`;
        }
        return out;
    };

    html += `    <div class="box">\n`;
    col1.forEach(b => html += renderBlock(b));
    html += `    </div>\n`;

    html += `    <div class="box">\n`;
    col2.forEach(b => html += renderBlock(b));
    if (failBlock) {
        html += `      <div class="fail-box">\n        <div class="fail-title">FAILURE MODE</div>\n        <div class="fail-text">${parseMarkdownInline(failBlock.content)}</div>\n      </div>\n`;
    }
    html += `    </div>\n`;
    
    html += `  </div>\n`;

    if (sayThisBlock) {
        html += `  <div class="say-this">\n    <div class="say-this-title">SAY THIS</div>\n    <div class="say-this-text">${parseMarkdownInline(sayThisBlock.content)}</div>\n  </div>\n`;
    }

    html += `  <div class="sig-foot"><span>Tharun Gajula</span><span>${s.sectionLabel} ${parseMarkdownInline(s.title).toUpperCase()}</span></div>\n`;
    html += `</section>\n`;
});

html += `
</x-import>
</x-dc>

<script type="text/x-dc" data-dc-script data-props='{"recallMode":{"editor":"boolean","default":false,"tsType":"boolean","section":"Study","label":"Recall mode (hide prose)"},"codeScale":{"editor":"range","default":1,"min":0.8,"max":1.3,"step":0.05,"tsType":"number","section":"Study"},"hidePartLabels":{"editor":"boolean","default":false,"tsType":"boolean","section":"Study"}}'>
class Component extends DCLogic {
  componentDidMount() {
    this.renderMath();
    this.applyTweaks();
    let n = 0;
    this._t = setInterval(() => { this.renderMath(); if (++n > 24) clearInterval(this._t); }, 700);
  }
  componentDidUpdate() { this.renderMath(); this.applyTweaks(); }
  componentWillUnmount() { clearInterval(this._t); }
  renderMath() {
    if (!window.renderMathInElement) return;
    try {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        throwOnError: false
      });
    } catch (e) { /* katex still loading */ }
  }
  applyTweaks() {
    let el = document.getElementById('deck-tweaks');
    if (!el) { el = document.createElement('style'); el.id = 'deck-tweaks'; document.head.appendChild(el); }
    const rules = [];
    if (this.props.recallMode) rules.push('[data-role="prose"]{display:none !important}');
    if (this.props.hidePartLabels) rules.push('[data-role="part"]{visibility:hidden !important}');
    const s = this.props.codeScale;
    if (s && s !== 1) rules.push('[data-role="code"]{font-size:' + (20 * s).toFixed(1) + 'px !important}');
    el.textContent = rules.join('\\n');
  }
}
</script>
</body>
</html>
`;

fs.writeFileSync(outPath, html, 'utf8');
console.log('Successfully generated ' + totalSlides + ' slides into ' + outPath);
