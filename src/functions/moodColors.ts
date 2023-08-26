import tinycolor from "tinycolor2";

function getPrimaryColor(mood: number) {
    const h = mood < 0
        ? 0.001 * mood * mood - 0.4 * mood + 199
        : 0.019 * mood * mood - 3.6 * mood + 196;
    const s = mood < 0
        ? (0.001 * mood * mood - 0.3 * mood + 54) / 100
        : (0.001 * mood * mood + 0.3 * mood + 51) / 100
    const l = mood < 0
        ? (0.002 * mood * mood + 0.7 * mood + 70) / 100
        : (0.004 * mood * mood - 0.6 * mood + 70) / 100

    return tinycolor({h, s, l}).toHexString();
}

function getSecondaryColor(mood: number) {
    const h = mood < 0
        ? 0.015 * mood * mood + 0.7 * mood + 196
        : 0.023 * mood * mood - 3.7 * mood + 192;
    const s = mood < 0
        ? (-0.007 * mood * mood - 0.3 * mood + 92) / 100
        : (-0.002 * mood * mood + 0.2 * mood + 92) / 100
    const l = mood < 0
        ? (-0.003 * mood * mood - 0.05 * mood + 93) / 100
        : (0.004 * mood * mood - 0.5 * mood + 93) / 100

    return tinycolor({h, s, l}).toHexString();
}

function getWaveColor(mood: number) {
    const h = mood < 0
        ? 0.001 * mood * mood - 0.4 * mood + 199
        : 0.019 * mood * mood - 3.6 * mood + 196;
    
    return tinycolor({h, s: 0.5, l: 0.5}).toHexString();
}

function getBackgroundColor(mood: number, darkTheme: boolean) {
    const h = mood < 0
        ? 0.001 * mood * mood - 0.4 * mood + 199
        : 0.019 * mood * mood - 3.6 * mood + 196;
    const s = mood < 0
        ? -0.008 * mood * mood - 0.9 * mood + 17
        : 0.005 * mood * mood + 0.2 * mood + 19;
    const l = darkTheme ? 20 : 90;

    return tinycolor({h, s, l}).toHexString();
}

export default function getColors(mood: number) {
    const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return ({
        primary: getPrimaryColor(mood),
        secondary: getSecondaryColor(mood),
        wave: getWaveColor(mood),
        background: getBackgroundColor(mood, darkTheme),
    });
}
