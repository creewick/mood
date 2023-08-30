import { IonText, IonTextarea, IonCard } from "@ionic/react";
import MoodIcon from "../components/MoodIcon/MoodIcon";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import Entry from "../models/storage/Entry";
import AddEntryModalStep from "../components/AddEntryModal/AddEntryModalStep";

interface Props {
    entry: Entry;
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    prevButton: string;
}

export default ({entry, colors, close, prevButton, save}: Props) => {
    const [comment, setComment] = useState<string>('');
    const title = 'Комментарий';

    const saveEntry = async () => {
        await save({...entry, comment});
    }
    
    return (
        <AddEntryModalStep {...{colors, close, title, prevButton, onSaveClick: saveEntry, onNextClick: saveEntry}}>
            <MoodIcon mood={entry.mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="title ion-text-center">
                { moodCaption(entry.mood) }
            </h3>
            <div className="ion-padding-vertical ion-text-center">
                <IonText>
                    Опишите своё самочувствие
                </IonText>
            </div>
            <IonCard className="ion-padding-horizontal">
                <IonTextarea autoGrow={true} value={comment} onIonChange={({ detail }) => setComment(detail.value ?? '')} placeholder="Дополнительный контекст..." />
            </IonCard>
        </AddEntryModalStep>
    );
}