# Painting Exhibition Website

A minimalist, aesthetic web application for displaying paintings with immersive audio experiences. Each painting features its own ambient soundscape that automatically plays while viewing the artwork.

## ✨ Features

### Pages
- **Hero Landing Page**: Minimalist design with large serif typography and smooth GSAP animations
- **Gallery Page**: Pinterest-style masonry layout with scroll-triggered animations
- **Painting Detail Pages**: Full-screen painting view with immersive audio experience
- **Smooth Page Transitions**: Framer Motion animations between all pages

### Audio Player
- **Smart Auto-hide**: Hides when scrolling down, shows when scrolling up or at page bottom
- **Progress Indicator**: Real-time progress bar with animated pulsing dot
- **Time Display**: Current time (elapsed) and remaining time (countdown)
- **Auto-play**: Automatically starts playing when page loads
- **Blur Effect**: Frosted glass design matching header aesthetic

### Design
- **Minimalist Aesthetic**: Stone/zinc color palette inspired by art galleries
- **Typography**: Serif headings for elegance, sans-serif for readability
- **GSAP Animations**: Smooth entrance and scroll-triggered animations
- **Dark Mode Support**: Automatic based on system preferences
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Next.js Image Optimization**: Automatic WebP conversion and lazy loading

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Animations**: GSAP + ScrollTrigger, Framer Motion
- **Fonts**: Geist Sans & Geist Mono
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Your Own Paintings

### 1. Add Your Assets

Place your files in the appropriate folders:

- **Painting Images**: `/public/paintings/`
  - Supported formats: JPG, PNG, WebP
  - Recommended dimensions: 800x1000px (4:5 aspect ratio)
  - Next.js will automatically optimize images

- **Audio Files**: `/public/sounds/`
  - Supported formats: MP3, WAV, OGG
  - Recommended: MP3 for best browser compatibility
  - Keep files under 5MB for optimal loading

Example structure:
```
public/
├── paintings/
│   ├── monalisa.png
│   ├── stary-night.webp
│   └── ...
└── sounds/
    ├── monalisa.mp3
    ├── stary-night.mp3
    └── ...
```

### 2. Update the Paintings Data

Edit `/lib/paintings-data.ts` to add your paintings:

```typescript
export const paintings: Painting[] = [
  {
    id: '1', // Unique identifier (sequential)
    title: 'Mona Lisa',
    description: 'A detailed 500-character description of the painting...', // Aim for ~500 chars
    imageUrl: '/paintings/monalisa.png',
    soundUrl: '/sounds/monalisa.mp3',
    year: '1503-1519', // Optional
    artist: 'Leonardo da Vinci', // Optional
  },
  // Add more paintings...
];
```

### 3. Rebuild the Application

```bash
pnpm build
# or
npm run build
```

## 📁 Project Structure

```
exhibitions-previews/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Hero/landing page
│   ├── gallery/
│   │   └── page.tsx            # Gallery page with masonry grid
│   └── paintings/
│       └── [id]/
│           ├── page.tsx        # Dynamic painting detail page
│           └── not-found.tsx   # 404 page for invalid paintings
├── components/
│   ├── AudioPlayer.tsx         # Floating audio player with progress
│   ├── Footer.tsx              # Minimal footer component
│   ├── GalleryGrid.tsx         # Pinterest-style masonry grid
│   ├── Hero.tsx                # Hero section with GSAP animations
│   ├── PageTransition.tsx      # Framer Motion page transitions
│   └── PaintingHeader.tsx      # Painting page header with scroll title
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   └── paintings-data.ts       # Paintings data array
└── public/
    ├── paintings/              # Painting images
    └── sounds/                 # Audio files
```

## 🎨 Key Features Explained

### Audio Player Behavior
- **Hidden by default** on page load
- **Auto-hides** when scrolling down
- **Shows when**:
  - Scrolling up
  - Reaching page bottom (within 100px)
  - Audio finishes playing
- **Time display**:
  - Left: Current elapsed time (00:15)
  - Right: Remaining time with countdown (-02:30)
  - Shows 00:00 at end (no minus sign)

### Animation System
- **GSAP**: Hero text animations and scroll-triggered gallery items
- **Framer Motion**: Page transitions with fade + slide effect
- **Custom easing**: Professional cubic-bezier curves throughout

### Navigation Flow
```
Home (Hero) → Gallery (Masonry Grid) → Painting Detail → Back to Gallery
```

## ⚙️ Customization

### Color Palette
The app uses a stone/zinc color scheme. To customize:
- Edit Tailwind classes in component files
- Primary colors: `stone-*` and `zinc-*`
- Dark mode variants included throughout

### Typography
- **Serif**: Used for large headings (Exhibition, painting titles)
- **Sans-serif**: Used for body text and UI elements
- Configure in `app/layout.tsx`

### Footer
Update your credit in `components/Footer.tsx`:
```tsx
<p className="text-xs text-stone-500 dark:text-stone-500">
  {new Date().getFullYear()}
</p>
<p className="text-xs text-stone-500 dark:text-stone-500">
  @yourusername
</p>
```

## 🚀 Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 📦 Deployment

Optimized for:
- **Vercel** (recommended - zero config)
- Netlify
- Any static hosting service

```bash
# Deploy to Vercel
vercel
```

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- WCAG color contrast compliance
- Focus indicators
- Audio player controls accessible via keyboard

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

- **Mobile**: < 640px (1 column gallery)
- **Tablet**: 640px - 1024px (2 columns gallery)
- **Desktop**: > 1024px (3 columns gallery)
- Max content width: 1024px (max-w-5xl)

## 🎵 Audio Best Practices

- Use **ambient, non-intrusive soundscapes**
- Keep files **under 5MB** for fast loading
- **MP3 format** for best browser compatibility
- **Normalize audio levels** across all tracks
- Volume fixed at **100%** (no user control)

## 💡 Design Inspiration

- [Splaaashes by LS Graphics](https://products.ls.graphics/splaaashes/)
- [Isabel Moranta Portfolio](https://www.isabelmoranta.com/)

## 👤 Credits

Created by [@aiqbalsyah](https://github.com/aiqbalsyah)
