using System.Text.Json;
using MongoDB.Driver;
using WebAPI.Data;

namespace WebAPI;

public static class Endpoints {
    
    public static void MapPetEndpoints(this WebApplication app) {

        // creating a route group with a common prefix and tag
        // Tags are beneficial for documentation and tooling purposes,
        // such as OpenAPI/Swagger, where they help categorize and display related endpoints together,
        // improving API discoverability and readability
        var petGroup = app.MapGroup("pets").WithTags("Pets");

        // NOTE: GET
        petGroup.MapGet("/", async (DbContext db, ILogger<Program> logger) => {
            logger.LogInformation("Fetching pets");
            
            var pets = await db.Pets.Find(_ => true).ToListAsync();
            return Results.Ok(pets);
        });

        // NOTE: GET by ID
        petGroup.MapGet("/{id:length(24)}", async (string id, DbContext db) => {
            var pet = await db.Pets.Find(p => p.Id.ToString() == id).FirstOrDefaultAsync();
            return pet is not null ? Results.Ok(pet) : Results.NotFound();
        });

        // NOTE: POST
        petGroup.MapPost("/", async (Pet pet, DbContext db) => {
            await db.Pets.InsertOneAsync(pet);
            return Results.Created($"/pets/{pet.Id}", pet);
        });
        
        // NOTE: PUT/Update
        petGroup.MapPut("/{id:length(24)}", async (string id, Pet updated, DbContext db) => {
            var result = await db.Pets.ReplaceOneAsync(p => p.Id.ToString() == id, updated);
            return result.MatchedCount > 0 ? Results.Ok(updated) : Results.NotFound();
        });
        
        // NOTE: DELETE
        petGroup.MapDelete("/{id:length(24)}", async (string id, DbContext db) => {
            var deletedPet = await db.Pets.Find(p => p.Id.ToString() == id).FirstOrDefaultAsync();
            
            var result = await db.Pets.DeleteOneAsync(p => p.Id.ToString() == id);
            // return a 201 ok
            return result.DeletedCount > 0 ? Results.Ok(deletedPet) : Results.NotFound();
        });
    }
    
    public static void MapPublicEndpoints(this WebApplication app) {
        var publicGroup = app.MapGroup("public").WithTags("Public");

        // NOTE: All countries names
        publicGroup.MapGet("/countries/allnames", async (HttpClient httpClient, ILogger<Program> logger) => {
            logger.LogInformation("Fetching all countries names from restcountries.com");
            
            var countries = await httpClient.GetFromJsonAsync<JsonElement[]>("https://restcountries.com/v3.1/all?fields=name");

            var officialNames = countries
                .Select(country => country.GetProperty("name").GetProperty("official").GetString())
                .ToArray();

            return Results.Ok(officialNames);
        });
        
        // NOTE: Info on Germany
        publicGroup.MapGet("/countries/germany", async (HttpClient httpClient, ILogger<Program> logger) => {
            logger.LogInformation("Fetching info on Germany from restcountries.com");

            var germany = await httpClient.GetFromJsonAsync<JsonElement>("https://restcountries.com/v3.1/name/germany");

            return Results.Ok(germany);
        });
        
        // NOTE: Inference provider (LLM)
        publicGroup.MapPost("/inference", async (HttpRequest incomingRequest, HttpClient httpClient, ILogger<Program> logger) => {
            logger.LogInformation("Posting prompt to the Hugging Face inference providing API");

            // get the prompt from the incoming request body (not really a simpler way to do this...)
            using var reader = new StreamReader(incomingRequest.Body);
            var prompt = await reader.ReadToEndAsync();
            
            // form the outgoing request with the prompt & my token
            var outgoingRequest = new { // as specified by the API
                messages = new[] { new { role = "user", content = prompt } },
                model = "deepseek-ai/DeepSeek-V3-0324",
                stream = false
            };
            httpClient.DefaultRequestHeaders.Authorization = 
                new("Bearer", "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");

            // send the request and get the json response
            var response = await httpClient.PostAsJsonAsync(
                "https://router.huggingface.co/v1/chat/completions", 
                outgoingRequest);
            var jsonResponse = await response.Content.ReadFromJsonAsync<JsonElement>();

            // extract the content only from the response
            var responseContentOnly = jsonResponse
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return responseContentOnly;
        });
    }

    public record SecurityDto(string Name, string ISIN, double Price) {
        public double Price { get; set; } = Price;
    }

    public static void MapPortfolioEndpoints(this WebApplication app) {
        var portfolioGroup = app.MapGroup("portfolio").WithTags("Portfolio");

        portfolioGroup.MapPost("/refreshprice", (SecurityDto dto, ILogger<Program> logger) => {
            dto.Price = dto.Price == 0
            ? 10 + Random.Shared.NextDouble() * (1000 - 10)
            : dto.Price + (1 + Random.Shared.Next(-5, 6) / 100.0);
            
            return Results.Json(dto);
        });
    }
}