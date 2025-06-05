# Graphikal

A React Native application featuring interactive market data visualization with customizable graph components.

## Features

- Interactive market data visualization
- Multiple data series display (open, high, low, close)
- Zoom functionality
- Customizable graph controls
- Theme support
- Responsive design

## Tech Stack

- React Native
- Victory Native (for charting)
- Shopify React Native Skia (for graphics)
- TypeScript

## Project Structure

```
components/
  ui/
    graph.tsx         # Main graph component
    graph-controls.tsx # Graph control interface
    graph-legend.tsx   # Graph legend component
    zoom-container.tsx # Zoom functionality wrapper
```

## Getting Started

### Prerequisites

- Node.js
- React Native development environment
- iOS/Android development environment

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the application:

```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Usage

The main graph component can be used as follows:

```typescript
import { Graph } from './components/ui/graph'

// Example usage
;<Graph dataPoints={marketData} containerStyle={customStyles} />
```

### Props

- `dataPoints`: Array of market data points
- `containerStyle`: Optional custom styles for the container

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
