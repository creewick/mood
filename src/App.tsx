import {
  IonApp,
  setupIonicReact
} from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Storage } from '@ionic/storage';

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
import { TranslationProvider } from 'i18nano';
import { defaultLanguage, translations } from '../i18n/index';
import Routes from './routes/Routes';

setupIonicReact({mode: 'ios'});

const storage = new Storage();
storage.create();

export default () => (
  <TranslationProvider translations={translations.common} language={defaultLanguage}>
    <StorageContext.Provider value={storage}>
      <IonApp>
        <IonReactHashRouter>
          <Routes />
        </IonReactHashRouter>
      </IonApp>
    </StorageContext.Provider>
  </TranslationProvider>
);
