internal class Program
{
    private static void Main(string[] args)
    {
        //Задача 7 - 372аб

        //Празен масив, защото е масив по условие. Не динамичен лист.
        string[] cities = new string[0];


        //Примерни градове.
        cities = AddCity(cities, "Пловдив");
        cities = AddCity(cities, "Ивайловград");
        cities = AddCity(cities, "Бургас");
        cities = AddCity(cities, "Крумовград");
        cities = AddCity(cities, "София");
        cities = AddCity(cities, "Градешница");
        cities = AddCity(cities, "Хасково");
        cities = AddCity(cities, "Димитровград");
        cities = AddCity(cities, "Варна");

        Console.Write("Примерни градове:");
        foreach (string city in cities) 
        {
            Console.Write(" " + city + ",");
        }

        Console.WriteLine("\nГрадове който садържат \"град\": " + GetAllCitiesWithGrad(cities));


        while (true)
        {
            Console.Write("\nВъведи \"и\" за изход или добави нов град:");
            string toAdd = Console.ReadLine();

            if(string.IsNullOrEmpty(toAdd))
            {
                throw new ArgumentNullException("Cannot be null or empty");
            }
            else if(toAdd == "и")
            {
                break;
            }
            cities = AddCity(cities, toAdd);
            Console.WriteLine($"Добавихме: {toAdd}\n");
            Console.WriteLine("\nГрадове който садържат \"град\": " + GetAllCitiesWithGrad(cities));
        }

        static string GetAllCitiesWithGrad(string[] cities)
        {
            string[] citiesWithGrad = new string[0];

            foreach (string city in cities) 
            { 
                //Филтрираме масива.
                if (city.Contains("град") || city.Contains("Град"))
                {
                    //Добавяме с вече готовия метод.
                    citiesWithGrad = AddCity(citiesWithGrad, city);
                }
            }

            //Връщаме нов низ с всички градова разделен с ", ".
            return String.Join(", ",citiesWithGrad);
        }

        static string[] AddCity(string[] cities,string newCity)
        {
            //Не позволяваме повече от 50.
            if(cities.Length > 50)
            {
                throw new ArgumentOutOfRangeException();
            }
            //Копираме стойностите от стария масив.
            string[] newCities = new string[cities.Length + 1];
            for (int i = 0; i < cities.Length; i++)
            {
                newCities[i] = cities[i];
            }

            //Подсигуряваме, че първата буква е главна.
            char firstLetter = char.ToUpper(newCity[0]);
            string cityToAdd = firstLetter + newCity.Substring(1);

            newCities[newCities.Length - 1] = cityToAdd;
            return newCities;
        }
     }
}