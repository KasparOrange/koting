using WebAPI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddSingleton<DbContext>(); // or use AddScoped for per-request lifetime?
builder.Logging.AddSimpleConsole(o => { o.TimestampFormat = "HH:mm:ss.fff "; });

var app = builder.Build();

// Get the logger from DI
var logger = app.Services.GetRequiredService<ILogger<Program>>();

logger.LogInformation("Application starting, mapping endpoints...");

// Map Endpoints
app.MapGet("/", (ILogger<Program> logger) => {
    logger.LogInformation("Root endpoint accessed");
    return Results.Ok("Welcome to my WebAPI demo!");
});
app.MapPetEndpoints();
app.MapPublicEndpoints();

app.UseHttpsRedirection();

logger.LogInformation("Application started successfully");

app.Run();