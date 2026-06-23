import { APP_INITIALIZER, ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GymTrackerDb } from './core/db/index-db.service';
import { routes } from './app.routes';
import { db } from './core/db/index-db.service';
export function initDatabase(){
  // Ponieważ w `index-db.service.ts` stworzyliśmy obiekt `export const db = new GymTrackerDb()`, 
  // nie musimy go tu tworzyć na nowo przez 'new'. Używamy po prostu tego zaimportowanego 
  return ()=> db.initializeDefaultExercises();
}

export const appConfig: ApplicationConfig = {
  providers: [
  //  {
  //   provide: APP_INITIALIZER,
  //   useFactory: initDatabase, // Nazwa funkcji z Kroku 2
  //   multi: true,
  //  },
   // Nowy, czysty standard w Angular 17+ (zamiast obiektu z APP_INITIALIZER)
    provideAppInitializer(() => initDatabase()()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
