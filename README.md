# Greater Horn of Africa Disaster Dashboard

An interactive visualization dashboard analyzing humanitarian crises across the Greater Horn of Africa region for October–December 2025.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Recharts](https://img.shields.io/badge/Recharts-2.x-orange)

## 🌍 Overview

This dashboard provides comprehensive visualizations of multi-hazard disaster impacts across 8 countries in the Greater Horn of Africa:

- **Uganda** - Landslides and flooding
- **Kenya** - Drought and localized flooding
- **Ethiopia** - Drought, conflict, and health emergencies
- **Somalia** - Severe drought emergency
- **South Sudan** - Flooding and cholera epidemic
- **Rwanda** - Weather-related disasters
- **Burundi** - Floods, disease outbreaks, refugee crisis
- **DRC** - Flooding, conflict, Ebola outbreak

## 📊 Key Metrics Visualized

- **14+ million people affected** across the region
- **~6 million displaced** (including 4.92M IDPs in DRC)
- **155,000+ cholera cases** across multiple countries
- **1.4 million malaria cases** in Ethiopia alone

## 🚀 Live Demo

Visit the live dashboard: [GHA Disaster Dashboard](https://[username].github.io/gha-disaster-dashboard/)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Recharts** - Data visualization
- **Vite** - Build tool
- **GitHub Pages** - Hosting

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/[username]/gha-disaster-dashboard.git

# Navigate to directory
cd gha-disaster-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
gha-disaster-dashboard/
├── src/
│   ├── App.jsx          # Main dashboard component
│   ├── main.jsx         # React entry point
│   └── index.css        # Base styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Pages deployment
```

## 📈 Data Sources

- ECHO (European Civil Protection and Humanitarian Aid Operations)
- FEWS NET (Famine Early Warning Systems Network)
- IOM (International Organization for Migration)
- UNOCHA (UN Office for the Coordination of Humanitarian Affairs)
- IPC (Integrated Food Security Phase Classification)
- IFRC (International Federation of Red Cross)
- WHO (World Health Organization)

## 🔧 Configuration

To deploy to your own GitHub Pages:

1. Update `vite.config.js` with your repository name:
   ```js
   base: '/your-repo-name/',
   ```

2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

## 📄 License

MIT License - Feel free to use and modify for humanitarian and research purposes.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

*Developed for humanitarian monitoring and early warning systems research at ICPAC.*
