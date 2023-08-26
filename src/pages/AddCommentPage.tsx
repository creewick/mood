import { IonText, IonInput, IonTextarea } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import Entry from "../models/Entry";
import AddEntryModalStep from "../components/modals/AddEntryModalStep";
import "../components/ContextInput.css";

interface Props {
    mood: number;
    feelings: string[];
    factors: string[];
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    prevButton: string;
}

export default ({mood, feelings, factors, colors, close, prevButton, save}: Props) => {
    const [comment, setComment] = useState<string>('');
    const title = 'Комментарий';

    const saveEntry = async () => {
        await save({mood, feelings, factors, comment, date: new Date()});
        close();
    }
    
    return (
        <AddEntryModalStep {...{colors, close, title, prevButton, save: saveEntry}}>
            <MoodIcon mood={mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="title ion-text-center">
                { moodCaption(mood) }
            </h3>
            <div className="ion-padding-vertical ion-text-center">
                <IonText>
                    Опишите своё самочувствие
                </IonText>
            </div>
            <div className="ion-padding">
                <IonTextarea className="context-input" autoGrow={true} value={comment} onIonChange={({ detail }) => setComment(detail.value ?? '')} placeholder="Дополнительный контекст..." />
            </div>
        </AddEntryModalStep>
    );
}