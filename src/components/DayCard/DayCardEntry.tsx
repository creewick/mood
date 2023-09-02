import { IonItemSliding, IonItem, IonRow, IonCol, IonLabel, IonItemOptions, IonItemOption, IonThumbnail, IonGrid, IonAlert } from "@ionic/react";
import MoodIcon from "../MoodIcon/MoodIcon";
import Entry from "../../models/entry/Entry";
import "./DayCard.css";
import { useContext, useState } from "react";
import StorageContext from "../../models/StorageContext";
import EntryService from "../../services/EntryService";
import MoodService from "../../services/MoodService";
import { useTranslation } from "i18nano";

interface Props {
    entry: Entry;
}

export default ({ entry }: Props) => {
    const [showAlert, setShowAlert] = useState(false);
    const t = useTranslation();
    const moodService = new MoodService();
    const time = entry.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const tags = entry.feelings.map(moodService.getFeelingCaption)
        .concat(entry.triggers.map(moodService.getTriggerCaption))
        .map((x, i) => i === 0 ? x : <>, {x}</>);
    const entryService = new EntryService(useContext(StorageContext));

    return (
        <IonItemSliding> 
            <IonItem>
                <IonThumbnail slot="start" style={{'--size': '48px'}}>
                    <MoodIcon mood={entry.mood} width="48px" height="48px" animate={false} />
                
                </IonThumbnail>
                <IonGrid style={{width: '100%'}}>
                    <IonRow>
                        <IonCol>
                            <IonLabel className="day-card-mood">
                                {moodService.getMoodCaption(entry.mood)}
                            </IonLabel>
                        </IonCol>
                        <IonCol style={{maxWidth: '48px', minWidth: '48px'}}>
                            <div className="day-card-text ion-text-end">
                                {time}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonLabel className="day-card-text">
                                {tags}
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItem>
            <IonItemOptions>
                <IonItemOption color="danger" onClick={() => setShowAlert(true)}>
                    {t('actions.delete')}
                </IonItemOption>
                <IonAlert 
                    isOpen={showAlert}
                    header={t('actions.deleteEntry') + '?'}
                    message={t('actions.youCantUndoThisAction')}
                    buttons={[
                        {
                            text: t('actions.cancel'),
                            role: 'cancel',
                            handler: () => setShowAlert(false)
                        }, {
                            text: t('actions.delete'),
                            role: 'destructive',
                            handler: async () => await entryService.remove(entry)
                        }
                    ]}
                />
            </IonItemOptions>
        </IonItemSliding>
    );
}