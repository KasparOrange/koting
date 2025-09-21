namespace WebAPI;

public record PetDto {
    public int Id { get; init; }

    public string Name { get; init; } = string.Empty;

    public Gender Gender { get; init; }
}

public enum Gender {
    Female = 1,
    Male,
    Unknown
}