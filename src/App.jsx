import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Search, Activity, ShieldAlert, RefreshCw, 
  DollarSign, BarChart2, Terminal, Wifi, Globe, Briefcase, Zap, 
  Maximize2, ArrowUp, ArrowDown, Newspaper, PieChart, Calendar, 
  Settings, X, CreditCard, Thermometer, Star, Clock, Users, Layout, 
  Droplet, Sun, Moon, Image as ImageIcon, Wind, Flame, Eye,
  Wallet, Plus, Minus, ShoppingBag, History, Lock
} from 'lucide-react';

// ==========================================
// 🎨 CONFIGURACIÓN DE IMÁGENES (TUS 40 FOTOS)
// ==========================================
const USER_IMAGES = {
  // Fondo para el tema "Wall St."
  wallStreetBg: "https://media.istockphoto.com/id/1497253868/photo/the-new-york-stock-exchange-on-the-wall-street-sign.jpg?s=612x612&w=0&k=20&c=B0-1n8NV_2CQVBSAC2L-1BGWI56rh5EosQqC-KD9X98=",
  
  // Catálogo de Noticias
  news: [
    "https://d1y8sb8igg2f8e.cloudfront.net/images/7_things_you_should_read_about_technologys_rol.width-800.jpg", // 0: Tecnología General
    "https://thelogisticsworld.com/wp-content/uploads/2023/02/2023-02-13T213252Z_1_LYNXMPEJ1C0XJ_RTROPTP_4_AMAZON-COM-RESULTS-1.jpg", // 1: Amazon
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYbtKt7DvTQNY95S_bze0ua1FIyoeOak64Iw&s", // 2: Tesla / Autos eléctricos
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFokR2F9-zF_CsUqntohJTGpOqMZ7N8eGclQ&s", // 3: Mercado Alcista (Verde)
    "https://cdn.corporatefinanceinstitute.com/assets/downtrend.jpeg", // 4: Mercado Bajista (Rojo)
    "https://humanidades.com/wp-content/uploads/2017/03/ciudad-3-e1565900105563-800x400.jpg", // 5: Ciudad / Economía Urbana
    "https://debateyconvergencia.com.ar/wp-content/uploads/2025/05/eeuu_dolar.jpg", // 6: Dólar / Economía USA
    "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/8640x5760+0+0/resize/1100/quality/50/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F1c%2Fec%2F620fc76d4ec2a7f10054eed45731%2Fgettyimages-2251825549.jpg", // 7: Política USA / Votaciones
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0k4HT8XcosU-e_aZQIBA3VC99ccXO23dkKQ&s", // 8: Dinero / Finanzas
    "https://images.stockcake.com/public/8/2/e/82e87d5a-3a8a-4591-982d-ddd136e78f77_large/executive-board-meeting-stockcake.jpg", // 9: Corporativo
    "https://www.arup.com/globalassets/images/insights/publications/rethinking-the-factory-banner.jpg", // 10: Fábrica / Industria
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TOTkc5labWHQU5j3dlcwGZbW8mK68jILYg&s", // 11: Wall Street
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR278LUNF7ETCmxxKFga82vG6blyvTnD8yRuA&s", // 12: Bitcoin / Crypto
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToOOaXfl4cS2w8Xf6xRynsW0SIDrkzOZzq9g&s", // 13: Casa Blanca / Gobierno USA
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdDHPeo1n7FDQfdYF4U1cmAR7kGOPY525kQ&s", // 14: China / Shanghai
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw-DiLEb_OtJ7rVbPWYqXv_NQ1pm-cQIAo8g&s", // 15: Petróleo / Oil
    "https://www.goldmarket.fr/wp-content/uploads/2025/09/ae3419e3thumbnail.jpeg", // 16: Oro
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZ1T8_cf0uanoL-uSzYhGEUHjVHaCT2bRRg&s", // 17: Banco Central Europeo
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvr15LmpXvrytKmapb9_Ax-ed1rbNx-Q3jSg&s", // 18: Apple
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBNN0HHfDb1V1fQ7V8RfatteS1LgDk2yHvw&s", // 19: Microsoft
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVt3x5p0dIKZsPfX_3H9xGYeMZe_us2YskA&s", // 20: Meta
    "https://media.istockphoto.com/id/644191738/es/foto/se%C3%B1al-de-banco.jpg?s=612x612&w=0&k=20&c=uyxv7EarIVvIxZ4mkO6s55uyWmPrhp9zDtL8gYZtPe4=", // 21: Bancos
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2x4P2KVvcOXRL3ptUaVD5MFI1B6-OE_RSpg&s", // 22: Goldman Sachs / Banca de inversión
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBuFB9spF6TR3oIwVXnA45Dj_W5Xb2CvvtdQ&s", // 23: Congreso USA
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaPs2WrX4Gi4voDdZ9CH7rBhLq47kmWFxSA&s", // 24: Japón
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6kXhIxFhZBQcdO5Sueyim9HBG3aY9JEPEkg&s", // 25: Fábrica EV
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDplGS4rVOo1pExzJpNOSVTp2_F7WzJNHVrw&s", // 26: Samsung
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7XDhaPs_rbtjoEoPThy5FSOWhuklPyyRbmw&s", // 27: Intel / Chips
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI0zozGXWPDba2IO1sa6Bn5q9910vKq35TA&s", // 28: Netflix
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5EQVkQvQxIdyslQVWEKUHy9zS9CuyWVObCg&s", // 29: Consumo / Retail
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnaODDhQHSFWUga4iQwH73sLkPW5CjcMnUIg&s", // 30: Construcción
    "https://cdn.flydays.co.uk/imgs/news/how-do-planes-take-off-the-science-behind-the-flight.jpg", // 31: Aerolíneas / Aviación
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ag0a9L-xQdDUsOnp-EwTjn7h7Jd2lsJMDg&s", // 32: Comercio Global / Shipping
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWo2eGugFYZrQNRIo3-5QuddeL-fkLusqI0Q&s", // 33: Farmacéutica
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh4vEau2jVZUwMPOoYPm61-xQOMKR93u5u2A&s", // 34: Energía Solar
    "https://cdn-3.expansion.mx/dims4/default/77cba30/2147483647/strip/true/crop/1254x836+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F3a%2Fe9%2F77062c714550babcca57d462e747%2Fistock-2162230248.jpg", // 35: Energía Eólica
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsaqhDTGQIbaAsf_wZECHgmuKQAI_VlgMqOg&s", // 36: Bienes Raíces
    "https://ammitechnologies.com/wp-content/uploads/2022/04/shutterstock_259506596-1068x718-1-930x620.jpg", // 37: Semiconductores
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39T42O85mwcF--4REizG8v888e1hN9FZPbg&s", // 38: Hedge Funds
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYgS-5LFd3eEp-GJ6dKdo_6ADX4aQC8SGmMA&s" // 39: Crisis Financiera
  ]
};

// --- HELPER: CEREBRO DE IMÁGENES (V3.0) ---
const getSmartImage = (headline, summary) => {
  const text = (headline + " " + summary).toLowerCase();
  
  // 1. EMPRESAS TECH & GIGANTES (Prioridad Máxima)
  if (text.includes("apple") || text.includes("iphone") || text.includes("mac") || text.includes("aapl")) return USER_IMAGES.news[18];
  if (text.includes("microsoft") || text.includes("windows") || text.includes("azure") || text.includes("msft")) return USER_IMAGES.news[19];
  if (text.includes("meta") || text.includes("facebook") || text.includes("instagram") || text.includes("zuckerberg")) return USER_IMAGES.news[20];
  if (text.includes("amazon") || text.includes("prime") || text.includes("bezos") || text.includes("amzn")) return USER_IMAGES.news[1];
  if (text.includes("tesla") || text.includes("musk") || text.includes("tsla")) return USER_IMAGES.news[2];
  if (text.includes("netflix") || text.includes("stream") || text.includes("nflx")) return USER_IMAGES.news[28];
  if (text.includes("samsung") || text.includes("galaxy")) return USER_IMAGES.news[26];
  if (text.includes("intel") || text.includes("intc")) return USER_IMAGES.news[27];

  // 2. ECONOMÍA, POLÍTICA Y MACRO (Prioridad Alta)
  if (text.includes("china") || text.includes("asia") || text.includes("beijing") || text.includes("xi ") || text.includes("alibaba")) return USER_IMAGES.news[14];
  if (text.includes("fed ") || text.includes("powell") || text.includes("rates") || text.includes("inflation") || text.includes("cpi") || text.includes("gdp") || text.includes("economy")) return USER_IMAGES.news[6];
  if (text.includes("biden") || text.includes("white house") || text.includes("trump") || text.includes("president") || text.includes("election")) return USER_IMAGES.news[13];
  if (text.includes("congress") || text.includes("senate") || text.includes("law") || text.includes("legislation")) return USER_IMAGES.news[23];
  if (text.includes("europe") || text.includes("ecb") || text.includes("euro") || text.includes("lagarde")) return USER_IMAGES.news[17];
  if (text.includes("bank") || text.includes("finance") || text.includes("lending") || text.includes("recession")) return USER_IMAGES.news[21];

  // 3. SECTORES ESPECÍFICOS
  if (text.includes("auto") || text.includes("ev ") || text.includes("vehicle") || text.includes("ford") || text.includes("gm ")) return USER_IMAGES.news[25];
  if (text.includes("chip") || text.includes("semi") || text.includes("nvidia") || text.includes("amd") || text.includes("tsmc")) return USER_IMAGES.news[37];
  if (text.includes("ai ") || text.includes("artificial") || text.includes("gpt") || text.includes("bot")) return USER_IMAGES.news[30];
  if (text.includes("crypto") || text.includes("bitcoin") || text.includes("btc") || text.includes("eth ") || text.includes("blockchain")) return USER_IMAGES.news[12];
  if (text.includes("oil") || text.includes("petroleum") || text.includes("barrel") || text.includes("energy") || text.includes("gas ")) return USER_IMAGES.news[15];
  if (text.includes("solar") || text.includes("wind") || text.includes("clean energy")) return USER_IMAGES.news[34];
  
  if (text.includes("retail") || text.includes("shop") || text.includes("store") || text.includes("walmart") || text.includes("consumer goods") || text.includes("shopping")) return USER_IMAGES.news[29];
  
  if (text.includes("pharma") || text.includes("health") || text.includes("drug") || text.includes("vaccine")) return USER_IMAGES.news[33];
  if (text.includes("airline") || text.includes("plane") || text.includes("travel") || text.includes("flight")) return USER_IMAGES.news[31];
  if (text.includes("ship") || text.includes("cargo") || text.includes("supply chain")) return USER_IMAGES.news[32];
  if (text.includes("home") || text.includes("housing") || text.includes("real estate")) return USER_IMAGES.news[36];
  if (text.includes("gold") || text.includes("silver") || text.includes("metal") || text.includes("mining")) return USER_IMAGES.news[16];

  // 4. SENTIMIENTO DE MERCADO Y BOLSA (Genérico)
  if (text.includes("rise") || text.includes("bull") || text.includes("surge") || text.includes("record") || text.includes("high")) return USER_IMAGES.news[3];
  if (text.includes("fall") || text.includes("bear") || text.includes("drop") || text.includes("crash") || text.includes("down") || text.includes("loss") || text.includes("sell-off")) return USER_IMAGES.news[4];
  
  if (text.includes("wall street") || text.includes("market") || text.includes("nyse") || text.includes("dow") || text.includes("s&p") || text.includes("stock") || text.includes("shares") || text.includes("equity")) return USER_IMAGES.news[11]; 

  return USER_IMAGES.news[9];
};

const API_CONFIG = {
  apiKey: "d67mv3pr01qobepijjfgd67mv3pr01qobepijjg0", 
  baseUrl: "https://finnhub.io/api/v1"
};

const MARKET_POOL = [
  "NVDA", "TSLA", "AMD", "COIN", "PLTR", "META", "NFLX", "UBER", "AAPL", "MSFT", 
  "AMZN", "GOOGL", "SPOT", "INTC", "PYPL", "ABNB", "SHOP", "SQ", "DIS", "KO"
];

const MOCK_NEWS = [
  { headline: "NVIDIA rompe récords históricos con IA", summary: "Ingresos trimestrales superan expectativas.", source: "TechCrunch", datetime: Date.now()/1000, category: "technology" },
  { headline: "La Fed mantiene tasas estables", summary: "Jerome Powell busca más datos económicos.", source: "Bloomberg", datetime: Date.now()/1000 - 3600, category: "finance" },
  { headline: "Tesla inicia producción masiva en Texas", summary: "Nuevo modelo económico en camino.", source: "Reuters", datetime: Date.now()/1000 - 7200, category: "auto" },
  { headline: "El petróleo sube por tensiones globales", summary: "Barril supera los 90 dólares.", source: "CNBC", datetime: Date.now()/1000 - 10800, category: "energy" },
  { headline: "Bitcoin supera resistencia clave", summary: "Inversores institucionales impulsan el precio.", source: "CoinDesk", datetime: Date.now()/1000 - 14400, category: "crypto" }
];

const THEMES = {
  neon: { 
    id: 'neon', name: 'Neon Dark', bg: '#050505', text: '#ffffff', 
    panel: 'rgba(20, 20, 20, 0.8)', border: 'rgba(255, 255, 255, 0.1)',
    accent: '#00ff9d', shadow: 'rgba(0,255,157,0.5)' 
    isGradient: true, 
    bgImage: 'radial-gradient(circle at 50% 50%, #2a004a 0%, #000000 100%)'
  },
  light: { 
    id: 'light', name: 'Day Mode', bg: '#f2f4f7', text: '#111827', 
    panel: 'rgba(255, 255, 255, 0.9)', border: 'rgba(0, 0, 0, 0.08)',
    accent: '#2563eb', shadow: 'rgba(37,99,235,0.3)' 
  },
  wallst: { 
    id: 'wallst', name: 'Wall St.', bg: '#0f172a', text: '#ffffff', 
    panel: 'rgba(15, 23, 42, 0.85)', border: 'rgba(255, 255, 255, 0.15)',
    accent: '#38bdf8', shadow: 'rgba(56,189,248,0.5)',
    isGradient: true, 
    bgImage: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 60%, #020617 100%)',
    backdrop: 'blur(12px)'
  },
  cosmos: { 
    id: 'cosmos', name: 'Cosmos', bg: '#0b0014', text: '#ffffff', 
    panel: 'rgba(20, 0, 40, 0.6)', border: 'rgba(200, 100, 255, 0.2)',
    accent: '#d946ef', shadow: 'rgba(217,70,239,0.5)',
    isGradient: true, 
    bgImage: 'radial-gradient(circle at 50% 50%, #2a004a 0%, #000000 100%)'
  }
};

const getStyleTag = (theme) => `
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.animate-marquee { animation: marquee 60s linear infinite; }
.animate-marquee:hover { animation-play-state: paused; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Animaciones para Modales */
@keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes modalExit { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
.modal-enter { animation: modalEnter 0.2s ease-out forwards; }
.modal-exit { animation: modalExit 0.2s ease-in forwards; }

.glass-panel {
  background: ${theme.panel};
  backdrop-filter: ${theme.backdrop || 'blur(16px)'};
  -webkit-backdrop-filter: ${theme.backdrop || 'blur(16px)'};
  border: 1px solid ${theme.border};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}
.glass-panel:hover { border-color: ${theme.accent}; transition: all 0.3s ease; }
.accent-text { color: ${theme.accent}; }
.accent-bg { background-color: ${theme.accent}; }
.accent-border { border-color: ${theme.accent}; }
body { 
  background-size: cover; 
  background-position: center; 
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-image: ${theme.isGradient ? theme.bgImage : theme.bgImage};
  background-color: ${theme.bg};
}
.bg-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7); z-index: -1; pointer-events: none;
}
`;

// Helper para formato con comas
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const generateIntradayPath = (open, high, low, close, steps = 40) => {
  const data = [open];
  let current = open;
  const range = high - low;
  const volatility = range * 0.2; 
  for (let i = 1; i < steps - 1; i++) {
    const progress = i / steps;
    const target = close * progress + open * (1 - progress); 
    let change = (Math.random() - 0.5) * volatility;
    if (i === Math.floor(steps * 0.2)) change += (high - current) * 0.8;
    if (i === Math.floor(steps * 0.6)) change -= (current - low) * 0.8;
    current += change;
    current = Math.min(high, Math.max(low, current)); 
    data.push(current);
  }
  data.push(close);
  return data;
};

const generateSmartAnalysis = (stock) => {
  const volatility = ((stock.highUSD - stock.lowUSD) / stock.lowUSD) * 100;
  const distFromHigh = ((stock.highUSD - stock.priceUSD) / stock.highUSD) * 100;
  const isBullish = stock.dp > 0;
  let sentiment = "Neutral";
  let analysis = "";
  if (isBullish) {
    sentiment = "Tendencia Positiva";
    analysis = `El activo presenta un impulso de compra sólido, avanzando un ${stock.dp.toFixed(2)}%. `;
    if (distFromHigh < 2) analysis += "Cotiza cerca de máximos intradía, mostrando fortaleza. ";
  } else {
    sentiment = "Corrección de Precio";
    analysis = `Retroceso del ${Math.abs(stock.dp).toFixed(2)}%. Presión de venta a corto plazo. `;
    if (volatility > 3) analysis += "Alta volatilidad detectada, precaución sugerida. ";
  }
  return { sentiment, text: analysis };
};

const StockChart = ({ data, color, isSimulated, height = 300, showAxes = true, rangeText }) => {
  if (!data || data.length < 2) return <div className="w-full flex items-center justify-center opacity-30 text-xs border border-dashed rounded-xl" style={{height}}>Cargando gráfica...</div>;
  const width = 800;
  const padding = showAxes ? 40 : 0; 
  const chartHeight = showAxes ? height - 30 : height; 
  const rawMin = Math.min(...data);
  const rawMax = Math.max(...data);
  const rawRange = rawMax - rawMin || 1;
  const min = rawMin - (rawRange * 0.1); 
  const max = rawMax + (rawRange * 0.1); 
  const range = max - min;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * (width - (padding * 2)) + padding;
    const y = chartHeight - ((val - min) / range) * (chartHeight - (showAxes ? padding : 10)) - (showAxes ? padding/2 : 5);
    return `${x},${y}`;
  }).join(' ');
  const fillPath = `${points} ${width - padding},${chartHeight} ${padding},${chartHeight}`;
  const now = new Date();
  const startDate = new Date();
  if (rangeText === '1W') startDate.setDate(now.getDate() - 7);
  else if (rangeText === '1M') startDate.setMonth(now.getMonth() - 1);
  else if (rangeText === '1Y') startDate.setFullYear(now.getFullYear() - 1);
  else startDate.setHours(9, 30, 0); 
  return (
    <div className="w-full relative group" style={{height}}>
      {isSimulated && showAxes && <div className="absolute top-2 right-10 z-10 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Proyección Algorítmica</div>}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs><linearGradient id={`grad-${color.replace('#','')}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.2" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        {showAxes && <g className="text-[10px] fill-current opacity-40 font-mono"><text x={width - 35} y={padding + 5}>{rawMax.toFixed(2)}</text><text x={width - 35} y={chartHeight - padding}>{rawMin.toFixed(2)}</text><text x={padding} y={height - 5}>{startDate.toLocaleDateString(undefined, {month:'short', day:'numeric'})}</text><text x={width - padding - 40} y={height - 5}>{now.toLocaleDateString(undefined, {month:'short', day:'numeric'})}</text><line x1={padding} y1={padding} x2={width-padding} y2={padding} stroke="currentColor" strokeDasharray="3" strokeWidth="0.5" /><line x1={padding} y1={chartHeight-padding} x2={width-padding} y2={chartHeight-padding} stroke="currentColor" strokeDasharray="3" strokeWidth="0.5" /></g>}
        <polygon points={fillPath} fill={`url(#grad-${color.replace('#','')})`} stroke="none" />
        <polyline points={points} fill="none" stroke={color} strokeWidth={showAxes ? "2" : "1.5"} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

// --- COMPONENTES UI ---

const TickerItem = ({ stock, convert, currencyIcon }) => {
  const isPos = (stock.dp || 0) >= 0;
  return (
    <div className="flex items-center gap-3 px-6 border-r border-white/5 opacity-90 hover:opacity-100 transition-opacity cursor-default">
      <span className="font-bold text-sm tracking-wide text-white">{stock.symbol}</span>
      <span className={`text-xs font-bold font-mono ${isPos ? 'text-emerald-500' : 'text-rose-500'}`}>{isPos ? '+' : ''}{stock.dp?.toFixed(2)}%</span>
      {isPos ? <TrendingUp size={14} className="text-emerald-500"/> : <TrendingDown size={14} className="text-rose-500"/>}
      <span className="text-[10px] font-mono text-neutral-400 ml-1">| {currencyIcon}{convert(stock.priceUSD || 0)}</span>
    </div>
  );
};

const NewsSection = ({ news, theme }) => {
  const safeNews = Array.isArray(news) && news.length > 0 ? news : MOCK_NEWS;
  const featured = safeNews[0];
  const others = safeNews.slice(1);

  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-2 mb-4 opacity-80"><Flame size={18} className="accent-text" /><h3 className="text-xs font-bold uppercase tracking-widest">Noticias Destacadas</h3></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <a href={featured.url || '#'} target="_blank" rel="noopener noreferrer" className="lg:col-span-2 glass-panel p-0 rounded-3xl group relative overflow-hidden flex flex-col justify-end min-h-[350px] border-0">
           <div className="absolute inset-0 z-0"><img src={featured.image || getSmartImage(featured.headline, featured.summary)} alt="news" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => e.target.src = USER_IMAGES.news[9]} /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div></div>
           <div className="relative z-10 p-8"><span className="inline-block px-3 py-1 rounded bg-white text-black text-[10px] font-bold uppercase mb-3">Principal</span><h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-accent-text transition-colors">{featured.headline}</h3><p className="text-sm text-gray-200 line-clamp-2 mb-4">{featured.summary}</p><div className="flex items-center gap-3 text-[10px] font-mono text-gray-400"><span className="uppercase tracking-wider">{featured.source}</span> • <span>{new Date(featured.datetime*1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span></div></div>
        </a>
        <div className="flex flex-col gap-3 h-full">
          {others.map((n, i) => (
            <a key={i} href={n.url || '#'} target="_blank" rel="noopener noreferrer" className="glass-panel p-3 rounded-xl flex gap-4 hover:bg-white/5 transition-colors group h-full">
               <img src={n.image || getSmartImage(n.headline, n.summary)} className="w-24 h-full rounded-lg object-cover opacity-80 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.src = USER_IMAGES.news[9]}/>
               <div className="flex-1 flex flex-col justify-center"><span className="text-[9px] font-bold uppercase opacity-50 text-accent-text mb-1">{n.source}</span><h4 className="text-xs font-bold leading-snug line-clamp-3 group-hover:text-accent-text" style={{color: theme.text}}>{n.headline}</h4></div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const WatchlistCard = ({ stock, onClick, currencyIcon, convert }) => {
  const isPositive = (stock.dp || 0) >= 0;
  const color = isPositive ? '#10b981' : '#f43f5e';
  return (
    <div onClick={onClick} className="glass-panel p-5 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div><div className="flex items-center gap-2"><h3 className="font-bold text-xl tracking-tight">{stock.symbol}</h3>{stock.isFavorite && <Star size={14} className="text-yellow-400 fill-yellow-400"/>}</div><span className="text-[10px] font-bold uppercase opacity-60 tracking-wider block truncate max-w-[180px] mt-1">{stock.name || 'Empresa'}</span></div>
        <div className="text-right"><div className="text-xl font-mono font-bold">{currencyIcon}{convert(stock.priceUSD)}</div><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{isPositive ? '+' : ''}{(stock.dp || 0).toFixed(2)}%</span></div>
      </div>
      <div className="h-12 w-full mt-4 opacity-50 group-hover:opacity-100 transition-opacity relative z-0"><StockChart data={stock.chartData || []} color={color} isSimulated={true} height={48} showAxes={false} /></div>
    </div>
  );
};

// --- MODAL GENÉRICO CON ANIMACIÓN ---
const AnimatedModal = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(isOpen);
  const [animateClass, setAnimateClass] = useState('');
  useEffect(() => {
    if (isOpen) { setShow(true); setAnimateClass('modal-enter'); } 
    else { setAnimateClass('modal-exit'); const t = setTimeout(() => setShow(false), 200); return () => clearTimeout(t); }
  }, [isOpen]);
  if (!show) return null;
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${animateClass}`}>
       <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
       <div className="relative z-10 w-full max-w-sm">{children}</div>
    </div>
  );
};

// --- MODAL DE AÑADIR FONDOS ---
const AddFundsModal = ({ isOpen, onClose, onConfirm, currencyIcon }) => {
  const [amount, setAmount] = useState('1000');
  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#1a1a1a] border border-white/10 w-full rounded-3xl p-6 shadow-2xl text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20}/></button>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Wallet className="text-emerald-400"/> Añadir Fondos</h2>
        <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-6">
          <label className="text-[10px] text-neutral-500 uppercase font-bold">Monto a depositar</label>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-mono text-neutral-400">{currencyIcon}</span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-transparent text-3xl font-mono font-bold w-full outline-none" autoFocus />
          </div>
        </div>
        <button onClick={() => { onConfirm(parseFloat(amount)); onClose(); }} className="w-full py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all">DEPOSITAR</button>
      </div>
    </AnimatedModal>
  );
};

// --- MODAL DE TRADING (CON VALIDACIÓN) ---
const TradeModal = ({ isOpen, onClose, symbol, currentPrice, balance, onConfirm, type, portfolio, currencyIcon, convert }) => {
  const [qty, setQty] = useState(1);
  useEffect(() => { if (isOpen) setQty(1); }, [isOpen]);
  const safePrice = currentPrice || 0;
  const total = qty * safePrice;
  const currentHolding = portfolio.find(p => p.symbol === symbol)?.qty || 0;
  const canAfford = type === 'buy' ? balance >= total : true;
  const canSell = type === 'sell' ? currentHolding >= qty : true;
  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#1a1a1a] border border-white/10 w-full rounded-3xl p-6 shadow-2xl text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20}/></button>
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">{type === 'buy' ? <Plus className="text-emerald-400"/> : <Minus className="text-rose-400"/>} {type === 'buy' ? 'Comprar' : 'Vender'} {symbol}</h2>
        <p className="text-xs text-neutral-400 mb-2">Precio: {currencyIcon}{convert(safePrice)}</p>
        {type === 'sell' && <div className="mb-4 text-[10px] uppercase font-bold tracking-wider text-neutral-500">Tienes: <span className="text-white">{currentHolding}</span> acciones</div>}
        <div className="flex items-center justify-between bg-black/30 p-4 rounded-xl mb-4 border border-white/5"><button onClick={() => setQty(Math.max(1, qty-1))} className="p-2 hover:bg-white/10 rounded-lg"><Minus size={16}/></button><div className="text-center"><span className="text-2xl font-mono font-bold">{qty}</span><p className="text-[10px] text-neutral-500 uppercase">Acciones</p></div><button onClick={() => setQty(qty+1)} className="p-2 hover:bg-white/10 rounded-lg"><Plus size={16}/></button></div>
        <div className="flex justify-between items-center text-sm mb-6 px-2"><span className="opacity-60">Total:</span><span className="font-mono font-bold text-lg">{currencyIcon}{convert(total)}</span></div>
        {type === 'sell' && !canSell && <div className="mb-4 text-xs text-center text-rose-500 font-bold animate-pulse">❌ No tienes suficientes acciones</div>}
        <button onClick={() => { if((type === 'buy' && canAfford) || (type === 'sell' && canSell)) { onConfirm(qty); onClose(); } }} disabled={(type === 'buy' && !canAfford) || (type === 'sell' && !canSell)} className={`w-full py-3 rounded-xl font-bold transition-all ${(type === 'buy' && !canAfford) || (type === 'sell' && !canSell) ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed' : type === 'buy' ? 'bg-emerald-500 hover:bg-emerald-400 text-black' : 'bg-rose-500 hover:bg-rose-400 text-white'}`}>{type === 'buy' ? (canAfford ? 'CONFIRMAR COMPRA' : 'FONDOS INSUFICIENTES') : (canSell ? 'CONFIRMAR VENTA' : 'ERROR DE VENTA')}</button>
      </div>
    </AnimatedModal>
  );
};

const SettingsModal = ({ isOpen, onClose, config, setConfig }) => {
  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#1a1a1a] border border-white/10 w-full rounded-3xl p-6 shadow-2xl relative text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20}/></button>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="accent-text"/> Preferencias</h2>
        <div className="space-y-6"><div><label className="text-xs font-bold uppercase opacity-50 mb-3 block">Moneda</label><div className="flex gap-2">{['MXN', 'USD', 'EUR'].map(c => <button key={c} onClick={() => setConfig({...config, currency: c})} className={`flex-1 p-3 rounded-xl border font-bold ${config.currency === c ? 'accent-bg text-black' : 'border-current opacity-50'}`}>{c}</button>)}</div></div><div><label className="text-xs font-bold uppercase opacity-50 mb-3 block">Tema</label><div className="grid grid-cols-2 gap-3">{Object.values(THEMES).map(th => <button key={th.id} onClick={() => setConfig({...config, theme: th})} className={`p-3 rounded-xl border flex items-center gap-2 ${config.theme.id === th.id ? 'border-current' : 'border-current opacity-60'}`} style={{backgroundColor: th.bg, color: th.text}}><div className="w-3 h-3 rounded-full" style={{backgroundColor: th.accent}}></div> {th.name}</button>)}</div></div></div>
      </div>
    </AnimatedModal>
  );
};

const PortfolioTab = ({ portfolio, balance, currentPrices, currencyIcon, convert, onTradeClick, transactions, onOpenAddFunds }) => {
  const totalValue = portfolio.reduce((acc, item) => acc + ((currentPrices[item.symbol] || item.avgPrice) * item.qty), 0);
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="glass-panel p-8 rounded-3xl mb-8 flex justify-between items-center bg-gradient-to-r from-emerald-900/20 to-transparent"><div><h2 className="text-sm font-bold uppercase opacity-50 tracking-widest mb-1">Valor Total (Neto)</h2><div className="text-5xl font-mono font-bold">{currencyIcon}{convert(balance + totalValue)}</div></div><div className="text-right"><h2 className="text-sm font-bold uppercase opacity-50 tracking-widest mb-1">Efectivo Disponible</h2><div className="text-3xl font-mono font-bold text-emerald-400 mb-2">{currencyIcon}{convert(balance)}</div><button onClick={onOpenAddFunds} className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white font-bold transition-colors flex items-center gap-1 ml-auto"><Plus size={10}/> Añadir Fondos</button></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2"><h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Briefcase className="accent-text"/> Mis Posiciones</h3>{portfolio.length === 0 ? <div className="text-center py-20 opacity-30 font-mono border border-dashed border-white/10 rounded-2xl">Tu portafolio está vacío.</div> : <div className="grid grid-cols-1 gap-4">{portfolio.map((item, i) => { const currentPrice = currentPrices[item.symbol] || item.avgPrice; const gain = (currentPrice - item.avgPrice) * item.qty; const gainP = ((currentPrice - item.avgPrice) / item.avgPrice) * 100; return (<div key={i} className="glass-panel p-4 rounded-xl flex justify-between items-center"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs">{item.symbol}</div><div><h4 className="font-bold text-lg leading-none">{item.symbol}</h4><p className="text-xs opacity-50 mt-1">{item.qty} acciones @ {currencyIcon}{convert(item.avgPrice || 0)}</p></div></div><div className="flex items-center gap-6"><div className="text-right"><div className="font-mono font-bold">{currencyIcon}{convert(currentPrice * item.qty)}</div><div className={`text-xs font-bold ${gain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{gain >= 0 ? '+' : ''}{convert(gain)} ({gainP.toFixed(2)}%)</div></div><button onClick={() => onTradeClick(item.symbol, currentPrice, 'sell')} className="p-2 px-4 bg-rose-500/20 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg transition-colors text-xs font-bold uppercase">Vender</button></div></div>); })}</div>}</div>
        <div><h3 className="text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-wider opacity-60"><History size={14}/> Historial Reciente</h3><div className="glass-panel rounded-2xl overflow-hidden">{transactions.length === 0 ? <div className="p-6 text-center text-xs opacity-30">Sin movimientos</div> : transactions.slice().reverse().slice(0, 5).map((t, i) => {
            const isDeposit = t.type === 'deposit';
            const isBuy = t.type === 'buy';
            return (
              <div key={i} className="p-4 border-b border-white/5 flex justify-between items-center text-xs">
                <div>
                  <span className={`font-bold ${isBuy || isDeposit ? 'text-emerald-400' : 'text-rose-400'} uppercase mr-2`}>
                    {isDeposit ? 'Depósito' : (isBuy ? 'Compra' : 'Venta')}
                  </span>
                  <span className="font-bold">{isDeposit ? 'Efectivo' : `${t.qty}x ${t.symbol}`}</span>
                </div>
                <span className="opacity-50 font-mono">{currencyIcon}{convert(t.price || 0)}</span>
              </div>
            );
        })}</div></div>
      </div>
    </div>
  );
};

export default function PocketWallstreet() {
  const [config, setConfig] = useState({ currency: 'MXN', theme: THEMES.neon, rates: { MXN: 17.16, EUR: 0.92, USD: 1 } });
  const [searchTerm, setSearchTerm] = useState(''); const [suggestions, setSuggestions] = useState([]); const [selectedStock, setSelectedStock] = useState(null);
  const [tickerData, setTickerData] = useState([]); const [topMovers, setTopMovers] = useState([]); const [news, setNews] = useState([]); const [favorites, setFavorites] = useState([]);
  const [balance, setBalance] = useState(10000); const [portfolio, setPortfolio] = useState([]); const [transactions, setTransactions] = useState([]); 
  const [tradeModal, setTradeModal] = useState({ isOpen: false, type: 'buy', symbol: '', price: 0 });
  const [addFundsModal, setAddFundsModal] = useState(false);
  const [viewMode, setViewMode] = useState('market'); const [showSettings, setShowSettings] = useState(false); const [loading, setLoading] = useState(true); const [loadingSearch, setLoadingSearch] = useState(false); const [marketStatus, setMarketStatus] = useState("CERRADO");
  const [chartRange, setChartRange] = useState('D'); const [detailChartData, setDetailChartData] = useState([]);
  const debounceRef = useRef(null);
  
  // FUNCION MAESTRA DE CONVERSIÓN Y FORMATO
  const convert = (usdValue) => {
    const rate = config.rates[config.currency] || 1;
    const value = usdValue * rate;
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };
  
  const getCurrencyIcon = () => {
     if (config.currency === 'EUR') return '€';
     if (config.currency === 'MXN') return 'MX$';
     return '$';
  };

  const fetchFinnhub = async (endpoint) => { try { const res = await fetch(`${API_CONFIG.baseUrl}/${endpoint}${endpoint.includes('?') ? '&' : '?'}token=${API_CONFIG.apiKey}`); return res.ok ? await res.json() : null; } catch { return null; } };
  
  const handleTrade = (qty) => { const { type, symbol, price } = tradeModal; const cost = qty * price; if (type === 'buy') { setBalance(prev => prev - cost); setPortfolio(prev => { const existing = prev.find(p => p.symbol === symbol); if (existing) return prev.map(p => p.symbol === symbol ? { ...p, qty: p.qty + qty, avgPrice: (p.avgPrice * p.qty + cost) / (p.qty + qty) } : p); return [...prev, { symbol, qty, avgPrice: price }]; }); } else { setBalance(prev => prev + cost); setPortfolio(prev => { const existing = prev.find(p => p.symbol === symbol); if (existing.qty === qty) return prev.filter(p => p.symbol !== symbol); return prev.map(p => p.symbol === symbol ? { ...p, qty: p.qty - qty } : p); }); } setTransactions(prev => [...prev, { type, symbol, qty, price, date: new Date() }]); };
  
  const addFunds = (amount) => { 
      const rate = config.rates[config.currency] || 1;
      const usdAmount = amount / rate;
      setBalance(prev => prev + usdAmount); 
      setTransactions(prev => [...prev, { 
          type: 'deposit', 
          symbol: 'CASH', 
          qty: 1, 
          price: usdAmount, // Stored in USD for consistency with convert() function
          date: new Date() 
      }]);
  };

  const openTradeModal = (symbol, price, type) => setTradeModal({ isOpen: true, type, symbol, price });
  const toggleFavorite = (symbol) => { let newFavs; if (favorites.includes(symbol)) newFavs = favorites.filter(s => s !== symbol); else newFavs = [...favorites, symbol]; setFavorites(newFavs); localStorage.setItem('pw_favorites', JSON.stringify(newFavs)); };
  
  useEffect(() => { const init = async () => {
      const savedFavs = JSON.parse(localStorage.getItem('pw_favorites') || '[]'); const savedPort = JSON.parse(localStorage.getItem('pw_portfolio') || '[]'); const savedBal = parseFloat(localStorage.getItem('pw_balance') || '10000'); const savedTrans = JSON.parse(localStorage.getItem('pw_transactions') || '[]');
      setFavorites(savedFavs); setPortfolio(savedPort); setBalance(savedBal); setTransactions(savedTrans);
      const now = new Date(); const hour = now.getUTCHours() - 5; const min = now.getUTCMinutes(); const isOpen = hour > 9 || (hour === 9 && min >= 30) && hour < 16; setMarketStatus(isOpen ? "MERCADO ABIERTO" : "MERCADO CERRADO");
      const forexMXN = await fetchFinnhub("quote?symbol=OANDA:USD_MXN"); setConfig(prev => ({ ...prev, rates: { ...prev.rates, MXN: forexMXN?.c || 17.16 } }));
      const newsData = await fetchFinnhub("news?category=general"); const safeNews = (newsData && Array.isArray(newsData)) ? newsData.slice(0, 5) : []; const enrichedNews = safeNews.length > 0 ? safeNews.map(n => ({...n, image: getSmartImage(n.headline, n.summary)})) : MOCK_NEWS.map(n => ({ ...n, image: getSmartImage(n.headline, n.summary) })); setNews(enrichedNews);
      const promises = MARKET_POOL.map(async sym => { const q = await fetchFinnhub(`quote?symbol=${sym}`); const p = await fetchFinnhub(`stock/profile2?symbol=${sym}`); if (!q || !q.c) return null; return { symbol: sym, name: p?.name || sym, priceUSD: q.c, dp: q.dp, chartData: generateIntradayPath(q.o, q.h, q.l, q.c, 40) }; });
      const results = (await Promise.all(promises)).filter(r => r); setTickerData(results); setTopMovers([...results].sort((a, b) => Math.abs(b.dp) - Math.abs(a.dp))); setLoading(false);
    }; init();
  }, []);
  useEffect(() => { localStorage.setItem('pw_portfolio', JSON.stringify(portfolio)); localStorage.setItem('pw_balance', balance.toString()); localStorage.setItem('pw_transactions', JSON.stringify(transactions)); }, [portfolio, balance, transactions]);
  const handleSearch = async (symbol) => { setLoadingSearch(true); setSearchTerm(''); setSuggestions([]); const [quote, profile, metrics] = await Promise.all([fetchFinnhub(`quote?symbol=${symbol}`), fetchFinnhub(`stock/profile2?symbol=${symbol}`), fetchFinnhub(`stock/metric?symbol=${symbol}&metric=all`)]); if (quote && quote.c) { const ai = generateSmartAnalysis({ ...quote, highUSD: quote.h, lowUSD: quote.l, priceUSD: quote.c }); setSelectedStock({ symbol, name: profile?.name || symbol, logo: profile?.logo, industry: profile?.finnhubIndustry || "General", priceUSD: quote.c, dp: quote.dp, high: quote.h, low: quote.l, open: quote.o, prevClose: quote.pc, marketCap: profile?.marketCapitalization ? `${parseInt(profile.marketCapitalization).toLocaleString()}M` : 'N/A', beta: metrics?.metric?.beta || 'N/A', pe: metrics?.metric?.peBasicExclExtraTTM?.toFixed(2) || 'N/A', aiAnalysis: ai }); setChartRange('D'); await loadDetailedChart(symbol, 'D'); } setLoadingSearch(false); };
  const loadDetailedChart = async (symbol, range) => { const to = Math.floor(Date.now() / 1000); let from; let res = 'D'; if (range === 'D') { from = to - 86400 * 2; res = '15'; } else if (range === '1W') { from = to - 86400 * 7; res = '60'; } else if (range === '1M') { from = to - 86400 * 30; res = 'D'; } else { from = to - 86400 * 365; res = 'D'; } let candles = await fetchFinnhub(`stock/candle?symbol=${symbol}&resolution=${res}&from=${from}&to=${to}`); if (candles && candles.s === 'ok') { setDetailChartData(candles.c); } else { setDetailChartData(generateIntradayPath(100, 105, 95, 102, 50)); } };
  useEffect(() => { if (!searchTerm) { setSuggestions([]); return; } if (debounceRef.current) clearTimeout(debounceRef.current); debounceRef.current = setTimeout(async () => { const res = await fetchFinnhub(`search?q=${searchTerm}`); if (res?.result) setSuggestions(res.result.slice(0, 5)); }, 500); }, [searchTerm]);
  
  const t = config.theme; 
  const bgStyle = { backgroundImage: t.bgImage, backgroundColor: t.bg };
  const currentHolding = portfolio.find(p => p.symbol === selectedStock?.symbol);

  return (
    <div className="min-h-screen font-sans flex flex-col transition-colors duration-500" style={{ ...bgStyle, color: t.text }}>
      <style>{getStyleTag(t)}</style>
      {config.theme.id === 'wallst' && <div className="bg-overlay"></div>}
      <div className="border-b h-10 flex items-center overflow-hidden relative z-50 bg-black/40 backdrop-blur-md sticky top-0" style={{ borderColor: t.border }}><div className="animate-marquee whitespace-nowrap flex items-center">{[...tickerData, ...tickerData].map((s, i) => <TickerItem key={i} stock={s} convert={convert} currencyIcon={getCurrencyIcon()} />)}</div></div>
      <header className="px-6 py-8 flex justify-center items-center relative z-40"><div className="text-center cursor-pointer group" onClick={() => {setSelectedStock(null); setViewMode('market');}}><h1 className="text-4xl font-black font-mono tracking-[0.1em] flex items-center gap-3 group-hover:scale-105 transition-transform"><Zap size={32} className="accent-text fill-current" /> POCKET WALLSTREET</h1><div className="flex justify-center items-center gap-4 mt-2 text-[10px] font-bold tracking-widest opacity-60"><span className={marketStatus.includes('ABIERTO') ? 'text-emerald-400 animate-pulse' : 'text-rose-400'}>● {marketStatus}</span><span>|</span><span>{config.currency}: {config.rates[config.currency].toFixed(2)}</span></div></div><button onClick={() => setShowSettings(!showSettings)} className="absolute right-6 p-3 rounded-full hover:bg-white/5 transition-all"><Settings size={22} className="opacity-70" /></button></header>
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} config={config} setConfig={setConfig} />
      <AddFundsModal isOpen={addFundsModal} onClose={() => setAddFundsModal(false)} onConfirm={addFunds} currencyIcon={getCurrencyIcon()} />
      <TradeModal isOpen={tradeModal.isOpen} onClose={() => setTradeModal({...tradeModal, isOpen: false})} symbol={tradeModal.symbol} currentPrice={tradeModal.price} balance={balance} portfolio={portfolio} onConfirm={handleTrade} type={tradeModal.type} currencyIcon={getCurrencyIcon()} convert={convert} />
      <main className="max-w-6xl mx-auto w-full px-4 py-6 flex-grow z-10">
        <div className="relative mb-8 max-w-2xl mx-auto group z-50"><div className="absolute inset-y-0 left-5 flex items-center pointer-events-none opacity-50"><Search size={20} /></div><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={`Buscar activo (Ej: Apple)...`} className="w-full pl-14 pr-4 py-5 rounded-2xl outline-none transition-all shadow-2xl font-mono text-sm bg-opacity-80 glass-panel border-opacity-30 focus:border-opacity-100" style={{ color: t.text, borderColor: t.accent }} />{suggestions.length > 0 && <div className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-2xl z-50 glass-panel animate-in slide-in-from-top-2">{suggestions.map((s, i) => <div key={i} onClick={() => handleSearch(s.symbol)} className="p-4 cursor-pointer flex justify-between items-center border-b border-white/5 hover:bg-white/5"><span className="font-bold accent-text">{s.symbol}</span><span className="text-xs opacity-50">{s.description}</span></div>)}</div>}</div>
        {loadingSearch ? <div className="text-center py-20 animate-pulse accent-text font-mono tracking-widest text-xs"><Activity className="mx-auto mb-4 animate-spin" size={40} /> PROCESANDO...</div> : selectedStock ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="glass-panel p-8 rounded-3xl mb-8 relative overflow-hidden"><div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10"><div className="flex items-center gap-6">{selectedStock.logo ? <img src={selectedStock.logo} className="w-24 h-24 bg-white rounded-3xl p-3 object-contain shadow-2xl" /> : <div className="w-24 h-24 bg-neutral-800 rounded-3xl flex items-center justify-center text-4xl font-bold shadow-2xl">{selectedStock.symbol[0]}</div>}<div><div className="flex items-center gap-4"><h2 className="text-5xl font-black tracking-tighter mb-2">{selectedStock.name}</h2><button onClick={() => toggleFavorite(selectedStock.symbol)} className="hover:text-yellow-400 transition-colors"><Star size={24} className={favorites.includes(selectedStock.symbol) ? "fill-yellow-400 text-yellow-400" : ""} /></button></div>{currentHolding && <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-4">Posición Actual: {currentHolding.qty} acciones</div>}<div className="flex gap-2"><button onClick={() => openTradeModal(selectedStock.symbol, selectedStock.priceUSD, 'buy')} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"><Plus size={16}/> Comprar</button><button onClick={() => openTradeModal(selectedStock.symbol, selectedStock.priceUSD, 'sell')} className="px-6 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-rose-500/20"><Minus size={16}/> Vender</button></div></div></div><div className="text-right"><div className="text-7xl font-mono font-bold tracking-tighter">{getCurrencyIcon()}{convert(selectedStock.priceUSD)}</div><div className={`text-2xl font-bold flex items-center justify-end gap-2 mt-2 ${selectedStock.dp >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{selectedStock.dp >= 0 ? <TrendingUp size={28}/> : <TrendingDown size={28}/>}{selectedStock.dp.toFixed(2)}%</div></div></div><div className="mt-12 h-96 w-full relative"><div className="absolute top-0 left-0 flex gap-2 z-10">{['D', '1W', '1M', '1Y'].map(r => <button key={r} onClick={() => {setChartRange(r); loadDetailedChart(selectedStock.symbol, r)}} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${chartRange === r ? 'accent-bg text-black' : 'bg-white/5 opacity-50 hover:opacity-100'}`}>{r}</button>)}</div><StockChart data={detailChartData} color={selectedStock.dp >= 0 ? '#10b981' : '#f43f5e'} height={380} isSimulated={true} rangeText={chartRange} /></div><div className="mt-8 border-t border-white/10 pt-6"><div className="flex items-center gap-3 mb-2"><div className="p-2 bg-white/10 rounded-lg"><Zap size={20} className="accent-text" /></div><h3 className="font-bold text-lg">AI Market Analyst</h3></div><p className="text-sm leading-relaxed opacity-80 font-mono ml-12"><span className="font-bold accent-text uppercase text-xs mr-2">[{selectedStock.aiAnalysis.sentiment}]</span>"{selectedStock.aiAnalysis.text}"</p></div></div><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[{ l: 'Rango Diario', v: `${formatNumber(selectedStock.low)} - ${formatNumber(selectedStock.high)}`, i: Activity }, { l: 'Market Cap', v: selectedStock.marketCap, i: Globe }, { l: 'PER Ratio', v: selectedStock.pe, i: PieChart }, { l: 'Beta', v: selectedStock.beta, i: Activity }].map((s, i) => (<div key={i} className="glass-panel p-5 rounded-2xl flex flex-col justify-between"><div className="flex justify-between opacity-50 mb-2"><span className="text-[10px] font-bold uppercase">{s.l}</span><s.i size={14}/></div><div className="text-xl font-mono font-bold truncate">{s.v}</div></div>))}</div></div>
        ) : (
          <div><div className="flex justify-center mb-8"><div className="bg-black/40 p-1 rounded-xl flex gap-1 border border-white/10 backdrop-blur-md"><button onClick={() => setViewMode('market')} className={`px-8 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'market' ? 'accent-bg text-black shadow-lg' : 'opacity-50 hover:opacity-100'}`}>MERCADO</button><button onClick={() => setViewMode('favorites')} className={`px-8 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'favorites' ? 'accent-bg text-black shadow-lg' : 'opacity-50 hover:opacity-100'}`}>FAVORITOS</button><button onClick={() => setViewMode('portfolio')} className={`px-8 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'portfolio' ? 'accent-bg text-black shadow-lg' : 'opacity-50 hover:opacity-100'}`}>PORTAFOLIO</button></div></div>
            {viewMode === 'portfolio' ? <PortfolioTab portfolio={portfolio} balance={balance} currentPrices={tickerData.reduce((acc, t) => ({...acc, [t.symbol]: t.priceUSD}), {})} currencyIcon={getCurrencyIcon()} convert={convert} onTradeClick={openTradeModal} transactions={transactions} onOpenAddFunds={() => setAddFundsModal(true)} /> : viewMode === 'favorites' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">{topMovers.filter(s => favorites.includes(s.symbol)).map((stock, i) => <WatchlistCard key={i} stock={{...stock, isFavorite: true}} theme={t} currencyIcon={getCurrencyIcon()} convert={convert} onClick={() => handleSearch(stock.symbol)}/>)}{favorites.length === 0 && <div className="col-span-3 text-center py-20 opacity-30">No hay favoritos aún.</div>}</div> : <><NewsSection news={news} theme={t} /><div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4"><h2 className="text-2xl font-black tracking-tight uppercase flex items-center gap-3"><Activity className="accent-text" /> Watchlist</h2><span className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Top Movers • Global</span></div>{loading ? <div className="py-20 text-center opacity-30 animate-pulse font-mono text-xs">CARGANDO MERCADO...</div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">{topMovers.map((stock, i) => <WatchlistCard key={i} stock={{...stock, isFavorite: favorites.includes(stock.symbol)}} theme={t} currencyIcon={getCurrencyIcon()} convert={convert} onClick={() => handleSearch(stock.symbol)}/>)}</div>}</>}
          </div>
        )}
      </main>

<footer className="py-12 px-6 flex justify-center mt-40">
  <div className="max-w-5xl w-full text-center space-y-6 opacity-50">

    {/* Nombre / Marca */}
    <p className="text-sm md:text-base font-mono uppercase tracking-[0.4em] text-white">
      Pocket Wallstreet v1.0 • Educational Use Only
    </p>

    {/* Disclaimer */}
    <p className="text-[11px] md:text-xs font-mono leading-relaxed tracking-wide text-white/70">
      <span className="block mb-3 font-semibold text-white/80">
        Aviso Educativo y Legal
      </span>

      Este sitio web es un proyecto académico desarrollado únicamente con fines educativos.
      No representa una plataforma real de inversión ni ofrece servicios financieros reales.

      <br /><br />

      Todas las operaciones mostradas dentro de la plataforma utilizan dinero virtual y forman
      parte de una simulación diseñada para aprendizaje y demostración tecnológica.

      <br /><br />

      La información del mercado puede basarse en datos financieros reales obtenidos mediante
      fuentes externas públicas. Estos datos se muestran únicamente con fines informativos y
      educativos y no constituyen asesoramiento financiero, legal ni de inversión.

      <br /><br />

      Las noticias mostradas se basa en información real del mercado a traves de Finnhub. Las imágenes
      utilizadas en la sección de noticias son ilustrativas y no representan necesariamente el
      contenido exacto de la noticia asociada.

      <br /><br />

      Logotipos, marcas comerciales e imágenes relacionadas con empresas pertenecen a sus
      respectivos propietarios y se utilizan únicamente con fines ilustrativos y educativos.

      <br /><br />

      Este sitio no debe utilizarse para tomar decisiones financieras reales.
    </p>

  </div>
</footer>
    </div>
  );
}
