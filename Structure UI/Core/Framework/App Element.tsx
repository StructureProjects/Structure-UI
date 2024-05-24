// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    /**
     * <app- /> is an html element, this element goes inside the html document, it is 
     * usually one per html document, but you can add more if needed.
     * 
     * Once the document is loaded, app will look for a JSX content and render that content. 
     * 
     * Attributes:
     * View: Once the app is ready, it will search for the view by name and render it.
     * Notes: 
     *   - You need to provide the full view name with namespaces.
     *   - If you minify the code and minify the object names, preserve that name.
     *   - The easiest way (globalThis as any)['__my_view_name'] = my_view_name
     */
    export class Appˉelement extends HTMLElement
    {
        async Start()
        {
            let Viewˉname: string = this.getAttribute('View')?.toString()
            if (Viewˉname !== null)
            {
                let Viewˉtype = (globalThis as any)[Viewˉname]
                if (Viewˉtype != null)
                {
                    let Appˉview: View = new Viewˉtype() as View
                    if (Appˉview != null)
                    {
                        let Viewˉcontent = Appˉview.Render()
                        if (Array.isArray(Viewˉcontent))
                        {
                            Viewˉcontent.forEach((Contentˉelement) =>
                            {
                                this.appendChild(Contentˉelement)
                            })
                        }
                        else if (Viewˉcontent != null)
                        {
                            this.appendChild(Viewˉcontent)
                        }
                    }
                }
            }
        }
    }

    customElements.define('app-', Appˉelement)
}
