using System.Collections.Generic;
using System.Threading.Tasks;
using dot_back.Data;
using dot_back.Models;
using Microsoft.EntityFrameworkCore;


public class TodoItemService : ITodoItemService
{
    private readonly ApplicationDbContext _context;

    public TodoItemService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<TodoItem>> GetAllTodoItemsAsync()
    {
        return await _context.TodoItems.ToListAsync();
    }

    public async Task<TodoItem> GetTodoItemByIdAsync(int id)
    {
        return await _context.TodoItems.FindAsync(id);
    }

    public async Task<TodoItem> CreateTodoItemAsync(TodoItem todoItem)
    {
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();
        return todoItem;
    }

    public async Task UpdateTodoItemAsync(int id, TodoItem todoItem)
    {
        var existingItem = await _context.TodoItems.FindAsync(id);
        if( existingItem == null)
        {
            throw new Exception("Todo item not found");
        }

        existingItem.Title = todoItem.Title;
        existingItem.Description = todoItem.Description;
        existingItem.DueDate = todoItem.DueDate;
        existingItem.IsCompleted = todoItem.IsCompleted;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteTodoItemAsync(int id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem != null)
        {
            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
        }
    }
}