// See https://aka.ms/new-console-template for more information

using System;
using System.IO;
using System.Linq;

namespace NotesFormatting;

class NotesFormatter
{
    public static void FormatNotes(string inputPath, string outputPath)
    {
        if (string.IsNullOrEmpty(inputPath))
            throw new ArgumentNullException(nameof(inputPath));
            
        if (string.IsNullOrEmpty(outputPath))
            throw new ArgumentNullException(nameof(outputPath));
        
        try
        {
            // Read all lines from the input file
            var lines = File.ReadAllLines(inputPath);

            // Process the lines: remove empty ones and add bullets
            var formattedLines = lines
                .Where(line => !string.IsNullOrWhiteSpace(line))
                .Select(line => 
                {
                    var trimmedLine = line.TrimStart();
                    var leadingSpaces = line.Substring(0, line.Length - trimmedLine.Length);
                    return trimmedLine.StartsWith("-") ? line : $"{leadingSpaces}- {trimmedLine}";
                });

            // Write the formatted content to the output file
            File.WriteAllLines(outputPath, formattedLines);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}

class Program
{
    static void Main()
    {
        Console.Write("Enter input file path: ");
        var inputPath = Console.ReadLine();
        
        Console.Write("Enter output file path: ");
        var outputPath = Console.ReadLine();
        
        if (string.IsNullOrEmpty(inputPath) || string.IsNullOrEmpty(outputPath))
        {
            Console.WriteLine("Invalid file paths!");
            return;
        }

        if (File.Exists(inputPath))
        {
            NotesFormatter.FormatNotes(inputPath, outputPath);
            Console.WriteLine("Notes formatted successfully!");
        }
        else
        {
            Console.WriteLine("Input file not found!");
        }
    }
}