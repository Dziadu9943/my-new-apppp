import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import musicAsset from "@/assets/music.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dziadu" },
      { name: "description", content: "Dziadu — official links" },
    ],
  }),
  component: Index,
});

const CONFIG = {
  name: "Dziadu",
  tagline: "Developer / Creator",
  youtubeBgId: "cBa4vwJ1My8",
  audioSrc: "https://files.catbox.moe/5lettr.mp3" ,
  discord: "dziadu9943",
  discordId: "646259904960528385",
  youtubeUrl: "https://www.youtube.com/@dziadu9943",
  btc: "bc1qw7w7u24msxc67znmy3r3ctgtsl3e3ldwsq4lfr",
  ltc: "LMe8QVv66qeYMMn1qUeZ96QsxNe2JdjKvY",
};

const PISTOL_CURSOR =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><g fill='%23ffffff' stroke='%23000' stroke-width='1.2' stroke-linejoin='round'><path d='M3 12 H26 V18 H22 L20 26 H14 L12 22 H9 L7 26 H3 Z'/><rect x='26' y='8' width='6' height='4'/><rect x='22' y='14' width='3' height='2' fill='%23ff3b3b' stroke='none'/></g></svg>\") 4 8, auto";

// Brand SVG icons (simple-icons paths)
const DiscordIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a.07.07 0 0 0-.074.034 13.6 13.6 0 0 0-.61 1.249 18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25A.077.077 0 0 0 9.696 3a19.74 19.74 0 0 0-3.76 1.369.07.07 0 0 0-.032.027C2.533 9.045 1.6 13.58 2.06 18.057a.08.08 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
);
const YouTubeIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z"/></svg>
);
const BitcoinIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.328-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.974.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.236-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084z"/></svg>
);
const LitecoinIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-.262 3.678h2.584a.343.343 0 0 1 .33.435l-2.03 6.918 1.905-.582-.408 1.385-1.924.563-1.246 4.215h6.677a.343.343 0 0 1 .33.435l-.582 2.003a.435.435 0 0 1-.418.317H6.65l1.71-5.814-1.906.583.42-1.36 1.91-.58 2.413-8.18a.435.435 0 0 1 .418-.337z"/></svg>
);


function useLanyard(id: string) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let reconnect: ReturnType<typeof setTimeout> | null = null;
    const connect = () => {
      ws = new WebSocket("wss://api.lanyard.rest/socket");
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.op === 1) {
          ws?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: id } }));
          heartbeat = setInterval(() => ws?.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval);
        } else if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
          setData(msg.t === "INIT_STATE" ? msg.d[id] : msg.d);
        }
      };
      ws.onclose = () => { if (heartbeat) clearInterval(heartbeat); reconnect = setTimeout(connect, 2000); };
    };
    connect();
    return () => { if (heartbeat) clearInterval(heartbeat); if (reconnect) clearTimeout(reconnect); ws?.close(); };
  }, [id]);
  return data;
}

const STATUS_COLOR: Record<string, string> = {
  online: "bg-emerald-400",
  idle: "bg-amber-400",
  dnd: "bg-rose-500",
  offline: "bg-zinc-500",
};

function Index() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [entered, setEntered] = useState(false);
  const lanyard = useLanyard(CONFIG.discordId);
  const user = lanyard?.discord_user;
  const status: string = lanyard?.data?.discord_status ?? "offline";
console.log("DEBUG: Status z Lanyard to:", status); // statsu check
  const avatarUrl = "https://cdn.discordapp.com/avatars/646259904960528385/4cdebcdcf8cfd08faaaabca5ebc6e120.png?size=128";
  
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.5;
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[] = [];
    const colors = ["#22d3ee", "#a855f7", "#f472b6", "#facc15", "#34d399", "#fb7185"];

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          life: 1,
          color: colors[(Math.random() * colors.length) | 0],
          size: Math.random() * 4 + 2,
        });
      }
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 0.02;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const enter = async () => {
    setEntered(true);
    try { await audioRef.current?.play(); setPlaying(true); } catch {}
  };
  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { await audioRef.current.play(); setPlaying(true); }
  };
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };
  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied`, { description: value });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white" style={{ cursor: PISTOL_CURSOR }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <iframe
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "max(100vw, 177.78vh)", height: "max(56.25vw, 100vh)" }}
          src={`https://www.youtube.com/embed/${CONFIG.youtubeBgId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&playlist=${CONFIG.youtubeBgId}&vq=hd1080`}
          title="bg"
          allow="autoplay; encrypted-media"
          frameBorder={0}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-20" />

      <audio ref={audioRef} src={CONFIG.audioSrc} loop preload="auto" />

      {!entered && (
        <button onClick={enter} style={{ cursor: PISTOL_CURSOR }} className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/15 bg-white/5 px-12 py-7 text-center transition hover:bg-white/10">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/60">Click to</p>
            <p className="mt-1 text-4xl font-black tracking-wider">ENTER</p>
          </div>
        </button>
      )}

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/[0.07] bg-black/25 p-8 backdrop-blur-xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.5)]">
          {/* Name */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="dziadu"
                    className="h-10 w-10 rounded-full border border-white/15 object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full border border-white/15 bg-white/5" />
                )}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-black/60 ${STATUS_COLOR[status]}`}
                />
              </div>
              <h1 className="text-3xl font-light tracking-[0.15em] text-white/90">dziadu</h1>
            </div>
            <div className="mx-auto mt-3 h-[1px] w-12 bg-white/20" />
          </div>

          {/* Links */}
          <div className="space-y-1">
            <LinkRow
              icon={<DiscordIcon className="h-[18px] w-[18px] text-white/50" />}
              label="Discord"
              onClick={() => copy(CONFIG.discord, "Discord")}
              action="copy"
            />
            <LinkRow
              icon={<YouTubeIcon className="h-[18px] w-[18px] text-white/50" />}
              label="YouTube"
              onClick={() => window.open(CONFIG.youtubeUrl, "_blank")}
              action="open"
            />
            <LinkRow
              icon={<BitcoinIcon className="h-[18px] w-[18px] text-white/50" />}
              label="Bitcoin"
              onClick={() => copy(CONFIG.btc, "BTC address")}
              action="copy"
            />
            <LinkRow
              icon={<LitecoinIcon className="h-[18px] w-[18px] text-white/50" />}
              label="Litecoin"
              onClick={() => copy(CONFIG.ltc, "LTC address")}
              action="copy"
            />
          </div>
        </div>
      </main>

      {entered && (
        <div className="fixed bottom-5 right-5 z-30 flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur-xl">
          <button onClick={togglePlay} style={{ cursor: PISTOL_CURSOR }} className="rounded-full p-2 hover:bg-white/10">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button onClick={toggleMute} style={{ cursor: PISTOL_CURSOR }} className="rounded-full p-2 hover:bg-white/10">
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}

      <Toaster />
    </div>
  );
}

function LinkRow({ icon, label, onClick, action }: {
  icon: React.ReactNode; label: string; onClick: () => void; action: "copy" | "open";
}) {
  return (
    <button
      onClick={onClick}
      style={{ cursor: PISTOL_CURSOR }}
      className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.04]"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-white/70 tracking-wide">{label}</span>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest text-white/25 transition group-hover:text-white/40">
        {action}
      </span>
    </button>
  );
}
