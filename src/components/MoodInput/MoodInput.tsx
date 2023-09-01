import { IonCardSubtitle, IonCardTitle, IonCol, IonRange, IonRow } from "@ionic/react";
import './moodInput.css';
import MoodService from "../../services/MoodService";

interface Props {
    mood: number;
    setMood: (mood: number) => void;
    className?: string;
}

export default ({mood, setMood, className = ''}: Props) => {
    const moodService = new MoodService();

    return (
        <div className={className}>
            <IonCardTitle className="ion-padding-bottom ion-text-center">
                {moodService.getMoodCaption(mood)}
            </IonCardTitle>
            <IonRange
                className="mood-input"
                min={-100} max={100} step={1} value={mood} color="primary" 
                onIonInput={({ detail }) => setMood(detail.value as number)} 
            />
            <IonRow>
                <IonCol className="ion-text-start mood-caption">
                    <IonCardSubtitle>
                        {moodService.getMoodCaption(-100)}
                    </IonCardSubtitle>
                </IonCol>
                <IonCol className="ion-text-end mood-caption">
                    <IonCardSubtitle>
                        {moodService.getMoodCaption(100)}
                    </IonCardSubtitle>
                </IonCol>
            </IonRow>
        </div>
    );
}