internal class Program
{
    private static void Main(string[] args)
    {
        //Задача 2 - Тест 1 - 2 II.
        double exampleB = 90;
        double exampleY = 55;

        double exampleResult = Equation(exampleB, exampleY);

        System.Console.WriteLine($"Задача 2 - Тест 1 - 2 II.\nПример B = 90 градуса и Y = 55 градуса => {exampleResult}");

        while (true)
        {
            Console.Write("B=");
            double B = Convert.ToDouble(Console.ReadLine());
            Console.Write("y=");
            double y = Convert.ToDouble(Console.ReadLine());
            double result = Equation(B, y);
            System.Console.WriteLine(result);
            System.Console.Write("Try Again? (y/n)");
            if (Console.ReadLine() != "y")
            {
                break;
            }
        }

        static double Equation(double B, double Y)
        {
            // Преобразуваме в градуси.
            double angelOfB = Math.PI * B / 180; 
            double angelOfY = Math.PI * Y / 180;
            // По форумла -> cotg(x) = 1/tan(x)
            double cotgY = 1 / Math.Tan(angelOfY);

            // Част на израза над дробната черта.
            double x = Math.Sin(angelOfB) + Math.Pow(Math.Sin(Math.Pow(Math.PI, 4)), 2);

            // Част на издраза под дробната черта.
            double z = Math.Pow(Math.Cos(6), 1.0 / 5) + cotgY;

            double result = x / z;

            return result;
        }
    }
}