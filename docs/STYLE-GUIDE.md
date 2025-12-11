# Halcourt Search — Style Guide

## Colour Palette

### Primary Brand

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Deep Navy | `#0F172A` | `--deep-navy` | Primary backgrounds, footer, depth |
| Navy Blue | `#1E2A5E` | `--navy-blue` | Brand colour (matches logo), buttons, headers |
| Navy Mid | `#2D3A6E` | `--navy-mid` | Hover states |

### Neutrals

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Black | `#0A0A0A` | `--black` | Body text, strong emphasis |
| Slate Dark | `#334155` | `--slate-dark` | Secondary headings |
| Slate | `#64748B` | `--slate` | Secondary text, labels |
| Slate Light | `#94A3B8` | `--slate-light` | Muted text, placeholders |
| Border | `#E2E8F0` | `--border` | Borders, dividers |
| Cream | `#FAF9F6` | `--cream` | Warm background sections |
| Off White | `#F8FAFC` | `--off-white` | Subtle backgrounds |
| White | `#FFFFFF` | `--white` | Main backgrounds |

## Typography

### Font Family

**Plus Jakarta Sans** — Modern, professional, clean

```css
font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Scale

| Name | Size | CSS Variable | Usage |
|------|------|--------------|-------|
| XS | 12px | `--text-xs` | Labels, captions |
| SM | 14px | `--text-sm` | Small text, buttons |
| Base | 16px | `--text-base` | Body text |
| LG | 18px | `--text-lg` | Lead paragraphs |
| XL | 20px | `--text-xl` | Section intros |
| 2XL | 24px | `--text-2xl` | Small headings (H4) |
| 3XL | 30px | `--text-3xl` | Medium headings (H3) |
| 4XL | 36px | `--text-4xl` | Large headings (H2) |
| 5XL | 48px | `--text-5xl` | Hero headings (mobile) |
| 6XL | 60px | `--text-6xl` | Hero headings (desktop) |

### Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Rarely used |
| Normal | 400 | Body text |
| Medium | 500 | Buttons, labels |
| Semibold | 600 | Headings |
| Bold | 700 | Strong emphasis |

## Spacing

Based on a 4px grid:

| Variable | Value | Pixels |
|----------|-------|--------|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |

## Components

### Buttons

**Primary:**
- Background: `--navy-blue`
- Text: White
- Hover: `--navy-mid`

**Secondary:**
- Background: Transparent
- Border: `--navy-blue`
- Text: `--navy-blue`
- Hover: Filled navy

**Ghost (on dark backgrounds):**
- Background: Transparent
- Border: White (30% opacity)
- Text: White

### Cards

- Background: White
- Border: 1px solid `--border`
- Border radius: 8px
- Padding: `--space-8`
- Hover: Subtle shadow, slight lift

### Forms

- Input border: `--border`
- Focus border: `--navy-blue`
- Focus shadow: Navy at 10% opacity
- Error: `#DC2626`
- Success: `#059669`

## Responsive Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| SM | 576px | Landscape phones |
| MD | 768px | Tablets |
| LG | 992px | Desktops |
| XL | 1200px | Large desktops |

## Animation

- Fast: 150ms
- Base: 200ms
- Slow: 300ms
- Easing: `ease`

Hero background gradient animation: 20s infinite loop
