# Sallagar - Your Trusted Product Advisor

A modern affiliate blog built with React, Vite, and TailwindCSS. Sallagar provides honest product reviews, expert recommendations, and buying guides to help consumers make informed decisions.

## Features

- **Modern UI**: Clean, responsive design built with TailwindCSS
- **Hero Section**: Eye-catching hero with trust indicators and CTAs
- **Professional Header**: Sticky navigation with search and cart icons
- **Comprehensive Footer**: Brand info, quick links, categories, and contact details
- **Responsive Design**: Mobile-first approach that works on all devices
- **Brand Identity**: Consistent "Sallagar" branding throughout

## Brand Elements

- **Brand Name**: Sallagar
- **Tagline**: Your Trusted Product Advisor
- **Trust Indicators**: 
  - Trusted by 10,000+ Readers
  - 500+ Verified Reviews
  - 100% Unbiased Content
  - Expert Research Team

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
sallagar/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       ├── Header.jsx
│       ├── Hero.jsx
│       └── Footer.jsx
└── README.md
```

## Customization

### Colors

The primary color scheme is defined in `tailwind.config.js`. Currently using a blue-based palette (primary-50 to primary-900).

### Content

- **Header**: Edit `src/components/Header.jsx` to modify navigation links
- **Hero**: Edit `src/components/Hero.jsx` to change the hero section content
- **Footer**: Edit `src/components/Footer.jsx` to update footer information

## Future Enhancements

- Product review pages
- Category browsing
- Search functionality
- User authentication
- Blog section
- Newsletter signup
- Affiliate link management

## License

© 2024 Sallagar. All rights reserved.
