using MongoDB.Driver;

namespace WebAPI;

public static class Endpoints {
    public static void MapPetEndpoints(this WebApplication app) {

        // creating a route group with a common prefix and tag
        // Tags are beneficial for documentation and tooling purposes,
        // such as OpenAPI/Swagger, where they help categorize and display related endpoints together,
        // improving API discoverability and readability
        var petGroup = app.MapGroup("api/pets").WithTags("Pets");

        // NOTE: GET
        petGroup.MapGet("/", async (DbContext db) => {
            var pets = await db.Pets.Find(_ => true).ToListAsync();
            return Results.Ok(pets);
        });

        // NOTE: GET by ID
        petGroup.MapGet("/{id:length(24)}", async (string id, DbContext db) => {
            var pet = await db.Pets.Find(p => p.Id == id).FirstOrDefaultAsync();
            return pet is not null ? Results.Ok(pet) : Results.NotFound();
        });

        // NOTE: POST
        petGroup.MapPost("/", async (Pet pet, DbContext db) => {
            await db.Pets.InsertOneAsync(pet);
            return Results.Created($"/api/pets/{pet.Id}", pet);
        });
        
        // NOTE: PUT/Update
        petGroup.MapPut("/{id:length(24)}", async (string id, Pet updated, DbContext db) => {
            var result = await db.Pets.ReplaceOneAsync(p => p.Id == id, updated);
            return result.MatchedCount > 0 ? Results.Ok(updated) : Results.NotFound();
        });
        
        // NOTE: DELETE
        petGroup.MapDelete("/{id:length(24)}", async (string id, DbContext db) => {
            var deletedPet = await db.Pets.Find(p => p.Id == id).FirstOrDefaultAsync();
            
            var result = await db.Pets.DeleteOneAsync(p => p.Id == id);
            // return a 201 ok
            return result.DeletedCount > 0 ? Results.Ok(deletedPet) : Results.NotFound();
        });
    }
}