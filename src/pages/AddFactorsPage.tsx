import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCardTitle, IonFooter, IonBackButton, IonNavLink, IonText, IonChip, IonTextarea, IonInput } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import tinycolor from "tinycolor2";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import getFactors from "../functions/factors";
import Title from "../components/Title";
import AddCommentPage from "./AddCommentPage";
import Entry from "../models/Entry";

interface Props {
    mood: number;
    feelings: string[];
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
}

export default ({mood, feelings, colors, close, save}: Props) => {
    const [factors, setFactors] = useState<string[]>([]);
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

    const headerStyle = {
        '--background': colors.background
    }

    const onClick = (factor: string) => {
        if (factors.includes(factor)) {
            setFactors(factors.filter((f) => f !== factor));
        } else {
            setFactors([...factors, factor]);
        }
    }
    
    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    <IonButtons slot="start">
                        <IonBackButton text="Чувства" />
                    </IonButtons>
                    <IonTitle>Влияние</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={modalContentStyle} className="ion-padding ion-text-center">
                <MoodIcon mood={mood} width="100px" height="100px" animate={false} />
                <Title>
                    {moodCaption(mood)}
                </Title>
                <IonText className="ion-padding-vertical">
                    Что оказало наибольшее влияние?
                </IonText>
                { getFactors().map(group =>
                    <div className="ion-padding-top">
                        { group.sort((a, b) => b.length - a.length).map(factor => 
                            <IonChip key={factor} outline={!factors.includes(factor)} onClick={() => onClick(factor)}>
                                {factor}
                            </IonChip>
                        )}
                    </div>
                )}
            </IonContent>
            <IonFooter style={modalStyle} className="ion-padding">
                <IonNavLink routerDirection="forward" component={() => <AddCommentPage mood={mood} feelings={feelings} factors={factors} colors={colors} close={close} save={save} />}>
                    <IonButton style={buttonStyle} className="ion-padding-horizontal ion-padding-bottom" expand="block">
                        Далее
                    </IonButton>
                </IonNavLink>
            </IonFooter>
        </>
    );
}