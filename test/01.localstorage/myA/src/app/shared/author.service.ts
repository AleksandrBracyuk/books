import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './author';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }

  list(): Observable<Author[]> {
    const res = new Observable<Author[]>((observer) => {
      let authorsString = localStorage.getItem("authors");
      let authors = JSON.parse(authorsString);
      observer.next(authors);
      observer.complete();
      return { unsubscribe() { } };
    });
    return res;
  }
}
