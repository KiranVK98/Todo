using System.Collections.Generic;
using System.Threading.Tasks;
using dot_back.Models;
using Microsoft.AspNetCore.Mvc;


namespace dot_back.Controllers
{
    [ApiController]
    [Route("api/todo")]

    public class TodoController : ControllerBase
    {
        private readonly ITodoItemService _todoItemService;

        public TodoController(ITodoItemService todoItemService)
        {
            _todoItemService = todoItemService;
        }


        [HttpGet]
        public async Task<ActionResult<List<TodoItem>>> GetAllTodoItems()
        {
            var todoItems = await _todoItemService.GetAllTodoItemsAsync();
            return Ok(todoItems);
        }

[       HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            var todoItem = await _todoItemService.GetTodoItemByIdAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }
            return Ok(todoItem);
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem todoItem)
        {
            var createdTodoItem = await _todoItemService.CreateTodoItemAsync(todoItem);
            return CreatedAtAction(nameof(GetTodoItem), new { id = createdTodoItem.Id }, createdTodoItem);
        }
    }
}


