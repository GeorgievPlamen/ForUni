internal class Program
{
    private static void Main(string[] args)
    {
        //Задача 1 - 2025 to Binary,Octal and Hexadecimal

        int number = 2025;

        Console.WriteLine(ToBinary(number));
        Console.WriteLine(ToOctal(number));
        Console.WriteLine(ToHexadecimal(number));

    }

    static string ToBinary(int number)
    {
        return Convert.ToString(number, 2);
    }
    static string ToOctal(int number)
    {
        return Convert.ToString(number, 8);
    }
    static string ToHexadecimal(int number)
    {
        return Convert.ToString(number, 16);
    }
}