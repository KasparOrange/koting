namespace BlazorDometrainCourse.Services.Services;

public class MyService : IMyService {
    public List<string> Names { get; set; } = [];

    public void AddName(string name) {
        Names.Add(name);
    }

    public MyService() {
        AddName( "John" );
        AddName( "Jane" );
        AddName( "Doe" );
    }
}

public interface IMyService {
    List<string> Names { get; set; }
    void AddName(string name);
}