// Structure UI | stru.ca | Copyright Neural Systems Inc

#region Namespaces
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
#endregion

namespace Structureˉuiˉgallery.Deploy
{
    public static class Externalˉcommands
    {
        public static void Run(string Commandˉtext, params string[] Commandˉparameters)
        {
            string Parameters = "";
            foreach (var Commandˉparameter in Commandˉparameters)
            {
                if (Commandˉparameter.Contains(" "))
                {
                    Parameters += " \"" + Commandˉparameter + "\"";
                }
                else
                {
                    Parameters += " " + Commandˉparameter;
                }
            }

            ConsoleEx.WriteLineColor(Commandˉtext + " " + Parameters, ConsoleColor.Cyan);

            ProcessStartInfo Processˉinfo = new ProcessStartInfo(Commandˉtext, Parameters);
            Processˉinfo.UseShellExecute = false;
            Processˉinfo.RedirectStandardOutput = true;
            Processˉinfo.RedirectStandardError = true;
            Processˉinfo.CreateNoWindow = true;

            var Processˉreference = new Process();
            Processˉreference.StartInfo = Processˉinfo;
            Processˉreference.ErrorDataReceived += Writeˉtoˉconsoleˉwindow;
            Processˉreference.OutputDataReceived += Writeˉtoˉconsoleˉwindow;
            Processˉreference.EnableRaisingEvents = true;
            Processˉreference.Start();
            Processˉreference.BeginOutputReadLine();
            Processˉreference.BeginErrorReadLine();
            Processˉreference.WaitForExit();
            if (Processˉreference.ExitCode != 0)
            {
                throw new Exception("Process exit code: " + Processˉreference.ExitCode);
            }
        }

        public static void Runˉparallel(Tuple<string, string[]>[] Processˉnameˉarguments)
        {
            var Tasks = new List<Task>();
            foreach (var Nameˉandˉargument in Processˉnameˉarguments)
            {
                Tasks.Add(Task.Run(() => Run(Nameˉandˉargument.Item1, Nameˉandˉargument.Item2)));
            }
            Task.WaitAll(Tasks.ToArray());
        }

        // write out info to the display window
        static void Writeˉtoˉconsoleˉwindow(object Sender, DataReceivedEventArgs Event)
        {
            Console.WriteLine(Event.Data);
        }
    }
}
