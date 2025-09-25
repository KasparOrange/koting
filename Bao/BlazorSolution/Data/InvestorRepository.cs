using MongoDB.Driver;

namespace BlazorProject.Data;

// NOTE: In addition to the model file, Investor.cs, this file contains all the database operations for the Investor entity.
public class InvestorRepository {
    private readonly ILogger<InvestorRepository> _logger;
    
    private readonly DbContext _dbContext;
    
    public InvestorRepository(ILogger<InvestorRepository> logger, DbContext dbContext) {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    public async Task<List<Investor>> GetAllInvestorsAsync() {
        _logger.LogInformation("Fetching all investors from database");
        
        return await _dbContext.Investors.Find(_ => true).ToListAsync();
    }
    
    public async Task<Investor?> GetInvestorByIdAsync(string id) {
        _logger.LogInformation("Fetching investor with ID {Id} from database", id);
        
        return await _dbContext.Investors.Find(i => i.Id.ToString() == id).FirstOrDefaultAsync();
    }
    
    public async Task<Investor> CreateInvestorAsync(Investor investor) {
        investor.CreatedAt = DateTime.Now;
        
        await _dbContext.Investors.InsertOneAsync(investor);
        
        _logger.LogInformation("Added investor '{name}' to the database", investor.Name);
        
        return investor;
    }
    
    public async Task<Investor?> UpdateInvestorAsync(Investor updatedInvestor) {
        _logger.LogInformation("Updating investor with ID {Id} in the database", updatedInvestor.Id);
        
        var result = await _dbContext.Investors.ReplaceOneAsync(i => i.Id == updatedInvestor.Id, updatedInvestor);
        
        return result.MatchedCount > 0 ? updatedInvestor : null;
    }
    
    public async Task<Investor?> DeleteInvestorAsync(string id) {
        _logger.LogInformation("Deleting investor with ID {Id} from the database", id);
        
        var deletedInvestor = await _dbContext.Investors.Find(i => i.Id.ToString() == id).FirstOrDefaultAsync();
        
        var result = await _dbContext.Investors.DeleteOneAsync(i => i.Id.ToString() == id);
        
        return result.DeletedCount > 0 ? deletedInvestor : null;
    }
}