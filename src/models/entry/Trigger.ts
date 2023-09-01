export enum HealthTrigger {
    Health = 100,
    Fitness = 101,
    SelfCare = 102,
    Hobbies = 103,
    Identify = 104,
    Spirituality = 105,
}

export enum SocialTrigger {
    Community = 200,
    Family = 201,
    Friends = 202,
    Partner = 203,
    Dating = 204,
}

export enum TaskTrigger {
    Tasks = 300,
    Work = 301,
    Education = 302,
    Travel = 303,
    Weather = 304,
    CurrentEvents = 305,
    Money = 306,
}

export type Trigger = HealthTrigger | SocialTrigger | TaskTrigger;
