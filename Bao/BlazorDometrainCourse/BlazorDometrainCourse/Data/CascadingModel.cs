using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace BlazorDometrainCourse.Data;

public class CascadingModel : INotifyPropertyChanged {
    public event PropertyChangedEventHandler? PropertyChanged;

    private string _someText = string.Empty;

    public string SomeText {
        get => _someText;
        set {
            _someText = value;
            OnPropertyChanged();
        }
    }

    private void OnPropertyChanged([CallerMemberName] string propertyName = null) {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}