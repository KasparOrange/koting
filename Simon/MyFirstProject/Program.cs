// See https://aka.ms/new-console-template for more information
// string userInput = "LIVE";
//
// Console.WriteLine($"User input: {userInput}");
// Console.Write("Forwards: ");
// for (int i = 0; i < userInput.Length; i++) {
//     Console.Write(userInput[i]);
// }
//
// Console.WriteLine();
// Console.Write("Backwards: ");
// for (int i = userInput.Length - 1; i >= 0; i--) {
//     Console.Write(userInput[i]);
//     if (i <= 0) {
//         Console.Write("\n");
//     }
// }
// Console.Write("foreach loop bw: ");
//
// foreach (var character in userInput.Reverse()) {
//     Console.Write(character);
// }

// Ask user to enter a password, and store
// Ask user to enter password again and store
// Check if they both contain something
// If they do, check if they match
// If they match, tell user
// If they don't match, tell user
// If they are empty, tell user

string? password = null;
string? passwordConfirmation = null;

while (true) {
    while (string.IsNullOrEmpty(password)) {
        Console.Write("Please enter your password: ");

        password = Console.ReadLine();
    }

    while (string.IsNullOrEmpty(passwordConfirmation)) {
        Console.Write("Please confirm your password: ");

        passwordConfirmation = Console.ReadLine();
    }

    if (password == passwordConfirmation) {
        break;
    }

    password = null;
    passwordConfirmation = null;
    Console.WriteLine();
}

Console.Write("Your passwords match!\n");   