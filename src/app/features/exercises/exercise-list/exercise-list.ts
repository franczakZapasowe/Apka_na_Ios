import { Component } from '@angular/core';
import { db } from '../../../core/db/index-db.service';
import { OnInit,signal,computed } from '@angular/core';
import { Excercise } from '../../../core/models/workout-model';
@Component({
  selector: 'app-exercise-list',
  imports: [],
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
}
