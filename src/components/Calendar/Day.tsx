import { IonCardSubtitle, IonText } from "@ionic/react"
import MoodIcon from "../MoodIcon/MoodIcon";
import Entry from "../../models/entry/Entry";

interface Props {
    date: Date;
    entries: Entry[];
}

export default ({date, entries}: Props) => {
    const mood = entries.map(x => x.mood).reduce((a, b) => a + b, 0) / entries.length;

    return (
        <div>
            <div className="ion-text-center">
                <IonText>{date.getDate()}</IonText>
            </div>
            <div className="ion-text-center ion-padding-bottom">
                <MoodIcon mood={mood} width="75%" height="100%" />
            </div>
        </div>
    )
}