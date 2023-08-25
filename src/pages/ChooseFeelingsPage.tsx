import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCardTitle, IonFooter, IonBackButton, IonNavLink, IonCardSubtitle, IonText, IonSplitPane, IonChip, IonCol, IonGrid, IonRow } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import MoodInput from "../components/MoodInput";
import tinycolor from "tinycolor2";
import ChooseMoodPage from "./ChooseMoodPage";
import { useState } from "react";

interface Props {
    mood: number;
    colors: any;
    close: () => void;
}

export default ({mood, colors, close}: Props) => {
    const [feelings, setFeelings] = useState<string[]>([]);
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
    const caption =
        mood < -75 ? 'Очень неприятно' :
        mood < -50 ? 'Неприятно' :
        mood < -25 ? 'Немного неприятно' :
        mood < 25 ? 'Нормально' :
        mood < 50 ? 'Немного приятно' :
        mood < 75 ? 'Приятно' :
        'Очень приятно';

    const negativeFeelings = [
        'Злость', 'Тревожность', 'Страх', 'Переизбыток чувств', 'Стыд', 'Отвращение', 'Неловкость', 'Негодование', 'Недовольство', 'Зависть', 'Стресс', 'Беспокойство', 'Вина', 'Удивление', 'Безнадежность', 'Раздраженность', 'Одиночество', 'Уныние', 'Разочарование', 'Измотанность', 'Грусть'
    ];
    const onClick = (feeling: string) => {
        if (feelings.includes(feeling)) {
            setFeelings(feelings.filter((f) => f !== feeling));
        } else {
            setFeelings([...feelings, feeling]);
        }
    }
    
    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={modalStyle}>
                    <IonButtons slot="start">
                        <IonBackButton text="Настроение" />
                    </IonButtons>
                    <IonTitle>Чувства</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={modalContentStyle} className="ion-padding ion-text-center">
                <MoodIcon mood={mood} width="100px" height="100px" animate={false} />
                <IonCardTitle className="ion-padding-bottom">
                    {caption}
                </IonCardTitle>
                <IonText className="ion-padding-vertical">
                    Какими словами можно описать Ваши чувства?
                </IonText>
                <div className="ion-padding-vertical">
                { negativeFeelings.map((feeling) => 
                    <IonChip key={feeling} outline={!feelings.includes(feeling)} onClick={() => onClick(feeling)}>
                        {feeling}
                    </IonChip>) 
                }
                </div>
            </IonContent>
            <IonFooter style={modalStyle} className="ion-padding">
                <IonNavLink routerDirection="forward" component={() => <ChooseMoodPage close={close} />}>
                    <IonButton style={buttonStyle} className="ion-padding-horizontal ion-padding-bottom" expand="block">
                        Далее
                    </IonButton>
                </IonNavLink>
            </IonFooter>
        </>
    );
}