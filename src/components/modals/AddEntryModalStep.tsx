import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonContent, IonFooter, IonNavLink } from "@ionic/react"
import tinycolor from "tinycolor2";

interface Props {
    children: React.ReactNode;
    footer?: React.ReactNode;
    colors: any;
    close: () => void;
    title: string;
    prevButton?: string;
    nextComponent?: () => React.ReactNode;
    save? : () => void;
}

export default ({children, footer, colors, close, title, prevButton, nextComponent, save}: Props) => {
    const headerStyle = {
        '--background': colors.background
    };

    const contentStyle = {
        '--background': `radial-gradient(${colors.backgroundSecondary} 0%, ${colors.background} 70%)`,
    }
    
    const footerStyle = {
        'background': colors.background
    }

    const buttonStyle = {
        '--background': colors.wave,
        '--background-hover': tinycolor(colors.primary).lighten(10).toHexString(),
        '--background-activated': tinycolor(colors.primary).lighten(20).toHexString(),
        '--background-focused': tinycolor(colors.primary).lighten(10).toHexString(),
        '--border-radius': '50px',
    }  
    
    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    { prevButton && 
                        <IonButtons slot="start">
                            <IonBackButton text={prevButton} />
                        </IonButtons>
                    }
                    <IonTitle>
                        {title}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={contentStyle} className="ion-padding-horizontal">
                {children}
            </IonContent>
            <IonFooter style={footerStyle} className="ion-padding-horizontal ion-padding-bottom">
                {footer}
                <IonNavLink routerDirection="forward" component={nextComponent} onClick={nextComponent ? undefined : save}>
                    <IonButton style={buttonStyle} expand="block" className="ion-padding">
                        {nextComponent ? 'Далее' : 'Готово'}
                    </IonButton>
                </IonNavLink>
            </IonFooter>
        </>);
}