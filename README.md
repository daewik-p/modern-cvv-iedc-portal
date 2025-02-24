
# CVV IEDC Website

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   └── shared/       # Shared components across pages
├── data/             # Static data and content
│   ├── events.ts     # Event listings
│   └── execom.ts     # Team member data
├── pages/            # Page components
├── styles/           # Global styles and CSS
└── utils/            # Utility functions and helpers
```

## Adding New Content

### Adding Events
1. Navigate to `src/data/events.ts`
2. Add new event to either `upcomingEvents` or `pastEvents` array
3. Follow the Event interface structure:
```typescript
{
  id: string;           // Unique identifier
  title: string;        // Event title
  date: string;         // Event date
  time: string;         // Event time
  location: string;     // Event location
  image: string;        // Image path/URL
  category: string;     // Event category
  description: string;  // Event description
}
```

### Adding Team Members
1. Navigate to `src/data/execom.ts`
2. Add new member to appropriate section
3. Follow the ExecomMember interface:
```typescript
{
  name: string;     // Member name
  role: string;     // Role/position
  image: string;    // Image path/URL
  linkedin?: string; // LinkedIn profile (optional)
}
```

### Adding Hero Images
1. Place new images in `/public/hero/` directory
2. Use .webp format for better performance
3. Update `heroImages` array in `src/pages/Index.tsx`

## Performance Guidelines
- Use .webp format for images
- Keep image sizes under 200KB
- Lazy load images when possible
- Use CSS animations instead of JavaScript animations
- Minimize third-party dependencies
- Use code splitting for larger pages

## Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
