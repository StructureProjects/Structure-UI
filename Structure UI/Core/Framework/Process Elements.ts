// Structure UI | stru.ca | Copyright Neural Systems Inc

namespace Structureˉui
{
    export function Processˉuiˉelement(Uiˉelement: any, Attributes: Uiˉattributes, ...Children: any[]): HTMLElement 
    {        
        let Newˉelement = new Uiˉelement()
        Newˉelement.Execute(Attributes, Children)
        return Newˉelement
    }

    export class Processˉuiˉfragment extends DocumentFragment
    {
        public Execute(Attributes: Uiˉattributes, Children: any[]): void 
        {            
            Uiˉelement.Appendˉchildren(this, Children)            
        }
    }
}

const _UI: any = Structureˉui.Processˉuiˉelement
const _UI_Fragment: any = Structureˉui.Processˉuiˉfragment