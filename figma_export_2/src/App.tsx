import { useState, useCallback, useEffect } from "react"
import {
  MessageCircle, Phone, MapPin, Menu, X, ChevronRight,
  ArrowLeft, CheckCircle2, Star, Package,
  Clock, Calculator, ShieldCheck, Truck, Award, ChevronDown,
  Plus, Minus, ArrowRight, HelpCircle, Layers, Sparkles,
  ArrowUp, Building2, Warehouse, Hammer, Check
} from "lucide-react"
import imgGypse from "@/imports/photo2.jpeg"
import imgChaux from "@/imports/photo1.jpeg"
import imgFilasse from "@/imports/filace.jpeg"

// ─── Constantes Commerciales ────────────────────────────────────────────────
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
  matiereDetail: string
}

// ─── Catalogue Produits Réels ────────────────────────────────────────────────
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
      "Blancheur éclatante 100% sans jaunissement dans le temps",
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
    matiereDetail: "Granulométrie < 80µm · Blancheur 100% · Prise 20-30 min",
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
    matiereDetail: "Teneur CaO > 95% · Haute réactivité thermique · Anti-salpêtre",
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
    matiereDetail: "Fibres longues 60-120cm · 100% Végétal · Traction > 300 MPa",
  },
]

const imgSrc = (img: string | { src: string }) =>
  typeof img === "string" ? img : img.src

// ─── FAQ Commerciale Anti-Objections ─────────────────────────────────────────
const FAQS = [
  {
    q: "Vos matériaux sont-ils disponibles immédiatement en dépôt ?",
    a: "Oui, nous maintenons un stock permanent de Gypse Marco 40 KG, Chaux Vive et Filasse Sisal dans nos entrepôts de Cotonou et Abomey-Calavi. Vous pouvez retirer vos commandes le jour même ou planifier une livraison."
  },
  {
    q: "Livrez-vous directement sur les chantiers dans tout le Bénin ?",
    a: "Nous assurons la livraison directe sur vos chantiers sous 24h à 48h dans le Grand Cotonou (Cotonou, Calavi, Sèmè, Ouidah, Porto-Novo) et pouvons organiser des acheminements sur mesure vers l'intérieur du pays pour les gros chantiers."
  },
  {
    q: "Quel est le volume minimum pour commander et obtenir un tarif grossiste ?",
    a: "Nous vendons dès 1 sac ou 1 balle au détail pour vos petits travaux. Pour les tarifs grossistes dégressifs, les remises s'appliquent dès 20 sacs de Gypse, 5 sacs de Chaux ou 1 balle complète de Filasse."
  },
  {
    q: "Pouvez-vous nous aider à calculer les quantités exactes pour notre devis ?",
    a: "Absolument. Vous pouvez utiliser le simulateur interactif sur ce site pour obtenir une première estimation, ou envoyer directement votre plan/métré sur WhatsApp. Notre équipe commerciale vous établit un décompte précis."
  },
  {
    q: "Pourquoi choisir le Gypse Marco d'Égypte plutôt qu'un plâtre standard ?",
    a: "Le Gypse Marco bénéficie d'une granulométrie micronique (< 80 microns) sans grumeaux et d'une blancheur éclatante naturelle. Il garantit une prise homogène en 20 à 30 minutes sans aucun retrait ni fissuration après séchage."
  }
]

// ─── Boutons ─────────────────────────────────────────────────────────────────
function WaBtn({ label = "WhatsApp", url, small = false, full = false }: {
  label?: string; url: string; small?: boolean; full?: boolean
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: small ? 6 : 8, background: "var(--ds-conversion)", color: "white",
      fontFamily: "var(--ds-font-body)", fontSize: small ? "0.8rem" : "0.92rem",
      fontWeight: 700, padding: small ? "9px 18px" : "13px 26px",
      borderRadius: "var(--ds-radius-full)", textDecoration: "none",
      transition: "all var(--ds-transition)",
      boxShadow: "0 4px 16px rgba(16,185,129,0.30)", width: full ? "100%" : undefined,
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
      <MessageCircle size={small ? 15 : 18} />
      <span>{label}</span>
    </a>
  )
}

// ─── Header & Smart Navbar ───────────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div style={{ background: "var(--ds-dark-bg)", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="site-container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ds-conversion)", display: "block", animation: "pulseDot 2s infinite" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.74rem", color: "var(--ds-dark-text-muted)", fontWeight: 500 }}>
            Dépôts Cotonou &amp; Calavi · Stock Permanent · Ouvert Lun–Sam 7h30–18h00
          </span>
        </div>
        <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
          <Phone size={12} style={{ color: "var(--ds-conversion)" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.74rem", color: "white", fontWeight: 600 }}>
            {PHONE_DISPLAY}
          </span>
        </a>
      </div>
    </div>
  )
}

function Navbar({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Accueil", id: "accueil" },
    { label: "Matière & Produits", id: "produits" },
    { label: "Pourquoi Marco ?", id: "pourquoi" },
    { label: "Approvisionnement", id: "logistique" },
    { label: "Simulateur", id: "simulateur" },
    { label: "Usages Métier", id: "usages" },
    { label: "Avis", id: "temoignages" },
    { label: "FAQ", id: "faq" },
  ]

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: isScrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.90)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--ds-border)",
      boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      transition: "all var(--ds-transition)"
    }}>
      <div className="site-container" style={{
        height: isScrolled ? 58 : 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "height var(--ds-transition)"
      }}>
        {/* Logo */}
        <div onClick={() => onNavigate("accueil")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: isScrolled ? 34 : 38, height: isScrolled ? 34 : 38, borderRadius: "var(--ds-radius-md)",
            background: "var(--ds-brand)", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
            boxShadow: "0 4px 12px rgba(103,79,245,0.30)",
            transition: "all var(--ds-transition)"
          }}>
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: isScrolled ? "0.95rem" : "1.1rem", fontWeight: 800, color: "white" }}>M</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1.15 }}>
              {COMPANY_NAME}
            </div>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.60rem", fontWeight: 600, color: "var(--ds-text-tertiary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
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
        <button onClick={() => setOpen(!open)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} style={{
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

// ─── 1. Hero Immersif & Statutaire ────────────────────────────────────────────
function HeroSection({ onSimulateur }: { onSimulateur: () => void }) {
  return (
    <section id="accueil" style={{ background: "var(--ds-bg)", position: "relative", overflow: "hidden" }}>
      <div className="site-container" style={{
        paddingTop: "clamp(36px, 5vw, 68px)",
        paddingBottom: "clamp(48px, 6vw, 76px)",
      }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
          gap: "clamp(24px, 4vw, 54px)", alignItems: "center", position: "relative",
        }}>

          {/* Left Editorial Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            
            {/* Signature Brand Label */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18,
              background: "var(--ds-brand-light)", border: "1px solid rgba(103, 79, 245, 0.15)",
              borderRadius: "var(--ds-radius-full)", padding: "5px 14px"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ds-brand)", display: "block" }} />
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Matériaux de Staff &amp; Finition
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--ds-font-heading)",
              fontSize: "clamp(2.1rem, 4.8vw, 3.4rem)",
              fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1.12,
              letterSpacing: "-0.035em", marginBottom: 18,
            }}>
              Le bon matériau.<br />
              <span style={{ color: "var(--ds-brand)" }}>Pour le bon chantier.</span>
            </h1>

            <p style={{
              fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.92rem, 1.5vw, 1.05rem)",
              color: "var(--ds-text-secondary)", lineHeight: 1.7, maxWidth: 520,
              marginBottom: 32,
            }}>
              Gypse extra blanc d&apos;Égypte, Chaux vive pure de Dubaï et Filasse de Sisal du Kenya. Sélectionnés et importés directement pour les <strong>staffeurs, artisans et professionnels du BTP</strong> au Bénin.
            </p>

            {/* Clear Hierarchical CTAs */}
            <div className="hero-cta-group" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 36 }}>
              <WaBtn label="🟢 Demander un devis WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} />
              <button onClick={onSimulateur} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--ds-bg-subtle)", color: "var(--ds-text-primary)",
                border: "1px solid var(--ds-border-strong)", borderRadius: "var(--ds-radius-full)",
                padding: "13px 24px", fontFamily: "var(--ds-font-body)", fontSize: "0.9rem",
                fontWeight: 600, cursor: "pointer", transition: "all var(--ds-transition)"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ds-brand)"; e.currentTarget.style.color = "var(--ds-brand)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--ds-border-strong)"; e.currentTarget.style.color = "var(--ds-text-primary)" }}
              >
                <Calculator size={16} />
                <span>Calculer mes besoins</span>
              </button>
            </div>

            {/* Proof Numbers */}
            <div className="hero-stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
              paddingTop: 24, borderTop: "1px solid var(--ds-border)",
            }}>
              {[
                { val: "100%", label: "Zéro Fissure", sub: "Garantie séchage" },
                { val: "3", label: "Origines Usine", sub: "Égypte · Dubaï · Kenya" },
                { val: "24/48h", label: "Livraison Chantier", sub: "Grand Cotonou" },
                { val: "Stock", label: "Permanent", sub: "Cotonou & Calavi" },
              ].map(({ val, label, sub }) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.25rem, 2.3vw, 1.55rem)", fontWeight: 800, color: "var(--ds-brand)", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-text-primary)", marginTop: 4 }}>{label}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "var(--ds-text-tertiary)" }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Product Studio Hero */}
          <div className="hero-visual" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* Ambient Background Glow */}
            <div style={{
              position: "absolute", width: 280, height: 280, borderRadius: "50%",
              background: "rgba(103, 79, 245, 0.16)", filter: "blur(60px)", zIndex: 0
            }} />

            {/* Product Center Card with Floating Motion */}
            <div style={{
              position: "relative", zIndex: 2, width: "100%", maxWidth: 330,
              background: "white", borderRadius: "var(--ds-radius-2xl)",
              boxShadow: "var(--ds-shadow-hero)", overflow: "hidden",
              border: "1px solid rgba(103, 79, 245, 0.14)",
              animation: "heroFloat 6s ease-in-out infinite"
            }}>
              <div style={{ height: 280, background: "#111827", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
                <img src={imgSrc(imgGypse)} alt="Poudre de Gypse Marco 40 KG" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ padding: "18px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "var(--ds-text-primary)" }}>Gypse Marco 40 KG</span>
                  <span style={{ background: "var(--ds-brand)", color: "white", fontSize: "0.68rem", fontWeight: 700, padding: "3px 9px", borderRadius: "var(--ds-radius-full)" }}>N°1 Staff</span>
                </div>
                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.76rem", color: "var(--ds-text-secondary)", margin: 0 }}>
                  🇪🇬 Import Direct Égypte · Extra White · Prise 20–30 min
                </p>
              </div>
            </div>

            {/* Dynamic Ground Shadow */}
            <div style={{
              position: "absolute", bottom: -12, width: 220, height: 18,
              borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(103,79,245,0.4) 0%, rgba(0,0,0,0) 70%)",
              animation: "heroShadowPulse 6s ease-in-out infinite", zIndex: 1
            }} />

          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 2. Section « La Matière & Nos Produits » (Immersive & Technique) ─────────
function ProductsSection({ onDetail }: { onDetail: (p: Product) => void }) {
  return (
    <section id="produits" style={{ background: "var(--ds-bg-subtle)", padding: "clamp(48px, 6vw, 84px) 0" }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(36px, 5vw, 54px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Package size={14} /> La Matière Première à la Source
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            3 Matériaux Essentiels pour Vos Chantiers
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.98rem)", color: "var(--ds-text-secondary)", lineHeight: 1.65, margin: 0 }}>
            Découvrez la pureté, la texture et les performances techniques de chaque référence importée directement d&apos;usine.
          </p>
        </div>

        {/* 3 Material Showcases */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 4vw, 40px)" }}>
          {PRODUCTS.map((p, idx) => {
            const isReverse = idx % 2 !== 0
            return (
              <div key={p.id} className="product-row" style={{
                background: "white", borderRadius: "var(--ds-radius-2xl)",
                border: "1px solid var(--ds-border)", overflow: "hidden",
                display: "grid", gridTemplateColumns: isReverse ? "1.1fr 1fr" : "1fr 1.1fr",
                boxShadow: "var(--ds-shadow-sm)", transition: "all var(--ds-transition)"
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-lg)"; e.currentTarget.style.borderColor = "rgba(103,79,245,0.25)" }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-sm)"; e.currentTarget.style.borderColor = "var(--ds-border)" }}
              >
                
                {/* Visual Frame */}
                <div style={{
                  order: isReverse ? 2 : 1, background: "#f1f3f8", padding: "clamp(24px, 4vw, 36px)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  position: "relative"
                }}>
                  <img src={imgSrc(p.image)} alt={p.nom} style={{ maxHeight: 250, maxWidth: "100%", objectFit: "contain", transition: "transform var(--ds-transition)" }} />
                  <div style={{
                    marginTop: 14, background: "white", padding: "6px 14px", borderRadius: "var(--ds-radius-full)",
                    border: "1px solid var(--ds-border)", display: "flex", alignItems: "center", gap: 8,
                    boxShadow: "var(--ds-shadow-sm)"
                  }}>
                    <span style={{ fontSize: "0.8rem" }}>{p.drapeau}</span>
                    <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-text-primary)" }}>{p.origine}</span>
                    <span style={{ color: "var(--ds-text-tertiary)" }}>•</span>
                    <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-brand)", fontWeight: 700 }}>{p.conditionnement}</span>
                  </div>
                </div>

                {/* Content & Specs Frame */}
                <div style={{
                  order: isReverse ? 1 : 2, padding: "clamp(24px, 4vw, 40px)",
                  display: "flex", flexDirection: "column", justifyContent: "center", gap: 16
                }}>
                  <div>
                    <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-brand)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {p.categorie}
                    </span>
                    <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", fontWeight: 800, color: "var(--ds-text-primary)", margin: "4px 0 8px" }}>
                      {p.nom}
                    </h3>
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "var(--ds-text-secondary)", lineHeight: 1.65, margin: 0 }}>
                      {p.description}
                    </p>
                  </div>

                  {/* Argument Points */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="arg-grid">
                    {p.arguments.map(arg => (
                      <div key={arg} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                        <Check size={14} style={{ color: "var(--ds-conversion)", flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "var(--ds-text-secondary)", lineHeight: 1.4 }}>{arg}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", paddingTop: 8, borderTop: "1px solid var(--ds-border)" }}>
                    <WaBtn label="Commander / Demander le prix sur WhatsApp" url={waProduitMsg(p.nom, p.conditionnement)} small />
                    <button onClick={() => onDetail(p)} style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-brand)",
                      fontWeight: 700, display: "flex", alignItems: "center", gap: 4, padding: "8px 0"
                    }}>
                      <span>Fiche technique &amp; dosage</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

// ─── 3. Pourquoi Marco Staff BTP ? (Format Éditorial & Chiffres) ─────────────
function WhyUsSection() {
  const points = [
    {
      num: "01",
      titre: "Import Direct Usines",
      desc: "Égypte, Émirats Arabes Unis et Kenya. Zéro intermédiaire spéculatif pour vous garantir une fraîcheur de produit et un tarif grossiste direct.",
      badge: "Traçabilité Certifiée"
    },
    {
      num: "02",
      titre: "Formule Contrôlée pour le Staff",
      desc: "Granulométrie micronique (< 80µm) et temps de prise calibré (20-30 min). Garantie sans grumeau, sans surchauffe et zéro craquelure après séchage.",
      badge: "Zéro Fissuration"
    },
    {
      num: "03",
      titre: "Stock Permanent en Entrepôt",
      desc: "Dépôts physiques sécurisés à Cotonou et Abomey-Calavi approvisionnés en continu. Zéro rupture pour ne jamais bloquer vos équipes de pose.",
      badge: "Disponibilité Immédiate"
    },
    {
      num: "04",
      titre: "Livraison Directe Chantier 24-48h",
      desc: "Acheminement rapide et déchargement dans tout le Grand Cotonou et ses environs pour respecter scrupuleusement vos plannings de travaux.",
      badge: "Grand Cotonou"
    }
  ]

  return (
    <section id="pourquoi" style={{ background: "var(--ds-bg)", padding: "clamp(48px, 6vw, 84px) 0" }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(36px, 5vw, 54px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Award size={14} /> La Différence Marco Staff
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Pourquoi les Professionnels Nous Font Confiance ?
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.98rem)", color: "var(--ds-text-secondary)", lineHeight: 1.65, margin: 0 }}>
            Une exigence industrielle et logistique pensée pour les maîtres staffeurs et conducteurs de travaux du Bénin.
          </p>
        </div>

        {/* Editorial Rows (Not Generic Cards) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 3.5vw, 40px)" }} className="why-editorial-grid">
          {points.map(({ num, titre, desc, badge }) => (
            <div key={num} style={{
              padding: "clamp(20px, 3vw, 32px)", borderRadius: "var(--ds-radius-xl)",
              border: "1px solid var(--ds-border)", background: "var(--ds-bg-subtle)",
              display: "flex", flexDirection: "column", gap: 12,
              transition: "all var(--ds-transition)"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ds-brand)"; e.currentTarget.style.background = "white" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--ds-border)"; e.currentTarget.style.background = "var(--ds-bg-subtle)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "var(--ds-brand)", lineHeight: 1 }}>
                  {num}
                </span>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "var(--ds-brand)", background: "var(--ds-brand-light)", padding: "3px 10px", borderRadius: "var(--ds-radius-full)" }}>
                  {badge}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.15rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: 0 }}>
                {titre}
              </h3>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "var(--ds-text-secondary)", lineHeight: 1.65, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── 4. De l'Approvisionnement au Chantier (Timeline Connectée) ───────────────
function SupplyChainSection() {
  const steps = [
    { num: "01", titre: "Import Direct Usine", desc: "Contrôles stricts de pureté et d'emballage scellé à l'embarquement (Égypte, Dubaï, Kenya)." },
    { num: "02", titre: "Stockage Protégé", desc: "Entrepôts ventilés garantissant zéro humidité préalable pour le gypse et la chaux." },
    { num: "03", titre: "Préparation Express", desc: "Conditionnement par lots et contrôle qualité des sacs avant tout départ." },
    { num: "04", titre: "Livraison Chantier", desc: "Acheminement direct 24–48h dans tout le Grand Cotonou pour respecter vos plannings." }
  ]

  return (
    <section id="logistique" style={{ background: "var(--ds-dark-bg)", color: "white", padding: "clamp(54px, 7vw, 90px) 0" }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(36px, 5vw, 60px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-conversion)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "rgba(16, 185, 129, 0.15)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Truck size={14} /> Maîtrise Logistique Industrielle
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
            fontWeight: 800, color: "white", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            De l&apos;Approvisionnement à Votre Chantier
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.98rem)", color: "var(--ds-dark-text-muted)", lineHeight: 1.65, margin: 0 }}>
            Une chaîne logistique éprouvée garantissant la fraîcheur et la disponibilité continue de vos matériaux.
          </p>
        </div>

        {/* Connected Horizontal Timeline on Desktop / Vertical on Mobile */}
        <div className="timeline-container" style={{ position: "relative" }}>
          
          {/* Connector Line (Desktop) */}
          <div className="timeline-line-desktop" style={{
            position: "absolute", top: 24, left: "10%", right: "10%", height: 2,
            background: "linear-gradient(90deg, #674FF5 0%, #10B981 100%)", opacity: 0.6, zIndex: 0
          }} />

          <div className="timeline-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px, 2.5vw, 28px)", position: "relative", zIndex: 1
          }}>
            {steps.map(({ num, titre, desc }) => (
              <div key={num} className="timeline-step" style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14
              }}>
                {/* Node circle */}
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: "var(--ds-dark-surface)", border: "2px solid var(--ds-brand)",
                  boxShadow: "0 0 16px rgba(103,79,245,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "white"
                }}>
                  {num}
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "white", margin: "0 0 6px" }}>
                    {titre}
                  </h3>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "var(--ds-dark-text-muted)", lineHeight: 1.55, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

// ─── 5. Simulateur Signature de Chantier (⭐ The WOW Moment ⭐) ──────────────
function SimulateurSection() {
  const [surface, setSurface] = useState(80)
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
    <section id="simulateur" style={{ background: "var(--ds-bg)", padding: "clamp(54px, 7vw, 90px) 0" }}>
      <div className="site-container">
        
        <div className="simu-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1.25fr",
          gap: "clamp(28px, 4.5vw, 54px)", alignItems: "center"
        }}>
          
          {/* Left Context */}
          <div>
            <div style={{
              width: 48, height: 48, borderRadius: "var(--ds-radius-lg)",
              background: "var(--ds-brand-light)", display: "flex", alignItems: "center",
              justifyContent: "center", marginBottom: 16, color: "var(--ds-brand)"
            }}>
              <Calculator size={24} />
            </div>
            
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Outil Métier Interactif
            </span>
            
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em", marginTop: 8, marginBottom: 16 }}>
              Combien faut-il pour votre chantier ?
            </h2>
            
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.88rem, 1.4vw, 1rem)", color: "var(--ds-text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
              Faites glisser le curseur pour calculer instantanément les volumes exacts nécessaires en <strong>Gypse Marco 40kg</strong>, <strong>Filasse Sisal</strong> et <strong>Chaux Vive</strong> selon les ratios réels des staffeurs.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { text: "Ratios calibrés sur le terrain (zéro gaspillage de matière)" },
                { text: "Calcul décomposé : Gypse 40kg + Sisal + Chaux" },
                { text: "Envoi immédiat sur WhatsApp pour confirmation et tarif grossiste" },
              ].map(({ text }) => (
                <div key={text} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--ds-conversion)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "var(--ds-text-secondary)", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cockpit / Mini-App */}
          <div style={{
            background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-2xl)",
            border: "1.5px solid var(--ds-border)", padding: "clamp(22px, 4vw, 36px)",
            boxShadow: "var(--ds-shadow-lg)"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              
              {/* Étape 1 : Type d'ouvrage */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-text-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                  01 · Type d&apos;ouvrage :
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button type="button" onClick={() => setTypeOuvrage("plafond")} style={{
                    padding: "12px 14px", borderRadius: "var(--ds-radius-lg)",
                    fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", fontWeight: 700,
                    border: `2px solid ${typeOuvrage === "plafond" ? "var(--ds-brand)" : "var(--ds-border)"}`,
                    background: typeOuvrage === "plafond" ? "var(--ds-brand-light)" : "white",
                    color: typeOuvrage === "plafond" ? "var(--ds-brand)" : "var(--ds-text-secondary)",
                    cursor: "pointer", transition: "all var(--ds-transition)"
                  }}>
                    🏢 Plafonds Staff
                  </button>
                  <button type="button" onClick={() => setTypeOuvrage("corniche")} style={{
                    padding: "12px 14px", borderRadius: "var(--ds-radius-lg)",
                    fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", fontWeight: 700,
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
                  <label style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ds-text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    02 · Superficie :
                  </label>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "var(--ds-brand)" }}>
                    {surface} m²
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button onClick={() => setSurface(s => Math.max(10, s - 10))} aria-label="Moins 10m²"
                    style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--ds-border-strong)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)" }}>
                    <Minus size={16} />
                  </button>
                  <input type="range" min={10} max={500} step={5} value={surface}
                    onChange={e => setSurface(Number(e.target.value))}
                    style={{ flex: 1, accentColor: "var(--ds-brand)", height: 6, cursor: "pointer" }}
                  />
                  <button onClick={() => setSurface(s => Math.min(500, s + 10))} aria-label="Plus 10m²"
                    style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--ds-border-strong)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ds-text-secondary)" }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Étape 3 : Estimation Chantier Breakdown */}
              <div style={{
                background: "white", borderRadius: "var(--ds-radius-xl)",
                border: "1.5px solid var(--ds-border)", padding: "18px",
                boxShadow: "var(--ds-shadow-sm)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid var(--ds-border)" }}>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 800, color: "var(--ds-text-primary)", textTransform: "uppercase" }}>
                    Estimation Chantier
                  </span>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-brand)", fontWeight: 700 }}>
                    Calcul basé sur {surface} m²
                  </span>
                </div>

                <div className="simu-results-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center" }}>
                  <div>
                    <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Gypse Marco</div>
                    <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.6rem", fontWeight: 800, color: "var(--ds-brand)", margin: "2px 0" }}>{nbSacsGypse}</div>
                    <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.70rem", color: "var(--ds-text-secondary)" }}>sacs (40kg)</div>
                  </div>
                  <div style={{ borderLeft: "1px solid var(--ds-border)", borderRight: "1px solid var(--ds-border)" }}>
                    <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Filasse Sisal</div>
                    <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.6rem", fontWeight: 800, color: "var(--ds-conversion)", margin: "2px 0" }}>{kgFilasse}</div>
                    <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.70rem", color: "var(--ds-text-secondary)" }}>kg (Kenya)</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)", fontWeight: 600 }}>Chaux Vive</div>
                    <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.6rem", fontWeight: 800, color: "var(--ds-text-primary)", margin: "2px 0" }}>{nbSacsChaux}</div>
                    <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.70rem", color: "var(--ds-text-secondary)" }}>sacs (Dubaï)</div>
                  </div>
                </div>
              </div>

              <WaBtn label="Recevoir cette estimation sur WhatsApp" url={msgSimu} full />

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

// ─── 6. Usages Métier & Réalisations (Composition Éditoriale) ─────────────────
function ApplicationsSection() {
  const apps = [
    {
      titre: "Plafonds Suspendus & Staff Lissé",
      produit: "Poudre de Gypse Marco 40 KG",
      desc: "Blancheur éclatante et surface plane sans défaut pour salons, halls et résidences haut de gamme.",
      icon: Building2
    },
    {
      titre: "Corniches, Moulures & Gorges Lumineuses",
      produit: "Gypse Marco + Filasse Sisal Kenya",
      desc: "Armature végétale longue conférant une haute résistance mécanique et la netteté des arêtes fines.",
      icon: Layers
    },
    {
      titre: "Enduits Protecteurs & Chaulage Assainissant",
      produit: "Chaux Vive Dubaï (White Lime)",
      desc: "Assainissement naturel anti-salpêtre et haute respirabilité contre l'humidité côtière du Bénin.",
      icon: Sparkles
    }
  ]

  return (
    <section id="usages" style={{ background: "var(--ds-bg-subtle)", padding: "clamp(48px, 6vw, 84px) 0" }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(36px, 5vw, 54px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Hammer size={14} /> Usages &amp; Métier
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Des Matériaux pour Créer &amp; Sublimer
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.98rem)", color: "var(--ds-text-secondary)", lineHeight: 1.65, margin: 0 }}>
            Du faux-plafond suspendu aux corniches d&apos;apparat, nos références répondent aux exigences des artisans staffeurs.
          </p>
        </div>

        <div className="apps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {apps.map(({ titre, produit, desc, icon: Icon }) => (
            <div key={titre} style={{
              background: "white", borderRadius: "var(--ds-radius-2xl)",
              border: "1px solid var(--ds-border)", padding: "clamp(24px, 3.5vw, 32px)",
              display: "flex", flexDirection: "column", gap: 14,
              boxShadow: "var(--ds-shadow-sm)", transition: "all var(--ds-transition)"
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-md)"; e.currentTarget.style.borderColor = "rgba(103,79,245,0.3)" }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-sm)"; e.currentTarget.style.borderColor = "var(--ds-border)" }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "var(--ds-radius-lg)",
                background: "var(--ds-brand-light)", color: "var(--ds-brand)",
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

// ─── 7. Preuve Sociale (Témoignage Dominant) ──────────────────────────────────
function ReassuranceSection() {
  return (
    <section id="temoignages" style={{ background: "var(--ds-bg)", padding: "clamp(48px, 6vw, 84px) 0" }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(36px, 5vw, 54px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 12,
            background: "var(--ds-brand-light)", padding: "6px 14px", borderRadius: "var(--ds-radius-full)"
          }}>
            <Star size={14} fill="var(--ds-brand)" /> Retours de Chantiers Réels
          </span>
          <h2 style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
            fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 12
          }}>
            Approuvé par les Maîtres Staffeurs
          </h2>
        </div>

        {/* Master Dominant Testimonial */}
        <div style={{
          background: "linear-gradient(135deg, #0A0F1D 0%, #131B2E 100%)", color: "white",
          borderRadius: "var(--ds-radius-2xl)", padding: "clamp(32px, 5vw, 48px)",
          marginBottom: 24, boxShadow: "var(--ds-shadow-lg)", border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#F59E0B" stroke="#F59E0B" />)}
          </div>
          <p style={{
            fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
            fontWeight: 600, lineHeight: 1.5, margin: "0 0 24px", color: "white"
          }}>
            &ldquo;Le Gypse Marco est sans équivalent au Bénin. La pâte se gâche sans aucun grumeau, prend en 25 minutes sans surchauffer et ne fait aucune fissure au séchage. Mes faux-plafonds sont validés du premier coup par les architectes.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--ds-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem" }}>
              KB
            </div>
            <div>
              <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "white" }}>Kouassi Bernard</div>
              <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "var(--ds-dark-text-muted)" }}>Maître Staffeur Professionnel · Cotonou</div>
            </div>
          </div>
        </div>

        {/* 2 Secondary Endorsements */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="secondary-testimonials">
          {[
            {
              nom: "Adéola Moussa",
              role: "Conducteur de Travaux BTP · Abomey-Calavi",
              texte: "La réactivité sur WhatsApp est exemplaire. On envoie la surface en m², le devis est confirmé et la livraison arrive directement sur chantier à Calavi sans retard."
            },
            {
              nom: "Fatou Diallo",
              role: "Architecte d'Intérieur · Cotonou",
              texte: "Pour les gorges lumineuses et corniches travaillées de nos résidences, nous exigeons le Gypse Marco et la Chaux Vive de Dubaï. La finition est prête à peindre sans reprise."
            }
          ].map(({ nom, role, texte }) => (
            <div key={nom} style={{
              background: "var(--ds-bg-subtle)", borderRadius: "var(--ds-radius-xl)",
              border: "1px solid var(--ds-border)", padding: "20px 24px"
            }}>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "var(--ds-text-secondary)", lineHeight: 1.6, margin: "0 0 12px", fontStyle: "italic" }}>
                &ldquo;{texte}&rdquo;
              </p>
              <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.85rem", fontWeight: 700, color: "var(--ds-text-primary)" }}>{nom}</div>
              <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "var(--ds-text-tertiary)" }}>{role}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── 8. Section CTA Final « Piece Join » (Élévation Commerciale) ──────────────
function PieceJoinSection({ onSimulateur }: { onSimulateur: () => void }) {
  return (
    <section style={{
      background: "var(--ds-bg-subtle)", padding: "clamp(54px, 7vw, 84px) 0",
      position: "relative", overflow: "hidden"
    }}>
      
      {/* Background Glowing Ambiance */}
      <div style={{
        position: "absolute", top: "50%", left: "8%", width: 360, height: 360,
        borderRadius: "50%", background: "rgba(103, 79, 245, 0.25)",
        filter: "blur(90px)", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", top: "50%", right: "6%", width: 320, height: 320,
        borderRadius: "50%", background: "rgba(124, 58, 237, 0.20)",
        filter: "blur(80px)", transform: "translate(0, -50%)", pointerEvents: "none", zIndex: 0
      }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        
        <div className="piece-join-card" style={{
          borderRadius: "clamp(20px, 3vw, 32px)", overflow: "hidden",
          display: "grid", gridTemplateColumns: "1.15fr 0.85fr",
          boxShadow: "0 20px 60px rgba(103,79,245,0.18), 0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid rgba(255,255,255,0.8)", backdropFilter: "blur(20px)",
        }}>
          
          {/* Left Block: Deep Violet Gradient */}
          <div className="piece-join-left" style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #674FF5 50%, #5B21B6 100%)",
            padding: "clamp(36px, 5vw, 54px) clamp(24px, 4vw, 44px)",
            display: "flex", flexDirection: "column", justifyContent: "center", color: "white"
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700,
              color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.1em",
              marginBottom: 14, background: "rgba(255,255,255,0.15)", padding: "4px 12px",
              borderRadius: "var(--ds-radius-full)", width: "fit-content"
            }}>
              Partenaire BTP &amp; Finition
            </span>
            <h2 style={{
              fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
              fontWeight: 800, lineHeight: 1.18, letterSpacing: "-0.035em", margin: 0, color: "white"
            }}>
              Votre Prochain Chantier Commence Ici.
            </h2>
          </div>

          {/* Right Block: Clean White */}
          <div className="piece-join-right" style={{
            background: "rgba(255, 255, 255, 0.96)",
            padding: "clamp(32px, 4.5vw, 48px) clamp(24px, 3.5vw, 40px)",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 16
          }}>
            <div>
              <h3 style={{
                fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                fontWeight: 800, color: "#0F172A", lineHeight: 1.25, margin: "0 0 8px"
              }}>
                Besoin d&apos;un matériau, d&apos;un prix ou d&apos;une estimation ?
              </h3>
              <p style={{
                fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "#475569", lineHeight: 1.55, margin: 0
              }}>
                Notre équipe commerciale vous répond directement sur WhatsApp avec confirmation du stock et conditions de livraison.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
              <WaBtn label="🟢 Parler à Marco Staff sur WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes matériaux de staff.`)} full />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#94A3B8" }}>
                  ⚡ Réponse rapide sous 15 à 30 min
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

// ─── 9. FAQ Commerciale (Accordéon Accessible ARIA) ───────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" style={{ background: "var(--ds-bg)", padding: "clamp(48px, 6vw, 84px) 0" }}>
      <div className="site-container" style={{ maxWidth: 880 }}>
        
        <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 44px)" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.75rem",
            fontWeight: 700, color: "var(--ds-brand)", textTransform: "uppercase",
            letterSpacing: "0.1em", marginBottom: 10,
            background: "var(--ds-brand-light)", padding: "5px 12px", borderRadius: "var(--ds-radius-full)"
          }}>
            <HelpCircle size={14} /> Questions &amp; Réponses Commerciales
          </span>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.2vw, 2.3rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.025em", margin: "6px 0 10px" }}>
            Tout ce que vous devez savoir avant de commander
          </h2>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)", color: "var(--ds-text-secondary)" }}>
            Disponibilité des stocks, conditions de livraison sur chantier et tarifs grossistes
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
                <button
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i) } }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  style={{
                    width: "100%", padding: "18px 20px", display: "flex",
                    alignItems: "center", justifyContent: "space-between", gap: 16,
                    background: "none", border: "none", cursor: "pointer", textAlign: "left"
                  }}
                >
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "var(--ds-text-primary)", lineHeight: 1.35 }}>
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
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    style={{ padding: "0 20px 18px", borderTop: "1px solid var(--ds-border)", paddingTop: 14 }}
                  >
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "var(--ds-text-secondary)", lineHeight: 1.7, margin: 0 }}>
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

// ─── 10. Fiche Produit Détaillée ─────────────────────────────────────────────
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
              background: "#f1f3f8", padding: 32, display: "flex", alignItems: "center", justifyContent: "center",
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
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Diminuer quantité" style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "var(--ds-brand)", minWidth: 32, textAlign: "center" }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} aria-label="Augmenter quantité" style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--ds-shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)" }}
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

// ─── 11. Footer Officiel 2026 ────────────────────────────────────────────────
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
                { label: "Matière & Produits", id: "produits" },
                { label: "Pourquoi Marco ?", id: "pourquoi" },
                { label: "Approvisionnement", id: "logistique" },
                { label: "Simulateur Chantier", id: "simulateur" },
                { label: "Usages Métier", id: "usages" },
                { label: "Avis & Témoignages", id: "temoignages" },
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
              Qualité Certifiée Direct Usine
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

// ─── Styles Responsive & Breakpoints ─────────────────────────────────────────
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
  .why-editorial-grid { grid-template-columns: 1fr 1fr; }
  .apps-grid { grid-template-columns: repeat(3, 1fr); }
  .simu-grid { grid-template-columns: 1fr 1.25fr; }
  .fiche-grid { grid-template-columns: 1.1fr 1fr; }
  .connexes-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.2fr; }
  .spec-row { grid-template-columns: 1fr 1.5fr; }
  .piece-join-card { grid-template-columns: 1.15fr 0.85fr; }

  /* Tablette (1024px et inférieur) */
  @media (max-width: 1024px) {
    .apps-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .simu-grid { grid-template-columns: 1fr !important; }
    .piece-join-card { grid-template-columns: 1fr !important; }
    .timeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .timeline-line-desktop { display: none !important; }
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
      margin-top: 16px !important;
    }
    .hero-visual > div:first-child {
      width: 100% !important;
      max-width: 290px !important;
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

    .product-row { grid-template-columns: 1fr !important; }
    .product-row > div { order: initial !important; }
    .why-editorial-grid { grid-template-columns: 1fr !important; }
    .timeline-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
    .timeline-step { flex-direction: row !important; text-align: left !important; align-items: flex-start !important; }
    .apps-grid { grid-template-columns: 1fr !important; }
    .secondary-testimonials { grid-template-columns: 1fr !important; }
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
    .arg-grid { grid-template-columns: 1fr !important; }
    .simu-results-grid { grid-template-columns: 1fr !important; }
    .simu-results-grid > div {
      border: none !important;
      border-bottom: 1px solid var(--ds-border) !important;
      padding-bottom: 10px !important;
    }
    .simu-results-grid > div:last-child { border-bottom: none !important; }
  }
`

// ─── Main App Entry ──────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<"home" | "product">("home")
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
            <HeroSection onSimulateur={() => handleNavigate("simulateur")} />
            <ProductsSection onDetail={handleDetail} />
            <WhyUsSection />
            <SupplyChainSection />
            <SimulateurSection />
            <ApplicationsSection />
            <ReassuranceSection />
            <PieceJoinSection onSimulateur={() => handleNavigate("simulateur")} />
            <FAQSection />
          </main>
        ) : (
          selectedProduct && <FicheProduit product={selectedProduct} onBack={handleBack} onDetail={handleDetail} />
        )}

        <Footer onNavigate={handleNavigate} />

        {/* Bouton Retour en Haut (Scroll-To-Top) Accessible */}
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
              color: "var(--ds-text-primary)",
              border: "1px solid var(--ds-border)",
              boxShadow: "var(--ds-shadow-md)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all var(--ds-transition)"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "var(--ds-shadow-lg)"
              e.currentTarget.style.borderColor = "var(--ds-brand)"
              e.currentTarget.style.color = "var(--ds-brand)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "var(--ds-shadow-md)"
              e.currentTarget.style.borderColor = "var(--ds-border)"
              e.currentTarget.style.color = "var(--ds-text-primary)"
            }}
          >
            <ArrowUp size={18} />
          </button>
        )}

        {/* Mobile Floating Action Dock (Thumb Conversion Zone) */}
        <div className="mobile-dock" style={{
          position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 999,
          background: "rgba(10, 15, 29, 0.95)", backdropFilter: "blur(14px)",
          borderRadius: "var(--ds-radius-2xl)", padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          boxShadow: "0 12px 36px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ds-conversion)", display: "block", animation: "pulseDot 2s infinite" }} />
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>Dépôts Ouverts</span>
          </div>
          <WaBtn label="WhatsApp Direct" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} small />
        </div>

      </div>
    </>
  )
}
