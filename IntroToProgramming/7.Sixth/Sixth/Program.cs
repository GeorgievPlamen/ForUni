internal class Program
{
    private static void Main(string[] args)
    {
        //Задача 6 - 398

        // N - брой дни в месеца.
        int n = 30;

        //Инициализираме трите станции.
        int[] stationА = AddRainData(n);
        int[] stationB = AddRainData(n);
        int[] stationC = AddRainData(n);

        //Отпечатваме средното количество валежи за всяка станция през месеца.
        Console.WriteLine("Отпечатваме средното количество валежи за всяка станция през месеца.\n");
        Console.WriteLine($"Средно количество валежи на станция А => {GetAverageRain(stationА), 0:N2} литра на квадратен метър.");
        Console.WriteLine($"Средно количество валежи на станция B => {GetAverageRain(stationB), 0:N2} литра на квадратен метър.");
        Console.WriteLine($"Средно количество валежи на станция C => {GetAverageRain(stationC), 0:N2} литра на квадратен метър.");

        Console.WriteLine("\nОтпечатваме дните и стойностите на всяка станция, чиято надвишава средното количество вълежи през месеца.\n");

        PrintAboveAverageDays(stationА,nameof(stationА));

        Console.WriteLine("");
        PrintAboveAverageDays(stationB,nameof(stationB));
        Console.WriteLine("");

        PrintAboveAverageDays(stationC,nameof(stationC));


        

        static int[] AddRainData(int n)
        {
            //Проверяваме броят дни.
            if(n > 31)
            {
                throw new ArgumentOutOfRangeException("Must be below 31 days");
            }

            //Инициализираме и попълваме масива.(С ограничение на кубик на ден)
            //Една единица = един литър на квадратен метър.
            int[] rainStation = new int[n];
            for (int i = 0; i < rainStation.Length; i++)
            {
                rainStation[i] = new Random().Next(1000);
            }

            return rainStation;
        }

        static double GetAverageRain(int[] rainStation)
        {
            double totalValue = 0;

            foreach (int day in  rainStation)
            {
                totalValue += day;
            }

            //Разделяме цялото количество в/у дните в масива.
            return totalValue / rainStation.Length;
        }

        static void PrintAboveAverageDays(int[] rainStation,string nameOfStation)
        {
            double cpr = GetAverageRain(rainStation);

            for (int i = 0; i < rainStation.Length; i++)
            {
                if (rainStation[i] > cpr)
                {
                    
                    //i + 1 Защото дните започват от 1 , а масивът от 0.
                    Console.WriteLine($"Станция {nameOfStation} прескочи средното количество за месеца на ден: {i + 1}");
                }
            }
        }
    }
}