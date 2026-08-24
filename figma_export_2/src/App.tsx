import { useState, useCallback } from "react"
import {
  MessageCircle, Phone, MapPin, Menu, X, ChevronRight,
  ArrowLeft, CheckCircle2, Star, Package,
  Clock, Calculator, ShieldCheck, Truck, Award, ChevronDown,
  Plus, Minus, ArrowRight, HelpCircle, Layers, Sparkles,
  Check, ArrowUpRight, Warehouse, Hammer, Building2
} from "lucide-react"
import imgGypse from "@/imports/photo2.jpeg"
import imgChaux from "@/imports/photo1.jpeg"
import imgFilasse from "@/imports/filace.jpeg"

// ─── Constantes Commerciales & Liens Directs ─────────────────────────────────
const WA_NUMBER = "2290197463209"
const PHONE_DISPLAY = "+229 01 97 46 32 09"
const COMPANY_NAME = "Marco Staff BTP"
const COMPANY_SUBTITLE = "L'Incomparable Service & Fils"

const waUrl = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const waProduitMsg = (produit: string, conditionnement: string) =>
  waUrl(`Bonjour ${COMPANY_NAME}, je souhaite connaître le prix et la disponibilité pour : *${produit}* (${conditionnement}). Merci !`)

interface Product {
  id: string
  nom: string
  nomCourt: string
  categorie: string
  origine: string
  drapeau: string
  badge: string
  conditionnement: string
  image: string | { src: string }
  description: string
  arguments: string[]
  specs: { label: string; valeur: string }[]
}

// ─── Catalogue Produits Réels du Projet ──────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "gypse-40kg",
    nom: "Poudre de Gypse Marco — Extra White 40 KG",
    nomCourt: "Gypse Marco 40kg",
    categorie: "Gypse & Plâtre de Moulage",
    origine: "Égypte",
    drapeau: "🇪🇬",
    badge: "Extra White · Import Égypte",
    conditionnement: "Sac scellé de 40 KG",
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
  },
]

const imgSrc = (img: string | { src: string }) =>
  typeof img === "string" ? img : img.src

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Quels sont les délais de livraison sur les chantiers dans le Grand Cotonou ?",
    a: "Nous assurons la livraison directe sur vos chantiers sous 24h à 48h maximum à Cotonou, Abomey-Calavi, Sèmè-Kpodji, Ouidah et Porto-Novo. Un retrait immédiat est également possible à nos dépôts physiques."
  },
  {
    q: "Le Gypse Marco 40 KG est-il garanti sans craquelures et sans grumeaux ?",
    a: "Oui, à 100%. Grâce à sa granulométrie micronique (< 80 microns) et à son procédé d'import direct d'Égypte, la poudre se gâche de manière fluide sans formation de grumeaux. La prise de 20 à 30 minutes assure une planéité parfaite sans fissuration."
  },
  {
    q: "Proposez-vous des tarifs dégressifs pour les grossistes et gros chantiers ?",
    a: "Absolument. Nous appliquons des remises sur volume dès 20 sacs de Gypse Marco, 5 sacs de Chaux Vive ou 1 balle complète de Filasse Sisal. Contactez notre équipe sur WhatsApp avec votre métré pour obtenir une proposition adaptée."
  },
  {
    q: "Quels sont les atouts de la Chaux Vive de Dubaï par rapport à une chaux locale ?",
    a: "La White Lime Marco importée de Dubaï dispose d'une pureté calcique certifiée CaO > 95%. Elle garantit une haute réactivité thermique, un pouvoir bactéricide et antifongique naturel, protégeant définitivement vos murs contre le salpêtre et l'humidité côtière."
  },
  {
    q: "Comment passer commande ou demander un devis proforma ?",
    a: "Vous pouvez cliquer sur n'importe quel bouton WhatsApp du site ou utiliser le simulateur de chantier intégré. Nos conseillers vous confirment instantanément le stock disponible et les conditions de livraison."
  }
]

// ─── Composant Bouton Moderne ────────────────────────────────────────────────
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
      background: isPrimary ? "var(--ds-brand)" : isSecondary ? "var(--ds-dark-bg)" : "var(--ds-bg-subtle)",
      color: isPrimary || isSecondary ? "white" : "var(--ds-text-primary)",
      border: isPrimary || isSecondary ? "none" : "1px solid var(--ds-border)",
      borderRadius: "var(--ds-radius-full)",
      padding: isSmall ? "8px 16px" : isLarge ? "14px 28px" : "12px 22px",
      fontFamily: "var(--ds-font-body)", fontSize: isSmall ? "0.8rem" : "0.9rem",
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

// ─── Composant Bouton WhatsApp ───────────────────────────────────────────────
function WaBtn({ label = "WhatsApp", url, small = false, full = false }: {
  label?: string; url: string; small?: boolean; full?: boolean
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: small ? 6 : 8, background: "var(--ds-conversion)", color: "white",
      fontFamily: "var(--ds-font-body)", fontSize: small ? "0.8rem" : "0.9rem",
      fontWeight: 600, padding: small ? "9px 18px" : "13px 24px",
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
      <MessageCircle size={small ? 15 : 17} />
      <span>{label}</span>
    </a>
  )
}

// ─── Header & Top Announcement ───────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div style={{ background: "var(--ds-dark-bg)", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="site-container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ds-conversion)", display: "block", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-dark-text-muted)", fontWeight: 500 }}>
            Dépôt Ouvert · Lun–Sam 7h30–18h00 · Cotonou &amp; Abomey-Calavi
          </span>
        </div>
        <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
          <Phone size={12} style={{ color: "var(--ds-conversion)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "white", fontWeight: 600 }}>
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
    { label: "Pourquoi Marco ?", id: "pourquoi" },
    { label: "Simulateur", id: "simulateur" },
    { label: "Comment Commander", id: "commande" },
    { label: "Applications", id: "applications" },
    { label: "FAQ", id: "faq" },
  ]

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.96)", backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--ds-border)"
    }}>
      <div className="site-container" style={{
        height: 70, display: "flex", alignItems: "center", justifyContent: "space-between"
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
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1.15 }}>
              {COMPANY_NAME}
            </div>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", fontWeight: 500, color: "var(--ds-text-tertiary)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {COMPANY_SUBTITLE}
            </div>
          </div>
        </div>

        {/* Nav Desktop */}
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }} className="nav-desktop">
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "0.82rem",
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
          <WaBtn label="Demander un Devis" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mon chantier.`)} small />
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
          padding: "16px 20px 24px",
          display: "flex", flexDirection: "column", gap: 14,
          background: "var(--ds-bg)"
        }}>
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id); setOpen(false) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "0.95rem",
                fontWeight: 600, color: "var(--ds-text-primary)",
                textDecoration: "none", padding: "8px 0",
                borderBottom: "1px solid var(--ds-border)"
              }}
            >{label}</a>
          ))}
          <div style={{ paddingTop: 6 }}>
            <WaBtn label="WhatsApp Express Direct" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis.`)} full />
          </div>
        </div>
      )}
    </header>
  )
}

// ─── 1. Hero Section ─────────────────────────────────────────────────────────
function HeroSection({ onVoirProduits, onSimulateur }: { onVoirProduits: () => void; onSimulateur: () => void }) {
  return (
    <section id="accueil" style={{ background: "var(--ds-bg)", position: "relative", overflow: "hidden" }}>
      <div className="site-container" style={{
        paddingTop: "clamp(36px, 5vw, 64px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
          gap: "clamp(24px, 4vw, 48px)", alignItems: "center", position: "relative",
        }}>

          {/* Left Col */}
          <div style={{ position: "relative", zIndex: 1 }}>
            
            {/* Origin pills */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {[
                { flag: "🇪🇬", label: "Gypse d'Égypte" },
                { flag: "🇦🇪", label: "Chaux de Dubaï" },
                { flag: "🇰🇪", label: "Filasse du Kenya" }
              ].map(({ flag, label }) => (
                <span key={label} style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: "var(--ds-bg-subtle)", border: "1px solid var(--ds-border)",
                  borderRadius: "var(--ds-radius-full)", padding: "5px 12px",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
                  fontWeight: 600, color: "var(--ds-text-primary)",
                }}>{flag} {label}</span>
              ))}
            </div>

            <h1 style={{
              fontFamily: "var(--ds-font-heading)",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1.15,
              letterSpacing: "-0.035em", marginBottom: 18,
            }}>
              Matériaux de Staff &amp; Finition de Premier Choix au Bénin.
            </h1>

            <p style={{
              fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "var(--ds-text-secondary)", lineHeight: 1.7, maxWidth: 520,
              marginBottom: 30,
            }}>
              Grossiste et importateur direct pour les <strong>staffeurs, artisans, professionnels du BTP, entrepreneurs</strong> et particuliers. <strong>Poudre de Gypse Marco 40 KG</strong> (Égypte), <strong>Chaux Vive pure</strong> (Dubaï) et <strong>Filasse Sisal</strong> (Kenya). Stock permanent et livraison rapide sur chantier.
            </p>

            {/* Action CTAs */}
            <div className="hero-cta-group" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 36 }}>
              <WaBtn label="Demander un Devis WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mon chantier.`)} />
              <Button variant="neutral" iconEnd={<Calculator size={15} />} onClick={onSimulateur}>
                Simuler mes besoins
              </Button>
            </div>

            {/* Trust stats row */}
            <div className="hero-stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
              paddingTop: 24, borderTop: "1px solid var(--ds-border)",
            }}>
              {[
                { val: "100%", label: "Pureté & Zéro Fissure" },
                { val: "3", label: "Origines Directes Usine" },
                { val: "24/48h", label: "Livraison sur Chantier" },
                { val: "Stock", label: "Permanent en Dépôt" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", fontWeight: 800, color: "var(--ds-brand)", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col – Visual Hero Studio */}
          <div className="hero-visual" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "relative", zIndex: 2, width: "100%", maxWidth: 320,
              background: "white", borderRadius: "var(--ds-radius-2xl)",
              boxShadow: "0 24px 64px rgba(103,79,245,0.18), 0 8px 24px rgba(0,0,0,0.08)",
              overflow: "hidden", border: "1px solid rgba(103,79,245,0.12)",
            }}>
              <div style={{ height: 260, background: "#1a2744", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={imgSrc(imgGypse)} alt="Poudre de Gypse Marco 40 KG" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 800, color: "var(--ds-text-primary)" }}>Gypse Marco 40 KG</span>
                  <span style={{ background: "var(--ds-brand)", color: "white", fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: "var(--ds-radius-full)" }}>N°1 Staff</span>
                </div>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-text-tertiary)", margin: 0 }}>
                  🇪🇬 Import Égypte · Extra White · Prise 20 min
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="hero-float-1" style={{
              position: "absolute", bottom: 16, left: -8, zIndex: 3,
              background: "white", borderRadius: "var(--ds-radius-lg)",
              padding: "10px 14px", boxShadow: "var(--ds-shadow-md)",
              border: "1px solid var(--ds-border)", display: "flex", alignItems: "center", gap: 10
            }}>
              <ShieldCheck size={18} style={{ color: "var(--ds-conversion)" }} />
              <div>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.78rem", fontWeight: 700, color: "var(--ds-text-primary)" }}>Zéro Craquelure</div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.65rem", color: "var(--ds-text-tertiary)" }}>Garantie séchage net</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 2. Produits Showcase Section ───────────────────────────────────────────
function ProductsSection({ onDetail }: { onDetail: (p: Product) => void }) {
  return (
    <section id="produits" style={{ background: "var(--ds-bg-subtle)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Package size={14} /> Catalogue Officiel Direct Usine
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Nos 3 Matériaux Phares en Stock Permanent
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Chaque sac et balle provient directement des usines partenaires. Zéro intermédiaire, qualité certifiée pour les staffeurs et promoteurs du Bénin.
          </p>
        </div>

        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{
              background: "white", border: "1px solid var(--ds-border)",
              borderRadius: "var(--ds-radius-2xl)", overflow: "hidden", display: "flex", flexDirection: "column",
              boxShadow: "var(--ds-shadow-sm)", transition: "all var(--ds-transition)"
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
                  fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700,
                  padding: "4px 10px", borderRadius: "var(--ds-radius-full)"
                }}>
                  {p.badge}
                </span>
                <span style={{
                  position: "absolute", bottom: 10, right: 12,
                  background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 600,
                  color: "var(--ds-text-primary)", padding: "3px 9px", borderRadius: "var(--ds-radius-full)",
                  boxShadow: "var(--ds-shadow-sm)"
                }}>
                  {p.drapeau} {p.origine}
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: "clamp(18px, 3vw, 24px)", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-brand)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {p.categorie}
                  </span>
                  <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: "4px 0 0", lineHeight: 1.3 }}>
                    {p.nom}
                  </h3>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.arguments.map(arg => (
                    <li key={arg} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <CheckCircle2 size={15} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-text-secondary)", lineHeight: 1.45 }}>
                        {arg}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Conditionnement badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-sm)", width: "fit-content" }}>
                  <Package size={14} style={{ color: "var(--ds-text-tertiary)" }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-text-secondary)", fontWeight: 600 }}>
                    {p.conditionnement}
                  </span>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto", paddingTop: 8 }}>
                  <WaBtn label="Commander / Demander le prix sur WhatsApp" url={waProduitMsg(p.nom, p.conditionnement)} full />
                  <button onClick={() => onDetail(p)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", fontWeight: 700,
                    color: "var(--ds-brand)", background: "var(--ds-brand-light)", border: "none",
                    borderRadius: "var(--ds-radius-full)", padding: "10px 20px", cursor: "pointer",
                    transition: "all var(--ds-transition)",
                  }}>
                    <span>Fiche Technique &amp; Dosage</span>
                    <ArrowRight size={14} />
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

// ─── 3. Pourquoi Marco Staff BTP ? (Section Réassurance Éditoriale) ───────────
function WhyUsSection() {
  const points = [
    {
      icon: Award,
      titre: "Import Direct & Traçabilité",
      desc: "Nous importons directement depuis les usines partenaires en Égypte, aux Émirats et au Kenya, sans aucun intermédiaire spéculatif."
    },
    {
      icon: ShieldCheck,
      titre: "Qualité Contrôlée pour le Staff",
      desc: "Nos poudres sont rigoureusement testées : blancheur pure, prise régulière (20-30 min) et formule garantie zéro fissuration."
    },
    {
      icon: Warehouse,
      titre: "Stock Permanent en Dépôt",
      desc: "Nos entrepôts de Cotonou et Abomey-Calavi sont approvisionnés en continu pour sécuriser les cadences de vos chantiers."
    },
    {
      icon: Truck,
      titre: "Livraison Directe Chantier",
      desc: "Acheminement rapide sous 24h à 48h dans tout le Grand Cotonou, avec possibilité de déchargement direct sur vos zones de travail."
    }
  ]

  return (
    <section id="pourquoi" style={{ background: "var(--ds-bg)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <ShieldCheck size={14} /> Engagement &amp; Fiabilité
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Pourquoi les Professionnels Choisissent Marco Staff ?
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Une organisation logistique et une exigence de qualité conçues pour répondre aux standards des plus grands chantiers du Bénin.
          </p>
        </div>

        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px, 2.5vw, 24px)" }}>
          {points.map(({ icon: Icon, titre, desc }, i) => (
            <div key={titre} style={{
              background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-2xl)",
              border: "1px solid var(--ds-border)", padding: "clamp(20px, 3vw, 28px)",
              display: "flex", flexDirection: "column", gap: 14,
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
              <div style={{
                width: 44, height: 44, borderRadius: "var(--ds-radius-lg)",
                background: "var(--ds-brand-light)", color: "var(--ds-brand)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Icon size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: "0 0 6px" }}>
                  {titre}
                </h3>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
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

// ─── 4. De l'Approvisionnement au Chantier (Logistique BTP Narrative) ────────
function SupplyChainSection() {
  const steps = [
    { num: "01", titre: "Import Direct Usine", desc: "Contrôles stricts de pureté et d'emballage scellé à l'embarquement." },
    { num: "02", titre: "Stockage Protégé", desc: "Entrepôts ventilés garantissant zéro humidité préalable pour le gypse et la chaux." },
    { num: "03", titre: "Préparation Express", desc: "Conditionnement par lots et vérification des sacs avant chaque départ." },
    { num: "04", titre: "Livraison Chantier", desc: "Acheminement rapide à Cotonou et Calavi pour respecter vos délais de pose." }
  ]

  return (
    <section style={{ background: "var(--ds-bg-subtle)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Truck size={14} /> Maîtrise Logistique
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            De l&apos;Approvisionnement Direct à Votre Chantier
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Une chaîne logistique éprouvée garantissant la fraîcheur et la qualité optimale de vos matériaux de finition.
          </p>
        </div>

        <div className="supply-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px, 2.5vw, 24px)" }}>
          {steps.map(({ num, titre, desc }) => (
            <div key={num} style={{
              background: "white", borderRadius: "var(--ds-radius-2xl)",
              border: "1px solid var(--ds-border)", padding: "clamp(20px, 3vw, 26px)",
              position: "relative", display: "flex", flexDirection: "column", gap: 12
            }}>
              <span style={{
                fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem",
                fontWeight: 800, color: "var(--ds-brand)", lineHeight: 1
              }}>
                {num}
              </span>
              <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: 0 }}>
                {titre}
              </h3>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-text-secondary)", lineHeight: 1.55, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── 5. Simulateur Signature de Chantier ─────────────────────────────────────
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
    <section id="simulateur" style={{ background: "var(--ds-bg)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        <div className="simu-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1.25fr",
          gap: "clamp(24px, 4vw, 48px)", alignItems: "center"
        }}>
          
          {/* Left explanation */}
          <div>
            <div style={{
              width: 44, height: 44, borderRadius: "var(--ds-radius-lg)",
              background: "var(--ds-brand-light)", display: "flex", alignItems: "center",
              justifyContent: "center", marginBottom: 16, color: "var(--ds-brand)"
            }}>
              <Calculator size={22} />
            </div>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Fonctionnalité Signature
            </span>
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em", marginTop: 8, marginBottom: 16 }}>
              Calculez vos besoins en matériaux en quelques secondes
            </h2>
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
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
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-text-secondary)", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive Box */}
          <div style={{
            background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-2xl)",
            border: "1px solid var(--ds-border)", padding: "clamp(20px, 3.5vw, 36px)",
            boxShadow: "var(--ds-shadow-md)"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* Étape 1 : Type d'ouvrage */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-text-primary)", textTransform: "uppercase", marginBottom: 10 }}>
                  Étape 1 · Type d&apos;ouvrage :
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button type="button" onClick={() => setTypeOuvrage("plafond")} style={{
                    padding: "10px 14px", borderRadius: "var(--ds-radius-lg)",
                    fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", fontWeight: 700,
                    border: `2px solid ${typeOuvrage === "plafond" ? "var(--ds-brand)" : "var(--ds-border)"}`,
                    background: typeOuvrage === "plafond" ? "var(--ds-brand-light)" : "white",
                    color: typeOuvrage === "plafond" ? "var(--ds-brand)" : "var(--ds-text-secondary)",
                    cursor: "pointer", transition: "all var(--ds-transition)"
                  }}>
                    🏢 Plafonds Staff
                  </button>
                  <button type="button" onClick={() => setTypeOuvrage("corniche")} style={{
                    padding: "10px 14px", borderRadius: "var(--ds-radius-lg)",
                    fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", fontWeight: 700,
                    border: `2px solid ${typeOuvrage === "corniche" ? "var(--ds-brand)" : "var(--ds-border)"}`,
                    background: typeOuvrage === "corniche" ? "var(--ds-brand-light)" : "white",
                    color: typeOuvrage === "corniche" ? "var(--ds-brand)" : "var(--ds-text-secondary)",
                    cursor: "pointer", transition: "all var(--ds-transition)"
                  }}>
                    ✨ Corniches &amp; Moulures
                  </button>
                </div>
              </div>

              {/* Étape 2 : Surface */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                  <label style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-text-primary)", textTransform: "uppercase" }}>
                    Étape 2 · Surface du chantier :
                  </label>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "var(--ds-brand)" }}>
                    {surface} m²
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={() => setSurface(s => Math.max(10, s - 10))} aria-label="Moins 10m²"
                    style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--ds-border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)" }}>
                    <Minus size={15} />
                  </button>
                  <input type="range" min={10} max={500} step={5} value={surface}
                    onChange={e => setSurface(Number(e.target.value))}
                    style={{ flex: 1, accentColor: "var(--ds-brand)", height: 6, cursor: "pointer" }}
                  />
                  <button onClick={() => setSurface(s => Math.min(500, s + 10))} aria-label="Plus 10m²"
                    style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--ds-border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)" }}>
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Étape 3 : Résultat */}
              <div className="simu-results-grid" style={{
                background: "white", borderRadius: "var(--ds-radius-xl)",
                border: "1px solid var(--ds-border)", padding: "16px",
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center"
              }}>
                <div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Gypse Marco</div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "var(--ds-brand)", margin: "4px 0" }}>{nbSacsGypse}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-secondary)" }}>sacs (40kg)</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--ds-border)", borderRight: "1px solid var(--ds-border)" }}>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Filasse Sisal</div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "var(--ds-conversion)", margin: "4px 0" }}>{kgFilasse}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-secondary)" }}>kg (Kenya)</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Chaux Vive</div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: "4px 0" }}>{nbSacsChaux}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-secondary)" }}>sacs (Dubaï)</div>
                </div>
              </div>

              <WaBtn label="Recevoir mon estimation sur WhatsApp" url={msgSimu} full />

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 6. Comment Commander ? (Processus en 4 Étapes) ──────────────────────────
function HowToOrderSection() {
  const steps = [
    { num: "01", titre: "Choisissez vos matériaux", desc: "Consultez notre catalogue de 3 matériaux phares ou estimez votre besoin sur le simulateur." },
    { num: "02", titre: "Demandez votre prix", desc: "Cliquez sur WhatsApp pour recevoir instantanément notre tarif dégressif selon vos quantités." },
    { num: "03", titre: "Confirmez votre commande", desc: "Validation de la proforma, du mode de paiement et du créneau de livraison souhaité." },
    { num: "04", titre: "Retrait ou Livraison", desc: "Chargement rapide à nos dépôts de Cotonou/Calavi ou acheminement direct sur votre chantier." }
  ]

  return (
    <section id="commande" style={{ background: "var(--ds-bg-subtle)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Clock size={14} /> Parcours Simple &amp; Rapide
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Comment Commander vos Matériaux ?
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Un processus d&apos;achat fluide et sans friction pensé pour les rythmes des chantiers.
          </p>
        </div>

        <div className="order-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px, 2.5vw, 24px)" }}>
          {steps.map(({ num, titre, desc }) => (
            <div key={num} style={{
              background: "white", borderRadius: "var(--ds-radius-2xl)",
              border: "1px solid var(--ds-border)", padding: "clamp(20px, 3vw, 26px)",
              display: "flex", flexDirection: "column", gap: 12
            }}>
              <span style={{
                fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem",
                fontWeight: 800, color: "var(--ds-conversion)", lineHeight: 1
              }}>
                {num}
              </span>
              <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: 0 }}>
                {titre}
              </h3>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-text-secondary)", lineHeight: 1.55, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── 7. Applications & Réalisations ──────────────────────────────────────────
function ApplicationsSection() {
  const apps = [
    {
      titre: "Plafonds Suspendus & Staff Lissé",
      produit: "Poudre de Gypse Marco 40 KG",
      desc: "Blancheur immaculée et planéité sans défaut pour les salons, halls et villas haut de gamme. Prêt à peindre sans reprise.",
      icon: Building2
    },
    {
      titre: "Corniches, Moulures & Gorges Lumineuses",
      produit: "Gypse Marco + Filasse Sisal Kenya",
      desc: "Armature végétale longue assurant une haute résistance mécanique et la finesse des arêtes architecturales.",
      icon: Layers
    },
    {
      titre: "Enduits Protecteurs & Chaulage Assainissant",
      produit: "Chaux Vive Dubaï (White Lime)",
      desc: "Assainissement naturel anti-salpêtre et perméabilité à la vapeur, idéal contre le climat humide côtier.",
      icon: Sparkles
    }
  ]

  return (
    <section id="applications" style={{ background: "var(--ds-bg)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Hammer size={14} /> Usages Chantiers
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Des Matériaux Pensés pour Vos Réalisations
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Du faux-plafond suspendu aux corniches complexes, des solutions adaptées à chaque étape de votre finition.
          </p>
        </div>

        <div className="apps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {apps.map(({ titre, produit, desc, icon: Icon }) => (
            <div key={titre} style={{
              background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-2xl)",
              border: "1px solid var(--ds-border)", padding: "clamp(24px, 3.5vw, 32px)",
              display: "flex", flexDirection: "column", gap: 14
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "var(--ds-radius-lg)",
                background: "white", color: "var(--ds-brand)", border: "1px solid var(--ds-border)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Icon size={22} />
              </div>
              <div>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-brand)", fontWeight: 700, textTransform: "uppercase" }}>
                  {produit}
                </span>
                <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.05rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: "4px 0 8px" }}>
                  {titre}
                </h3>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: 0 }}>
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

// ─── 8. Témoignages & Garanties ──────────────────────────────────────────────
const TEMOIGNAGES = [
  { initials: "KB", color: "#674FF5", nom: "Kouassi Bernard", role: "Maître Staffeur", ville: "Cotonou", note: 5, texte: "Le gypse Marco est sans équivalent au Bénin. La pâte est fluide, prend sans chauffer excessivement et ne fait aucune fissure. Mes chantiers sont validés du premier coup." },
  { initials: "AM", color: "#10B981", nom: "Adéola Moussa", role: "Conducteur de Travaux BTP", ville: "Abomey-Calavi", note: 5, texte: "La réactivité sur WhatsApp est top. En envoyant la surface, on a le devis et la livraison sur chantier à Calavi arrive dans les temps. La filasse du Kenya est très propre." },
  { initials: "FD", color: "#F59E0B", nom: "Fatou Diallo", role: "Architecte d'Intérieur", ville: "Cotonou", note: 5, texte: "Pour les faux-plafonds à gorges lumineuses de mes clients, j'exige le Gypse Marco et la Chaux Vive de Dubaï. La blancheur est parfaite, prête pour la peinture." },
]

function ReassuranceSection() {
  return (
    <section id="garanties" style={{ background: "var(--ds-bg-subtle)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 48px)" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Retours d&apos;Expérience
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", marginBottom: 8 }}>
            Approuvé par les Maîtres Staffeurs &amp; Artisans
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)" }}>
            Découvrez pourquoi les professionnels du bâtiment choisissent Marco Staff
          </p>
        </div>

        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {TEMOIGNAGES.map(({ initials, color, nom, role, ville, note, texte }) => (
            <div key={nom} style={{
              background: "white", border: "1px solid var(--ds-border)", borderRadius: "var(--ds-radius-2xl)",
              padding: "clamp(20px, 3vw, 28px)", display: "flex", flexDirection: "column", gap: 16,
              boxShadow: "var(--ds-shadow-sm)"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontWeight: 800 }}>
                  {initials}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "var(--ds-text-primary)", margin: 0 }}>{nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-text-tertiary)", margin: "2px 0 4px" }}>{role} · {ville}</p>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(note)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" stroke="#F59E0B" />)}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "var(--ds-text-secondary)", lineHeight: 1.65, margin: 0, fontStyle: "italic", borderLeft: `3px solid ${color}`, paddingLeft: 12 }}>
                &ldquo;{texte}&rdquo;
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── 9. FAQ Accordion Section ────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" style={{ background: "var(--ds-bg)", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container" style={{ maxWidth: 880 }}>
        
        <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 40px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.1em", marginBottom: 10,
            background: "var(--ds-brand-light)", padding: "5px 12px", borderRadius: "var(--ds-radius-full)"
          }}>
            <HelpCircle size={14} /> Questions Fréquentes
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", margin: "6px 0 10px" }}>
            Tout ce que vous devez savoir avant de commander
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)" }}>
            Réponses claires sur nos matériaux, nos délais de livraison et nos conditions tarifaires
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} style={{
                background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-xl)",
                border: `1.5px solid ${isOpen ? "var(--ds-brand)" : "var(--ds-border)"}`,
                overflow: "hidden", transition: "all var(--ds-transition)"
              }}>
                <button onClick={() => toggle(i)} style={{
                  width: "100%", padding: "18px 20px", display: "flex",
                  alignItems: "center", justifyContent: "space-between", gap: 16,
                  background: "none", border: "none", cursor: "pointer", textAlign: "left"
                }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "var(--ds-text-primary)", lineHeight: 1.35 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: isOpen ? "var(--ds-brand-light)" : "white",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    color: isOpen ? "var(--ds-brand)" : "var(--ds-text-tertiary)",
                    transition: "transform var(--ds-transition)"
                  }}>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 20px 18px", borderTop: "1px solid var(--ds-border)", paddingTop: 14 }}>
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "var(--ds-text-secondary)", lineHeight: 1.7, margin: 0 }}>
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

// ─── 10. CTA Final "Piece Join" (Conclusion Commerciale Sublimée) ─────────────
function PieceJoinSection({ onSimulateur }: { onSimulateur: () => void }) {
  return (
    <section style={{
      background: "var(--ds-bg-subtle)",
      padding: "clamp(48px, 6vw, 80px) 0",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Background Glowing Organic Spheres */}
      <div style={{
        position: "absolute", top: "50%", left: "10%", width: 360, height: 360,
        borderRadius: "50%", background: "rgba(103, 79, 245, 0.28)",
        filter: "blur(90px)", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", top: "50%", right: "8%", width: 300, height: 300,
        borderRadius: "50%", background: "rgba(124, 58, 237, 0.22)",
        filter: "blur(80px)", transform: "translate(0, -50%)", pointerEvents: "none", zIndex: 0
      }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Main Card */}
        <div className="piece-join-card" style={{
          borderRadius: "clamp(20px, 3vw, 32px)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          boxShadow: "0 20px 60px rgba(103,79,245,0.18), 0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
        }}>
          
          {/* Left Block: Deep Violet Gradient */}
          <div className="piece-join-left" style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #674FF5 50%, #5B21B6 100%)",
            padding: "clamp(36px, 5vw, 54px) clamp(24px, 4vw, 44px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            color: "white"
          }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--ds-font-body)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 14,
              background: "rgba(255,255,255,0.15)",
              padding: "4px 12px",
              borderRadius: "var(--ds-radius-full)",
              width: "fit-content"
            }}>
              Partenaire BTP &amp; Finition
            </span>
            <h2 style={{
              fontFamily: "var(--ds-font-heading)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: "-0.035em",
              margin: 0,
              color: "white"
            }}>
              Votre Prochain Chantier Commence Ici.
            </h2>
          </div>

          {/* Right Block: Clean White / Glass */}
          <div className="piece-join-right" style={{
            background: "rgba(255, 255, 255, 0.95)",
            padding: "clamp(32px, 4.5vw, 48px) clamp(24px, 3.5vw, 40px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16
          }}>
            <div>
              <h3 style={{
                fontFamily: "var(--ds-font-heading)",
                fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.25,
                margin: "0 0 8px"
              }}>
                Besoin d&apos;un matériau, d&apos;un prix ou d&apos;une estimation ?
              </h3>
              <p style={{
                fontFamily: "var(--ds-font-body)",
                fontSize: "0.85rem",
                color: "#475569",
                lineHeight: 1.55,
                margin: 0
              }}>
                Notre équipe commerciale vous répond directement sur WhatsApp avec stock disponible et conditions de livraison.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
              <WaBtn label="Demander un devis sur WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes matériaux de staff.`)} full />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#94A3B8" }}>
                  ⚡ Réponse sous 15 à 30 min
                </span>
                <button onClick={onSimulateur} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
                  color: "var(--ds-brand)", fontWeight: 700, padding: 0
                }}>
                  Calculer mes besoins ➔
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

// ─── 11. Fiche Produit Détaillée ─────────────────────────────────────────────
function FicheProduit({ product, onBack, onDetail }: { product: Product; onBack: () => void; onDetail: (p: Product) => void }) {
  const [qty, setQty] = useState(5)
  const autres = PRODUCTS.filter(p => p.id !== product.id)
  const msgCmd = waUrl(`Bonjour ${COMPANY_NAME}, je souhaite commander ${qty} sac(s) de *${product.nom}* (${product.conditionnement}). Pouvez-vous me confirmer le tarif et les modalités de livraison ? Merci !`)

  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-bg)" }}>
      
      {/* Breadcrumb */}
      <div style={{ background: "var(--ds-bg-subtle)", borderBottom: "1px solid var(--ds-border)", padding: "12px 0" }}>
        <div className="site-container" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-brand)", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 700 }}>
            <ArrowLeft size={14} /> Retour au catalogue
          </button>
          <ChevronRight size={12} style={{ color: "var(--ds-text-tertiary)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-text-secondary)", fontWeight: 600 }}>{product.nomCourt}</span>
        </div>
      </div>

      {/* Main product view */}
      <section style={{ padding: "clamp(36px, 5vw, 64px) 0" }}>
        <div className="site-container">
          <div className="fiche-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(24px, 4vw, 48px)", alignItems: "flex-start" }}>
            
            {/* Image studio frame */}
            <div style={{
              borderRadius: "var(--ds-radius-2xl)", overflow: "hidden",
              background: "#f5f6fa", padding: 32, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "var(--ds-shadow-md)", border: "1px solid var(--ds-border)"
            }}>
              <img src={imgSrc(product.image)} alt={product.nom} style={{ maxHeight: 380, maxWidth: "100%", objectFit: "contain" }} />
            </div>

            {/* Details column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: "var(--ds-brand)", color: "white", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "var(--ds-radius-full)" }}>
                  {product.badge}
                </span>
                <span style={{ background: "var(--ds-bg-subtle)", border: "1px solid var(--ds-border)", color: "var(--ds-text-primary)", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: "var(--ds-radius-full)" }}>
                  {product.drapeau} {product.origine}
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-brand)", fontWeight: 700, textTransform: "uppercase" }}>{product.categorie}</span>
                <h1 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.7rem, 3.5vw, 2.3rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "6px 0 0" }}>
                  {product.nom}
                </h1>
              </div>

              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.9rem", color: "var(--ds-text-secondary)", lineHeight: 1.75, margin: 0 }}>
                {product.description}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {product.arguments.map(arg => (
                  <li key={arg} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "var(--ds-text-secondary)", lineHeight: 1.45 }}>{arg}</span>
                  </li>
                ))}
              </ul>

              {/* Quantity Selector */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-xl)" }}>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", fontWeight: 700, color: "var(--ds-text-primary)" }}>Quantité :</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", borderRadius: "var(--ds-radius-full)", padding: "4px 8px", border: "1px solid var(--ds-border)" }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "var(--ds-brand)", minWidth: 32, textAlign: "center" }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={14} />
                  </button>
                </div>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-text-tertiary)" }}>{product.conditionnement}</span>
              </div>

              <WaBtn label={`Demander un Devis WhatsApp pour ${qty} sac(s)`} url={msgCmd} full />

            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Table */}
      <section style={{ background: "var(--ds-bg-subtle)", padding: "clamp(36px, 5vw, 64px) 0" }}>
        <div className="site-container">
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Fiche des Spécifications Techniques
          </h2>
          <div style={{ background: "white", borderRadius: "var(--ds-radius-xl)", border: "1px solid var(--ds-border)", overflow: "hidden", boxShadow: "var(--ds-shadow-sm)" }}>
            {product.specs.map(({ label, valeur }, i) => (
              <div key={label} className="spec-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", borderBottom: i < product.specs.length - 1 ? "1px solid var(--ds-border)" : "none" }}>
                <div style={{ padding: "14px 20px", background: "var(--ds-bg-subtle)", borderRight: "1px solid var(--ds-border)" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", fontWeight: 700, color: "var(--ds-text-secondary)" }}>{label}</span>
                </div>
                <div style={{ padding: "14px 20px" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "var(--ds-text-primary)", fontWeight: 500 }}>{valeur}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits connexes */}
      <section style={{ background: "var(--ds-bg)", padding: "clamp(36px, 5vw, 64px) 0" }}>
        <div className="site-container">
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Matériaux Complémentaires Recommandés
          </h2>
          <div className="connexes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {autres.map(p => (
              <div key={p.id} onClick={() => onDetail(p)} style={{
                display: "flex", gap: 16, padding: 18,
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
                <div style={{ width: 72, height: 72, borderRadius: "var(--ds-radius-lg)", overflow: "hidden", flexShrink: 0, background: "var(--ds-bg-subtle)", padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={imgSrc(p.image)} alt={p.nom} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "var(--ds-text-primary)", margin: "0 0 2px" }}>{p.nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-text-tertiary)", margin: "0 0 6px" }}>{p.drapeau} {p.origine}</p>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-brand)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
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

// ─── 12. Footer Officiel 2026 ────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <footer id="contact" style={{ background: "var(--ds-dark-bg)", color: "white", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="site-container" style={{ padding: "64px 0 24px" }}>
        
        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: "clamp(24px, 4vw, 48px)",
          marginBottom: 48
        }}>
          
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
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "white", lineHeight: 1.1 }}>
                  {COMPANY_NAME}
                </div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.6rem", fontWeight: 500, color: "var(--ds-dark-text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {COMPANY_SUBTITLE}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-dark-text-muted)", lineHeight: 1.7, maxWidth: 300, margin: 0 }}>
              Importateur direct et grossiste en matériaux de finition et staff au Bénin. Qualité d&apos;origine certifiée (Égypte, Dubaï, Kenya) sans intermédiaire.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "var(--ds-dark-text-muted)" }}>
                <Phone size={14} style={{ color: "var(--ds-conversion)" }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem" }}>{PHONE_DISPLAY}</span>
              </a>
              <a href={waUrl(`Bonjour ${COMPANY_NAME}`)} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "var(--ds-dark-text-muted)" }}>
                <MessageCircle size={14} style={{ color: "var(--ds-conversion)" }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem" }}>WhatsApp Direct : +229 01 97 46 32 09</span>
              </a>
            </div>
          </div>

          {/* Col 2 Produits */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Matériaux
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {PRODUCTS.map(p => (
                <li key={p.id}>
                  <a href="#produits" onClick={e => { e.preventDefault(); onNavigate("produits") }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-dark-text-muted)", textDecoration: "none" }}>
                    {p.nomCourt}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 Navigation */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Accueil", id: "accueil" },
                { label: "Nos Matériaux", id: "produits" },
                { label: "Pourquoi Marco ?", id: "pourquoi" },
                { label: "Simulateur Chantier", id: "simulateur" },
                { label: "Comment Commander", id: "commande" },
                { label: "Applications", id: "applications" },
                { label: "Garanties & Avis", id: "garanties" },
                { label: "FAQ", id: "faq" },
              ].map(({ label, id }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={e => { e.preventDefault(); onNavigate(id) }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-dark-text-muted)", textDecoration: "none" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 Dépôts */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Dépôts &amp; Horaires
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <MapPin size={14} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-dark-text-muted)", lineHeight: 1.5 }}>
                  Dépôts Cotonou &amp; Abomey-Calavi, Bénin
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Clock size={14} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-dark-text-muted)", lineHeight: 1.5 }}>
                  Lundi – Samedi<br />07h30 – 18h00
                </span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.15)", borderRadius: "var(--ds-radius-full)", padding: "5px 12px", width: "fit-content" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ds-conversion)", display: "block" }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "var(--ds-conversion)" }}>En Stock Dépôt</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div style={{
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center"
        }}>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-dark-text-muted)", margin: 0 }}>
            © 2026 {COMPANY_NAME} · {COMPANY_SUBTITLE} · Tous droits réservés.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-dark-text-muted)" }}>
              Qualité Certifiée ISO 9001
            </span>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "var(--ds-dark-text-muted)" }}>
              Bénin BTP Solutions
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

// ─── Responsive Styles Sheet ─────────────────────────────────────────────────
const CSS = `
  /* Container Standard Fluide */
  .site-container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: clamp(16px, 4vw, 32px);
    padding-right: clamp(16px, 4vw, 32px);
  }

  .nav-desktop { display: flex; align-items: center; }
  .nav-mobile-toggle { display: none; }
  .mobile-dock { display: none !important; }

  /* Desktop Grid Defaults */
  .hero-grid { grid-template-columns: 1.1fr 0.9fr; }
  .hero-stats-grid { grid-template-columns: repeat(4, 1fr); }
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .why-grid { grid-template-columns: repeat(4, 1fr); }
  .supply-grid { grid-template-columns: repeat(4, 1fr); }
  .order-grid { grid-template-columns: repeat(4, 1fr); }
  .apps-grid { grid-template-columns: repeat(3, 1fr); }
  .simu-grid { grid-template-columns: 1fr 1.25fr; }
  .fiche-grid { grid-template-columns: 1.1fr 1fr; }
  .connexes-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.2fr; }
  .spec-row { grid-template-columns: 1fr 1.5fr; }
  .piece-join-card { grid-template-columns: 1.15fr 0.85fr; }

  /* Tablette (1024px et inférieur) */
  @media (max-width: 1024px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .supply-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .order-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .apps-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .simu-grid { grid-template-columns: 1fr !important; }
    .piece-join-card { grid-template-columns: 1fr !important; }
  }

  /* Mobile Standard & Tablette Portrait (768px et inférieur) */
  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-mobile-toggle { display: flex !important; }
    .mobile-dock { display: flex !important; }
    main { padding-bottom: 92px !important; }

    .hero-grid {
      grid-template-columns: 1fr !important;
      text-align: left;
    }
    .hero-visual {
      display: flex !important;
      justify-content: center !important;
      margin-top: 12px !important;
    }
    .hero-visual > div {
      width: 100% !important;
      max-width: 290px !important;
    }
    .hero-float-1 {
      bottom: 8px !important;
      left: -4px !important;
      transform: scale(0.88);
    }
    .hero-stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px !important;
    }
    .hero-cta-group {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .hero-cta-group > * {
      width: 100% !important;
      justify-content: center !important;
    }

    .product-grid { grid-template-columns: 1fr !important; }
    .why-grid { grid-template-columns: 1fr !important; }
    .supply-grid { grid-template-columns: 1fr !important; }
    .order-grid { grid-template-columns: 1fr !important; }
    .apps-grid { grid-template-columns: 1fr !important; }
    .fiche-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
    .connexes-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }

    .spec-row { grid-template-columns: 1fr !important; }
    .spec-row > div:first-child {
      border-right: none !important;
      border-bottom: 1px solid var(--ds-border) !important;
      padding: 10px 16px !important;
    }
    .spec-row > div:last-child {
      padding: 10px 16px !important;
    }

    .piece-join-card { grid-template-columns: 1fr !important; }
    .piece-join-left { padding: 32px 20px !important; }
    .piece-join-right { padding: 28px 20px !important; }
  }

  /* Petit Mobile (480px et inférieur) */
  @media (max-width: 480px) {
    .simu-results-grid { grid-template-columns: 1fr !important; }
    .simu-results-grid > div {
      border: none !important;
      border-bottom: 1px solid var(--ds-border) !important;
      padding-bottom: 10px !important;
    }
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
            <WhyUsSection />
            <SupplyChainSection />
            <SimulateurSection />
            <HowToOrderSection />
            <ApplicationsSection />
            <PieceJoinSection onSimulateur={() => handleNavigate("simulateur")} />
            <ReassuranceSection />
            <FAQSection />
          </main>
        ) : (
          selectedProduct && <FicheProduit product={selectedProduct} onBack={handleBack} onDetail={handleDetail} />
        )}

        <Footer onNavigate={handleNavigate} />

        {/* Mobile Floating Action Dock (Thumb Conversion Zone) */}
        <div className="mobile-dock" style={{
          position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 999,
          background: "rgba(10, 15, 29, 0.95)", backdropFilter: "blur(14px)",
          borderRadius: "var(--ds-radius-2xl)", padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          boxShadow: "0 12px 36px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ds-conversion)", display: "block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>Dépôt Ouvert</span>
          </div>
          <WaBtn label="WhatsApp Direct" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} small />
        </div>

      </div>
    </>
  )
}
