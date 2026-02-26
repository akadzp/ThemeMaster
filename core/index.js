// index.js
import { API } from './orchestrator.js';

// Inisialisasi global namespace
window.UniverseStudio = window.UniverseStudio || {
    Registry: {},
    Core: API,
    UI: {}
};

// Beritahu sistem bahwa Core sudah terpasang
window.dispatchEvent(new CustomEvent('SDK_CORE_READY'));
