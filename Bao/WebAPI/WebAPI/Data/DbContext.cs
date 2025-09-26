using MongoDB.Driver;
using WebAPI.Data;

namespace WebAPI;

public class DbContext {
    private readonly IMongoDatabase _database; // MongoDB database instance

    public DbContext(IConfiguration configuration) { // Constructor takes an IConfiguration object
        var connectionString = configuration.GetSection("Database:Url").Value;
        var databaseName = configuration.GetSection("Database:Name").Value;

        var client = new MongoClient(connectionString); // A MongoClient is instantiated using the connection string. This client handles the connection to the MongoDB server.
        _database = client.GetDatabase(databaseName); // The GetDatabase method is called on the client, passing the name of the database. This method returns an instance of IMongoDatabase, which is then stored in our _database field
    }
    
    public IMongoCollection<Pet> Pets => _database.GetCollection<Pet>("Pets"); // Creating an accessor for the Pets collection
}