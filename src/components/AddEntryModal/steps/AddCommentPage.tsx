import { IonText, IonTextarea, IonCard } from "@ionic/react";
import MoodIcon from "../../MoodIcon/MoodIcon";
import { useState } from "react";
import Entry from "../../../models/entry/Entry";
import AddEntryModalStep from "../AddEntryModalStep";
import { Translation, useTranslation } from "i18nano";
import MoodService from "../../../services/MoodService";

interface Props {
    entry: Entry;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    prevTitle: string;
}

export default ({entry, close, prevTitle, save}: Props) => {
    const [comment, setComment] = useState<string>('');
    const t = useTranslation();
    const moodService = new MoodService();
    const title = 'modal.comment';
    const canSave = true;

    const onSave = async () => {
        await save({...entry, comment});
    }
    
    return (
        <AddEntryModalStep {...{title, prevTitle, save: onSave, mood: entry.mood, close, canSave}}>
            <MoodIcon mood={entry.mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="title ion-text-center">
                { moodService.getMoodCaption(entry.mood) }
            </h3>
            <div className="ion-padding-vertical ion-text-center">
                <IonText>
                    <Translation path="modal.describeYourFeeling" />
                </IonText>
            </div>
            <IonCard className="ion-padding-horizontal">
                <IonTextarea autoGrow={true} value={comment} onIonChange={({ detail }) => setComment(detail.value ?? '')} placeholder={t('modal.describeYourFeeling')} />
            </IonCard>
        </AddEntryModalStep>
    );
}