import { IonItemSliding, IonItem, IonRow, IonCol, IonLabel, IonItemOptions, IonItemOption, IonCardSubtitle } from "@ionic/react";
import moodCaptions from "../../functions/moodCaptions";
import MoodIcon from "../MoodIcon/MoodIcon";
import Entry from "../../models/storage/Entry";
import "./DayCard.css";
import { useContext } from "react";
import StorageContext from "../../models/StorageContext";
import EntryService from "../../services/EntryService";

interface Props {
    entry: Entry;
    colors: any;
}

export default ({ entry, colors }: Props) => {
    const time = entry.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const tags = entry.feelings.concat(entry.factors).join(', ');
    const entryService = new EntryService(useContext(StorageContext));
    const onDelete = async () => {
        await entryService.remove(entry);
        location.reload();
    }

    return (
        <IonItemSliding>
            <IonItem style={{'--background': colors.background}}>
                <IonRow>
                    <IonCol size="2">
                        <MoodIcon mood={entry.mood} width="100%" height="48px" animate={false} />
                    </IonCol>
                    <IonCol style={{marginTop: '8px'}}>
                        <div className="day-card-mood">
                            {moodCaptions(entry.mood)}
                        </div>
                        <div className="day-card-tags">
                            {tags}
                        </div>
                    </IonCol>
                    <IonCol size="2" style={{marginTop: '8px'}}>
                        <div className="day-card-tags ion-text-end">
                            {time}
                        </div>
                    </IonCol>
                </IonRow>
            </IonItem>
            <IonItemOptions>
                <IonItemOption color="danger" onClick={onDelete}>Удалить</IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
}