using System.Reflection.Metadata.Ecma335;

internal class Program
{
    private static void Main(string[] args)
    {
        //Задача 3 - 60.
        Console.WriteLine("К трябва да е числото 1,2 или 3.\n");

        while(true)
        {
            Console.Write("K=");
            Function();
        }
        static void Function()
        {
            int k = Convert.ToInt32(Console.ReadLine());

            double result;
            switch (k)
            {
                case 1:
                    {
                        result = 6.7;
                        Console.WriteLine(result);
                        break;
                    }
                case 2:
                    {
                        result = 6.7 + 9 * k;
                        Console.WriteLine(result);
                        break;
                    }
                case 3:
                    {
                        result = 6.7 + 9 * k + 7 * Math.Pow(k, 2);
                        Console.WriteLine(result);
                        break;
                    }
                default:
                    {
                        Console.WriteLine("Приема се само 1,2 или 3.");
                        break;
                    }
            }
        }
    }
}