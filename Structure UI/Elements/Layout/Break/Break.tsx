// Structure UI : Copyright Neural Systems Inc.

namespace Structureˉui
{
    export interface Breakˉattributes extends Uiˉattributes
    {
    }

    export class Break extends Uiˉelement<Breakˉattributes>
    {
        static readonly Tagˉname = 'xx-'

        public override Execute (Attributes: Breakˉattributes, Children: any[]): void 
        {
            Uiˉelement.Convertˉattributes(this, Attributes)
        }
    }

    customElements.define(Break.Tagˉname, Break)
}

const Break = Structureˉui.Break
