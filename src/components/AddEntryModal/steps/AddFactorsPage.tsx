import { IonCardTitle, IonChip, IonText } from "@ionic/react";
import { Translation } from "i18nano";
import { useState } from "react";
import Entry from "../../../models/entry/Entry";
import MoodService from "../../../services/MoodService";
import MoodIcon from "../../MoodIcon/MoodIcon";
import AddEntryModalStep from "../AddEntryModalStep";
import AddCommentPage from "./AddCommentPage";
import { HealthTrigger, SocialTrigger, TaskTrigger, Trigger } from "../../../models/entry/Trigger";

interface Props {
    entry: Entry;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    prevTitle: string;
}

export default ({entry, close, prevTitle, save}: Props) => {
    const [triggers, setTriggers] = useState<Trigger[]>([]);
    const moodService = new MoodService();
    const title = 'modal.triggers';
    const nextComponent = <AddCommentPage {...{close, save, prevTitle: title, entry: {...entry, triggers: triggers}}} />;
    const canSkip = true;
    
    const onClick = (trigger: number) => {
        setTriggers(triggers.includes(trigger)
            ? triggers.filter((f) => f !== trigger)
            : [...triggers, trigger]);
    }

    const renderTrigger = (trigger: number) => (
        <IonChip key={trigger} outline={!triggers.includes(trigger)} onClick={() => onClick(trigger)}>
            {moodService.getTriggerCaption(trigger)}
        </IonChip>
    );

    const renderGroup = (group: number[]) => (
        <div className="ion-padding-top ion-text-center">
            { group.map(renderTrigger) }
        </div>
    );

    const onSave = async () => {
        await save({...entry, triggers: triggers});
    }

    const getGroup = (type: any) => {
        return Object.keys(type).map(x => Number(x)).filter(x => !isNaN(x));
    }

    return (
        <AddEntryModalStep {...{nextComponent, title, prevTitle, save: onSave, mood: entry.mood, close, canSkip}}>
            <IonCardTitle className="ion-padding-vertical ion-text-center">
                <Translation path="modal.whatIsHavingTheBiggestImpactOnYou" />
            </IonCardTitle>
            <MoodIcon mood={entry.mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="title ion-text-center">
                { moodService.getMoodCaption(entry.mood) }
            </h3>
            { renderGroup(getGroup(HealthTrigger)) }
            { renderGroup(getGroup(SocialTrigger)) }
            { renderGroup(getGroup(TaskTrigger)) }
        </AddEntryModalStep>
    );
}