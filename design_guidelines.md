# Velocity - Premium Car Dealership Design Guidelines

## Design Approach
**Reference-Based:** Drawing from Tesla, Porsche, and Apple's premium product presentation. Dark, sophisticated aesthetic emphasizing vehicle photography with generous whitespace and refined typography.

## Typography System
- **Primary Font:** Inter or Poppins (Google Fonts)
- **Headings:** 700 weight, tracking-tight (-0.025em), uppercase for section labels
- **Hero Display:** text-6xl to text-7xl (96-120px), 800 weight
- **Subheadings:** text-2xl to text-3xl, 600 weight
- **Body:** 400 weight, text-base to text-lg, leading-relaxed (1.75)
- **Captions/Labels:** text-sm, uppercase, tracking-wider, 500 weight

## Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 24, 32 for consistent rhythm
- Section padding: py-24 to py-32 desktop, py-12 to py-16 mobile
- Container: max-w-7xl with px-6
- Card spacing: gap-8 for grids, p-8 for interiors

## Page Structure (5-6 Sections)

**1. Hero Section (100vh)**
- Full-viewport immersive vehicle showcase
- Large hero image (featured luxury vehicle, dramatic angle, studio lighting)
- Overlay: Centered content with blurred-background CTA buttons (backdrop-blur-md, bg-black/30)
- Headline + subtext + dual CTA (e.g., "Explore Inventory" + "Schedule Test Drive")

**2. Featured Inventory Grid**
- 3-column grid (lg:grid-cols-3, md:grid-cols-2, sm:grid-cols-1)
- Vehicle cards with large images, model name, starting price, key specs
- Cards: hover lift effect (subtle), border on dark background (border-white/10)

**3. Experience Section (Asymmetric 2-Column)**
- Left: Large vehicle lifestyle image (customer experience, showroom)
- Right: Text content describing luxury service, white-glove treatment
- Split layout (lg:grid-cols-2 with gap-16)

**4. Specifications Showcase**
- Full-width vehicle detail section
- Large product image + key specs in 4-column grid
- Performance metrics highlighted (0-60, horsepower, range)

**5. Testimonials**
- 3-column grid of customer reviews
- Customer photos, quote, name/vehicle purchased
- Subtle card treatment on dark background

**6. Contact/CTA Footer**
- Split layout: Contact form (left) + Showroom info/map placeholder (right)
- Newsletter signup integrated
- Social links, business hours, phone/email

## Component Design

**Buttons:**
- Primary: Solid treatment, px-8 py-4, rounded-md, 500 weight
- Secondary: Border treatment (border-2), backdrop-blur for image overlays
- Sizes: Large (text-lg) for hero, medium (text-base) for sections

**Cards:**
- Minimal borders (border-white/10 on dark)
- p-6 to p-8 padding
- Rounded corners (rounded-lg)

**Forms:**
- Dark inputs with subtle borders (border-white/20)
- Focus states with accent glow
- Generous padding (px-4 py-3)

**Navigation:**
- Fixed transparent header, backdrop-blur on scroll
- Logo left, menu center, CTA button right
- Mobile: Hamburger menu

## Images Required

**Hero:** Full-width luxury vehicle (front 3/4 view, dramatic lighting, dark studio background) - 1920x1080 minimum

**Featured Inventory:** 6-9 vehicle cards (various models, consistent angle/lighting) - 800x600 each

**Experience Section:** Lifestyle showroom image (customers viewing vehicles, premium interior) - 1200x800

**Specifications:** Detailed vehicle shot (side profile or action shot) - 1400x900

**Testimonials:** 3 customer portrait photos - 400x400 each

## Dark Theme Specifications
- Background: Near-black gradients (gray-900 to black)
- Text: white to gray-300 for hierarchy
- Accents: Subtle metallic borders, white/10 to white/20 opacity
- Cards: Dark gray-800/gray-900 with subtle borders
- Avoid pure black - use rich dark grays for depth

## Animations
- Minimal: Subtle hover lifts on cards (translate-y-1)
- Smooth scroll behavior
- Fade-in on scroll for sections (intersection observer)
- No distracting auto-play or carousels