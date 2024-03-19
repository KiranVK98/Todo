import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5021/api/todo';

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json' }) 
  };

  constructor(private http: HttpClient) { }


  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

}
