import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExerciseListComponent } from './features/exercises/exercise-list/exercise-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ExerciseListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Apka_Ios');
}
