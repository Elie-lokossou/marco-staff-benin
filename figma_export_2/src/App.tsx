import { useState, useCallback, useEffect, useRef } from "react"
import {
  MessageCircle, Phone, MapPin, Menu, X, ChevronRight,
  ArrowLeft, CheckCircle2, Star, Package,
  Clock, Calculator, ShieldCheck, Truck, Award, ChevronDown,
  Plus, Minus, ArrowRight, HelpCircle, Layers, Sparkles,
  ArrowUp, Building2, Warehouse, Hammer, Check, Info, FileText,
  Sliders, Scale, CheckCheck, ArrowDownRight, Compass
} from "lucide-react"
import imgGypse from "@/imports/photo2.jpeg"
import imgChaux from "@/imports/photo1.jpeg"
import imgFilasse from "@/imports/filace.jpeg"

// ─── Constantes Commerciales & Liens Directs ─────────────────────────────────
const WA_NUMBER = "2290197463209"
const PHONE_DISPLAY = "+229 01 97 46 32 09"
const COMPANY_NAME = "MARCO STAFF BTP"
const COMPANY_SUBTITLE = "L'Incomparable Service & Fils"

const waUrl = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const waProduitMsg = (produit: string, conditionnement: string) =>
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
  image: string | { src: string }
  description: string
  highlights: string[]
  arguments: string[]
  specs: { label: string; valeur: string }[]
  dosage: string
  application: string
}

// ─── Catalogue Produits Réels (Écosystème BTP Officiel) ──────────────────────
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
    highlights: [
      "Blancheur éclatante 100% sans jaunissement",
      "Prise progressive régulière (20 – 30 min)"
    ],
    arguments: [
      "Blancheur éclatante 100% sans aucun jaunissement dans le temps",
      "Finesse micronique supérieure : gâchage fluide et sans grumeaux",
      "Prise régulière (20 – 30 min) : idéal pour faux-plafonds et moulures",
      "Zéro retrait et zéro fissuration après séchage complet"
    ],
    dosage: "0,60 L d'eau par kg de poudre (Gâchage souple et onctueux)",
    application: "Faux-plafonds suspendus, plaques lissées, corniches moulées et rosaces.",
    specs: [
      { label: "Origine", valeur: "Import direct Égypte (Usine certifiée)" },
      { label: "Conditionnement", valeur: "Sac scellé de 40 KG (80 lbs)" },
      { label: "Temps de prise", valeur: "20 à 30 minutes (régulier)" },
      { label: "Dosage d'eau indicatif", valeur: "0,60 L par kg de poudre" },
      { label: "Finesse / Tamisage", valeur: "< 80 microns (finesse supérieure)" },
      { label: "Indice de blancheur", valeur: "Extra White 100%" },
      { label: "Rendement indicatif", valeur: "~10 à 12 m² par sac selon épaisseur" }
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
    highlights: [
      "Pureté calcique CaO > 95% pour réactivité thermique maximale",
      "Action antifongique et anti-salpêtre naturelle pour climat côtier"
    ],
    arguments: [
      "Pureté calcique CaO > 95% pour une réactivité thermique maximale",
      "Pouvoir assainissant, bactéricide et anti-moisissure naturel",
      "Excellente perméabilité à la vapeur : protège contre l'humidité",
      "Forte adhérence sur tous supports maçonnés et ouvrages staff"
    ],
    dosage: "Extinction progressive avec 2 à 3 volumes d'eau par volume de chaux",
    application: "Enduits traditionnels, chaulage assainissant, protection anti-salpêtre.",
    specs: [
      { label: "Origine", valeur: "Import direct Dubaï, UAE (Oki General Trading)" },
      { label: "Conditionnement", valeur: "Sac étanche protecteur de 40 KG" },
      { label: "Teneur en CaO (Pureté)", valeur: "> 95% pureté garantie" },
      { label: "Réactivité (T60)", valeur: "< 2 minutes (haute réactivité)" },
      { label: "Propriétés", valeur: "Fongicide, assainissant et respirant" },
      { label: "Rendement indicatif", valeur: "~8 à 10 m² par sac en enduit de finition" }
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
    highlights: [
      "Fibres végétales 100% naturelles sélectionnées (Agave Sisalana)",
      "Résistance extrême à la traction (> 300 MPa) contre les fissures"
    ],
    arguments: [
      "Fibres végétales 100% naturelles sélectionnées (Agave Sisalana)",
      "Fibres longues peignées (60 à 120 cm) sans déchets ni poussière",
      "Imprégnation plâtre instantanée pour un bloc structurel indéformable",
      "Résistance extrême à la traction (> 300 MPa) contre les secousses"
    ],
    dosage: "Trempage direct dans la barbotine de gypse avant incorporation",
    application: "Armature de corniches lourdes, retombées de plafonds, rosaces et plaques.",
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

// ─── FAQ Thématique & Accessible ─────────────────────────────────────────────
const FAQS = [
  {
    cat: "logistique",
    q: "Quels sont les délais de livraison sur les chantiers dans le Grand Cotonou ?",
    a: "Nous assurons la livraison directe sur vos chantiers sous 24h à 48h maximum à Cotonou, Abomey-Calavi, Sèmè-Kpodji, Ouidah et Porto-Novo. Un retrait immédiat est également possible à nos dépôts physiques."
  },
  {
    cat: "qualite",
    q: "Le Gypse Marco 40 KG est-il garanti sans craquelures et sans grumeaux ?",
    a: "Oui, à 100%. Grâce à sa granulométrie micronique (< 80 microns) et à son procédé d'import direct d'Égypte, la poudre se gâche de manière fluide sans formation de grumeaux. La prise de 20 à 30 minutes assure une planéité parfaite sans fissuration."
  },
  {
    cat: "tarifs",
    q: "Proposez-vous des tarifs dégressifs pour les grossistes et gros chantiers ?",
    a: "Absolument. Nous appliquons des remises sur volume dès 20 sacs de Gypse Marco, 5 sacs de Chaux Vive ou 1 balle complète de Filasse Sisal. Contactez notre équipe sur WhatsApp avec votre métré pour obtenir une proposition adaptée."
  },
  {
    cat: "qualite",
    q: "Quels sont les atouts de la Chaux Vive de Dubaï par rapport à une chaux locale ?",
    a: "La White Lime Marco importée de Dubaï dispose d'une pureté calcique certifiée CaO > 95%. Elle garantit une haute réactivité thermique, un pouvoir bactéricide et antifongique naturel, protégeant définitivement vos murs contre le salpêtre et l'humidité côtière."
  },
  {
    cat: "tarifs",
    q: "Comment passer commande ou demander un devis proforma ?",
    a: "Vous pouvez cliquer sur n'importe quel bouton WhatsApp du site ou utiliser le simulateur de chantier intégré. Nos conseillers vous confirment instantanément le stock disponible et les conditions de livraison."
  },
  {
    cat: "logistique",
    q: "Livrez-vous en dehors du Grand Cotonou ?",
    a: "Oui, nous organisons des expéditions de commandes groupées vers Parakou, Bohicon, Natitingou et toutes les localités du Bénin via notre réseau de transporteurs partenaires agréés."
  }
]

// ─── Composants Communs UI ───────────────────────────────────────────────────
function WaBtn({ label = "WhatsApp", url, small = false, full = false, variant = "emerald" }: {
  label?: string; url: string; small?: boolean; full?: boolean; variant?: "emerald" | "white" | "outline"
}) {
  const isWhite = variant === "white"
  const isOutline = variant === "outline"

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: small ? 6 : 8,
      background: isWhite ? "#FFFFFF" : isOutline ? "transparent" : "#10B981",
      color: isWhite ? "#0F172A" : isOutline ? "#FFFFFF" : "#FFFFFF",
      border: isOutline ? "1.5px solid rgba(255,255,255,0.4)" : "none",
      fontFamily: "var(--ds-font-body)", fontSize: small ? "0.82rem" : "0.9rem",
      fontWeight: 600, padding: small ? "9px 18px" : "13px 24px",
      borderRadius: "9999px", textDecoration: "none",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: isWhite ? "0 4px 20px rgba(0,0,0,0.15)" : isOutline ? "none" : "0 4px 14px rgba(16, 185, 129, 0.35)",
      width: full ? "100%" : undefined,
      whiteSpace: "nowrap",
    }}
      onMouseEnter={e => {
        if (isWhite) {
          e.currentTarget.style.background = "#F1F5F9"
        } else if (isOutline) {
          e.currentTarget.style.borderColor = "#FFFFFF"
          e.currentTarget.style.background = "rgba(255,255,255,0.1)"
        } else {
          e.currentTarget.style.background = "#059669"
        }
        e.currentTarget.style.transform = "translateY(-1px)"
      }}
      onMouseLeave={e => {
        if (isWhite) {
          e.currentTarget.style.background = "#FFFFFF"
        } else if (isOutline) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"
          e.currentTarget.style.background = "transparent"
        } else {
          e.currentTarget.style.background = "#10B981"
        }
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      <MessageCircle size={small ? 16 : 18} />
      <span>{label}</span>
    </a>
  )
}

function Button({ children, variant = "primary", size = "medium", iconEnd, onClick, full = false, style = {} }: {
  children?: React.ReactNode; variant?: "primary" | "neutral" | "dark"; size?: "small" | "medium" | "large";
  iconEnd?: React.ReactNode; onClick?: () => void; full?: boolean; style?: React.CSSProperties;
}) {
  const isPrimary = variant === "primary"
  const isDark = variant === "dark"
  const isSmall = size === "small"
  const isLarge = size === "large"

  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: isPrimary ? "#674FF5" : isDark ? "#0A0F1D" : "#F1F5F9",
      color: isPrimary || isDark ? "white" : "#0F172A",
      border: isPrimary || isDark ? "none" : "1px solid #E2E8F0",
      borderRadius: "9999px",
      padding: isSmall ? "8px 16px" : isLarge ? "14px 28px" : "12px 22px",
      fontFamily: "var(--ds-font-body)", fontSize: isSmall ? "0.8rem" : "0.9rem",
      fontWeight: 600, cursor: "pointer", width: full ? "100%" : undefined,
      boxShadow: isPrimary ? "0 4px 16px rgba(103,79,245,0.35)" : "none",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      ...style
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-1px)"
        if (isPrimary) e.currentTarget.style.background = "#5438E8"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)"
        if (isPrimary) e.currentTarget.style.background = "#674FF5"
      }}
    >
      {children}
      {iconEnd}
    </button>
  )
}

// ─── Header & Smart Sticky Navbar (Compacité Mobile & Desktop) ────────────────
function AnnouncementBar() {
  return (
    <div style={{ background: "#0A0F1D", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="site-container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", flexShrink: 0, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#94A3B8", fontWeight: 500 }}>
            Dépôts Cotonou (Akpakpa) &amp; Calavi (Kpota) · Stock Garanti · Lun–Sam 7h30–18h00
          </span>
        </div>
        <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none", flexShrink: 0 }}>
          <Phone size={11} style={{ color: "#10B981" }} />
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
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Accueil", id: "accueil" },
    { label: "Nos Matériaux", id: "produits" },
    { label: "Autorité BTP", id: "autorite" },
    { label: "Simulateur", id: "simulateur", isSpecial: true },
    { label: "Comment Commander", id: "commande" },
    { label: "Applications", id: "applications" },
    { label: "Avis Staffeurs", id: "avis" },
    { label: "FAQ", id: "faq" },
  ]

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      transform: isVisible ? "translateY(0)" : "translateY(-100%)",
      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, box-shadow 0.2s ease",
      background: isScrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid #E2E8F0",
      boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
    }}>
      <div className="site-container" style={{
        height: isScrolled ? 60 : 70, display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "height 0.25s ease"
      }}>
        {/* Brand Logo */}
        <div onClick={() => onNavigate("accueil")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: isScrolled ? 34 : 38, height: isScrolled ? 34 : 38, borderRadius: 10,
            background: "#674FF5", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
            boxShadow: "0 2px 10px rgba(103,79,245,0.35)",
            transition: "all 0.25s ease"
          }}>
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: isScrolled ? "0.95rem" : "1.1rem", fontWeight: 800, color: "white" }}>M</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.15 }}>
              {COMPANY_NAME}
            </div>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", fontWeight: 500, color: "#94A3B8", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {COMPANY_SUBTITLE}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: "flex", gap: 18, alignItems: "center" }} className="nav-desktop">
          {links.map(({ label, id, isSpecial }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "0.84rem",
                fontWeight: 600,
                color: isSpecial ? "#674FF5" : "#475569",
                textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 4,
                padding: isSpecial ? "4px 10px" : "4px 0",
                borderRadius: isSpecial ? 9999 : 0,
                background: isSpecial ? "#F3F0FF" : "transparent",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#674FF5" }}
              onMouseLeave={e => {
                if (!isSpecial) (e.currentTarget as HTMLElement).style.color = "#475569"
              }}
            >
              {isSpecial && <Calculator size={13} />}
              <span>{label}</span>
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="nav-desktop">
          <WaBtn label="Demander un Devis" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mon chantier.`)} small />
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} aria-label={open ? "Fermer" : "Menu"} style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 8, color: "#0F172A", flexShrink: 0
        }} className="nav-mobile-toggle">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div style={{
          borderTop: "1px solid #E2E8F0",
          padding: "16px 20px 24px",
          display: "flex", flexDirection: "column", gap: 12,
          background: "#FFFFFF"
        }}>
          {links.map(({ label, id, isSpecial }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id); setOpen(false) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "0.95rem",
                fontWeight: 600, color: isSpecial ? "#674FF5" : "#0F172A",
                textDecoration: "none", padding: "8px 0",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid #F1F5F9"
              }}
            >
              <span>{label}</span>
              {isSpecial ? <span style={{ fontSize: "0.7rem", background: "#F3F0FF", color: "#674FF5", padding: "2px 8px", borderRadius: 9999, fontWeight: 700 }}>Simulateur</span> : <ChevronRight size={14} color="#94A3B8" />}
            </a>
          ))}
          <div style={{ paddingTop: 8 }}>
            <WaBtn label="WhatsApp Express Direct" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis.`)} full />
          </div>
        </div>
      )}
    </header>
  )
}

// ─── 1. Hero Section (Composition Studio 3 Matériaux Haute Définition) ───────
function HeroSection({ onVoirProduits, onSimulateur }: { onVoirProduits: () => void; onSimulateur: () => void }) {
  return (
    <section id="accueil" style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
      <div className="site-container" style={{
        paddingTop: "clamp(28px, 4.5vw, 56px)",
        paddingBottom: "clamp(40px, 5.5vw, 72px)",
      }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1.15fr 0.85fr",
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
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#F8FAFC", border: "1px solid #E2E8F0",
                  borderRadius: "9999px", padding: "4px 12px",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
                  fontWeight: 600, color: "#0F172A",
                }}>{flag} {label}</span>
              ))}
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontFamily: "var(--ds-font-heading)",
              fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)",
              fontWeight: 800, color: "#0F172A", lineHeight: 1.15,
              letterSpacing: "-0.035em", marginBottom: 16,
            }}>
              L&apos;Excellence des <span style={{ color: "#674FF5" }}>Matériaux de Staff</span> &amp; Finition au Bénin.
            </h1>

            {/* Sub-headline */}
            <p style={{
              fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.88rem, 1.35vw, 1rem)",
              color: "#475569", lineHeight: 1.7, maxWidth: 520,
              marginBottom: 28,
            }}>
              Approvisionnez vos chantiers directement à la source. <strong>Poudre de Gypse Marco 40 KG</strong> (Égypte), <strong>Chaux Vive pure</strong> (Dubaï) et <strong>Filasse Sisal haute ténacité</strong> (Kenya). Qualité certifiée, zéro fissure, stock permanent et livraison rapide sur chantier.
            </p>

            {/* Action CTAs */}
            <div className="hero-cta-group" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 32 }}>
              <WaBtn label="Demander un Devis WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} />
              <Button variant="neutral" iconEnd={<Calculator size={15} color="#674FF5" />} onClick={onSimulateur}>
                Calculer mes besoins
              </Button>
            </div>

            {/* Trust stats row */}
            <div className="hero-stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
              paddingTop: 20, borderTop: "1px solid #E2E8F0",
            }}>
              {[
                { val: "100%", label: "Pureté & Zéro Fissure" },
                { val: "3", label: "Origines Directes Usine" },
                { val: "24/48h", label: "Livraison sur Chantier" },
                { val: "Stock", label: "Permanent en Dépôt" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.15rem, 2vw, 1.45rem)", fontWeight: 800, color: "#674FF5", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.7rem", color: "#94A3B8", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col – Studio Showcase Multi-Matières */}
          <div className="hero-visual" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "relative", zIndex: 2, width: "100%", maxWidth: 360,
              background: "#FFFFFF", borderRadius: 24,
              boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.12)",
              border: "1px solid #E2E8F0", overflow: "hidden", padding: "20px"
            }}>
              {/* Main Product Showcase */}
              <div style={{ background: "#F8FAFC", borderRadius: 16, border: "1px solid #E2E8F0", padding: 16, height: 210, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={imgSrc(imgGypse)} alt="Gypse Marco 40 KG" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.92rem", fontWeight: 800, color: "#0F172A" }}>Poudre de Gypse Marco</span>
                  <span style={{ background: "#F3F0FF", color: "#674FF5", fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 9999 }}>Sac 40 KG</span>
                </div>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#64748B", margin: 0 }}>
                  Extra White · Prise 20-30 min · Formule anti-fissure
                </p>
              </div>

              {/* Mini thumbnails row for 2 other products */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14, paddingTop: 12, borderTop: "1px solid #E2E8F0" }}>
                <div onClick={onVoirProduits} style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFC", padding: "8px", borderRadius: 10, cursor: "pointer", border: "1px solid #E2E8F0" }}>
                  <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={imgSrc(imgChaux)} alt="Chaux Vive" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.1 }}>Chaux Vive</div>
                    <div style={{ fontSize: "0.62rem", color: "#94A3B8" }}>🇦🇪 Dubaï 40kg</div>
                  </div>
                </div>

                <div onClick={onVoirProduits} style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFC", padding: "8px", borderRadius: 10, cursor: "pointer", border: "1px solid #E2E8F0" }}>
                  <div style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={imgSrc(imgFilasse)} alt="Filasse Sisal" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.1 }}>Filasse Sisal</div>
                    <div style={{ fontSize: "0.62rem", color: "#94A3B8" }}>🇰🇪 Kenya Pure</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 2. Catalogue Produits (Cards Épurées & Fiche Technique Complète) ─────────
function ProductsSection({ onOpenDetail }: { onOpenDetail: (p: Product) => void }) {
  return (
    <section id="produits" style={{ background: "#F8FAFC", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "#674FF5", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "#F3F0FF", padding: "6px 14px", borderRadius: 9999
          }}>
            <Package size={14} /> Catalogue Officiel Direct Usine
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Nos 3 Matériaux Phares en Stock Permanent
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "#475569", lineHeight: 1.6, margin: 0 }}>
            Chaque sac et balle provient directement des usines partenaires. Zéro intermédiaire, qualité certifiée pour les staffeurs et promoteurs du Bénin.
          </p>
        </div>

        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{
              background: "white", border: "1px solid #E2E8F0",
              borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column",
              boxShadow: "0 2px 4px rgba(15, 23, 42, 0.04)", transition: "all 0.25s ease"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 16px 36px -8px rgba(15, 23, 42, 0.1)"
                e.currentTarget.style.transform = "translateY(-4px)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(15, 23, 42, 0.04)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              {/* Image Frame */}
              <div style={{ position: "relative", height: 220, background: "#F8FAFC", padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={imgSrc(p.image)} alt={p.nom} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                <span style={{
                  position: "absolute", top: 12, left: 12,
                  background: "#674FF5", color: "white",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700,
                  padding: "4px 10px", borderRadius: 9999
                }}>
                  {p.badge}
                </span>
                <span style={{
                  position: "absolute", bottom: 10, right: 12,
                  background: "rgba(255,255,255,0.95)",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 600,
                  color: "#0F172A", padding: "3px 9px", borderRadius: 9999,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0"
                }}>
                  {p.drapeau} {p.origine}
                </span>
              </div>

              {/* Info Frame Épurée */}
              <div style={{ padding: "clamp(18px, 3vw, 22px)", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.7rem", color: "#674FF5", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {p.categorie}
                  </span>
                  <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.98rem", fontWeight: 800, color: "#0F172A", margin: "4px 0 0", lineHeight: 1.3 }}>
                    {p.nom}
                  </h3>
                </div>

                {/* 2 Points Clés Percutants */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.highlights.map(h => (
                    <li key={h} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <CheckCircle2 size={15} style={{ color: "#10B981", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#475569", lineHeight: 1.45 }}>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "#F8FAFC", borderRadius: 8, width: "fit-content" }}>
                  <Package size={13} style={{ color: "#94A3B8" }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#475569", fontWeight: 600 }}>
                    {p.conditionnement}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto", paddingTop: 6 }}>
                  <WaBtn label="Commander / Prix WhatsApp" url={waProduitMsg(p.nom, p.conditionnement)} full />
                  <button onClick={() => onOpenDetail(p)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", fontWeight: 700,
                    color: "#674FF5", background: "#F3F0FF", border: "none",
                    borderRadius: 9999, padding: "10px 18px", cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}>
                    <FileText size={14} />
                    <span>Fiche &amp; Spécifications Complètes</span>
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

// ─── 3. Grande Section d'Autorité BTP : Flux Narratif Continu (Zéro Onglet) ───
function AutoriteBTPSection() {
  const engagements = [
    {
      icon: Award,
      titre: "Traçabilité & Import Direct",
      desc: "Chaque lot provient directement des carrières et usines certifiées en Égypte, aux Émirats et au Kenya, sans aucun intermédiaire spéculatif."
    },
    {
      icon: ShieldCheck,
      titre: "Formule Staff Zéro Craquelure",
      desc: "Granulométrie micronique contrôlée pour un gâchage fluide, une prise progressive de 20 à 30 minutes et une finition miroir sans retrait."
    },
    {
      icon: Warehouse,
      titre: "Stock Garanti en Dépôt",
      desc: "Nos entrepôts à Cotonou et Abomey-Calavi sont approvisionnés en continu pour assurer vos cadences de chantier sans rupture."
    },
    {
      icon: Truck,
      titre: "Acheminement Express 24-48h",
      desc: "Livraison directe et déchargement sur chantier dans tout le Grand Cotonou pour respecter scrupuleusement vos plannings."
    }
  ]

  const pipeline = [
    {
      num: "01",
      phase: "Phase Usine",
      titre: "Contrôles à l'Embarquement",
      desc: "Vérification des indices de blancheur, pureté chimique CaO > 95% et ensachage scellé avant départ des ports d'Alexandrie, Dubaï et Mombasa."
    },
    {
      num: "02",
      phase: "Phase Stockage",
      titre: "Entrepôts Ventilés Protégés",
      desc: "Stockage sous hygrométrie contrôlée à Cotonou et Calavi pour garantir que la poudre conserve 100% de sa réactivité sans prise d'humidité."
    },
    {
      num: "03",
      phase: "Phase Préparation",
      titre: "Vérification & Palettisation",
      desc: "Contrôle visuel systématique de l'intégrité de chaque sac de 40 KG et de chaque balle de sisal avant mise sur camion."
    },
    {
      num: "04",
      phase: "Phase Chantier",
      titre: "Livraison Déchargée sur Site",
      desc: "Acheminement rapide sous 24h à 48h directement sur votre zone de pose dans tout le Grand Cotonou."
    }
  ]

  return (
    <section id="autorite" style={{ background: "#FFFFFF", padding: "clamp(56px, 7vw, 90px) 0" }}>
      <div className="site-container">
        
        {/* Header Section */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto clamp(36px, 5vw, 54px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "#674FF5", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "#F3F0FF", padding: "6px 14px", borderRadius: 9999
          }}>
            <ShieldCheck size={14} /> Autorité Industrielle &amp; Logistique
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
            fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            La Garantie d&apos;un Grand Importateur BTP
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.88rem, 1.4vw, 1rem)", color: "#475569", lineHeight: 1.6, margin: 0 }}>
            Une sélection rigoureuse à la source et une chaîne logistique maîtrisée pour sécuriser les cadences de vos chantiers au Bénin.
          </p>
        </div>

        {/* 1. Nos 4 Piliers d'Engagements */}
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px, 2.5vw, 24px)", marginBottom: "clamp(40px, 5vw, 64px)" }}>
          {engagements.map(({ icon: Icon, titre, desc }) => (
            <div key={titre} style={{
              background: "#F8FAFC", borderRadius: 20,
              border: "1px solid #E2E8F0", padding: "clamp(20px, 3vw, 26px)",
              display: "flex", flexDirection: "column", gap: 12,
              transition: "all 0.25s ease"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 10px 24px -4px rgba(15, 23, 42, 0.08)"
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.borderColor = "#674FF5"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderColor = "#E2E8F0"
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "#F3F0FF", color: "#674FF5",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Icon size={20} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                  {titre}
                </h3>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Le Pipeline Logistique Continu (Visible, Connecté, Sans Onglet) */}
        <div style={{
          background: "#F8FAFC", borderRadius: 28, border: "1px solid #E2E8F0",
          padding: "clamp(28px, 4vw, 48px) clamp(20px, 3vw, 36px)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10B981", background: "#ECFDF5", padding: "4px 10px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Traçabilité Totale
              </span>
              <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", fontWeight: 800, color: "#0F172A", margin: "8px 0 0" }}>
                Notre Chaîne d&apos;Approvisionnement Usine ➔ Chantier
              </h3>
            </div>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#64748B" }}>
              4 étapes certifiées sans rupture de qualité
            </span>
          </div>

          <div className="supply-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(14px, 2vw, 20px)" }}>
            {pipeline.map(({ num, phase, titre, desc }) => (
              <div key={num} style={{
                background: "#FFFFFF", borderRadius: 18,
                border: "1px solid #E2E8F0", padding: "clamp(18px, 2.5vw, 22px)",
                display: "flex", flexDirection: "column", gap: 10,
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#674FF5" }}>
                    {num}
                  </span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#674FF5", background: "#F3F0FF", padding: "2px 8px", borderRadius: 6, textTransform: "uppercase" }}>
                    {phase}
                  </span>
                </div>
                <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.92rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {titre}
                </h4>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── 4. Cockpit Simulateur Pro avec Presets Métiers (2 Colonnes) ──────────────
function InteractiveSimulateurSection() {
  const [surface, setSurface] = useState(60)
  const [typeOuvrage, setTypeOuvrage] = useState<"plafond" | "corniche">("plafond")

  const presets = [
    { label: "Chambre / Salon", val: 30 },
    { label: "Appartement F3/F4", val: 80 },
    { label: "Villa Standing", val: 150 },
    { label: "Immeuble / Grand Chantier", val: 300 },
  ]

  const coefGypse = typeOuvrage === "plafond" ? 0.35 : 0.25
  const coefFilasse = typeOuvrage === "plafond" ? 0.15 : 0.10
  const coefChaux = 0.08

  const nbSacsGypse = Math.max(1, Math.ceil(surface * coefGypse))
  const kgFilasse = Math.max(1, Math.round(surface * coefFilasse))
  const nbSacsChaux = Math.max(1, Math.ceil(surface * coefChaux))

  const poidsTotalKg = (nbSacsGypse * 40) + kgFilasse + (nbSacsChaux * 40)
  const poidsTotalTonnes = (poidsTotalKg / 1000).toFixed(2)

  const msgSimu = waUrl(`Bonjour ${COMPANY_NAME}, j'ai calculé mes besoins sur votre simulateur de chantier :

` +
    `📋 *Détails du Projet :*
` +
    `• Type d'ouvrage : ${typeOuvrage === "plafond" ? "Plafond Staff / Faux-Plafond Lissé" : "Corniches, Moulures & Gorges Lumineuses"}
` +
    `• Surface estimée : ${surface} m²
` +
    `• Poids matériel calculé : ~${poidsTotalKg} kg (${poidsTotalTonnes} Tonnes)

` +
    `📦 *Quantités Estimées :*
` +
    `• Poudre de Gypse Marco 40kg : ${nbSacsGypse} sacs
` +
    `• Filasse de Sisal Kenya : ${kgFilasse} kg
` +
    `• Chaux Vive Marco (Dubaï) : ${nbSacsChaux} sacs

` +
    `Pouvez-vous me transmettre votre meilleur devis avec confirmation du stock et délai de livraison ? Merci !`
  )

  return (
    <section id="simulateur" style={{ background: "#F8FAFC", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 44px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "#674FF5", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "#F3F0FF", padding: "6px 14px", borderRadius: 9999
          }}>
            <Calculator size={14} /> Métré Interactif de Chantier
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Simulateur de Besoins en Matériaux
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "#475569", lineHeight: 1.6, margin: 0 }}>
            Sélectionnez votre type de chantier ou ajustez le curseur pour obtenir instantanément le quantitatif de sacs de Gypse Marco, Chaux Vive et Filasse Sisal.
          </p>
        </div>

        {/* Cockpit 2 Colonnes Pro */}
        <div className="simu-cockpit-grid" style={{
          background: "#FFFFFF", borderRadius: 28, border: "1px solid #E2E8F0",
          padding: "clamp(24px, 4vw, 40px)", boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.06)",
          display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "clamp(24px, 4vw, 40px)",
          alignItems: "stretch"
        }}>
          
          {/* Colonne Gauche : Contrôles & Presets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            
            {/* Step 1 : Choix Ouvrage */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                1. Choisissez le type d&apos;ouvrage :
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button type="button" onClick={() => setTypeOuvrage("plafond")} style={{
                  padding: "12px 14px", borderRadius: 14,
                  fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", fontWeight: 700,
                  border: `2px solid ${typeOuvrage === "plafond" ? "#674FF5" : "#E2E8F0"}`,
                  background: typeOuvrage === "plafond" ? "#F3F0FF" : "#FFFFFF",
                  color: typeOuvrage === "plafond" ? "#674FF5" : "#475569",
                  cursor: "pointer", transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <span>🏢 Plafonds Staff</span>
                  {typeOuvrage === "plafond" && <Check size={16} color="#674FF5" />}
                </button>
                <button type="button" onClick={() => setTypeOuvrage("corniche")} style={{
                  padding: "12px 14px", borderRadius: 14,
                  fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", fontWeight: 700,
                  border: `2px solid ${typeOuvrage === "corniche" ? "#674FF5" : "#E2E8F0"}`,
                  background: typeOuvrage === "corniche" ? "#F3F0FF" : "#FFFFFF",
                  color: typeOuvrage === "corniche" ? "#674FF5" : "#475569",
                  cursor: "pointer", transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <span>✨ Corniches &amp; Moulures</span>
                  {typeOuvrage === "corniche" && <Check size={16} color="#674FF5" />}
                </button>
              </div>
            </div>

            {/* Presets rapides de surface */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                2. Presets rapides ou ajustement manuel :
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 12 }} className="presets-grid">
                {presets.map(p => (
                  <button key={p.val} onClick={() => setSurface(p.val)} style={{
                    padding: "8px 6px", borderRadius: 10,
                    border: `1.5px solid ${surface === p.val ? "#674FF5" : "#E2E8F0"}`,
                    background: surface === p.val ? "#F3F0FF" : "white",
                    color: surface === p.val ? "#674FF5" : "#475569",
                    cursor: "pointer", fontSize: "0.75rem", fontWeight: 700,
                    transition: "all 0.2s ease", textAlign: "center"
                  }}>
                    <div>{p.val} m²</div>
                    <div style={{ fontSize: "0.6rem", color: "#94A3B8", fontWeight: 500 }}>{p.label}</div>
                  </button>
                ))}
              </div>

              {/* Slider interactif */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Surface précise :</span>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "#674FF5" }}>
                  {surface} <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>m²</span>
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setSurface(s => Math.max(10, s - 10))} aria-label="Moins 10m²"
                  style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #E2E8F0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#475569" }}>
                  <Minus size={15} />
                </button>
                <input type="range" min={10} max={500} step={5} value={surface}
                  onChange={e => setSurface(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#674FF5", height: 8, cursor: "pointer" }}
                />
                <button onClick={() => setSurface(s => Math.min(500, s + 10))} aria-label="Plus 10m²"
                  style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #E2E8F0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#475569" }}>
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFC", padding: "10px 14px", borderRadius: 12, border: "1px solid #E2E8F0" }}>
              <Scale size={16} style={{ color: "#674FF5", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#64748B" }}>
                Poids matériel estimé : <strong>~{poidsTotalKg} kg</strong> ({poidsTotalTonnes} Tonnes)
              </span>
            </div>
          </div>

          {/* Colonne Droite : Panneau de Devis & Quantités */}
          <div style={{
            background: "#F8FAFC", borderRadius: 20, border: "1px solid #E2E8F0",
            padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14
          }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
                  Quantités calculées ({surface} m²) :
                </span>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10B981", background: "#ECFDF5", padding: "2px 8px", borderRadius: 6 }}>
                  Stock Disponible
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px 12px", borderRadius: 12, border: "1px solid #E2E8F0" }}>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A" }}>Gypse Marco (40kg)</div>
                    <div style={{ fontSize: "0.68rem", color: "#94A3B8" }}>🇪🇬 Import Égypte</div>
                  </div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "#674FF5" }}>
                    {nbSacsGypse} <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B" }}>sacs</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px 12px", borderRadius: 12, border: "1px solid #E2E8F0" }}>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A" }}>Filasse Sisal Pure</div>
                    <div style={{ fontSize: "0.68rem", color: "#94A3B8" }}>🇰🇪 Produce of Kenya</div>
                  </div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "#10B981" }}>
                    {kgFilasse} <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B" }}>kg</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px 12px", borderRadius: 12, border: "1px solid #E2E8F0" }}>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A" }}>Chaux Vive (40kg)</div>
                    <div style={{ fontSize: "0.68rem", color: "#94A3B8" }}>🇦🇪 Dubaï Pure</div>
                  </div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>
                    {nbSacsChaux} <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748B" }}>sacs</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <WaBtn label="Recevoir mon devis officiel sur WhatsApp" url={msgSimu} full />
              <span style={{ fontSize: "0.7rem", color: "#94A3B8", textAlign: "center" }}>
                ⚡ Devis proforma avec tarif dégressif par retour de message
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

// ─── 5. Processus de Commande Clair en 4 Étapes (01 ➔ 02 ➔ 03 ➔ 04) ───────────
function HowToOrderSection() {
  const steps = [
    {
      num: "01",
      titre: "Sélection & Métré",
      desc: "Choisissez vos matériaux sur le catalogue ou calculez vos besoins exacts avec notre simulateur de chantier."
    },
    {
      num: "02",
      titre: "Devis WhatsApp Express",
      desc: "Transmettez votre métré en 1 clic pour recevoir votre proforma avec tarif dégressif sous 15 à 30 minutes."
    },
    {
      num: "03",
      titre: "Confirmation de Commande",
      desc: "Validation des quantités, du mode de règlement et réservation immédiate de vos lots dans nos dépôts."
    },
    {
      num: "04",
      titre: "Retrait ou Livraison Chantier",
      desc: "Chargement direct à nos dépôts de Cotonou & Calavi ou livraison camion déchargée sur votre chantier sous 24-48h."
    }
  ]

  return (
    <section id="commande" style={{ background: "#FFFFFF", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "#674FF5", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "#F3F0FF", padding: "6px 14px", borderRadius: 9999
          }}>
            <Clock size={14} /> Parcours Simple &amp; Sécurisé
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Comment Commander Vos Matériaux ?
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "#475569", lineHeight: 1.6, margin: 0 }}>
            Un processus d&apos;achat fluide et réactif conçu pour respecter le rythme intensif des chantiers.
          </p>
        </div>

        <div className="order-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px, 2.5vw, 24px)" }}>
          {steps.map(({ num, titre, desc }) => (
            <div key={num} style={{
              background: "#F8FAFC", borderRadius: 20,
              border: "1px solid #E2E8F0", padding: "clamp(20px, 3vw, 26px)",
              display: "flex", flexDirection: "column", gap: 10
            }}>
              <span style={{
                fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem",
                fontWeight: 800, color: "#10B981", lineHeight: 1
              }}>
                {num}
              </span>
              <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                {titre}
              </h3>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── 6. Applications & Réalisations ──────────────────────────────────────────
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
    <section id="applications" style={{ background: "#F8FAFC", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(32px, 5vw, 48px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "#674FF5", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "#F3F0FF", padding: "6px 14px", borderRadius: 9999
          }}>
            <Hammer size={14} /> Domaines d&apos;Application
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
            fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Des Matériaux Pensés pour Vos Réalisations
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "#475569", lineHeight: 1.6, margin: 0 }}>
            Du faux-plafond suspendu aux corniches complexes, des solutions adaptées à chaque étape de votre finition.
          </p>
        </div>

        <div className="apps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {apps.map(({ titre, produit, desc, icon: Icon }) => (
            <div key={titre} style={{
              background: "#FFFFFF", borderRadius: 20,
              border: "1px solid #E2E8F0", padding: "clamp(24px, 3.5vw, 32px)",
              display: "flex", flexDirection: "column", gap: 14
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "#F3F0FF", color: "#674FF5", border: "1px solid #E2E8F0",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Icon size={22} />
              </div>
              <div>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#674FF5", fontWeight: 700, textTransform: "uppercase" }}>
                  {produit}
                </span>
                <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: "4px 0 8px" }}>
                  {titre}
                </h3>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
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

// ─── 7. Témoignages & Avis Clients ───────────────────────────────────────────
const TEMOIGNAGES = [
  { initials: "KB", color: "#674FF5", nom: "Kouassi Bernard", role: "Maître Staffeur depuis 14 ans", ville: "Cotonou", note: 5, texte: "Le gypse Marco est sans équivalent au Bénin. La pâte est fluide, prend sans chauffer excessivement et ne fait aucune fissure. Mes chantiers sont validés du premier coup." },
  { initials: "AM", color: "#10B981", nom: "Adéola Moussa", role: "Conducteur de Travaux BTP", ville: "Abomey-Calavi", note: 5, texte: "La réactivité sur WhatsApp est top. En envoyant la surface, on a le devis et la livraison sur chantier à Calavi arrive dans les temps. La filasse du Kenya est très propre." },
  { initials: "FD", color: "#F59E0B", nom: "Fatou Diallo", role: "Architecte d'Intérieur", ville: "Cotonou", note: 5, texte: "Pour les faux-plafonds à gorges lumineuses de mes clients, j'exige le Gypse Marco et la Chaux Vive de Dubaï. La blancheur est parfaite, prête pour la peinture." },
]

function ReassuranceSection() {
  return (
    <section id="avis" style={{ background: "#FFFFFF", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 48px)" }}>
          <span style={{ display: "inline-block", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "#674FF5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Retours d&apos;Expérience
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.025em", marginBottom: 8 }}>
            Approuvé par les Maîtres Staffeurs &amp; Artisans
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "#475569" }}>
            Découvrez pourquoi les professionnels du bâtiment choisissent Marco Staff
          </p>
        </div>

        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {TEMOIGNAGES.map(({ initials, color, nom, role, ville, note, texte }) => (
            <div key={nom} style={{
              background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 20,
              padding: "clamp(20px, 3vw, 28px)", display: "flex", flexDirection: "column", gap: 16,
              boxShadow: "0 2px 4px rgba(15, 23, 42, 0.04)"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontWeight: 800 }}>
                  {initials}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>{nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#94A3B8", margin: "2px 0 4px" }}>{role} · {ville}</p>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(note)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" stroke="#F59E0B" />)}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "#475569", lineHeight: 1.65, margin: 0, fontStyle: "italic", borderLeft: `3px solid ${color}`, paddingLeft: 12 }}>
                &ldquo;{texte}&rdquo;
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── 8. FAQ Thématique & Accessible ──────────────────────────────────────────
function FAQSection() {
  const [filter, setFilter] = useState<string>("all")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs = filter === "all" ? FAQS : FAQS.filter(f => f.cat === filter)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" style={{ background: "#F8FAFC", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container" style={{ maxWidth: 880 }}>
        
        <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 36px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "#674FF5", textTransform: "uppercase",
            letterSpacing: "0.1em", marginBottom: 10,
            background: "#F3F0FF", padding: "5px 12px", borderRadius: 9999
          }}>
            <HelpCircle size={14} /> Foire Aux Questions
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.025em", margin: "6px 0 10px" }}>
            Questions Fréquentes sur nos Matériaux
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "#475569" }}>
            Réponses claires sur nos spécifications techniques, nos délais de livraison et nos conditions tarifaires.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { id: "all", label: "Toutes les questions" },
            { id: "qualite", label: "Qualité & Technique" },
            { id: "logistique", label: "Livraison & Dépôts" },
            { id: "tarifs", label: "Commandes & Devis" },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => { setFilter(id); setOpenIndex(0) }} style={{
              padding: "7px 16px", borderRadius: 9999,
              border: `1.5px solid ${filter === id ? "#674FF5" : "#E2E8F0"}`,
              background: filter === id ? "#F3F0FF" : "white",
              color: filter === id ? "#674FF5" : "#475569",
              fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s ease"
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q} style={{
                background: "#FFFFFF", borderRadius: 16,
                border: `1.5px solid ${isOpen ? "#674FF5" : "#E2E8F0"}`,
                overflow: "hidden", transition: "all 0.2s ease"
              }}>
                <button
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i) } }}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%", padding: "18px 20px", display: "flex",
                    alignItems: "center", justifyContent: "space-between", gap: 16,
                    background: "none", border: "none", cursor: "pointer", textAlign: "left"
                  }}
                >
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.35 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: isOpen ? "#F3F0FF" : "#F8FAFC",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    color: isOpen ? "#674FF5" : "#94A3B8",
                  }}>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 20px 18px", borderTop: "1px solid #E2E8F0", paddingTop: 14 }}>
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
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

// ─── 9. Section CTA Finale : ARCHITECTURALE SANS DÉGRADÉ (NO GRADIENT) ────────
function ArchitecturalCTASection({ onSimulateur }: { onSimulateur: () => void }) {
  return (
    <section style={{
      background: "#0A0F1D",
      padding: "clamp(64px, 8vw, 96px) 0",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Structural Geometry Lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px", opacity: 0.6, pointerEvents: "none"
      }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Monolith Architectural Card */}
        <div style={{
          background: "#131B2E",
          borderRadius: 28,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "clamp(36px, 5vw, 64px) clamp(24px, 4vw, 56px)",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "center",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)"
        }} className="cta-architectural-grid">
          
          {/* Left Column : Clear Authority Message */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.35)", borderRadius: 9999, padding: "6px 14px", marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Dépôts Cotonou &amp; Calavi Approvisionnés
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--ds-font-heading)",
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              margin: "0 0 16px"
            }}>
              Votre Prochain Chantier Commence Ici.
            </h2>

            <p style={{
              fontFamily: "var(--ds-font-body)",
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              color: "#94A3B8",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 520
            }}>
              Gypse d&apos;Égypte 40 KG, Chaux Vive de Dubaï et Filasse de Sisal du Kenya en stock continu. Obtenez votre devis proforma avec tarif dégressif par retour de message.
            </p>
          </div>

          {/* Right Column : Clean Contrast Actions Box */}
          <div style={{
            background: "#1E293B",
            borderRadius: 20,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "clamp(24px, 3.5vw, 32px)",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 14 }}>
              <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "white" }}>
                Demande Commerciale Express
              </span>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#94A3B8", margin: "4px 0 0" }}>
                Réponse directe de notre équipe logistique sous 15 à 30 minutes.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <WaBtn label="Contacter l'équipe commerciale" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} full />
              <button onClick={onSimulateur} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)",
                borderRadius: 9999, padding: "12px 20px", color: "white",
                fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s ease"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#FFFFFF"
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
                  e.currentTarget.style.background = "transparent"
                }}
              >
                <Calculator size={16} color="#674FF5" />
                <span>Ouvrir le simulateur de métré ➔</span>
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4 }}>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#64748B" }}>
                Ligne directe : {PHONE_DISPLAY}
              </span>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#10B981", fontWeight: 600 }}>
                • Dépôt Ouvert
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

// ─── 10. Modale / Tiroir Slide-Over Fiche Produit (Expérience Technique Enrichie)
function SlideOverProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(5)
  const msgCmd = waUrl(`Bonjour ${COMPANY_NAME}, je souhaite commander ${qty} sac(s) de *${product.nom}* (${product.conditionnement}). Pouvez-vous me confirmer le tarif et les modalités de livraison ? Merci !`)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", justifyContent: "flex-end",
      background: "rgba(10, 15, 29, 0.6)", backdropFilter: "blur(6px)",
      animation: "fadeIn 0.2s ease-out"
    }} onClick={onClose}>
      <div style={{
        width: "100%", maxWidth: 580, background: "#FFFFFF", height: "100%",
        boxShadow: "-10px 0 40px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column",
        overflowY: "auto", position: "relative"
      }} onClick={e => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div style={{
          padding: "16px 24px", borderBottom: "1px solid #E2E8F0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, background: "#FFFFFF", zIndex: 10
        }}>
          <div>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#674FF5", fontWeight: 700, textTransform: "uppercase" }}>
              {product.categorie}
            </span>
            <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
              Dossier Technique Produit
            </h3>
          </div>
          <button onClick={onClose} aria-label="Fermer" style={{
            width: 36, height: 36, borderRadius: "50%", border: "1px solid #E2E8F0",
            background: "#F8FAFC", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#475569"
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Image Frame */}
          <div style={{
            background: "#F8FAFC", borderRadius: 18, border: "1px solid #E2E8F0",
            height: 200, padding: 16, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <img src={imgSrc(product.image)} alt={product.nom} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
          </div>

          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <span style={{ background: "#F3F0FF", color: "#674FF5", fontSize: "0.72rem", fontWeight: 700, padding: "3px 8px", borderRadius: 9999 }}>
                {product.badge}
              </span>
              <span style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A", fontSize: "0.72rem", fontWeight: 600, padding: "3px 8px", borderRadius: 9999 }}>
                {product.drapeau} {product.origine}
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>
              {product.nom}
            </h2>
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
              {product.description}
            </p>
          </div>

          {/* Guide de dosage & Conseils de pose */}
          <div style={{ background: "#F8FAFC", borderRadius: 14, border: "1px solid #E2E8F0", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Info size={16} style={{ color: "#674FF5" }} />
              <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>
                Conseil de Préparation &amp; Dosage :
              </span>
            </div>
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#475569", margin: 0, lineHeight: 1.5 }}>
              💧 <strong>Dosage d&apos;eau :</strong> {product.dosage}
            </p>
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#475569", margin: 0, lineHeight: 1.5 }}>
              🏛️ <strong>Usages types :</strong> {product.application}
            </p>
          </div>

          {/* Tableau des Spécifications Techniques */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.85rem", fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>
              Tableau des Spécifications :
            </h4>
            <div style={{ background: "#F8FAFC", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden" }}>
              {product.specs.map(({ label, valeur }, i) => (
                <div key={label} style={{
                  display: "grid", gridTemplateColumns: "1.1fr 1.4fr",
                  padding: "10px 14px", borderBottom: i < product.specs.length - 1 ? "1px solid #E2E8F0" : "none",
                  fontSize: "0.78rem"
                }}>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>{label}</span>
                  <span style={{ color: "#0F172A", fontWeight: 500 }}>{valeur}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sélecteur de Quantité */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#F8FAFC", borderRadius: 14 }}>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", fontWeight: 700, color: "#0F172A" }}>Quantité :</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", borderRadius: 9999, padding: "4px 8px", border: "1px solid #E2E8F0" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Diminuer" style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Minus size={14} />
              </button>
              <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "#674FF5", minWidth: 28, textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} aria-label="Augmenter" style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={14} />
              </button>
            </div>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#94A3B8" }}>{product.conditionnement}</span>
          </div>

          {/* CTA WhatsApp Drawer */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
            <WaBtn label={`Demander le Devis pour ${qty} sac(s)`} url={msgCmd} full />
            <button onClick={onClose} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#64748B", padding: "6px 0"
            }}>
              Fermer et continuer la navigation
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

// ─── 11. Footer Officiel 2026 ────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <footer id="contact" style={{ background: "#0A0F1D", color: "white", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="site-container" style={{ padding: "64px 0 24px" }}>
        
        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: "clamp(24px, 4vw, 48px)",
          marginBottom: 48
        }}>
          
          {/* Col 1 Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "#674FF5", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "white" }}>M</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "white", lineHeight: 1.1 }}>
                  {COMPANY_NAME}
                </div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.6rem", fontWeight: 500, color: "#94A3B8", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {COMPANY_SUBTITLE}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#94A3B8", lineHeight: 1.7, maxWidth: 300, margin: 0 }}>
              Importateur direct et grossiste en matériaux de finition et staff au Bénin. Qualité d&apos;origine certifiée (Égypte, Dubaï, Kenya) sans intermédiaire.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "#94A3B8" }}>
                <Phone size={14} style={{ color: "#10B981" }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem" }}>{PHONE_DISPLAY}</span>
              </a>
              <a href={waUrl(`Bonjour ${COMPANY_NAME}`)} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "#94A3B8" }}>
                <MessageCircle size={14} style={{ color: "#10B981" }} />
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
                  <a href="#produits" onClick={e => { e.preventDefault(); onNavigate("produits") }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#94A3B8", textDecoration: "none" }}>
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
                { label: "Autorité BTP", id: "autorite" },
                { label: "Simulateur Chantier", id: "simulateur" },
                { label: "Comment Commander", id: "commande" },
                { label: "Applications", id: "applications" },
                { label: "Avis Staffeurs", id: "avis" },
                { label: "FAQ", id: "faq" },
              ].map(({ label, id }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={e => { e.preventDefault(); onNavigate(id) }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#94A3B8", textDecoration: "none" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 Dépôts Bénin */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Dépôts Physiques au Bénin
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <MapPin size={14} style={{ color: "#10B981", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#94A3B8", lineHeight: 1.5 }}>
                  <strong>Dépôt Cotonou :</strong> Akpakpa, Zone Industrielle<br />
                  <strong>Dépôt Calavi :</strong> Carrefour Kpota / Arconville
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Clock size={14} style={{ color: "#10B981", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#94A3B8", lineHeight: 1.5 }}>
                  Lundi – Samedi<br />07h30 – 18h00
                </span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.15)", borderRadius: 9999, padding: "5px 12px", width: "fit-content" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "block" }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#10B981" }}>Stock Garanti en Dépôt</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div style={{
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center"
        }}>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#94A3B8", margin: 0 }}>
            © 2026 {COMPANY_NAME} · {COMPANY_SUBTITLE} · Tous droits réservés.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#94A3B8" }}>
              Qualité Certifiée ISO 9001
            </span>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#94A3B8" }}>
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

  .hero-grid { grid-template-columns: 1.15fr 0.85fr; }
  .hero-stats-grid { grid-template-columns: repeat(4, 1fr); }
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .why-grid { grid-template-columns: repeat(4, 1fr); }
  .supply-grid { grid-template-columns: repeat(4, 1fr); }
  .order-grid { grid-template-columns: repeat(4, 1fr); }
  .apps-grid { grid-template-columns: repeat(3, 1fr); }
  .simu-cockpit-grid { grid-template-columns: 1.15fr 0.85fr; }
  .cta-architectural-grid { grid-template-columns: 1.2fr 0.8fr; }
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.2fr; }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 1024px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .supply-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .order-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .apps-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .simu-cockpit-grid { grid-template-columns: 1fr !important; }
    .cta-architectural-grid { grid-template-columns: 1fr !important; }
  }

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
      margin-top: 8px !important;
    }
    .hero-visual > div {
      width: 100% !important;
      max-width: 320px !important;
    }
    .hero-stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 14px !important;
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
    .presets-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
`

// ─── Main App Entry ──────────────────────────────────────────────────────────
export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNavigate = useCallback((id: string) => {
    if (id === "accueil") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <>
      <style>{CSS}</style>
      <div style={{ fontFamily: "var(--ds-font-body)", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
        <AnnouncementBar />
        <Navbar onNavigate={handleNavigate} />
        
        <main>
          <HeroSection onVoirProduits={() => handleNavigate("produits")} onSimulateur={() => handleNavigate("simulateur")} />
          <ProductsSection onOpenDetail={(p) => setSelectedProduct(p)} />
          <AutoriteBTPSection />
          <InteractiveSimulateurSection />
          <HowToOrderSection />
          <ApplicationsSection />
          <ArchitecturalCTASection onSimulateur={() => handleNavigate("simulateur")} />
          <ReassuranceSection />
          <FAQSection />
        </main>

        <Footer onNavigate={handleNavigate} />

        {/* Modal Tiroir Slide-Over Fiche Produit */}
        {selectedProduct && (
          <SlideOverProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}

        {/* Scroll-To-Top Accessible Button */}
        {showBackToTop && (
          <button
            onClick={handleScrollTop}
            aria-label="Retour en haut de la page"
            style={{
              position: "fixed",
              bottom: 84,
              right: 20,
              zIndex: 990,
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "white",
              color: "#0F172A",
              border: "1px solid #E2E8F0",
              boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.12)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 12px 32px -4px rgba(103, 79, 245, 0.2)"
              e.currentTarget.style.borderColor = "#674FF5"
              e.currentTarget.style.color = "#674FF5"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(15, 23, 42, 0.12)"
              e.currentTarget.style.borderColor = "#E2E8F0"
              e.currentTarget.style.color = "#0F172A"
            }}
          >
            <ArrowUp size={18} />
          </button>
        )}

        {/* Mobile Floating Thumb Dock */}
        <div className="mobile-dock" style={{
          position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 999,
          background: "rgba(10, 15, 29, 0.95)", backdropFilter: "blur(14px)",
          borderRadius: 24, padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          boxShadow: "0 12px 36px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>Dépôts Ouverts</span>
          </div>
          <WaBtn label="WhatsApp Direct" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} small />
        </div>

      </div>
    </>
  )
}
