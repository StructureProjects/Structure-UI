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
        Currentˉview?: View

        Start()
        {
            let Viewˉname: string = this.getAttribute('View')?.toString()
            if (Viewˉname !== null)
            {
                let Viewˉtype = (globalThis as any)[Viewˉname]
                this.Changeˉview(Viewˉtype)
            }

            let Onˉreadyˉname: string = this.getAttribute('Ready')?.toString()
            if (Onˉreadyˉname !== null)
            {
                let Onˉreadyˉtype = (globalThis as any)[Onˉreadyˉname]
                if (Onˉreadyˉtype != null)
                {
                    Onˉreadyˉtype(this)
                }
            }

            window.addEventListener('popstate', this.Handleˉnavigationˉbuttons)
        }

        /**
         * Change the current view.
         * @param Viewˉconstructor The view type.
         * @param Parameters Additional info you want to pass to the view
         * @param Changeˉurl Do you want to change the browser url?
         * @param Addˉtoˉhistory Do you want to record this change so you can go back to it with the back button.
         * @returns
         */
        Changeˉview(Viewˉconstructor: { new(): View }, Parameters?: Map<string, string>, Changeˉurl: boolean = true,
            Addˉtoˉhistory: boolean = true): void 
        {
            if (Viewˉconstructor == null)
            {
                return
            }

            // Remove the view from the App element and clear the memory.
            this.replaceChildren()
            if (this.Currentˉview != undefined && this.Currentˉview.Dispose != undefined)
            {
                this.Currentˉview.Dispose()
            }
            this.Currentˉview = undefined

            // Display the new view            
            let Viewˉreference: View = new Viewˉconstructor() as View
            if (Viewˉreference != undefined)
            {
                let Viewˉcontent = Viewˉreference.Render()
                if (Array.isArray(Viewˉcontent))
                {
                    Viewˉcontent.forEach((Contentˉelement) =>
                    {
                        this.appendChild(Contentˉelement)
                    })
                }
                else if (Viewˉcontent != undefined)
                {
                    this.appendChild(Viewˉcontent)
                }

                this.Currentˉview = Viewˉreference
            }

            // Update the browser navigation history if needed.
            this.Updateˉurlˉandˉnavigationˉhistory(Viewˉconstructor, Parameters, Changeˉurl, Addˉtoˉhistory)
        }

        /**
         * Going back to the previous view requires us to reverse the last view navigation.
         * @param Eventˉref The navigation event.
         */
        private Handleˉnavigationˉbuttons(Eventˉref: PopStateEvent): void 
        {
            let Viewˉname = ''
            let Parameters: Map<string, string>

            if (Eventˉref.state != null)
            {
                Viewˉname = Eventˉref.state['View']
                Parameters = Eventˉref.state['Parameters']
            }
            else
            {
                let Queryˉstring = this.Parseˉqueryˉstring()
                Viewˉname = Queryˉstring[0]
                Parameters = Queryˉstring[1]
            }
            
            // Step 2: Change the view without affecting the state.
            let Viewˉconstructor = View.Allˉviews.get(Viewˉname)
            this.Changeˉview(Viewˉconstructor, Parameters, false, false)
        }

        private Updateˉurlˉandˉnavigationˉhistory(Viewˉconstructor: { new(): View }, Parameters: Map<string, string>,
            Changeˉurl: boolean, Addˉtoˉhistory: boolean): void 
        {
            let Viewˉname = View.Allˉviewsˉreverseˉlookup.get(Viewˉconstructor)

            let Newˉurl = ''
            if (Changeˉurl == true)
            {
                Newˉurl = window.location.pathname
                if (Viewˉname != '/')
                {
                    Newˉurl += '?View=' + Viewˉname
                }

                if (Parameters != undefined)
                {
                    if (Viewˉname == '')
                    {
                        Newˉurl += '?'
                    }
                    else
                    {
                        Newˉurl += '&'
                    }

                    Parameters.forEach((Value: string, Key: string) =>
                    {
                        Newˉurl += Key + '=' + Value + '&'
                    })

                    Newˉurl = Newˉurl.substring(0, Newˉurl.length - 1)
                }
            }

            if (Addˉtoˉhistory == true)
            {
                window.history.pushState({ 'View': Viewˉname, 'Parameters': Parameters }, '', Newˉurl)
            }
            else if (Addˉtoˉhistory == false && Changeˉurl == true)
            {
                window.history.replaceState({ 'View': Viewˉname, 'Parameters': Parameters }, '', Newˉurl)
            }
        }

        /**
         * Parses the existing view query string to View name and Parameters
         */
        public Parseˉqueryˉstring = (): [string, Map<string, string>] =>
        {
            let Viewˉname = ''
            let Parameters = new Map<string, string>()

            let Queryˉparameters = new URLSearchParams(location.search)
            Queryˉparameters.forEach((Value: string, Key: string) =>
            {
                if (Key == 'View')
                {
                    Viewˉname = Value
                }
                else
                {
                    Parameters.set(Key, Value)
                }
            })

            return [Viewˉname, Parameters]
        }
    }

    customElements.define('app-', Appˉelement)
}
