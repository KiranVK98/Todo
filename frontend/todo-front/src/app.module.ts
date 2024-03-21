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

//import service
import { TodoService } from './app/todo.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      AppComponent,
      TodoListComponent,
      TodoDetailComponent
      // Add other components here (e.g., TodoDetailComponent)
    ],
    imports: [
        CommonModule,
      BrowserModule,
      HttpClientModule, // Import for HTTP requests
      RouterModule, // Import for routing
      Approute // Import your routing module for specific routes
    ],
    providers: [TodoService], // Provide TodoService for dependency injection
    bootstrap: [AppComponent] // Bootstrap the main AppComponent
  })
  export class AppModule {}