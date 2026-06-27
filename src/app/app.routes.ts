import { Routes } from '@angular/router';
import { ExerciseListComponent } from './features/exercises/exercise-list/exercise-list';
import { WorkoutLogger } from './features/workout/workout-logger/workout-logger';

export const routes: Routes = [
    {path: '', component:ExerciseListComponent},
    {path: 'log/:id', component:WorkoutLogger}
];
