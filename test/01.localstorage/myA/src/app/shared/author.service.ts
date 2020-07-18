import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Author } from "./author";
import { Book } from "./book";

@Injectable({
  providedIn: "root",
})
export class AuthorService {
  constructor() {}

  list(): Observable<Author[]> {
    const res = new Observable<Author[]>((observer) => {
      let authorsString = localStorage.getItem("authors");
      let authors = JSON.parse(authorsString);
      observer.next(authors);
      observer.complete();
      return { unsubscribe() {} };
    });
    return res;
  }

  //добавление автора
  add(author: Author): Observable<Author> {
    const res = new Observable<Author>((observer) => {
      let authorsString = localStorage.getItem("authors");
      let authors = JSON.parse(authorsString);
      //найти самую большую из всех id и к ней добавить 1
      authors.id =
        authors.reduce((previousValue, currentItem, index, arr) => {
          if (previousValue > currentItem.id) return previousValue;
          return currentItem.id;
        }, 0) + 1;
      authors.unshift(author);
      authorsString = JSON.stringify(authors);
      localStorage.setItem("authors", authorsString);

      observer.next(author);
      observer.complete();
      return { unsubscribe() {} };
    });
    return res;
  }

  //редактирование автора
  edit(author: Author): Observable<Author> {
    const res = new Observable<Author>((observer) => {
      let authorsString = localStorage.getItem("authors");
      let authors = JSON.parse(authorsString);
      //найти текущего автора
      let currentAuthor: Author = undefined;
      for (let i = 0; i < authors.length; i++) {
        if (authors[i].id === author.id) {
          currentAuthor = authors[i];
          break;
        }
      }
      if (!currentAuthor) {
        observer.error("Автор с id = ${author.id} не найден.");
      } else {
        currentAuthor.surname = author.surname;
        currentAuthor.name = author.name;
        currentAuthor.patronymic = author.patronymic;
        currentAuthor.dateBirth = author.dateBirth;
        currentAuthor.bookList = author.bookList;
      }

      authorsString = JSON.stringify(authors);
      localStorage.setItem("authors", authorsString);

      observer.next(currentAuthor);
      observer.complete();
      return { unsubscribe() {} };
    });
    return res;
  }

  //удаление автора
  delete(author: Author): Observable<Author> {
    const res = new Observable<Author>((observer) => {
      let authorsString = localStorage.getItem("authors");
      let authors = JSON.parse(authorsString);
      //найти текущего автора
      let deletedIndex: number = undefined;
      for (let i = 0; i < authors.length; i++) {
        if (authors[i].id === author.id) {
          deletedIndex = i;
          break;
        }
      }
      if (!deletedIndex) {
        observer.error("Автор с id = ${author.id} не найден.");
      } else {
        authors.splice(deletedIndex, 1);
      }

      authorsString = JSON.stringify(authors);
      localStorage.setItem("authors", authorsString);

      observer.next(author);
      observer.complete();
      return { unsubscribe() {} };
    });
    return res;
  }
}
