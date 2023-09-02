import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonApp } from "@ionic/react";
import { Translation, useTranslationChange } from "i18nano";
import { newspaper, addCircle, cog, calendar } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import EntriesPage from "./routes/EntriesPage";
import SettingsPage from "./routes/SettingsPage";
import { useContext, useEffect, useRef, useState } from "react";
import AddEntryModal from "./components/AddEntryModal/AddEntryModal";
import StorageContext from "./models/StorageContext";
import SettingsService from "./services/SettingsService";
import { defaultLanguage } from "../i18n";

export default () => {
    const settingsService = new SettingsService(useContext(StorageContext));
    const {change} = useTranslationChange()
    const [appRef, setAppRef] = useState<HTMLElement | null>();
    const [showModal, setShowModal] = useState(false);
    const ref = useRef(null);

    const setStatusBarColor = async (dark: boolean) => {
      const settings = await settingsService.getSettings();
      const condition = dark || showModal || (settings.darkTheme && !settings.autoTheme);
      document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", condition ? "#000" : "#f7f7f7");
    }

    const updateLocale = async () => {
        const settings = await settingsService.getSettings();
        change(settings.language ?? defaultLanguage);
    }
  
    useEffect(() => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      toggleDarkTheme(prefersDark.matches);  
      prefersDark.addEventListener('change', (mediaQuery) => toggleDarkTheme(mediaQuery.matches));
    }, []);

    const toggleDarkTheme = async (shouldAdd: boolean) => {
      const settings = await settingsService.getSettings();
      const darkTheme = settings.autoTheme ? shouldAdd : settings.darkTheme;
      console.log({shouldAdd, darkTheme: settings.darkTheme});

      document.body.classList.toggle('dark', darkTheme);
    };

    useEffect(() => {
        setStatusBarColor(document.body.classList.contains('dark'));
    }, [showModal]);

    useEffect(() => {
        setAppRef(ref.current);
        updateLocale();
    }, []);

    return (
      <IonApp>
        <AddEntryModal isOpen={showModal} close={() => setShowModal(false)} presentingElement={appRef!} />
        <IonTabs>
          <IonRouterOutlet ref={ref}>
            <Redirect exact from="/" to="/entries" />
            <Route path="/entries" render={() => <EntriesPage />} />
            <Route path="/settings" render={() => <SettingsPage />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="entries" href="/entries">
              <IonIcon icon={newspaper} />
              <IonLabel>
                <Translation path="tabs.entries"/>
              </IonLabel>
            </IonTabButton>
            {/* <IonTabButton tab="calendar" href="/calendar">
              <IonIcon icon={calendar} />
              <IonLabel>---</IonLabel>
            </IonTabButton> */}
            <IonTabButton tab="add" onClick={() => {setShowModal(true);}}>
              <IonIcon icon={addCircle} />
              <IonLabel>
                <Translation path="tabs.addEntry"/>
              </IonLabel>
            </IonTabButton>
            {/* <IonTabButton tab="highlights" href="/mood/highlights">
              <IonIcon icon={statsChart} />
              <IonLabel>---</IonLabel>
            </IonTabButton> */}
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={cog} />
              <IonLabel>
                <Translation path="tabs.settings"/>
              </IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonApp>
    );
}