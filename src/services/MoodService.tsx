import useLocale from "./useLocale";
import { TranslationProvider, Translation, TranslationLoader } from "i18nano";
import { translations } from '../../i18n/index';
import { Feeling } from "../models/entry/Feeling";
import { Trigger } from "../models/entry/Trigger";


export default class MoodService {
    language: string;

    public constructor() {
        this.language = useLocale();
    }

    public getMoodCaption(mood: number) {
        const path = 
            mood < -75 ? 'veryUnpleasant' :
            mood < -50 ? 'unpleasant' :
            mood < -25 ? 'slightlyUnpleasant' :
            mood < 25 ? 'neutral' :
            mood < 50 ? 'slightlyPleasant' :
            mood < 75 ? 'pleasant' :
            'veryPleasant';
        
        return this.get(translations.mood, path);
    }

    public getFeelingCaption = (feeling: Feeling) => this.get(translations.feelings, `feeling${feeling as number}`);

    public getTriggerCaption = (trigger: Trigger) => this.get(translations.triggers, `trigger${trigger as number}`);

    private get = (translations: Record<string, TranslationLoader>, path: string) => {
        return (
            <TranslationProvider translations={translations} language={this.language}>
                <Translation path={path} />
            </TranslationProvider>
        );
    };
}