import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { registerSW } from 'virtual:pwa-register';

// Point 62: Register PWA Service Worker for Offline-First capability
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, click on reload button to update.');
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
})

createRoot(document.getElementById("root")!).render(<App />);
