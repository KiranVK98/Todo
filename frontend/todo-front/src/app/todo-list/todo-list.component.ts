import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../Itodo';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  //! - guaranteing that property will be init before it will be used
  todos!: Todo[];
  errorMessage: string = '';
  isLoading: boolean = false; // Initialize isLoading property
  constructor(
      private todoService: TodoService,
      private router: Router
      ) {}

  ngOnInit(): void {
    this.getTodos();
  }


  getTodos() : void {
    this.isLoading = true;
    this.todoService.getTodos()
    .subscribe({
      next: todos => {
        this.todos = todos;
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: error => {
        console.error('Error fetching todos:', error);
        this.errorMessage = 'Error fetching todos. Please try again later.';
        this.isLoading = false;
      }
    });
}

  onDelete(todoId: number) : void {
    this.todoService.deleteTodo(todoId)
      .subscribe({
        next : () => {
          //if deletion is successful remove from ui from array todos
          this.todos = this.todos.filter(todo => todo.id !== todoId);
          this.errorMessage = '';
        },
        error: error => {
          console.error('Error deleting todo', error);
          this.errorMessage = 'Error Deleting todo, please try again later';
        }
  });
  }

  onViewDetail(todoId : number) : void {
    this.router.navigate(['/todos', todoId]);
  }

}
