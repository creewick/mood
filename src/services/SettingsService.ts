import { Storage as IonicStorage } from "@ionic/storage";

export default class SettingsService {
    private storage: IonicStorage;

    public constructor(storage: IonicStorage | null) {
        this.storage = storage!;
    }

    public async getSettings(): Promise<any> {
        return await this.storage.get('settings') || {};
    }

    public async setSettings(settings: any): Promise<void> {
        await this.storage.set('settings', settings);
    }
}