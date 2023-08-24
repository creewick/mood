import tinycolor from "tinycolor2";

const colors = [
    { mood: -100, hue: 260 },
    { mood: -50, hue: 230 },
    { mood: 0, hue: 200 },
    { mood: 50, hue: 60 },
    { mood: 100, hue: 30 },
]

function getHue(mood: number) {
    let lowerBound, upperBound;

    for (let i = 0; i < colors.length - 1; i++) {
        if (mood >= colors[i].mood && mood <= colors[i + 1].mood) {
            lowerBound = colors[i];
            upperBound = colors[i + 1];
            break;
        }
    }

    if (!lowerBound || !upperBound) return getHue(0);

    const range = upperBound.mood - lowerBound.mood;
    const differenceFromLower = mood - lowerBound.mood;
    const mixPercentage = differenceFromLower / range;

    return lowerBound.hue + (upperBound.hue - lowerBound.hue) * mixPercentage;
}

export default function getColors(mood: number) {
    const h = getHue(mood);
    const d = Math.abs(mood) / 100;    

    return ({
        primary: tinycolor({h: h, s: 0.7, l: 0.8 - 0.2 * d}).toHexString(),
        secondary: tinycolor({h: h + 20, s: 0.5, l: 1 - 0.2 * d}).toHexString(),
        waves: tinycolor({h: h + 10, s: 0.6, l: 0.7}).toHexString(),
        background: tinycolor({h: h, s: 0.4, l: 0.9}).toHexString(),
    });
}
