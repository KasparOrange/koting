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
    
    
}