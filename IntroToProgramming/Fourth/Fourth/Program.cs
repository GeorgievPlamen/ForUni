using System.Diagnostics.Metrics;

internal class Program
{
    private static void Main(string[] args)
    {
        //Задача 4 - 213ж

        int counter = 0;
        Console.WriteLine(RecursiveFunc(counter));

        static double RecursiveFunc(double counter)
        {
            if (counter == 100) 
            {
                return counter;
            }
            else
            {
                return counter + Math.Tan(RecursiveFunc(++counter));
            }
        }
    }
}