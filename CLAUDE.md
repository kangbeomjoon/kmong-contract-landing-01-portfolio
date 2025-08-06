# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

카페24 유튜브 쇼핑 랜딩페이지 - A single-page YouTube Shopping service landing page built with Next.js, featuring 6 distinct animated sections with advanced scroll-based interactions.

**Reference Site**: https://www.cafe24.com/youtubeshopping/about.html

## Architecture & Structure

### Next.js App Router Structure
- **App Directory**: `src/app/` - Main application routes and layouts
- **Components**: `src/components/` - Organized into sections and UI components
  - `sections/` - 6 main landing page sections (Hero, Stats, Progress, Carousel, Cards, FAQ)
  - `ui/` - ShadCN UI components (buttons, forms, etc.)
  - `animations/` - Shared animation utilities
- **API Routes**: `src/app/api/contact/route.ts` - Contact form submission handler

### Key Section Components
1. **HeroSection**: Text morphing animation with 4 rotating messages
2. **StatsSection**: Sticky text with parallax scrolling numbers
3. **ProgressSection**: Progress bar trigger with content reveal
4. **CarouselSection**: Infinite horizontal carousel with success stories
5. **CardsSection**: Sequential card stack animation on scroll
6. **FAQSection**: Accordion FAQ + Contact form

## Development Commands

### Core Commands
```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

### Key Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4 + ShadCN/UI
- **Animations**: Framer Motion + react-intersection-observer
- **Icons**: Lucide React
- **Forms**: Built-in API route with validation

## Animation Requirements

### Performance Standards
- **Target**: 60fps for all animations
- **GPU Acceleration**: Use `transform` properties over layout changes
- **Scroll Optimization**: Throttled scroll events (16ms intervals)
- **Viewport Detection**: Intersection Observer for performance

### Animation Specifications
Each section has specific animation requirements detailed in `docs/PRD.md`:
- Text morphing with opacity transitions
- Parallax scrolling effects
- Sequential card reveals
- Progress-triggered content reveals
- Infinite horizontal carousels

## Responsive Design

### Breakpoints
- **Mobile**: 375px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px - 1920px

### Performance Targets
- **Lighthouse Performance**: 90+ score
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Mobile Usability**: 100 score

## Content & Localization

### Primary Language
Korean (ko_KR) - All content, metadata, and form validation messages

### Color Scheme
- **Primary**: #FF0000 (YouTube Red)
- **Secondary**: #1976D2 (Blue)
- **Background**: #FFFFFF (White)
- **Text**: #212121 (Dark Gray)
- **Accent**: #FF6B6B (Coral)

## Contact Form Implementation

### API Endpoint
`/api/contact` - Handles form submissions with validation:
- Required fields: name, email, message, agreement
- Email format validation
- Privacy agreement verification
- Console logging (replace with actual email service in production)

### Form Fields
- Name (required)
- Email (required)
- Phone (optional)  
- Message (required, textarea)
- Privacy agreement checkbox (required)

## Development Priorities

### Current Phase Status
Based on git status, the project has basic structure implemented with some sections in development.

### Key Implementation Notes
- All animations must maintain 60fps performance
- Mobile touch scrolling must work smoothly
- SEO meta tags are properly configured in layout.tsx
- Accessibility features (alt text, keyboard navigation) are required
- Cross-browser testing needed (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)

## Documentation References

Detailed specifications available in:
- `docs/PRD.md` - Complete project requirements and section specifications
- `docs/TECH_STACK.md` - Technology stack details
- `docs/DEVELOPMENT_GUIDE.md` - Development phases and checklists
- `docs/DESIGN_SYSTEM.md` - Design guidelines and components
- `docs/SECTIONS_SPEC.md` - Detailed section specifications