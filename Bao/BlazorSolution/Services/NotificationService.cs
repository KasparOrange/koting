using BlazorProject.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.SignalR.Client;

namespace BlazorProject.Services;

public interface INotificationService {
    event Action<Asset>? AssetChanged;
    Task SendNotificationAsync(Asset asset);
}

public class NotificationService : IAsyncDisposable, INotificationService {
    public NotificationService(NavigationManager navigationManager) {
        _hubConnection = new HubConnectionBuilder()
            .WithUrl(navigationManager.ToAbsoluteUri("/NotificationHub"))
            .Build();
        
        _hubConnection.On<Asset>("AssetChanged", (post) => {
            AssetChanged?.Invoke(post);
        });
        
        _hubConnection.StartAsync();
    }

    private readonly HubConnection _hubConnection;
    
    public event Action<Asset>? AssetChanged;

    public async Task SendNotificationAsync(Asset asset) {
        await _hubConnection.SendAsync("SendNotification", asset);
    }

    public async ValueTask DisposeAsync() {
        await _hubConnection.DisposeAsync();
    }
}