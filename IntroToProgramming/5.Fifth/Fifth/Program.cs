internal class Program
{
    private static void Main(string[] args)
    {
        //Задача 5 - 379

        //1 - 132 случайни от 0 - 150. Отпечатваме нечетни.

        int[] numbers = new int[132];

        for (int i = 0; i < numbers.Length; i++)
        {
            numbers[i] = new Random().Next(0, 150);
            if (numbers[i] % 2 != 0)
            {
                Console.WriteLine(numbers[i]);
            }
        }

        //2 - Вевеждаме 5 числа от клавиатурата. Отпечатваме корен 5ти от произведението.
        Console.WriteLine("\nВевеждаме 5 числа от клавиатурата. Отпечатваме корен 5ти от произведението.\n");

        Console.Write("a=");
        int a = InputToInt();

        Console.Write("b=");
        int b = InputToInt();

        Console.Write("c=");
        int c = InputToInt();

        Console.Write("d=");
        int d = InputToInt();

        Console.Write("e=");
        int e = InputToInt();

        int f = a + b + c + d + e;

        Console.WriteLine("\nРезултат: " + Math.Pow(f, 1.0 / 5));

        static int InputToInt()
        {
            return Convert.ToInt32(Console.ReadLine());
        }

        //3 - 3 цели полужителни числа - a b c
        //Sss(|c-b|) * Sss(a+c)

        a = 57;
        b = 32;
        c = 23;


        Console.ReadLine();

        Console.WriteLine("\nРезултат: " + Sss(Math.Abs(c-b)) * Sss(a+c));

        ///k = брой случайни числа.
        //Връща произведението на числата, който са двуцифрени и завършват на 5.
        static long Sss(int k)
        {
            int[] numbers = new int[k];

            for(int i = 0; i < numbers.Length; i++)
            {
                //Ограничих случайния генератор с 200 за да се получат двуцифрени числа.
                numbers[i] = new Random().Next(200);
                Console.WriteLine(numbers[i]);
            }

            long result = 1;

            foreach (int i in numbers)
            {
                if (i < 100 && i > 9 && i % 5 == 0 && i % 10 != 0)
                {
                    result *= i;
                    Console.WriteLine("Намеренo двуцифрено число, което завършва на 5 ->" + i);
                }
            }

            Console.WriteLine("\n");
            return result;
        }
    }
}