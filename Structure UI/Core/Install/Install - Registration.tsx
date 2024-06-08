// Structure UI : Copyright Neural Systems Inc.

namespace Structureˉui
{
    export class Install
    {
        static async Register(Appˉversion: string): Promise<void>
        {
            // Don’t register the service worker for development.
            if (Appˉversion == '_Version_Replace_')
            {
                return
            }

            await navigator.serviceWorker.register('App.Install.js', {scope: './'})
        }
    }
}
