using System.Collections.Generic;
using System.Threading.Tasks;
using dot_back.Models;

public interface ITodoItemService
{
    Task<List<TodoItem>> GetAllTodoItemsAsync();
    Task<TodoItem> GetTodoItemByIdAsync(int id);
    Task<TodoItem> CreateTodoItemAsync(TodoItem todoItem);
    Task UpdateTodoItemAsync(int id, TodoItem todoItem);
    Task DeleteTodoItemAsync(int id);
}
