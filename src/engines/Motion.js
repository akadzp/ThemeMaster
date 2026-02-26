export default class MotionEngine {
    process(state, config) {
        return { 
            motion: {
                isInstant: true,
                entranceType: 'none'
            },
            tokens: {} 
        };
    }
}