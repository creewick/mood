import { IonButton, IonButtons, IonCardTitle, IonContent, IonFooter, IonHeader, IonNavLink, IonTitle, IonToolbar } from "@ionic/react";
import getColors from "../functions/moodColors";
import tinycolor from "tinycolor2";
import MoodIcon from "../components/MoodIcon";
import MoodInput from "../components/MoodInput";
import ChooseFeelingsPage from "./ChooseFeelingsPage";
import { useState } from "react";

interface Props {
    close: () => void;
}

export default ({close}: Props) => {
    const [mood, setMood] = useState(0);
    const colors = getColors(mood);

    const modalContentStyle = {
        '--background': `radial-gradient(${
            tinycolor(colors.background).lighten(20)} 0%, ${
            colors.background} 70%)`,
    }
    const buttonStyle = {
        '--background': colors.primary,
        '--background-hover': tinycolor(colors.primary).lighten(10).toHexString(),
        '--background-activated': tinycolor(colors.primary).lighten(20).toHexString(),
        '--background-focused': tinycolor(colors.primary).lighten(10).toHexString(),
        '--border-radius': '50px',
    }  
    const modalStyle = {
        '--background': colors.background,
        'background': colors.background
    }

    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={modalStyle}>
                    <IonTitle>Настроение</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={modalContentStyle} className="ion-padding-horizontal ion-text-center">
                <IonCardTitle className="ion-margin-top">
                    Как Вы чувствуете себя сейчас?
                </IonCardTitle>
                <MoodIcon mood={mood} width="100%" height="calc(100% - 86px)" animate={true} />
            </IonContent>
            <IonFooter style={modalStyle} className="ion-padding-horizontal ion-padding-bottom">
                <MoodInput mood={mood} setMood={setMood} className="ion-padding-horizontal ion-padding-bottom" />
                <IonNavLink routerDirection="forward" component={() => <ChooseFeelingsPage mood={mood} colors={colors} close={close} />}>
                    <IonButton style={buttonStyle} className="ion-padding-horizontal ion-padding-bottom" expand="block">
                        Далее
                    </IonButton>
                </IonNavLink>
            </IonFooter>
        </>
    );
}