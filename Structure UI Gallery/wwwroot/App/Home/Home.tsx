// Structure UI Demo | stru.ca | Copyright Neural Systems Inc

module Structureˉui.Gallery
{    export class Homeˉview implements Structureˉui.View
    {
        Render(): HTMLElement
        {
            return <>
                <Panel Style={{ Display: 'block' }}>Nothing yet</Panel>                
                <Break />
                <Break />
                Just testing
            </>
        }
    }

    // The simplest way to preserve the name of the start view
    (globalThis as any)['__Start_'] = Homeˉview
}
