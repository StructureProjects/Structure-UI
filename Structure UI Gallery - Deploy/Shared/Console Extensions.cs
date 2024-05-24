// Structure UI | stru.ca | Copyright Neural Systems Inc

#region Namespaces
using System;
using System.IO;
using System.Linq;
#endregion

namespace Structureˉuiˉgallery.Deploy
{
    public static class ConsoleEx
    {
        public static void WriteLineColor(String Message, ConsoleColor Messageˉcolor)
        {
            var Oldˉcolor = Console.ForegroundColor;
            Console.ForegroundColor = Messageˉcolor;
            Console.WriteLine(Message);
            Console.ForegroundColor = Oldˉcolor;
        }

        public static string Ask(string Question, string[] Possibleˉanswers, string Defaultˉanswer)
        {
        Askˉstart:
            Console.WriteLine(Question);
            foreach (var Possibleˉanswer in Possibleˉanswers)
            {
                Console.WriteLine("  " + Possibleˉanswer);
            }
            Console.Write("Default Choice (" + Defaultˉanswer + "): ");
            var Answer = Console.ReadLine();
            if (Possibleˉanswers.Count(me => me.ToLower() == Answer.ToLower()) > 0)
            {
                return Answer;
            }
            else if (string.IsNullOrWhiteSpace(Answer))
            {
                return Defaultˉanswer;
            }
            else
            {
                goto Askˉstart;
            }
        }
    }
}
