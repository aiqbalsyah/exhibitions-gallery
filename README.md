# Painting Exhibition Website

An aesthetic, responsive web application for displaying paintings with immersive audio experiences. Each painting features its own ambient soundscape that can be played while viewing the artwork.

## Features

- **Beautiful Landing Page**: Gradient backgrounds with smooth animations
- **Gallery View**: Responsive grid layout showcasing all paintings
- **Individual Painting Pages**: Detailed view with description and audio player
- **Audio Player**: Toggle-able sound player with volume control
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible**: Built with accessibility best practices
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Static Site Generation**: Fast page loads with pre-rendered content

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Your Own Paintings

### 1. Add Your Assets

Place your files in the appropriate folders:

- **Painting Images**: `/public/paintings/`
  - Recommended format: JPG or PNG
  - Suggested dimensions: 800x1000px (4:5 aspect ratio)

- **Audio Files**: `/public/sounds/`
  - Supported formats: MP3, WAV, OGG
  - Recommended: MP3 for best browser compatibility

Example structure:
```
public/
├── paintings/
│   ├── starry-night.jpg
│   ├── mona-lisa.jpg
│   └── ...
└── sounds/
    ├── starry-night.mp3
    ├── mona-lisa.mp3
    └── ...
```

### 2. Update the Paintings Data

Edit `/lib/paintings-data.ts` to add your paintings:

```typescript
export const paintings: Painting[] = [
  {
    id: '1', // Unique identifier
    title: 'Your Painting Title',
    description: 'A detailed description of the painting...',
    imageUrl: '/paintings/your-image.jpg',
    soundUrl: '/sounds/your-audio.mp3',
    year: '2024', // Optional
    artist: 'Artist Name', // Optional
  },
  // Add more paintings...
];
```

### 3. Rebuild the Application

```bash
npm run build
```

## Project Structure

```
exhibitions-previews/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx              # Home page with gallery
│   └── paintings/
│       └── [id]/
│           ├── page.tsx      # Dynamic painting detail page
│           └── not-found.tsx # 404 page for invalid paintings
├── components/
│   └── AudioPlayer.tsx       # Audio player component
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   └── paintings-data.ts     # Paintings data array
└── public/
    ├── paintings/            # Painting images
    └── sounds/               # Audio files
```

## Customization

### Color Scheme

The application uses Tailwind CSS. To customize colors, edit the classes in:
- `app/page.tsx` (landing page)
- `app/paintings/[id]/page.tsx` (detail pages)
- `components/AudioPlayer.tsx` (audio player)

### Typography

Fonts are configured in `app/layout.tsx`. The default fonts are Geist Sans and Geist Mono.

### Metadata

Update SEO metadata in:
- `app/layout.tsx` for global metadata
- `app/paintings/[id]/page.tsx` for painting-specific metadata

## Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Deployment

This application is optimized for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- Any static hosting service

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Audio Recommendations

For the best audio experience:
- Use ambient, non-intrusive soundscapes
- Keep file sizes reasonable (2-5MB recommended)
- Normalize audio levels across all tracks
- Consider looping capability for longer viewing sessions

## Design Inspiration

Design inspired by:
- [Splaaashes by LS Graphics](https://products.ls.graphics/splaaashes/)
- [Isabel Moranta Portfolio](https://www.isabelmoranta.com/)
