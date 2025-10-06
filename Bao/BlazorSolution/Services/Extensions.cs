using BlazorProject.Data;

namespace BlazorProject.Services;

public static class InvestorExtensions
{
    public static async Task<Investor?> UpdateAsync(
        this Investor investor,
        InvestorRepository repository)
    {
        return await repository.UpdateInvestorAsync(investor);
    }
}