# Halcourt Search — Project Reference

> **Purpose:** Comprehensive reference document for making edits to this codebase. Consult this file before any modifications.

---

## 1. Project Overview

**Business:** Halcourt Search Ltd — Executive search firm specializing in senior Data, Analytics, and AI professionals for VC/PE-backed companies and high-growth technology businesses.

**Website URL:** https://halcourtsearch.com

**Type:** Static website (no build step required)

---

## 2. Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Semantic markup |
| CSS3 | Custom properties, Flexbox, Grid |
| Vanilla JavaScript | No frameworks — pure ES5 IIFE pattern |
| Netlify | Hosting, form handling, redirects |
| Google Fonts | Plus Jakarta Sans |
| Supabase Storage | Optional image hosting |

---

## 3. File Structure

```
halcourt-search/
├── index.html              # Home page
├── expertise.html          # Expertise page
├── services.html           # Services (How We Work) page
├── about.html              # About page
├── contact.html            # Contact page with form
├── privacy.html            # Privacy Policy
├── terms.html              # Terms & Conditions
├── 404.html                # Error page
│
├── css/
│   ├── variables.css       # Design tokens (colours, typography, spacing)
│   └── styles.css          # Main stylesheet (imports variables.css)
│
├── js/
│   └── main.js             # Navigation, forms, scroll effects, animations
│
├── images/
│   └── logo.png            # Halcourt Search logo (only image currently)
│
├── docs/                   # Documentation
│   ├── STYLE-GUIDE.md      # Visual design reference
│   ├── CONTENT.md          # All website copy
│   ├── IMAGES.md           # Image requirements and guidelines
│   └── PROJECT-REFERENCE.md # This file
│
├── netlify.toml            # Netlify config (headers, caching, redirects)
└── README.md               # Project readme
```

---

## 4. Design System

### 4.1 Colour Palette (from `css/variables.css`)

**Primary Brand:**
| Name | Hex | Variable | Usage |
|------|-----|----------|-------|
| Deep Navy | `#0F172A` | `--deep-navy` | Primary backgrounds, footer, hero |
| Navy Blue | `#1E2A5E` | `--navy-blue` | Brand colour (logo match), buttons |
| Navy Mid | `#2D3A6E` | `--navy-mid` | Hover states |

**Neutrals:**
| Name | Hex | Variable | Usage |
|------|-----|----------|-------|
| Black | `#0A0A0A` | `--black` | Body text |
| Slate Dark | `#334155` | `--slate-dark` | Secondary headings, card text |
| Slate | `#64748B` | `--slate` | Labels, secondary text |
| Slate Light | `#94A3B8` | `--slate-light` | Placeholders |
| Border | `#E2E8F0` | `--border` | Card borders, dividers |
| Cream | `#FAF9F6` | `--cream` | Warm section backgrounds |
| Off White | `#F8FAFC` | `--off-white` | Subtle backgrounds |
| White | `#FFFFFF` | `--white` | Main backgrounds |

**Functional:**
| Name | Hex | Variable |
|------|-----|----------|
| Error | `#DC2626` | `--error` |
| Success | `#059669` | `--success` |

### 4.2 Typography

**Font:** Plus Jakarta Sans (loaded from Google Fonts in `styles.css`)

**Font Sizes (rem-based):**
```css
--text-xs: 0.75rem;    /* 12px - Labels, captions */
--text-sm: 0.875rem;   /* 14px - Small text, buttons */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Lead paragraphs */
--text-xl: 1.25rem;    /* 20px - Section intros */
--text-2xl: 1.5rem;    /* 24px - H4 */
--text-3xl: 1.875rem;  /* 30px - H3 */
--text-4xl: 2.25rem;   /* 36px - H2 */
--text-5xl: 3rem;      /* 48px - H1 mobile */
--text-6xl: 3.75rem;   /* 60px - H1 desktop */
```

**Font Weights:**
```css
--font-light: 300;
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Buttons, labels */
--font-semibold: 600;  /* Headings */
--font-bold: 700;      /* Strong emphasis */
```

### 4.3 Spacing

Based on 4px grid system:
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### 4.4 Responsive Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| MD | 768px | Tablets |
| LG | 992px | Desktops (nav switch) |

**Media Query Pattern:**
```css
@media (min-width: 768px) { }
@media (min-width: 992px) { }
```

---

## 5. CSS Architecture

### 5.1 Naming Convention: BEM

```
.block
.block__element
.block--modifier
```

**Examples:**
```css
.header              /* Block */
.header__inner       /* Element */
.header__logo        /* Element */
.header--scrolled    /* Modifier */
.header--transparent /* Modifier */

.nav__link           /* Element */
.nav__link--active   /* Modifier on element */

.btn                 /* Block */
.btn--primary        /* Modifier */
.btn--lg             /* Modifier */
```

### 5.2 Key CSS Classes

**Layout:**
- `.container` — Max-width 1200px, centered, side padding
- `.container--narrow` — Max-width 800px
- `.grid` — CSS Grid base
- `.grid--2` — 2-column grid
- `.grid--3` — 3-column grid

**Sections:**
- `.section` — Standard padding (64px/96px)
- `.section--cream` — Cream background
- `.section--navy` — Dark navy background (inverts text colours)
- `.section__header` — Centered header area
- `.section__title` — Section heading
- `.section__subtitle` — Section description

**Hero:**
- `.hero` — Full-height animated gradient hero (home page)
- `.hero--short` — Shorter hero variant
- `.hero__background` — Animated gradient background
- `.hero__shapes` — Floating decorative circles
- `.page-hero` — Cream background hero for inner pages

**Components:**
- `.card` — White bordered card with hover effect
- `.card__title`, `.card__text`, `.card__icon`
- `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--white`, `.btn--ghost`, `.btn--lg`
- `.link` — Text link with arrow animation
- `.label` — Uppercase label text

**Navigation:**
- `.header`, `.header--transparent`, `.header--scrolled`
- `.nav`, `.nav__link`, `.nav__link--active`
- `.mobile-nav`, `.mobile-nav--open`
- `.menu-toggle`, `.menu-toggle--open`

**Transparent Header Behavior (Home Page):**
- When NOT scrolled: Logo inverted to white, nav links white, hamburger lines white
- When scrolled: White background, logo returns to normal, nav links dark
- CSS uses `.header--transparent:not(.header--scrolled)` selector pattern
- Smooth transitions applied via `--transition-slow` (300ms)

**Forms:**
- `.form__group` — Form field wrapper
- `.form__label` — Field label
- `.form__input` — Text input
- `.form__textarea` — Textarea
- `.form__select` — Select dropdown
- `.form__file` — File upload
- `.form__error` — Error message
- `.form__success` — Success message box

**Footer:**
- `.footer`, `.footer__grid`, `.footer__brand`
- `.footer__nav`, `.footer__contact`, `.footer__links`
- `.footer__bottom`, `.footer__legal`

**Utilities:**
- `.text-center`, `.text-left`, `.text-right`
- `.mt-0`, `.mt-4`, `.mt-8`, `.mt-12`
- `.mb-0`, `.mb-4`, `.mb-8`, `.mb-12`
- `.lead` — Large intro text
- `.hidden` — Display none (for honeypot)
- `.visually-hidden` — Screen reader only

**Animations:**
- `.fade-in` — Fade in animation
- `.fade-in-up` — Fade in with upward movement
- `.stagger` — Staggers children animations

---

## 6. JavaScript Functionality

All JS in `js/main.js` using IIFE pattern (ES5 compatible):

### 6.1 Features Implemented

1. **Mobile Navigation Toggle**
   - Hamburger menu opens/closes mobile nav
   - Closes on: link click, Escape key, window resize to desktop
   - Prevents body scroll when open

2. **Header Scroll Effect**
   - Adds `.header--scrolled` when scrolled > 50px
   - Uses `requestAnimationFrame` for performance

3. **Smooth Scroll**
   - Internal anchor links scroll smoothly
   - Accounts for fixed header height

4. **Form Handling**
   - Client-side validation (required fields, email format)
   - Netlify Forms submission via fetch
   - Loading state on submit button
   - Success/error messages

5. **Intersection Observer**
   - Triggers `.is-visible` class on `.animate-on-scroll` elements
   - Currently not used on any elements (prepared for future)

6. **Dynamic Copyright Year**
   - Updates `.current-year` span to current year

### 6.2 DOM Selectors Used

```javascript
document.querySelector('.header')
document.querySelector('.menu-toggle')
document.querySelector('.mobile-nav')
document.querySelectorAll('.mobile-nav__link')
document.querySelectorAll('form[data-netlify="true"]')
document.querySelectorAll('a[href^="#"]')
document.querySelectorAll('.current-year')
```

---

## 7. Page Structure Template

Each page follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="...">
  
  <!-- Open Graph -->
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="/images/og-image.jpg">
  <meta property="og:url" content="https://halcourtsearch.com/...">
  <meta property="og:type" content="website">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
  
  <!-- Canonical -->
  <link rel="canonical" href="https://halcourtsearch.com/...">
  
  <title>... | Halcourt Search</title>
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  
  <!-- Header (same on all pages) -->
  <header class="header">...</header>
  
  <!-- Mobile Navigation (same on all pages) -->
  <nav class="mobile-nav">...</nav>
  
  <main>
    <!-- Page content -->
  </main>
  
  <!-- Footer (same on all pages) -->
  <footer class="footer">...</footer>
  
  <!-- Scripts -->
  <script src="js/main.js"></script>
</body>
</html>
```

### Active State Handling

When editing a page, update the active nav link:
- Desktop: Add `nav__link--active` to current page link
- Mobile: Add `mobile-nav__link--active` to current page link

**Home page header uses:** `header--transparent` (gradient shows through)
**Inner pages use:** `header` (white background)

---

## 8. Form Setup (Netlify)

Contact form in `contact.html`:

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" enctype="multipart/form-data">
  <input type="hidden" name="form-name" value="contact">
  
  <!-- Honeypot for spam -->
  <p class="hidden">
    <label>Don't fill this out: <input name="bot-field"></label>
  </p>
  
  <!-- Form fields... -->
</form>
```

**Key attributes:**
- `data-netlify="true"` — Enables Netlify form processing
- `netlify-honeypot="bot-field"` — Spam protection
- `name="form-name"` hidden input — Required for JS submission

---

## 9. Deployment

**Platform:** Netlify
**Branch:** `main` (auto-deploys on push)
**Build:** None required (static files)
**Publish directory:** `/`

**Configuration in `netlify.toml`:**
- Security headers (X-Frame-Options, CSP, etc.)
- Static asset caching (1 year for css/js/images)
- 404 redirect to `/404.html`
- Pretty URLs enabled

---

## 10. Content Placeholders (TO-DO)

Items marked with `[PLACEHOLDER]` in code that need client input:

| Page | Content Needed |
|------|----------------|
| `about.html` | Founder bio (3 paragraphs about Roddy) |
| `expertise.html` | Testimonials (when available) |
| `privacy.html` | Final legal text, date |
| `terms.html` | Final legal text, date |

---

## 11. Missing Images (TO-DO)

| Image | Location | Status |
|-------|----------|--------|
| favicon.ico | `/images/favicon.ico` | ⏳ Needed |
| apple-touch-icon.png | `/images/apple-touch-icon.png` | ⏳ Needed |
| og-image.jpg | `/images/og-image.jpg` | ⏳ Needed |

Generate favicon from logo at: https://realfavicongenerator.net/

---

## 12. Common Edit Patterns

### Adding a New Page

1. Copy an existing inner page (e.g., `about.html`)
2. Update `<title>`, meta tags, canonical URL
3. Update active state on nav links (both desktop and mobile)
4. Add content
5. Add link to page in all navigation menus (header + mobile + footer on ALL pages)

### Adding a New Section

```html
<section class="section">
  <div class="container">
    <div class="section__header">
      <p class="label section__label">Label text</p>
      <h2 class="section__title">Heading</h2>
      <p class="section__subtitle">Description text</p>
    </div>
    
    <!-- Content -->
  </div>
</section>
```

For cream background: `<section class="section section--cream">`
For navy background: `<section class="section section--navy">`

### Adding Cards

```html
<div class="grid grid--3">
  <div class="card">
    <div class="card__icon">
      <!-- SVG icon -->
    </div>
    <h3 class="card__title">Title</h3>
    <p class="card__text">Description</p>
  </div>
  <!-- More cards... -->
</div>
```

### Adding a CTA Section

```html
<section class="section section--navy">
  <div class="container">
    <div class="cta">
      <h2 class="cta__title">Headline</h2>
      <p class="cta__text">Supporting text</p>
      <a href="contact.html" class="btn btn--white btn--lg">Button text</a>
    </div>
  </div>
</section>
```

---

## 13. Contact Information

| Type | Value |
|------|-------|
| Email | info@halcourtsearch.com |
| LinkedIn | linkedin.com/company/halcourt-search |
| Company | Halcourt Search Ltd |
| Year | 2025 |

---

## 14. Quick Reference: CSS Variables

Copy-paste reference for common styles:

```css
/* Colours */
color: var(--black);
color: var(--slate-dark);
color: var(--navy-blue);
background-color: var(--cream);
background-color: var(--deep-navy);
border-color: var(--border);

/* Typography */
font-size: var(--text-lg);
font-weight: var(--font-medium);
line-height: var(--leading-relaxed);

/* Spacing */
padding: var(--space-8);
margin-bottom: var(--space-6);
gap: var(--space-4);

/* Borders & Radius */
border-radius: var(--radius-md);
border-radius: var(--radius-lg);

/* Shadows */
box-shadow: var(--shadow-md);
box-shadow: var(--shadow-lg);

/* Transitions */
transition: all var(--transition-base);
transition: color var(--transition-fast);
```

---

## 15. Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

---

*Last updated: December 2025*

