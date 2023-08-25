import { IonCardTitle, IonRange } from "@ionic/react";
import './MoodInput.css';
import getColors from "../functions/moodColors";

interface Props {
    mood: number;
    setMood: (mood: number) => void;
    className?: string;
}

export default ({mood, setMood, className = ''}: Props) => {
    const colors = getColors(mood);
    const caption =
        mood < -75 ? 'Очень неприятно' :
        mood < -50 ? 'Неприятно' :
        mood < -25 ? 'Немного неприятно' :
        mood < 25 ? 'Нормально' :
        mood < 50 ? 'Немного приятно' :
        mood < 75 ? 'Приятно' :
        'Очень приятно';

    return (
        <div className={className}>
            <IonCardTitle className="ion-padding-bottom ion-text-center">
                {caption}
            </IonCardTitle>
            <IonRange
                data-color={colors.primary}
                className="moodInput ion-padding-horizontal"
                min={-100} max={100} step={1} value={mood} color="primary" 
                onIonInput={({ detail }) => setMood(detail.value as number)} 
            />
        </div>
    );
}