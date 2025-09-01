# Data Analysis Dashboard

A modern, responsive data processing and visualization dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Single-page Interface**: Streamlined workflow for data analysis
- **File Upload**: Drag-and-drop file upload with validation
- **Real-time Processing**: Animated progress tracking during analysis
- **Interactive Results**: Charts, metrics, and downloadable reports
- **Run History**: Sidebar showing recent analysis runs
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM (recommended) or npm

### Installation

1. Clone or download this repository
2. Install dependencies:
   \`\`\`bash
   pnpm install
   # or
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   pnpm dev
   # or
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
pnpm build
pnpm start
# or
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main dashboard page
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
└── public/               # Static assets
\`\`\`

## Usage

1. **Upload Data**: Drag and drop a file or click to select
2. **Configure Parameters**: Set analysis parameters in the sidebar
3. **Run Analysis**: Click "Run Analysis" to start processing
4. **View Results**: See charts, metrics, and download reports
5. **Access History**: View previous runs in the sidebar

## Customization

The dashboard uses a clean blue, white, and gray color palette defined in `app/globals.css`. You can customize colors, fonts, and spacing by modifying the CSS variables and Tailwind configuration.

## License

This project is open source and available under the MIT License.
