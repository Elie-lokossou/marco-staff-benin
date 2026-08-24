# Plan — MARCO Staff Bénin : Plateforme Commerciale & Catalogue BTP

## Contexte

Le template Velora Air existant (aviation B2B, anglais) doit être entièrement reconverti en plateforme commerciale pour **MARCO Staff Bénin** : importateur direct de matériaux de finition (gypse, chaux, filasse) à Cotonou et Abomey-Calavi. L'objectif est une **machine de conversion** mobile-first dont le tunnel est : Publicité réseaux sociaux → Fiche Produit → Clic WhatsApp qualifié. Le site sera 100% en français. Les photos studio réelles du client seront fournies ultérieurement (placeholders Unsplash en attendant).

**Portée de ce livrable :** Page d'accueil complète (toutes sections du brief) + Vue détail produit (fiche produit cliquable avec specs et CTA WhatsApp).

---

## 1. Mise à jour du système de design (`src/styles/global.css` + `src/index.css`)

### Tokens CSS à mettre à jour dans `global.css`

| Variable | Valeur actuelle | Nouvelle valeur | Rôle |
|---|---|---|---|
| `--ds-brand` | `#6750f5` | `#674FF5` | Violet de précision MARCO |
| `--ds-brand-hover` | `#5845e0` | `#5540e0` | Hover violet |
| `--ds-brand-light` | `#eaeaff` | `#eeeeff` | Lavande canvas |
| `--ds-brand-muted` | `rgba(103,80,245,0.12)` | `rgba(103,79,245,0.10)` | Teinture douce |
| **`--ds-conversion`** *(nouveau)* | — | `#10B981` | Émeraude — CTAs WhatsApp, Disponible |
| **`--ds-conversion-hover`** *(nouveau)* | — | `#059669` | Hover émeraude |
| **`--ds-conversion-light`** *(nouveau)* | — | `rgba(16,185,129,0.10)` | Fond badge disponibilité |
| `--ds-bg-secondary` | `#f8f8fc` | `#FAFAFC` | Gris technique (brief) |
| `--ds-font-sans` | `'Instrument Sans'` | `'Poppins'` pour titres, `'Inter'` pour corps — voir section fonts |
| **`--ds-font-heading`** *(nouveau)* | — | `'Poppins', system-ui, sans-serif` | Titres forts et géométriques |
| **`--ds-font-body`** *(nouveau)* | — | `'Inter', system-ui, sans-serif` | Spécifications techniques |

### Fonts dans `src/index.css`

Remplacer l'import Instrument Sans par :
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
```
`--ds-font-sans` reste pointé sur `'Inter'` (font par défaut) ; `--ds-font-heading` = `'Poppins'`.

---

## 2. Architecture de l'application (`src/App.tsx`)

Navigation par état React simple, sans React Router :
```tsx
const [view, setView] = useState<'home' | 'product'>('home')
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
```

---

## 3. Sections — Page d'accueil (`view === 'home'`)

### 3.1 Header / Navbar
- Logo MARCO Staff (SVG simple : initiales "M" violet + texte "Marco Staff" en Poppins bold)
- Navigation épurée : Accueil · Produits · Simulateur · Contact
- **Badge "🟢 Dépôt Ouvert — 7h30/18h"** (émeraude, texte petit)
- **CTA WhatsApp** à droite : bouton émeraude `→ WhatsApp` avec icône WhatsApp (SVG inline ou Lucide `MessageCircle`)
- Sticky, mobile hamburger

### 3.2 Hero Section
- Fond : blanc + blob violet en arrière-plan (réutiliser pattern SVG existant)
- Titre Poppins 800 : *"Matériaux de Finition Premium. Importés Directement."*
- Sous-titre Inter : *"Gypse d'Égypte, Chaux de Dubaï, Filasse du Kenya — livraison directe sur vos chantiers à Cotonou."*
- **Badges d'origine** (3 pills colorées) : 🇪🇬 Égypte · 🇦🇪 Dubaï UAE · 🇰🇪 Kenya
- CTAs : Bouton violet "Voir le Catalogue" + Bouton émeraude "Demander un Devis WhatsApp"
- Visuel droit : image empilée de sacs de gypse (Unsplash → remplacer par photo studio client)

### 3.3 Catégories de Matériaux
- Titre : *"Nos Gammes de Produits"*
- 5 cartes (3 actives + 2 "Bientôt") en grille 2-3 colonnes :
  1. Gypse & Plâtre (Wrench icon)
  2. Chaux & Liants (Layers icon)
  3. Filasse & Armatures (Cog icon)
  4. Décorations Staff (Settings icon)
  5. Location Matériel — Badge `<Badge>` "Bientôt" grisé (variant kit ou span stylé)
- Click sur carte active → scroll vers showcase

### 3.4 Showcase Produits (3 fiches)
- Titre : *"Nos Produits Phares"*
- Grille 3 colonnes (mobile : 1 colonne)
- **Carte produit** pour chacun :
  - Image (Unsplash → remplaçable)
  - Badge technique (ex: "Extra White", "Import Direct") en pill violet
  - Badge origine (Égypte/Dubaï/Kenya)
  - Nom produit en Poppins 600
  - 3 arguments clés (CheckCircle2 émeraude + texte Inter)
  - Conditionnement : "Sac 40 KG"
  - Bouton émeraude "Demander un Devis" → WhatsApp
  - Bouton violet subtle "Voir la Fiche" → `setView('product')` + `setSelectedProduct(p)`

**3 produits à instancier :**
```
1. Poudre de Gypse Marco 40 KG
   Origine : Égypte | Arguments : Blancheur 100%, Finesse sans grumeaux, Zéro craquelure

2. Chaux Vive Marco Première Qualité
   Origine : Dubaï, UAE | Arguments : Pureté calcique, Haute réactivité, Anti-humidité

3. Filasse de Sisal Pure Naturelle
   Origine : Kenya | Arguments : Fibres longues peignées, Haute résistance mécanique, Balles pressées
```

### 3.5 Simulateur de Besoin Chantier
- Fond gris technique `--ds-bg-secondary`
- Titre : *"Estimez Votre Besoin en Gypse"*
- Sélecteur de produit (Gypse / Chaux) — `<SelectField>` du kit ou custom segmented
- Slider / InputField numérique : Surface m² du chantier (1–500 m²)
- Résultat calculé instantané :
  - Nombre de sacs (arrondi au supérieur)
  - Prix estimé (prix unitaire × sacs)
  - Bouton émeraude : "Commander ces [X] sacs sur WhatsApp"
- Formule : Gypse → 1 sac / 10 m² (couche 2mm) ; Chaux → 1 sac / 8 m²
- Utiliser `InputField` kit pour la saisie m² et `Button` kit pour le CTA

### 3.6 Réassurance & Confiance
- Split 2 colonnes :
  - **Gauche** : 3 témoignages de staffeurs (avatar initiales + citation + prénom + ville)
  - **Droite** : 4 garanties visuelles (badges émeraude + titre + description) :
    - ✓ Zéro Fissure Garantie
    - ✓ Contrôle Qualité Import
    - ✓ Stock Permanent Dépôt
    - ✓ Livraison Chantier Cotonou
- Barre de logos clients/partenaires (plaquistes, entreprises BTP fictivement nommées)

### 3.7 Footer Industriel
- Fond `--ds-dark-bg`
- Colonnes : Logo + description | Produits | Navigation | Contact
- Infos dépôt : "Dépôt Principal — Cotonou, Bénin" · Horaires : "Lun–Sam : 7h30–18h00"
- Téléphone placeholder : +229 01 XX XX XX
- WhatsApp : +229 01 XX XX XX
- Email : contact@marco-staff.bj *(placeholder)*
- Newsletter input + bouton

---

## 4. Vue Détail Produit (`view === 'product'`)

Rendu quand `selectedProduct !== null`, avec bouton "← Retour" en haut.

### Sections de la fiche :
1. **Breadcrumb** : Accueil > Produits > [Nom produit] (liens cliquables)
2. **Hero produit** : Grande image gauche (60%) + infos droite (40%)
   - Badge origine + Badge technique
   - Nom Poppins 700 grand
   - Description courte
   - **Tableau de spécifications techniques** (fond `--ds-bg-secondary`, bordures) :
     | Spécification | Valeur |
     | Temps de prise | 20–30 min |
     | Dosage eau/poudre | 0,6 L / kg |
     | Conditionnement | Sac 40 KG |
     | Finesse | < 80 microns |
     | Blancheur | 100% |
   - Quantité sélecteur (+ / -)
   - **Bouton émeraude large** : "📱 Demander un Devis WhatsApp" → `window.open(waUrl)`
   - **Bouton violet subtle** : "📥 Télécharger la Fiche Technique" (PDF fictif)
3. **Produits connexes** : 2 autres produits en mini-cartes horizontales
4. **Section Réassurance** mini (3 icônes + textes)

### URL WhatsApp pattern :
```
https://wa.me/22900000000?text=Bonjour%20MARCO%20Staff%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20[PRODUIT]%20(Sac%2040KG).%20Pouvez-vous%20me%20communiquer%20votre%20disponibilit%C3%A9%20et%20tarif%20%3F
```

---

## 5. Kit components mapping (Astra UI)

| Élément UI | Composant kit |
|---|---|
| CTA WhatsApp principal | `<Button variant="primary">` (couleur overridée via CSS var `--ds-conversion`) |
| Bouton Catalogue / Voir Fiche | `<Button variant="neutral">` |
| Boutons discrets | `<Button variant="subtle">` |
| Badge origine/technique | `<Badge>` |
| Input m² simulateur | `<InputField>` |
| Sélecteur produit simulateur | `<SelectField>` |
| Toutes les icônes | `lucide-react` |

> Note : Le kit Astra n'a pas d'entrée npm installable (`hardcoded-astra-ui` sans npmPackageName), donc les composants `@figma/astraui` déjà présents restent la source. Aucune installation supplémentaire nécessaire.

---

## 6. Fichiers à modifier

| Fichier | Action |
|---|---|
| `src/styles/global.css` | Mise à jour tokens couleurs + ajout `--ds-conversion`, `--ds-font-heading`, `--ds-font-body` |
| `src/index.css` | Remplacer import Instrument Sans → Poppins + Inter |
| `src/main.tsx` | Inchangé (ThemeProvider déjà en place) |
| `src/App.tsx` | Réécriture complète : logo, contenu, navigation par état, 2 vues |

---

## 8. Remplacement des photos produits (photos studio réelles)

**Fichiers fournis :**
| Fichier | Produit |
|---|---|
| `src/imports/photo2.jpeg` | Poudre de Gypse Marco 40 KG (sac studio "Made in Egypt") |
| `src/imports/photo1.jpeg` | Chaux Vive Marco (sac "Premium Quality White Lime — Dubai UAE") |
| `src/imports/filace.jpeg` | Filasse de Sisal (balles "Produce of Kenya" + équipe contrôle qualité) |

**Modification unique dans `src/App.tsx` :**

1. Ajouter 3 imports ES module en haut du fichier :
```tsx
import imgGypse from "@/imports/photo2.jpeg"
import imgChaux from "@/imports/photo1.jpeg"
import imgFilasse from "@/imports/filace.jpeg"
```

2. Dans le tableau `PRODUCTS`, remplacer la propriété `image` de chaque produit :
- `gypse-40kg` : remplacer l'URL Unsplash par `imgGypse`
- `chaux-vive` : remplacer par `imgChaux`
- `filasse-sisal` : remplacer par `imgFilasse`

Les images sont utilisées partout via `product.image` (cartes showcase, fiche détail, produits connexes) — une seule modification par produit suffit.

---

## 7. Vérification

1. **Build** : `pnpm build` sans erreur
2. **Mobile** : Tester à 375px — hero lisible, grilles en 1 colonne, CTA WhatsApp visible sans scroll
3. **Simulateur** : Saisir 50 m² → affiche 5 sacs Gypse / 7 sacs Chaux
4. **Tunnel conversion** : Clic "Voir la Fiche" sur Gypse → fiche produit → bouton WhatsApp ouvre `wa.me` avec message prérempli
5. **Tokens** : Modifier `--ds-conversion` dans `global.css` → tous les boutons WhatsApp changent de couleur
