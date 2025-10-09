using Microsoft.AspNetCore.Components;

namespace BlazorDometrainCourse.Components.Demos;

// This is another way of a code-behind-like structure
public class CounterInheritModel : ComponentBase {
    protected int currentCount = 0;

    protected void IncrementCount() {
        currentCount++;
    }
}