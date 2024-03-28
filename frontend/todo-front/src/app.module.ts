import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Import routing components
import { RouterModule } from '@angular/router'; // Import for routing
import { Approute } from './app/app-routing.module';

// Import components
import { AppComponent } from './app/app.component';
import { TodoListComponent } from './app/todo-list/todo-list.component';
import { TodoDetailComponent } from './app/todo-detail/todo-detail.component';
import { TodoeditComponent } from './app/todoedit/todoedit.component';
//import service
import { TodoService } from './app/todo.service';
import { CommonModule, DatePipe } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './app/navbar/navbar.component';
import { CreateTodoComponent } from './app/create-todo/create-todo.component';

@NgModule({
    declarations: [
      AppComponent,
      TodoListComponent,
      TodoDetailComponent,
      TodoeditComponent,
      NavbarComponent,
      CreateTodoComponent
      // Add other components here (e.g., TodoDetailComponent)
    ],
    imports: [
        CommonModule,
      BrowserModule,
      HttpClientModule, // Import for HTTP requests
      RouterModule, // Import for routing
      Approute, // Import your routing module for specific routes
      MatInputModule,
      MatCheckboxModule,
      MatButtonModule,
      MatFormFieldModule,
      MatDatepickerModule,
      FormsModule,
      MatNativeDateModule,
      MatDialogModule,
      MatToolbarModule,
      MatListModule
    ],
    providers: [
        TodoService, 
        provideAnimationsAsync(),
        DatePipe
      ], // Provide TodoService for dependency injection
    bootstrap: [AppComponent] // Bootstrap the main AppComponent
  })
  export class AppModule {}