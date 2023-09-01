export enum NegativeFeeling {
    Angry = 100,
    Anxious = 101,
    Scared = 102,
    Overwhelmed = 103,
    Ashamed = 104,
    Disgusted = 105,
    Embarrassed = 106,
    Frustrated = 107,
    Annoyed = 108,
    Jealous = 109,
    Stressed = 110,
    Worried = 111,
    Guilty = 112,
    Surprised = 113,
    Hopeless = 114,
    Irritated = 115,
    Lonely = 116,
    Discouraged = 117,
    Disappointed = 118,
    Drained = 119,
    Sad = 120,
}

export enum NeutralFeeling {
    Content = 200,
    Calm = 201,
    Peaceful = 202,
    Indifferent = 203,
    Drained = 204,
}

export enum PositiveFeeling {
    Amazed = 300,
    Excited = 301,
    Surpriced = 302,
    Passionate = 303,
    Happy = 304,
    Joyful = 305,
    Brave = 306,
    Proud = 307,
    Confident = 308,
    Hopeful = 309,
    Amused = 310,
    Satisfied = 311,
    Relieved = 312,
    Grateful = 313,
}

export type Feeling = NegativeFeeling | NeutralFeeling | PositiveFeeling;

