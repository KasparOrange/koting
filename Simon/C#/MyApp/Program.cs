// See https://aka.ms/new-console-template for more information

using MyApp.Examples;

Console.WriteLine("Choose an exmple to run:");
Console.WriteLine("For Math Test enter 1");
Console.WriteLine("For FizzBuzz enter 2");


string? choice = Console.ReadLine();

switch (choice)
{
    case "1":
        MathTest.Run();
        break;

    case "2":
        FizzBuzz.Run();
        break;

    default:
        Console.WriteLine("Invalid choice. Try again.");
        break;
}


