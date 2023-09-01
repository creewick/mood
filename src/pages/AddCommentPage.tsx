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
    prevTitle: string;
}

export default ({entry, colors, close, prevTitle, save}: Props) => {
    const [comment, setComment] = useState<string>('');
    const title = 'Комментарий';
    const canSkip = true;
    const canSave = true;

    const onSave = async () => {
        await save({...entry, comment});
    }
    
    return (
        <AddEntryModalStep {...{title, prevTitle, colors, save: onSave, close, canSkip, canSave}}>
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