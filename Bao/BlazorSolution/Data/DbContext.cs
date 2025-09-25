using MongoDB.Driver;

namespace BlazorProject.Data;

public class DbContext {
    private readonly IMongoDatabase _database; // MongoDB database instance

    public DbContext(IConfiguration configuration) { // Constructor takes an IConfiguration object
        var client = new MongoClient("mongodb://localhost:27017"); // A MongoClient is instantiated using the connection string. This client handles the connection to the MongoDB server.
        _database = client.GetDatabase("PortfolioDemo"); // The GetDatabase method is called on the client, passing the name of the database. This method returns an instance of IMongoDatabase, which is then stored in our _database field
    }
    
    // Accessors for collections
    public IMongoCollection<Investor> Investors => _database.GetCollection<Investor>("Investors");
    public IMongoCollection<Portfolio> Portfolios => _database.GetCollection<Portfolio>("Portfolios");
    public IMongoCollection<Security> Securities => _database.GetCollection<Security>("Securities");
}