import getColors from '../functions/moodColors';
import './MoodIcon.css';

interface Props {
    mood: number;
    animate?: boolean;
    size?: string;
}

interface Point {
    x: number;
    y: number;
}

export default function MoodIcon({ mood, animate, size = '100px'}: Props) {
    const canvasSize = 200;
    const canvasCenter = canvasSize / 2;
    const iconRadius = canvasSize / 5;
    const colors = getColors(mood);

    const scale = 1 - Math.abs(mood) / 400;
    const angle = mood < 0 ? '.4rad' : '.3rad';
    const pointsCount = mood < 0 ? 8 : 5;
    const controlValue = mood < 0 ? .15 - mood / 100 : .40 + mood / 100;
    
    const points = new Array(pointsCount).fill(0)
        .map((_, i) => getPoint((i / pointsCount) * Math.PI * 2));

    const path = points.reduce<string>((acc, start, i) => {
        const end = points[(i + 1) % pointsCount];
        const control = getControlPoint(start, end, controlValue);
        return acc + `Q ${control.x},${control.y} ${end.x},${end.y} `;
    }, `M ${points[0].x},${points[0].y}`);

    function getPoint(angle: number): Point { 
        return { 
            x: canvasCenter + iconRadius * Math.cos(angle), 
            y: canvasCenter + iconRadius * Math.sin(angle) 
        };
    }

    function getControlPoint(start: Point, end: Point, value: number): Point {
        const midpoint: Point = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2
        };

        const delta: Point = {
            x: start.y - end.y,
            y: end.x - start.x
        };

        const length = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        const distance = value * iconRadius;
        
        const normal: Point = {
            x: delta.x / length,
            y: delta.y / length
        };

        return {
            x: midpoint.x - distance * normal.x,
            y: midpoint.y - distance * normal.y
        };
    }
    
    function getWaveClass(mood: number, i: number): string {
        return [
            'wave',
            `wave${i}`,
            animate ? 'animate' : '',
            mood < -50 ? 'negative' : ''
        ].join(' ');
    }

    function getWaveTransform(mood: number, i: number) {
        if (mood > -50) return '';
        return `rotate(${(mood + 50) / 10 * i}deg)`;
    }

    return (
        <svg viewBox={`0 0 ${canvasSize} ${canvasSize}`} width={size} height={size}>
            <defs>
                <radialGradient id="gradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="35%" fx="50%" fy="50%">
                    <stop offset="0" stopColor={colors.primary} />
                    <stop offset="0.75" stopColor={colors.secondary} />
                </radialGradient>
            </defs>
            <g style={{transformOrigin: '50% 50%', transform: `scale(${scale}) rotate(${angle})`}}>
                <path d={path} fill={colors.primary} className="big" />
                {[1,2,3].map(i => 
                    <g style={{transformOrigin: '50% 50%', transform: getWaveTransform(mood, i)}}>
                        <path key={i} d={path} fill={colors.primary} className={getWaveClass(mood, i)} stroke={colors.secondary} strokeWidth="1" />
                    </g>
                )}
                <path d={path} fill="url(#gradient)" className="big" stroke={colors.secondary} />
                <path d={path} fill={colors.secondary} className="small" />
            </g>
        </svg>
    );
}