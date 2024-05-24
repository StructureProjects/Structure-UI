// Structure UI | stru.ca | Copyright Neural Systems Inc

#region Namespaces
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
#endregion

namespace Structureˉuiˉgallery.Deploy
{
    class Program
    {
        static readonly string[] Sshˉservers = new string[] { "root@192.168.0.33" };
        static readonly string Sshˉkeyˉpath = null;
        static readonly string Appˉpath = "/Apps/Structure-UI-Gallery.Next";
        static readonly string Appˉserviceˉname = "Structure-UI-Gallery.Next.service";

        static Webˉservers Servers;
        public static string Solutionˉfolder = "./../../../../.";
        static string Projectˉfolder = @"\Structure UI Gallery";
        static string Publishˉfolder = Projectˉfolder + @"\bin\Release\net8.0\publish";
        static string Projectˉpath = Projectˉfolder + @"\Structure UI Gallery.csproj";
        static string Structureˉuiˉfolder = @"\Structure UI";
        static string Version = DateTime.Now.ToString("yyyy.MM.dd HH:mm");

        static bool Minifyˉjs = true;

        static readonly string[] Jsˉmini = { "/wwwroot/Home" };
        static readonly string[] Cssˉmini = { "/wwwroot/Home" };

        static int Main(string[] args)
        {
            try
            {
                ConsoleEx.WriteLineColor("Deploying: " + Appˉserviceˉname, ConsoleColor.Blue);
                Console.WriteLine();

                //if (ConsoleEx.Ask("Compile JavaScript for Production?", new string[] { "Yes", "No" }, "Yes").ToLower() == "no")
                //{
                //    Minifyˉjs = false;
                //}
                Configure();

                Buildˉtools.Build(Projectˉpath);

                if (Minifyˉjs)
                {
                    var Tasks = new List<Task>();
                    var Jsˉminiˉall = Jsˉmini.Concat(new string[] { "/../Structure UI/Core/Install/Install - Service Worker" });
                    foreach (var Jsˉfile in Jsˉminiˉall)
                    {
                        var Taskˉ1 = Task.Run(() =>
                        {
                            Buildˉtools.Minify(Projectˉfolder + Jsˉfile, Solutionˉfolder + "/Structure UI/Structure UI.js");
                        });
                        Tasks.Add(Taskˉ1);
                    }
                    Tasks.ForEach(Taskˉref => Taskˉref.Wait());
                }

                Buildˉtools.Publish(Projectˉfolder, Projectˉpath, Structureˉuiˉfolder, Publishˉfolder);

                if (Minifyˉjs)
                {
                    foreach (var Jsˉfile in Jsˉmini)
                    {
                        File.Copy(Projectˉfolder + Jsˉfile + ".min.js", Publishˉfolder + Jsˉfile + ".js", true);
                    }
                    foreach (var Cssˉfile in Cssˉmini)
                    {
                        File.Copy(Projectˉfolder + Cssˉfile + ".min.css", Publishˉfolder + Cssˉfile + ".css", true);
                    }
                    File.Copy(Structureˉuiˉfolder + "/Core/Install/Install - Service Worker" + ".min.js", Publishˉfolder + "/wwwroot/App.Install.js");
                }
                else
                {
                    foreach (var Jsˉfile in Jsˉmini)
                    {
                        File.Copy(Projectˉfolder + Jsˉfile + ".min.debug.js", Publishˉfolder + Jsˉfile + ".js", true);
                    }
                    foreach (var Cssˉfile in Cssˉmini)
                    {
                        File.Copy(Projectˉfolder + Cssˉfile + ".css", Publishˉfolder + Cssˉfile + ".css", true);
                    }
                    File.Copy(Structureˉuiˉfolder + "/Core/Install/Install - Service Worker" + ".min.debug.js", Publishˉfolder + "/wwwroot/App.Install.js");
                }

                var Appˉinstall = File.ReadAllText(Publishˉfolder + "/wwwroot/App.Install.js");
                Appˉinstall = Appˉinstall.Replace("_Version_Replace_", Version);
                File.WriteAllText(Publishˉfolder + "/wwwroot/App.Install.js", Appˉinstall);

                File.Delete(Publishˉfolder + "/wwwroot/Home.js.map");
                File.Delete(Publishˉfolder + "/wwwroot/Home.min.css");
                File.Delete(Publishˉfolder + "/wwwroot/Home.min.debug.js");
                File.Delete(Publishˉfolder + "/wwwroot/Home.min.js");

                Servers.Deployˉviaˉssh();

                ConsoleEx.WriteLineColor("Deployment Compleated!", ConsoleColor.Green);
            }
            catch (Exception ex)
            {
                ConsoleEx.WriteLineColor(ex.ToString(), ConsoleColor.Red);
            }
            Console.ReadKey();
            return 0;
        }

        static void Configure()
        {
            Solutionˉfolder = Path.GetFullPath(Directory.GetCurrentDirectory() + Solutionˉfolder);
            Publishˉfolder = Path.GetFullPath(Solutionˉfolder + Publishˉfolder);
            Projectˉpath = Path.GetFullPath(Solutionˉfolder + Projectˉpath);
            Projectˉfolder = Path.GetFullPath(Solutionˉfolder + Projectˉfolder);
            Structureˉuiˉfolder = Path.GetFullPath(Solutionˉfolder + Structureˉuiˉfolder);

            Servers = new Webˉservers(Sshˉservers, Sshˉkeyˉpath, Appˉpath, Appˉserviceˉname, Publishˉfolder);
        }
    }
}
