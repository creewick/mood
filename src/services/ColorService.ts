import tinycolor from "tinycolor2";

export default class ColorService {

    public static primary(mood: number) {
        const h = mood < 0
            ? 0.001 * mood * mood - 0.4 * mood + 199
            : 0.019 * mood * mood - 3.6 * mood + 196
        const s = mood < 0
            ? 0.001 * mood * mood - 0.3 * mood + 54
            : 0.001 * mood * mood + 0.3 * mood + 51
        const l = mood < 0
            ? 0.002 * mood * mood + 0.7 * mood + 70
            : 0.004 * mood * mood - 0.6 * mood + 70
    
        return tinycolor({h, s, l});
    }

    public static secondary(mood: number) {
        const h = mood < 0
            ? 0.015 * mood * mood + 0.7 * mood + 196
            : 0.023 * mood * mood - 3.7 * mood + 192
        const s = mood < 0
            ? -0.007 * mood * mood - 0.3 * mood + 92
            : -0.002 * mood * mood + 0.2 * mood + 92
        const l = mood < 0
            ? -0.003 * mood * mood - 0.05 * mood + 93
            : 0.004 * mood * mood - 0.5 * mood + 93
    
        return tinycolor({h, s, l});
    }

    public static wave(mood: number) {
        const h = mood < 0
            ? 0.001 * mood * mood - 0.4 * mood + 199
            : 0.019 * mood * mood - 3.6 * mood + 196
        const s = 0.5;
        const l = 0.5;
        
        return tinycolor({h, s, l});
    }

    public static background(mood: number) {
        const h = mood < 0
            ? 0.001 * mood * mood - 0.4 * mood + 199
            : 0.019 * mood * mood - 3.6 * mood + 196
        const s = ColorService.isDarkTheme()
            ? 40
            : 60
        const l = ColorService.isDarkTheme() 
            ? 25 
            : 90;
    
        return tinycolor({h, s, l});
    }

    public static primaryHex = (mood: number) => ColorService.primary(mood).toHexString();
    public static secondaryHex = (mood: number) => ColorService.secondary(mood).toHexString();
    public static waveHex = (mood: number) => ColorService.wave(mood).toHexString();
    public static backgroundHex = (mood: number) => ColorService.background(mood).toHexString();

    public static isDarkTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
