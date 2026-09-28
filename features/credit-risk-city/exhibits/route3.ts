import { bar, bars, chain, clamp01, fmt, gauge, num, on, ro, slider, toggle, type Exhibit, type Tone } from './types';

const good = (b: boolean): Tone => (b ? 'good' : 'bad');

export const route3Exhibits: Exhibit[] = [
  // ── District 14 · Reporting Tower ──────────────────────────────────────
  {
    id: 'ex-lenses', conceptId: 'reporting-purpose', district: 'reporting', title: 'Three clock faces',
    prompt: 'One ₹100 crore loan, 100 days overdue. Each report measures it its own way.',
    controls: [slider('coll', 'Collateral cover', 0, 1.2, 0.05, 'pct'), slider('age', 'Months as NPA', 1, 40, 1, 'int')],
    initial: { coll: 0.6, age: 3 },
    model(v) {
      const lgd = clamp01(1 - num(v, 'coll') * 0.7);
      const ifrs = 100 * lgd * 0.95;
      const irac = num(v, 'age') <= 12 ? 15 : num(v, 'age') <= 24 ? 25 : 40;
      const mi = 100 * lgd;
      return {
        readouts: [ro('Accounts (IFRS 9 Stage 3 ECL)', fmt(ifrs, 'cr')), ro('Prudential (IRAC provision)', fmt(irac, 'cr')), ro('Management (expected loss)', fmt(mi, 'cr'))],
        insight: 'Same loan, three numbers, all correct for their purpose. The BA’s job is to explain the differences, not force them to match. (Illustrative measures.)',
        scene: [bars([bar('Accounts', ifrs, 'accent'), bar('Prudential', irac, 'warn'), bar('Management', mi, 'muted')], undefined, 105)],
      };
    },
  },
  {
    id: 'ex-returns', conceptId: 'regulatory-returns', district: 'reporting', title: 'The validation gate',
    prompt: 'A return must pass the regulator’s checks. Introduce data problems and watch which rules fail.',
    controls: [toggle('miss', 'Missing sector codes'), toggle('sum', 'Sub-totals don’t add up'), toggle('cross', 'Doesn’t tie to the capital return'), toggle('late', 'Data arrived late')],
    initial: { miss: 0, sum: 1, cross: 0, late: 0 },
    model(v) {
      const fails = ['miss', 'sum', 'cross'].filter((k) => on(v, k)).length;
      return {
        readouts: [ro('Validation rules failing', String(fails), fails ? 'bad' : 'good'), ro('Deadline', on(v, 'late') ? 'At risk' : 'On track', on(v, 'late') ? 'bad' : 'good'), ro('Can submit', fails === 0 && !on(v, 'late') ? 'Yes' : 'No', good(fails === 0 && !on(v, 'late')))],
        insight: fails ? 'Fix failures at the source and document any exception — overriding a validation rule hides a data problem inside a regulatory filing.' : 'Every cell has a definition, a mapped source, validation rules and an owner.',
        scene: [chain([{ label: 'Completeness', tone: good(!on(v, 'miss')) }, { label: 'Totals', tone: good(!on(v, 'sum')) }, { label: 'Cross-return', tone: good(!on(v, 'cross')) }, { label: 'Submit', tone: good(fails === 0 && !on(v, 'late')), raised: true }], fails ? 2 : undefined)],
      };
    },
  },
  {
    id: 'ex-recon', conceptId: 'reconciliation', district: 'reporting', title: 'The reconciliation walk',
    prompt: 'Walk from the risk system’s total to the ledger’s. Whatever you cannot explain is a break.',
    controls: [slider('risk', 'Risk system gross loans', 950, 1100, 5, 'cr'), slider('acc', 'Accrued interest (risk only)', 0, 40, 1, 'cr'), slider('fee', 'Unamortised fees (ledger only)', 0, 20, 1, 'cr'), slider('tol', 'Tolerance', 0, 10, 1, 'cr')],
    initial: { risk: 1020, acc: 15, fee: 0, tol: 2 },
    model(v) {
      const gl = 1000;
      const explained = num(v, 'risk') - num(v, 'acc') - num(v, 'fee');
      const brk = explained - gl;
      const ok = Math.abs(brk) <= num(v, 'tol');
      return {
        readouts: [ro('Ledger', fmt(gl, 'cr')), ro('Unexplained break', `${brk >= 0 ? '+' : '−'}${fmt(Math.abs(brk), 'cr')}`, ok ? 'good' : 'bad'), ro('Status', ok ? 'Within tolerance' : 'Investigate', ok ? 'good' : 'bad')],
        insight: ok ? 'Reconciled: every difference is explained or within tolerance.' : 'An unexplained break means one of the two numbers is wrong. Tolerance sets urgency; it never makes a break disappear.',
        scene: [bars([
          bar('Risk system', num(v, 'risk') - 900, 'accent'),
          { label: '− accrued', base: num(v, 'risk') - num(v, 'acc') - 900, segs: [{ value: num(v, 'acc'), tone: 'muted' }] },
          { label: '− fees', base: explained - 900, segs: [{ value: num(v, 'fee'), tone: 'muted' }] },
          bar('Explained', explained - 900, ok ? 'good' : 'bad', true),
        ], [{ value: gl - 900, label: 'ledger ₹1,000 cr', tone: 'ink' }], 220, 'axis starts at ₹900 crore')],
      };
    },
  },
  {
    id: 'ex-disclose', conceptId: 'disclosures', district: 'reporting', title: 'The public window',
    prompt: 'Build the stage table the annual report publishes: move loans between stages and write some off.',
    controls: [slider('to2', 'Moved Stage 1 → 2', 0, 150, 10, 'cr'), slider('to3', 'Moved Stage 2 → 3', 0, 80, 5, 'cr'), slider('wo', 'Written off from Stage 3', 0, 60, 5, 'cr')],
    initial: { to2: 50, to3: 20, wo: 10 },
    model(v) {
      const o = [800, 150, 50];
      const c = [o[0] - num(v, 'to2'), o[1] + num(v, 'to2') - num(v, 'to3'), Math.max(0, o[2] + num(v, 'to3') - num(v, 'wo'))];
      return {
        readouts: [ro('Stage 1 / 2 / 3 closing', c.map((x) => x.toFixed(0)).join(' / ')), ro('Stage 3 share', fmt(c[2] / (c[0] + c[1] + c[2]), 'pct2'))],
        insight: 'IFRS 7 publishes loans and allowances by stage with the movements between them. The published numbers must tie to the audited accounts and the regulatory returns.',
        scene: [bars([
          { label: 'Opening', segs: [{ value: o[0], tone: 'stage1' }, { value: o[1], tone: 'stage2' }, { value: o[2], tone: 'stage3' }] },
          { label: 'Closing', segs: [{ value: c[0], tone: 'stage1' }, { value: c[1], tone: 'stage2' }, { value: c[2], tone: 'stage3' }], highlight: true },
        ], undefined, 1050)],
      };
    },
  },
  // ── District 15 · Engine Room ──────────────────────────────────────────
  {
    id: 'ex-lineage', conceptId: 'data-lineage', district: 'engineroom', title: 'The pipes',
    prompt: 'Trace a reported number back to its source. Break a pipe and see how far the damage travels.',
    controls: [slider('brk', 'Break the pipe after step (0 = none)', 0, 4, 1, 'int')],
    initial: { brk: 0 },
    model(v) {
      const steps = ['Loan system', 'Data platform', 'DQ checks', 'ECL engine', 'Report'];
      const b = num(v, 'brk');
      return {
        readouts: [ro('Traceable end to end', b === 0 ? 'Yes' : 'No', b === 0 ? 'good' : 'bad'), ro('Affected downstream', b === 0 ? 'nothing' : steps.slice(b).join(', '))],
        insight: b === 0 ? 'Every reported figure can be walked back to its source record, rule by rule.' : 'Everything downstream of the break is unexplainable: nobody can prove the report is right or fix it at source.',
        scene: [chain(steps.map((s, i) => ({ label: s, tone: b > 0 && i >= b ? 'bad' : 'good', raised: i === steps.length - 1 })), b > 0 ? b - 1 : undefined)],
      };
    },
  },
  {
    id: 'ex-239', conceptId: 'bcbs239', district: 'engineroom', title: 'Four gauges',
    prompt: 'Rate the bank’s risk data on the BCBS 239 qualities. A crisis report is only as good as the weakest one.',
    controls: [slider('acc', 'Accuracy', 0, 100, 5, 'int'), slider('comp', 'Completeness', 0, 100, 5, 'int'), slider('time', 'Timeliness', 0, 100, 5, 'int'), slider('adapt', 'Adaptability', 0, 100, 5, 'int')],
    initial: { acc: 80, comp: 70, time: 40, adapt: 60 },
    model(v) {
      const keys = ['acc', 'comp', 'time', 'adapt'];
      const names = ['Accuracy', 'Completeness', 'Timeliness', 'Adaptability'];
      const min = Math.min(...keys.map((k) => num(v, k)));
      const weakest = names[keys.findIndex((k) => num(v, k) === min)];
      return {
        readouts: [ro('Weakest quality', weakest, min < 60 ? 'bad' : 'good'), ro('Crisis-ready', min >= 70 ? 'Yes' : 'No', min >= 70 ? 'good' : 'bad')],
        insight: 'BCBS 239 asks whether accurate, complete risk data can be produced quickly — especially in a crisis. Supervisors look for the weakest link. (Scores illustrative.)',
        scene: [bars(keys.map((k, i) => bar(names[i].slice(0, 5), num(v, k), num(v, k) < 60 ? 'bad' : num(v, k) < 75 ? 'warn' : 'good', num(v, k) === min)), [{ value: 70, label: 'target', tone: 'ink' }], 105)],
      };
    },
  },
  {
    id: 'ex-dq', conceptId: 'data-quality', district: 'engineroom', title: 'The filter',
    prompt: '10,000 loans flow through the DQ filter. Set the problems; each dimension is measured against a 98% threshold.',
    controls: [slider('miss', 'Missing collateral values', 0, 800, 25, 'int'), slider('inv', 'Invalid LTVs', 0, 800, 25, 'int'), slider('stale', 'Stale valuations', 0, 800, 25, 'int'), slider('dup', 'Duplicate loan IDs', 0, 300, 10, 'int')],
    initial: { miss: 250, inv: 50, stale: 400, dup: 0 },
    model(v) {
      const score = (k: string) => 1 - num(v, k) / 10000;
      const dims = [['Complete', 'miss'], ['Valid', 'inv'], ['Timely', 'stale'], ['Unique', 'dup']] as const;
      const fails = dims.filter(([, k]) => score(k) < 0.98).map(([n]) => n);
      return {
        readouts: [ro('Dimensions below 98%', fails.length ? fails.join(', ') : 'none', fails.length ? 'bad' : 'good')],
        insight: fails.length ? 'Each breach becomes an issue with an owner and a fix date — fixed at the source, not patched downstream.' : 'All critical fields pass. Thresholds are set per critical data element.',
        scene: [bars(dims.map(([n, k]) => bar(n, score(k) * 100 - 90, score(k) < 0.98 ? 'bad' : 'good')), [{ value: 8, label: '98% threshold', tone: 'ink' }], 10.5, 'axis starts at 90%')],
      };
    },
  },
  {
    id: 'ex-arch', conceptId: 'risk-data-architecture', district: 'engineroom', title: 'The system map',
    prompt: 'Data hops from source systems to reports. Break the join key at one hop and count the loans that vanish.',
    controls: [slider('hop', 'Key mismatch at hop (0 = none)', 0, 3, 1, 'int'), slider('share', 'Records affected', 0, 0.3, 0.01, 'pct')],
    initial: { hop: 0, share: 0.05 },
    model(v) {
      const h = num(v, 'hop');
      const lost = h === 0 ? 0 : Math.round(10000 * num(v, 'share'));
      const nodes = ['Sources', 'Data platform', 'Risk engines', 'Reports'];
      return {
        readouts: [ro('Loans reaching the report', `${10000 - lost} of 10,000`, lost ? 'bad' : 'good')],
        insight: lost ? 'Broken joins drop records silently: the report looks fine and is wrong. Agree keys, grain and as-of dates at every hop.' : 'Keys, grain and timing agreed at every hop.',
        scene: [chain(nodes.map((n, i) => ({ label: n, tone: h > 0 && i >= h ? 'warn' : 'good', raised: i === 3 })), h > 0 ? h - 1 : undefined), bars([bar('Reported', 10000 - lost, lost ? 'warn' : 'good'), bar('Lost', lost, 'bad')], undefined, 10500)],
      };
    },
  },
  {
    id: 'ex-controls', conceptId: 'controls', district: 'engineroom', title: 'Valves and alarms',
    prompt: '100 errors enter a process each month. Turn on the preventive valve and the detective alarm.',
    controls: [toggle('prev', 'Preventive control (maker-checker, validation)'), toggle('det', 'Detective control (reconciliation, exception report)'), toggle('auto', 'Controls automated')],
    initial: { prev: 0, det: 1, auto: 0 },
    model(v) {
      const eff = on(v, 'auto') ? 0.95 : 0.75;
      const stopped = on(v, 'prev') ? 100 * eff : 0;
      const caught = on(v, 'det') ? (100 - stopped) * eff : 0;
      const escaped = 100 - stopped - caught;
      return {
        readouts: [ro('Stopped', stopped.toFixed(0), 'good'), ro('Caught later', caught.toFixed(0), 'warn'), ro('Escaped into reports', escaped.toFixed(0), escaped > 10 ? 'bad' : 'good')],
        insight: 'Preventive controls stop errors; detective controls find them after. Automated controls miss less. Every control needs an owner and evidence it ran. (Effectiveness illustrative.)',
        scene: [bars([bar('Stopped', stopped, 'good'), bar('Caught', caught, 'warn'), bar('Escaped', escaped, 'bad', true)], undefined, 105)],
      };
    },
  },
  // ── District 16 · Town Hall ────────────────────────────────────────────
  {
    id: 'ex-lines', conceptId: 'three-lines', district: 'townhall', title: 'Three chairs',
    prompt: 'Switch off a line of defence and see how many problems slip through.',
    controls: [toggle('l1', 'First line owns and controls'), toggle('l2', 'Second line challenges'), toggle('l3', 'Third line audits')],
    initial: { l1: 1, l2: 1, l3: 0 },
    model(v) {
      const catchRate = [0.6, 0.5, 0.4];
      let left = 100;
      ['l1', 'l2', 'l3'].forEach((k, i) => {
        if (on(v, k)) left *= 1 - catchRate[i];
      });
      return {
        readouts: [ro('Issues reaching the board unseen', `${left.toFixed(0)} of 100`, left > 20 ? 'bad' : 'good')],
        insight: 'First line owns the risk, second line challenges it, third line assures the whole system independently. Each catches what the one before missed. (Rates illustrative.)',
        scene: [chain([{ label: 'Business', tone: good(on(v, 'l1')), raised: on(v, 'l1') }, { label: 'Risk', tone: good(on(v, 'l2')), raised: on(v, 'l2') }, { label: 'Audit', tone: good(on(v, 'l3')), raised: on(v, 'l3') }]), gauge(left, 100, [{ to: 20, tone: 'good' }, { to: 50, tone: 'warn' }, { to: 100, tone: 'bad' }], 'Unseen')],
      };
    },
  },
  {
    id: 'ex-appetite', conceptId: 'risk-appetite', district: 'townhall', title: 'The appetite dial',
    prompt: 'The board set a Stage 3 ratio trigger at 4% and a limit at 6%. Move the actual.',
    controls: [slider('act', 'Actual Stage 3 ratio', 0.01, 0.09, 0.0025, 'pct2')],
    initial: { act: 0.035 },
    model(v) {
      const a = num(v, 'act');
      const state = a >= 0.06 ? 'Limit breach' : a >= 0.04 ? 'Trigger hit' : 'Within appetite';
      return {
        readouts: [ro('Status', state, a >= 0.06 ? 'bad' : a >= 0.04 ? 'warn' : 'good'), ro('Action', a >= 0.06 ? 'Board escalation, remediation plan' : a >= 0.04 ? 'Owner reports and proposes actions' : 'Monitor')],
        insight: 'Triggers exist so the owner acts before a limit is breached. Precise metric definitions stop the argument about whether it really happened.',
        scene: [gauge(a, 0.09, [{ to: 0.04, tone: 'good' }, { to: 0.06, tone: 'warn' }, { to: 0.09, tone: 'bad' }], 'Stage 3 ratio')],
      };
    },
  },
  {
    id: 'ex-authority', conceptId: 'committees-policy', district: 'townhall', title: 'The authority ladder',
    prompt: 'Slide the loan size up and watch the approval climb the ladder. The board sets the ladder itself.',
    controls: [slider('amt', 'Exposure', 1, 500, 1, 'cr'), toggle('exc', 'Needs a policy exception')],
    initial: { amt: 40, exc: 0 },
    model(v) {
      const a = num(v, 'amt');
      const lvl = on(v, 'exc') ? 3 : a <= 10 ? 0 : a <= 75 ? 1 : a <= 250 ? 2 : 3;
      const names = ['Officer', 'Credit head', 'Committee', 'Board risk cttee'];
      return {
        readouts: [ro('Approver', names[lvl], 'accent')],
        insight: on(v, 'exc') ? 'Policy exceptions go up the ladder regardless of size.' : 'Delegated authority by size and risk (illustrative limits). Minutes and decision records prove the governance worked.',
        scene: [chain(names.map((n, i) => ({ label: n, tone: i === lvl ? 'accent' : i < lvl ? 'good' : 'muted', raised: i === lvl })))],
      };
    },
  },
  {
    id: 'ex-conduct', conceptId: 'conduct', district: 'townhall', title: 'The fairness scales',
    prompt: 'Good credit risk with bad conduct still gets fined. Switch practices on and off.',
    controls: [toggle('clear', 'Clear pricing and terms'), toggle('afford', 'Affordability checks'), toggle('fair', 'Fair collections (contact limits)'), toggle('hard', 'Collections uses harassment')],
    initial: { clear: 1, afford: 1, fair: 1, hard: 0 },
    model(v) {
      const risk = 10 + (on(v, 'clear') ? 0 : 25) + (on(v, 'afford') ? 0 : 25) + (on(v, 'fair') ? 0 : 15) + (on(v, 'hard') ? 35 : 0);
      return {
        readouts: [ro('Conduct risk', `${Math.min(risk, 100)} / 100`, risk > 50 ? 'bad' : risk > 25 ? 'warn' : 'good')],
        insight: on(v, 'hard') ? 'Harassing collections may recover more this month and bring fines, redress and reputational damage. Conduct rules become system requirements.' : 'Transparent, affordable, fair — and built into screens, letters and workflows. (Scores illustrative.)',
        scene: [gauge(Math.min(risk, 100), 100, [{ to: 25, tone: 'good' }, { to: 50, tone: 'warn' }, { to: 100, tone: 'bad' }], 'Conduct risk')],
      };
    },
  },
  // ── District 17 · Embassy Row ──────────────────────────────────────────
  {
    id: 'ex-rulebook', conceptId: 'jurisdiction-rulebooks', district: 'embassy', title: 'Four embassies, one standard',
    prompt: 'The same Basel reform, four jurisdictions. Pick a year and see where it is law.',
    controls: [slider('yr', 'Year', 2024, 2028, 1, 'int')],
    initial: { yr: 2026 },
    model(v) {
      const y = num(v, 'yr');
      const live = { EU: y >= 2025, UK: y >= 2027, US: false, IN: false };
      return {
        readouts: [ro('EU (CRR3)', live.EU ? 'In force' : 'Not yet', good(live.EU)), ro('UK (Basel 3.1)', live.UK ? 'In force' : 'Not yet', good(live.UK)), ro('US / India', 'Own timetable — check')],
        insight: 'Basel sets the standard; each jurisdiction legislates its version and date. Before encoding a rule, confirm the rulebook, version and effective date. (US and Indian timetables change — verify.)',
        scene: [chain([{ label: 'EU', tone: live.EU ? 'good' : 'warn', raised: live.EU }, { label: 'UK', tone: live.UK ? 'good' : 'warn', raised: live.UK }, { label: 'US', tone: 'muted' }, { label: 'India', tone: 'muted' }])],
      };
    },
  },
  {
    id: 'ex-irac', conceptId: 'india-irac', district: 'embassy', title: 'The IRAC ladder',
    prompt: 'A ₹100 crore secured loan becomes an NPA. Let the months pass and watch the category and provision climb.',
    controls: [slider('m', 'Months as an NPA (0 = standard)', 0, 72, 1, 'int')],
    initial: { m: 6 },
    model(v) {
      const m = num(v, 'm');
      const cat = m === 0 ? 0 : m <= 12 ? 1 : m <= 24 ? 2 : m <= 48 ? 3 : 4;
      const names = ['Standard', 'Sub-standard', 'Doubtful 1', 'Doubtful 2', 'Doubtful 3'];
      const prov = [0.004, 0.15, 0.25, 0.4, 1][cat];
      return {
        readouts: [ro('Category', names[cat], cat >= 2 ? 'bad' : cat === 1 ? 'warn' : 'good'), ro('Provision (secured portion)', fmt(prov, 'pct'), 'bad'), ro('Amount', fmt(100 * prov, 'cr'))],
        insight: 'NPA after 90 days overdue; sub-standard for 12 months, then doubtful, and older doubtful assets need more. (Rates for secured portions; unsecured portions and some asset classes differ — check the RBI master circular.)',
        scene: [chain(names.map((n, i) => ({ label: n, tone: i === cat ? (i >= 2 ? 'bad' : i === 1 ? 'warn' : 'good') : 'muted', raised: i === cat }))), gauge(prov, 1, [{ to: 0.15, tone: 'warn' }, { to: 1, tone: 'bad' }], 'Provision')],
      };
    },
  },
  {
    id: 'ex-floor', conceptId: 'uk-eu-basel31', district: 'embassy', title: 'Two floors rising',
    prompt: 'The output floor phases in towards 72.5% on different timetables. Pick a year.',
    controls: [slider('yr', 'Year', 2025, 2030, 1, 'int')],
    initial: { yr: 2027 },
    model(v) {
      const y = num(v, 'yr');
      const eu = [0.5, 0.55, 0.6, 0.65, 0.7, 0.725][y - 2025];
      const uk = y < 2027 ? 0 : [0.6, 0.65, 0.7, 0.725][y - 2027];
      return {
        readouts: [ro('EU output floor', fmt(eu, 'pct')), ro('UK output floor', uk ? fmt(uk, 'pct') : 'not yet in force')],
        insight: 'Same end point, different paths: a cross-border bank reports each regulator’s version of the same portfolio. (Phase-ins as announced — confirm against current PRA and EU rules.)',
        scene: [bars([bar('EU', eu * 100, 'accent'), bar('UK', uk * 100, 'warn')], [{ value: 72.5, label: '72.5% end state', tone: 'ink' }], 80)],
      };
    },
  },
  {
    id: 'ex-scb', conceptId: 'us-framework', district: 'embassy', title: 'The stress buffer',
    prompt: 'In the US, the supervisory stress test sets each large bank’s stress capital buffer.',
    controls: [slider('drop', 'Peak CET1 drop in the stress test', 0, 0.06, 0.0025, 'pct2'), slider('div', 'Four quarters of planned dividends', 0, 0.02, 0.0025, 'pct2')],
    initial: { drop: 0.02, div: 0.01 },
    model(v) {
      const raw = num(v, 'drop') + num(v, 'div');
      const scb = Math.max(0.025, raw);
      return {
        readouts: [ro('Stress capital buffer', fmt(scb, 'pct2'), 'warn'), ro('CET1 requirement', fmt(0.045 + scb, 'pct2'), 'accent')],
        insight: raw < 0.025 ? 'A mild stress result still gets the 2.5% floor.' : 'A harsher stress result means a bigger buffer on top of the 4.5% minimum. Provisions meanwhile follow CECL.',
        scene: [bars([{ label: 'CET1 need', segs: [{ value: 4.5, tone: 'ink' }, { value: scb * 100, tone: 'warn' }], highlight: true }], [{ value: 7, label: '4.5% + 2.5% floor', tone: 'muted' }], 14)],
      };
    },
  },
  {
    id: 'ex-sbr', conceptId: 'nbfc-sbr', district: 'embassy', title: 'The NBFC ladder',
    prompt: 'Grow an NBFC and see which layer of RBI’s scale-based regulation it lands in.',
    controls: [slider('size', 'Asset size (₹ crore)', 100, 50000, 100, 'int'), toggle('dep', 'Takes deposits'), toggle('top', 'Identified by RBI as upper layer')],
    initial: { size: 800, dep: 0, top: 0 },
    model(v) {
      const lvl = on(v, 'top') ? 2 : on(v, 'dep') || num(v, 'size') >= 1000 ? 1 : 0;
      const names = ['Base', 'Middle', 'Upper', 'Top'];
      return {
        readouts: [ro('Layer', names[lvl], 'accent'), ro('Provisioning standard', 'Ind AS 109 (IFRS 9-based)')],
        insight: lvl === 2 ? 'Upper layer: bank-like rules on capital, governance and concentration.' : 'Base: non-deposit-taking under ₹1,000 crore. Middle: deposit-taking, or ₹1,000 crore and above. Upper: identified by RBI. The top layer is kept empty unless needed.',
        scene: [chain(names.map((n, i) => ({ label: n, tone: i === lvl ? 'accent' : 'muted', raised: i === lvl })))],
      };
    },
  },
  // ── District 18 · BA Studio ────────────────────────────────────────────
  {
    id: 'ex-req', conceptId: 'requirement-to-test', district: 'studio', title: 'The testability meter',
    prompt: 'Start with “handle deteriorated loans appropriately”. Add ingredients until a tester can prove it.',
    controls: [toggle('rule', 'States the rule and its source'), toggle('data', 'Names the data fields'), toggle('thr', 'Exact thresholds and precedence'), toggle('edge', 'Boundary and edge cases'), toggle('acc', 'Acceptance criteria')],
    initial: { rule: 1, data: 0, thr: 0, edge: 0, acc: 0 },
    model(v) {
      const keys = ['rule', 'data', 'thr', 'edge', 'acc'];
      const n = keys.filter((k) => on(v, k)).length;
      return {
        readouts: [ro('Testability', `${n} / 5`, n >= 4 ? 'good' : n >= 2 ? 'warn' : 'bad')],
        insight: n >= 4 ? 'A tester can now prove it right or wrong — that is a requirement.' : 'If a tester cannot fail it, it is not yet a requirement.',
        scene: [gauge(n, 5, [{ to: 2, tone: 'bad' }, { to: 4, tone: 'warn' }, { to: 5, tone: 'good' }], 'Testable'), chain(['Rule', 'Data', 'Thresholds', 'Edges', 'Acceptance'].map((l, i) => ({ label: l, tone: good(on(v, keys[i])), raised: on(v, keys[i]) })))],
      };
    },
  },
  {
    id: 'ex-trace', conceptId: 'traceability', district: 'studio', title: 'The golden thread',
    prompt: 'Link each regulatory clause to requirements and passing tests. Leave gaps and see what the audit finds.',
    controls: [slider('req', 'Clauses with a requirement', 0, 20, 1, 'int'), slider('test', 'Requirements with a passing test', 0, 20, 1, 'int')],
    initial: { req: 18, test: 14 },
    model(v) {
      const clauses = 20;
      const r = num(v, 'req');
      const t = Math.min(num(v, 'test'), r);
      return {
        readouts: [ro('Fully traced clauses', `${t} of ${clauses}`, t === clauses ? 'good' : 'bad'), ro('Gaps', String(clauses - t))],
        insight: t === clauses ? 'Complete coverage, and every change’s impact can be traced.' : 'Each gap is a clause nobody can prove the system meets — the first thing an auditor asks about.',
        scene: [bars([bar('Clauses', clauses, 'ink'), bar('Requirements', r, 'accent'), bar('Passing tests', t, t === clauses ? 'good' : 'warn', true)], undefined, 21)],
      };
    },
  },
  {
    id: 'ex-mapping', conceptId: 'data-mapping', district: 'studio', title: 'The mapping sheet',
    prompt: 'A target field needs four answers. Leave one blank and see how many records come out wrong.',
    controls: [toggle('src', 'Source system and field'), toggle('rule', 'Transformation rule'), toggle('def', 'Missing-value default'), toggle('grain', 'Grain (facility vs obligor)')],
    initial: { src: 1, rule: 1, def: 0, grain: 1 },
    model(v) {
      const errs = (on(v, 'src') ? 0 : 60) + (on(v, 'rule') ? 0 : 25) + (on(v, 'def') ? 0 : 6) + (on(v, 'grain') ? 0 : 30);
      const wrong = Math.min(100, errs);
      return {
        readouts: [ro('Records wrong in the target', `${wrong}%`, wrong ? 'bad' : 'good')],
        insight: !on(v, 'grain') ? 'Wrong grain double-counts or drops exposure — obligor figures summed at facility level.' : wrong ? 'Most reporting defects trace to a gap in the mapping specification.' : 'Source, rule, default and grain all specified: engineers can build it right first time. (Error rates illustrative.)',
        scene: [chain([{ label: 'Source', tone: good(on(v, 'src')) }, { label: 'Rule', tone: good(on(v, 'rule')) }, { label: 'Default', tone: good(on(v, 'def')) }, { label: 'Grain', tone: good(on(v, 'grain')) }]), gauge(wrong, 100, [{ to: 1, tone: 'good' }, { to: 10, tone: 'warn' }, { to: 100, tone: 'bad' }], '% wrong')],
      };
    },
  },
  {
    id: 'ex-uat', conceptId: 'uat', district: 'studio', title: 'The boundary bench',
    prompt: 'The rule: Stage 2 when DPD > 30. The developer may have typed ≥. Pick test values and find the bug.',
    controls: [slider('dpd', 'Test case: days past due', 0, 60, 1, 'dpd'), toggle('bug', 'System was built with ≥ 30 (the bug)')],
    initial: { dpd: 45, bug: 1 },
    model(v) {
      const d = num(v, 'dpd');
      const expected = d > 30 ? 2 : 1;
      const actual = (on(v, 'bug') ? d >= 30 : d > 30) ? 2 : 1;
      const pass = expected === actual;
      return {
        readouts: [ro('Expected stage', `Stage ${expected}`), ro('System says', `Stage ${actual}`), ro('Test', pass ? 'Pass' : 'FAIL — bug found', pass ? 'good' : 'bad')],
        insight: !pass ? 'Found it: only the exact boundary exposes an off-by-one error. Always test 30 and 31.' : d === 30 || d === 31 ? 'A boundary test — this is where bugs live.' : 'This value passes either way: it cannot reveal the bug. Move to the boundary.',
        scene: [gauge(d, 60, [{ to: 30, tone: 'good' }, { to: 60, tone: 'warn' }], 'DPD'), chain([{ label: 'Expected', tone: 'accent' }, { label: 'System', tone: pass ? 'good' : 'bad' }, { label: pass ? 'PASS' : 'FAIL', tone: pass ? 'good' : 'bad', raised: true }])],
      };
    },
  },
  {
    id: 'ex-brd', conceptId: 'brd-frd', district: 'studio', title: 'What, why, how',
    prompt: 'A business need becomes a functional rule and then a test. Skip a layer and see who is lost.',
    controls: [toggle('br', 'Business requirement (what and why)'), toggle('fr', 'Functional requirement (how the system behaves)'), toggle('ac', 'Acceptance criteria')],
    initial: { br: 1, fr: 0, ac: 0 },
    model(v) {
      const who = !on(v, 'br') ? 'The business cannot confirm it meets the need' : !on(v, 'fr') ? 'Developers have to guess the logic' : !on(v, 'ac') ? 'Testers cannot prove it' : 'Everyone can do their job';
      const ok = on(v, 'br') && on(v, 'fr') && on(v, 'ac');
      return {
        readouts: [ro('Result', who, ok ? 'good' : 'bad')],
        insight: '“Deteriorated loans must carry lifetime ECL” is a business requirement. “Set STAGE = 2 when DPD > 30 or PD ratio ≥ 2” is functional. The BA translates one into the other.',
        scene: [chain([{ label: 'Need', tone: 'accent' }, { label: 'Business req', tone: good(on(v, 'br')), raised: on(v, 'br') }, { label: 'Functional req', tone: good(on(v, 'fr')), raised: on(v, 'fr') }, { label: 'Tests', tone: good(on(v, 'ac')), raised: on(v, 'ac') }])],
      };
    },
  },
];
