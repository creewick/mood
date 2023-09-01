import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonNote, IonItem, IonLabel, IonAlert, IonToggle, IonIcon, useIonLoading } from "@ionic/react";
import { useContext } from "react";
import StorageContext from "../models/StorageContext";
import "./SettingsPage.css";
import * as json from "../../package.json";
import { contrastOutline, logInOutline, logOutOutline, refreshOutline, trashOutline } from "ionicons/icons";
import SettingsService from "../services/SettingsService";

export default () => {
    const settingsService = new SettingsService(useContext(StorageContext));
    const [present, dismiss] = useIonLoading();

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
                        await settingsService.clear();
                        location.reload();
                    }
                }
            ]}
        />
    );

    const exportJson = async () => {
        await present({message: "Экспорт данных..."});

        const data = await settingsService.exportJson();

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', 'mood-export-data.json');
        element.style.display = 'none';

        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
        await dismiss();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Настройки</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-vertical">
                <IonNote className="ion-padding-start ion-margin-start ion-text-uppercase">
                    Оформление
                </IonNote>
                <IonList inset={true}>
                    <IonItem color="light">
                        <IonIcon slot="start" icon={contrastOutline} />
                        Темное
                        <IonToggle slot="end" color="success" />
                    </IonItem>
                    <IonItem color="light">
                        <IonIcon slot="start" icon={refreshOutline} />
                        Автоматически
                        <IonToggle slot="end" color="success" />
                    </IonItem>
                </IonList>
                <IonNote className="ion-padding-start ion-margin-start ion-text-uppercase">
                    Данные
                </IonNote>
                <IonList inset={true}>
                    <IonItem button detail={false} color="light">
                        <IonIcon slot="start" icon={logInOutline} />
                        <IonLabel>
                            Импорт данных
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={false} onClick={exportJson} color="light">
                        <IonIcon slot="start" icon={logOutOutline} />
                        <IonLabel>
                            Экспорт данных
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={false} id="erase-data" color="light">
                        <IonIcon slot="start" color="danger" icon={trashOutline} />
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