import { Component,OnInit,inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { db } from '../../../core/db/index-db.service';
import { WorkoutSet } from '../../../core/models/workout-model';
import { WorkoutLog } from '../../../core/models/workout-model';

@Component({
  selector: 'app-workout-logger',
  imports: [RouterLink],
  templateUrl: './workout-logger.html',
  styleUrl: './workout-logger.css',
})
export class WorkoutLogger implements OnInit {
  // Pobieramy "skaner" paska adresu
  private route = inject(ActivatedRoute);
  exerciseId:string|null =null;

  // Pojedynczy workoku 
  todayLog = signal<WorkoutLog | undefined>(undefined);
  // sygnal czy trening dzisaj czy historia treningow
  activeTab = signal<String>('today');
  //lista historycznych treningow
  historyLog = signal<WorkoutLog[]>([]);


  async ngOnInit() {
    // Nasłuchujemy na zmiany w adresie URL
    this.route.paramMap.subscribe(params =>{
        //Pobieramy dokładnie ten parametr, który zdefiniowaliśmy w app.routes.ts ('id')
      this.exerciseId = params.get('id');
      this.zaladujDzisiejszyTrening();
      this.zaladujHistorie();
    })
  }

  //wysietlanie seri
  async zaladujDzisiejszyTrening(){
    const exid = Number(this.exerciseId);
    const dzisiejszaData = new Date().toISOString().split('T')[0];
    const log = await db.workoutLog.where({excerciseId:exid, date:dzisiejszaData}).first();
    this.todayLog.set(log);
  }

  
  //metoda do zapisu seri 
   async zapiszSerie(ciezar:HTMLInputElement, powtorzenia:HTMLInputElement, isFailure:boolean){
    const waga = Number(ciezar.value);
    const powt = Number(powtorzenia.value)
    const exid = Number(this.exerciseId);

    const newSet: WorkoutSet={
      weight:waga,
      reps : powt,
      isFailure:isFailure
    }
    
    const dzisiejszaData = new Date().toISOString().split('T')[0]

    const exsistingLog =await db.workoutLog.where({excerciseId: exid, date:dzisiejszaData}).first();

    const oneRepMax:number =Math.round((waga * (1+powt/30))); 
    
    if (exsistingLog){
      exsistingLog.sets.push(newSet);
      exsistingLog.totalVolume += waga*powt;
      if(oneRepMax> exsistingLog.estimatedOneRepMax){
        exsistingLog.estimatedOneRepMax = oneRepMax        
      }
      // Używamy PUT, żeby podmienić starą wersję rekordu na tę nową, zaktualizowaną
      await db.workoutLog.put(exsistingLog)

    }else{
      const nowyWorkout :WorkoutLog = {
        excerciseId: exid,
        date: dzisiejszaData,
        sets: [newSet],
        totalVolume: waga*powt,
        estimatedOneRepMax: oneRepMax
      }
      await db.workoutLog.add(nowyWorkout);
    }
    
    ciezar.value ='';
    powtorzenia.value ='';
    
    await this.zaladujDzisiejszyTrening();
    await this.zaladujHistorie();

  }

  //metoda do usuwania pojedynczej seri 
  async removeSerie(index:number){
    //pobieramy obecny stan całego treningu z naszego Sygnału
    const currentLog = this.todayLog();

    if(!currentLog){
      return;
    }

    // REKALKULACJA TONAŻU:
    // Zanim wyrzucimy serię z tablicy, musimy sprawdzić, ile ważyła, żeby odjąć to od totalVolume
    const setToRemove = currentLog.sets[index];
    const volumeToSubtract = setToRemove.weight * setToRemove.reps;

    currentLog.totalVolume -= volumeToSubtract;

    currentLog.sets.splice(index,1);

    await db.workoutLog.put(currentLog);
    await this.zaladujDzisiejszyTrening()

  }

  // metoda do pobierania calej listy treningow
  async zaladujHistorie(){
    const exid = Number(this.exerciseId);

    const historia = await db.workoutLog
      .filter(log => log.excerciseId === exid)
      .toArray();
    this.historyLog.set(historia);

  } 
  
}
