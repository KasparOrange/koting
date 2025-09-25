using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlazorProject.Data;

public class Investor {
    [BsonId]
    public ObjectId Id { get; init; } = ObjectId.Empty;
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

