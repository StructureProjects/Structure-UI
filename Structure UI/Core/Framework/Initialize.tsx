// Structure UI | stru.ca | Copyright Neural Systems Inc

namespace Structureˉui
{
    export let App = new Appˉelement()
    /**
     * Once the document is loaded, find all <app-> tags and load them with their JSX content.
     */
    export function Initialize(): void
    {        
        document.body.appendChild(App)
        App.Start()
    }

    // Wait for the page to load then start Structure UI
    window.addEventListener('load', Initialize)
}