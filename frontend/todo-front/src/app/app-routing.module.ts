import { RouterModule, Routes } from "@angular/router";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoDetailComponent } from "./todo-detail/todo-detail.component";
import { CreateTodoComponent } from "./create-todo/create-todo.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full'},
    { path: 'todos', component: TodoListComponent},
    { path: 'todos/:id', component: TodoDetailComponent},
    { path: 'create-todo', component: CreateTodoComponent}
]



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}