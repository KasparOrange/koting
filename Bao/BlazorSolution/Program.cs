using BlazorProject.Components;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ZXing;
using ZXing.QrCode;
using ZXing.Rendering;

QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

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