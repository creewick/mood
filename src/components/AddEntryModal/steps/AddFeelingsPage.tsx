import { IonCardTitle, IonChip, IonText } from "@ionic/react";
import { Translation } from "i18nano";
import { useState } from "react";
import Entry from "../../../models/entry/Entry";
import MoodService from "../../../services/MoodService";
import MoodIcon from "../../MoodIcon/MoodIcon";
import AddEntryModalStep from "../AddEntryModalStep";
import AddFactorsPage from "./AddFactorsPage";
import { Feeling, NegativeFeeling, NeutralFeeling, PositiveFeeling } from "../../../models/entry/Feeling";


interface Props {
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    entry: Entry;
    prevTitle: React.ReactNode;
}

export default ({entry, close, prevTitle, save}: Props) => {
    const [feelings, setFeelings] = useState<Feeling[]>([]);
    const moodService = new MoodService();
    const title = <Translation path="modal.feelings" />
    const nextComponent = <AddFactorsPage {...{close, save, prevTitle: title, entry: {...entry, feelings}}} />;
    const canSkip = true;

    const feelingsType = 
        entry.mood < -25 ? NegativeFeeling :
        entry.mood < 25 ? NeutralFeeling : PositiveFeeling;

    const feelingsList = Object.keys(feelingsType).map(x => Number(x)).filter(x => !isNaN(x));

    const onClick = (feeling: number) => {
        setFeelings(feelings.includes(feeling)
            ? feelings.filter((f) => f !== feeling)
            : [...feelings, feeling]);
    };

    const renderFeeling = (feeling: number) => (
        <IonChip key={feeling} outline={!feelings.includes(feeling)} onClick={() => onClick(feeling)}>
            {moodService.getFeelingCaption(feeling)}
        </IonChip>
    );

    const onSave = async () => {
        await save({...entry, feelings});
    }

    return (
        <AddEntryModalStep {...{nextComponent, title, prevTitle, close, save: onSave, mood: entry.mood, canSkip}}>
            <IonCardTitle className="ion-padding-vertical ion-text-center">
                <Translation path="modal.whatBestDescribesThisFeeling" />
            </IonCardTitle>
            <MoodIcon mood={entry.mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="ion-text-center">
                { moodService.getMoodCaption(entry.mood) }
            </h3>
            <div className="ion-padding-vertical ion-text-center">
                { feelingsList.map(renderFeeling) }
            </div>
        </AddEntryModalStep>
    );
}