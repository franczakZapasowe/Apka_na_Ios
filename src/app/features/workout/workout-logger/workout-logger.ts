import { Component,OnInit,inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { db } from '../../../core/db/index-db.service';
import { WorkoutSet } from '../../../core/models/workout-model';
import { WorkoutLog } from '../../../core/models/workout-model';

@Component({
  selector: 'app-workout-logger',
  imports: [],
  templateUrl: './workout-logger.html',
  styleUrl: './workout-logger.css',
})
export class WorkoutLogger implements OnInit {
  // Pobieramy "skaner" paska adresu
  private route = inject(ActivatedRoute);
  exerciseId:string|null =null;

  todayLog = signal<WorkoutLog | undefined>(undefined);

  async ngOnInit() {
    // Nasłuchujemy na zmiany w adresie URL
    this.route.paramMap.subscribe(params =>{
        //Pobieramy dokładnie ten parametr, który zdefiniowaliśmy w app.routes.ts ('id')
      this.exerciseId = params.get('id');
      this.zaladujDzisiejszyTrening();
    })
  }

  async zaladujDzisiejszyTrening(){
    const exid = Number(this.exerciseId);
    const dzisiejszaData = new Date().toISOString().split('T')[0];
    const log = await db.workoutLog.where({excerciseId:exid, date:dzisiejszaData}).first();
    this.todayLog.set(log);
  }

  
   async zapiszSerie(ciezar:HTMLInputElement, powtorzenia:HTMLInputElement){
    const waga = Number(ciezar.value);
    const powt = Number(powtorzenia.value)
    const exid = Number(this.exerciseId);

    const newSet: WorkoutSet={
      weight:waga,
      reps : powt,
      isFailure:false
    }
    
    const dzisiejszaData = new Date().toISOString().split('T')[0]

    const exsistingLog =await db.workoutLog.where({excerciseId: exid, date:dzisiejszaData}).first();


    if (exsistingLog){
      exsistingLog.sets.push(newSet);
      exsistingLog.totalVolume += waga*powt;
      // Używamy PUT, żeby podmienić starą wersję rekordu na tę nową, zaktualizowaną
      await db.workoutLog.put(exsistingLog)

    }else{
      const nowyWorkout :WorkoutLog = {
        excerciseId: exid,
        date: dzisiejszaData,
        sets: [newSet],
        totalVolume: waga*powt,
        estimatedOneRepMax: 0
      }
      await db.workoutLog.add(nowyWorkout);
    }

    
    ciezar.value ='';
    powtorzenia.value ='';

    await this.zaladujDzisiejszyTrening();

  }
}
