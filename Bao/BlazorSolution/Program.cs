using BlazorProject.Components;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();


app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.MapGet("/pdf", () =>
{
    // Generate the PDF document as before
    var pdf = Document.Create(container => 
    {
        container.Page(page => 
        {
            page.Size(PageSizes.A4);
            page.Content()
                .Background(Colors.Brown.Darken1);
        });
    }).GeneratePdf();

    // Create a response that explicitly tells the browser to display inline
    return Results.Stream(
        stream: new MemoryStream(pdf), 
        contentType: "application/pdf",
        fileDownloadName: null, // No download name = no download prompt
        enableRangeProcessing: true
    );
});

app.Run();

// Document.Create(container => 
//     {
//         container.Page(page => 
//         {
//             page.Size(PageSizes.A4);
//
//             page.Content()
//                 .Background(Colors.Amber.Accent1);
//         });
//     })
//     .GeneratePdfAndShow();