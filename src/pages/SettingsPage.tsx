import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonNote, IonItem, IonLabel, IonAlert, IonToggle } from "@ionic/react";
import { useContext } from "react";
import StorageContext from "../models/StorageContext";
import EntryService from "../services/EntryService";
import "./SettingsPage.css";
import * as json from "../../package.json";

export default () => {
    const entryService = new EntryService(useContext(StorageContext));
    
    const renderEraseDataAlert = () => (
        <IonAlert 
            trigger="erase-data" 
            header="Удалить все данные?"
            message="Восстановить данные будет невозможно"
            buttons={[
                {
                    text: 'Отмена',
                    role: 'cancel'
                }, {
                    text: 'Удалить',
                    role: 'destructive',
                    handler: async () => {
                        await entryService.clear();
                        location.reload();
                    }
                }
            ]}
        />
    );


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Настройки</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-vertical" style={{'--background': 'var(--ion-color-light)'}}>
                <IonNote className="ion-padding-start ion-margin-start ion-text-uppercase">
                    Оформление
                </IonNote>
                <IonList inset={true}>
                    <IonItem>
                        Темное
                        <IonToggle disabled slot="end" />
                    </IonItem>
                    <IonItem>
                        Автоматически
                        <IonToggle disabled slot="end" />
                    </IonItem>
                </IonList>
                <IonNote className="ion-padding-start ion-margin-start ion-text-uppercase">
                    Данные
                </IonNote>
                <IonList inset={true}>
                    <IonItem button detail={false} id="erase-data">
                        <IonLabel color="danger">
                            Удалить все данные
                        </IonLabel>
                        { renderEraseDataAlert() }
                    </IonItem>
                </IonList>
                <div className="ion-text-center">
                    <IonNote>
                        Версия {json.version}
                    </IonNote>
                </div>
            </IonContent>
        </IonPage>
    );
}