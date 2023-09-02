import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonNote, IonItem, IonLabel, IonAlert, IonToggle, IonIcon, useIonLoading, IonSelect, IonSelectOption } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import StorageContext from "../models/StorageContext";
import "./SettingsPage.css";
import * as json from "../../package.json";
import { contrastOutline, logInOutline, logOutOutline, refreshOutline, trashOutline } from "ionicons/icons";
import SettingsService from "../services/SettingsService";
import { Translation, useTranslation, useTranslationChange } from "i18nano";
import Settings from "../models/Settings";

export default () => {
    const settingsService = new SettingsService(useContext(StorageContext));
    const [settings, setSettings] = useState<Settings>({} as Settings);
    const [present, dismiss] = useIonLoading();
    const t = useTranslation();
    const {change, preload, lang} = useTranslationChange();

    const loadSettings = async () => {
        const settings = await settingsService.getSettings();
        setSettings(settings);
    }

    useEffect(() => {
        loadSettings();
    }, []);

    const renderEraseDataAlert = () => (
        <IonAlert 
            trigger="erase-data" 
            header={t('actions.deleteAllData') + '?'}
            message={t('actions.youCantUndoThisAction')}
            buttons={[
                {
                    text: t('actions.cancel'),
                    role: 'cancel'
                }, {
                    text: t('actions.delete'),
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
        await present({message: t('settings.exportData')});

        const data = await settingsService.exportJson();

        var element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', 'mood-export-data');
        element.style.display = 'none';

        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
        await dismiss();
    }

    const setLanguage = async (e: any) => {
        const language = e.detail.value;
        const settings = await settingsService.getSettings();
        await settingsService.setSettings({...settings, language});
        preload(language);
        change(language);
    }

    const setDarkTheme = async (e: any) => {
        setSettings({...settings, darkTheme: e.detail.checked});
        await settingsService.setSettings({...settings, darkTheme: e.detail.checked});
        if (!settings.autoTheme) {
            document.body.classList.toggle('dark', e.detail.checked);
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", e.detail.checked ? "#000" : "#f7f7f7");
        }
    }

    const setAutoTheme = async (e: any) => {
        setSettings({...settings, autoTheme: e.detail.checked});
        await settingsService.setSettings({...settings, autoTheme: e.detail.checked});
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const value = e.detail.checked ? prefersDark : settings.darkTheme;
        document.body.classList.toggle('dark', value);
        document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", value ? "#000" : "#f7f7f7");
    }

    return (
        <IonPage className="settings">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <Translation path="tabs.settings" />
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-vertical">
                <IonNote className="ion-padding-start ion-margin-start ion-text-uppercase">
                    <Translation path="settings.language" />
                </IonNote>
                <IonList inset={true}>
                    <IonItem color="light">
                    <Translation path="settings.language" />
                    <IonSelect slot="end" interface="popover" value={lang} onIonChange={setLanguage}>
                        <IonSelectOption value="en">
                            <Translation path="languages.en" />
                        </IonSelectOption>
                        <IonSelectOption value="ru">
                            <Translation path="languages.ru" />
                        </IonSelectOption>
                    </IonSelect>
                    </IonItem>
                </IonList>
                <IonNote className="ion-padding-start ion-margin-start ion-text-uppercase">
                    <Translation path="settings.appearance" />
                </IonNote>
                <IonList inset={true}>
                    <IonItem color="light">
                        <IonIcon slot="start" icon={contrastOutline} />
                        <Translation path="settings.dark" />
                        <IonToggle slot="end" color="success" checked={settings.darkTheme} onIonChange={setDarkTheme} />
                    </IonItem>
                    <IonItem color="light">
                        <IonIcon slot="start" icon={refreshOutline} />
                        <Translation path="settings.auto" />
                        <IonToggle slot="end" color="success" checked={settings.autoTheme} onIonChange={setAutoTheme} />
                    </IonItem>
                </IonList>
                <IonNote className="ion-padding-start ion-margin-start ion-text-uppercase">
                    <Translation path="settings.data" />
                </IonNote>
                <IonList inset={true}>
                    <IonItem button detail={false} color="light">
                        <IonIcon slot="start" icon={logInOutline} />
                        <IonLabel>
                            <Translation path="settings.importData" />
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={false} onClick={exportJson} color="light">
                        <IonIcon slot="start" icon={logOutOutline} />
                        <IonLabel>
                            <Translation path="settings.exportData" />
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={false} id="erase-data" color="light">
                        <IonIcon slot="start" color="danger" icon={trashOutline} />
                        <IonLabel color="danger">
                            <Translation path="actions.deleteAllData" />
                        </IonLabel>
                        { renderEraseDataAlert() }
                    </IonItem>
                </IonList>
                <div className="ion-text-center">
                    <IonNote>
                        <Translation path="settings.version" /> {json.version}
                    </IonNote>
                </div>
            </IonContent>
        </IonPage>
    );
}