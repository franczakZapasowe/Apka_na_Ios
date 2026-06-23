import Dexie, {Table} from "dexie"; // Importujemy silnik bazy Dexie i typ tabeli (Table)
import { Excercise, WorkoutLog } from "../models/workout-model"; 


export class GymTrackerDb extends Dexie {
    
    // Deklarujemy, jakie tabele będą w naszej bazie.
    // Wykrzyknik (!) może być zmienna niezainicjalizowana
    excercises!: Table<Excercise,number>;
    workoutLog!: Table<WorkoutLog,number>;

    constructor() {
        super("GymTrackerDb");
        
        // Definiujemy schemat (strukturę) bazy w wersji 1.
        // '++id' oznacza Auto-Inkrementację.
        // Wypisujemy też kolumny (name, category, date), po których chcemy w przyszłości szybko szukać/filtrować.
        this.version(1).stores({
            excercises: '++id,name,category',
            workoutLog: '++id, exerciseId,date'
        });
    }

    // Metoda asynchroniczna zasilająca bazę domyślnymi ćwiczeniami.
    // Słowo 'async' komunikuje, że funkcja korzysta z mechanizmu oddelegowywania zadań w tle.
    async initializeDefaultExercises() {
        // Słowo 'await' zawiesza działanie TEJ funkcji aż do otrzymania wyniku, zwalniając w tym czasie główny wątek (Event Loop).
        const count = await this.excercises.count();
        
        if(count == 0) {
            // Ponownie zawieszamy funkcję (await) i zlecamy masowy zapis (bulkAdd) 4 obiektów do bazy.
            // Dopóki te dane się nie zapiszą fizycznie w pamięci urządzenia, kompilator nie pójdzie dalej.
            await this.excercises.bulkAdd([
                { name: 'Wyciskanie hantli ławce poziomej', category: 'Push' },
                { name: 'Wyciskanie hantli nad ławce skośnej', category: 'Push' },
                { name: 'Podciąganie na drążku', category: 'Pull' },
                { name: 'Przyciąganie drązka nachwytem', category: 'Pull' }
            ]);
        }
    }
}
export const db = new GymTrackerDb();