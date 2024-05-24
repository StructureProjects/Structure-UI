// Structure UI | stru.ca | Copyright Neural Systems Inc

namespace Structureˉui
{
    export interface Panelˉattributes extends Uiˉattributes
    {
    }

    export class Panel extends Uiˉelement<Panelˉattributes>
    {
        static readonly Tagˉname = 'p-'

        public override Execute(Attributes: Panelˉattributes, Children: any[]): void 
        {            
            Uiˉelement.Appendˉchildren(this, Children)
            Uiˉelement.Convertˉattributes(this, Attributes)
        }
    }

    customElements.define(Panel.Tagˉname, Panel)
}

const Panel = Structureˉui.Panel
