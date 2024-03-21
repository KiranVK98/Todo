using dot_back.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", builder =>
    {
        // Allow requests from specific origins (replace with your allowed origins)
        builder.WithOrigins("http://localhost:4200"); // Your Angular application domain

        // Allow specific methods (GET, POST, etc.)
        builder.AllowAnyMethod();

        builder.AllowAnyHeader();

        // Allow specific headers (optional)
        // builder.WithHeaders("Content-Type", "Authorization");
    });
});

// Add services to the container.
builder.Services.AddScoped<ITodoItemService, TodoItemService>();


builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(
        options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));

//register the service


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseCors("MyPolicy");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
