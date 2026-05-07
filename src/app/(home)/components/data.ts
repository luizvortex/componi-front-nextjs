export type Story = {
  handle: string;
  name: string;
  unread: boolean;
};

export type Post = {
  id: number;
  author: string;
  name: string;
  time: string;
  title: string;
  fw: string;
  seed: number;
  likes: number;
  comments: number;
  forks: number;
  tags: string[];
  liked: boolean;
};

export type TrendingItem = {
  rank: number;
  name: string;
  author: string;
  likes: number;
};

export type Suggestion = {
  name: string;
  handle: string;
  bio: string;
};

export const STORIES: Story[] = [
  { handle: "sarah_dev", name: "Sarah", unread: true },
  { handle: "carlosm", name: "Carlos", unread: false },
  { handle: "priya_ui", name: "Priya", unread: true },
  { handle: "felix", name: "Felix", unread: false },
  { handle: "anya", name: "Anya", unread: false },
];

export const POSTS: Post[] = [
  {
    id: 1,
    author: "luiz",
    name: "Luiz Felipe",
    time: "2h ago",
    title: "Command Palette",
    fw: "React",
    seed: 0,
    likes: 1200,
    comments: 34,
    forks: 89,
    tags: ["search", "keyboard", "modal"],
    liked: true,
  },
  {
    id: 2,
    author: "sarah_dev",
    name: "Sarah Chen",
    time: "5h ago",
    title: "Animated Tab Bar",
    fw: "React",
    seed: 1,
    likes: 876,
    comments: 21,
    forks: 45,
    tags: ["animation", "tabs", "framer"],
    liked: false,
  },
  {
    id: 3,
    author: "carlosm",
    name: "Carlos Mendes",
    time: "yesterday",
    title: "Multi-Step Form",
    fw: "Vue",
    seed: 2,
    likes: 543,
    comments: 12,
    forks: 23,
    tags: ["forms", "validation"],
    liked: false,
  },
];

export const TRENDING: TrendingItem[] = [
  { rank: 1, name: "command-palette", author: "luiz", likes: 1200 },
  { rank: 2, name: "animated-tab-bar", author: "sarah_dev", likes: 876 },
  { rank: 3, name: "toast-stack", author: "felix", likes: 543 },
  { rank: 4, name: "data-table", author: "priya_ui", likes: 412 },
  { rank: 5, name: "glass-card", author: "kenji", likes: 310 },
];

export const SUGGESTIONS: Suggestion[] = [
  { name: "Sera Vaughn", handle: "sera", bio: "shadcn maintainer" },
  { name: "Otis Park", handle: "otis", bio: "design-engineer at Resolve" },
  { name: "Lin Ko", handle: "lin", bio: "dataviz components" },
];
