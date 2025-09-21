namespace WebAPI;

public static class PetEndpoints {
    public static void MapPetEndpoints(this WebApplication app) {
        
        // creating a route group with a common prefix and tag
        // Tags are beneficial for documentation and tooling purposes,
        // such as OpenAPI/Swagger, where they help categorize and display related endpoints together,
        // improving API discoverability and readability
        var petGroup = app.MapGroup("api/pets").WithTags("Pets");
        
        petGroup.MapGet("/", () => Results.Ok(GetPets()));

        petGroup.MapGet("/{id:int}", (int id) => {
            var pet = GetPetById(id);
            return pet is not null ? Results.Ok(pet) : Results.NotFound();
        });

        petGroup.MapPost("/", (PetDto pet) => {
            var newPet = CreatePet(pet);
            return Results.Created($"/api/pets/{newPet.Id}", newPet);
        });
    }
    
    private static IEnumerable<PetDto> GetPets() {
        return new List<PetDto> {
            new PetDto { Id = 1, Name = "Pippa", Gender = Gender.Female },
            new PetDto { Id = 2, Name = "Ollie", Gender = Gender.Male }
        };
    }

    private static PetDto? GetPetById(int id) {
        return GetPets().FirstOrDefault(p => p.Id == id);
    }

    private static PetDto CreatePet(PetDto petDto) {
        return petDto with { Id = GetPets().Max(p => p.Id) + 1 };
    }
}