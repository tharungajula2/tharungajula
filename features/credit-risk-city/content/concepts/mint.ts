import type { Concept } from '../types';

// District 1 · The Mint — money, time and the bank balance sheet.
export const mint: Concept[] = [
  {
    id: 'balance-sheet', district: 'mint', layer: 'F', verified: false, anchor: 'mint-scales', prerequisites: [], links: ['net-interest-margin'],
    name: 'The bank balance sheet',
    oneLiner: 'Loans are the bank’s assets, deposits are its liabilities, and a thin layer of equity absorbs losses.',
    explanation:
      'A bank borrows money (deposits, borrowings) and lends it out (loans, investments). Assets = liabilities + equity.\n\nEquity is small next to assets — often less than a tenth. So a loss of a few percent on the loan book can wipe out a large share of the equity. That is the whole reason credit risk and capital are studied together.',
    whyItMatters: 'Every credit number you will build — provisions, write-offs, capital — ends up changing one line of this sheet.',
    misconception: '“Deposits are the bank’s money.” They are liabilities: the bank owes them back to depositors.',
  },
  {
    id: 'net-interest-margin', district: 'mint', layer: 'F', verified: false, anchor: 'mint-spread', prerequisites: ['balance-sheet'], links: ['risk-based-pricing'],
    name: 'Net interest income and margin',
    oneLiner: 'A lender earns the spread: interest earned on loans minus interest paid on funding.',
    explanation:
      'Net interest income (NII) = interest income − interest expense.\nNet interest margin (NIM) = NII ÷ average interest-earning assets.\n\nOperating costs and credit losses are paid out of NII; what is left is profit, which builds equity.',
    whyItMatters: 'Margins are thin. With a 3% NIM, a 1% annual credit loss eats a third of it — this is why pricing must include expected loss.',
    misconception: '“NIM is profit.” It is before operating costs, credit losses and tax.',
  },
  {
    id: 'time-value', district: 'mint', layer: 'F', verified: false, anchor: 'mint-clock', prerequisites: [], links: ['effective-interest-rate', 'lgd-realised'],
    name: 'Time value of money',
    oneLiner: 'Money received later is worth less today; discounting brings it back to today’s value.',
    explanation:
      'Present value = future cash ÷ (1 + rate)^years.\n\n₹100 received in one year, at 10%, is worth ₹90.91 today. Received in two years, it is worth ₹82.64.',
    whyItMatters: 'Recoveries after default are discounted, so a slow recovery is a bigger loss even when the same cash eventually comes in.',
  },
  {
    id: 'effective-interest-rate', district: 'mint', layer: 'F', verified: false, anchor: 'mint-lens', prerequisites: ['time-value'], links: [],
    name: 'Effective interest rate (EIR)',
    oneLiner: 'The one rate that discounts a loan’s expected cash flows exactly back to its carrying amount.',
    explanation:
      'The EIR folds in fees and costs that are an integral part of the loan. If a borrower pays a ₹2 upfront fee on a ₹100 loan at 10%, the bank really lends ₹98 but earns interest on ₹100 — so the EIR is above 10%.\n\nUnder IFRS 9, interest revenue is EIR × gross carrying amount (× the net amount once credit-impaired), and ECL is discounted at the EIR.',
    whyItMatters: 'Fee amortisation and EIR engines are common BA projects; a wrong EIR distorts both income and provisions.',
    misconception: '“EIR is just the contract rate.” Only when there are no integral fees or costs.',
    sources: [{ label: 'IFRS 9, Appendix A (effective interest rate)', asOf: '2026-09' }],
  },
];
