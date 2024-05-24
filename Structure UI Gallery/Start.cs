// Structure UI | stru.ca | Copyright Neural Systems Inc

#region Namespaces
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
#endregion

namespace Structureˉui.Gallery;

public class Start
{
    public static void Main(string[] args)
    {
        Settings.Appˉfolder = Directory.GetCurrentDirectory();

        var Webˉappˉbuilder = WebApplication.CreateBuilder(args);

#if DEBUG
        Webˉappˉbuilder.Logging.ClearProviders();
        Webˉappˉbuilder.Logging.AddConsole();
#endif

        Webˉappˉbuilder.WebHost.UseKestrel(Options => { Options.AddServerHeader = false; });
#if DEBUG
        Webˉappˉbuilder.WebHost.UseIIS();
#endif

        Webˉappˉbuilder.Configuration.AddJsonFile("Configuration.json", false, false);
        Webˉappˉbuilder.Configuration.AddJsonFile("Configuration.json.dev", true, false);


#if RELEASE
        Webˉappˉbuilder.Services.AddResponseCaching();
        Webˉappˉbuilder.Services.AddResponseCompression();
#endif
        Webˉappˉbuilder.Services.AddControllers();

        var Mvcˉbuilder = Webˉappˉbuilder.Services.AddMvc(Options =>
        {
            Options.EnableEndpointRouting = false;

            Options.CacheProfiles.Add("Static Content",
                new CacheProfile()
                {
#if DEBUG
                    Location = ResponseCacheLocation.None,
                    NoStore = true,
#else
                    Duration = Settings.Cacheˉduration,
                    Location = ResponseCacheLocation.Any,
                    VaryByQueryKeys = new string[] { "v" }
#endif
                });

            Options.CacheProfiles.Add("Never",
                new CacheProfile()
                {
                    Location = ResponseCacheLocation.None,
                    NoStore = true,
                });
        });
        Mvcˉbuilder.WithRazorPagesAtContentRoot();

        Webˉappˉbuilder.Services.AddControllersWithViews().ConfigureApplicationPartManager(
            PartManager => PartManager.ApplicationParts.Add(new AssemblyPart(typeof(Start).Assembly)));


        var Webˉapp = Webˉappˉbuilder.Build();

        Settings.Load(Webˉappˉbuilder.Configuration, Webˉapp.Environment.IsDevelopment());

        Webˉapp.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });

        if (Settings.Developmentˉmode)
        {
            Webˉapp.UseDeveloperExceptionPage();
        }
        else
        {
            Webˉapp.UseExceptionHandler("/Error");
            Webˉapp.UseHsts();
        }

#if RELEASE
        Webˉapp.UseResponseCaching();
        Webˉapp.UseResponseCompression();
#endif
        Webˉapp.UseCookiePolicy();

        Webˉapp.UseMvc();
        Webˉapp.UseStaticFiles(new StaticFileOptions()
        {
            ContentTypeProvider = new FileExtensionContentTypeProvider(),
            FileProvider = new CompositeFileProvider(new List<PhysicalFileProvider>()
            {
                new PhysicalFileProvider(Settings.Appˉfolder + "/wwwroot/"),
#if DEBUG
                new PhysicalFileProvider(Settings.Appˉfolder + "/../Structure UI/"), // Structure UI - Debug Mode Only (For Resources)
#endif
            }),
            RequestPath = new PathString(""),

            OnPrepareResponse = Responseˉcontext =>
            {
                var Headers = Responseˉcontext.Context.Response.Headers;
                Headers["Content-Security-Policy"] = "frame-ancestors 'none'"; // Disable embedding this site / web app in other site’s iFrames
#if DEBUG
                Headers.Append("Cache-Control", "no-store,no-cache");
#else
                Responseˉcontext.Context.Response.Headers.Append("Cache-Control", "public,max-age=60");
                Responseˉcontext.Context.Response.Headers.Append("Expires", DateTime.UtcNow.AddHours(60).ToString("R", CultureInfo.InvariantCulture));
#endif
            },

#if DEBUG
            ServeUnknownFileTypes = true,
#endif
        });

        Webˉapp.UseDefaultFiles();
        Webˉapp.UseRouting();
        Webˉapp.UseEndpoints(Endpoints =>
        {
            Endpoints.MapControllers();
        });

        Webˉapp.Run();
    }
}
