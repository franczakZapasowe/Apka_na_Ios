import { Component } from '@angular/core';
import { db } from '../../../core/db/index-db.service';
import { OnInit,signal,computed } from '@angular/core';
import { Excercise } from '../../../core/models/workout-model';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-exercise-list',
  imports: [RouterLink],
  templateUrl: './exercise-list.html',
  styleUrl: './exercise-list.css',
})
export class ExerciseListComponent implements OnInit{
  
  // Tworzymy sygnał
  // czekamy na baze 
  // Na sam początek (zanim baza odpowie) wrzucamy do niego pustą tablicę ([]).
  exercises = signal<Excercise[]>([]);
  
  async ngOnInit() {
    // 1. Czekamy na dane z bazy (zwraca tablicę obiektów)
    const data = await db.excercises.toArray();
    // 2. Wrzucamy pobrane dane do naszego Sygnału
    this.exercises.set(data);
  }

  async addExercise(newName :string, category:string){
    // Zabezpieczenie: sprawdzamy, czy nazwa nie jest pusta
    // (używamy .trim(), żeby odrzucić same spacje)
    if (!newName || newName.trim() === '') {
      return;
    }
    //dodajemy nowy do bazy 
    await db.excercises.add({name:newName, category:category});
    // aktualizujemy baze 
    const newData = await db.excercises.toArray();

    this.exercises.set(newData);
  }

  async removeExcercise(id:number|undefined){
    if (!id){
      return;
    }
    
    try{
        await db.excercises.delete(id)
    }catch(error){
      console.error("Bład podczas usuwania",error)
    }

    const newData2 = await db.excercises.toArray();
    this.exercises.set(newData2);
  }
}
