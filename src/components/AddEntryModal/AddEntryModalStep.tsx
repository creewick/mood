import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonContent, IonFooter, IonNavLink } from "@ionic/react"
import ColorService from "../../services/ColorService";
import { Translation, TranslationProvider } from "i18nano";
import useLocale from "../../services/useLocale";
import { translations } from "../../../i18n";

interface Props {
    children: React.ReactNode;
    footer?: React.ReactNode;
    nextComponent?: React.ReactNode;
    title: React.ReactNode;
    prevTitle?: React.ReactNode;
    mood: number;
    close: () => void;
    save?: () => Promise<void>;
    canSave?: boolean;
    canSkip?: boolean;
}

export default ({children, footer, nextComponent, title, prevTitle, mood, save, close, canSave=false, canSkip=false}: Props) => {
    const language = useLocale();
    const headerStyle = {
        '--background': ColorService.backgroundHex(mood),
    };

    const contentStyle = {
        '--background': `radial-gradient(${
            ColorService.background(mood).lighten(20).toHexString()} 0%, ${
            ColorService.backgroundHex(mood)} 70%)`,
    }
    
    const footerStyle = {
        'background': ColorService.backgroundHex(mood),
        'margin': '0px'
    }

    const buttonStyle = {
        '--background': ColorService.waveHex(mood),
        '--background-hover': ColorService.waveHex(mood),
        '--background-activated': ColorService.primaryHex(mood),
        '--background-focused': ColorService.primaryHex(mood),
    }  

    const linkStyle = {
        '--color': ColorService.waveHex(mood),
    }

    const onClick = async () => {
        if (save && canSave) await save();
    }
    
    return (
        <TranslationProvider language={language} translations={translations.common}>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    { prevTitle && 
                        <IonButtons slot="start">
                            <IonBackButton style={linkStyle}>
                                {prevTitle}
                            </IonBackButton>
                        </IonButtons>
                    }
                    <IonTitle>
                        {title}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close} style={linkStyle}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={contentStyle} className="ion-padding-horizontal">
                {children}
            </IonContent>
            <IonFooter>
                <div style={footerStyle} className="ion-padding-horizontal">
                    {footer}
                    { canSkip &&
                        <div className="ion-text-center">
                            <IonButton fill="clear" style={linkStyle} onClick={save}>
                                <Translation path="modal.skipAndSave" />
                            </IonButton>
                        </div>
                    }
                </div>
                <IonNavLink routerDirection="forward" component={() => nextComponent}>
                    <div className="ion-padding" style={footerStyle}>
                        <IonButton style={buttonStyle} onClick={onClick} className="ion-margin-horizontal ion-margin-bottom" expand="block" shape="round">
                            <Translation path={nextComponent ? "modal.next" : "modal.done"} />
                        </IonButton>
                    </div>
                </IonNavLink>
            </IonFooter>
        </TranslationProvider>
    );
}