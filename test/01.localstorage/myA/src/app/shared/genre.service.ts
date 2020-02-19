import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor() { }

  list(): Observable<string[]> {
    const res = new Observable<string[]>((observer) => {
      let genresString = localStorage.getItem("genre");
      let genres: string[] = JSON.parse(genresString);

      observer.next(genres);
      observer.complete();

      return { unsubscribe() { } };
    });
    return res;
  }

}
