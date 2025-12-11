# Halcourt Search — Image Inventory

## Required Images

### Logo
| File | Location | Status | Notes |
|------|----------|--------|-------|
| logo.png | /images/logo.png | ✅ Provided | Main logo with icon + text |
| favicon.ico | /images/favicon.ico | ⏳ Needed | 32x32 or 16x16 favicon |
| apple-touch-icon.png | /images/apple-touch-icon.png | ⏳ Needed | 180x180 for iOS |
| og-image.jpg | /images/og-image.jpg | ⏳ Needed | 1200x630 social sharing image |

### Favicon Generation
Generate favicon from logo using:
- https://realfavicongenerator.net/
- https://favicon.io/

Upload the logo PNG and download the favicon package.

---

## Image Guidelines

### Style Direction (from client feedback)
- Natural/calming: ocean, mountains, horizon, sky
- Abstract/tech: data visualisations, subtle patterns, geometric shapes
- **NO:** office environments, teams collaborating, handshakes, generic business stock

### Recommended Sources
- **Unsplash** (free): https://unsplash.com/
- **Pexels** (free): https://pexels.com/
- **Supabase Storage** (for custom images): Your bucket URL

### Image Specifications
| Type | Dimensions | Format | Max Size |
|------|------------|--------|----------|
| Hero background | 1920x1080 | JPG | 200kb |
| Card images | 800x600 | JPG | 100kb |
| Thumbnails | 400x300 | JPG | 50kb |
| Icons | 48x48 | SVG | - |
| Logo | Variable | PNG/SVG | - |
| OG Image | 1200x630 | JPG | 150kb |

### Optimisation
Always compress images before use:
- https://squoosh.app/
- https://tinypng.com/

---

## Supabase Storage Setup

### Bucket Configuration
1. Create bucket: `halcourt-images`
2. Set to **public**
3. Upload images

### URL Format
```
https://[project-ref].supabase.co/storage/v1/object/public/halcourt-images/[filename]
```

### Example Usage in HTML
```html
<img src="https://abc123.supabase.co/storage/v1/object/public/halcourt-images/hero-bg.jpg" alt="Description">
```

---

## Current Placeholders

The website currently has no background images — the hero uses a CSS gradient animation. If adding imagery later, consider:

1. **Abstract backgrounds** for hero sections
2. **Nature photography** (mountains, ocean) for section breaks
3. **Professional headshot** of Roddy for About page

---

## Alt Text Guidelines

Every image must have descriptive alt text:
- Describe what's in the image
- Keep it concise (125 characters max)
- Don't start with "Image of" or "Picture of"
- For decorative images, use `alt=""`

Examples:
- ✅ `alt="Mountain range at sunset with orange sky"`
- ✅ `alt="Abstract data visualization with blue nodes"`
- ❌ `alt="Image of mountains"`
- ❌ `alt="stock-photo-123.jpg"`
