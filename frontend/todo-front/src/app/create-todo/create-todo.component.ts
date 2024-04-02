import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../Itodo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  newTodo: Todo = { title: '', description: '', dueDate: new Date(), isCompleted: false };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
  }

  createTodo(): void {
    this.isLoading = true;
    this.todoService.addTodo(this.newTodo)
      .subscribe({
        next: createdTodo => {
          console.log('Todo created successfully:', createdTodo);
          this.router.navigate(['/todos']); // Navigate to the home page
          this.errorMessage = '';
          this.isLoading = false;
        },
        error: err => {
          console.error('Error creating todo:', err);
          this.errorMessage = 'Error creating todo. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/todos']); // Navigate back to todos page without saving
  }

}
