using MongoDB.Driver;

namespace BlazorProject.Data;

// NOTE: In addition to the model file, Portfolio.cs, this file contains all the database operations for the Investor entity.
public class PortfolioRepository {
    private readonly ILogger<PortfolioRepository> _logger;

    private readonly DbContext _dbContext;

    public PortfolioRepository(ILogger<PortfolioRepository> logger, DbContext dbContext) {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    public async Task<List<Portfolio>> GetAllPortfoliosAsync() {
        _logger.LogInformation("Fetching all portfolios from database");

        return await _dbContext.Portfolios.Find(_ => true).ToListAsync();
    }
    
    public async Task<Portfolio> CreatePortfolioAsync(Portfolio portfolio) {
        portfolio.CreatedAt = DateTime.Now;
        
        await _dbContext.Portfolios.InsertOneAsync(portfolio);
        
        _logger.LogInformation("Added portfolio '{name}' to the database", portfolio.Name);

        return portfolio;
    }
    
    public async Task<Portfolio> DeletePortfolioAsync(Portfolio portfolio) {
        _logger.LogInformation("Deleting portfolio {name} from the database", portfolio.Name);
        
        var deletedPortfolio = await _dbContext.Portfolios.Find(p => p.Id == portfolio.Id).FirstOrDefaultAsync();
        
        await _dbContext.Portfolios.DeleteOneAsync(p => p.Id == portfolio.Id);
        
        return deletedPortfolio;
    }
}