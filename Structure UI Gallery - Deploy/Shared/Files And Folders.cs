// Structure UI | stru.ca | Copyright Neural Systems Inc

#region Namespaces
using System;
using System.IO;
using System.Linq;
using System.Threading;
#endregion

namespace Structureˉuiˉgallery.Deploy
{
    public class Filesˉandˉfolders
    {
        public static void Copyˉfolder(string Sourceˉfolder, string Destinationˉfolder, bool Copyˉsubˉfolders, string Includeˉfiles = null,
            string Excludeˉfiles = null, string Excludeˉfolders = null, bool Copyˉemptyˉdirectories = false)
        {
            // Get the subdirectories for the specified directory.
            DirectoryInfo Directoryˉinfo = new DirectoryInfo(Sourceˉfolder);

            if (!Directoryˉinfo.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + Sourceˉfolder);
            }

            DirectoryInfo[] Folders = Directoryˉinfo.GetDirectories().ToArray();
            if (Excludeˉfolders != null)
            {
                var Excludeˉfoldersˉarray = Excludeˉfolders.Split(';').SelectMany(filter => Directoryˉinfo.GetDirectories(filter.Trim())).Select(Item => Item.FullName).ToArray();
                Folders = Folders.Where(Item => !Excludeˉfoldersˉarray.Contains(Item.FullName)).ToArray();
            }

            // If the destination directory doesn't exist, create it.
            if (!Directory.Exists(Destinationˉfolder))
            {
                Directory.CreateDirectory(Destinationˉfolder);
                Thread.Sleep(100); // Until someone fixes the Windows or Linux Share defect
            }

            // Get the files in the directory and copy them to the new location.
            FileInfo[] Filesˉlist = Directoryˉinfo.GetFiles();
            var Excludeˉfilesˉlist = new string[0];
            if (Excludeˉfiles != null)
            {
                Excludeˉfilesˉlist = Excludeˉfiles.Split(';').SelectMany(filter => Directoryˉinfo.GetFiles(filter.Trim())).Select(Item => Item.FullName).ToArray();
            }
            if (Includeˉfiles != null)
            {
                Filesˉlist = Includeˉfiles.Split(';').SelectMany(filter => Directoryˉinfo.GetFiles(filter.Trim())).ToArray();
                Filesˉlist = Filesˉlist.Where(Item => !Excludeˉfilesˉlist.Contains(Item.FullName)).ToArray();
            }

            foreach (FileInfo Fileˉitem in Filesˉlist)
            {
                string Temporaryˉfolder = Path.Combine(Destinationˉfolder, Fileˉitem.Name);
                Fileˉitem.CopyTo(Temporaryˉfolder, true);
            }

            // If copying subdirectories, copy them and their contents to new location.
            if (Copyˉsubˉfolders)
            {
                foreach (DirectoryInfo Subˉfolders in Folders)
                {
                    string temppath = Path.Combine(Destinationˉfolder, Subˉfolders.Name);
                    Copyˉfolder(Subˉfolders.FullName, temppath, Copyˉsubˉfolders, Includeˉfiles, Excludeˉfiles, Excludeˉfolders, Copyˉemptyˉdirectories);
                }
            }

            if (Directory.GetFiles(Destinationˉfolder).Count() == 0 && Directory.GetDirectories(Destinationˉfolder).Count() == 0)
            {
                Directory.Delete(Destinationˉfolder);
            }
        }

        internal static void Deleteˉfiles(string Folder, string Searchˉpattern)
        {
            var Fileˉitems = Directory.GetFiles(Folder, Searchˉpattern);
            foreach (var Fileˉitem in Fileˉitems)
            {
                File.Delete(Fileˉitem);
            }
        }

        public static void Emptyˉfolder(string Folderˉpath)
        {
            var Folderˉinfo = new DirectoryInfo(Folderˉpath);

            foreach (var Fileˉinfo in Folderˉinfo.GetFiles())
            {
                Fileˉinfo.Delete();
            }
            foreach (var Folderˉitemˉinfo in Folderˉinfo.GetDirectories())
            {
                Folderˉitemˉinfo.Delete(true);
            }
        }
    }
}
