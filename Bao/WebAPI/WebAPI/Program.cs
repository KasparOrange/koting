using System.Reflection;
using WebAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.MapOpenApi();
}

var buildInfo = new BuildDto();
builder.Configuration.GetSection("Build").Bind(buildInfo);

app.MapGet("/", () => Results.Json(buildInfo));

app.MapPetEndpoints(); // can also be put into a separate file

app.UseHttpsRedirection();

app.Run();

internal record BuildDto {
    public string Title { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
}
