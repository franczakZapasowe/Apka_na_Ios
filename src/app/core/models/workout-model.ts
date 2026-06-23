//Slownik cwiczen
export interface Excercise{
    id?:number;
    name:string;
    category:string;
}
//pojedyncza seria na treningu
export interface WorkoutSet{
    weight:number;
    reps:number;
    isFailure:boolean;
}
// pelny zapis cwiczenia z danego dnia
export interface WorkoutLog{
    id?:number;
    excerciseId:number;
    date:string;  // Format: YYYY-MM-DD
    sets: WorkoutSet[];
    totalVolume:number;
    estimatedOneRepMax:number;
}
