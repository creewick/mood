import { Route } from 'react-router-dom';
import {
  IonApp,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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
import Entries from './pages/Entries';
import StorageContext from './components/StorageContext';

setupIonicReact({mode: 'ios'});

const storage = new Storage();
storage.create();

const App: React.FC = () => (
  <StorageContext.Provider value={storage}>
    <IonApp>
      <IonReactRouter>
        <Route path="/mood" component={Entries} exact />
      </IonReactRouter>
    </IonApp>
  </StorageContext.Provider>
);

export default App;
