import { useContext, useEffect, useState } from "react";
import { defaultLanguage } from "../../i18n";
import SettingsService from "./SettingsService";
import StorageContext from "../models/StorageContext";

export default () => {
    const [language, setLanguage] = useState(defaultLanguage);
    const settingsService = new SettingsService(useContext(StorageContext));

    const updateLocale = async () => {
        const settings = await settingsService.getSettings();
        setLanguage(settings.language ?? defaultLanguage);
    }

    useEffect(() => {
        updateLocale();
    }, []);

    return language;
}