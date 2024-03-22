import { Component, OnInit } from '@angular/core';
import { Todo } from '../Itodo';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent implements OnInit {

  todo !: Todo;
  errorMessage : string = "";
  isLoading : boolean = false;


  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam !== null) 
    {
      const id = +idParam;
      this.isLoading = true;
      this.todoService.getTodoById(id)
        .subscribe({
          next: todo => {
            this.todo = todo;
            this.errorMessage = '';
            this.isLoading = false;
          },
          error: error => {
            console.error('Error Fetching data', error);
            this.errorMessage = 'Error Fetching todo, please try again later';
            this.isLoading = false;
          }
        });
    }
    else {
      this.errorMessage = 'Todo ID not provided';
    }
  }

  getCompletedStatus(completed: boolean) : string {
    return completed? 'Yes' : 'No';
  }
}
