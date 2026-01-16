# BetterTagum.gov - Coming Soon

A professional, minimalist coming soon page for BetterTagum.gov, a community-run portal for Tagum City.

## Features

- 🎨 **Modern Design**: Clean, professional UI inspired by BetterGov.ph
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- ⚡ **High Performance**: Built with Vite for lightning-fast loading
- ♿ **Accessible**: WCAG compliant with semantic HTML
- 🎭 **Smooth Animations**: Elegant entrance animations and interactions
- 📧 **Email Collection**: Newsletter signup with validation
- 🔒 **Privacy Focused**: No tracking, no unnecessary data collection

## Tech Stack

- **Vite** - Next generation frontend tooling
- **Vanilla JavaScript** - No framework overhead
- **Modern CSS** - CSS Grid, Flexbox, CSS Variables
- **Web Standards** - Progressive enhancement approach

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd BetterTagum
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Build for Production

Build the optimized production version:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
BetterTagum/
├── index.html          # Main HTML file
├── src/
│   ├── style.css       # All styles with CSS variables
│   └── main.js         # JavaScript functionality
├── public/
│   └── favicon.svg     # Site favicon
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # Documentation
```

## Design Philosophy

- **Minimalist**: Focus on essential information
- **Professional**: Trustworthy government portal aesthetic
- **User-Centric**: Clear call-to-action and easy navigation
- **Performance**: Optimized assets and minimal dependencies
- **Accessibility**: Keyboard navigation and screen reader support

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Customization

### Colors

Edit CSS variables in `src/style.css`:

```css
:root {
  --primary-blue: #0052CC;
  --primary-blue-dark: #003D99;
  /* ... */
}
```

### Content

Update text content in `index.html`.

### Features

Modify feature cards in the `features-grid` section of `index.html`.

## Performance Optimizations

- Minimal JavaScript bundle
- CSS is inlined for critical path
- SVG icons (no icon fonts)
- Lazy loading ready
- Optimized build output

## License

This project is created for BetterTagum.gov community initiative.

## Contact

For questions or contributions, please reach out through the official BetterTagum.gov channels.

---

Built with ❤️ for Tagum City
