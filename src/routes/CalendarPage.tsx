import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { Translation } from "i18nano";

export default () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <Translation path="tabs.calendar" />
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-vertical">
              
            </IonContent>
        </IonPage>
    );
}