using BlazorProject.Components;
using BlazorProject.Data;
using BlazorProject.Services;
using MudBlazor.Services;
using MudExtensions.Services;
using BlazorSortable;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents().AddInteractiveServerComponents();

builder.Logging.AddSimpleConsole(o => { o.TimestampFormat = "HH:mm:ss.fff "; });

builder.Services.AddSingleton<DbContext>();
builder.Services.AddSingleton<InvestorRepository>();
builder.Services.AddScoped<AssetRepository>();
builder.Services.AddSingleton<PortfolioRepository>();

builder.Services.AddMudServices();
builder.Services.AddMudExtensions();
builder.Services.AddSortable();

builder.Services.AddSignalR();
builder.Services.AddScoped<INotificationService, NotificationService>();

builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAntiforgery();
app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
// Using the NotificationHub class to handle communications
// Creating a connection endpoint at /NotificationHub
// Clients can connect to this endpoint to receive real-time notifications
app.MapHub<NotificationHub>("/NotificationHub");

app.Run();