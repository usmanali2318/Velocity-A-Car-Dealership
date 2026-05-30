# Luxury Automotive Dealership Design Guidelines

## Design Approach
**Reference-Based:** Drawing from premium automotive leaders (Porsche, Mercedes-Benz, Tesla) with emphasis on sophisticated visual storytelling and premium material aesthetics.

**Core Principle:** Create an immersive, gallery-like experience that positions vehicles as art pieces while maintaining exceptional usability for browsing inventory.

## Typography System
- **Primary Font:** "Playfair Display" (Google Fonts) - Elegant serif for headlines, vehicle names
- **Secondary Font:** "Inter" (Google Fonts) - Clean sans-serif for body, specs, UI elements
- **Hierarchy:** 
  - Hero headlines: 4xl-6xl, Playfair Display, font-light
  - Vehicle names/prices: 2xl-3xl, Playfair Display, font-normal
  - Section headers: xl-2xl, Inter, font-semibold, tracking-wide
  - Body/specs: base-lg, Inter, font-normal
  - UI labels: sm, Inter, font-medium, uppercase, tracking-wider

## Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 24 for consistent rhythm
**Grid Strategy:** Full-bleed imagery with contained content blocks (max-w-7xl)

## Page Structure & Components

### Hero Section (Full viewport)
Large hero image showcasing flagship vehicle in dramatic lighting (cinematic showroom or road setting). Vehicle should occupy 60% of frame, positioned slightly off-center. Overlay gradient (dark bottom fade) for text legibility.

**Hero Content:** 
- Dealership name/logo (top-left, subtle presence)
- Headline + subheadline (bottom-left quadrant)
- Primary CTA button with glass-blur background effect
- Scroll indicator (subtle animated chevron)

### Vehicle Inventory Grid (Multi-column)
- Desktop: 3-column masonry grid (grid-cols-3)
- Tablet: 2-column (md:grid-cols-2)
- Mobile: Single column stacked
- Each card: Large vehicle image, name, starting price, key specs (horsepower, 0-60), "View Details" link

### Custom Price Range Slider Component
**Visual Treatment:**
- Dual-handle slider with metallic accents
- Track: Thin line with subtle glow effect
- Handles: Circular with brushed metal appearance, larger touch targets (48px)
- Active range: Highlighted track segment between handles
- Live price values displayed above handles
- Min/max labels flanking the track
- Smooth animations on drag (ease-out transitions)

### Vehicle Detail Showcase (Featured Models)
- Full-width cinematic image gallery (horizontally scrollable)
- Overlay specs panel (glass-blur card, right-aligned)
- Interactive 360° view indicator
- Financing calculator integration below hero

### Services & Financing Section (2-column split)
- Left: Service packages (maintenance, customization) in elevated cards
- Right: Financing options with payment calculator preview

### Testimonials Wall
- 3-column grid of refined testimonial cards
- Customer photo, quote, vehicle purchased, subtle quotation mark design element

### Contact/Appointment Section
- Split layout: Form (left 60%) + Dealership info/map (right 40%)
- Form fields with elegant underline borders
- Preferred contact time selector
- "Schedule Test Drive" prominent CTA

### Footer (Comprehensive)
- Multi-column layout: Brand info, Quick Links, Inventory Categories, Social/Newsletter
- Operating hours, certifications, trust badges
- Fine print, privacy links

## Navigation
Transparent header with glass-blur on scroll. Horizontal menu: Inventory | Finance | Services | About | Contact. Search icon, appointment CTA button (right-aligned).

## Images Required
1. **Hero:** Flagship luxury vehicle in moody showroom lighting (wide shot)
2. **Inventory:** 6-9 high-res vehicle photos (various models, exterior angles)
3. **Detail showcase:** 3-4 interior/exterior detail shots per featured vehicle
4. **Services:** Showroom interior, service bay (professional, clean)
5. **Team/About:** Dealership exterior, staff portraits (if applicable)

## Interaction Patterns
- Card hover: Subtle lift (translateY), shadow enhancement
- Price slider: Smooth drag with haptic-feel resistance
- Image galleries: Smooth horizontal scroll with momentum
- Form inputs: Animated underline on focus
- Buttons with blur backgrounds: No additional hover states needed (blur effect sufficient)

**Animation Budget:** Reserved for hero entrance, slider interactions, and subtle card reveals on scroll. Keep minimal - let imagery and premium materials speak.