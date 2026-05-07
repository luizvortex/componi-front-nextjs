import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke: IconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const fill: IconProps = {
  fill: "currentColor",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const HeartIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
export const HeartFillIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...fill} {...p}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
export const ForkIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={18} cy={5} r={3} />
    <circle cx={6} cy={12} r={3} />
    <circle cx={18} cy={19} r={3} />
    <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
);
export const StarIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);
export const StarFillIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...fill} {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);
export const MsgIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
export const ShareIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <line x1={22} y1={2} x2={11} y2={13} />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
export const BookmarkIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
export const BookmarkFillIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...fill} {...p}>
    <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={11} cy={11} r={7} />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
export const BellIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
export const HomeIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
export const HomeFillIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...fill} {...p}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
export const CompassIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={12} cy={12} r={10} />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <line x1={12} y1={5} x2={12} y2={19} />
    <line x1={5} y1={12} x2={19} y2={12} />
  </svg>
);
export const PlusSquareIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x={3} y={3} width={18} height={18} rx={2} />
    <line x1={12} y1={8} x2={12} y2={16} />
    <line x1={8} y1={12} x2={16} y2={12} />
  </svg>
);
export const UserIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx={12} cy={7} r={4} />
  </svg>
);
export const SettingsIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={12} cy={12} r={3} />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
export const SunIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={12} cy={12} r={4} />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
export const MoonIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
export const MenuIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...stroke} {...p}>
    <line x1={3} y1={6} x2={21} y2={6} />
    <line x1={3} y1={12} x2={21} y2={12} />
    <line x1={3} y1={18} x2={21} y2={18} />
  </svg>
);
export const TrendingIcon = (p: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" {...stroke} {...p}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
export const CopyIcon = (p: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x={9} y={9} width={13} height={13} rx={2} />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
export const DownloadIcon = (p: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1={12} y1={15} x2={12} y2={3} />
  </svg>
);
export const ExternalLinkIcon = (p: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1={10} y1={14} x2={21} y2={3} />
  </svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" {...stroke} {...p}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
export const BackIcon = (p: IconProps) => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...stroke} {...p}>
    <line x1={19} y1={12} x2={5} y2={12} />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
export const MoreIcon = (p: IconProps) => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={12} cy={12} r={1} />
    <circle cx={19} cy={12} r={1} />
    <circle cx={5} cy={12} r={1} />
  </svg>
);
export const WarningIcon = (p: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1={12} y1={9} x2={12} y2={13} />
    <line x1={12} y1={17} x2={12.01} y2={17} />
  </svg>
);
export const XIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <line x1={18} y1={6} x2={6} y2={18} />
    <line x1={6} y1={6} x2={18} y2={18} />
  </svg>
);
export const SearchXIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m13.5 8.5-5 5M8.5 8.5l5 5" />
    <circle cx={11} cy={11} r={7} />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
export const UploadIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1={12} y1={3} x2={12} y2={15} />
  </svg>
);
export const GlobeIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={12} cy={12} r={10} />
    <line x1={2} y1={12} x2={22} y2={12} />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
export const GithubIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
export const RefreshIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
export const EyeIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx={12} cy={12} r={3} />
  </svg>
);
export const LockIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x={3} y={11} width={18} height={11} rx={2} />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
export const BlockIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx={12} cy={12} r={10} />
    <line x1={4.93} y1={4.93} x2={19.07} y2={19.07} />
  </svg>
);
export const TrashIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
export const FileTextIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1={16} y1={13} x2={8} y2={13} />
    <line x1={16} y1={17} x2={8} y2={17} />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
export const UsersIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx={9} cy={7} r={4} />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
export const TagIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1={7} y1={7} x2={7.01} y2={7} />
  </svg>
);
export const CameraIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx={12} cy={13} r={4} />
  </svg>
);
export const VolumeXIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1={23} y1={9} x2={17} y2={15} />
    <line x1={17} y1={9} x2={23} y2={15} />
  </svg>
);
export const DatabaseIcon = (p: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...stroke} {...p}>
    <ellipse cx={12} cy={5} rx={9} ry={3} />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
