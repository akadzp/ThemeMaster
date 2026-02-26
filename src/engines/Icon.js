export default class IconEngine {
    constructor() { this.cache = {}; this.pending = {}; }
    async loadPackIndex(prefix) {
        const cleanPrefix = prefix.replace(/_/g, '-');
        if (this.cache[cleanPrefix]) return this.cache[cleanPrefix];
        if (this.pending[cleanPrefix]) return this.pending[cleanPrefix];
        try {
            const promise = fetch(`https://api.iconify.design/collection?prefix=${cleanPrefix}`)
                .then(res => { if (!res.ok) throw new Error(); return res.json(); })
                .then(data => {
                    const validIcons = new Set(data.uncategorized || []);
                    if (data.categories) Object.values(data.categories).forEach(l => l.forEach(n => validIcons.add(n)));
                    if (data.aliases) Object.keys(data.aliases).forEach(a => validIcons.add(a));
                    this.cache[cleanPrefix] = validIcons;
                    delete this.pending[cleanPrefix];
                    return validIcons;
                })
                .catch(() => { delete this.pending[cleanPrefix]; return new Set(); });
            this.pending[cleanPrefix] = promise;
            return promise;
        } catch (e) { return new Set(); }
    }
    async process(state, config) {
        const pack = state.activeIconPack || 'solar';
        const validSet = await this.loadPackIndex(pack);
        const iconList = Array.from(validSet);
        const findBestMatch = (keywords) => {
            if (!keywords || keywords.length === 0) return null;
            if (iconList.length === 0) return keywords[0]; 
            for (let i = 0; i < keywords.length; i++) {
                const primary = keywords[i];
                const modifiers = keywords.filter(k => k !== primary);
                const candidates = iconList.filter(name => name.includes(primary));
                if (candidates.length > 0) {
                    candidates.sort((a, b) => {
                        let scoreA = 0, scoreB = 0;
                        modifiers.forEach(mod => { if (a.includes(mod)) scoreA += 10; if (b.includes(mod)) scoreB += 10; });
                        if (a.startsWith(primary)) scoreA += 5; if (b.startsWith(primary)) scoreB += 5;
                        scoreA -= a.length * 0.5; scoreB -= b.length * 0.5;
                        return scoreB - scoreA;
                    });
                    return candidates[0];
                }
            }
            return keywords[0];
        };
        
        const resolvedIcons = {};
        if (config.FALLBACKS) {
            Object.keys(config.FALLBACKS).forEach(key => {
                resolvedIcons[key] = `${pack}:${findBestMatch(config.FALLBACKS[key])}`;
            });
        }

        return { 
            iconography: { 
                currentPack: pack, 
                scriptUrl: config.API_SCRIPT, 
                resolved: resolvedIcons 
            } 
        };
    }
}