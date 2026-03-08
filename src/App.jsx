import { useState } from "react";

const G = {
  bg: "#080808", card: "#111111", card2: "#181818", border: "#222222",
  gold: "#C9A84C", goldLight: "#E8C96A", goldDark: "#9A7A30",
  gray: "#888888", grayLight: "#AAAAAA", text: "#F0F0F0",
  red: "#E05252", green: "#52C07A",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${G.bg}; font-family: 'DM Sans', sans-serif; color: ${G.text}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${G.bg}; }
  ::-webkit-scrollbar-thumb { background: ${G.goldDark}; border-radius: 2px; }
  .app { max-width: 430px; min-height: 100vh; margin: 0 auto; background: ${G.bg}; position: relative; }
  .screen { min-height: calc(100vh - 72px); overflow-y: auto; padding-bottom: 88px; }
  .screen-auth { min-height: 100vh; padding-bottom: 0; }
  .navbar { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: rgba(10,10,10,0.97); backdrop-filter: blur(20px); border-top: 1px solid ${G.border}; display: flex; justify-content: space-around; align-items: center; padding: 8px 0 16px; z-index: 100; }
  .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; padding: 6px 12px; border: none; background: transparent; color: ${G.gray}; transition: color 0.2s; }
  .nav-btn.active { color: ${G.gold}; }
  .nav-btn svg { width: 22px; height: 22px; }
  .nav-label { font-size: 10px; font-weight: 500; }
  .nav-dot { width: 4px; height: 4px; border-radius: 50%; background: ${G.gold}; }
  .btn-gold { background: linear-gradient(135deg, ${G.gold}, ${G.goldDark}); color: #000; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px; border: none; border-radius: 14px; padding: 14px 24px; cursor: pointer; width: 100%; transition: filter 0.2s; }
  .btn-gold:hover { filter: brightness(1.1); }
  .btn-ghost { background: transparent; color: ${G.gold}; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; border: 1px solid ${G.goldDark}; border-radius: 14px; padding: 13px 24px; cursor: pointer; width: 100%; }
  .card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 20px; padding: 20px; }
  .card-gold { background: linear-gradient(135deg, #1A1500, #0F0F0F); border: 1px solid ${G.goldDark}; }
  .glow { box-shadow: 0 0 30px rgba(201,168,76,0.12); }
  .input { width: 100%; background: ${G.card2}; border: 1px solid ${G.border}; border-radius: 14px; padding: 14px 16px; color: ${G.text}; font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; transition: border 0.2s; }
  .input:focus { border-color: ${G.goldDark}; }
  .input::placeholder { color: ${G.gray}; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .b-gold { background: rgba(201,168,76,0.15); color: ${G.gold}; border: 1px solid rgba(201,168,76,0.3); }
  .b-green { background: rgba(82,192,122,0.15); color: ${G.green}; }
  .b-red { background: rgba(224,82,82,0.15); color: ${G.red}; }
  .b-gray { background: rgba(136,136,136,0.15); color: ${G.gray}; }
  .title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; }
  .stat { background: ${G.card2}; border: 1px solid ${G.border}; border-radius: 16px; padding: 16px; text-align: center; }
  .stat-n { font-family: 'Bebas Neue', sans-serif; font-size: 30px; color: ${G.gold}; line-height: 1; }
  .stat-l { font-size: 11px; color: ${G.gray}; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .progress { background: ${G.border}; border-radius: 99px; height: 6px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, ${G.goldDark}, ${G.gold}); }
  .row { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: ${G.card}; border: 1px solid ${G.border}; border-radius: 16px; cursor: pointer; transition: border 0.2s; }
  .row:hover { border-color: ${G.goldDark}; }
  .cal-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 8px; border-radius: 14px; cursor: pointer; border: 1px solid transparent; background: transparent; min-width: 44px; transition: all 0.2s; }
  .cal-btn.active { background: linear-gradient(135deg, ${G.gold}, ${G.goldDark}); }
  .cal-btn.active .cd, .cal-btn.active .cn { color: #000; }
  .cd { font-size: 10px; color: ${G.gray}; text-transform: uppercase; letter-spacing: 0.5px; }
  .cn { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: ${G.text}; }
  .trow { display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid ${G.border}; gap: 12px; }
  .trow:last-child { border-bottom: none; }
  .trow:hover { background: ${G.card2}; }
  .tabs { display: flex; background: ${G.card2}; border: 1px solid ${G.border}; border-radius: 12px; padding: 4px; gap: 4px; }
  .tab { flex: 1; padding: 8px; border-radius: 9px; border: none; background: transparent; color: ${G.gray}; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .tab.active { background: ${G.card}; color: ${G.gold}; }
  .mcard { background: linear-gradient(135deg, #1A1200, #0A0A0A, #1A1500); border: 1px solid ${G.goldDark}; border-radius: 24px; padding: 24px; position: relative; overflow: hidden; }
  .mcard::before { content:''; position:absolute; top:-40px; right:-40px; width:150px; height:150px; background:radial-gradient(circle,rgba(201,168,76,0.15),transparent 70%); border-radius:50%; }
  .scrollx { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
  .scrollx::-webkit-scrollbar { display: none; }
  .logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 4px; background: linear-gradient(135deg, ${G.goldLight}, ${G.gold}, ${G.goldDark}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .logo-sub { font-size: 10px; letter-spacing: 3px; color: ${G.gray}; text-transform: uppercase; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .fade { animation: fadeIn 0.3s ease forwards; }
  @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
  .pulse { animation: pulse 2s infinite; }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
const TRAINERS = [
  { id:1, name:"Alex Yılmaz", role:"EMS & Fonksiyonel", emoji:"💪", exp:"8 yıl", spec:["EMS","HIIT","Güç"], total:1420 },
  { id:2, name:"Selin Kaya",  role:"Pilates & EMS",     emoji:"⚡", exp:"5 yıl", spec:["Pilates","EMS","Stretching"], total:890 },
  { id:3, name:"Mert Demir",  role:"CrossFit & Kondisyon", emoji:"🔥", exp:"6 yıl", spec:["CrossFit","Kondisyon"], total:1100 },
  { id:4, name:"Aylin Çelik", role:"Yoga & Wellbeing",  emoji:"✨", exp:"9 yıl", spec:["Yoga","Mobility"], total:2100 },
];
const PACKAGES = [
  { id:1, name:"EMS STARTER",  total:8,  used:3, price:"₺2.800", expires:"15 Nis 2025" },
  { id:2, name:"PREMIUM EMS",  total:20, used:7, price:"₺6.500", expires:"30 Haz 2025", active:true },
];
const CLASSES = [
  { id:1, name:"EMS Power",      time:"09:00", dur:"45 dk", trainer:"Alex Yılmaz", cap:4,  booked:3, color:G.gold },
  { id:2, name:"Pilates Reform", time:"10:30", dur:"50 dk", trainer:"Selin Kaya",  cap:8,  booked:5, color:"#5B9CF6" },
  { id:3, name:"HIIT Blast",     time:"12:00", dur:"40 dk", trainer:"Mert Demir",  cap:10, booked:10, color:G.red },
  { id:4, name:"Yoga Flow",      time:"17:00", dur:"60 dk", trainer:"Aylin Çelik", cap:12, booked:7,  color:"#8B5CF6" },
  { id:5, name:"EMS Slim",       time:"19:00", dur:"45 dk", trainer:"Selin Kaya",  cap:4,  booked:2,  color:G.gold },
];
const MEMBERS = [
  { id:1, avatar:"BA", name:"Burak Arslan", pkg:"PREMIUM EMS",  status:"active",   sessions:13 },
  { id:2, avatar:"ZÖ", name:"Zeynep Öz",   pkg:"EMS STARTER",  status:"active",   sessions:5 },
  { id:3, avatar:"CY", name:"Can Yıldız",  pkg:"PREMIUM EMS",  status:"expired",  sessions:20 },
  { id:4, avatar:"EŞ", name:"Elif Şahin",  pkg:"HIIT PRO",     status:"active",   sessions:8 },
  { id:5, avatar:"OK", name:"Oğuz Kılıç",  pkg:"EMS STARTER",  status:"pending",  sessions:0 },
];
const APPTS = [
  { id:1, member:"Burak Arslan", cls:"EMS Power",      time:"09:00", trainer:"Alex Yılmaz", status:"confirmed" },
  { id:2, member:"Zeynep Öz",   cls:"Pilates Reform",  time:"10:30", trainer:"Selin Kaya",  status:"confirmed" },
  { id:3, member:"Elif Şahin",  cls:"EMS Slim",        time:"19:00", trainer:"Selin Kaya",  status:"pending" },
  { id:4, member:"Oğuz Kılıç",  cls:"HIIT Blast",      time:"12:00", trainer:"Mert Demir",  status:"cancelled" },
];
const DAYS = [
  {d:"Pzt",n:7},{d:"Sal",n:8},{d:"Çar",n:9},{d:"Per",n:10},{d:"Cum",n:11},{d:"Cmt",n:12},{d:"Paz",n:13}
];

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IcoHome     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcoPkg      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const IcoCal      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoUsers    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcoUser     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoChevron  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoBell     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;

// ── AUTH SCREEN ───────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode]   = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [name, setName]   = useState("");
  const [admin, setAdmin] = useState(false);

  return (
    <div className="screen screen-auth fade" style={{
      padding:"0 24px", display:"flex", flexDirection:"column",
      justifyContent:"center", minHeight:"100vh",
      background:`radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08), ${G.bg} 60%)`
    }}>
      <div style={{textAlign:"center", marginBottom:40}}>
        <div style={{width:72,height:72,borderRadius:20,background:`linear-gradient(135deg,${G.goldDark},${G.gold})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:32}}>⚡</div>
        <div className="logo">WAGMI GYM</div>
        <div className="logo-sub">& EMS FITNESS</div>
      </div>

      <div className="tabs" style={{marginBottom:24}}>
        <button className={`tab ${mode==="login"?"active":""}`}    onClick={()=>setMode("login")}>Giriş Yap</button>
        <button className={`tab ${mode==="register"?"active":""}`} onClick={()=>setMode("register")}>Kayıt Ol</button>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {mode==="register" && <input className="input" placeholder="Ad Soyad" value={name} onChange={e=>setName(e.target.value)} />}
        <input className="input" placeholder="E-posta" type="email"    value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Şifre"   type="password" value={pass}  onChange={e=>setPass(e.target.value)} />

        {mode==="login" && (
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <input type="checkbox" checked={admin} onChange={e=>setAdmin(e.target.checked)} style={{accentColor:G.gold}} />
            <span style={{fontSize:13,color:G.gray}}>Admin olarak giriş yap</span>
          </label>
        )}

        <div style={{height:4}} />
        <button className="btn-gold" onClick={()=>onLogin(admin?"admin":"user")}>
          {mode==="login" ? "GİRİŞ YAP" : "KAYIT OL"}
        </button>
        {mode==="login" && <button className="btn-ghost">Şifremi Unuttum</button>}
      </div>

      <p style={{textAlign:"center",fontSize:12,color:G.gray,marginTop:32,lineHeight:1.8}}>
        Giriş yaparak <span style={{color:G.gold}}>Kullanım Koşullarını</span> kabul etmiş olursunuz.
      </p>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({ onNav }) {
  const active = PACKAGES.find(p=>p.active);
  const pct = active ? Math.round((active.used/active.total)*100) : 0;

  return (
    <div className="screen fade" style={{padding:"0 20px"}}>
      <div style={{padding:"56px 0 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <p style={{fontSize:13,color:G.gray}}>Hoş geldin 👋</p>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:2}}>BURAK ARSLAN</h1>
        </div>
        <div style={{width:44,height:44,borderRadius:14,background:G.card,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:G.grayLight}}>
          <IcoBell />
        </div>
      </div>

      {/* Membership card */}
      {active && (
        <div className="mcard glow" style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div>
              <p style={{fontSize:11,color:G.gray,letterSpacing:1,textTransform:"uppercase"}}>Aktif Paket</p>
              <p style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:2,color:G.gold,marginTop:2}}>{active.name}</p>
            </div>
            <span className="badge b-gold">AKTİF</span>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:13,color:G.gray}}>Kullanılan</span>
              <span style={{fontSize:13,fontWeight:600}}>{active.used} / {active.total}</span>
            </div>
            <div className="progress"><div className="progress-fill" style={{width:`${pct}%`}} /></div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <p style={{fontSize:12,color:G.gray}}>Bitiş: <span style={{color:G.grayLight}}>{active.expires}</span></p>
            <p style={{fontSize:12,color:G.gold,fontWeight:600}}>{active.total-active.used} seans kaldı</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
        {[["24","SEANS"],["13","KALAN"],["4.8","PUAN"]].map(([n,l])=>(
          <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>

      {/* Quick actions */}
      <p className="title" style={{marginBottom:14}}>HIZLI İŞLEMLER</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
        {[
          {icon:"📅",label:"Ders Rezervasyonu",to:"reserve"},
          {icon:"👥",label:"Eğitmenler",to:"trainers"},
          {icon:"📦",label:"Paketlerim",to:"packages"},
          {icon:"👤",label:"Profilim",to:"profile"},
        ].map(({icon,label,to})=>(
          <button key={to} onClick={()=>onNav(to)} style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:18,padding:"18px 16px",cursor:"pointer",textAlign:"left",transition:"border 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=G.goldDark}
            onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
            <div style={{fontSize:28,marginBottom:8}}>{icon}</div>
            <p style={{fontSize:13,fontWeight:600,color:G.text}}>{label}</p>
          </button>
        ))}
      </div>

      {/* Next session */}
      <p className="title" style={{marginBottom:14}}>SONRAKI SEANSIN</p>
      <div className="card card-gold" style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:48,height:48,borderRadius:14,background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>⚡</div>
        <div style={{flex:1}}>
          <p style={{fontWeight:700,fontSize:15}}>EMS Power</p>
          <p style={{fontSize:12,color:G.gray,marginTop:2}}>Yarın • 09:00 • Alex Yılmaz</p>
        </div>
        <span className="badge b-gold">45 dk</span>
      </div>
    </div>
  );
}

// ── PACKAGES ──────────────────────────────────────────────────────────────────
function PackagesScreen() {
  const SHOP = [
    {name:"EMS STARTER",sessions:8, price:"₺2.800",icon:"⚡"},
    {name:"EMS PREMIUM",sessions:20,price:"₺6.500",icon:"💎",pop:true},
    {name:"EMS ELITE",  sessions:40,price:"₺11.000",icon:"👑"},
  ];
  return (
    <div className="screen fade" style={{padding:"0 20px"}}>
      <div style={{padding:"56px 20px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1 className="title">PAKETLERİM</h1>
        <span className="badge b-gold">{PACKAGES.length} Paket</span>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:28}}>
        {PACKAGES.map(p=>{
          const pct=Math.round((p.used/p.total)*100);
          return (
            <div key={p.id} className={`card ${p.active?"card-gold glow":""}`} style={{position:"relative"}}>
              {p.active && <div style={{position:"absolute",top:16,right:16}}><span className="badge b-gold">AKTİF</span></div>}
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <div style={{width:44,height:44,borderRadius:12,background:p.active?`linear-gradient(135deg,${G.gold},${G.goldDark})`:G.card2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{p.active?"⚡":"📦"}</div>
                <div>
                  <p style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:2,color:p.active?G.gold:G.text}}>{p.name}</p>
                  <p style={{fontSize:12,color:G.gray}}>Bitiş: {p.expires}</p>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
                {[["Toplam",p.total],["Kullanılan",p.used],["Kalan",p.total-p.used]].map(([l,v])=>(
                  <div key={l} style={{textAlign:"center",background:G.bg,borderRadius:12,padding:"10px 8px"}}>
                    <p style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:p.active?G.gold:G.grayLight}}>{v}</p>
                    <p style={{fontSize:10,color:G.gray,textTransform:"uppercase"}}>{l}</p>
                  </div>
                ))}
              </div>
              <div className="progress"><div className="progress-fill" style={{width:`${pct}%`}} /></div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
                <span style={{fontSize:12,color:G.gray}}>İlerleme: {pct}%</span>
                <span style={{fontSize:13,fontWeight:700,color:p.active?G.gold:G.gray}}>{p.price}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="title" style={{marginBottom:14}}>YENİ PAKET AL</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {SHOP.map(p=>(
          <div key={p.name} className="row" style={{justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:22}}>{p.icon}</span>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <p style={{fontWeight:600,fontSize:14}}>{p.name}</p>
                  {p.pop && <span className="badge b-gold" style={{fontSize:9}}>POPÜLER</span>}
                </div>
                <p style={{fontSize:12,color:G.gray}}>{p.sessions} seans</p>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{color:G.gold,fontWeight:700,fontSize:15}}>{p.price}</p>
              <p style={{fontSize:11,color:G.gray}}>{Math.round(parseInt(p.price.replace(/\D/g,""))/p.sessions)} ₺/seans</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── RESERVE ───────────────────────────────────────────────────────────────────
function ReserveScreen() {
  const [day,     setDay]     = useState(9);
  const [booked,  setBooked]  = useState([]);

  const toggle = id => setBooked(b=>b.includes(id)?b.filter(x=>x!==id):[...b,id]);

  return (
    <div className="screen fade" style={{padding:"0 20px"}}>
      <div style={{padding:"56px 20px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1 className="title">DERS REZERVASYONU</h1>
        <span className="badge b-gold">Mart 2025</span>
      </div>

      <div className="scrollx" style={{marginBottom:24}}>
        {DAYS.map(({d,n})=>(
          <button key={n} className={`cal-btn ${day===n?"active":""}`} onClick={()=>setDay(n)}>
            <span className="cd">{d}</span>
            <span className="cn">{n}</span>
          </button>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {CLASSES.map(cls=>{
          const full     = cls.booked>=cls.cap;
          const isBooked = booked.includes(cls.id);
          return (
            <div key={cls.id} className="card" style={{borderColor:isBooked?G.goldDark:G.border}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:cls.color,flexShrink:0,marginTop:4}} />
                  <div>
                    <p style={{fontWeight:700,fontSize:15}}>{cls.name}</p>
                    <p style={{fontSize:12,color:G.gray,marginTop:2}}>{cls.trainer}</p>
                  </div>
                </div>
                <span className={`badge ${full?"b-red":isBooked?"b-gold":"b-gray"}`}>
                  {full?"DOLU":isBooked?"REZERVE":`${cls.cap-cls.booked} yer`}
                </span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:14}}>
                  <p style={{fontSize:13,color:G.grayLight}}>{cls.time}</p>
                  <p style={{fontSize:13,color:G.gray}}>⏱ {cls.dur}</p>
                  <p style={{fontSize:13,color:G.gray}}>👥 {cls.booked}/{cls.cap}</p>
                </div>
                {!full && (
                  <button onClick={()=>toggle(cls.id)} style={{
                    padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",
                    fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif",
                    background:isBooked?"transparent":`linear-gradient(135deg,${G.gold},${G.goldDark})`,
                    color:isBooked?G.gold:"#000",
                    outline:isBooked?`1px solid ${G.goldDark}`:"none",
                  }}>
                    {isBooked?"İPTAL ET":"REZERVE ET"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TRAINERS ──────────────────────────────────────────────────────────────────
function TrainersScreen() {
  const [sel, setSel] = useState(null);
  const t = TRAINERS.find(x=>x.id===sel);

  if (t) return (
    <div className="screen fade" style={{padding:"0 20px"}}>
      <div style={{padding:"56px 0 16px"}}>
        <button onClick={()=>setSel(null)} style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:12,padding:"8px 14px",color:G.text,cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>← Geri</button>
      </div>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:96,height:96,borderRadius:"50%",background:`linear-gradient(135deg,${G.goldDark},${G.gold})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,margin:"0 auto 16px",border:`3px solid ${G.gold}`}}>{t.emoji}</div>
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:2}}>{t.name}</h2>
        <p style={{color:G.gray,fontSize:14,marginTop:4}}>{t.role}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
        {[[t.exp,"DENEYİM"],[`${t.total}+`,"SEANS"]].map(([n,l])=>(
          <div key={l} className="stat"><div className="stat-n" style={{fontSize:24}}>{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>
      <p className="title" style={{marginBottom:12}}>UZMANLIK ALANLARI</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
        {t.spec.map(s=><span key={s} className="badge b-gold" style={{fontSize:13,padding:"6px 14px"}}>{s}</span>)}
      </div>
      <button className="btn-gold">RANDEVU AL</button>
    </div>
  );

  return (
    <div className="screen fade" style={{padding:"0 20px"}}>
      <div style={{padding:"56px 20px 16px"}}><h1 className="title">EĞİTMENLER</h1></div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {TRAINERS.map(t=>(
          <div key={t.id} className="card" style={{display:"flex",alignItems:"center",gap:14,cursor:"pointer"}} onClick={()=>setSel(t.id)}
            onMouseEnter={e=>e.currentTarget.style.borderColor=G.goldDark}
            onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
            <div style={{width:56,height:56,borderRadius:"50%",border:`2px solid ${G.goldDark}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,background:G.card2,flexShrink:0}}>{t.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontWeight:700,fontSize:15}}>{t.name}</p>
              <p style={{fontSize:12,color:G.gray,marginTop:2}}>{t.role}</p>
              <div style={{display:"flex",gap:4,marginTop:6}}>
                {t.spec.slice(0,2).map(s=><span key={s} className="badge b-gray" style={{fontSize:10}}>{s}</span>)}
              </div>
            </div>
            <span style={{color:G.gray,width:20}}><IcoChevron /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROFILE ───────────────────────────────────────────────────────────────────
function ProfileScreen({ onLogout }) {
  const items = [
    {icon:"📊",label:"Antrenman Geçmişi",sub:"24 toplam seans"},
    {icon:"🎯",label:"Hedeflerim",sub:"3 aktif hedef"},
    {icon:"📏",label:"Vücut Ölçüleri",sub:"Son: 8 Mart"},
    {icon:"🔔",label:"Bildirimler",sub:"Tümü açık"},
    {icon:"🔒",label:"Şifre Değiştir",sub:""},
    {icon:"💳",label:"Ödeme Yöntemleri",sub:"•••• 4242"},
  ];
  return (
    <div className="screen fade" style={{padding:"0 20px"}}>
      <div style={{padding:"56px 20px 16px"}}><h1 className="title">PROFİLİM</h1></div>

      <div className="card card-gold glow" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#000",flexShrink:0}}>BA</div>
        <div style={{flex:1}}>
          <p style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:2}}>BURAK ARSLAN</p>
          <p style={{fontSize:13,color:G.gray}}>burak@email.com</p>
          <div style={{marginTop:6}}><span className="badge b-gold">PREMIUM ÜYE</span></div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
        {[["24","SEANS"],["8","AY ÜYE"],["4.8★","PUAN"]].map(([n,l])=>(
          <div key={l} className="stat"><div className="stat-n" style={{fontSize:22}}>{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>

      <div className="card" style={{padding:"8px 0",marginBottom:16}}>
        {items.map(({icon,label,sub},i)=>(
          <div key={label} className="trow" style={{cursor:"pointer",borderBottom:i<items.length-1?`1px solid ${G.border}`:"none"}}>
            <span style={{fontSize:20,width:28}}>{icon}</span>
            <div style={{flex:1}}>
              <p style={{fontSize:14,fontWeight:500}}>{label}</p>
              {sub && <p style={{fontSize:12,color:G.gray}}>{sub}</p>}
            </div>
            <span style={{color:G.gray,width:20}}><IcoChevron /></span>
          </div>
        ))}
      </div>
      <button className="btn-ghost" onClick={onLogout} style={{color:G.red,borderColor:"rgba(224,82,82,0.3)"}}>ÇIKIŞ YAP</button>
    </div>
  );
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────
function AdminScreen({ onLogout }) {
  const [tab,    setTab]    = useState("members");
  const [search, setSearch] = useState("");
  const [appts,  setAppts]  = useState(APPTS);

  const filtered = MEMBERS.filter(m=>m.name.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (id, status) =>
    setAppts(a=>a.map(x=>x.id===id?{...x,status}:x));

  return (
    <div className="screen fade" style={{padding:"0 20px"}}>
      <div style={{padding:"56px 0 16px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:G.gold}} className="pulse" />
            <span style={{fontSize:11,color:G.gold,letterSpacing:2,textTransform:"uppercase"}}>Admin Paneli</span>
          </div>
          <button onClick={onLogout} style={{background:"transparent",border:"none",color:G.gray,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Çıkış →</button>
        </div>
        <h1 className="title">YÖNETİM PANELİ</h1>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
        {[["47","ÜYE"],["12","BUGÜN"],["3","DOLU"]].map(([n,l])=>(
          <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>

      <div className="tabs" style={{marginBottom:20}}>
        <button className={`tab ${tab==="members"?"active":""}`}      onClick={()=>setTab("members")}>👥 Üyeler</button>
        <button className={`tab ${tab==="appointments"?"active":""}`} onClick={()=>setTab("appointments")}>📅 Randevular</button>
      </div>

      {tab==="members" && (
        <>
          <input className="input" placeholder="🔍  Üye ara..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:14}} />
          <div className="card" style={{padding:"8px 0"}}>
            {filtered.map((m,i)=>(
              <div key={m.id} className="trow" style={{borderBottom:i<filtered.length-1?`1px solid ${G.border}`:"none"}}>
                <div style={{width:40,height:40,borderRadius:12,background:G.card2,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G.gold,flexShrink:0}}>{m.avatar}</div>
                <div style={{flex:1}}>
                  <p style={{fontSize:14,fontWeight:600}}>{m.name}</p>
                  <p style={{fontSize:11,color:G.gray}}>{m.pkg} • {m.sessions} seans</p>
                </div>
                <span className={`badge ${m.status==="active"?"b-green":m.status==="expired"?"b-red":"b-gray"}`} style={{fontSize:10}}>
                  {m.status==="active"?"AKTİF":m.status==="expired"?"SONA ERDİ":"BEKLEMEDE"}
                </span>
              </div>
            ))}
          </div>
          <div style={{marginTop:14}}>
            <button className="btn-gold" style={{fontSize:13}}>+ YENİ ÜYE EKLE</button>
          </div>
        </>
      )}

      {tab==="appointments" && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {appts.map(a=>(
            <div key={a.id} className="card" style={{borderColor:a.status==="confirmed"?G.goldDark:a.status==="cancelled"?"rgba(224,82,82,0.3)":G.border}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <p style={{fontWeight:700,fontSize:14}}>{a.member}</p>
                <span className={`badge ${a.status==="confirmed"?"b-green":a.status==="cancelled"?"b-red":"b-gold"}`} style={{fontSize:10}}>
                  {a.status==="confirmed"?"ONAYLANDI":a.status==="cancelled"?"İPTAL":"BEKLEMEDE"}
                </span>
              </div>
              <p style={{fontSize:13,color:G.grayLight}}>{a.cls} — {a.time}</p>
              <p style={{fontSize:12,color:G.gray,marginTop:2}}>Eğitmen: {a.trainer}</p>
              {a.status==="pending" && (
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <button onClick={()=>updateStatus(a.id,"confirmed")} style={{flex:1,padding:"8px",borderRadius:10,background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,border:"none",cursor:"pointer",color:"#000",fontWeight:700,fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>ONAYLA</button>
                  <button onClick={()=>updateStatus(a.id,"cancelled")} style={{flex:1,padding:"8px",borderRadius:10,background:"transparent",border:"1px solid rgba(224,82,82,0.4)",cursor:"pointer",color:G.red,fontWeight:600,fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>İPTAL ET</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
const NAV = [
  {id:"home",    label:"Ana Sayfa", Ico:IcoHome},
  {id:"packages",label:"Paketler",  Ico:IcoPkg},
  {id:"reserve", label:"Rezerve",   Ico:IcoCal},
  {id:"trainers",label:"Eğitmenler",Ico:IcoUsers},
  {id:"profile", label:"Profil",    Ico:IcoUser},
];

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState(null);
  const [tab,  setTab]  = useState("home");

  const login  = r => { setRole(r); setTab("home"); };
  const logout = () => { setRole(null); setTab("home"); };

  const renderScreen = () => {
    if (role === "admin") return <AdminScreen onLogout={logout} />;
    switch (tab) {
      case "home":     return <HomeScreen     onNav={setTab} />;
      case "packages": return <PackagesScreen />;
      case "reserve":  return <ReserveScreen  />;
      case "trainers": return <TrainersScreen />;
      case "profile":  return <ProfileScreen  onLogout={logout} />;
      default:         return <HomeScreen     onNav={setTab} />;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {!role
          ? <AuthScreen onLogin={login} />
          : <>
              {renderScreen()}
              {role !== "admin" && (
                <nav className="navbar">
                  {NAV.map(({id,label,Ico})=>(
                    <button key={id} className={`nav-btn ${tab===id?"active":""}`} onClick={()=>setTab(id)}>
                      <Ico />
                      <span className="nav-label">{label}</span>
                      {tab===id && <div className="nav-dot" />}
                    </button>
                  ))}
                </nav>
              )}
            </>
        }
      </div>
    </>
  );
}
