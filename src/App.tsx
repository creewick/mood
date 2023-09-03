import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import StorageContext from './models/StorageContext';
import { Translation, useTranslationChange } from 'i18nano';
import { defaultLanguage } from '../i18n/index';
import { useContext, useEffect, useRef, useState } from 'react';
import { newspaper, addCircle, cog, calendar, statsChart } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import AddEntryModal from './components/AddEntryModal/AddEntryModal';
import EntriesPage from './routes/EntriesPage';
import SettingsPage from './routes/SettingsPage';
import SettingsService from './services/SettingsService';
import CalendarPage from './routes/CalendarPage';

setupIonicReact({mode: 'ios'});

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

  useEffect(() => {
    setStatusBarColor(document.body.classList.contains('dark'));
  }, [showModal]);


  const updateLocale = async () => {
      const settings = await settingsService.getSettings();
      change(settings.language ?? defaultLanguage);
  }

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.toggle('dark', prefersDark.matches);
    toggleDarkTheme(prefersDark.matches);
    prefersDark.addEventListener('change', async (prefersDark) => await toggleDarkTheme(prefersDark.matches));
  }, []);

  const toggleDarkTheme = async (prefersDark: boolean) => {
    const settings = await settingsService.getSettings();
    const darkTheme = settings.autoTheme ? prefersDark : settings.darkTheme;
    document.body.classList.toggle('dark', darkTheme);
  };

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
          <Route path="/calendar" render={() => <CalendarPage />} />
          <Route path="/settings" render={() => <SettingsPage />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="entries" href="/entries">
            <IonIcon icon={newspaper} />
            <IonLabel>
              <Translation path="tabs.entries"/>
            </IonLabel>
          </IonTabButton>
          <IonTabButton tab="calendar" href="/calendar">
            <IonIcon icon={calendar} />
            <IonLabel>
              <Translation path="tabs.calendar"/>
            </IonLabel>
          </IonTabButton>
          <IonTabButton tab="add" onClick={() => {setShowModal(true);}}>
            <IonIcon icon={addCircle} />
            <IonLabel>
              <Translation path="tabs.addEntry"/>
            </IonLabel>
          </IonTabButton>
          <IonTabButton tab="highlights" href="/mood/highlights">
            <IonIcon icon={statsChart} />
            <IonLabel>
              <Translation path="tabs.highlights"/>
            </IonLabel>
          </IonTabButton>
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