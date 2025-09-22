using WebAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddSingleton<DbContext>(); // or use AddScoped for per-request lifetime?
builder.Logging.AddSimpleConsole(o => { o.TimestampFormat = "HH:mm:ss.fff "; });

var app = builder.Build();

// Get the logger from DI
var logger = app.Services.GetRequiredService<ILogger<Program>>();

logger.LogInformation("Application starting...");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.MapOpenApi();
    
    logger.LogDebug("Development mode - OpenAPI enabled");
}

// Configure build info, accessible from the root endpoint
var buildInfo = new BuildDto();
builder.Configuration.GetSection("Build").Bind(buildInfo);

logger.LogInformation("Build info loaded: {Title} v{Version}", buildInfo.Title, buildInfo.Version);

app.MapGet("/", (ILogger<Program> endpointLogger) => {
    endpointLogger.LogInformation("Root endpoint accessed");
    
    return Results.Json(buildInfo);
});

app.MapPetEndpoints(); // can also be put into a separate file

app.UseHttpsRedirection();

logger.LogInformation("Application started successfully");

app.Run();

internal record BuildDto {
    public string Title { get; set; } = string.Empty;
    
    public string Version { get; set; } = string.Empty;
}