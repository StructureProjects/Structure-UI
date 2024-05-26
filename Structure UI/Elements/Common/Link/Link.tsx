// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    export interface Linkˉattributes extends Uiˉattributes
    {
        Url?: string
        Action?: (Clickˉevent: MouseEvent) => void
        Newˉtab?: boolean
    }

    export class Link extends Uiˉelement<Linkˉattributes>
    {
        static readonly Tagˉname = 'l-'

        Url?: string
        Newˉtab?: boolean
        Action?: (Clickˉevent: MouseEvent) => void

        public override Execute(Attributes: Linkˉattributes, Children: any[]): void 
        {
            Uiˉelement.Appendˉchildren(this, Children)
            Uiˉelement.Convertˉattributes(this, Attributes)

            if (Attributes.Action != undefined || Attributes.Url != undefined)
            {
                this.addEventListener('click', this.Onˉclick)

                this.Action = Attributes.Action
                delete Attributes.Action

                this.Url = Attributes.Url
                delete Attributes.Url
            }

            this.Newˉtab = Attributes.Newˉtab
            delete Attributes.Newˉtab
        }

        Onˉclick = (Clickˉevent: MouseEvent): void =>
        {
            if (this.Action != undefined)
            {
                this.Action(Clickˉevent)
            }
            else if (this.Newˉtab == true)
            {
                window.open(this.Url, '_blank', 'noreferrer');
            }
            else
            {
                location.href = this.Url
            }
        }
    }

    customElements.define(Link.Tagˉname, Link)
}

const Link = Structureˉui.Link
