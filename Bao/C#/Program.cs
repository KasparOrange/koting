//setting up basic c# project
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// int age = 23;
// Console.WriteLine(age);
// Console.WriteLine(int.MaxValue);
// Console.WriteLine(int.MinValue);

// long bigNumber = -1234567890123456789L;
// Console.WriteLine(bigNumber);
// Console.WriteLine(long.MaxValue);
// Console.WriteLine(long.MinValue);

// double negative = -55.2;
// Console.WriteLine(negative);
// Console.WriteLine(double.MaxValue);
// Console.WriteLine(double.MinValue);

// float precision = 5.0000001F;
// Console.WriteLine(precision);
// Console.WriteLine(float.MaxValue);
// Console.WriteLine(float.MinValue);

// decimal money = 14.99M;
// Console.WriteLine(money);
// Console.WriteLine(decimal.MaxValue);
// Console.WriteLine(decimal.MinValue);

// Console.ReadLine();

// string name = "John Doe";
// char initial = 'J';

// Console.WriteLine(name + " " + initial);

// odd/even checker
// Console.Write("Enter the dividend: ");
// int dividend = int.Parse(Console.ReadLine());
// Console.Write("Enter the divisor: ");
// int divisor = int.Parse(Console.ReadLine());
// string isEven = (dividend % 2 == 0) ? "yes" : "no";
// int quotient = dividend / divisor;
// int remainder = dividend % divisor;
// System.Console.WriteLine("Even: " + isEven);
// System.Console.WriteLine("Quotient: " + quotient);
// System.Console.WriteLine("Remainder: " + remainder);

double money = 14.99;
Console.WriteLine(string.Format("£{0:0.00}", money));
Console.WriteLine(money.ToString("C"));

