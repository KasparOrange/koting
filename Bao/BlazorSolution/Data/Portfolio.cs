using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;

namespace BlazorProject.Data;

public class Portfolio {
    [BsonId] public ObjectId Id { get; init; } = ObjectId.Empty;
    public string Name { get; set; } = string.Empty;
    public ObjectId InvestorId { get; init; } = ObjectId.Empty;
    
    // Without this, creating a new object from an ObjectId (in portfolios.razor) isn't possible because to serialise the Dictionary<ObjectId,double> as a BSON document, the keys would have to be strings instead of objectids
    [BsonDictionaryOptions(DictionaryRepresentation.ArrayOfDocuments)] 
    public Dictionary<ObjectId, double> AssetDistribution { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}