import { Feeling } from "./Feeling";
import { Trigger } from "./Trigger";

export default interface Entry {
    mood: number;
    triggers: Trigger[];
    feelings: Feeling[];
    comment: string;
    date: Date;
}