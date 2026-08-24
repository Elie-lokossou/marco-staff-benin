import { useState, useCallback } from "react"

import {
  MessageCircle, Phone, MapPin, Mail, Menu, X, ChevronRight,
  ArrowLeft, CheckCircle2, Star, Package, Layers, Leaf, Sparkles,
  Clock, Calculator, ShieldCheck, Truck, Award, ChevronDown,
  Plus, Minus, FileDown, ArrowRight, Zap,
} from "lucide-react"
import imgGypse from "@/imports/photo2.jpeg"
import imgChaux from "@/imports/photo1.jpeg"
import imgFilasse from "@/imports/filace.jpeg"

// ─── Constants ────────────────────────────────────────────────────────────────
const WA_NUMBER = "2290197463209"
const waUrl = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
const waDevis = (produit: string) =>
  waUrl(`Bonjour L'Incomparable Service & Fils, je suis intéressé(e) par ${produit}. Pouvez-vous me communiquer votre disponibilité et tarif actuel ? Merci.`)

interface Product {
  id: string; nom: string; nomCourt: string; categorie: string
  origine: string; drapeau: string; badge: string; conditionnement: string
  prixUnit: number; image: string | { src: string }; description: string
  arguments: string[]; specs: { label: string; valeur: string }[]; m2ParSac: number
}

// ─── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "gypse-40kg", nom: "Poudre de Gypse Marco 40 KG", nomCourt: "Gypse Marco",
    categorie: "Gypse & Plâtre", origine: "Égypte", drapeau: "🇪🇬", badge: "Extra White",
    conditionnement: "Sac 40 KG", prixUnit: 4500,
    image: imgGypse,
    description: "Poudre de gypse importée directement d'Égypte. Blancheur éclatante, prise régulière et finesse incomparable pour des surfaces lisses sans défaut.",
    arguments: ["Blancheur 100% garantie à l'application", "Finesse sans grumeaux, homogénéité parfaite", "Prise régulière, zéro craquelure après séchage"],
    specs: [
      { label: "Temps de prise", valeur: "20 – 30 min" },
      { label: "Dosage eau / poudre", valeur: "0,6 L / kg" },
      { label: "Rendement", valeur: "~1 sac / 10 m² (couche 2 mm)" },
      { label: "Finesse", valeur: "< 80 microns" },
      { label: "Blancheur (Whiteness Index)", valeur: "100%" },
      { label: "Conditionnement", valeur: "Sac 40 KG" },
      { label: "Origine", valeur: "Import Égypte" },
    ],
    m2ParSac: 10,
  },
  {
    id: "chaux-vive", nom: "Chaux Vive Marco Première Qualité", nomCourt: "Chaux Marco",
    categorie: "Chaux & Liants", origine: "Dubaï, UAE", drapeau: "🇦🇪", badge: "Import Dubaï",
    conditionnement: "Sac 40 KG", prixUnit: 5200,
    image: imgChaux,
    description: "Chaux vive de première qualité importée des Émirats. Pureté calcique élevée, haute réactivité thermique et pouvoir assainissant exceptionnel.",
    arguments: ["Pureté calcique supérieure à 95%", "Haute réactivité thermique pour enduit parfait", "Pouvoir assainissant et anti-humidité certifié"],
    specs: [
      { label: "Pureté CaO", valeur: "> 95%" },
      { label: "Réactivité (T60)", valeur: "< 2 min" },
      { label: "Rendement", valeur: "~1 sac / 8 m²" },
      { label: "Teneur en eau résiduelle", valeur: "< 0,5%" },
      { label: "Application", valeur: "Enduit, chaulage, désinfection" },
      { label: "Conditionnement", valeur: "Sac 40 KG" },
      { label: "Origine", valeur: "Import Dubaï, UAE" },
    ],
    m2ParSac: 8,
  },
  {
    id: "filasse-sisal", nom: "Filasse de Sisal Pure Naturelle", nomCourt: "Filasse Sisal",
    categorie: "Filasse & Armatures", origine: "Kenya", drapeau: "🇰🇪", badge: "100% Naturel",
    conditionnement: "Balle pressée 25 KG", prixUnit: 8000,
    image: imgFilasse,
    description: "Filasse de sisal pur naturel produite au Kenya. Fibres longues peignées à haute résistance mécanique, idéales pour l'armature des ouvrages en staff.",
    arguments: ["Fibres longues peignées, résistance à la traction élevée", "100% naturel, sans produit chimique ajouté", "Parfaite adhérence dans les mélanges plâtre/gypse"],
    specs: [
      { label: "Type de fibre", valeur: "Sisal naturel pur (Agave sisalana)" },
      { label: "Longueur fibres", valeur: "60 – 120 cm" },
      { label: "Résistance traction", valeur: "> 300 MPa" },
      { label: "Humidité résiduelle", valeur: "< 12%" },
      { label: "Application", valeur: "Armature staff, enduits, moulures" },
      { label: "Conditionnement", valeur: "Balle pressée 25 KG" },
      { label: "Origine", valeur: "Produce of Kenya" },
    ],
    m2ParSac: 15,
  },
]

const imgSrc = (img: string | { src: string }) =>
  typeof img === "string" ? img : img.src


// ─── Custom UI Button (Remplacement propre @figma/astraui) ───────────────────
function Button({ children, variant = "primary", size = "medium", iconEnd, onClick, style = {} }: {
  children?: React.ReactNode; variant?: "primary" | "neutral"; size?: "small" | "medium";
  iconEnd?: React.ReactNode; onClick?: () => void; style?: React.CSSProperties;
}) {
  const isPrimary = variant === "primary";
  const isSmall = size === "small";
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: isPrimary ? "var(--ds-brand)" : "var(--ds-bg-secondary)",
      color: isPrimary ? "white" : "var(--ds-text-primary)",
      border: isPrimary ? "none" : "1.5px solid var(--ds-border)",
      borderRadius: "var(--ds-radius-full)",
      padding: isSmall ? "8px 16px" : "12px 24px",
      fontFamily: "var(--ds-font-body)", fontSize: isSmall ? "var(--ds-text-xs)" : "var(--ds-text-sm)",
      fontWeight: 600, cursor: "pointer",
      boxShadow: isPrimary ? "var(--ds-shadow-brand)" : "none",
      transition: "all var(--ds-transition)",
      ...style
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; if (isPrimary) e.currentTarget.style.background = "var(--ds-brand-hover)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; if (isPrimary) e.currentTarget.style.background = "var(--ds-brand)"; }}
    >
      {children}
      {iconEnd}
    </button>
  );
}

// ─── Announcement bar ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div style={{
      background: "var(--ds-dark-bg)",
      padding: "8px var(--ds-space-xl)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "var(--ds-space-lg)", flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-lg)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ds-conversion)", display: "block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.7rem", color: "var(--ds-dark-text-muted)", fontWeight: 500 }}>
              Dépôt Ouvert · Lun–Sam 7h30–18h00 · Cotonou &amp; Abomey-Calavi
            </span>
          </div>
        </div>
        <a href={`tel:+2290197463209`} style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}>
          <Phone size={11} style={{ color: "var(--ds-conversion)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.7rem", color: "var(--ds-dark-text-muted)", fontWeight: 500 }}>
            +229 01 97 46 32 09
          </span>
        </a>
      </div>
    </div>
  )
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function MarcoLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: "var(--ds-radius-sm)",
        background: "var(--ds-brand)", display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
        boxShadow: dark ? "none" : "0 2px 8px rgba(103,79,245,0.3)",
      }}>
        <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>M</span>
      </div>
      <div>
        <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-base)", fontWeight: 700, color: dark ? "white" : "var(--ds-text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Marco Staff
        </div>
        <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.58rem", fontWeight: 400, color: dark ? "rgba(255,255,255,0.4)" : "var(--ds-text-tertiary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          L&apos;Incomparable Service &amp; Fils
        </div>
      </div>
    </div>
  )
}

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
function WaBtn({ label = "WhatsApp", url, small = false, full = false }: {
  label?: string; url: string; small?: boolean; full?: boolean
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: small ? 6 : 8, background: "var(--ds-conversion)", color: "white",
      fontFamily: "var(--ds-font-body)", fontSize: small ? "var(--ds-text-xs)" : "var(--ds-text-sm)",
      fontWeight: "var(--ds-weight-semibold)", padding: small ? "8px 16px" : "13px 24px",
      borderRadius: "var(--ds-radius-full)", textDecoration: "none",
      transition: "background var(--ds-transition), transform var(--ds-transition), box-shadow var(--ds-transition)",
      boxShadow: "var(--ds-shadow-conversion)", width: full ? "100%" : undefined,
      whiteSpace: "nowrap",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "var(--ds-conversion-hover)"; e.currentTarget.style.transform = "translateY(-1px)" }}
      onMouseLeave={e => { e.currentTarget.style.background = "var(--ds-conversion)"; e.currentTarget.style.transform = "translateY(0)" }}
    >
      <MessageCircle size={small ? 13 : 15} />
      {label}
    </a>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [open, setOpen] = useState(false)
  const links = [
    { label: "Accueil", id: "accueil" },
    { label: "Produits", id: "produits" },
    { label: "Simulateur", id: "simulateur" },
    { label: "Contact", id: "contact" },
  ]
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--ds-border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--ds-space-xl)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--ds-space-xl)" }}>
        <MarcoLogo />
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-desktop">
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id) }}
              style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: "var(--ds-weight-medium)", color: "var(--ds-text-secondary)", textDecoration: "none", transition: "color var(--ds-transition)" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--ds-brand)" }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--ds-text-secondary)" }}
            >{label}</a>
          ))}
        </nav>
        <div className="nav-desktop">
          <WaBtn label="Devis WhatsApp" url={waUrl("Bonjour L'Incomparable Service & Fils, je souhaite un devis.")} small />
        </div>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--ds-text-primary)", flexShrink: 0 }} className="nav-mobile-toggle">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid var(--ds-border)", padding: "var(--ds-space-lg) var(--ds-space-xl)", display: "flex", flexDirection: "column", gap: "var(--ds-space-md)", background: "var(--ds-bg)" }}>
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id); setOpen(false) }}
              style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-base)", fontWeight: "var(--ds-weight-medium)", color: "var(--ds-text-secondary)", textDecoration: "none", padding: "var(--ds-space-sm) 0" }}
            >{label}</a>
          ))}
          <WaBtn label="Demander un Devis WhatsApp" url={waUrl("Bonjour L'Incomparable Service & Fils, je souhaite un devis.")} full />
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ onVoirProduits }: { onVoirProduits: () => void }) {
  return (
    <section id="accueil" style={{ background: "var(--ds-bg)", position: "relative", overflow: "hidden" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "72px var(--ds-space-xl) 80px",
        display: "grid", gridTemplateColumns: "1.05fr 0.95fr",
        gap: "var(--ds-space-3xl)", alignItems: "center", position: "relative",
      }} className="hero-grid">

        {/* Left */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Origin pills */}
          <div style={{ display: "flex", gap: "var(--ds-space-sm)", marginBottom: 28, flexWrap: "wrap" }}>
            {[{ flag: "🇪🇬", label: "Import Égypte" }, { flag: "🇦🇪", label: "Import Dubaï" }, { flag: "🇰🇪", label: "Produce of Kenya" }].map(({ flag, label }) => (
              <span key={label} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: "var(--ds-bg-secondary)", border: "1px solid var(--ds-border)",
                borderRadius: "var(--ds-radius-full)", padding: "5px 13px",
                fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)",
                fontWeight: "var(--ds-weight-medium)", color: "var(--ds-text-secondary)",
              }}>{flag} {label}</span>
            ))}
          </div>

          <h1 style={{
            fontFamily: "var(--ds-font-heading)",
            fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1.08,
            letterSpacing: "-0.035em", marginBottom: 24,
          }}>
            Matériaux de{" "}
            <span style={{
              color: "var(--ds-brand)",
              position: "relative", display: "inline-block",
            }}>
              Finition Premium
              <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 6 }} viewBox="0 0 200 6" preserveAspectRatio="none" fill="none">
                <path d="M0 5 Q50 1 100 4 Q150 7 200 3" stroke="var(--ds-brand)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
              </svg>
            </span>
            <br />
            Importés Directement.
          </h1>

          <p style={{
            fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-base)",
            color: "var(--ds-text-secondary)", lineHeight: 1.75, maxWidth: 500,
            marginBottom: 36,
          }}>
            Gypse d&apos;Égypte, Chaux de Dubaï, Filasse du Kenya —{" "}
            <strong style={{ color: "var(--ds-text-primary)", fontWeight: 600 }}>
              sans intermédiaire.
            </strong>{" "}
            Stock permanent. Livraison directe sur vos chantiers à Cotonou et Abomey-Calavi.
          </p>

          <div style={{ display: "flex", gap: "var(--ds-space-md)", flexWrap: "wrap", alignItems: "center", marginBottom: 48 }}>
            <WaBtn label="Demander un Devis Gratuit" url={waUrl("Bonjour L'Incomparable Service & Fils, je souhaite un devis pour vos matériaux. Merci.")} />
            <Button variant="neutral" iconEnd={<ArrowRight size={15} />} onClick={onVoirProduits}>
              Voir le Catalogue
            </Button>
          </div>

          {/* Stats mini-row */}
          <div style={{
            display: "flex", gap: "var(--ds-space-xl)", flexWrap: "wrap",
            paddingTop: 28, borderTop: "1px solid var(--ds-border)",
          }}>
            {[
              { val: "3", label: "Pays d'importation" },
              { val: "2", label: "Dépôts à Cotonou" },
              { val: "100%", label: "Qualité certifiée" },
              { val: "48h", label: "Livraison chantier" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-brand)", lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – product visual stack */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }} className="hero-visual">
          {/* Background circle */}
          <div style={{
            position: "absolute", width: 420, height: 420, borderRadius: "50%",
            background: "var(--ds-brand-light)", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)", zIndex: 0,
          }} />

          {/* Main product card – Gypse */}
          <div style={{
            position: "relative", zIndex: 2, width: 300,
            background: "white", borderRadius: "var(--ds-radius-2xl)",
            boxShadow: "0 24px 64px rgba(103,79,245,0.18), 0 8px 24px rgba(0,0,0,0.08)",
            overflow: "hidden", border: "1px solid rgba(103,79,245,0.1)",
          }}>
            <div style={{ height: 280, background: "#1a2744", overflow: "hidden" }}>
              <img src={imgSrc(imgGypse)} alt="Gypse Marco" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div style={{ padding: "var(--ds-space-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", margin: 0 }}>Gypse Marco 40 KG</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)", margin: "2px 0 0" }}>🇪🇬 Extra White · Made in Egypt</p>
                </div>
                <span style={{
                  background: "var(--ds-brand)", color: "white", fontSize: "0.65rem",
                  fontWeight: 700, padding: "3px 9px", borderRadius: "var(--ds-radius-full)",
                  fontFamily: "var(--ds-font-body)",
                }}>N°1</span>
              </div>
            </div>
          </div>

          {/* Floating badge – Qualité */}
          <div style={{
            position: "absolute", bottom: 40, left: -8, zIndex: 3,
            background: "white", borderRadius: "var(--ds-radius-lg)",
            padding: "10px 14px", boxShadow: "var(--ds-shadow-md)",
            border: "1px solid var(--ds-border)",
            display: "flex", alignItems: "center", gap: 8,
          }} className="hero-float-1">
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--ds-conversion-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShieldCheck size={14} style={{ color: "var(--ds-conversion)" }} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "var(--ds-text-primary)", margin: 0 }}>Zéro Fissure</p>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", color: "var(--ds-text-tertiary)", margin: 0 }}>Garantie sur chaque sac</p>
            </div>
          </div>

          {/* Floating badge – Import direct */}
          <div style={{
            position: "absolute", top: 30, right: -12, zIndex: 3,
            background: "var(--ds-brand)", borderRadius: "var(--ds-radius-lg)",
            padding: "10px 14px", boxShadow: "var(--ds-shadow-brand)",
            display: "flex", alignItems: "center", gap: 8,
          }} className="hero-float-2">
            <Zap size={14} style={{ color: "white", flexShrink: 0 }} />
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.7rem", fontWeight: 600, color: "white", margin: 0, whiteSpace: "nowrap" }}>Import Direct · Sans Intermédiaire</p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ textAlign: "center", paddingBottom: 20, color: "var(--ds-text-tertiary)" }}>
        <ChevronDown size={18} />
      </div>

      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -100, right: -120, width: 500, height: 500, borderRadius: "50%", background: "var(--ds-brand-light)", filter: "blur(80px)", opacity: 0.5, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "var(--ds-conversion-light)", filter: "blur(60px)", opacity: 0.6, pointerEvents: "none", zIndex: 0 }} />
    </section>
  )
}

// ─── Categories ───────────────────────────────────────────────────────────────
const CATS = [
  { nom: "Gypse & Plâtre", icon: Package, actif: true, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&auto=format", desc: "Poudres de gypse et plâtre d'importation" },
  { nom: "Chaux & Liants", icon: Layers, actif: true, img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop&auto=format", desc: "Chaux vive et liants de construction" },
  { nom: "Filasse & Armatures", icon: Leaf, actif: true, img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=200&fit=crop&auto=format", desc: "Fibres naturelles pour renforcement staff" },
  { nom: "Décorations Staff", icon: Sparkles, actif: true, img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=200&fit=crop&auto=format", desc: "Moulures, corniches et ornements" },
  { nom: "Location Matériel", icon: Clock, actif: false, img: "", desc: "Outils et machines professionnels" },
]

function CategoriesSection({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  return (
    <section id="categories" style={{ background: "var(--ds-bg-secondary)", padding: "80px var(--ds-space-xl)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--ds-space-2xl)" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Nos Gammes
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-3xl)", fontWeight: 700, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", marginBottom: "var(--ds-space-sm)" }}>
            Solutions Complètes BTP
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)" }}>
            Tout ce dont vos chantiers de finition ont besoin, en stock permanent
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="cat-grid-5">
          {CATS.map(({ nom, icon: Icon, actif, img, desc }) => (
            <div key={nom}
              onClick={() => actif && onScrollTo("produits")}
              style={{
                background: actif ? "var(--ds-bg)" : "var(--ds-bg-tertiary)",
                border: "1px solid var(--ds-border)", borderRadius: "var(--ds-radius-xl)",
                overflow: "hidden", cursor: actif ? "pointer" : "default",
                opacity: actif ? 1 : 0.55,
                transition: "box-shadow var(--ds-transition-md), transform var(--ds-transition-md)",
                position: "relative",
              }}
              onMouseEnter={e => { if (actif) { e.currentTarget.style.boxShadow = "var(--ds-shadow-md)"; e.currentTarget.style.transform = "translateY(-3px)" } }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)" }}
            >
              {actif && img && (
                <div style={{ height: 90, overflow: "hidden" }}>
                  <img src={img} alt={nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              {!actif && (
                <div style={{ height: 90, background: "var(--ds-bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={24} style={{ color: "var(--ds-text-tertiary)" }} />
                </div>
              )}
              <div style={{ padding: "12px 14px" }}>
                {!actif && (
                  <span style={{ position: "absolute", top: 8, right: 8, background: "var(--ds-text-tertiary)", color: "white", borderRadius: "var(--ds-radius-full)", padding: "2px 7px", fontSize: "0.6rem", fontWeight: 600, fontFamily: "var(--ds-font-body)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Bientôt
                  </span>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  {actif && (
                    <div style={{ width: 22, height: 22, borderRadius: "var(--ds-radius-xs)", background: "var(--ds-brand-muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-brand)" }}>
                      <Icon size={12} />
                    </div>
                  )}
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: actif ? "var(--ds-text-primary)" : "var(--ds-text-tertiary)", margin: 0, lineHeight: 1.3 }}>
                    {nom}
                  </p>
                </div>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.65rem", color: "var(--ds-text-tertiary)", margin: 0, lineHeight: 1.4 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onDetail }: { product: Product; onDetail: (p: Product) => void }) {
  return (
    <div style={{
      background: "var(--ds-bg)", border: "1px solid var(--ds-border)",
      borderRadius: "var(--ds-radius-xl)", overflow: "hidden", display: "flex", flexDirection: "column",
      transition: "box-shadow var(--ds-transition-md), transform var(--ds-transition-md)",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-lg)"; e.currentTarget.style.transform = "translateY(-4px)" }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)" }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 240, overflow: "hidden", background: "#f0f0f8" }}>
        <img src={imgSrc(product.image)} alt={product.nom}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 400ms ease" }}
          onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.04)" }}
          onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)" }}
        />
        {/* Gradient overlay bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)" }} />
        {/* Badges */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ background: "var(--ds-brand)", color: "white", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, padding: "3px 10px", borderRadius: "var(--ds-radius-full)" }}>
            {product.badge}
          </span>
        </div>
        {/* Origin bottom */}
        <div style={{ position: "absolute", bottom: 10, left: 12 }}>
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            {product.drapeau} {product.origine}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "var(--ds-space-xl)", flex: 1, display: "flex", flexDirection: "column", gap: "var(--ds-space-md)" }}>
        <div>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-brand)", fontWeight: 600, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {product.categorie}
          </p>
          <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-base)", fontWeight: 700, color: "var(--ds-text-primary)", margin: 0, lineHeight: 1.3 }}>
            {product.nom}
          </h3>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
          {product.arguments.map(arg => (
            <li key={arg} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
              <CheckCircle2 size={13} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", lineHeight: 1.45 }}>{arg}</span>
            </li>
          ))}
        </ul>

        {/* Conditionnement pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "var(--ds-bg-secondary)", borderRadius: "var(--ds-radius-sm)", width: "fit-content" }}>
          <Package size={12} style={{ color: "var(--ds-text-tertiary)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", fontWeight: 500 }}>{product.conditionnement}</span>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-sm)", marginTop: "auto", paddingTop: 4 }}>
          <WaBtn label="Demander un Devis" url={waDevis(product.nom)} full />
          <button onClick={() => onDetail(product)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 500,
            color: "var(--ds-brand)", background: "var(--ds-brand-muted)", border: "none",
            borderRadius: "var(--ds-radius-full)", padding: "10px 20px", cursor: "pointer",
            transition: "background var(--ds-transition)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(103,79,245,0.15)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--ds-brand-muted)" }}
          >
            <ChevronRight size={14} /> Fiche Technique Complète
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Showcase ─────────────────────────────────────────────────────────────────
function ShowcaseSection({ onDetail }: { onDetail: (p: Product) => void }) {
  return (
    <section id="produits" style={{ background: "var(--ds-bg)", padding: "80px var(--ds-space-xl)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--ds-space-lg)", marginBottom: "var(--ds-space-2xl)" }}>
          <div>
            <span style={{ display: "inline-block", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              Catalogue
            </span>
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-3xl)", fontWeight: 700, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", marginBottom: 6 }}>
              Nos Produits Phares
            </h2>
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)" }}>
              Importés à la source · Qualité contrôlée · Stock permanent
            </p>
          </div>
          <WaBtn label="Commander par WhatsApp" url={waUrl("Bonjour, je souhaite passer une commande.")} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-xl)" }} className="product-grid">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onDetail={onDetail} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Simulator ────────────────────────────────────────────────────────────────
function SimulateurSection() {
  const [surface, setSurface] = useState(50)
  const [produitId, setProduitId] = useState("gypse-40kg")
  const produit = PRODUCTS.find(p => p.id === produitId) ?? PRODUCTS[0]
  const nbSacs = Math.ceil(surface / produit.m2ParSac)
  const prixTotal = nbSacs * produit.prixUnit
  const msgCmd = waUrl(`Bonjour L'Incomparable Service & Fils, je souhaite commander ${nbSacs} sac(s) de ${produit.nom} pour une surface de ${surface} m². Merci.`)

  return (
    <section id="simulateur" style={{ background: "var(--ds-bg-secondary)", padding: "80px var(--ds-space-xl)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "var(--ds-space-3xl)", alignItems: "center" }} className="simu-grid">

        {/* Left – copy */}
        <div>
          <div style={{ width: 48, height: 48, borderRadius: "var(--ds-radius-lg)", background: "var(--ds-brand-muted)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: "var(--ds-brand)" }}>
            <Calculator size={22} />
          </div>
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Simulateur
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-3xl)", fontWeight: 700, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", marginTop: 8, marginBottom: 16 }}>
            Estimez Votre Besoin Chantier
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
            Entrez la surface à traiter et obtenez instantanément le nombre de sacs nécessaires et le budget estimatif. Commandez ensuite directement par WhatsApp.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: CheckCircle2, text: "Calcul basé sur le rendement réel du produit" },
              { icon: CheckCircle2, text: "Budget indicatif en FCFA inclus" },
              { icon: CheckCircle2, text: "Commande directe WhatsApp en 1 clic" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Icon size={14} style={{ color: "var(--ds-conversion)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right – calculator */}
        <div style={{ background: "var(--ds-bg)", borderRadius: "var(--ds-radius-2xl)", border: "1px solid var(--ds-border)", padding: "var(--ds-space-2xl)", boxShadow: "var(--ds-shadow-md)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-xl)" }}>
            {/* Product selector */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text-primary)", marginBottom: 10 }}>
                Produit à estimer
              </label>
              <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap" }}>
                {PRODUCTS.slice(0, 2).map(p => (
                  <button key={p.id} onClick={() => setProduitId(p.id)} style={{
                    fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600,
                    padding: "9px 16px", borderRadius: "var(--ds-radius-full)",
                    border: `2px solid ${produitId === p.id ? "var(--ds-brand)" : "var(--ds-border)"}`,
                    background: produitId === p.id ? "var(--ds-brand-muted)" : "transparent",
                    color: produitId === p.id ? "var(--ds-brand)" : "var(--ds-text-secondary)",
                    cursor: "pointer", transition: "all var(--ds-transition)",
                  }}>
                    {p.drapeau} {p.nomCourt}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <label style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text-primary)" }}>
                  Surface du chantier
                </label>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-brand)" }}>
                  {surface} m²
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-sm)" }}>
                <button onClick={() => setSurface(s => Math.max(5, s - 5))}
                  style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid var(--ds-border)", background: "var(--ds-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)", transition: "border-color var(--ds-transition)" }}>
                  <Minus size={14} />
                </button>
                <input type="range" min={5} max={500} step={5} value={surface}
                  onChange={e => setSurface(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "var(--ds-brand)", height: 4, cursor: "pointer" }}
                />
                <button onClick={() => setSurface(s => Math.min(500, s + 5))}
                  style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid var(--ds-border)", background: "var(--ds-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)", transition: "border-color var(--ds-transition)" }}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Result */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--ds-space-md)", background: "var(--ds-bg-secondary)", borderRadius: "var(--ds-radius-xl)", padding: "var(--ds-space-xl)" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", margin: "0 0 6px" }}>Nombre de sacs</p>
                <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-5xl)", fontWeight: 800, color: "var(--ds-brand)", lineHeight: 1, margin: 0 }}>{nbSacs}</p>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.65rem", color: "var(--ds-text-tertiary)", margin: "4px 0 0" }}>{produit.conditionnement}</p>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid var(--ds-border)", paddingLeft: "var(--ds-space-md)" }}>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", margin: "0 0 6px" }}>Budget estimatif</p>
                <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-conversion)", lineHeight: 1, margin: 0 }}>
                  {prixTotal.toLocaleString("fr-FR")}
                </p>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.65rem", color: "var(--ds-text-tertiary)", margin: "4px 0 0" }}>FCFA indicatif</p>
              </div>
            </div>

            <WaBtn label={`Commander ${nbSacs} sac${nbSacs > 1 ? "s" : ""} · WhatsApp`} url={msgCmd} full />
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.65rem", color: "var(--ds-text-tertiary)", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
              * Estimation pour une couche standard de 2 mm. Prix indicatif — contactez-nous pour un devis précis.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TEMOIGNAGES = [
  { initials: "KB", color: "#674FF5", nom: "Kouassi Bernard", role: "Maître Staffeur", ville: "Cotonou", note: 5, texte: "Le gypse Marco est incomparable. Blancheur parfaite, prise régulière, aucune fissure sur mes ouvrages. Je ne travaille plus qu'avec ce produit." },
  { initials: "AM", color: "#10B981", nom: "Adeola Moussa", role: "Chef de Chantier BTP", ville: "Abomey-Calavi", note: 5, texte: "J'achète la chaux vive Marco pour tous mes chantiers. La réactivité est excellente et le service livraison est rapide et fiable." },
  { initials: "FD", color: "#F59E0B", nom: "Fatou Diallo", role: "Propriétaire de villa", ville: "Cotonou", note: 5, texte: "Équipe très professionnelle. Résultat magnifique sur ma villa, mon staffeur est ravi de la qualité. Je recommande vivement !" },
]

const GARANTIES = [
  { icon: ShieldCheck, color: "var(--ds-conversion)", titre: "Zéro Fissure Garantie", desc: "Formule contrôlée pour une prise sans fissuration" },
  { icon: Award, color: "var(--ds-brand)", titre: "Import Direct Certifié", desc: "Origine traçable, qualité authentique" },
  { icon: Package, color: "#F59E0B", titre: "Stock Permanent", desc: "Disponibilité garantie à Cotonou" },
  { icon: Truck, color: "#0ea5e9", titre: "Livraison Chantier", desc: "Livraison rapide dans le Grand Cotonou" },
]

function ReassuranceSection() {
  return (
    <section style={{ background: "var(--ds-bg)", padding: "80px var(--ds-space-xl)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--ds-space-2xl)" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Témoignages
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-3xl)", fontWeight: 700, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", marginBottom: 8 }}>
            Ils Nous Font Confiance
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)" }}>
            Staffeurs, maçons, propriétaires — leur expérience avec Marco Staff
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-xl)", marginBottom: "var(--ds-space-3xl)" }} className="product-grid">
          {TEMOIGNAGES.map(({ initials, color, nom, role, ville, note, texte }) => (
            <div key={nom} style={{
              background: "var(--ds-bg)", border: "1px solid var(--ds-border)", borderRadius: "var(--ds-radius-xl)",
              padding: "var(--ds-space-xl)", display: "flex", flexDirection: "column", gap: "var(--ds-space-lg)",
              transition: "box-shadow var(--ds-transition-md)",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-md)" }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none" }}
            >
              {/* Top row: avatar + name + stars */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${color}40` }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 800, color: "white" }}>{initials}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", margin: 0 }}>{nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)", margin: "2px 0 6px" }}>{role} · {ville}</p>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(note)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" stroke="#F59E0B" />)}
                  </div>
                </div>
              </div>
              {/* Quote */}
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.7, margin: 0, flex: 1, fontStyle: "italic", borderLeft: `3px solid ${color}`, paddingLeft: 14 }}>
                &ldquo;{texte}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Guarantees grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--ds-space-lg)" }} className="garanties-grid">
          {GARANTIES.map(({ icon: Icon, color, titre, desc }) => (
            <div key={titre} style={{
              background: "var(--ds-bg-secondary)", borderRadius: "var(--ds-radius-xl)",
              padding: "var(--ds-space-xl)", display: "flex", gap: "var(--ds-space-lg)", alignItems: "flex-start",
            }}>
              <div style={{ width: 40, height: 40, borderRadius: "var(--ds-radius-md)", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color }}>
                <Icon size={18} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", margin: "0 0 4px" }}>{titre}</p>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", margin: 0, lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ background: "var(--ds-bg-secondary)", padding: "80px var(--ds-space-xl)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, var(--ds-brand) 0%, #8b7cf8 100%)",
          borderRadius: "var(--ds-radius-2xl)", overflow: "hidden", position: "relative",
          padding: "64px var(--ds-space-3xl)",
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "30%", right: "15%", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--ds-space-3xl)", flexWrap: "wrap" }}>
            <div style={{ maxWidth: 520 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, background: "rgba(255,255,255,0.12)", padding: "5px 12px", borderRadius: "var(--ds-radius-full)" }}>
                <Zap size={11} /> Réponse en moins de 30 min
              </span>
              <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 16px" }}>
                Construisons Ensemble.<br />La Qualité Sans Compromis.
              </h2>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: 0 }}>
                Rejoignez les professionnels du BTP qui font confiance à L&apos;Incomparable Service &amp; Fils pour leurs matériaux de finition.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-sm)", flexShrink: 0 }}>
              <WaBtn label="Nous Contacter sur WhatsApp" url={waUrl("Bonjour L'Incomparable Service & Fils, je souhaite en savoir plus.")} />
              <a href="tel:+2290197463209" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", color: "white",
                fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 600,
                padding: "13px 24px", borderRadius: "var(--ds-radius-full)", textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.25)", transition: "background var(--ds-transition)",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)" }}
              >
                <Phone size={15} /> Appeler le Dépôt
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const [email, setEmail] = useState("")
  return (
    <footer id="contact" style={{ background: "var(--ds-dark-bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px var(--ds-space-xl) var(--ds-space-xl)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "var(--ds-space-3xl)" }} className="footer-grid">
        {/* Brand */}
        <div>
          <MarcoLogo dark />
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", lineHeight: 1.75, maxWidth: 260, margin: "var(--ds-space-lg) 0 var(--ds-space-xl)" }}>
            Importateur direct et grossiste en matériaux de finition et staff à Cotonou, Bénin. Qualité d&apos;importation directe, sans intermédiaire.
          </p>
          {/* Newsletter */}
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>Restez informé des promotions :</p>
          <div style={{ display: "flex", gap: "var(--ds-space-sm)" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Votre email" style={{
              fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--ds-radius-full)",
              padding: "8px 14px", color: "white", outline: "none", flex: 1,
            }} />
            <Button variant="primary" size="small">OK</Button>
          </div>
          {/* Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-sm)", marginTop: "var(--ds-space-xl)" }}>
            {[
              { icon: Phone, text: "+229 01 97 46 32 09", href: "tel:+2290197463209" },
              { icon: MessageCircle, text: "WhatsApp : 0197 463 209", href: waUrl("Bonjour L'Incomparable Service & Fils") },
              { icon: Mail, text: "contact@lincomparable.bj", href: "mailto:contact@lincomparable.bj" },
            ].map(({ icon: Icon, text, href }) => (
              <a key={text} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none" }}>
                <Icon size={12} style={{ color: "var(--ds-conversion)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", transition: "color var(--ds-transition)" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = "white" }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)" }}
                >{text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Cols */}
        {[
          { title: "Produits", items: ["Gypse & Plâtre", "Chaux Vive", "Filasse Sisal", "Décorations Staff"] },
          { title: "Navigation", items: ["Accueil", "Nos Produits", "Simulateur Chantier", "Nous Contacter"] },
          {
            title: "Dépôt",
            custom: (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-md)" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <MapPin size={12} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", lineHeight: 1.5 }}>Cotonou &amp; Abomey-Calavi, Bénin</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <Clock size={12} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", lineHeight: 1.5 }}>Lun – Sam<br />7h30 – 18h00</span>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--ds-conversion-light)", borderRadius: "var(--ds-radius-full)", padding: "5px 10px", width: "fit-content" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ds-conversion)", display: "block", animation: "pulse 2s infinite" }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.65rem", fontWeight: 600, color: "var(--ds-conversion)" }}>Ouvert Aujourd&apos;hui</span>
                </div>
              </div>
            )
          },
        ].map(({ title, items, custom }) => (
          <div key={title}>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "var(--ds-space-lg)" }}>
              {title}
            </h4>
            {items ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(l => (
                  <span key={l} style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", cursor: "pointer", transition: "color var(--ds-transition)" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = "white" }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)" }}
                  >{l}</span>
                ))}
              </div>
            ) : custom}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "var(--ds-space-lg) var(--ds-space-xl)", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--ds-space-sm)", alignItems: "center" }}>
        <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", margin: 0 }}>
          © 2025 L&apos;Incomparable Service &amp; Fils · Tous droits réservés
        </p>
        <div style={{ display: "flex", gap: "var(--ds-space-lg)" }}>
          {["Confidentialité", "Mentions légales"].map(l => (
            <span key={l} style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Fiche Produit ────────────────────────────────────────────────────────────
function FicheProduit({ product, onBack, onDetail }: { product: Product; onBack: () => void; onDetail: (p: Product) => void }) {
  const [qty, setQty] = useState(1)
  const autres = PRODUCTS.filter(p => p.id !== product.id)
  const msgCmd = waUrl(`Bonjour L'Incomparable Service & Fils, je souhaite ${qty} sac(s) de ${product.nom} (${product.conditionnement}). Disponibilité et tarif SVP. Merci.`)

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--ds-bg-secondary)", borderBottom: "1px solid var(--ds-border)", padding: "12px var(--ds-space-xl)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-brand)", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}>
            <ArrowLeft size={13} /> Retour
          </button>
          <ChevronRight size={12} style={{ color: "var(--ds-text-tertiary)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)" }}>{product.categorie}</span>
          <ChevronRight size={12} style={{ color: "var(--ds-text-tertiary)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", fontWeight: 500 }}>{product.nomCourt}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: "var(--ds-space-3xl) var(--ds-space-xl)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "var(--ds-space-3xl)", alignItems: "flex-start" }} className="fiche-grid">
          {/* Image */}
          <div style={{ borderRadius: "var(--ds-radius-2xl)", overflow: "hidden", background: "#f0f0f8", aspectRatio: "4/3", boxShadow: "var(--ds-shadow-lg)" }}>
            <img src={imgSrc(product.image)} alt={product.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-xl)" }}>
            <div style={{ display: "flex", gap: "var(--ds-space-sm)", flexWrap: "wrap" }}>
              <span style={{ background: "var(--ds-brand)", color: "white", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 600, padding: "4px 12px", borderRadius: "var(--ds-radius-full)" }}>{product.badge}</span>
              <span style={{ background: "var(--ds-bg-secondary)", border: "1px solid var(--ds-border)", color: "var(--ds-text-secondary)", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 500, padding: "4px 12px", borderRadius: "var(--ds-radius-full)" }}>{product.drapeau} {product.origine}</span>
            </div>

            <div>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-brand)", fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{product.categorie}</p>
              <h1 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-3xl)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", lineHeight: 1.15, margin: 0 }}>{product.nom}</h1>
            </div>

            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.75, margin: 0 }}>{product.description}</p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {product.arguments.map(arg => (
                <li key={arg} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.45 }}>{arg}</span>
                </li>
              ))}
            </ul>

            {/* Qty */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-lg)" }}>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text-primary)" }}>Quantité (sacs) :</span>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-sm)", background: "var(--ds-bg-secondary)", borderRadius: "var(--ds-radius-full)", padding: "4px 6px", border: "1px solid var(--ds-border)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ds-text-secondary)" }}><Minus size={13} /></button>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-base)", fontWeight: 800, color: "var(--ds-brand)", minWidth: 28, textAlign: "center" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ds-text-secondary)" }}><Plus size={13} /></button>
              </div>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)" }}>{product.conditionnement}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-sm)" }}>
              <WaBtn label={`Demander un Devis — ${qty} Sac${qty > 1 ? "s" : ""}`} url={msgCmd} full />
              <a href="#" onClick={e => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 500, color: "var(--ds-brand)", border: "1.5px solid var(--ds-brand-muted)", borderRadius: "var(--ds-radius-full)", padding: "11px 22px", textDecoration: "none", transition: "background var(--ds-transition)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ds-brand-muted)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent" }}
              >
                <FileDown size={14} /> Fiche Technique PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section style={{ background: "var(--ds-bg-secondary)", padding: "var(--ds-space-3xl) var(--ds-space-xl)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-text-primary)", letterSpacing: "-0.02em", marginBottom: "var(--ds-space-xl)" }}>Spécifications Techniques</h2>
          <div style={{ background: "var(--ds-bg)", borderRadius: "var(--ds-radius-xl)", border: "1px solid var(--ds-border)", overflow: "hidden", boxShadow: "var(--ds-shadow-sm)" }}>
            {product.specs.map(({ label, valeur }, i) => (
              <div key={label} className="spec-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", borderBottom: i < product.specs.length - 1 ? "1px solid var(--ds-border)" : "none" }}>
                <div style={{ padding: "14px var(--ds-space-xl)", background: "var(--ds-bg-secondary)", borderRight: "1px solid var(--ds-border)" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 600, color: "var(--ds-text-secondary)" }}>{label}</span>
                </div>
                <div style={{ padding: "14px var(--ds-space-xl)" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-primary)", fontWeight: 500 }}>{valeur}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits connexes */}
      <section style={{ background: "var(--ds-bg)", padding: "var(--ds-space-3xl) var(--ds-space-xl)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 700, color: "var(--ds-text-primary)", letterSpacing: "-0.02em", marginBottom: "var(--ds-space-xl)" }}>Produits Complémentaires</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--ds-space-lg)" }} className="connexes-grid">
            {autres.map(p => (
              <div key={p.id} onClick={() => onDetail(p)} style={{
                display: "flex", gap: "var(--ds-space-lg)", padding: "var(--ds-space-lg)", border: "1px solid var(--ds-border)", borderRadius: "var(--ds-radius-xl)", cursor: "pointer",
                transition: "box-shadow var(--ds-transition-md), transform var(--ds-transition-md)", background: "var(--ds-bg)", alignItems: "center",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                <div style={{ width: 72, height: 72, borderRadius: "var(--ds-radius-lg)", overflow: "hidden", flexShrink: 0, background: "var(--ds-bg-secondary)" }}>
                  <img src={imgSrc(p.image)} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", margin: "0 0 3px" }}>{p.nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)", margin: "0 0 8px" }}>{p.drapeau} {p.origine}</p>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-brand)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>Voir la fiche <ArrowRight size={11} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Responsive CSS ───────────────────────────────────────────────────────────
const CSS = `
  .nav-desktop { display: flex; align-items: center; }
  .nav-mobile-toggle { display: none; }
  .hero-grid { grid-template-columns: 1.05fr 0.95fr; }
  .hero-visual { display: flex; }
  .hero-float-1, .hero-float-2 { display: flex; }
  .cat-grid-5 { grid-template-columns: repeat(5, 1fr); }
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .garanties-grid { grid-template-columns: repeat(4, 1fr); }
  .simu-grid { grid-template-columns: 1fr 1.3fr; }
  .fiche-grid { grid-template-columns: 1.1fr 1fr; }
  .connexes-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
  .mobile-dock { display: none !important; }
  .spec-row { grid-template-columns: 1fr 1.5fr; }

  @media (max-width: 1024px) {
    .cat-grid-5 { grid-template-columns: repeat(3, 1fr) !important; }
    .garanties-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: var(--ds-space-xl) !important; }
    .simu-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-mobile-toggle { display: flex !important; }
    .mobile-dock { display: flex !important; }
    main { padding-bottom: 72px !important; }
    .hero-grid { grid-template-columns: 1fr !important; padding-top: 36px !important; padding-bottom: 48px !important; gap: 36px !important; }
    .hero-visual { display: flex !important; justify-content: center !important; margin-top: 16px !important; }
    .hero-visual > div { width: 100% !important; max-width: 320px !important; }
    .hero-float-1 { bottom: 12px !important; left: -4px !important; transform: scale(0.9); }
    .hero-float-2 { top: 12px !important; right: -4px !important; transform: scale(0.9); }
    .cat-grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
    .product-grid { grid-template-columns: 1fr !important; }
    .garanties-grid { grid-template-columns: 1fr 1fr !important; }
    .fiche-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .connexes-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .spec-row { grid-template-columns: 1fr !important; }
    .spec-row > div:first-child { border-right: none !important; border-bottom: 1px solid var(--ds-border) !important; padding: 10px 16px !important; }
    .spec-row > div:last-child { padding: 10px 16px !important; }
  }

  @media (max-width: 480px) {
    .cat-grid-5 { grid-template-columns: 1fr !important; }
    .garanties-grid { grid-template-columns: 1fr !important; }
    .hero-float-1, .hero-float-2 { display: none !important; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
`

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<"home" | "product">("home")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleDetail = useCallback((p: Product) => {
    setSelectedProduct(p); setView("product")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleBack = useCallback(() => {
    setView("home"); setSelectedProduct(null)
    setTimeout(() => document.getElementById("produits")?.scrollIntoView({ behavior: "smooth" }), 100)
  }, [])

  const handleNavigate = useCallback((id: string) => {
    if (view === "product") {
      setView("home"); setSelectedProduct(null)
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }, [view])

  return (
    <>
      <style>{CSS}</style>
      <div style={{ fontFamily: "var(--ds-font-body)", minHeight: "100vh" }}>
        <AnnouncementBar />
        <Navbar onNavigate={handleNavigate} />
        {view === "home" ? (
          <main>
            <HeroSection onVoirProduits={() => handleNavigate("produits")} />
            <CategoriesSection onScrollTo={handleNavigate} />
            <ShowcaseSection onDetail={handleDetail} />
            <SimulateurSection />
            <ReassuranceSection />
            <CTASection />
          </main>
        ) : (
          selectedProduct && <FicheProduit product={selectedProduct} onBack={handleBack} onDetail={handleDetail} />
        )}
        <Footer />

        {/* Mobile Floating Action Dock (UX_MOBILE_CONVERSION_AFRICA) */}
        <div className="mobile-dock" style={{
          position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 999,
          background: "rgba(15, 15, 28, 0.95)", backdropFilter: "blur(12px)",
          borderRadius: "var(--ds-radius-2xl)", padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.12)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ds-conversion)", display: "block" }} />
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>Dépôt Ouvert</span>
          </div>
          <WaBtn label="WhatsApp Direct" url={waUrl("Bonjour, je souhaite un devis pour mes travaux de staff.")} small />
        </div>

      </div>
    </>
  )
}
