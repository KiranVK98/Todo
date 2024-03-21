import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Todo } from './Itodo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5021/api/todo';

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json' }) 
  };

  constructor(private injector: Injector) { }

  private getHttpClient() : HttpClient {
    const http = this.injector.get(HttpClient);
    console.log('http retreived', http);
    return http;
  }
  //GET ALL TODOS
  getTodos(): Observable<Todo[]> {
    console.log('inside here');
    const http = this.getHttpClient();
    return http.get<Todo[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  //GET TODOS BY ID
  getTodoById(id: number): Observable<Todo> {
    const http = this.getHttpClient();
    const url = `${this.apiUrl}/${id}`;
    return http.get<Todo>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //ADD TODO
  addTodo(todo: Todo): Observable<Todo> {
    const http = this.getHttpClient();
    return http.post<Todo>(this.apiUrl, todo, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  //UPDATE TODO
  updateTodo(todo: Todo): Observable<Todo> {
    const http = this.getHttpClient();
    const url = `${this.apiUrl}/${todo.id}`;
    return http.put<Todo>(url, todo, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  //DELETE TODO
  deleteTodo(id: number) : Observable<Todo> {
    const http = this.getHttpClient();
    const url = `${this.apiUrl}/${id}`;
    return http.delete<Todo>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: any) :Observable<never> {
    console.error('An error occured:', error);
    return throwError('Something went wrong, please try again later');
  }

}
