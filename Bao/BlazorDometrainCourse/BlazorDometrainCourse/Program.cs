using BlazorDometrainCourse.Client.Pages;
using BlazorDometrainCourse.Components;
using BlazorDometrainCourse.Data;
using BlazorDometrainCourse.Services.Services;
using Microsoft.AspNetCore.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

builder.Services.AddCascadingValue(_ => {
    
    // Creating a program-wide object of CascadingModel to be shared via CascadingValue
    var model = new CascadingModel {
        SomeText = "Hello from CascadingValue!"
    };
    
    // Creating a provider to supply the 'model' down the component tree
    // Any component can consume it by declaring a [CascadingParameter] of type CascadingModel
    var source = new CascadingValueSource<CascadingModel>(model, isFixed: false);

    // Whenever the model changes, notify the provider to update the consumers
    model.PropertyChanged += (_, _) => source.NotifyChangedAsync();

    return source;
});

// Registering MyService as the implementation of IMyService
builder.Services.AddScoped<IMyService, MyService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseWebAssemblyDebugging();
}
else {
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();


app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(BlazorDometrainCourse.Client._Imports).Assembly);

app.Run();