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

