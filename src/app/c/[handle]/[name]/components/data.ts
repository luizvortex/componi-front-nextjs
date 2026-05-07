export type LineageNode = {
  id: string;
  level: number;
  col: number;
  row: number;
  name: string;
  author: string;
  forks: number;
  seed: number;
  current?: boolean;
};

export type LineageEdge = {
  from: string;
  to: string;
};

export const LINEAGE_NODES: LineageNode[] = [
  { id: "anc1", level: 0, col: 0, row: 0, name: "modal-base", author: "@kenji", forks: 3, seed: 1 },
  { id: "anc2", level: 1, col: 1, row: 0, name: "modal-v2", author: "@theo", forks: 12, seed: 2 },
  {
    id: "curr",
    level: 2,
    col: 2,
    row: 0,
    name: "command-palette",
    author: "@luiz",
    forks: 34,
    seed: 0,
    current: true,
  },
  { id: "d1", level: 3, col: 3, row: 0, name: "cmd-dark", author: "@sarah", forks: 5, seed: 3 },
  { id: "d2", level: 3, col: 3, row: 1, name: "cmd-vue", author: "@carlos", forks: 8, seed: 4 },
  { id: "d3", level: 3, col: 3, row: 2, name: "cmd-mini", author: "@anya", forks: 2, seed: 1 },
];

export const LINEAGE_EDGES: LineageEdge[] = [
  { from: "anc1", to: "anc2" },
  { from: "anc2", to: "curr" },
  { from: "curr", to: "d1" },
  { from: "curr", to: "d2" },
  { from: "curr", to: "d3" },
];

export type Token = { t: string; v: string };
export type CodeLine = { tokens: Token[] };

export const CODE_LINES: CodeLine[] = [
  { tokens: [{ t: "cm", v: "// command-palette.tsx — @luiz/command-palette v3.2" }] },
  { tokens: [] },
  {
    tokens: [
      { t: "kw", v: "import" },
      { t: "op", v: " { " },
      { t: "pl", v: "useState" },
      { t: "op", v: ", " },
      { t: "pl", v: "useEffect" },
      { t: "op", v: ", " },
      { t: "pl", v: "useRef" },
      { t: "op", v: " } " },
      { t: "kw", v: "from" },
      { t: "str", v: " 'react'" },
    ],
  },
  {
    tokens: [
      { t: "kw", v: "import" },
      { t: "op", v: " { " },
      { t: "pl", v: "Command" },
      { t: "op", v: " } " },
      { t: "kw", v: "from" },
      { t: "str", v: " '@/components/ui'" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { t: "kw", v: "interface" },
      { t: "fn", v: " CommandPaletteProps" },
      { t: "op", v: " {" },
    ],
  },
  {
    tokens: [
      { t: "pl", v: "  open" },
      { t: "op", v: ":" },
      { t: "kw", v: " boolean" },
      { t: "op", v: ";" },
    ],
  },
  {
    tokens: [
      { t: "pl", v: "  onClose" },
      { t: "op", v: ":" },
      { t: "fn", v: " () => void" },
      { t: "op", v: ";" },
    ],
  },
  {
    tokens: [
      { t: "pl", v: "  commands" },
      { t: "op", v: ":" },
      { t: "fn", v: " CommandItem[]" },
      { t: "op", v: ";" },
    ],
  },
  { tokens: [{ t: "op", v: "}" }] },
  { tokens: [] },
  {
    tokens: [
      { t: "kw", v: "export" },
      { t: "kw", v: " function" },
      { t: "fn", v: " CommandPalette" },
      { t: "op", v: "({" },
      { t: "pl", v: "open" },
      { t: "op", v: "," },
      { t: "pl", v: "onClose" },
      { t: "op", v: "," },
      { t: "pl", v: "commands" },
      { t: "op", v: "}:" },
      { t: "fn", v: " CommandPaletteProps" },
      { t: "op", v: ") {" },
    ],
  },
  {
    tokens: [
      { t: "kw", v: "  const" },
      { t: "op", v: " [" },
      { t: "pl", v: "query" },
      { t: "op", v: "," },
      { t: "pl", v: "setQuery" },
      { t: "op", v: "] =" },
      { t: "fn", v: " useState" },
      { t: "op", v: "(" },
      { t: "str", v: "''" },
      { t: "op", v: ")" },
    ],
  },
  {
    tokens: [
      { t: "kw", v: "  const" },
      { t: "op", v: " [" },
      { t: "pl", v: "selected" },
      { t: "op", v: "," },
      { t: "pl", v: "setSelected" },
      { t: "op", v: "] =" },
      { t: "fn", v: " useState" },
      { t: "op", v: "(" },
      { t: "px", v: "0" },
      { t: "op", v: ")" },
    ],
  },
  {
    tokens: [
      { t: "kw", v: "  const" },
      { t: "pl", v: " inputRef" },
      { t: "op", v: " =" },
      { t: "fn", v: " useRef" },
      { t: "op", v: "<" },
      { t: "fn", v: "HTMLInputElement" },
      { t: "op", v: ">" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { t: "kw", v: "  const" },
      { t: "pl", v: " filtered" },
      { t: "op", v: " = " },
      { t: "pl", v: "commands" },
      { t: "op", v: "." },
      { t: "fn", v: "filter" },
      { t: "op", v: "(c => c." },
      { t: "pl", v: "label" },
      { t: "op", v: "." },
      { t: "fn", v: "toLowerCase" },
      { t: "op", v: "()." },
      { t: "fn", v: "includes" },
      { t: "op", v: "(" },
    ],
  },
  {
    tokens: [
      { t: "pl", v: "    query" },
      { t: "op", v: "." },
      { t: "fn", v: "toLowerCase" },
      { t: "op", v: "()))" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { t: "kw", v: "  if" },
      { t: "op", v: " (!" },
      { t: "pl", v: "open" },
      { t: "op", v: ") " },
      { t: "kw", v: "return" },
      { t: "kw", v: " null" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { t: "kw", v: "  return" },
      { t: "op", v: " (" },
    ],
  },
  {
    tokens: [
      { t: "op", v: "    <" },
      { t: "fn", v: "Command" },
      { t: "op", v: "." },
      { t: "fn", v: "Dialog" },
      { t: "op", v: " " },
      { t: "pl", v: "open" },
      { t: "op", v: "={" },
      { t: "pl", v: "open" },
      { t: "op", v: "} " },
      { t: "pl", v: "onOpenChange" },
      { t: "op", v: "={c =>" },
      { t: "fn", v: " onClose" },
      { t: "op", v: "}> " },
    ],
  },
  {
    tokens: [
      { t: "op", v: "      <" },
      { t: "fn", v: "Command" },
      { t: "op", v: "." },
      { t: "fn", v: "Input" },
    ],
  },
  {
    tokens: [
      { t: "pl", v: "        ref" },
      { t: "op", v: "={" },
      { t: "pl", v: "inputRef" },
      { t: "op", v: "}" },
    ],
  },
  {
    tokens: [
      { t: "pl", v: "        value" },
      { t: "op", v: "={" },
      { t: "pl", v: "query" },
      { t: "op", v: "}" },
    ],
  },
  {
    tokens: [
      { t: "pl", v: "        onValueChange" },
      { t: "op", v: "={" },
      { t: "pl", v: "setQuery" },
      { t: "op", v: "}" },
    ],
  },
  { tokens: [{ t: "op", v: "      />" }] },
];

export type Dependency = {
  name: string;
  version: string;
  pinned: boolean;
  desc: string;
};

export const DEPENDENCIES: Dependency[] = [
  {
    name: "@radix-ui/react-dialog",
    version: "^1.0.5",
    pinned: false,
    desc: "Accessible dialog primitive",
  },
  {
    name: "@radix-ui/react-slot",
    version: "^1.0.2",
    pinned: true,
    desc: "Slot composition utility",
  },
  { name: "cmdk", version: "^0.2.0", pinned: false, desc: "Command menu component" },
  { name: "framer-motion", version: "^11.0.0", pinned: false, desc: "Animation library" },
  { name: "clsx", version: "2.1.0", pinned: true, desc: "Classnames utility" },
];

export type Comment = {
  author: string;
  name: string;
  time: string;
  text: string;
  isAuthor?: boolean;
};

export const COMMENTS: Comment[] = [
  {
    author: "priya_ui",
    name: "Priya Sharma",
    time: "1h ago",
    text: "Loved this implementation — could you add focus trap support for nested dialogs?",
  },
  {
    author: "felix",
    name: "Felix Bauer",
    time: "3h ago",
    text: "v3 is so much cleaner. The fuzzy match algorithm is exactly what I needed.",
  },
  {
    author: "luiz",
    name: "Luiz Felipe",
    time: "4h ago",
    text: "Thanks! Focus trap is already in the roadmap for v3.1. PR welcome if you want to contribute.",
    isAuthor: true,
  },
  {
    author: "anya",
    name: "Anya Volkov",
    time: "yesterday",
    text: "The Esc key behavior is perfect. One thing — could the backdrop be opt-out?",
  },
];
