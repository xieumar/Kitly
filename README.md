# Kitly

**Precision orchestration for your daily workflows.**

Kitly is a mobile app that brings professional productivity tools to your fingertips. From real-time unit conversions to technical documentation, Kitly is engineered for precision and performance.

## Features

### Dashboard
- Live system status 
- Real-time clock
- Quick access to all modules
- System reliability monitoring (coming soon)
- Recent activity tracking (coming soon)  


### Unit Converter
Convert between multiple unit systems instantly:
- **Currency** - Track real-time exchange rates (USD, EUR, GBP, JPY, CHF, CAD, AUD, SGD)
- **Length** - Meters, feet, kilometers, miles, and more
- **Temperature** - Celsius to Fahrenheit conversions
- **Weight** - Kilograms, pounds, grams, ounces, and more

### Technical Notes
A powerful note-taking system designed for engineers and developers:
- **Simple Notes** - Quick thoughts and drafts
- **Technical Notes** - Detailed documentation with formatting
- Mark tasks as complete   
- Full edit and delete capabilities

### Calculator
Quick calculations on demand.

### Sequence Timer
Multi-step timer for workflows and processes.

## Tech Stack

- **Framework**: [Expo](https://expo.dev) + [React Native](https://reactnative.dev)
- **Navigation**: [Expo Router](https://expo.github.io/router)
- **Animations**: [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated)
- **UI Icons**: [@expo/vector-icons](https://docs.expo.dev/guides/icons)
- **Language**: TypeScript
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g eas-cli`

### Installation

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npm start
   ```

3. Open the app:
   - **iOS**: Press `i` or open [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - **Android**: Press `a` or open [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - **Web**: Press `w` for web preview
   - **Expo Go**: Scan the QR code with [Expo Go](https://expo.dev/go)

### Available Scripts

```bash
npm start          # Start development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run reset-project  # Reset to blank app
```

## Project Structure

```
kitly/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based main navigation
│   │   ├── index.tsx      # Home dashboard
│   │   ├── converter.tsx  # Unit converter
│   │   └── notes.tsx      # Notes management
│   ├── note-detail.tsx    # Note editor
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── home/             # Dashboard widgets
│   ├── converter/        # Converter components
│   ├── notes/            # Note components
│   └── ui/               # Common UI elements
├── src/
│   ├── context/          # React Context providers
│   ├── constants/        # App constants and mock data
│   └── hooks/            # Custom React hooks
└── assets/               # Images and static assets
```

## Development

### Code Style
This project uses ESLint and TypeScript for code quality:

```bash
npm run lint
```

### File-Based Routing
Kitly uses Expo Router's file-based routing system. Routes are automatically created based on file structure in the `app/` directory.

## Performance Optimizations

- Reanimated 4 for smooth, 60fps animations
- React Compiler support for optimized renders
- Tab-based navigation for efficient memory usage
- Lazy loading where applicable

## Building for Production

To build standalone apps:

```bash
eas build --platform ios
eas build --platform android
```

For web deployment:

```bash
npm run build
```



## License

Private - All rights reserved

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Router Guide](https://expo.dev/router)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Built with precision. Engineered for execution.**
