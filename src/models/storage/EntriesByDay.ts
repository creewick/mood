import Entry from "./Entry";

export default interface EntriesByDay {
    [day: number]: Entry[];
}