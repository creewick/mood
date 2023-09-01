import ColorService from "../../services/ColorService";

interface Props {
    index: number;
    mood: number;
    path: string;
    animate?: boolean;
}

export default ({index, mood, path, animate}: Props) => {
    let className = `wave wave${index}`;
    if (animate) className += ' animate';
    if (mood < -50) className += ' negative';

    const angle = mood < -50 
        ? (mood + 50) / 10 * index 
        : 0;

    const transformOrigin = '50% 50%';
    const transform = `rotate(${angle}deg)`;

    return (
        <g key={index} style={{transformOrigin, transform}}>
            <path 
                d={path} 
                className={className} 
                fill={ColorService.waveHex(mood)} 
                stroke={ColorService.secondaryHex(mood)} 
                strokeWidth="1" 
            />
        </g>
    )
};