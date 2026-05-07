/* global React, ICONS, Avatar, Tag, FwBadge, Btn, PreviewArt, TopBar */
const { useState, useEffect, useMemo } = React;

/* ──────────────────────────────────────────────────────────────────────────
   Home Feed — responsive, interactive, dark/light
   ────────────────────────────────────────────────────────────────────────── */

const FEED_DATA = [
  { id:1, author:"sarah_dev",  name:"Sarah Chen",     time:"2h",  title:"Animated Tab Bar",  desc:"Spring-driven indicator with scoped focus rings.",   fw:"React",  seed:0, likes:284, stars:42, forks:18, comments:12, tags:["animation","tabs","framer"] },
  { id:2, author:"carlosm",    name:"Carlos Mendes",  time:"4h",  title:"Multi-Step Form",   desc:"Paste-aware fields, validates on blur, no jank.",    fw:"Vue",    seed:1, likes:158, stars:31, forks:9,  comments:6,  tags:["forms","validation"] },
  { id:3, author:"luiz",       name:"Luiz Felipe",    time:"6h",  title:"Command Palette",   desc:"⌘K stack, fuzzy match, scoped sections.",            fw:"React",  seed:2, likes:412, stars:88, forks:34, comments:21, tags:["search","keyboard","modal"] },
  { id:4, author:"priya_ui",   name:"Priya Sharma",   time:"yesterday", title:"Data Table",  desc:"Virtualized, sortable, sticky header on scroll.",    fw:"React",  seed:3, likes:198, stars:24, forks:11, comments:4,  tags:["table","sorting"] },
  { id:5, author:"felix",      name:"Felix Bauer",    time:"2d",  title:"Toast System",      desc:"Stagger enter, swipe-to-dismiss on mobile.",         fw:"Svelte", seed:4, likes:201, stars:29, forks:12, comments:8,  tags:["notifications","portal"] },
  { id:6, author:"anya",       name:"Anya Volkov",    time:"3d",  title:"Color Picker",      desc:"OKLCH-aware, copy-paste in any format.",             fw:"React",  seed:5, likes:67,  stars:11, forks:3,  comments:2,  tags:["inputs","color"] },
];

const FILTER_TAGS = ["All","Buttons","Modals","Forms","Navigation","Animation","Data display"];

const TRENDING = [
  { rank:1, name:"command-palette",  author:"luiz",      likes:412 },
  { rank:2, name:"animated-tab-bar", author:"sarah_dev", likes:284 },
  { rank:3, name:"toast-stack",      author:"felix",     likes:201 },
  { rank:4, name:"data-table",       author:"priya_ui",  likes:198 },
  { rank:5, name:"glass-card",       author:"kenji",     likes:158 },
  { rank:6, name:"avatar-stack",     author:"jules",     likes:67 },
];

const PEOPLE = [
  { name:"Sera Vaughn", handle:"sera",  bio:"shadcn maintainer · motion curves" },
  { name:"Otis Park",   handle:"otis",  bio:"design-engineer at Resolve" },
  { name:"Lin Ko",      handle:"lin",   bio:"maps · charts · dataviz components" },
];

function StatBtn({ icon, count, active, onClick, accentOnActive, label }) {
  return (
    <button onClick={(e)=>{e.stopPropagation(); e.preventDefault(); onClick&&onClick();}}
      aria-label={label}
      style={{
        display:"inline-flex",alignItems:"center",gap:"6px",
        height:"32px", padding:"0 8px",
        background:"transparent",border:"none",cursor:"pointer",
        color: active && accentOnActive ? "var(--accent)" : "var(--fg-muted)",
        font:"500 12px var(--font-mono)",
        borderRadius:"6px",
        transition:"color var(--dur-state), background var(--dur-state)",
      }}
      onMouseEnter={e=>e.currentTarget.style.background="var(--bg-elevated)"}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
    >
      {icon}
      <span>{count}</span>
    </button>
  );
}

function FeedCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  const [starCount, setStarCount] = useState(item.stars);

  const onLike = () => {
    setLiked(v => { setLikeCount(c => c + (v?-1:1)); return !v; });
  };
  const onStar = () => {
    setStarred(v => { setStarCount(c => c + (v?-1:1)); return !v; });
  };

  return (
    <article
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        background:"var(--bg-surface)",
        border:`1px solid ${hovered?"var(--border-strong)":"var(--border-subtle)"}`,
        borderRadius:"8px", overflow:"hidden",
        transition:"border-color var(--dur-state) var(--ease-out), box-shadow var(--dur-state)",
        boxShadow: hovered ? "inset 0 0 0 1px rgba(139,26,47,0.18), var(--shadow-card)" : "var(--shadow-card)",
        cursor:"pointer",
        display:"flex", flexDirection:"column",
      }}>
      <div style={{aspectRatio:"16/10", position:"relative"}}>
        <PreviewArt seed={item.seed} />
        <div style={{
          position:"absolute", top:"10px", left:"10px",
          display:"flex", alignItems:"center", gap:"6px",
          padding:"3px 10px 3px 3px",
          background:"rgba(10,11,13,0.72)", border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:"999px", font:"500 11px var(--font-ui)", color:"#F5F5F7",
          backdropFilter:"blur(8px)",
        }}>
          <Avatar name={item.name} size={18} />
          @{item.author} · <span style={{color:"#A1A1AA"}}>{item.time}</span>
        </div>
        <div style={{position:"absolute", top:"10px", right:"10px"}}>
          <FwBadge name={item.fw} />
        </div>
      </div>

      <div style={{padding:"12px 14px", display:"flex", flexDirection:"column", gap:"8px", flex:1}}>
        <div>
          <div style={{font:"600 14px var(--font-ui)", color:"var(--fg-primary)"}}>{item.title}</div>
          <div style={{font:"400 13px var(--font-ui)", color:"var(--fg-secondary)", marginTop:"2px",
            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.desc}</div>
        </div>

        <div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>
          {item.tags.map(t =>
            <span key={t} style={{
              display:"inline-flex",alignItems:"center",height:"20px",padding:"0 8px",
              background:"var(--bg-elevated)", color:"var(--fg-secondary)",
              border:"1px solid var(--border-subtle)", borderRadius:"4px",
              font:"500 11px var(--font-ui)",
            }}>#{t}</span>)}
        </div>

        <div style={{
          display:"flex", alignItems:"center", gap:"2px", marginTop:"auto",
          paddingTop:"8px", borderTop:"1px solid var(--border-subtle)",
        }}>
          <StatBtn label="Like" icon={liked?ICONS.heartFill:ICONS.heart} count={likeCount} active={liked} accentOnActive onClick={onLike}/>
          <StatBtn label="Favorite" icon={starred?ICONS.starFill:ICONS.star} count={starCount} active={starred} accentOnActive onClick={onStar}/>
          <StatBtn label="Fork" icon={ICONS.fork} count={item.forks} />
          <StatBtn label="Comment" icon={ICONS.msg} count={item.comments} />
          <div style={{flex:1}}/>
          <StatBtn label="Share" icon={ICONS.share} count="" />
        </div>
      </div>
    </article>
  );
}

function TrendingCard() {
  return (
    <section style={{
      background:"var(--bg-surface)", border:"1px solid var(--border-subtle)",
      borderRadius:"8px", padding:"16px", boxShadow:"var(--shadow-card)",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
        <span style={{color:"var(--accent)"}}>{ICONS.trending}</span>
        <h3 style={{font:"600 14px var(--font-ui)", margin:0, color:"var(--fg-primary)"}}>Trending this week</h3>
        <div style={{flex:1}}/>
        <a href="#" style={{font:"500 12px var(--font-ui)", color:"var(--fg-muted)", textDecoration:"none"}}>See all</a>
      </div>
      <div style={{display:"flex",flexDirection:"column"}}>
        {TRENDING.map((t, i) =>
          <a key={t.rank} href="#" style={{
            display:"grid", gridTemplateColumns:"24px 1fr auto", alignItems:"center", gap:"10px",
            padding:"10px 0", borderTop:i===0?"none":"1px solid var(--border-subtle)",
            textDecoration:"none",
          }}>
            <span style={{font:"500 12px var(--font-mono)", color:"var(--fg-muted)"}}>{String(t.rank).padStart(2,"0")}</span>
            <div style={{minWidth:0}}>
              <div style={{font:"600 13px var(--font-ui)", color:"var(--fg-primary)", overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</div>
              <div style={{font:"400 12px var(--font-mono)", color:"var(--fg-muted)"}}>@{t.author}</div>
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:"4px",font:"500 12px var(--font-mono)",color:"var(--fg-muted)"}}>
              {ICONS.heart}{t.likes >= 1000 ? `${(t.likes/1000).toFixed(1)}k` : t.likes}
            </div>
          </a>
        )}
      </div>
    </section>
  );
}

function PeopleCard() {
  const [following, setFollowing] = useState({});
  return (
    <section style={{
      background:"var(--bg-surface)", border:"1px solid var(--border-subtle)",
      borderRadius:"8px", padding:"16px", boxShadow:"var(--shadow-card)",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
        <h3 style={{font:"600 14px var(--font-ui)", margin:0, color:"var(--fg-primary)"}}>People to follow</h3>
        <div style={{flex:1}}/>
        <a href="#" style={{font:"500 12px var(--font-ui)", color:"var(--fg-muted)", textDecoration:"none"}}>See all</a>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>
        {PEOPLE.map((p, i) =>
          <div key={p.handle} style={{
            display:"flex",alignItems:"center",gap:"10px", padding:"8px 0",
            borderTop: i===0?"none":"1px solid var(--border-subtle)",
          }}>
            <Avatar name={p.name} size={36} />
            <div style={{flex:1, minWidth:0}}>
              <div style={{font:"600 13px var(--font-ui)", color:"var(--fg-primary)"}}>{p.name}</div>
              <div style={{font:"400 12px var(--font-mono)", color:"var(--fg-muted)", overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>@{p.handle}</div>
            </div>
            <Btn
              kind={following[p.handle]?"primary":"secondary"}
              size="sm"
              onClick={() => setFollowing(f => ({...f, [p.handle]: !f[p.handle]}))}
            >
              {following[p.handle] ? "Following" : "Follow"}
            </Btn>
          </div>
        )}
      </div>
    </section>
  );
}

function HomeFeed({ empty=false }) {
  const [activeTag, setActiveTag] = useState("All");
  const [mq, setMq] = useState(typeof window!=="undefined"?window.innerWidth:1280);
  useEffect(() => {
    const onR = () => setMq(window.innerWidth);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  const isDesktop = mq >= 1024;
  const isMobile = mq < 640;

  // 3 cols on wide desktop, 2 cols mid, 1 col mobile
  const cols = mq >= 1440 ? 3 : (mq >= 640 ? 2 : 1);
  const gridCols = `repeat(${cols}, minmax(0,1fr))`;

  return (
    <div style={{minHeight:"100vh", background:"var(--bg-canvas)", color:"var(--fg-primary)", display:"flex", flexDirection:"column"}}>
      <TopBar active="home" unread={3} onSearch={()=>alert("⌘K palette comes in prompt 5 ✨")} />

      <div style={{
        flex:1, display:"grid",
        gridTemplateColumns: isDesktop ? "minmax(0,1fr) 320px" : "minmax(0,1fr)",
        maxWidth:"1400px", width:"100%", margin:"0 auto",
        padding: isMobile?"0":"0 24px",
        gap: isDesktop ? "32px" : "0",
      }}>
        {/* Main feed */}
        <main style={{padding: isMobile?"16px":"24px 0", minWidth:0}}>
          <div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"16px",flexWrap:"wrap",padding: isMobile?"0 4px":0}}>
            <h1 style={{font:"600 28px var(--font-ui)",letterSpacing:"-0.02em",margin:0,color:"var(--fg-primary)"}}>Following</h1>
            <span style={{font:"400 13px var(--font-mono)",color:"var(--fg-muted)"}}>{FEED_DATA.length * 24} components today</span>
          </div>

          <div style={{display:"flex",gap:"8px",marginBottom:"20px",flexWrap:"wrap",padding: isMobile?"0 4px":0,
            overflowX: isMobile?"auto":"visible"}}>
            {FILTER_TAGS.map(t => <Tag key={t} active={activeTag===t} onClick={()=>setActiveTag(t)}>{t}</Tag>)}
          </div>

          {empty ? (
            <div style={{
              border:"1px dashed var(--border-strong)", borderRadius:"8px",
              padding:"48px 24px", display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", gap:"12px",
              background:"var(--bg-surface)",
            }}>
              <div style={{color:"var(--fg-muted)"}}>{ICONS.compass}</div>
              <div style={{font:"400 14px var(--font-ui)", color:"var(--fg-secondary)", textAlign:"center"}}>
                Follow someone — or publish your first component.
              </div>
              <Btn kind="primary" icon={ICONS.compass}>Explore components</Btn>
            </div>
          ) : (
            <div style={{display:"grid", gridTemplateColumns:gridCols, gap:"16px"}}>
              {FEED_DATA.map(item => <FeedCard key={item.id} item={item}/>)}
            </div>
          )}

          <div style={{display:"flex",justifyContent:"center",marginTop:"24px"}}>
            <Btn kind="secondary">Load more</Btn>
          </div>
        </main>

        {/* Right rail */}
        {isDesktop && (
          <aside style={{padding:"24px 0", display:"flex", flexDirection:"column", gap:"16px",
            position:"sticky", top:"56px", alignSelf:"flex-start", maxHeight:"calc(100vh - 56px)", overflow:"auto"}}>
            <TrendingCard/>
            <PeopleCard/>
            <div style={{font:"400 11px var(--font-mono)", color:"var(--fg-muted)", padding:"0 4px",
              display:"flex", flexWrap:"wrap", gap:"10px"}}>
              <a href="#" style={{color:"inherit",textDecoration:"none"}}>About</a>
              <a href="#" style={{color:"inherit",textDecoration:"none"}}>Docs</a>
              <a href="#" style={{color:"inherit",textDecoration:"none"}}>API</a>
              <a href="#" style={{color:"inherit",textDecoration:"none"}}>Terms</a>
              <span>· © Componi 2026</span>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

window.HomeFeed = HomeFeed;
