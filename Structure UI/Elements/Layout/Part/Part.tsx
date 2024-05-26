// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    export interface Partˉattributes extends Uiˉattributes
    {
    }

    export class Part extends Uiˉelement<Partˉattributes>
    {      
        static readonly Tagˉname = 'o-'

        public override Execute (Attributes: Partˉattributes, Children: any[]): void 
        {
            Uiˉelement.Appendˉchildren(this, Children)
            Uiˉelement.Convertˉattributes(this, Attributes)
        }
    }

    customElements.define(Part.Tagˉname, Part)
}

const Part = Structureˉui.Part