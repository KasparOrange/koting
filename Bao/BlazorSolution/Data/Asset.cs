using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlazorProject.Data;

public class Asset {
    [BsonId]
    public ObjectId Id { get; init; } = ObjectId.Empty;
    public string Name { get; set; } = string.Empty;
    public string ISIN { get; set; } = string.Empty;
    public double Price { get; set; }
    [Range(1, int.MaxValue, ErrorMessage = "Please specify the asset type")]
    public AssetType Type { get; set; }
}