import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../Itodo';


@Component({
  selector: 'app-todoedit',
  templateUrl: './todoedit.component.html',
  styleUrl: './todoedit.component.css'
})
export class TodoeditComponent {
  editedTodo !: Todo;

  constructor (
    public dialogRef : MatDialogRef<TodoeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.editedTodo = { ...data.todo };
  }


  saveChanges() : void {
    this.dialogRef.close(this.editedTodo);
  }

  cancel() : void {
    this.dialogRef.close();
  }
}
