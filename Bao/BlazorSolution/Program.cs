using BlazorProject.Components;
using BlazorProject.Data;
using MudBlazor.Services;
using MudExtensions.Services;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ZXing;
using ZXing.QrCode;
using ZXing.Rendering;

QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Logging.AddSimpleConsole(o => {
    o.TimestampFormat = "HH:mm:ss.fff ";
});

builder.Services.AddMudServices();
builder.Services.AddMudExtensions();
builder.Services.AddSingleton<DbContext>();
builder.Services.AddHttpClient();

builder.Services.AddSingleton<InvestorRepository>();
builder.Services.AddSingleton<SecurityRepository>();
builder.Services.AddSingleton<PortfolioRepository>();

var app = builder.Build();

var logger = app.Services.GetRequiredService<ILogger<Program>>();

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

app.MapGet("/pdf", (string code = "https://noveltyemails.com/fuckyou.com") =>
{
    if (string.IsNullOrWhiteSpace(code))
        return Results.BadRequest("Code parameter is required");

    var pdf = Document.Create(container => 
    {
        container.Page(page => 
        {
            page.Size(PageSizes.A4);

            page.Content()
                .Background(Colors.Brown.Darken1)
                .Padding(20)
                .Column(column =>
                {
                    column.Item()
                        .AlignCenter()
                        .Width(200)
                        .Height(200)
                        .Background(Colors.White)
                        .Svg(size =>
                        {
                            var writer = new QRCodeWriter();

                            var qrCode = writer.encode(code, BarcodeFormat.QR_CODE, (int)size.Width, (int)size.Height);

                            var renderer = new SvgRenderer();

                            return renderer.Render(qrCode, BarcodeFormat.QR_CODE, null).Content;
                        });

                    column.Item()
                        .PaddingTop(20)
                        .AlignCenter()
                        .Text(code)
                        .FontColor(Colors.White)
                        .FontSize(16);
                });
        });
    }).GeneratePdf();

    return Results.Stream(
        stream: new MemoryStream(pdf), 
        contentType: "application/pdf",
        fileDownloadName: null,
        enableRangeProcessing: true
    );
});

app.Run();