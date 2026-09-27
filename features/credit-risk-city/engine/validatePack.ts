import type { ContentPack } from '../content/types';

/** Referential-integrity checks for any content pack (City Bible v1.1 §7). Returns a list of errors. */
export function validatePack(pack: ContentPack): string[] {
  const errors: string[] = [];
  const dup = (label: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) errors.push(`Duplicate ${label} id: ${id}`);
      seen.add(id);
    }
  };
  dup('district', pack.districts.map((d) => d.id));
  dup('concept', pack.concepts.map((c) => c.id));
  dup('item', pack.items.map((i) => i.id));
  dup('case', pack.cases.map((c) => c.id));
  dup('mission', pack.missions.map((m) => m.id));

  const districts = new Set(pack.districts.map((d) => d.id));
  const concepts = new Map(pack.concepts.map((c) => [c.id, c]));
  const items = new Set(pack.items.map((i) => i.id));

  for (const d of pack.districts) {
    if (!pack.concepts.some((c) => c.district === d.id)) errors.push(`District ${d.id} has no concepts`);
  }
  for (const c of pack.concepts) {
    if (!districts.has(c.district)) errors.push(`Concept ${c.id}: unknown district ${c.district}`);
    for (const p of [...c.prerequisites, ...c.links]) {
      if (!concepts.has(p)) errors.push(`Concept ${c.id}: unknown reference ${p}`);
    }
  }
  // Prerequisite cycles (DFS).
  const state = new Map<string, 0 | 1 | 2>();
  const visit = (id: string, path: string[]) => {
    const st = state.get(id) ?? 0;
    if (st === 2) return;
    if (st === 1) {
      errors.push(`Prerequisite cycle: ${[...path, id].join(' → ')}`);
      return;
    }
    state.set(id, 1);
    for (const p of concepts.get(id)?.prerequisites ?? []) visit(p, [...path, id]);
    state.set(id, 2);
  };
  for (const c of pack.concepts) visit(c.id, []);

  for (const it of pack.items) {
    if (it.conceptIds.length === 0) errors.push(`Item ${it.id} has no concepts`);
    for (const cid of it.conceptIds) if (!concepts.has(cid)) errors.push(`Item ${it.id}: unknown concept ${cid}`);
    const p = it.payload;
    if ((p.type === 'choice' || p.type === 'spot' || p.type === 'anchor') && (p.answerIndex < 0 || p.answerIndex >= p.options.length)) {
      errors.push(`Item ${it.id}: answerIndex out of range`);
    }
    if (p.type === 'predict' && !p.numeric && (p.options === undefined || p.answerIndex === undefined)) {
      errors.push(`Item ${it.id}: predict needs options+answerIndex or numeric`);
    }
    if (p.type === 'classify' && p.entries.some((e) => e.bucket < 0 || e.bucket >= p.buckets.length)) {
      errors.push(`Item ${it.id}: classify bucket out of range`);
    }
    if ((p.type === 'recall' || p.type === 'explain') && p.keyPoints.length === 0) {
      errors.push(`Item ${it.id}: needs key points`);
    }
  }

  const checkSetup = (owner: string, setup: ContentPack['cases'][number]['setup']) => {
    const borrowers = new Set(setup.borrowers.map((b) => b.id));
    const facilities = new Set(setup.facilities.map((f) => f.id));
    for (const b of setup.borrowers) if (!(b.grade in pack.rules.gradePd)) errors.push(`${owner}: unknown grade ${b.grade}`);
    for (const f of setup.facilities) if (!borrowers.has(f.borrowerId)) errors.push(`${owner}: facility ${f.id} unknown borrower`);
    for (const c of setup.collateral) {
      if (!borrowers.has(c.borrowerId)) errors.push(`${owner}: collateral ${c.id} unknown borrower`);
      if (c.allocation) {
        const sum = Object.values(c.allocation).reduce((s, x) => s + x, 0);
        if (sum > 1 + 1e-9) errors.push(`${owner}: collateral ${c.id} allocation sums to ${sum}`);
        for (const fid of Object.keys(c.allocation)) if (!facilities.has(fid)) errors.push(`${owner}: collateral ${c.id} unknown facility ${fid}`);
      }
    }
    if (!(setup.scenarioId in pack.rules.scenarios)) errors.push(`${owner}: unknown scenario ${setup.scenarioId}`);
    return { borrowers, facilities };
  };

  for (const cs of pack.cases) {
    const { borrowers, facilities } = checkSetup(`Case ${cs.id}`, cs.setup);
    for (const st of cs.steps) {
      if (!districts.has(st.district)) errors.push(`Case ${cs.id} step ${st.id}: unknown district`);
      for (const iid of st.itemIds) if (!items.has(iid)) errors.push(`Case ${cs.id} step ${st.id}: unknown item ${iid}`);
    }
    for (const e of cs.events) {
      if ('facilityId' in e && !facilities.has(e.facilityId)) errors.push(`Case ${cs.id}: event on unknown facility ${e.facilityId}`);
      if ('borrowerId' in e && !borrowers.has(e.borrowerId)) errors.push(`Case ${cs.id}: event on unknown borrower ${e.borrowerId}`);
    }
  }
  for (const m of pack.missions) {
    const { borrowers, facilities } = checkSetup(`Mission ${m.id}`, m.setup);
    if (!districts.has(m.district)) errors.push(`Mission ${m.id}: unknown district ${m.district}`);
    for (const iid of m.itemIds) if (!items.has(iid)) errors.push(`Mission ${m.id}: unknown item ${iid}`);
    if (m.goal.kind === 'facilityStage' && !facilities.has(m.goal.facilityId)) errors.push(`Mission ${m.id}: goal on unknown facility`);
    if (m.moves.length === 0) errors.push(`Mission ${m.id}: no moves`);
    const moveIds = new Set<string>();
    for (const mv of m.moves) {
      if (moveIds.has(mv.id)) errors.push(`Mission ${m.id}: duplicate move ${mv.id}`);
      moveIds.add(mv.id);
      const e = mv.event;
      if ('facilityId' in e && !facilities.has(e.facilityId)) errors.push(`Mission ${m.id}: move ${mv.id} on unknown facility`);
      if ('borrowerId' in e && !borrowers.has(e.borrowerId)) errors.push(`Mission ${m.id}: move ${mv.id} on unknown borrower`);
      if (e.kind === 'grade' && !(e.grade in pack.rules.gradePd)) errors.push(`Mission ${m.id}: move ${mv.id} unknown grade`);
    }
  }
  return errors;
}
