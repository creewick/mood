import QuadraticBezierCurve from './geometry/QuadraticBezierCurve';
import ColorService from '../../services/ColorService';
import Circle from './geometry/Circle';
import MoodIconWave from './MoodIconWave';
import './MoodIcon.css';

interface Props {
    mood: number;
    animate?: boolean;
    width?: string;
    height?: string;
}

export default function MoodIcon({ mood, animate = false, width = '100px', height = '100px'}: Props) {
    const canvasSize = 200;
    const iconRadius = canvasSize / 5;
    const iconScale = 1 - Math.abs(mood) / 400;
    const iconAngle = mood < 0 ? '.4rad' : '.3rad';
    const pointsCount = mood < 0 ? 8 : 5;
    const controlValue = mood < 0 
        ? 0.15 - mood / 100 
        : 0.40 + mood / 100;

    const points = Circle.getPoints({ x: canvasSize / 2, y: canvasSize / 2 }, iconRadius, pointsCount);
    const path = QuadraticBezierCurve.fromPoints(points, controlValue * iconRadius).path;

    if (isNaN(mood)) {
        return <svg viewBox={`0 0 ${canvasSize} ${canvasSize}`} width={width} height={height} />
    }

    const gradient = (
        <defs>
            <radialGradient id="gradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="35%" fx="50%" fy="50%">
                <stop offset="0" stopColor={ColorService.primaryHex(mood)} />
                <stop offset="0.75" stopColor={ColorService.secondaryHex(mood)} />
            </radialGradient>
        </defs>
    );

    const waves = [1, 2, 3].map(index => <MoodIconWave {...{index, mood, path, animate}} />);

    return (
        <svg className="mood-icon" viewBox={`0 0 ${canvasSize} ${canvasSize}`} width={width} height={height}>
            { gradient }
            <g style={{transformOrigin: '50% 50%', transform: `scale(${iconScale}) rotate(${iconAngle})`}}>
                { waves }
                <path d={path} fill="url(#gradient)" stroke={ColorService.secondaryHex(mood)} />
                <path d={path} fill={ColorService.secondaryHex(mood)} className="small" />
            </g>
        </svg>
    );
}