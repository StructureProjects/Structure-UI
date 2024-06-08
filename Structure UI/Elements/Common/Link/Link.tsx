// Structure UI | stru.ca | Copyright Neural Systems Inc

namespace Structureˉui
{
    export interface Linkˉattributes extends Uiˉattributes
    {
        // The code to run when the url is clicked, will receive a standard click event         
        Action?: (Clickˉevent: MouseEvent) => void

        // Disable the url, still visible, but not clickable.
        Disabled?: boolean

        // Is it currently selected, if yes, you can render it in different colors if needed.
        Selected?: boolean
    }

    export class Link extends Uiˉelement<Linkˉattributes>
    {
        static readonly Tagˉname = 'l-'

        Action?: (Clickˉevent: MouseEvent) => void

        get Disabled(): boolean
        {
            if (this.getAttribute('d') != undefined)
            {
                return true
            }
            else
            {
                return false
            }
        }
        set Disabled(value: boolean)
        {
            if (value !== false && value != undefined)
            {
                this.setAttribute('d', '')
            }
            else
            {
                this.removeAttribute('d')
            }
        }

        get Selected(): boolean
        {
            if (this.getAttribute('s') != undefined)
            {
                return true
            }
            else
            {
                return false
            }
        }
        set Selected(value: boolean)
        {
            if (value !== false && value != undefined)
            {
                this.setAttribute('s', '')
            }
            else
            {
                this.removeAttribute('s')
            }
        }

        override Execute(Attributes: Linkˉattributes, Children: any[]): void
        {
            Uiˉelement.Appendˉchildren(this, Children)
            Uiˉelement.Convertˉattributes(this, Attributes)

            if (Attributes != undefined)
            {
                this.Action = Attributes.Action
                delete Attributes.Action
                
                this.Selected = Attributes.Selected
                delete Attributes.Selected

                this.Disabled = Attributes.Disabled
                delete Attributes.Disabled
            }
        }

        connectedCallback()
        {
            this.addEventListener('click', this.Onˉclick)
        }

        disconnectedCallback()
        {
            this.removeEventListener('click', this.Onˉclick)
        }

        Onˉclick = (Clickˉevent: MouseEvent): void =>
        {
            if (this.Action != undefined && this.Disabled != true)
            {
                this.Action(Clickˉevent)
            }
        }
    }

    customElements.define(Link.Tagˉname, Link)
}

const Link = Structureˉui.Link
