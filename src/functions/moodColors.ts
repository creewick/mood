import tinycolor from "tinycolor2";

function getPrimaryColor(mood: number) {
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

function getSecondaryColor(mood: number) {
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

function getWaveColor(mood: number) {
    const h = mood < 0
        ? 0.001 * mood * mood - 0.4 * mood + 199
        : 0.019 * mood * mood - 3.6 * mood + 196
    
    return tinycolor({h, s: 0.5, l: 0.5});
}

function getBackgroundColor(mood: number, darkTheme: boolean) {
    const h = mood < 0
        ? 0.001 * mood * mood - 0.4 * mood + 199
        : 0.019 * mood * mood - 3.6 * mood + 196
    const s = darkTheme
        ? 40
        : 60
    const l = darkTheme ? 25 : 90;

    return tinycolor({h, s, l});
}

export default function getColors(mood: number) {
    const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return ({
        primary: getPrimaryColor(mood).toHexString(),
        secondary: getSecondaryColor(mood).toHexString(),
        wave: getWaveColor(mood).toHexString(),
        background: getBackgroundColor(mood, darkTheme).toHexString(),
        backgroundSecondary: getBackgroundColor(mood, darkTheme).lighten(20).toHexString(),
    });
}
