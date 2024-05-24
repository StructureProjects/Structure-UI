// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    /**
     * Once the document is loaded, find all <app-> tags and load them with their JSX content.
     */
    export function Initialize(): void
    {
        let Appˉitems = document.querySelectorAll('app-')
        Appˉitems.forEach((Appˉitem) =>
        {
            (Appˉitem as Appˉelement).Start()
        })
    }

    // Wait for the page to load then start Structure UI
    window.addEventListener('load', Initialize)
}