namespace MyApp.Examples;

public class MathTest
{
    public static void Run() {

        Console.WriteLine("Hi, this is a little math test. The first excercise is to multiply two numbers.");

        Console.WriteLine("Enter the first number that comes to your head: ");
        int numA = Convert.ToInt32(Console.ReadLine());

        Console.WriteLine("Enter a second number: ");
        int numB = Convert.ToInt32(Console.ReadLine());

        Console.WriteLine("The answer is: ");
        int answer = numA * numB;
        int answerInput = Convert.ToInt32(Console.ReadLine());
        int numberOfTries = 0;

        while (answer != answerInput) {
                Console.Write("That was false. Try again: ");
                answerInput = Convert.ToInt32(Console.ReadLine());
                numberOfTries++;
            }

        Console.WriteLine($"Correct! That only took you {numberOfTries} tries.");
    }
}