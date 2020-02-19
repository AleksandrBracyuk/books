import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';
import { AuthorService } from '../shared/author.service';
import { BookService } from '../shared/book.service';
import { Author } from '../shared/author';
import { Book } from '../shared/book';
import { GenreService } from '../shared/genre.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.scss'],
  providers: [TestService, AuthorService, BookService]
})
export class ShowAllComponent implements OnInit {

  authors: Author[] = [];
  editAuthor: Author;
  isEditNew: boolean = true;

  books: Book[] = [];
  genres: string[] = [];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private genreService: GenreService,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.refreshAll();
  }
  refreshAll() {
    this.add();
    this.refreshAuthors();
    this.refreshBooks();
    this.refreshGenres();
  }

  refreshAuthors() {
    this.authorService.list().subscribe({
      next: (result: Author[]) => {
        this.authors = result;
        console.log(`получено авторов: ${(result ? result.length : 0)}`)
      },
      error: error => {
        console.error("AuthorService list error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }
  refreshBooks() {
    this.bookService.list().subscribe({
      next: (result: Book[]) => {
        this.books = result;
        console.log(`получено книг: ${(result ? result.length : 0)}`)
      },
      error: error => {
        console.error("BookService list error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }
  refreshGenres() {
    this.genreService.list().subscribe({
      next: (result: string[]) => {
        this.genres = result;
        console.log(`получено жанров: ${(result ? result.length : 0)}`)
      },
      error: error => {
        console.error("GenreService list error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }

  add() {
    this.editAuthor = new Author();
    this.editAuthor.bookList = [];
    this.isEditNew = true;
  }
  addBook() {
    this.editAuthor.bookList.unshift(new Book());
  }

  deleteBook(book: Book) {
    let deleteItemIndex: number = undefined;
    for (let i = 0; i < this.editAuthor.bookList.length; i++) {
      if (this.editAuthor.bookList[i] === book) {
        deleteItemIndex = i;
        break;
      }
    }
    if (deleteItemIndex) {
      this.editAuthor.bookList.splice(deleteItemIndex, 1);
    }
  }
  addSave() {
    let author: Author = new Author();
    author.surname = this.editAuthor.surname;
    author.name = this.editAuthor.name;
    author.patronymic = this.editAuthor.patronymic;
    author.dateBirth = this.editAuthor.dateBirth;
    author.bookList = this.editAuthor.bookList;
    this.authorService.add(author).subscribe({
      next: (result: Author) => {
        this.refreshAuthors();
        console.log(`получен новый автор: ${result.id}`)
      },
      error: error => {
        console.error("AuthorService add error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }

  edit(author: Author) {
    this.editAuthor = author;
    this.isEditNew = false;
  }
  editSave() {
    let author: Author = new Author();
    author.surname = this.editAuthor.surname;
    author.name = this.editAuthor.name;
    author.patronymic = this.editAuthor.patronymic;
    author.dateBirth = this.editAuthor.dateBirth;
    author.bookList = this.editAuthor.bookList;
    this.authorService.edit(author).subscribe({
      next: (result: Author) => {
        this.refreshAuthors();
        console.log(`отредактирован автор: ${result.id}`)
      },
      error: error => {
        console.error("AuthorService edit error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }

  deleteSave(author: Author) {
    this.authorService.edit(author).subscribe({
      next: (result: Author) => {
        this.refreshAuthors();
        console.log(`удален автор: ${result.id}`)
      },
      error: error => {
        console.error("AuthorService delete error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }

  createTestData() {
    this.testService.createTestData();
  }

}
