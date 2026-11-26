# Weather App

A responsive weather dashboard built with **Next.js 16**, **React 19** and **TypeScript**. Search any city to see current conditions and an hourly temperature trend, and switch between metric and imperial units.

## Features

- City search with current temperature, conditions, wind speed and humidity
- Next-24-hour temperature trend chart (8 forecast points, 3-hour steps) using Recharts
- Metric / imperial unit toggle
- Entrance animation with GSAP
- UI components built on shadcn/ui, Radix and Tailwind CSS

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI, lucide-react |
| Charts / motion | Recharts, GSAP |
| Data | [OpenWeatherMap](https://openweathermap.org/api) (Current Weather + 5-day Forecast APIs) |

## Getting Started

### Prerequisites

- Node.js 18.18 or newer
- A free OpenWeatherMap API key

### Setup

```bash
git clone https://github.com/utshahashresth/weatherapp.git
cd weatherapp
npm install
```

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_WEATHER_API=your_openweathermap_api_key
```

Run the dev server and open <http://localhost:3000>:

```bash
npm run dev
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/             # App Router pages and layout (main UI in page.tsx)
components/ui/   # shadcn/ui primitives (Button, Input)
lib/             # Shared utilities
```

## Notes and Next Steps

- The API key is read from a `NEXT_PUBLIC_` variable, so it is visible in the browser. Moving the OpenWeatherMap calls behind a Next.js route handler would keep the key server-side.
- Planned: typed API responses, error and "city not found" states, geolocation lookup.
