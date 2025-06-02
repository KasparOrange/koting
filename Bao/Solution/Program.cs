using QuestPDF.Companion;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Previewer;

QuestPDF.Settings.License = LicenseType.Community;

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

// double money = 10D / 3D;
// Console.WriteLine(string.Format("£{0:0.00}", money));
// Console.WriteLine(money.ToString("C"));

Document.Create(container => 
    {
        container.Page(page => 
        {
            page.Size(PageSizes.A4);

            page.Content()
                .Background(Colors.Amber.Accent1);
        });
    })
    .GeneratePdfAndShow();