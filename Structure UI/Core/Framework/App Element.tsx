// Structure UI | stru.ca | Copyright Neural Systems Inc

namespace Structureˉui
{
    export const Appˉreadyˉeventˉname = 'AppReady'
    export interface Appˉreadyˉeventˉdetail
    {
        Viewˉname: string;
    }


    /**
     * <app- />
     * This is the root element for any app or website created with Structure UI. 
     * It extends across the entire HTML page and displays Views made with Structure UI.
     * It is automatically added to the HTML page.
     */
    export class Appˉelement extends HTMLElement
    {
        Currentˉview?: View

        /**
         * Locate the default (/) view from the view registry and display it.
         * If a query string is present, display the view specified in the query string instead.
         * Once the app is loaded and the view is displayed, trigger a ready event.
         */
        Start = (): void =>
        {
            let Viewˉname = undefined
            if (window.location.search)
            {
                const params = new URLSearchParams(window.location.search)
                Viewˉname = params.get('View')
            }

            if (Viewˉname == undefined)
            {
                Viewˉname = '/'
            }

            let Viewˉconstructor = View.Allˉviews.get(Viewˉname)
            this.Changeˉview(Viewˉconstructor, undefined, false, false)

            window.addEventListener('popstate', this.Handleˉnavigationˉbuttons)

            let Newˉappˉreadyˉevent = new CustomEvent<Appˉreadyˉeventˉdetail>(Appˉreadyˉeventˉname,
                {
                    detail: { Viewˉname: Viewˉname }
                });
            this.dispatchEvent(Newˉappˉreadyˉevent);
        }

        /**
         * Change the current view.
         * @param Viewˉconstructor The view type.
         * @param Parameters Additional info you want to pass to the view
         * @param Changeˉurl Do you want to change the browser url?
         * @param Addˉtoˉhistory Do you want to record this change so you can go back to it with the back button.
         * @returns
         */
        Changeˉview = (Viewˉconstructor: { new(): View }, Parameters?: Map<string, string>, Changeˉurl: boolean = true,
            Addˉtoˉhistory: boolean = true): void =>
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
        private Handleˉnavigationˉbuttons = (Eventˉref: PopStateEvent): void =>
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

        private Updateˉurlˉandˉnavigationˉhistory = (Viewˉconstructor: { new(): View }, Parameters: Map<string, string>,
            Changeˉurl: boolean, Addˉtoˉhistory: boolean): void =>
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
