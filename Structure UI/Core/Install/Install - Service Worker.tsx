// Structure UI : Copyright Neural Systems Inc.

module Structureˉui
{
    declare var self: ServiceWorkerGlobalScope;

    export class Installation 
    {
        /** The App version is automatically updated on deployment */
        static Appˉversion = '_Version_Replace_'

        /** Separate store per version, old stores get deleted after successful update */
        static Cacheˉname = 'App_Files_' + Installation.Appˉversion

        /** Communication channel between the service worker and the app main thread */
        static Installˉchannel: BroadcastChannel


        /** 
         *  This installer is trying to achieve the following:
         *  1-  If this is the first time visiting the app, it copies itself to the cache.
         *  2-	Separate versions of the app have separate cache, old cache is deleted when not needed.
         *  3-	If the app is installed, it is loaded from the user machine.         
         *  4-	If the app is started, it checks the server, if a new app is there, it is downloaded to a new cache.
         *  5-	The old cache is deleted when the new version of the app is opened. 
         *  6-	If a new version of the app is installed, the installer notifies the main thread.
         */
        static Initialize(): void
        {
            self.addEventListener('install', function (Installˉevent: ExtendableEvent)
            {
                Installˉevent.waitUntil(Installation.Install(Installˉevent))
            })

            self.addEventListener('fetch', function (Fetchˉevent: FetchEvent): void
            {
                Fetchˉevent.respondWith(Installation.Fetch(Fetchˉevent))
            })

            self.addEventListener('activate', function (event)
            {
                Installation.Deleteˉoldˉcache()
            })

            Installation.Installˉchannel = new BroadcastChannel('install-channel')
        }

        static async Install(Installˉevent: ExtendableEvent): Promise<void>
        {
            let Fileˉlistˉfetch = await fetch('File List.json')
            let Fileˉlist = await Fileˉlistˉfetch.json()
            let Cacheˉstore = await self.caches.open(Installation.Cacheˉname)
            if (Cacheˉstore != undefined && Fileˉlist != undefined)
            {
                Cacheˉstore.addAll(Fileˉlist)
            }

            Installation.Installˉchannel.postMessage(Installation.Appˉversion)
        }

        static async Fetch(Fetchˉevent: FetchEvent): Promise<Response>
        {
            try
            {                
                // Search the cache, and return it if you find it.
                let Fileˉresponse = await self.caches.match(Fetchˉevent.request, { cacheName: Installation.Cacheˉname })
                if (Fileˉresponse != undefined)
                {
                    return Fileˉresponse
                }
                else
                {
                    return fetch(Fetchˉevent.request)
                }
            }
            catch (Exceptionˉinfo)
            {
                console.log(Exceptionˉinfo)
                return null
            }
        }

        static async Deleteˉoldˉcache(): Promise<void>
        {
            let Keyˉlist = await self.caches.keys()

            if (Keyˉlist == undefined || Keyˉlist.length == 0)
            {
                return
            }

            for (let Index = 0; Index < Keyˉlist.length; Index++)
            {
                let Cacheˉname = Keyˉlist[Index]
                if (Cacheˉname.startsWith('App_Files'))
                {
                    if (Cacheˉname == Installation.Cacheˉname)
                    {
                        continue
                    }
                    self.caches.delete(Cacheˉname)
                }
            }
        }
    }

    Installation.Initialize()
}

