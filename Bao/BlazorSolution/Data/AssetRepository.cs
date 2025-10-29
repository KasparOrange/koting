using BlazorProject.Services;
using MongoDB.Driver;

namespace BlazorProject.Data;

// NOTE: In addition to the model file, Asset.cs, this file contains all the database operations for the Investor entity.
public class AssetRepository {
    private readonly ILogger<AssetRepository> _logger;

    private readonly DbContext _db;
    
    private readonly INotificationService _notificationService;

    public AssetRepository(ILogger<AssetRepository> logger, DbContext dbContext, INotificationService notificationService) {
        _logger = logger;
        _db = dbContext;
        _notificationService = notificationService;
    }
    
    public async Task<List<Asset>> GetAllAssetsAsync() {
        _logger.LogInformation("Fetching all Assets from database");

        return await _db.Assets.Find(_ => true).ToListAsync();
    }
    
    public async Task<Asset> CreateAssetAsync(Asset Asset) {
        await _db.Assets.InsertOneAsync(Asset);
        
        _logger.LogInformation("Added Asset '{name}' to the database", Asset.Name);
        
        return Asset;
    }
    
    public async Task UpdateAllAssetsAsync (List<Asset> Assets) {
        foreach (var Asset in Assets) {
            _logger.LogInformation("Updating Asset '{name}' in the database, {price}", Asset.Name, Asset.Price);
            
            var result = await _db.Assets.ReplaceOneAsync(s => s.Id == Asset.Id, Asset);
            
            _logger. LogInformation("Matched {matched} and modified {modified} documents", result.MatchedCount, result.ModifiedCount);
        }
        
    }

    public async Task UpdateAssetAsync(Asset Asset) {
        await _db.Assets.ReplaceOneAsync(a => a.Id == Asset.Id, Asset);
        
        _logger.LogInformation("Updated Asset '{name}' in the database", Asset.Name);
    }

    public async Task UpdateAssetByNameAsync(string name, string type) {
        var asset = await _db.Assets.Find(a => a.Name == name).FirstOrDefaultAsync();

        asset.Type = Enum.Parse<AssetType>(type);
        
        await _db.Assets.ReplaceOneAsync(a => a.Name == name, asset);
        
        await _notificationService.SendNotificationAsync(asset);
        
        _logger.LogInformation("Updated type of asset '{name}' to '{type}'.", asset.Name, asset.Type);
    }

    public async Task<Asset> DeleteAssetAsync(Asset Asset) {
        _logger.LogInformation("Deleting Asset {name} from the database", Asset.Name);
        
        var deletedAsset = await _db.Assets.Find(s => s.Id == Asset.Id).FirstOrDefaultAsync();
        
        await _db.Assets.DeleteOneAsync(s => s.Id == Asset.Id);
        
        return deletedAsset;
    }
}