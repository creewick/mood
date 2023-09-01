import { Redirect, Route } from 'react-router-dom';
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
import { IonReactHashRouter } from '@ionic/react-router';
import { Storage } from '@ionic/storage';
import { newspaper, addCircle, cog } from 'ionicons/icons';

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

import EntriesPage from './pages/EntriesPage';
import StorageContext from './models/StorageContext';
import { useRef, useEffect, useState } from 'react';
import AddEntryModal from './components/AddEntryModal/AddEntryModal';
import SettingsPage from './pages/SettingsPage';
import { Translation, TranslationProvider } from 'i18nano';
import { translations } from '../i18n/index';
import useLocale from './services/useLocale';

setupIonicReact({mode: 'ios'});

const storage = new Storage();
storage.create();

const App: React.FC = () => {
  const [appRef, setAppRef] = useState<HTMLElement | null>();
  const [showModal, setShowModal] = useState(false);
  const language = useLocale();
  const ref = useRef(null);

  const setTheme = async (dark: boolean) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#000" : "#fff");
  }

  useEffect(() => {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches || showModal);
  }, [showModal]);

  useEffect(() => {
    setAppRef(ref.current);
  }, []);

  return (
    <TranslationProvider translations={translations.common} language={language}>
      <StorageContext.Provider value={storage}>
        <IonApp>
          <AddEntryModal isOpen={showModal} close={() => setShowModal(false)} presentingElement={appRef!} />
          <IonReactHashRouter>
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
                {/* <IonTabButton tab="calendar" href="/mood/calendar">
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
          </IonReactHashRouter>
        </IonApp>
      </StorageContext.Provider>
    </TranslationProvider>
  );
}

export default App;
