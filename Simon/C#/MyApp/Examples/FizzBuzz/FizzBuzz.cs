namespace MyApp.Examples;

public class FizzBuzz
{
    public static void Run() {
        bool threeDiv = false;
        bool fiveDiv = false;

        for (int i = 1; i <= 15; i++) {

            threeDiv = i % 3 == 0;
            fiveDiv = i % 5 ==0;
            // more memory efficient to only calculate it once up here

            if (threeDiv && fiveDiv) {
                Console.WriteLine(i + " -> FizzBuzz");
            } 

            else if (threeDiv) {

                Console.WriteLine(i + " -> Fizz");

            } else if (fiveDiv) { 

                Console.WriteLine(i + " -> Buzz");

            } else Console.WriteLine(i);

            // Alternative using nested ternary operators
            // threeDiv = i % 3 == 0;
            // fiveDiv = i % 5 == 0;
            
            // string result = threeDiv && fiveDiv ? "FizzBuzz" :
            //             threeDiv ? "Fizz" :
            //             fiveDiv ? "Buzz" :
            //             i.ToString();
            
            // Console.WriteLine($"{i} -> {result}");

        }
    }
}

