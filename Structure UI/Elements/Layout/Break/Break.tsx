// Structure UI : Copyright Neural Systems Inc.

namespace Structureˉui
{
    export interface Breakˉattributes extends Uiˉattributes
    {
    }

    export class Break extends Uiˉelement<Breakˉattributes>
    {
        static readonly Tagˉname = 'br-x'

        public override Execute(Attributes: Breakˉattributes, Children: any[]): void 
        {
            let Brˉelement = document.createElement('br')
            this.appendChild(Brˉelement)
        }
    }

    customElements.define(Break.Tagˉname, Break)
}

const Break = Structureˉui.Break
