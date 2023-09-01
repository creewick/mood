import { Route } from 'react-router-dom';
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
import { IonReactRouter } from '@ionic/react-router';
import { Storage } from '@ionic/storage';
import { newspaper, calendar, addCircle, statsChart, cog } from 'ionicons/icons';

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
import Entries from './pages/Entries';
import StorageContext from './models/StorageContext';
import { useRef, useEffect, useState } from 'react';
import AddEntryModal from './components/AddEntryModal/AddEntryModal';

setupIonicReact({mode: 'ios'});

const storage = new Storage();
storage.create();

const App: React.FC = () => {
  const [appRef, setAppRef] = useState<HTMLElement | null>();
  const [showModal, setShowModal] = useState(false);
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
    <StorageContext.Provider value={storage}>
      <IonApp>
        <AddEntryModal isOpen={showModal} close={() => setShowModal(false)} presentingElement={appRef!} />
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet ref={ref}>
              <Route path="/mood" render={() => <Entries showModal={showModal} />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="entries" href="/mood/">
                <IonIcon icon={newspaper} />
                <IonLabel>Записи</IonLabel>
              </IonTabButton>
              <IonTabButton tab="calendar" href="/mood/calendar">
                <IonIcon icon={calendar} />
                <IonLabel>---</IonLabel>
              </IonTabButton>
              <IonTabButton tab="add" onClick={() => {setShowModal(false); setShowModal(true);}}>
                <IonIcon icon={addCircle} />
                <IonLabel>Добавить</IonLabel>
              </IonTabButton>
              <IonTabButton tab="highlights" href="/mood/highlights">
                <IonIcon icon={statsChart} />
                <IonLabel>---</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/mood/settings">
                <IonIcon icon={cog} />
                <IonLabel>---</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </StorageContext.Provider>
  );
}

export default App;
