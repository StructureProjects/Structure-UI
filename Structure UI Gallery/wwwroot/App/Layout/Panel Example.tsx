// Structure UI Gallery | stru.ca | Copyright Neural Systems Inc

module Structureˉui.Gallery
{
    export class Panelˉexample 
    {
        static Render(): HTMLElement
        {
            return <Panel>
                <Part Style={{ Display: 'block' }}>Panel</Part>
                <Break />
                <Break />
                Example goes here
            </Panel>
        }
    }
}
