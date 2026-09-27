'use client';

import { useState } from 'react';
import { useCity } from '../state/store';
import { Button, Card } from './primitives';

export default function ProgressView() {
  const progressJson = useCity((s) => s.progressJson);
  const exportJson = useCity((s) => s.exportJson);
  const importJson = useCity((s) => s.importJson);
  const reset = useCity((s) => s.reset);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setMsg(`${label} copied.`);
    } catch {
      setText(value);
      setMsg('Clipboard blocked — the text is in the box below; copy it from there.');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Export my progress</h2>
        <p className="text-sm text-ink-muted">Copies your mastery, weakest items, confident misses and case results — paste it to Claude to decide the next build.</p>
        <Button onClick={() => copy(progressJson(), 'Progress')}>Copy progress for Claude</Button>
      </Card>
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Move to another device</h2>
        <p className="text-sm text-ink-muted">Progress is saved in this browser. Copy the save here and import it on the other device.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => copy(exportJson(), 'Save file')}>Copy save</Button>
          <Button
            variant="ghost"
            disabled={!text.trim()}
            onClick={() => {
              try {
                importJson(text);
                setMsg('Save imported.');
              } catch {
                setMsg('That doesn’t look like a Credit Risk City save.');
              }
            }}
          >
            Import save from the box
          </Button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Paste a save here to import"
          className="w-full rounded-lg border border-hairline-strong bg-surface p-3 font-mono text-xs"
        />
        {msg && <p className="text-sm">{msg}</p>}
      </Card>
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Reset</h2>
        {!confirmReset ? (
          <Button variant="ghost" onClick={() => setConfirmReset(true)}>Reset all progress…</Button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => { reset(); setConfirmReset(false); setMsg('Progress reset.'); }}>Yes, erase everything</Button>
            <Button variant="quiet" onClick={() => setConfirmReset(false)}>Cancel</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
