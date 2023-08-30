import { IonCardTitle, IonRange } from "@ionic/react";
import './MoodInput.css';
import moodCaption from "../../functions/moodCaptions";

interface Props {
    mood: number;
    setMood: (mood: number) => void;
    className?: string;
}

export default ({mood, setMood, className = ''}: Props) => {
    return (
        <div className={className}>
            <IonCardTitle className="ion-padding-bottom ion-text-center">
                {moodCaption(mood)}
            </IonCardTitle>
            <IonRange
                className="moodInput"
                min={-100} max={100} step={1} value={mood} color="primary" 
                onIonInput={({ detail }) => setMood(detail.value as number)} 
            />
        </div>
    );
}