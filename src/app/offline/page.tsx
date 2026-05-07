export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "var(--bg-canvas)",
        color: "var(--fg-primary)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--fg-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
        <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "var(--fg-primary)",
          margin: 0,
        }}
      >
        Sem conexão
      </h1>
      <p style={{ color: "var(--fg-secondary)", margin: 0, maxWidth: "20rem" }}>
        Verifique sua internet e tente novamente. As páginas que você já visitou
        continuam disponíveis.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1.25rem",
          borderRadius: "6px",
          border: "none",
          background: "var(--accent)",
          color: "var(--accent-fg)",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}
