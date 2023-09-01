import { Storage as IonicStorage } from "@ionic/storage";
import Settings from "../models/Settings";

export default class SettingsService {
    private storage: IonicStorage;

    public constructor(storage: IonicStorage | null) {
        this.storage = storage!;
    }

    public async getSettings(): Promise<Settings> {
        return await this.storage.get('settings') || {};
    }

    public async setSettings(settings: any): Promise<void> {
        await this.storage.set('settings', settings);
    }

    public async exportJson(): Promise<string> {
        const result: any = {};
        const keys = await this.storage.keys();

        for (const key of keys) {
            result[key] = await this.storage.get(key);
        }

        return JSON.stringify(result);
    }

    public async importJson(json: string): Promise<void> {
        await this.storage.clear();

        const data = JSON.parse(json);

        for (const key in data) {
            await this.storage.set(key, data[key]);
        }
    }

    public async clear(): Promise<void> {
        await this.storage.clear();
    }
}