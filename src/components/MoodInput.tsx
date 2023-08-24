import { IonCardTitle, IonRange } from "@ionic/react";
import './MoodInput.css';

interface Props {
    mood: number;
    setMood: (mood: number) => void;
}

export default ({mood, setMood}: Props) => {
    const caption =
        mood < -75 ? 'Очень неприятно' :
        mood < -50 ? 'Неприятно' :
        mood < -25 ? 'Немного неприятно' :
        mood < 25 ? 'Нормально' :
        mood < 50 ? 'Немного приятно' :
        mood < 75 ? 'Приятно' :
        'Очень приятно';

    return (
        <div>
            <IonCardTitle className="ion-padding-bottom">{caption}</IonCardTitle>
            <IonRange
                className="moodInput"
                min={-100} max={100} step={1} value={mood} color="primary" 
                onIonInput={({ detail }) => setMood(detail.value as number)} 
            />
        </div>
    );
}