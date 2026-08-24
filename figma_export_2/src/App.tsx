import { useState, useCallback } from "react"
import {
  MessageCircle, Phone, MapPin, Mail, Menu, X, ChevronRight,
  ArrowLeft, CheckCircle2, Star, Package, Sparkles,
  Clock, Calculator, ShieldCheck, Truck, Award, ChevronDown,
  Plus, Minus, ArrowRight, Zap, HelpCircle
} from "lucide-react"
import imgGypse from "@/imports/photo2.jpeg"
import imgChaux from "@/imports/photo1.jpeg"
import imgFilasse from "@/imports/filace.jpeg"

// ─── Constants & Deep Links ──────────────────────────────────────────────────
const WA_NUMBER = "2290197463209"
const PHONE_DISPLAY = "+229 01 97 46 32 09"
const COMPANY_NAME = "Marco Staff BTP"
const COMPANY_SUBTITLE = "L'Incomparable Service & Fils"

const waUrl = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const waDevis = (produit: string, conditionnement: string) =>
  waUrl(`Bonjour ${COMPANY_NAME}, je souhaite commander ou obtenir un devis pour : *${produit}* (${conditionnement}). Pouvez-vous m'indiquer la disponibilité et le tarif dégressif ? Merci !`)

interface Product {
  id: string
  nom: string
  nomCourt: string
  categorie: string
  origine: string
  drapeau: string
  badge: string
  conditionnement: string
  prixUnit: number
  image: string | { src: string }
  description: string
  arguments: string[]
  specs: { label: string; valeur: string }[]
  m2ParSac: number
}

// ─── Products Data (100% Vrais Matériaux) ────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "gypse-40kg",
    nom: "Poudre de Gypse Marco — Extra White 40 KG",
    nomCourt: "Gypse Marco 40kg",
    categorie: "Gypse & Plâtre de Moulage",
    origine: "Égypte",
    drapeau: "🇪🇬",
    badge: "Extra White · Made in Egypt",
    conditionnement: "Sac scellé de 40 KG",
    prixUnit: 4500,
    image: imgGypse,
    description: "Poudre de gypse de moulage extra blanche importée directement d'Égypte. Granulométrie micronique ultra-fine pour un gâchage fluide sans grumeaux, une prise régulière et une finition miroir sans aucune craquelure.",
    arguments: [
      "Blancheur éclatante 100% sans aucun jaunissement dans le temps",
      "Finesse micronique supérieure : gâchage fluide et sans grumeaux",
      "Prise régulière (20 – 30 min) : idéal pour faux-plafonds et moulures",
      "Zéro retrait et zéro fissuration après séchage complet"
    ],
    specs: [
      { label: "Origine", valeur: "Import direct Égypte (Usine certifiée)" },
      { label: "Conditionnement", valeur: "Sac scellé de 40 KG (80 lbs)" },
      { label: "Temps de prise", valeur: "20 à 30 minutes (régulier)" },
      { label: "Dosage d'eau indicatif", valeur: "0,60 L par kg de poudre" },
      { label: "Finesse / Tamisage", valeur: "< 80 microns (finesse supérieure)" },
      { label: "Indice de blancheur", valeur: "Extra White 100%" },
      { label: "Usage recommandé", valeur: "Plafonds suspendus staff, corniches, plaques lisses" }
    ],
    m2ParSac: 10,
  },
  {
    id: "chaux-vive",
    nom: "Chaux Vive Marco — Première Qualité (White Lime)",
    nomCourt: "Chaux Vive Marco",
    categorie: "Chaux & Liants Protecteurs",
    origine: "Dubaï, UAE",
    drapeau: "🇦🇪",
    badge: "Import Dubaï (UAE)",
    conditionnement: "Sac étanche de 40 KG",
    prixUnit: 5200,
    image: imgChaux,
    description: "White Lime pure de première qualité importée de Dubaï (Oki General Trading). Pureté calcique exceptionnelle et haute réactivité pour des enduits respirants, étanches et naturellement anti-salpêtre.",
    arguments: [
      "Pureté calcique CaO > 95% pour une réactivité thermique maximale",
      "Pouvoir assainissant, bactéricide et anti-moisissure naturel",
      "Excellente perméabilité à la vapeur : protège contre l'humidité",
      "Forte adhérence sur tous supports maçonnés et ouvrages staff"
    ],
    specs: [
      { label: "Origine", valeur: "Import direct Dubaï, UAE (Oki General Trading)" },
      { label: "Conditionnement", valeur: "Sac étanche protecteur de 40 KG" },
      { label: "Teneur en CaO (Pureté)", valeur: "> 95% pureté garantie" },
      { label: "Réactivité (T60)", valeur: "< 2 minutes (haute réactivité)" },
      { label: "Propriétés", valeur: "Fongicide, assainissant et respirant" },
      { label: "Usage recommandé", valeur: "Enduits de finition, chaulage, assainissement de murs" }
    ],
    m2ParSac: 8,
  },
  {
    id: "filasse-sisal",
    nom: "Filasse de Sisal Pure Naturelle du Kenya",
    nomCourt: "Filasse Sisal Kenya",
    categorie: "Fibres & Armatures Staff",
    origine: "Kenya",
    drapeau: "🇰🇪",
    badge: "Produce of Kenya · 100% Pur",
    conditionnement: "Balle pressée 25 / 50 KG",
    prixUnit: 8000,
    image: imgFilasse,
    description: "Fibres végétales de sisal pur sélectionnées et peignées au Kenya. Fibres longues d'une résistance mécanique extrême à la traction, garantissant l'armature indestructible de tous vos éléments en staff.",
    arguments: [
      "Fibres végétales 100% naturelles sélectionnées (Agave Sisalana)",
      "Fibres longues peignées (60 à 120 cm) sans déchets ni poussière",
      "Imprégnation plâtre instantanée pour un bloc structurel indéformable",
      "Résistance extrême à la traction (> 300 MPa) contre les secousses"
    ],
    specs: [
      { label: "Origine", valeur: "Produce of Kenya (Import direct)" },
      { label: "Type de fibre", valeur: "Sisal naturel pur 100% végétal" },
      { label: "Longueur des brins", valeur: "60 cm à 120 cm (fibres longues)" },
      { label: "Conditionnement", valeur: "Balle pressée de 25 KG ou 50 KG" },
      { label: "Résistance traction", valeur: "> 300 MPa" },
      { label: "Usage recommandé", valeur: "Armature de corniches lourdes, rosaces et plaques staff" }
    ],
    m2ParSac: 15,
  },
]

const imgSrc = (img: string | { src: string }) =>
  typeof img === "string" ? img : img.src

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Quels sont les délais de livraison sur les chantiers à Cotonou et Calavi ?",
    a: "Nous assurons la livraison directe sur vos chantiers sous 24h à 48h maximum dans tout le Grand Cotonou (Cotonou, Abomey-Calavi, Sèmè-Kpodji, Ouidah et Porto-Novo). Vous pouvez également retirer vos commandes immédiatement à nos dépôts."
  },
  {
    q: "La poudre de Gypse Marco 40 KG convient-elle aux corniches et faux-plafonds staff ?",
    a: "Oui, absolument. Le Gypse Marco possède une granulométrie micronique extra-fine (< 80 microns) et un temps de prise parfaitement régulier (20 à 30 min). Il est spécialement formulé pour le coulage de corniches, les rosaces décoratives et les faux-plafonds suspendus sans risque de craquelure."
  },
  {
    q: "Proposez-vous des tarifs dégressifs pour les grossistes et gros chantiers ?",
    a: "Oui, nous appliquons une grille tarifaire préférentielle dégressive à partir de 20 sacs de gypse, 5 sacs de chaux ou 1 balle complète de filasse. Contactez-nous directement sur WhatsApp avec votre volume estimé pour recevoir notre meilleure offre."
  },
  {
    q: "Quelle est la différence entre la Chaux Vive Marco et une chaux ordinaire ?",
    a: "La Chaux Vive Marco (White Lime) est importée directement de Dubaï avec une pureté calcique certifiée CaO > 95%. Elle offre une réactivité thermique instantanée, une blancheur pure et un pouvoir anti-salpêtre et fongicide naturel idéal pour assainir les murs soumis au climat tropical."
  },
  {
    q: "Comment commander ou réserver un stock pour mon chantier ?",
    a: "Il vous suffit de cliquer sur le bouton WhatsApp du site ou d'utiliser le simulateur de chantier. Notre équipe vous confirme la disponibilité du stock, vous transmet la facture proforma et planifie la livraison selon votre planning."
  }
]

// ─── Button Component ────────────────────────────────────────────────────────
function Button({ children, variant = "primary", size = "medium", iconEnd, onClick, full = false, style = {} }: {
  children?: React.ReactNode; variant?: "primary" | "neutral" | "secondary"; size?: "small" | "medium" | "large";
  iconEnd?: React.ReactNode; onClick?: () => void; full?: boolean; style?: React.CSSProperties;
}) {
  const isPrimary = variant === "primary"
  const isSecondary = variant === "secondary"
  const isSmall = size === "small"
  const isLarge = size === "large"

  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: isPrimary ? "var(--ds-brand)" : isSecondary ? "var(--ds-dark-bg)" : "var(--ds-bg-secondary)",
      color: isPrimary || isSecondary ? "white" : "var(--ds-text-primary)",
      border: isPrimary || isSecondary ? "none" : "1.5px solid var(--ds-border)",
      borderRadius: "var(--ds-radius-full)",
      padding: isSmall ? "8px 16px" : isLarge ? "14px 28px" : "12px 22px",
      fontFamily: "var(--ds-font-body)", fontSize: isSmall ? "var(--ds-text-xs)" : "var(--ds-text-sm)",
      fontWeight: 600, cursor: "pointer", width: full ? "100%" : undefined,
      boxShadow: isPrimary ? "var(--ds-shadow-brand)" : "none",
      transition: "all var(--ds-transition)",
      ...style
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-1px)"
        if (isPrimary) e.currentTarget.style.background = "var(--ds-brand-hover)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)"
        if (isPrimary) e.currentTarget.style.background = "var(--ds-brand)"
      }}
    >
      {children}
      {iconEnd}
    </button>
  )
}

// ─── WhatsApp Button Component ───────────────────────────────────────────────
function WaBtn({ label = "WhatsApp", url, small = false, full = false }: {
  label?: string; url: string; small?: boolean; full?: boolean
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: small ? 6 : 8, background: "var(--ds-conversion)", color: "white",
      fontFamily: "var(--ds-font-body)", fontSize: small ? "var(--ds-text-xs)" : "var(--ds-text-sm)",
      fontWeight: 600, padding: small ? "9px 16px" : "13px 22px",
      borderRadius: "var(--ds-radius-full)", textDecoration: "none",
      transition: "all var(--ds-transition)",
      boxShadow: "var(--ds-shadow-conversion)", width: full ? "100%" : undefined,
      whiteSpace: "nowrap",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "var(--ds-conversion-hover)"
        e.currentTarget.style.transform = "translateY(-1px)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "var(--ds-conversion)"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      <MessageCircle size={small ? 14 : 16} />
      <span>{label}</span>
    </a>
  )
}

// ─── Header & Top Announcement ───────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div style={{ background: "var(--ds-dark-bg)", padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ds-conversion)", display: "block", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-dark-text-muted)", fontWeight: 500 }}>
            Dépôt Ouvert · Lun–Sam 7h30–18h00 · Cotonou &amp; Abomey-Calavi
          </span>
        </div>
        <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
          <Phone size={12} style={{ color: "var(--ds-conversion)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "white", fontWeight: 600 }}>
            {PHONE_DISPLAY}
          </span>
        </a>
      </div>
    </div>
  )
}

function Navbar({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [open, setOpen] = useState(false)
  const links = [
    { label: "Accueil", id: "accueil" },
    { label: "Nos Matériaux", id: "produits" },
    { label: "Simulateur", id: "simulateur" },
    { label: "Garanties", id: "garanties" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--ds-border)"
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 16px",
        height: 68, display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        {/* Logo */}
        <div onClick={() => onNavigate("accueil")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "var(--ds-radius-md)",
            background: "var(--ds-brand)", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
            boxShadow: "0 2px 10px rgba(103,79,245,0.35)",
          }}>
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.1rem", fontWeight: 800, color: "white" }}>M</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-base)", fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1.1 }}>
              {COMPANY_NAME}
            </div>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.6rem", fontWeight: 500, color: "var(--ds-text-tertiary)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {COMPANY_SUBTITLE}
            </div>
          </div>
        </div>

        {/* Nav Desktop */}
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }} className="nav-desktop">
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)",
                fontWeight: 600, color: "var(--ds-text-secondary)",
                textDecoration: "none", transition: "color var(--ds-transition)"
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--ds-brand)" }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--ds-text-secondary)" }}
            >{label}</a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="nav-desktop">
          <WaBtn label="WhatsApp Express" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis.`)} small />
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} aria-label="Menu" style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 8, color: "var(--ds-text-primary)", flexShrink: 0
        }} className="nav-mobile-toggle">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          borderTop: "1px solid var(--ds-border)",
          padding: "16px",
          display: "flex", flexDirection: "column", gap: 12,
          background: "var(--ds-bg)"
        }}>
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id); setOpen(false) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-base)",
                fontWeight: 600, color: "var(--ds-text-primary)",
                textDecoration: "none", padding: "6px 0"
              }}
            >{label}</a>
          ))}
          <WaBtn label="Demander un Devis WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis.`)} full />
        </div>
      )}
    </header>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection({ onVoirProduits, onSimulateur }: { onVoirProduits: () => void; onSimulateur: () => void }) {
  return (
    <section id="accueil" style={{ background: "var(--ds-bg)", position: "relative", overflow: "hidden" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "48px 16px 64px",
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
        gap: "var(--ds-space-3xl)", alignItems: "center", position: "relative",
      }} className="hero-grid">

        {/* Left Col */}
        <div style={{ position: "relative", zIndex: 1 }}>
          
          {/* Origin pills */}
          <div style={{ display: "flex", gap: "var(--ds-space-sm)", marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { flag: "🇪🇬", label: "Gypse d'Égypte" },
              { flag: "🇦🇪", label: "Chaux de Dubaï" },
              { flag: "🇰🇪", label: "Filasse du Kenya" }
            ].map(({ flag, label }) => (
              <span key={label} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: "var(--ds-bg-secondary)", border: "1px solid var(--ds-border)",
                borderRadius: "var(--ds-radius-full)", padding: "5px 12px",
                fontFamily: "var(--ds-font-body)", fontSize: "0.72rem",
                fontWeight: 600, color: "var(--ds-text-primary)",
              }}>{flag} {label}</span>
            ))}
          </div>

          <h1 style={{
            fontFamily: "var(--ds-font-heading)",
            fontSize: "clamp(2.1rem, 4.8vw, 3.4rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1.12,
            letterSpacing: "-0.035em", marginBottom: 20,
          }}>
            L&apos;Excellence des{" "}
            <span style={{ color: "var(--ds-brand)" }}>Matériaux de Staff</span> &amp; Finition au Bénin.
          </h1>

          <p style={{
            fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-base)",
            color: "var(--ds-text-secondary)", lineHeight: 1.7, maxWidth: 520,
            marginBottom: 32,
          }}>
            Approvisionnez vos chantiers directement à la source. <strong>Poudre de Gypse Marco 40 KG</strong> (Égypte), <strong>Chaux Vive pure</strong> (Dubaï) et <strong>Filasse Sisal haute ténacité</strong> (Kenya). Qualité certifiée, zéro fissure, livraison rapide sur chantier.
          </p>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "var(--ds-space-md)", flexWrap: "wrap", alignItems: "center", marginBottom: 36 }} className="hero-cta-group">
            <WaBtn label="Demander un Devis WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} />
            <Button variant="neutral" iconEnd={<Calculator size={15} />} onClick={onSimulateur}>
              Simulateur Chantier
            </Button>
          </div>

          {/* Trust stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--ds-space-md)",
            paddingTop: 24, borderTop: "1px solid var(--ds-border)",
          }} className="hero-stats-grid">
            {[
              { val: "100%", label: "Pureté & Zéro Fissure" },
              { val: "3", label: "Pays d'Importation Directe" },
              { val: "24/48h", label: "Livraison sur Chantier" },
              { val: "1000+", label: "Chantiers Réalisés au Bénin" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-xl)", fontWeight: 800, color: "var(--ds-brand)", lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-tertiary)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col – Visual Hero */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }} className="hero-visual">
          <div style={{
            position: "relative", zIndex: 2, width: "100%", maxWidth: 320,
            background: "white", borderRadius: "var(--ds-radius-2xl)",
            boxShadow: "0 24px 64px rgba(103,79,245,0.18), 0 8px 24px rgba(0,0,0,0.08)",
            overflow: "hidden", border: "1px solid rgba(103,79,245,0.12)",
          }}>
            <div style={{ height: 260, background: "#1a2744", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={imgSrc(imgGypse)} alt="Poudre de Gypse Marco 40 KG" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ padding: "var(--ds-space-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 800, color: "var(--ds-text-primary)" }}>Gypse Marco 40 KG</span>
                <span style={{ background: "var(--ds-brand)", color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: "var(--ds-radius-full)" }}>N°1 Staff</span>
              </div>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", margin: 0 }}>
                🇪🇬 Import Égypte · Extra White · Prise 20 min
              </p>
            </div>
          </div>

          {/* Floating Badges */}
          <div style={{
            position: "absolute", bottom: 20, left: -10, zIndex: 3,
            background: "white", borderRadius: "var(--ds-radius-lg)",
            padding: "8px 12px", boxShadow: "var(--ds-shadow-md)",
            border: "1px solid var(--ds-border)", display: "flex", alignItems: "center", gap: 8
          }} className="hero-float-1">
            <ShieldCheck size={16} style={{ color: "var(--ds-conversion)" }} />
            <div>
              <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.72rem", fontWeight: 700, color: "var(--ds-text-primary)" }}>Zéro Craquelure</div>
              <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.6rem", color: "var(--ds-text-tertiary)" }}>Garantie de séchage</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Products Showcase Section ───────────────────────────────────────────────
function ProductsSection({ onDetail }: { onDetail: (p: Product) => void }) {
  return (
    <section id="produits" style={{ background: "var(--ds-bg-secondary)", padding: "72px 16px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Package size={13} /> Catalogue Officiel Direct Usine
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Nos 3 Matériaux Phares en Stock Permanent
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Chaque sac et balle provient directement des usines partenaires. Zéro intermédiaire, qualité certifiée pour les staffeurs et promoteurs du Bénin.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-xl)" }} className="product-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{
              background: "var(--ds-bg)", border: "1px solid var(--ds-border)",
              borderRadius: "var(--ds-radius-2xl)", overflow: "hidden", display: "flex", flexDirection: "column",
              boxShadow: "var(--ds-shadow-sm)", transition: "all var(--ds-transition-md)"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "var(--ds-shadow-lg)"
                e.currentTarget.style.transform = "translateY(-4px)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "var(--ds-shadow-sm)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              {/* Product Image Frame */}
              <div style={{ position: "relative", height: 230, background: "#f5f6fa", padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={imgSrc(p.image)} alt={p.nom} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                <span style={{
                  position: "absolute", top: 12, left: 12,
                  background: "var(--ds-brand)", color: "white",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", fontWeight: 700,
                  padding: "4px 10px", borderRadius: "var(--ds-radius-full)"
                }}>
                  {p.badge}
                </span>
                <span style={{
                  position: "absolute", bottom: 10, right: 12,
                  background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", fontWeight: 600,
                  color: "var(--ds-text-primary)", padding: "3px 9px", borderRadius: "var(--ds-radius-full)",
                  boxShadow: "var(--ds-shadow-sm)"
                }}>
                  {p.drapeau} {p.origine}
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: "var(--ds-space-xl)", flex: 1, display: "flex", flexDirection: "column", gap: "var(--ds-space-md)" }}>
                <div>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-brand)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {p.categorie}
                  </span>
                  <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-base)", fontWeight: 800, color: "var(--ds-text-primary)", margin: "4px 0 0", lineHeight: 1.3 }}>
                    {p.nom}
                  </h3>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.arguments.map(arg => (
                    <li key={arg} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <CheckCircle2 size={14} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", lineHeight: 1.45 }}>
                        {arg}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Conditionnement badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--ds-bg-secondary)", borderRadius: "var(--ds-radius-sm)", width: "fit-content" }}>
                  <Package size={13} style={{ color: "var(--ds-text-tertiary)" }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", fontWeight: 600 }}>
                    {p.conditionnement}
                  </span>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-sm)", marginTop: "auto", paddingTop: 8 }}>
                  <WaBtn label="Commander / Devis WhatsApp" url={waDevis(p.nom, p.conditionnement)} full />
                  <button onClick={() => onDetail(p)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 700,
                    color: "var(--ds-brand)", background: "var(--ds-brand-light)", border: "none",
                    borderRadius: "var(--ds-radius-full)", padding: "10px 20px", cursor: "pointer",
                    transition: "all var(--ds-transition)",
                  }}>
                    <span>Fiche Technique &amp; Dosage</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Simulateur de Chantier Section ──────────────────────────────────────────
function SimulateurSection() {
  const [surface, setSurface] = useState(60)
  const [typeOuvrage, setTypeOuvrage] = useState<"plafond" | "corniche">("plafond")

  const coefGypse = typeOuvrage === "plafond" ? 0.35 : 0.25
  const coefFilasse = typeOuvrage === "plafond" ? 0.15 : 0.10
  const coefChaux = 0.08

  const nbSacsGypse = Math.max(1, Math.ceil(surface * coefGypse))
  const kgFilasse = Math.max(1, Math.round(surface * coefFilasse))
  const nbSacsChaux = Math.max(1, Math.ceil(surface * coefChaux))

  const msgSimu = waUrl(`Bonjour ${COMPANY_NAME}, j'ai calculé mes besoins sur votre simulateur :

` +
    `📋 *Détails du Projet :*
` +
    `• Type d'ouvrage : ${typeOuvrage === "plafond" ? "Plafond Staff / Faux-Plafond" : "Corniches & Moulures"}
` +
    `• Surface estimée : ${surface} m²

` +
    `📦 *Quantités Estimées :*
` +
    `• Gypse Marco 40kg : ${nbSacsGypse} sacs
` +
    `• Filasse Sisal Kenya : ${kgFilasse} kg
` +
    `• Chaux Vive Marco : ${nbSacsChaux} sacs

` +
    `Pouvez-vous me transmettre votre meilleur devis avec livraison ? Merci !`
  )

  return (
    <section id="simulateur" style={{ background: "var(--ds-bg)", padding: "72px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "var(--ds-space-3xl)", alignItems: "center" }} className="simu-grid">
        
        {/* Left explanation */}
        <div>
          <div style={{
            width: 44, height: 44, borderRadius: "var(--ds-radius-lg)",
            background: "var(--ds-brand-light)", display: "flex", alignItems: "center",
            justifyContent: "center", marginBottom: 16, color: "var(--ds-brand)"
          }}>
            <Calculator size={22} />
          </div>
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Outil d&apos;Estimation Rapide
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em", marginTop: 8, marginBottom: 16 }}>
            Calculez vos Besoins en Matériaux en 1 Clic
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
            Faites glisser le curseur selon la superficie de votre chantier pour estimer instantanément le nombre de sacs de Gypse Marco, de Chaux Vive et de Filasse de Sisal nécessaires.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { text: "Calcul basé sur les ratios réels des maîtres staffeurs" },
              { text: "Estimation globale : Gypse + Chaux + Filasse" },
              { text: "Envoi direct sur WhatsApp pour validation et tarif dégressif" },
            ].map(({ text }) => (
              <div key={text} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <CheckCircle2 size={15} style={{ color: "var(--ds-conversion)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Interactive Box */}
        <div style={{
          background: "var(--ds-bg-secondary)", borderRadius: "var(--ds-radius-2xl)",
          border: "1.5px solid var(--ds-border)", padding: "var(--ds-space-2xl)",
          boxShadow: "var(--ds-shadow-md)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-xl)" }}>
            
            {/* Ouvrage Selector */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "var(--ds-text-primary)", textTransform: "uppercase", marginBottom: 10 }}>
                1. Type d&apos;ouvrage :
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button type="button" onClick={() => setTypeOuvrage("plafond")} style={{
                  padding: "10px 14px", borderRadius: "var(--ds-radius-lg)",
                  fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 700,
                  border: `2px solid ${typeOuvrage === "plafond" ? "var(--ds-brand)" : "var(--ds-border)"}`,
                  background: typeOuvrage === "plafond" ? "var(--ds-brand-light)" : "white",
                  color: typeOuvrage === "plafond" ? "var(--ds-brand)" : "var(--ds-text-secondary)",
                  cursor: "pointer", transition: "all var(--ds-transition)"
                }}>
                  🏢 Plafonds Staff
                </button>
                <button type="button" onClick={() => setTypeOuvrage("corniche")} style={{
                  padding: "10px 14px", borderRadius: "var(--ds-radius-lg)",
                  fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 700,
                  border: `2px solid ${typeOuvrage === "corniche" ? "var(--ds-brand)" : "var(--ds-border)"}`,
                  background: typeOuvrage === "corniche" ? "var(--ds-brand-light)" : "white",
                  color: typeOuvrage === "corniche" ? "var(--ds-brand)" : "var(--ds-text-secondary)",
                  cursor: "pointer", transition: "all var(--ds-transition)"
                }}>
                  ✨ Corniches &amp; Moulures
                </button>
              </div>
            </div>

            {/* Surface Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <label style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "var(--ds-text-primary)", textTransform: "uppercase" }}>
                  2. Superficie du chantier :
                </label>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-brand)" }}>
                  {surface} m²
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-sm)" }}>
                <button onClick={() => setSurface(s => Math.max(10, s - 10))} aria-label="Moins 10m²"
                  style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid var(--ds-border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)" }}>
                  <Minus size={15} />
                </button>
                <input type="range" min={10} max={500} step={5} value={surface}
                  onChange={e => setSurface(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "var(--ds-brand)", height: 6, cursor: "pointer" }}
                />
                <button onClick={() => setSurface(s => Math.min(500, s + 10))} aria-label="Plus 10m²"
                  style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid var(--ds-border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)" }}>
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div style={{
              background: "white", borderRadius: "var(--ds-radius-xl)",
              border: "1px solid var(--ds-border)", padding: "var(--ds-space-lg)",
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center"
            }} className="simu-results-grid">
              <div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Gypse Marco</div>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-brand)", margin: "4px 0" }}>{nbSacsGypse}</div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", color: "var(--ds-text-secondary)" }}>sacs (40kg)</div>
              </div>
              <div style={{ borderLeft: "1px solid var(--ds-border)", borderRight: "1px solid var(--ds-border)" }}>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Filasse Sisal</div>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-conversion)", margin: "4px 0" }}>{kgFilasse}</div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", color: "var(--ds-text-secondary)" }}>kg (Kenya)</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Chaux Vive</div>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-text-primary)", margin: "4px 0" }}>{nbSacsChaux}</div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", color: "var(--ds-text-secondary)" }}>sacs (Dubaï)</div>
              </div>
            </div>

            <WaBtn label="Envoyer cette Estimation pour Devis WhatsApp" url={msgSimu} full />

          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Bannière CTA Glassmorphism (Reproduction Exacte de l'Image Figma) ───────
function VeloraCTABanner() {
  return (
    <section style={{ background: "var(--ds-bg)", padding: "48px 16px 72px", position: "relative", overflow: "hidden" }}>
      
      {/* Background Glowing Blurred Circles (Identique à l'Image Figma) */}
      <div style={{
        position: "absolute", top: "50%", left: "15%", width: 340, height: 340,
        borderRadius: "50%", background: "rgba(103, 79, 245, 0.35)",
        filter: "blur(90px)", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", top: "50%", right: "10%", width: 280, height: 280,
        borderRadius: "50%", background: "rgba(124, 58, 237, 0.25)",
        filter: "blur(80px)", transform: "translate(0, -50%)", pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        <div style={{
          borderRadius: "28px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          boxShadow: "0 20px 60px rgba(103,79,245,0.22), 0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
        }} className="velora-banner-grid">
          
          {/* Left: Purple Gradient with Solid Headline (Exact Figma) */}
          <div style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #674FF5 50%, #5B21B6 100%)",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            color: "white"
          }} className="velora-banner-left">
            <h2 style={{
              fontFamily: "var(--ds-font-heading)",
              fontSize: "clamp(1.85rem, 3.8vw, 2.7rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              margin: 0,
              color: "white"
            }}>
              Let&apos;s Build the Right Solution Together.
            </h2>
          </div>

          {/* Right: Clean White / Glass with Call to Action (Exact Figma) */}
          <div style={{
            background: "rgba(255, 255, 255, 0.94)",
            padding: "44px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16
          }} className="velora-banner-right">
            <div>
              <h3 style={{
                fontFamily: "var(--ds-font-heading)",
                fontSize: "var(--ds-text-lg)",
                fontWeight: 800,
                color: "#101828",
                lineHeight: 1.25,
                margin: "0 0 8px"
              }}>
                Looking for reliable industrial solutions?
              </h3>
              <p style={{
                fontFamily: "var(--ds-font-body)",
                fontSize: "0.8rem",
                color: "#475467",
                lineHeight: 1.5,
                margin: 0
              }}>
                Precision Engineering. Global Support. Proven Expertise.
              </p>
            </div>

            <div style={{ paddingTop: 4 }}>
              <a href={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite échanger sur un projet d'approvisionnement.`)} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "white",
                color: "#101828",
                border: "1px solid #D0D5DD",
                borderRadius: "var(--ds-radius-md)",
                padding: "11px 24px",
                fontFamily: "var(--ds-font-body)",
                fontSize: "var(--ds-text-xs)",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all var(--ds-transition)"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#101828"
                  e.currentTarget.style.color = "white"
                  e.currentTarget.style.borderColor = "#101828"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "white"
                  e.currentTarget.style.color = "#101828"
                  e.currentTarget.style.borderColor = "#D0D5DD"
                }}
              >
                <span>Contact Us</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

// ─── FAQ Accordion Section ───────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" style={{ background: "var(--ds-bg-secondary)", padding: "72px 16px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.1em", marginBottom: 10,
            background: "var(--ds-brand-light)", padding: "5px 12px", borderRadius: "var(--ds-radius-full)"
          }}>
            <HelpCircle size={13} /> Questions Fréquentes
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.5vw, 2.3rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", margin: "6px 0 10px" }}>
            Tout ce que vous devez savoir avant de commander
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)" }}>
            Réponses claires sur nos matériaux, nos délais de livraison et nos conditions tarifaires
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} style={{
                background: "white", borderRadius: "var(--ds-radius-xl)",
                border: `1.5px solid ${isOpen ? "var(--ds-brand)" : "var(--ds-border)"}`,
                overflow: "hidden", transition: "all var(--ds-transition)"
              }}>
                <button onClick={() => toggle(i)} style={{
                  width: "100%", padding: "18px 20px", display: "flex",
                  alignItems: "center", justifyContent: "space-between", gap: 16,
                  background: "none", border: "none", cursor: "pointer", textAlign: "left"
                }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", lineHeight: 1.35 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: isOpen ? "var(--ds-brand-light)" : "var(--ds-bg-secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    color: isOpen ? "var(--ds-brand)" : "var(--ds-text-tertiary)",
                    transition: "transform var(--ds-transition)"
                  }}>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 20px 18px", borderTop: "1px solid var(--ds-border)", paddingTop: 14 }}>
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", lineHeight: 1.7, margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

// ─── Testimonials & Guarantees ───────────────────────────────────────────────
const TEMOIGNAGES = [
  { initials: "KB", color: "#674FF5", nom: "Kouassi Bernard", role: "Maître Staffeur depuis 14 ans", ville: "Cotonou", note: 5, texte: "Le gypse Marco est sans équivalent au Bénin. La pâte est fluide, prend sans chauffer excessivement et ne fait aucune fissure. Mes chantiers sont validés du premier coup." },
  { initials: "AM", color: "#10B981", nom: "Adéola Moussa", role: "Conducteur de Travaux BTP", ville: "Abomey-Calavi", note: 5, texte: "La réactivité sur WhatsApp est top. En envoyant la surface, on a le devis et la livraison sur chantier à Calavi arrive dans les temps. La filasse du Kenya est très propre." },
  { initials: "FD", color: "#F59E0B", nom: "Fatou Diallo", role: "Architecte d'Intérieur", ville: "Cotonou", note: 5, texte: "Pour les faux-plafonds à gorges lumineuses de mes clients, j'exige le Gypse Marco et la Chaux Vive de Dubaï. La blancheur est parfaite, prête pour la peinture." },
]

const GARANTIES = [
  { icon: ShieldCheck, color: "var(--ds-conversion)", titre: "Zéro Fissure Garantie", desc: "Granulométrie micronique sans retrait ni craquelure" },
  { icon: Award, color: "var(--ds-brand)", titre: "Import Direct Certifié", desc: "Origines traçables : Égypte, Dubaï et Kenya" },
  { icon: Package, color: "#F59E0B", titre: "Stock Permanent", desc: "Disponibilité continue en sacs de 40 KG à Cotonou" },
  { icon: Truck, color: "#0ea5e9", titre: "Livraison sur Chantier", desc: "Acheminement rapide dans tout le Grand Cotonou" },
]

function ReassuranceSection() {
  return (
    <section id="garanties" style={{ background: "var(--ds-bg)", padding: "72px 16px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "var(--ds-space-2xl)" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Retours d&apos;Expérience
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", marginBottom: 8 }}>
            Approuvé par les Maîtres Staffeurs &amp; Artisans
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)" }}>
            Découvrez pourquoi les professionnels du bâtiment choisissent Marco Staff
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ds-space-xl)", marginBottom: "var(--ds-space-3xl)" }} className="product-grid">
          {TEMOIGNAGES.map(({ initials, color, nom, role, ville, note, texte }) => (
            <div key={nom} style={{
              background: "var(--ds-bg-secondary)", border: "1px solid var(--ds-border)", borderRadius: "var(--ds-radius-2xl)",
              padding: "var(--ds-space-xl)", display: "flex", flexDirection: "column", gap: "var(--ds-space-lg)",
              boxShadow: "var(--ds-shadow-sm)"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontWeight: 800 }}>
                  {initials}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", margin: 0 }}>{nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)", margin: "2px 0 4px" }}>{role} · {ville}</p>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(note)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" stroke="#F59E0B" />)}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.65, margin: 0, fontStyle: "italic", borderLeft: `3px solid ${color}`, paddingLeft: 12 }}>
                &ldquo;{texte}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* 4 Guarantees */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--ds-space-lg)" }} className="garanties-grid">
          {GARANTIES.map(({ icon: Icon, color, titre, desc }) => (
            <div key={titre} style={{
              background: "white", borderRadius: "var(--ds-radius-xl)", border: "1px solid var(--ds-border)",
              padding: "var(--ds-space-lg)", display: "flex", gap: 14, alignItems: "flex-start"
            }}>
              <div style={{ width: 40, height: 40, borderRadius: "var(--ds-radius-md)", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color }}>
                <Icon size={18} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", margin: "0 0 3px" }}>{titre}</p>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", margin: 0, lineHeight: 1.4 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Fiche Produit Détaillée ──────────────────────────────────────────────────
function FicheProduit({ product, onBack, onDetail }: { product: Product; onBack: () => void; onDetail: (p: Product) => void }) {
  const [qty, setQty] = useState(5)
  const autres = PRODUCTS.filter(p => p.id !== product.id)
  const msgCmd = waUrl(`Bonjour ${COMPANY_NAME}, je souhaite commander ${qty} sac(s) de *${product.nom}* (${product.conditionnement}). Pouvez-vous me confirmer le tarif et les modalités de livraison ? Merci !`)

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      
      {/* Breadcrumb */}
      <div style={{ background: "var(--ds-bg-secondary)", borderBottom: "1px solid var(--ds-border)", padding: "12px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-brand)", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 700 }}>
            <ArrowLeft size={14} /> Retour au catalogue
          </button>
          <ChevronRight size={12} style={{ color: "var(--ds-text-tertiary)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-secondary)", fontWeight: 600 }}>{product.nomCourt}</span>
        </div>
      </div>

      {/* Main product view */}
      <section style={{ padding: "48px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "var(--ds-space-3xl)", alignItems: "flex-start" }} className="fiche-grid">
          
          {/* Image studio frame */}
          <div style={{
            borderRadius: "var(--ds-radius-2xl)", overflow: "hidden",
            background: "#f5f6fa", padding: 32, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--ds-shadow-md)", border: "1px solid var(--ds-border)"
          }}>
            <img src={imgSrc(product.image)} alt={product.nom} style={{ maxHeight: 380, maxWidth: "100%", objectFit: "contain" }} />
          </div>

          {/* Details column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-xl)" }}>
            
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ background: "var(--ds-brand)", color: "white", fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, padding: "4px 12px", borderRadius: "var(--ds-radius-full)" }}>
                {product.badge}
              </span>
              <span style={{ background: "var(--ds-bg-secondary)", border: "1px solid var(--ds-border)", color: "var(--ds-text-primary)", fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 600, padding: "4px 12px", borderRadius: "var(--ds-radius-full)" }}>
                {product.drapeau} {product.origine}
              </span>
            </div>

            <div>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-brand)", fontWeight: 700, textTransform: "uppercase" }}>{product.categorie}</span>
              <h1 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.7rem, 3.5vw, 2.3rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "6px 0 0" }}>
                {product.nom}
              </h1>
            </div>

            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.75, margin: 0 }}>
              {product.description}
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {product.arguments.map(arg => (
                <li key={arg} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-secondary)", lineHeight: 1.45 }}>{arg}</span>
                </li>
              ))}
            </ul>

            {/* Quantity Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-space-lg)", padding: "12px 16px", background: "var(--ds-bg-secondary)", borderRadius: "var(--ds-radius-xl)" }}>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)" }}>Quantité :</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", borderRadius: "var(--ds-radius-full)", padding: "4px 8px", border: "1px solid var(--ds-border)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Minus size={14} />
                </button>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-base)", fontWeight: 800, color: "var(--ds-brand)", minWidth: 32, textAlign: "center" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plus size={14} />
                </button>
              </div>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)" }}>{product.conditionnement}</span>
            </div>

            <WaBtn label={`Demander un Devis WhatsApp pour ${qty} sac(s)`} url={msgCmd} full />

          </div>
        </div>
      </section>

      {/* Technical Specs Table */}
      <section style={{ background: "var(--ds-bg-secondary)", padding: "56px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.02em", marginBottom: "var(--ds-space-xl)" }}>
            Fiche des Spécifications Techniques
          </h2>
          <div style={{ background: "white", borderRadius: "var(--ds-radius-xl)", border: "1px solid var(--ds-border)", overflow: "hidden", boxShadow: "var(--ds-shadow-sm)" }}>
            {product.specs.map(({ label, valeur }, i) => (
              <div key={label} className="spec-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", borderBottom: i < product.specs.length - 1 ? "1px solid var(--ds-border)" : "none" }}>
                <div style={{ padding: "14px 16px", background: "var(--ds-bg-secondary)", borderRight: "1px solid var(--ds-border)" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-secondary)" }}>{label}</span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-sm)", color: "var(--ds-text-primary)", fontWeight: 500 }}>{valeur}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits connexes */}
      <section style={{ background: "var(--ds-bg)", padding: "56px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-2xl)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.02em", marginBottom: "var(--ds-space-xl)" }}>
            Matériaux Complémentaires Recommandés
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--ds-space-lg)" }} className="connexes-grid">
            {autres.map(p => (
              <div key={p.id} onClick={() => onDetail(p)} style={{
                display: "flex", gap: "var(--ds-space-lg)", padding: "var(--ds-space-lg)",
                border: "1px solid var(--ds-border)", borderRadius: "var(--ds-radius-xl)",
                cursor: "pointer", background: "white", alignItems: "center",
                transition: "all var(--ds-transition)"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "var(--ds-shadow-md)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <div style={{ width: 72, height: 72, borderRadius: "var(--ds-radius-lg)", overflow: "hidden", flexShrink: 0, background: "var(--ds-bg-secondary)", padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={imgSrc(p.image)} alt={p.nom} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-sm)", fontWeight: 700, color: "var(--ds-text-primary)", margin: "0 0 2px" }}>{p.nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-text-tertiary)", margin: "0 0 6px" }}>{p.drapeau} {p.origine}</p>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-brand)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    Consulter la fiche <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

// ─── Footer Officiel 2026 ────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <footer id="contact" style={{ background: "var(--ds-dark-bg)", color: "white", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "64px 16px 24px",
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: "var(--ds-space-3xl)"
      }} className="footer-grid">
        
        {/* Col 1 Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "var(--ds-radius-sm)",
              background: "var(--ds-brand)", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "white" }}>M</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-base)", fontWeight: 800, color: "white", lineHeight: 1.1 }}>
                {COMPANY_NAME}
              </div>
              <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.58rem", fontWeight: 500, color: "var(--ds-dark-text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {COMPANY_SUBTITLE}
              </div>
            </div>
          </div>

          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", lineHeight: 1.7, maxWidth: 300, margin: 0 }}>
            Importateur direct et grossiste en matériaux de finition et staff au Bénin. Qualité d&apos;origine certifiée (Égypte, Dubaï, Kenya) sans intermédiaire.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "var(--ds-dark-text-muted)" }}>
              <Phone size={13} style={{ color: "var(--ds-conversion)" }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)" }}>{PHONE_DISPLAY}</span>
            </a>
            <a href={waUrl(`Bonjour ${COMPANY_NAME}`)} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "var(--ds-dark-text-muted)" }}>
              <MessageCircle size={13} style={{ color: "var(--ds-conversion)" }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)" }}>WhatsApp Direct : +229 01 97 46 32 09</span>
            </a>
          </div>
        </div>

        {/* Col 2 Produits */}
        <div>
          <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Matériaux
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {PRODUCTS.map(p => (
              <li key={p.id}>
                <a href="#produits" onClick={e => { e.preventDefault(); onNavigate("produits") }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", textDecoration: "none" }}>
                  {p.nomCourt}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 Navigation */}
        <div>
          <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Navigation
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Accueil", id: "accueil" },
              { label: "Nos Matériaux", id: "produits" },
              { label: "Simulateur Chantier", id: "simulateur" },
              { label: "Garanties & Avis", id: "garanties" },
              { label: "FAQ", id: "faq" },
            ].map(({ label, id }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={e => { e.preventDefault(); onNavigate(id) }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", textDecoration: "none" }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 Dépôts */}
        <div>
          <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "var(--ds-text-xs)", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Dépôts &amp; Horaires
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <MapPin size={14} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", lineHeight: 1.5 }}>
                Dépôts Cotonou &amp; Abomey-Calavi, Bénin
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <Clock size={14} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", lineHeight: 1.5 }}>
                Lundi – Samedi<br />07h30 – 18h00
              </span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.15)", borderRadius: "var(--ds-radius-full)", padding: "5px 12px", width: "fit-content" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ds-conversion)", display: "block" }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", fontWeight: 700, color: "var(--ds-conversion)" }}>En Stock Dépôt</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "20px 16px",
        borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex",
        justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center"
      }}>
        <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)", margin: 0 }}>
          © 2026 {COMPANY_NAME} · {COMPANY_SUBTITLE} · Tous droits réservés.
        </p>
        <div style={{ display: "flex", gap: "var(--ds-space-lg)" }}>
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)" }}>
            Qualité Certifiée ISO 9001
          </span>
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "var(--ds-text-xs)", color: "var(--ds-dark-text-muted)" }}>
            Bénin BTP Solutions
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── Responsive Styles ───────────────────────────────────────────────────────
const CSS = `
  .nav-desktop { display: flex; align-items: center; }
  .nav-mobile-toggle { display: none; }
  .hero-grid { grid-template-columns: 1.1fr 0.9fr; }
  .hero-stats-grid { grid-template-columns: repeat(4, 1fr); }
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .garanties-grid { grid-template-columns: repeat(4, 1fr); }
  .simu-grid { grid-template-columns: 1fr 1.25fr; }
  .fiche-grid { grid-template-columns: 1.1fr 1fr; }
  .connexes-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.2fr; }
  .mobile-dock { display: none !important; }
  .spec-row { grid-template-columns: 1fr 1.5fr; }
  .velora-banner-grid { grid-template-columns: 1.15fr 0.85fr; }

  @media (max-width: 1024px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .garanties-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: var(--ds-space-xl) !important; }
    .simu-grid { grid-template-columns: 1fr !important; }
    .velora-banner-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-mobile-toggle { display: flex !important; }
    .mobile-dock { display: flex !important; }
    main { padding-bottom: 84px !important; }
    .hero-grid { grid-template-columns: 1fr !important; padding-top: 24px !important; padding-bottom: 40px !important; gap: 24px !important; }
    .hero-visual { display: flex !important; justify-content: center !important; margin-top: 8px !important; }
    .hero-visual > div { width: 100% !important; max-width: 290px !important; }
    .hero-float-1 { bottom: 8px !important; left: -4px !important; transform: scale(0.88); }
    .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
    .hero-cta-group { flex-direction: column !important; align-items: stretch !important; }
    .hero-cta-group > * { width: 100% !important; justify-content: center !important; }
    .product-grid { grid-template-columns: 1fr !important; }
    .garanties-grid { grid-template-columns: 1fr !important; }
    .fiche-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
    .connexes-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .spec-row { grid-template-columns: 1fr !important; }
    .spec-row > div:first-child { border-right: none !important; border-bottom: 1px solid var(--ds-border) !important; padding: 10px 14px !important; }
    .spec-row > div:last-child { padding: 10px 14px !important; }
    .velora-banner-grid { grid-template-columns: 1fr !important; }
    .velora-banner-left { padding: 32px 20px !important; }
    .velora-banner-right { padding: 28px 20px !important; }
  }

  @media (max-width: 480px) {
    .simu-results-grid { grid-template-columns: 1fr !important; }
    .simu-results-grid > div { border: none !important; border-bottom: 1px solid var(--ds-border) !important; padding-bottom: 8px !important; }
    .simu-results-grid > div:last-child { border-bottom: none !important; }
    .hero-float-1 { display: none !important; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
`

// ─── Main App Entry ──────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<"home" | "product">("home")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleDetail = useCallback((p: Product) => {
    setSelectedProduct(p)
    setView("product")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleBack = useCallback(() => {
    setView("home")
    setSelectedProduct(null)
    setTimeout(() => document.getElementById("produits")?.scrollIntoView({ behavior: "smooth" }), 100)
  }, [])

  const handleNavigate = useCallback((id: string) => {
    if (view === "product") {
      setView("home")
      setSelectedProduct(null)
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }, [view])

  return (
    <>
      <style>{CSS}</style>
      <div style={{ fontFamily: "var(--ds-font-body)", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
        <AnnouncementBar />
        <Navbar onNavigate={handleNavigate} />
        
        {view === "home" ? (
          <main>
            <HeroSection onVoirProduits={() => handleNavigate("produits")} onSimulateur={() => handleNavigate("simulateur")} />
            <ProductsSection onDetail={handleDetail} />
            <SimulateurSection />
            <VeloraCTABanner />
            <ReassuranceSection />
            <FAQSection />
          </main>
        ) : (
          selectedProduct && <FicheProduit product={selectedProduct} onBack={handleBack} onDetail={handleDetail} />
        )}

        <Footer onNavigate={handleNavigate} />

        {/* Mobile Floating Action Dock */}
        <div className="mobile-dock" style={{
          position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 999,
          background: "rgba(15, 15, 28, 0.95)", backdropFilter: "blur(12px)",
          borderRadius: "var(--ds-radius-2xl)", padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ds-conversion)", display: "block" }} />
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>Dépôt Ouvert</span>
          </div>
          <WaBtn label="WhatsApp Direct" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} small />
        </div>

      </div>
    </>
  )
}
