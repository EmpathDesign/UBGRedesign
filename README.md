# UBG Redesign

Interactive mockup platform built with React and Vite, automatically deployed to GitHub Pages.

## 🚀 Features

- **Modern UI Framework**: Built with React 19 and Vite for fast, interactive mockups
- **Automatic Deployment**: GitHub Actions automatically builds and deploys to GitHub Pages
- **Responsive Design**: Works seamlessly across all devices
- **Interactive Components**: Fully functional UI components with state management

## 📋 How to Request New Mockups

Submit an issue on this repository with your mockup request. Include:
- Screen/page name
- Description of the mockup
- Key features or interactions needed
- Any specific UI elements required

## 🛠️ Development

### Prerequisites
- Node.js 20 or higher
- npm

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── .github/workflows/   # GitHub Actions workflows
└── dist/                # Production build (generated)
```

## 🌐 Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Live URL**: https://empathdesign.github.io/UBGRedesign/

### Manual Deployment

If you need to deploy manually, ensure:
1. GitHub Pages is enabled in repository settings
2. Pages source is set to "GitHub Actions"
3. Push changes to trigger the workflow

## 📦 Technologies

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Hosting platform

## 📝 License

This is a mockup project for design purposes.
