import { Component, OnInit } from '@angular/core';
import { Todo } from '../Itodo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TodoeditComponent } from '../todoedit/todoedit.component';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'] // Corrected from styleUrl to styleUrls
})
export class TodoDetailComponent implements OnInit {

  todo!: Todo;
  errorMessage: string = '';
  isLoading: boolean = false;
  formattedDueDate: string = '';
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private dataPipe: DatePipe,
    private dialog: MatDialog,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.fetchTodoDetails();
  }

  fetchTodoDetails(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.isLoading = true;
      this.todoService.getTodoById(id)
        .subscribe({
          next: todo => {
            this.todo = todo;
            this.errorMessage = '';
            this.formatDueDate();
            this.isLoading = false;
          },
          error: error => {
            console.error('Error fetching data', error);
            this.errorMessage = 'Error fetching todo, please try again later';
            this.isLoading = false;
          }
        });
    } else {
      this.errorMessage = 'Todo ID not provided';
    }
  }

  formatDueDate(): void {
    if (this.todo && this.todo.dueDate) {
      this.formattedDueDate = this.dataPipe.transform(this.todo.dueDate, 'MM-dd-yyyy')!;
    }
  }

  getCompletedStatus(completed: boolean): string {
    return completed ? 'Yes' : 'No';
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  openEditDialog() : void {
    const dialogRef = this.dialog.open(TodoeditComponent, {
      width: '30%',
      height : '50%',
      panelClass : 'vertical-dialog',
      data : {todo : this.todo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.todo = result;
        this.saveChanges();
      }
    })
  }

  

  saveChanges(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.todo)
        .subscribe({
          next: updatedTodo => {
            this.todo = updatedTodo;
            this.errorMessage = '';
            this.editMode = false;
            this.fetchTodoDetails(); // Call fetchTodoDetails to refresh the data
          },
          error: error => {
            console.error('Error updating todo', error);
            this.errorMessage = 'Error updating todo, please try again later';
          }
        });
    }
  }

  // to go back to home page
  goBack() : void {
    this.router.navigate(['/']);
  }
}
