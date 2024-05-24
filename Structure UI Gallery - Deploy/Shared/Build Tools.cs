// Structure UI | stru.ca | Copyright Neural Systems Inc

#region Namespaces
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
#endregion

namespace Structureˉuiˉgallery.Deploy
{
    public static class Buildˉtools
    {
        static string Msˉbuild = @"C:\Program Files\Microsoft Visual Studio\2022\Community" + @"\MSBuild\Current\Bin\MSBuild.exe";
        static string Closureˉcompiler;
        const string Jsˉinˉversion = "ECMASCRIPT_2021";
        const string Jsˉoutˉversion = "ECMASCRIPT_2021";
        static Buildˉtools()
        {
            Closureˉcompiler = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile) + "./node_modules/google-closure-compiler-windows/compiler.exe";
            Closureˉcompiler = Path.GetFullPath(Closureˉcompiler);
        }

        /// <summary>
        /// Builds a .NET project
        /// </summary>
        /// <param name="Projectˉpath">The project path including the project file name</param>
        public static void Build(string Projectˉpath)
        {
            ConsoleEx.WriteLineColor("Building: " + Projectˉpath, ConsoleColor.Blue);
            Externalˉcommands.Run(Msˉbuild, Projectˉpath, "/p:Configuration=Release", "-restore", "-t:rebuild", "-verbosity:m");
        }

        public static void Publish(string Projectˉfolder, string Projectˉpath, string Structureˉuiˉfolder, string Publishˉfolder, bool Addˉstructure = true)
        {
            // Step 1: Publish the project with the dotnet command to a temporary folder.
            // Note: The publish will pickup some unneeded files.
            ConsoleEx.WriteLineColor("Publishing: " + Projectˉfolder, ConsoleColor.Blue);
            if (Directory.Exists(Publishˉfolder))
            {
                Directory.Delete(Publishˉfolder, true);
            }
            Externalˉcommands.Run("dotnet.exe", "publish", Projectˉpath, "--no-build", "--no-restore", "--configuration", "Release");

            // Step 2: Update the software version if available 
            var Configˉfileˉpath = Publishˉfolder + @"\Configuration.json";
            if (File.Exists(Configˉfileˉpath))
            {
                var Configˉtext = File.ReadAllText(Configˉfileˉpath);
                Configˉtext = Configˉtext.Replace("_Version_Replace_", DateTime.Now.ToString("yyyy.MM.dd HH:mm"));
                File.WriteAllText(Configˉfileˉpath, Configˉtext);
            }

            if (Addˉstructure)
            {
                // Step 3: Copy the important files from the published code to the deployment folder
                Filesˉandˉfolders.Copyˉfolder(Projectˉfolder, Publishˉfolder, true, "*.png;*.jpg;*.jpeg;*.gif;*.woff2;*.html;manifest.json;*.appcache;*.yaml", null, "bin;obj;properties");

                // Step 4: Copy the Structure UI library resources to the to the deployment folder
                Filesˉandˉfolders.Copyˉfolder(Structureˉuiˉfolder, Publishˉfolder + @"\wwwroot\Structure UI", true, "*.png;*.jpg;*.jpeg;*.gif;*.woff2;Browser Compatibility.js", null, "bin;obj;properties");
            }
        }


        public static void Createˉpackage(string Projectˉfolder, string Publishˉfolder, string Packageˉfolder)
        {
            var Filesˉtoˉdeploy = File.ReadAllLines(Projectˉfolder + @"\File List.Deploy.txt");
            if (Directory.Exists(Packageˉfolder))
            {
                Directory.Delete(Packageˉfolder, true);
            }

            foreach (var Fileˉtoˉdeploy in Filesˉtoˉdeploy)
            {
                if (String.IsNullOrWhiteSpace(Fileˉtoˉdeploy))
                {
                    continue;
                }
                var Directoryˉpath = new FileInfo(Packageˉfolder + Fileˉtoˉdeploy).Directory.FullName;
                if (!Directory.Exists(Directoryˉpath))
                {
                    Directory.CreateDirectory(Directoryˉpath);
                }
                File.Copy(Publishˉfolder + Fileˉtoˉdeploy.Trim(), Packageˉfolder + Fileˉtoˉdeploy);
            }
        }

        public static void Minify(string Appˉjs, string Structureˉuiˉjs)
        {
            ConsoleEx.WriteLineColor("Compiling: " + Appˉjs, ConsoleColor.Blue);
            
            var Taskˉ1 = Task.Run(() =>
            {
                Externalˉcommands.Run(Closureˉcompiler, "--js", Appˉjs + ".js", "--js_output_file", Appˉjs + ".min.js",
                    "--externs", Program.Solutionˉfolder + @"\Structure UI Gallery - Deploy\Extern.js",
                    "--compilation_level", "ADVANCED_OPTIMIZATIONS", "--language_in", Jsˉinˉversion, "--language_out", Jsˉoutˉversion, "--warning_level", "QUIET");
            });

            var Taskˉ2 = Task.Run(() =>
            {
                Externalˉcommands.Run(Closureˉcompiler, "--js", Appˉjs + ".js", "--js_output_file", Appˉjs + ".min.debug.js",
                    "--externs", Program.Solutionˉfolder + @"\Structure UI Gallery - Deploy\Extern.js",
                    "--compilation_level", "ADVANCED_OPTIMIZATIONS", "--language_in", Jsˉinˉversion, "--language_out", Jsˉoutˉversion, "--warning_level", "QUIET",
                    "--debug", "--formatting=PRETTY_PRINT");
            });

            Taskˉ1.Wait();
            Taskˉ2.Wait();

            //Updateˉscript(Scriptˉpath + ".min.js");
            //Updateˉscript(Scriptˉpath + ".min.debug.js");
        }


        /// <summary>
        /// Fix a few items caused by the typescript compiler of JSX.
        /// </summary>
        /// <param name="Scriptˉpath"></param>
        private static void Updateˉscript(string Scriptˉpath)
        {
            var Script = File.ReadAllText(Scriptˉpath);

            Regex Unicodeˉitems = new Regex(@"\\[uU]([0-9A-Fa-f]{4})");
            Script = Unicodeˉitems.Replace(Script, match => ((char)Int32.Parse(match.Value.Substring(2), NumberStyles.HexNumber)).ToString());

            File.WriteAllText(Scriptˉpath, Script);
        }

        private static void Updateˉscriptˉjsx(string Scriptˉpath)
        {
            var Script = File.ReadAllText(Scriptˉpath);

            // Fixes
            var TextˉtoˉReplace = new List<string>();
            var Pattern = new Regex(" \\\"[a-zA-Z0-9]+ˉ+[a-zA-Z0-9]+ˉ*[a-zA-Z0-9]*ˉ*[a-zA-Z0-9]*ˉ*[a-zA-Z0-9]*ˉ*[a-zA-Z0-9]*\": ");
            var Itemsˉtoˉreplace = Pattern.Matches(Script);

            foreach (Match Itemˉtoˉreplace in Itemsˉtoˉreplace)
            {
                if (!TextˉtoˉReplace.Contains(Itemˉtoˉreplace.Value))
                {
                    TextˉtoˉReplace.Add(Itemˉtoˉreplace.Value);
                }
            }

            foreach (var StringˉtoˉReplace in TextˉtoˉReplace)
            {
                Script = Script.Replace(StringˉtoˉReplace, StringˉtoˉReplace.Replace("\"", ""));
            }


            var Sourceˉmapˉindex = Script.IndexOf("//# sourceMappingURL=") + 21;
            var Sourceˉmap = Script.Substring(Sourceˉmapˉindex, Script.Length - Sourceˉmapˉindex);
            var Sourceˉmapˉencode = UrlEncoder.Default.Encode(Sourceˉmap);
            Script = Script.Replace("//# sourceMappingURL=" + Sourceˉmap, "//# sourceMappingURL=" + Sourceˉmapˉencode);

            // Optimizations
            /*
            var TextˉtoˉReplace2 = new Dictionary<string, string>();
            Pattern = new Regex("Structureˉui\\.Process\\([a-zA-Z0-9]*,");
            Itemsˉtoˉreplace = Pattern.Matches(Script);

            foreach (Match Itemˉtoˉreplace in Itemsˉtoˉreplace)
            {
                if (!TextˉtoˉReplace2.ContainsKey(Itemˉtoˉreplace.Value))
                {
                    var Newˉvalue = Itemˉtoˉreplace.Value.Replace("Structureˉui.Process(", "");
                    Newˉvalue = Newˉvalue.Replace(",", ".Convertˉtoˉhtml(");
                    TextˉtoˉReplace2.Add(Itemˉtoˉreplace.Value, Newˉvalue);
                }
            }

            foreach (var StringˉtoˉReplace in TextˉtoˉReplace2)
            {
                Script = Script.Replace(StringˉtoˉReplace.Key, StringˉtoˉReplace.Value);
            }
            */

            File.WriteAllText(Scriptˉpath, Script);
        }
    }
}
