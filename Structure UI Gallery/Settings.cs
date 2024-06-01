// Structure UI Gallery | stru.ca | Copyright Neural Systems Inc

#region Namespaces
using Microsoft.Extensions.Configuration;
using System.IO;
#endregion

namespace Structureˉui.Gallery;

public class Settings
{
    public static IConfiguration Configuration;
    public static string Version;
    public static string Appˉfolder;
    public static bool Developmentˉmode;
    public static readonly int Cacheˉduration = 60; // Seconds
    public static bool Googleˉanalyticsˉenabled = false;
    public static string Googleˉanalyticsˉmeasurementˉid;

    public static void Load(IConfiguration Configuration, bool Isˉdevelopment)
    {
        Settings.Configuration = Configuration;
        Developmentˉmode = Isˉdevelopment;

        Version = Configuration.GetValue<string>("Version");

        var Analyticsˉsection = Configuration.GetSection("Google Analytics");
        if (Analyticsˉsection != null)
        {
            Googleˉanalyticsˉenabled = Analyticsˉsection.GetValue<bool>("Enabled");
            Googleˉanalyticsˉmeasurementˉid = Analyticsˉsection["Measurement Id"];
        }
    }
}
