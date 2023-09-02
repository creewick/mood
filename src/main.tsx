import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IonReactHashRouter } from '@ionic/react-router';
import { TranslationProvider } from 'i18nano';
import { translations, defaultLanguage } from '../i18n';
import StorageContext from './models/StorageContext';
import { Storage } from '@ionic/storage';

const container = document.getElementById('root');
const root = createRoot(container!);

const storage = new Storage();
storage.create();

root.render(
  <React.StrictMode>
    <TranslationProvider translations={translations.common} language={defaultLanguage}>
      <StorageContext.Provider value={storage}>
          <IonReactHashRouter>
            <Suspense>
              <App />
            </Suspense>
          </IonReactHashRouter>
      </StorageContext.Provider>
    </TranslationProvider>
  </React.StrictMode>
);