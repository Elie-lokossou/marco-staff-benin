import { useState, useCallback, useEffect } from "react"
import {
  MessageCircle, Phone, MapPin, Menu, X, ChevronRight,
  ArrowLeft, CheckCircle2, Star, Package,
  Clock, Calculator, ShieldCheck, Truck, Award, ChevronDown,
  Plus, Minus, ArrowRight, HelpCircle, Layers, Sparkles,
  ArrowUp, Building2, Warehouse, Hammer, ChevronLeft, Download
} from "lucide-react"
import imgGypse from "@/imports/photo2.jpeg"
import imgChaux from "@/imports/photo1.jpeg"
import imgFilasse from "@/imports/filace.jpeg"
import imgWorker from "@/imports/banner_worker.png"

// ─── Constantes Commerciales & Liens Directs ─────────────────────────────────
const WA_NUMBER = "2290197463209"
const PHONE_DISPLAY = "+229 01 97 46 32 09"
const COMPANY_NAME = "MARCO STAFF BTP"
const COMPANY_SUBTITLE = "MATÉRIAUX DE FINITION"

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
  origineBadge: string
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
    nom: "Poudre de Gypse Marco Extra Blanche 40 KG",
    nomCourt: "Gypse Marco 40kg",
    categorie: "Gypse & Plâtre de Moulage",
    origine: "Égypte",
    origineBadge: "ORIGINE ÉGYPTE",
    drapeau: "🇪🇬",
    badge: "Extra White · Import Égypte",
    conditionnement: "Sac scellé de 40 KG",
    image: imgGypse,
    description: "Poudre de gypse de moulage extra blanche importée directement d'Égypte. Granulométrie micronique ultra-fine pour un gâchage fluide sans grumeaux, une prise régulière et une finition miroir sans aucune craquelure.",
    arguments: [
      "Blancheur éclatante 100% sans ajout",
      "Prise régulière (20 – 30 min)",
      "Finesse supérieure pour staff et moulures",
      "Sac scellé de 40 KG résistant"
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
    nom: "Chaux Vive Marco Première Qualité",
    nomCourt: "Chaux Vive Marco",
    categorie: "Chaux & Liants Protecteurs",
    origine: "Dubaï (UAE)",
    origineBadge: "ORIGINE DUBAÏ (UAE)",
    drapeau: "🇦🇪",
    badge: "Import Dubaï (UAE)",
    conditionnement: "Sac étanche de 40 KG",
    image: imgChaux,
    description: "White Lime pure de première qualité importée de Dubaï (Oki General Trading). Pureté calcique exceptionnelle et haute réactivité pour des enduits respirants, étanches et naturellement anti-salpêtre.",
    arguments: [
      "Pureté calcique > 92%",
      "Excellente perméabilité à la vapeur",
      "Idéale pour mortier et enduit",
      "Sac durable étanche de 40 KG"
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
    origineBadge: "ORIGINE KENYA",
    drapeau: "🇰🇪",
    badge: "Produce of Kenya · 100% Pur",
    conditionnement: "Balle pressée - 25 / 50 KG",
    image: imgFilasse,
    description: "Fibres végétales de sisal pur sélectionnées et peignées au Kenya. Fibres longues d'une résistance mécanique extrême à la traction, garantissant l'armature indestructible de tous vos éléments en staff.",
    arguments: [
      "Fibres longues (20 à 120 cm)",
      "Résistance et tenue renforcées",
      "Parfaite pour gros œuvres staff",
      "Balle pressée ~25 / 50 KG"
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
    q: "Quels sont les statuts de la Chaux Vive de Dubaï par rapport à une chaux locale ?",
    a: "La White Lime Marco importée de Dubaï dispose d'une pureté calcique certifiée CaO > 92%. Elle garantit une haute réactivité thermique, un pouvoir bactéricide et antifongique naturel, protégeant définitivement vos murs contre le salpêtre et l'humidité côtière."
  },
  {
    q: "Le Gypse Marco 40 KG est-il garanti sans croquants et sans grumeaux ?",
    a: "Oui, à 100%. Grâce à sa granulométrie micronique (< 80 microns) et à son procédé d'import direct d'Égypte, la poudre se gâche de manière fluide sans formation de grumeaux. La prise de 20 à 30 minutes assure une planéité parfaite sans fissuration."
  },
  {
    q: "Comment passer commande ou demander un devis proforma ?",
    a: "Vous pouvez cliquer sur n'importe quel bouton WhatsApp du site ou utiliser le simulateur de chantier intégré. Nos conseillers vous confirment instantanément le stock disponible et les conditions de livraison."
  },
  {
    q: "Proposez-vous des tarifs dégressifs pour les grossistes et gros chantiers ?",
    a: "Absolument. Nous appliquons des remises sur volume dès 20 sacs de Gypse Marco, 5 sacs de Chaux Vive ou 1 balle complète de Filasse Sisal. Contactez notre équipe sur WhatsApp avec votre métré pour obtenir une proposition adaptée."
  },
  {
    q: "Livrez-vous en dehors du Grand Cotonou ?",
    a: "Oui, nous organisons l'expédition de commandes complètes vers Parakou, Bohicon, Natitingou et toutes les communes du Bénin via nos transporteurs partenaires agréés."
  }
]

// ─── Bouton WhatsApp Vert Officiel ───────────────────────────────────────────
function WaBtn({ label = "WhatsApp", url, small = false, full = false, style = {} }: {
  label?: string; url: string; small?: boolean; full?: boolean; style?: React.CSSProperties
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: small ? 6 : 8, background: "#10B981", color: "white",
      fontFamily: "var(--ds-font-body)", fontSize: small ? "0.82rem" : "0.9rem",
      fontWeight: 600, padding: small ? "9px 18px" : "13px 24px",
      borderRadius: "9999px", textDecoration: "none",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)", width: full ? "100%" : undefined,
      whiteSpace: "nowrap", ...style
    }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#059669"
        e.currentTarget.style.transform = "translateY(-1px)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "#10B981"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      <MessageCircle size={small ? 16 : 18} />
      <span>{label}</span>
    </a>
  )
}

// ─── Header & Top Announcement Bar ───────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div style={{ background: "#0A0F1D", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="site-container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, flexWrap: "wrap", fontSize: "0.72rem", color: "#94A3B8", fontFamily: "var(--ds-font-body)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "white", fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            Approvisionnement direct
          </span>
          <span style={{ color: "#64748B" }}>•</span>
          <span>Égypte · Dubaï · Kenya</span>
          <span style={{ color: "#64748B" }}>•</span>
          <span>Stock permanent</span>
          <span style={{ color: "#64748B" }}>•</span>
          <span>Livraison 24/48h</span>
          <span style={{ color: "#64748B" }}>•</span>
          <span style={{ color: "#A78BFA" }}>Qualité certifiée</span>
        </div>
        <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#10B981", fontWeight: 700 }}>
          <Phone size={11} />
          <span>{PHONE_DISPLAY}</span>
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
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Accueil", id: "accueil" },
    { label: "Nos Matériaux", id: "produits" },
    { label: "Simulateur", id: "simulateur" },
    { label: "À Propos", id: "pourquoi" },
    { label: "Garanties", id: "chaine" },
    { label: "Avis", id: "avis" },
    { label: "FAQ", id: "faq" },
  ]

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: isScrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid #E2E8F0",
      boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.25s ease"
    }}>
      <div className="site-container" style={{
        height: isScrolled ? 62 : 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "height 0.25s ease"
      }}>
        {/* Logo */}
        <div onClick={() => onNavigate("accueil")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "10px",
            background: "#674FF5", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
            boxShadow: "0 4px 12px rgba(103,79,245,0.35)",
          }}>
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.1rem", fontWeight: 800, color: "white" }}>M</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
              {COMPANY_NAME}
            </div>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.58rem", fontWeight: 600, color: "#674FF5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {COMPANY_SUBTITLE}
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 22, alignItems: "center" }} className="nav-desktop">
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "0.84rem",
                fontWeight: 600, color: id === "accueil" ? "#674FF5" : "#475569",
                textDecoration: "none", transition: "color 0.2s ease"
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "#674FF5" }}
              onMouseLeave={e => { if (id !== "accueil") (e.target as HTMLElement).style.color = "#475569" }}
            >{label}</a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="nav-desktop">
          <WaBtn label="Demander un devis" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mon chantier.`)} small />
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 8, color: "#0F172A", flexShrink: 0
        }} className="nav-mobile-toggle">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          borderTop: "1px solid #E2E8F0",
          padding: "16px 20px 24px",
          display: "flex", flexDirection: "column", gap: 14,
          background: "#FFFFFF"
        }}>
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); onNavigate(id); setOpen(false) }}
              style={{
                fontFamily: "var(--ds-font-body)", fontSize: "0.95rem",
                fontWeight: 600, color: "#0F172A",
                textDecoration: "none", padding: "8px 0",
                borderBottom: "1px solid #F1F5F9"
              }}
            >{label}</a>
          ))}
          <div style={{ paddingTop: 6 }}>
            <WaBtn label="Demander un devis sur WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis.`)} full />
          </div>
        </div>
      )}
    </header>
  )
}

// ─── 1. Hero Section (Industrial Editorial Dark Navy & Purple Studio) ────────
function HeroSection({ onSimulateur }: { onSimulateur: () => void }) {
  return (
    <section id="accueil" style={{
      background: "radial-gradient(ellipse 80% 60% at 75% 45%, #251B5A 0%, #0D1226 60%, #080C1A 100%)",
      position: "relative", overflow: "hidden", color: "white"
    }}>
      
      {/* Background glow effects */}
      <div style={{
        position: "absolute", top: "20%", right: "15%", width: 450, height: 450,
        borderRadius: "50%", background: "rgba(103, 79, 245, 0.35)",
        filter: "blur(110px)", pointerEvents: "none"
      }} />

      <div className="site-container" style={{
        paddingTop: "clamp(40px, 6vw, 72px)",
        paddingBottom: "clamp(48px, 6vw, 76px)",
        position: "relative", zIndex: 1
      }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
          gap: "clamp(24px, 4vw, 48px)", alignItems: "center"
        }}>

          {/* Left Column */}
          <div>
            <div style={{
              fontFamily: "var(--ds-font-body)", fontSize: "0.72rem",
              fontWeight: 700, color: "#C4B5FD", letterSpacing: "0.14em",
              textTransform: "uppercase", marginBottom: 16
            }}>
              MATÉRIAUX DE FINITION PROFESSIONNELS
            </div>

            <h1 style={{
              fontFamily: "var(--ds-font-heading)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              fontWeight: 800, color: "white", lineHeight: 1.12,
              letterSpacing: "-0.03em", marginBottom: 18,
            }}>
              Le bon matériau.<br />
              Pour le <span style={{ color: "#8B5CF6" }}>bon chantier.</span>
            </h1>

            <p style={{
              fontFamily: "var(--ds-font-body)", fontSize: "clamp(0.9rem, 1.4vw, 1.02rem)",
              color: "#CBD5E1", lineHeight: 1.65, maxWidth: 520,
              marginBottom: 32,
            }}>
              Gypse d&apos;Égypte, Chaux de Dubaï et Filasse du Kenya.<br />
              Sélectionnés pour les professionnels du staff et de la finition au Bénin.
            </p>

            {/* CTAs */}
            <div className="hero-cta-group" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 40 }}>
              <WaBtn label="Demander un devis WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} />
              <button onClick={onSimulateur} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(15, 23, 42, 0.7)", color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "9999px", padding: "13px 24px",
                fontFamily: "var(--ds-font-body)", fontSize: "0.9rem",
                fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.7)"
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
                }}
              >
                <span>Calculer mes besoins</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Metrics Row */}
            <div className="hero-stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
              paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.12)"
            }}>
              {[
                { val: "100%", label: "Qualité certifiée" },
                { val: "3", label: "Origines contrôlées" },
                { val: "24/48h", label: "Livraison rapide" },
                { val: "Stock", label: "Permanent" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", fontWeight: 800, color: "white", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#94A3B8", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column – Visual 3D Product & Social Proof */}
          <div className="hero-visual" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            {/* Stamp Badge */}
            <div style={{
              position: "absolute", top: -10, left: "15%", zIndex: 10,
              width: 54, height: 54, borderRadius: "50%",
              background: "#FFFFFF", color: "#674FF5",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)", textAlign: "center", padding: 4
            }}>
              <span style={{ fontSize: "0.45rem", fontWeight: 800, textTransform: "uppercase", lineHeight: 1 }}>MEILLEUR PRIX</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "#674FF5", lineHeight: 1 }}>PRO</span>
              <span style={{ fontSize: "0.42rem", fontWeight: 700, color: "#475569" }}>CERTIFIÉ</span>
            </div>

            {/* Bag Composition */}
            <div style={{
              position: "relative", width: "100%", maxWidth: 380,
              display: "flex", justifyContent: "center", alignItems: "center"
            }}>
              <img src={imgSrc(imgGypse)} alt="Poudre de Gypse Marco 40 KG" style={{
                maxHeight: 330, width: "auto", objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))"
              }} />
            </div>

            {/* 3 Right Floating Badges */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 8,
              position: "absolute", right: 0, top: "15%", zIndex: 5
            }} className="hero-floating-pills">
              <div style={{
                background: "rgba(255, 255, 255, 0.92)", color: "#0F172A",
                padding: "6px 14px", borderRadius: "10px", fontSize: "0.75rem",
                fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
              }}>
                <span>🇪🇬</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.74rem" }}>Gypse d&apos;Égypte</div>
                  <div style={{ fontSize: "0.62rem", color: "#64748B" }}>Extra fin · Blanc naturel</div>
                </div>
              </div>
              <div style={{
                background: "rgba(255, 255, 255, 0.92)", color: "#0F172A",
                padding: "6px 14px", borderRadius: "10px", fontSize: "0.75rem",
                fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
              }}>
                <span>🇦🇪</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.74rem" }}>Chaux de Dubaï</div>
                  <div style={{ fontSize: "0.62rem", color: "#64748B" }}>Premium Quality</div>
                </div>
              </div>
              <div style={{
                background: "rgba(255, 255, 255, 0.92)", color: "#0F172A",
                padding: "6px 14px", borderRadius: "10px", fontSize: "0.75rem",
                fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
              }}>
                <span>🇰🇪</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.74rem" }}>Filasse du Kenya</div>
                  <div style={{ fontSize: "0.62rem", color: "#64748B" }}>Fibre longue qualité</div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Social Proof Pill */}
            <div style={{
              marginTop: 16, background: "rgba(255, 255, 255, 0.12)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "9999px",
              padding: "6px 16px", display: "flex", alignItems: "center", gap: 10
            }}>
              <div style={{ display: "flex", marginLeft: 4 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#674FF5", display: "inline-block", border: "2px solid #080C1A", fontSize: "0.55rem", color: "white", textAlign: "center", lineHeight: "18px", fontWeight: 700 }}>KB</span>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#10B981", display: "inline-block", border: "2px solid #080C1A", marginLeft: -6, fontSize: "0.55rem", color: "white", textAlign: "center", lineHeight: "18px", fontWeight: 700 }}>AM</span>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#F59E0B", display: "inline-block", border: "2px solid #080C1A", marginLeft: -6, fontSize: "0.55rem", color: "white", textAlign: "center", lineHeight: "18px", fontWeight: 700 }}>FD</span>
              </div>
              <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#F1F5F9", fontWeight: 600 }}>
                <strong>+1000 professionnels</strong> nous font confiance
              </span>
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
    <section id="produits" style={{ background: "#FFFFFF", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(28px, 4vw, 44px)", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, color: "#674FF5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              CATALOGUE OFFICIEL MARCO STAFF
            </div>
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", margin: 0 }}>
              Nos 3 Matériaux Phares <span style={{ color: "#674FF5" }}>en Stock Permanent</span>
            </h2>
          </div>
          <a href={`#produits`} onClick={e => { e.preventDefault(); window.scrollTo({ top: 900, behavior: "smooth" }) }} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", fontWeight: 700,
            color: "#674FF5", textDecoration: "none"
          }}>
            <span>Voir tous nos produits</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 28px)" }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{
              background: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)", transition: "all 0.25s ease"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 16px 36px rgba(103, 79, 245, 0.12)"
                e.currentTarget.style.transform = "translateY(-3px)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              {/* Top Origin Tag */}
              <div style={{ padding: "16px 20px 0", display: "flex", justifyContent: "flex-start" }}>
                <span style={{
                  background: "#F3F0FF", color: "#674FF5",
                  fontFamily: "var(--ds-font-body)", fontSize: "0.7rem", fontWeight: 700,
                  padding: "4px 10px", borderRadius: "6px", letterSpacing: "0.04em"
                }}>
                  {p.origineBadge}
                </span>
              </div>

              {/* Image Frame */}
              <div style={{ height: 210, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={imgSrc(p.image)} alt={p.nom} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
              </div>

              {/* Card Body */}
              <div style={{ padding: "0 20px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1.3 }}>
                  {p.nom}
                </h3>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.arguments.map(arg => (
                    <li key={arg} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <CheckCircle2 size={14} style={{ color: "#10B981", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#475569", lineHeight: 1.45 }}>
                        {arg}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8, paddingTop: 10 }}>
                  <WaBtn label="Commander / Devis WhatsApp" url={waProduitMsg(p.nom, p.conditionnement)} full />
                  <button onClick={() => onDetail(p)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", fontWeight: 700,
                    color: "#674FF5", background: "none", border: "none",
                    padding: "8px 0", cursor: "pointer"
                  }}>
                    <span>Fiche technique</span>
                    <Download size={13} />
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

// ─── 3. Engagements & Chaîne Logistique (Side-by-Side B2B Grid) ───────────────
function EngagementsAndSupplySection() {
  const engagements = [
    {
      icon: Award,
      titre: "Import Direct & Traçabilité",
      desc: "Approvisionnement direct des meilleurs producteurs."
    },
    {
      icon: ShieldCheck,
      titre: "Qualité Contrôlée",
      desc: "Produits testés, certifiés et conformes aux normes."
    },
    {
      icon: Warehouse,
      titre: "Stock Permanent",
      desc: "Disponibilité continue pour ne jamais arrêter vos travaux."
    },
    {
      icon: Truck,
      titre: "Livraison Directe Chantier",
      desc: "Livraison rapide et sécurisée sur tout le Grand Cotonou."
    }
  ]

  const steps = [
    { num: "01", titre: "Import Direct", desc: "Sélection rigoureuse des meilleurs producteurs." },
    { num: "02", titre: "Stockage Sécurisé", desc: "Entreposage dans nos dépôts climatisés." },
    { num: "03", titre: "Préparation Express", desc: "Conditionnement et contrôle qualité avant expédition." },
    { num: "04", titre: "Livraison Chantier", desc: "Livraison rapide directement sur votre chantier." }
  ]

  return (
    <section id="pourquoi" style={{ background: "#F8FAFC", padding: "clamp(48px, 6vw, 76px) 0" }}>
      <div className="site-container">
        <div className="side-by-side-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 48px)" }}>
          
          {/* Left Block: Pourquoi Marco */}
          <div style={{
            background: "#FFFFFF", borderRadius: "18px", padding: "clamp(24px, 3.5vw, 36px)",
            border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.03)"
          }}>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#674FF5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              NOS ENGAGEMENTS
            </div>
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.025em", margin: "0 0 24px" }}>
              Pourquoi les Professionnels Choisissent <span style={{ color: "#674FF5" }}>Marco Staff ?</span>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 16px" }} className="engagements-2x2">
              {engagements.map(({ icon: Icon, titre, desc }) => (
                <div key={titre} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "8px", background: "#F3F0FF", color: "#674FF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.85rem", fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }}>
                      {titre}
                    </h4>
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#64748B", lineHeight: 1.45, margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Chaîne d'approvisionnement */}
          <div id="chaine" style={{
            background: "#FFFFFF", borderRadius: "18px", padding: "clamp(24px, 3.5vw, 36px)",
            border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.03)"
          }}>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#674FF5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              NOTRE CHAÎNE D&apos;APPROVISIONNEMENT
            </div>
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.025em", margin: "0 0 24px" }}>
              De l&apos;Approvisionnement Direct à Votre Chantier
            </h2>

            {/* Timeline Horizontal / Vertical */}
            <div className="supply-timeline" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, position: "relative" }}>
              {steps.map(({ num, titre, desc }) => (
                <div key={num} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: "#F3F0FF",
                    color: "#674FF5", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--ds-font-heading)", fontSize: "0.8rem", fontWeight: 800
                  }}>
                    {num}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }}>
                      {titre}
                    </h4>
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#64748B", lineHeight: 1.4, margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 4. Simulateur Signature B2B ─────────────────────────────────────────────
function SimulateurSection() {
  const [surface, setSurface] = useState(80)
  const [typeOuvrage, setTypeOuvrage] = useState<"plafond" | "corniche" | "moulure" | "enduit">("plafond")

  let coefGypse = 0.20
  let coefFilasse = 0.10
  let coefChaux = 0.05

  if (typeOuvrage === "plafond") {
    coefGypse = 0.20
    coefFilasse = 0.10
    coefChaux = 0.05
  } else if (typeOuvrage === "corniche") {
    coefGypse = 0.15
    coefFilasse = 0.08
    coefChaux = 0.04
  } else if (typeOuvrage === "moulure") {
    coefGypse = 0.12
    coefFilasse = 0.06
    coefChaux = 0.03
  } else {
    coefGypse = 0.10
    coefFilasse = 0.02
    coefChaux = 0.15
  }

  const nbSacsGypse = Math.max(1, Math.ceil(surface * coefGypse))
  const kgFilasse = Math.max(1, Math.round(surface * coefFilasse))
  const nbSacsChaux = Math.max(1, Math.ceil(surface * coefChaux))

  const msgSimu = waUrl(`Bonjour ${COMPANY_NAME}, j'ai calculé mes besoins sur votre simulateur :

` +
    `📋 *Détails du Projet :*
` +
    `• Type de travaux : ${typeOuvrage === "plafond" ? "Plafonds Staff" : typeOuvrage === "corniche" ? "Corniches" : typeOuvrage === "moulure" ? "Moulures" : "Enduits"}
` +
    `• Surface estimée : ${surface} m²

` +
    `📦 *Quantités Estimées :*
` +
    `• Gypse Marco : ${nbSacsGypse} sacs (40 KG)
` +
    `• Filasse Sisal : ${kgFilasse} kg
` +
    `• Chaux Vive : ${nbSacsChaux} sacs (40 KG)

` +
    `Pouvez-vous me transmettre votre meilleur devis avec livraison ? Merci !`
  )

  return (
    <section id="simulateur" style={{ background: "#FFFFFF", padding: "clamp(48px, 6vw, 80px) 0" }}>
      <div className="site-container">
        <div className="simu-3col-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1.3fr 0.9fr",
          gap: "clamp(20px, 3vw, 32px)", alignItems: "stretch"
        }}>
          
          {/* Col 1: Text Intro */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#674FF5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              OUTIL PRO
            </div>
            <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", margin: "0 0 14px", lineHeight: 1.2 }}>
              Calculez vos besoins en matériaux en quelques secondes
            </h2>
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "#64748B", lineHeight: 1.6, margin: "0 0 20px" }}>
              Renseignez la surface de votre chantier et obtenez instantanément les quantités exactes nécessaires.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Calcul précis selon vos dimensions",
                "Recommandations professionnelles",
                "Estimation instantanée",
                "Envoi direct sur WhatsApp"
              ].map(t => (
                <div key={t} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <CheckCircle2 size={14} style={{ color: "#10B981", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#475569", fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Interactive Controls & Quantities */}
          <div style={{
            background: "#F8FAFC", borderRadius: "18px", padding: "clamp(20px, 3vw, 28px)",
            border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 20
          }}>
            
            {/* Step 1: Type de travaux */}
            <div>
              <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
                1. TYPE DE TRAVAUX
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }} className="types-buttons-grid">
                {[
                  { id: "plafond", label: "Plafonds Staff" },
                  { id: "corniche", label: "Corniches" },
                  { id: "moulure", label: "Moulures" },
                  { id: "enduit", label: "Enduits" }
                ].map(({ id, label }) => (
                  <button key={id} onClick={() => setTypeOuvrage(id as any)} style={{
                    padding: "8px 6px", borderRadius: "8px", border: "none",
                    background: typeOuvrage === id ? "#674FF5" : "#FFFFFF",
                    color: typeOuvrage === id ? "white" : "#475569",
                    fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700,
                    cursor: "pointer", boxShadow: typeOuvrage === id ? "0 2px 8px rgba(103,79,245,0.3)" : "0 1px 3px rgba(0,0,0,0.05)",
                    transition: "all 0.15s ease", textAlign: "center"
                  }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Surface */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                  2. SURFACE À COUVRIR
                </span>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.15rem", fontWeight: 800, color: "#674FF5" }}>
                  {surface} m²
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setSurface(s => Math.max(10, s - 10))} aria-label="Moins 10m²"
                  style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #CBD5E1", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569" }}>
                  <Minus size={14} />
                </button>
                <input type="range" min={10} max={500} step={5} value={surface}
                  onChange={e => setSurface(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#674FF5", height: 6, cursor: "pointer" }}
                />
                <button onClick={() => setSurface(s => Math.min(500, s + 10))} aria-label="Plus 10m²"
                  style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #CBD5E1", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569" }}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Results Row */}
            <div>
              <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: 8 }}>
                ESTIMATION POUR {surface} m²
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, textAlign: "center" }}>
                <div style={{ background: "white", padding: "12px 8px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "#64748B" }}>Gypse Marco</div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: "2px 0" }}>{nbSacsGypse}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", color: "#94A3B8" }}>sacs (40 KG)</div>
                </div>
                <div style={{ background: "white", padding: "12px 8px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "#64748B" }}>Filasse Sisal</div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#10B981", margin: "2px 0" }}>{kgFilasse}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", color: "#94A3B8" }}>kg (env.)</div>
                </div>
                <div style={{ background: "white", padding: "12px 8px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "#64748B" }}>Chaux Vive</div>
                  <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: "2px 0" }}>{nbSacsChaux}</div>
                  <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.62rem", color: "#94A3B8" }}>sacs (40 KG)</div>
                </div>
              </div>
            </div>

          </div>

          {/* Col 3: Violet Action Card */}
          <div style={{
            background: "linear-gradient(135deg, #5B21B6 0%, #4C1D95 100%)",
            borderRadius: "18px", padding: "clamp(24px, 3.5vw, 32px)",
            color: "white", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", textAlign: "center", gap: 14
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Calculator size={22} color="white" />
            </div>
            <h3 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>
              Estimation prête !
            </h3>
            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#E2E8F0", lineHeight: 1.45, margin: 0 }}>
              Recevez le détail complet de votre estimation sur WhatsApp.
            </p>
            <div style={{ width: "100%", paddingTop: 8 }}>
              <WaBtn label="Envoyer sur WhatsApp" url={msgSimu} full />
            </div>
            <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.68rem", color: "#C4B5FD" }}>
              ⚡ Réponse sous 15 à 30 min
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 5. Bannière Commerciale Haute Fidélité (Violet Gradient + Ouvrier BTP) ─
function BannerSection() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(24px, 4vw, 48px) 0" }}>
      <div className="site-container">
        <div className="banner-grid" style={{
          background: "linear-gradient(135deg, #674FF5 0%, #5B21B6 50%, #4C1D95 100%)",
          borderRadius: "24px", overflow: "hidden",
          display: "grid", gridTemplateColumns: "1.2fr 0.8fr",
          alignItems: "center", boxShadow: "0 20px 50px rgba(103, 79, 245, 0.25)"
        }}>
          
          {/* Left Text */}
          <div style={{ padding: "clamp(32px, 5vw, 48px)", color: "white" }}>
            <div style={{
              fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700,
              color: "#C4B5FD", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8
            }}>
              APPROVISIONNEMENT FIABLE
            </div>
            <h2 style={{
              fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
              fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 16px"
            }}>
              Votre prochain chantier commence ici.
            </h2>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4 }}>
                Besoin d&apos;un matériau, d&apos;un prix ou d&apos;une estimation ?
              </div>
              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "#E2E8F0", lineHeight: 1.5, margin: 0 }}>
                Notre équipe commerciale est à votre écoute pour vous accompagner.
              </p>
            </div>
            <WaBtn label="Parler à un conseiller WhatsApp" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite parler à un conseiller.`)} />
          </div>

          {/* Right Worker Photo */}
          <div className="banner-worker-container" style={{
            display: "flex", justifyContent: "center", alignItems: "flex-end",
            height: "100%", minHeight: 280
          }}>
            <img src={imgSrc(imgWorker)} alt="Conseiller Marco Staff BTP" style={{
              maxHeight: 300, width: "auto", objectFit: "contain",
              filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.3))"
            }} />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 6. Témoignages & Confiance ──────────────────────────────────────────────
function TestimonialsSection() {
  const [idx, setIdx] = useState(0)

  const items = [
    {
      initials: "KB", color: "#674FF5", nom: "Kouassi Bernard",
      role: "Maître staffeur", ville: "Cotonou", note: 5,
      texte: "Le gypse Marco est sans équivalent au Bénin. La prise est régulière, permet des finitions impeccables et un rendu parfait à chaque chantier. Mon choix depuis 2 ans."
    },
    {
      initials: "AM", color: "#10B981", nom: "Adéola Moussa",
      role: "Conducteur de Travaux BTP", ville: "Abomey-Calavi", note: 5,
      texte: "La réactivité sur WhatsApp est top. En moins d'une heure, on a le devis et la livraison sur chantier à Cotonou dans la même journée. La filasse du Kenya est très propre."
    },
    {
      initials: "FD", color: "#F59E0B", nom: "Fatou Diallo",
      role: "Architecte d'Intérieur", ville: "Cotonou", note: 5,
      texte: "Pour les faux-plafonds à gorges marquées et les moulures, j'utilise le Gypse Marco au quotidien. Zéro fissure après pose et qualité constante."
    }
  ]

  return (
    <section id="avis" style={{ background: "#FFFFFF", padding: "clamp(48px, 6vw, 76px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 44px)" }}>
          <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#674FF5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
            ILS NOUS FONT CONFIANCE
          </div>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.025em", margin: 0 }}>
            Approuvé par les Maîtres Staffeurs &amp; Artisans
          </h2>
        </div>

        {/* Testimonials Grid with Navigation Buttons */}
        <div style={{ position: "relative" }}>
          <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2.5vw, 24px)" }}>
            {items.map(({ initials, color, nom, role, ville, note, texte }) => (
              <div key={nom} style={{
                background: "#FFFFFF", border: "1px solid #E2E8F0",
                borderRadius: "16px", padding: "24px", display: "flex",
                flexDirection: "column", gap: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", background: color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 800, fontSize: "0.85rem"
                  }}>
                    {initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>
                      {nom}
                    </div>
                    <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#64748B" }}>
                      {role} · {ville}
                    </div>
                    <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                      {[...Array(note)].map((_, i) => <Star key={i} size={11} fill="#F59E0B" stroke="#F59E0B" />)}
                    </div>
                  </div>
                </div>

                <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  &ldquo;{texte}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Optional Carousel Arrows */}
          <button onClick={() => setIdx(i => Math.max(0, i - 1))} aria-label="Avis précédent" style={{
            position: "absolute", left: -16, top: "50%", transform: "translateY(-50%)",
            width: 34, height: 34, borderRadius: "50%", background: "white",
            border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer"
          }} className="testi-arrow">
            <ChevronLeft size={16} color="#475569" />
          </button>
          <button onClick={() => setIdx(i => Math.min(items.length - 1, i + 1))} aria-label="Avis suivant" style={{
            position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)",
            width: 34, height: 34, borderRadius: "50%", background: "white",
            border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer"
          }} className="testi-arrow">
            <ChevronRight size={16} color="#475569" />
          </button>
        </div>

      </div>
    </section>
  )
}

// ─── 7. FAQ Accordion 2 Columns ──────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" style={{ background: "#F8FAFC", padding: "clamp(48px, 6vw, 76px) 0" }}>
      <div className="site-container">
        
        <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 44px)" }}>
          <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", fontWeight: 700, color: "#674FF5", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
            QUESTIONS FRÉQUENTES
          </div>
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.025em", margin: 0 }}>
            Tout ce que vous devez savoir avant de commander
          </h2>
        </div>

        {/* 2-Column FAQ Accordion Grid */}
        <div className="faq-2col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} style={{
                background: "#FFFFFF", borderRadius: "12px",
                border: "1px solid #E2E8F0", overflow: "hidden",
                transition: "all 0.2s ease"
              }}>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%", padding: "16px 18px", display: "flex",
                    alignItems: "center", justifyContent: "space-between", gap: 12,
                    background: "none", border: "none", cursor: "pointer", textAlign: "left"
                  }}
                >
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.85rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.35 }}>
                    {faq.q}
                  </span>
                  <ChevronDown size={16} style={{
                    color: "#674FF5", flexShrink: 0,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease"
                  }} />
                </button>

                {isOpen && (
                  <div style={{ padding: "0 18px 16px", borderTop: "1px solid #F1F5F9", paddingTop: 10 }}>
                    <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
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

// ─── 8. Fiche Produit Détaillée ─────────────────────────────────────────────
function FicheProduit({ product, onBack, onDetail }: { product: Product; onBack: () => void; onDetail: (p: Product) => void }) {
  const [qty, setQty] = useState(5)
  const autres = PRODUCTS.filter(p => p.id !== product.id)
  const msgCmd = waUrl(`Bonjour ${COMPANY_NAME}, je souhaite commander ${qty} sac(s) de *${product.nom}* (${product.conditionnement}). Pouvez-vous me confirmer le tarif et les modalités de livraison ? Merci !`)

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      
      {/* Breadcrumb */}
      <div style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "12px 0" }}>
        <div className="site-container" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#674FF5", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 700 }}>
            <ArrowLeft size={14} /> Retour au catalogue
          </button>
          <ChevronRight size={12} style={{ color: "#94A3B8" }} />
          <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.8rem", color: "#475569", fontWeight: 600 }}>{product.nomCourt}</span>
        </div>
      </div>

      {/* Main product view */}
      <section style={{ padding: "clamp(36px, 5vw, 64px) 0" }}>
        <div className="site-container">
          <div className="fiche-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(24px, 4vw, 48px)", alignItems: "flex-start" }}>
            
            {/* Image frame */}
            <div style={{
              borderRadius: "16px", overflow: "hidden",
              background: "#F8FAFC", padding: 32, display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid #E2E8F0"
            }}>
              <img src={imgSrc(product.image)} alt={product.nom} style={{ maxHeight: 360, maxWidth: "100%", objectFit: "contain" }} />
            </div>

            {/* Details column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: "#F3F0FF", color: "#674FF5", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "6px" }}>
                  {product.origineBadge}
                </span>
                <span style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A", fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: "6px" }}>
                  {product.drapeau} {product.origine}
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#674FF5", fontWeight: 700, textTransform: "uppercase" }}>{product.categorie}</span>
                <h1 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "6px 0 0" }}>
                  {product.nom}
                </h1>
              </div>

              <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.88rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                {product.description}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {product.arguments.map(arg => (
                  <li key={arg} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", color: "#475569", lineHeight: 1.45 }}>{arg}</span>
                  </li>
                ))}
              </ul>

              {/* Quantity */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", background: "#F8FAFC", borderRadius: "12px" }}>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>Quantité :</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", borderRadius: "9999px", padding: "4px 8px", border: "1px solid #CBD5E1" }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Diminuer quantité" style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "1rem", fontWeight: 800, color: "#674FF5", minWidth: 32, textAlign: "center" }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} aria-label="Augmenter quantité" style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={14} />
                  </button>
                </div>
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#94A3B8" }}>{product.conditionnement}</span>
              </div>

              <WaBtn label={`Demander un devis WhatsApp pour ${qty} sac(s)`} url={msgCmd} full />
            </div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section style={{ background: "#F8FAFC", padding: "clamp(36px, 5vw, 64px) 0" }}>
        <div className="site-container">
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: 20 }}>
            Spécifications Techniques
          </h2>
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
            {product.specs.map(({ label, valeur }, i) => (
              <div key={label} className="spec-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", borderBottom: i < product.specs.length - 1 ? "1px solid #E2E8F0" : "none" }}>
                <div style={{ padding: "12px 18px", background: "#F8FAFC", borderRight: "1px solid #E2E8F0" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>{label}</span>
                </div>
                <div style={{ padding: "12px 18px" }}>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.82rem", color: "#0F172A", fontWeight: 500 }}>{valeur}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits connexes */}
      <section style={{ background: "#FFFFFF", padding: "clamp(36px, 5vw, 64px) 0" }}>
        <div className="site-container">
          <h2 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: 20 }}>
            Autres Matériaux en Stock
          </h2>
          <div className="connexes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {autres.map(p => (
              <div key={p.id} onClick={() => onDetail(p)} style={{
                display: "flex", gap: 14, padding: 16,
                border: "1px solid #E2E8F0", borderRadius: "12px",
                cursor: "pointer", background: "white", alignItems: "center",
                transition: "all 0.2s ease"
              }}>
                <div style={{ width: 64, height: 64, borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#F8FAFC", padding: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={imgSrc(p.image)} alt={p.nom} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.88rem", fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{p.nom}</p>
                  <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#94A3B8", margin: "0 0 4px" }}>{p.drapeau} {p.origine}</p>
                  <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.75rem", color: "#674FF5", fontWeight: 700 }}>
                    Voir la fiche ➔
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

// ─── 9. Footer Officiel (Dark Navy #0A0F1D) ──────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <footer id="contact" style={{ background: "#0A0F1D", color: "white", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="site-container" style={{ padding: "56px 0 24px" }}>
        
        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr", gap: "clamp(24px, 4vw, 40px)",
          marginBottom: 44
        }}>
          
          {/* Col 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "8px",
                background: "#674FF5", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "white" }}>M</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.9rem", fontWeight: 800, color: "white", lineHeight: 1.1 }}>
                  {COMPANY_NAME}
                </div>
                <div style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.55rem", fontWeight: 600, color: "#674FF5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {COMPANY_SUBTITLE}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
              Importateur direct et grossiste en matériaux de finition et de staff au Bénin : Gypse d&apos;Égypte, Chaux de Dubaï, Filasse du Kenya.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              <a href={`tel:${WA_NUMBER}`} style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "#CBD5E1", fontSize: "0.78rem" }}>
                <Phone size={13} style={{ color: "#10B981" }} />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a href={waUrl(`Bonjour ${COMPANY_NAME}`)} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", color: "#10B981", fontSize: "0.78rem", fontWeight: 600 }}>
                <MessageCircle size={13} />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
              MATÉRIAUX
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {PRODUCTS.map(p => (
                <li key={p.id}>
                  <a href="#produits" onClick={e => { e.preventDefault(); onNavigate("produits") }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#94A3B8", textDecoration: "none" }}>
                    {p.nom}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
              NAVIGATION
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Accueil", id: "accueil" },
                { label: "Nos Matériaux", id: "produits" },
                { label: "Simulateur", id: "simulateur" },
                { label: "À Propos", id: "pourquoi" },
                { label: "Garanties & Qualité", id: "chaine" },
                { label: "Avis Clients", id: "avis" },
                { label: "FAQ", id: "faq" },
              ].map(({ label, id }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={e => { e.preventDefault(); onNavigate(id) }} style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#94A3B8", textDecoration: "none" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
              DÉPÔTS &amp; CONTACT
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <MapPin size={13} style={{ color: "#674FF5", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.4 }}>
                  Dépôts Cotonou &amp; Abomey-Calavi, Bénin
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Clock size={13} style={{ color: "#674FF5", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.4 }}>
                  Lun – Sam : 07h30 – 18h00
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Truck size={13} style={{ color: "#10B981", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.4 }}>
                  Livraison 24/48h
                </span>
              </div>
              <div style={{ paddingTop: 4 }}>
                <WaBtn label="WhatsApp Direct" url={waUrl(`Bonjour ${COMPANY_NAME}`)} small />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center"
        }}>
          <p style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#64748B", margin: 0 }}>
            © 2026 Marco Staff BTP - Tous droits réservés.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#64748B" }}>
              Mentions Légales
            </span>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "0.72rem", color: "#64748B" }}>
              Politique de Confidentialité
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

  @media (max-width: 1024px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .side-by-side-grid { grid-template-columns: 1fr !important; }
    .simu-3col-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .hero-floating-pills { display: none !important; }
  }

  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-mobile-toggle { display: flex !important; }
    .mobile-dock { display: flex !important; }
    main { padding-bottom: 84px !important; }

    .hero-grid { grid-template-columns: 1fr !important; text-align: left; }
    .hero-visual { margin-top: 20px; }
    .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
    .hero-cta-group { flex-direction: column !important; align-items: stretch !important; }
    .hero-cta-group > * { width: 100% !important; justify-content: center !important; }

    .product-grid { grid-template-columns: 1fr !important; }
    .engagements-2x2 { grid-template-columns: 1fr !important; }
    .supply-timeline { grid-template-columns: 1fr !important; gap: 16px !important; }
    .types-buttons-grid { grid-template-columns: 1fr 1fr !important; }
    .banner-grid { grid-template-columns: 1fr !important; text-align: left; }
    .banner-worker-container { min-height: 220px !important; }
    .testi-grid { grid-template-columns: 1fr !important; }
    .faq-2col-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .fiche-grid { grid-template-columns: 1fr !important; }
    .connexes-grid { grid-template-columns: 1fr !important; }
    .spec-row { grid-template-columns: 1fr !important; }
    .spec-row > div:first-child { border-right: none !important; border-bottom: 1px solid #E2E8F0 !important; }
    .testi-arrow { display: none !important; }
  }
`

// ─── Main App ────────────────────────────────────────────────────────────────
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
      <div style={{ fontFamily: "var(--ds-font-body)", minHeight: "100vh", overflowX: "hidden", width: "100%", background: "#FFFFFF" }}>
        <AnnouncementBar />
        <Navbar onNavigate={handleNavigate} />
        
        {view === "home" ? (
          <main>
            <HeroSection onSimulateur={() => handleNavigate("simulateur")} />
            <ProductsSection onDetail={handleDetail} />
            <EngagementsAndSupplySection />
            <SimulateurSection />
            <BannerSection />
            <TestimonialsSection />
            <FAQSection />
          </main>
        ) : (
          selectedProduct && <FicheProduit product={selectedProduct} onBack={handleBack} onDetail={handleDetail} />
        )}

        <Footer onNavigate={handleNavigate} />

        {/* Scroll-To-Top Button */}
        {showBackToTop && (
          <button
            onClick={handleScrollTop}
            aria-label="Retour en haut"
            style={{
              position: "fixed", bottom: 84, right: 20, zIndex: 990,
              width: 40, height: 40, borderRadius: "50%",
              background: "#0A0F1D", color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)" }}
          >
            <ArrowUp size={16} />
          </button>
        )}

        {/* Mobile Sticky Dock */}
        <div className="mobile-dock" style={{
          position: "fixed", bottom: 12, left: 16, right: 16, zIndex: 999,
          background: "#0A0F1D", borderRadius: "9999px", padding: "8px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--ds-font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>Dépôt Ouvert</span>
          </div>
          <WaBtn label="WhatsApp Direct" url={waUrl(`Bonjour ${COMPANY_NAME}, je souhaite un devis pour mes travaux de staff.`)} small />
        </div>

      </div>
    </>
  )
}
