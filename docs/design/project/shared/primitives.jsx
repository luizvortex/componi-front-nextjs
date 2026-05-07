/* global React */
const { useState, useEffect, useRef } = React;

/* ──────────────────────────────────────────────────────────────────────────
   Componi — Shared Primitives (icons, logo, avatar, tag, button, preview)
   ────────────────────────────────────────────────────────────────────────── */

const ICONS = {
  search:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  heart:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  heartFill: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  fork:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>,
  star:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>,
  starFill:  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>,
  msg:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  share:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  copy:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  plus:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  bell:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  compass:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  sun:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  moon:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  menu:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  home:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  trending:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  arrowRt:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  check:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
};

function Logo({ size=20 }) {
  return (
    <div style={{display:"inline-flex",alignItems:"baseline",font:`600 ${size}px var(--font-ui)`,letterSpacing:"-0.04em",color:"var(--fg-primary)"}}>
      compon<span style={{display:"inline-block",position:"relative"}}>i<span style={{position:"absolute",left:`${size*0.15}px`,top:`${size*0.15}px`,width:`${Math.max(4,size*0.2)}px`,height:`${Math.max(4,size*0.2)}px`,background:"var(--accent)",borderRadius:"1px"}}/></span>
    </div>
  );
}

const AV_PALETTE = ["#A31F37","#4F46E5","#0EA5E9","#10B981","#D97706","#7C3AED","#DB2777","#059669"];
function avColor(name=""){ let h=0; for(let i=0;i<name.length;i++) h = (h*31 + name.charCodeAt(i))>>>0; return AV_PALETTE[h%AV_PALETTE.length]; }

function Avatar({ name="M", size=24, color }) {
  const c = color || avColor(name);
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background:`linear-gradient(135deg, ${c} 0%, rgba(0,0,0,0.45) 100%)`,
      display:"inline-flex",alignItems:"center",justifyContent:"center",
      color:"#fff",font:`600 ${Math.round(size*0.42)}px var(--font-ui)`,flexShrink:0,
      userSelect:"none",
    }}>{name[0]?.toUpperCase()}</div>
  );
}

function Tag({ children, active, onClick, size="md" }) {
  const heights = { sm:"22px", md:"26px" };
  const fonts = { sm:"500 11px var(--font-ui)", md:"500 12px var(--font-ui)" };
  return (
    <button onClick={onClick} style={{
      display:"inline-flex",alignItems:"center",height:heights[size],padding:"0 10px",borderRadius:"999px",
      font:fonts[size], cursor:"pointer",
      background: active ? "var(--accent-muted)" : "var(--bg-elevated)",
      color: active ? (document.documentElement.getAttribute("data-theme")==="light" ? "var(--accent)" : "#F5F5F7") : "var(--fg-secondary)",
      border:`1px solid ${active?"var(--accent)":"var(--border-subtle)"}`,
      transition:"background var(--dur-state), border-color var(--dur-state), color var(--dur-state)",
    }}>{children}</button>
  );
}

function FwBadge({ name }) {
  const dots = { React:"#61DAFB", Vue:"#42B883", Svelte:"#FF3E00", Solid:"#2C4F7C", Angular:"#DD0031" };
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:"6px",height:"22px",padding:"0 8px",borderRadius:"4px",
      font:"500 11px var(--font-mono)",background:"rgba(10,11,13,0.72)",color:"#F5F5F7",
      border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(8px)",
    }}>
      <span style={{width:"6px",height:"6px",borderRadius:"50%",background:dots[name]||"var(--accent)"}}/>{name}
    </span>
  );
}

function Btn({ kind="secondary", children, icon, full, onClick, size="md", style={}, title }) {
  const heights = { sm:"28px", md:"32px", lg:"36px" };
  const h = heights[size];
  const base = {
    height:h,
    padding: icon&&!children ? "0" : "0 14px",
    width: icon && !children ? h : (full?"100%":"auto"),
    borderRadius:"6px", font:"500 13px var(--font-ui)",
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"6px",
    cursor:"pointer", border:"1px solid transparent",
    transition:"background var(--dur-state) var(--ease-out), border-color var(--dur-state), transform var(--dur-state)",
    ...style,
  };
  const byKind = {
    primary:   { background:"var(--accent)", color:"var(--accent-fg)" },
    secondary: { background:"var(--bg-surface)", color:"var(--fg-primary)", borderColor:"var(--border-strong)" },
    ghost:     { background:"transparent", color:"var(--fg-secondary)" },
    chip:      { background:"var(--bg-elevated)", color:"var(--fg-secondary)", borderColor:"var(--border-subtle)" },
  };
  return <button title={title} onClick={onClick} className={`btn-${kind}`} style={{...base, ...byKind[kind]}}>{icon}{children}</button>;
}

function PreviewArt({ seed=0 }) {
  const themes = [
    // 0 — Animated Tab Bar
    <div style={{position:"relative",width:"100%",height:"100%",background:"linear-gradient(135deg,#12141A 0%,#1A1D24 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{display:"flex",gap:"4px",padding:"4px",background:"rgba(10,11,13,0.6)",border:"1px solid #23262D",borderRadius:"999px"}}>
        {["Home","Search","Inbox","Profile"].map((l,i)=>
          <div key={i} style={{padding:"6px 14px",borderRadius:"999px",font:"500 11px var(--font-ui)",
            background:i===1?"var(--accent)":"transparent", color:i===1?"#fff":"#A1A1AA"}}>{l}</div>)}
      </div>
    </div>,
    // 1 — Multi-Step Form (Vue)
    <div style={{position:"relative",width:"100%",height:"100%",background:"linear-gradient(135deg,#0A0B0D 0%,#12141A 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
      <div style={{width:"70%",maxWidth:"220px",padding:"14px",background:"#12141A",border:"1px solid #23262D",borderRadius:"8px"}}>
        <div style={{display:"flex",gap:"4px",marginBottom:"10px"}}>
          {[1,2,3].map(i=><div key={i} style={{flex:1,height:"3px",borderRadius:"2px",background:i<=2?"var(--accent)":"#2E323B"}}/>)}
        </div>
        <div style={{font:"500 10px var(--font-ui)",color:"#71717A",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"6px"}}>Step 2 / 3</div>
        <div style={{height:"24px",background:"#1A1D24",border:"1px solid #23262D",borderRadius:"4px"}}/>
        <div style={{height:"24px",background:"#1A1D24",border:"1px solid #23262D",borderRadius:"4px",marginTop:"6px"}}/>
      </div>
    </div>,
    // 2 — Command Palette
    <div style={{position:"relative",width:"100%",height:"100%",background:"radial-gradient(circle at 60% 40%,#1A1D24 0%,#0A0B0D 70%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"75%",maxWidth:"230px",background:"#12141A",border:"1px solid #2E323B",borderRadius:"8px",overflow:"hidden",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
        <div style={{padding:"8px 10px",borderBottom:"1px solid #23262D",display:"flex",alignItems:"center",gap:"6px"}}>
          <div style={{width:"10px",height:"10px",border:"1.5px solid #71717A",borderRadius:"50%"}}/>
          <div style={{flex:1,height:"3px",background:"#2E323B",borderRadius:"2px"}}/>
          <span style={{font:"500 9px var(--font-mono)",color:"#71717A",padding:"1px 4px",background:"#1A1D24",borderRadius:"3px",border:"1px solid #23262D"}}>⌘K</span>
        </div>
        {[0,1,2].map(i=><div key={i} style={{padding:"6px 10px",display:"flex",alignItems:"center",gap:"6px",background:i===0?"var(--accent-muted)":"transparent",borderLeft:i===0?"2px solid var(--accent)":"2px solid transparent"}}>
          <div style={{width:"6px",height:"6px",borderRadius:"50%",background:i===0?"var(--accent)":"#2E323B"}}/>
          <div style={{flex:1,height:"4px",background:i===0?"#3D0B14":"#23262D",borderRadius:"2px"}}/>
        </div>)}
      </div>
    </div>,
    // 3 — Data Table
    <div style={{position:"relative",width:"100%",height:"100%",background:"linear-gradient(135deg,#12141A 0%,#0A0B0D 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"14px"}}>
      <div style={{width:"100%",maxWidth:"260px",background:"#12141A",border:"1px solid #23262D",borderRadius:"8px",overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px",padding:"7px 10px",background:"#1A1D24",borderBottom:"1px solid #23262D",gap:"8px"}}>
          {["Name","Status","↑"].map((l,i)=><div key={i} style={{font:"500 10px var(--font-ui)",color:"#A1A1AA",letterSpacing:"0.04em",textTransform:"uppercase"}}>{l}</div>)}
        </div>
        {[0,1,2,3].map(r=><div key={r} style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px",padding:"6px 10px",borderBottom:r<3?"1px solid #23262D":"none",gap:"8px",alignItems:"center"}}>
          <div style={{height:"4px",background:"#2E323B",borderRadius:"2px"}}/>
          <div style={{display:"inline-flex",alignItems:"center",gap:"4px"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:r%2===0?"#34D399":"#F59E0B"}}/><div style={{flex:1,height:"3px",background:"#2E323B",borderRadius:"2px"}}/></div>
          <div style={{height:"3px",background:"#2E323B",borderRadius:"2px"}}/>
        </div>)}
      </div>
    </div>,
    // 4 — Toast System (Svelte)
    <div style={{position:"relative",width:"100%",height:"100%",background:"radial-gradient(circle at 70% 30%,#3D0B14 0%,#0A0B0D 70%)",display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"flex-end",padding:"14px",gap:"6px"}}>
      {[0,1,2].map(i=>
        <div key={i} style={{width:`${78-i*8}%`,padding:"8px 10px",background:"rgba(18,20,26,0.92)",border:"1px solid #2E323B",borderRadius:"6px",display:"flex",alignItems:"center",gap:"8px",backdropFilter:"blur(8px)",opacity:1-i*0.25}}>
          <div style={{width:"8px",height:"8px",borderRadius:"50%",background:i===0?"#34D399":i===1?"var(--accent)":"#F59E0B"}}/>
          <div style={{flex:1,height:"3px",background:"#2E323B",borderRadius:"2px"}}/>
          <div style={{width:"8px",height:"8px",color:"#71717A",fontSize:"10px",lineHeight:"8px"}}>×</div>
        </div>
      )}
    </div>,
    // 5 — Color Picker
    <div style={{position:"relative",width:"100%",height:"100%",background:"linear-gradient(135deg,#1A1D24 0%,#0A0B0D 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"70%",maxWidth:"200px",padding:"10px",background:"#12141A",border:"1px solid #23262D",borderRadius:"8px"}}>
        <div style={{height:"60px",borderRadius:"6px",background:"linear-gradient(135deg,#8B1A2F,#A31F37 30%,#F59E0B 60%,#34D399 100%)",position:"relative",marginBottom:"8px"}}>
          <div style={{position:"absolute",left:"35%",top:"40%",width:"10px",height:"10px",borderRadius:"50%",border:"2px solid #fff",boxShadow:"0 0 0 1px #0A0B0D"}}/>
        </div>
        <div style={{height:"6px",borderRadius:"3px",background:"linear-gradient(90deg,#FF0000,#FF8800,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)",marginBottom:"8px",position:"relative"}}>
          <div style={{position:"absolute",left:"15%",top:"-2px",width:"4px",height:"10px",background:"#fff",border:"1px solid #0A0B0D",borderRadius:"2px"}}/>
        </div>
        <div style={{font:"500 10px var(--font-mono)",color:"#A1A1AA"}}>#8B1A2F</div>
      </div>
    </div>,
    // 6 — Glass card (filler)
    <div style={{position:"relative",width:"100%",height:"100%",background:"linear-gradient(135deg,#3D0B14 0%,#12141A 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{padding:"14px 18px",background:"rgba(10,11,13,0.55)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"10px",color:"#fff",font:"500 12px var(--font-ui)",display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"22px",height:"22px",borderRadius:"50%",background:"linear-gradient(135deg,#A31F37,#3D0B14)"}}/>
        Glass card
      </div>
    </div>,
    // 7 — Avatar stack
    <div style={{position:"relative",width:"100%",height:"100%",background:"radial-gradient(circle at 30% 60%,#1A1D24 0%,#0A0B0D 70%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{display:"flex",alignItems:"center"}}>
        {["#A31F37","#4F46E5","#0EA5E9","#10B981"].map((c,i)=>
          <div key={i} style={{width:"32px",height:"32px",borderRadius:"50%",background:`linear-gradient(135deg,${c},rgba(0,0,0,0.4))`,marginLeft:i===0?0:"-10px",border:"2px solid #0A0B0D",zIndex:4-i}}/>)}
        <div style={{marginLeft:"-10px",width:"32px",height:"32px",borderRadius:"50%",background:"#1A1D24",border:"2px solid #0A0B0D",display:"flex",alignItems:"center",justifyContent:"center",font:"500 11px var(--font-mono)",color:"#A1A1AA"}}>+8</div>
      </div>
    </div>,
  ];
  return themes[seed % themes.length];
}

Object.assign(window, { ICONS, Logo, Avatar, Tag, FwBadge, Btn, PreviewArt, avColor });
