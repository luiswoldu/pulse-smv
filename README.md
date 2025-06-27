# Pulse SMV - Social Media Metrics Dashboard

A sleek, card-based dashboard prototype showcasing social media metrics in a visually engaging way. This iteration focuses purely on the frontend experience—building reusable UI containers that mirror the clean aesthetics of HubSpot's stats cards and Apple Health's dashboard, populated with static placeholder values.

## Features

- **Responsive Card Layout**: Three different card types (Small, Medium, Large) with specific dimensions
- **Interactive Animations**: Hover effects, loading skeletons, and smooth transitions using Framer Motion
- **Modern Design**: Clean aesthetics with rounded corners, subtle shadows, and a neutral color palette
- **Loading States**: Shimmer animations while data loads
- **Semantic Colors**: Green/red indicators for positive/negative changes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Card Types

### Small Card (406x222px)
- Displays a key metric with title
- Shows percentage change with color-coded indicators
- Includes trending up/down icons

### Medium Card (616x242px)
- Displays a metric with title
- Contains a list of related items with values and changes
- Perfect for breakdowns and comparisons

### Large Card (1244x242px)
- Reserved for charts and trend visualizations
- Currently shows placeholder content
- Spans full width of the dashboard

## Design Guidelines

- **Corners & Shadows**: `rounded-2xl` corners with subtle shadows
- **Background**: Cards use `#F5F5F5` background color
- **Padding**: `p-4` internal padding with `gap-6` grid spacing
- **Typography**: System fonts (San Francisco), `text-3xl` for numbers, `text-sm` for labels
- **Colors**: Neutral grays with yellow accents and semantic green/red for changes

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and custom CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── Dashboard.tsx        # Main dashboard component
│   ├── dashboard/
│   │   ├── SmallCard.tsx    # Small card component
│   │   ├── MediumCard.tsx   # Medium card component
│   │   ├── LargeCard.tsx    # Large card component
│   │   └── index.ts         # Component exports
│   └── ui/                  # shadcn/ui components
└── lib/
    └── utils.ts             # Utility functions
```

## Customization

The dashboard uses CSS custom properties for easy theming. Key variables are defined in `globals.css`:

- `--color-pulse-yellow`: Yellow accent color
- `--color-pulse-green`: Success/positive color
- `--color-pulse-red`: Error/negative color
- `--color-pulse-card-bg`: Card background color

## Future Enhancements

- Real data integration
- Interactive chart components
- Responsive mobile layout
- Dark mode support
- Additional card types
- Export functionality

## License

MIT License - feel free to use this project as a starting point for your own dashboard applications.
