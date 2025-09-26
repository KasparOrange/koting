using MongoDB.Driver;

namespace BlazorProject.Data;

// NOTE: In addition to the model file, Security.cs, this file contains all the database operations for the Investor entity.
public class SecurityRepository {
    private readonly ILogger<SecurityRepository> _logger;

    private readonly DbContext _dbContext;

    public SecurityRepository(ILogger<SecurityRepository> logger, DbContext dbContext) {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    public async Task<List<Security>> GetAllSecuritiesAsync() {
        _logger.LogInformation("Fetching all securities from database");

        return await _dbContext.Securities.Find(_ => true).ToListAsync();
    }
    
    public async Task<Security> CreateSecurityAsync(Security security) {
        await _dbContext.Securities.InsertOneAsync(security);
        
        _logger.LogInformation("Added security '{name}' to the database", security.Name);
        
        return security;
    }
    
    public async Task<Security> DeleteSecurityAsync(Security security) {
        _logger.LogInformation("Deleting security {name} from the database", security.Name);
        
        var deletedSecurity = await _dbContext.Securities.Find(s => s.Id == security.Id).FirstOrDefaultAsync();
        
        await _dbContext.Securities.DeleteOneAsync(s => s.Id == security.Id);
        
        return deletedSecurity;
    }
}