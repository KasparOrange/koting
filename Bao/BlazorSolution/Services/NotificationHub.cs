using BlazorProject.Data;
using Microsoft.AspNetCore.SignalR;

namespace BlazorProject.Services;

public class NotificationHub : Hub
{
    public async Task SendNotification(Asset asset)
    {
        await Clients.All.SendAsync("AssetChanged", asset);
    }
}