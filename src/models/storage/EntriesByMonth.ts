import EntriesByDay from "./EntriesByDay";

export default interface EntriesByMonth {
    [month: number]: EntriesByDay;
}