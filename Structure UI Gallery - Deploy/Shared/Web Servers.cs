// Copyright Neural Systems Inc. | NeuralSystems.ca

#region Namespaces
using System;
using System.Collections.Generic;
using System.IO;
#endregion

namespace Structureˉuiˉgallery.Deploy
{
    public class Webˉservers
    {
        string[] Sshˉservers;
        string Sshˉkeyˉpath;
        string Appˉpath;
        string Appˉserviceˉname;
        string Publishˉfolder;
        string Gcloudˉpath;
        string Sshˉpath;
        string Scpˉpath;

        public Webˉservers(string[] Sshˉservers, string Sshˉkeyˉpath, string Appˉpath, string Appˉserviceˉname, string Publishˉfolder)
        {
            this.Sshˉservers = Sshˉservers;
            this.Sshˉkeyˉpath = Sshˉkeyˉpath;
            this.Appˉpath = Appˉpath;
            this.Appˉserviceˉname = Appˉserviceˉname;
            this.Publishˉfolder = Publishˉfolder;
            this.Gcloudˉpath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile) + @"\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd";
            this.Sshˉpath = Environment.GetFolderPath(Environment.SpecialFolder.System) + @"\OpenSSH\ssh.exe";
            this.Scpˉpath = Environment.GetFolderPath(Environment.SpecialFolder.System) + @"\OpenSSH\scp.exe";
        }

        public void Deployˉtoˉgoogleˉcloud()
        {
            foreach (var Sshˉserver in Sshˉservers)
            {
                ConsoleEx.WriteLineColor("Stopping: " + Appˉserviceˉname, ConsoleColor.Blue);
                Externalˉcommands.Run(this.Gcloudˉpath, "compute", "ssh", Sshˉserver, "--command", "sudo systemctl stop " + Appˉserviceˉname);

                ConsoleEx.WriteLineColor("Delete old folder: " + this.Appˉserviceˉname, ConsoleColor.Blue);
                Externalˉcommands.Run(this.Gcloudˉpath, "compute", "ssh", Sshˉserver, "--command", "rm -f -r " + Appˉpath);

                ConsoleEx.WriteLineColor("Create new folder: " + this.Appˉserviceˉname, ConsoleColor.Blue);
                Externalˉcommands.Run(this.Gcloudˉpath, "compute", "ssh", Sshˉserver, "--command", "mkdir " + Appˉpath);

                ConsoleEx.WriteLineColor("Upload App: " + this.Appˉpath, ConsoleColor.Blue);
                Externalˉcommands.Run(this.Gcloudˉpath, "compute", "scp", "--recurse", Publishˉfolder + "/*", Sshˉserver + ":" + Appˉpath);

                ConsoleEx.WriteLineColor("Starting: " + Appˉserviceˉname, ConsoleColor.Blue);
                Externalˉcommands.Run(this.Gcloudˉpath, "compute", "ssh", Sshˉserver, "--command", "sudo systemctl start " + Appˉserviceˉname);
            }
        }

        public void Deployˉviaˉssh()
        {
            foreach (var Sshˉserver in Sshˉservers)
            {
                if (this.Sshˉkeyˉpath != null)
                {
                    ConsoleEx.WriteLineColor("Stopping: " + Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "-i", this.Sshˉkeyˉpath, "systemctl stop " + Appˉserviceˉname);

                    ConsoleEx.WriteLineColor("Delete old folder: " + this.Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "-i", this.Sshˉkeyˉpath, "rm -f -r " + Appˉpath);

                    ConsoleEx.WriteLineColor("Create new folder: " + this.Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "-i", this.Sshˉkeyˉpath, "mkdir " + Appˉpath);

                    ConsoleEx.WriteLineColor("Upload App: " + this.Appˉpath, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Scpˉpath, "-i", this.Sshˉkeyˉpath, "-r", Publishˉfolder + "/*", Sshˉserver + ":" + Appˉpath);

                    ConsoleEx.WriteLineColor("Starting: " + Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "-i", this.Sshˉkeyˉpath, "systemctl start " + Appˉserviceˉname);
                }
                else
                {
                    ConsoleEx.WriteLineColor("Stopping: " + Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "systemctl stop " + Appˉserviceˉname);

                    ConsoleEx.WriteLineColor("Delete old folder: " + this.Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "rm -f -r " + Appˉpath);

                    ConsoleEx.WriteLineColor("Create new folder: " + this.Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "mkdir " + Appˉpath);

                    ConsoleEx.WriteLineColor("Upload App: " + this.Appˉpath, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Scpˉpath, "-r", Publishˉfolder + "/*", Sshˉserver + ":" + Appˉpath);

                    ConsoleEx.WriteLineColor("Starting: " + Appˉserviceˉname, ConsoleColor.Blue);
                    Externalˉcommands.Run(this.Sshˉpath, Sshˉserver, "systemctl start " + Appˉserviceˉname);
                }
            }
        }
    }
}
