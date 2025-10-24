using MongoDB.Driver;

namespace BlazorProject.Data;

public class DbContext {
    private readonly IMongoDatabase _db; // Mongo database field

    public DbContext() {
        // A MongoClient is instantiated using the connection string.
        // This client handles the connection to the MongoDB server.
        var client = new MongoClient("mongodb://localhost:27017"); 
        // The GetDatabase method is called on the client, passing the name of the database.
        // This method returns an instance of IMongoDatabase, which is then stored in our _database field
        _db = client.GetDatabase("PortfolioDemo"); 
    }

    // Each db model gets its own collection property that has an expression-bodied getter.
    public IMongoCollection<Investor> Investors => _db.GetCollection<Investor>("Investors");
    public IMongoCollection<Portfolio> Portfolios => _db.GetCollection<Portfolio>("Portfolios");
    public IMongoCollection<Asset> Assets => _db.GetCollection<Asset>("Assets");
}