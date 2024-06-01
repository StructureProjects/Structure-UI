// Structure UI Gallery | stru.ca | Copyright Neural Systems Inc

module Structureˉui.Gallery
{
    export class Homeˉview implements Structureˉui.View
    {
        Render(): HTMLElement
        {
            return <Panel /* The panel that holds all the content. */
                Style={{ Position: 'absolute', Top: '0', Left: '0', Bottom: '0', Right: '0' }} >
                
                <Panel /* The panel on the left that holds the list of elements. */
                    Style={{
                    Position: 'absolute', Left: '0', Top: '0', Bottom: '0', Width: '200px', Backgroundˉcolor: 'red'
                    }}>
                    Nothing yet
                </Panel>

                <Panel /* The panel that displayed the content in the center of the app. */
                    Style={{
                        Position: 'absolute', Left: '200px', Top: '0', Bottom: '0', Right: '0' , Backgroundˉcolor: 'blue'
                    }}>
                    {Panelˉexample.Render()}
                </Panel>                                
            </Panel>
        }
    }

    // The simplest way to preserve the name of the start view
    (globalThis as any)['__Start_'] = Homeˉview
}
