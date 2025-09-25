using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BlazorProject.Data;

public class Portfolio {
    [BsonId]
    public ObjectId Id { get; init; } = ObjectId.Empty;
    public string Name { get; set; } = string.Empty;
    public ObjectId InvestorId { get; init; } = ObjectId.Empty;
    public List<Security> Securities { get; set; } = [];
    public DateTime CreatedAt { get; init; }

}
public partial class Security {
    public string SecurityName { get; set; } = string.Empty;

    public ObjectId SecurityObjectId { get; set; } = ObjectId.Empty;

    public static double Percentage { get; set; }
}

