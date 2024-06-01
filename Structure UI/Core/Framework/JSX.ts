// Structure UI | stru.ca | Copyright Neural Systems Inc

declare namespace JSX
{
    export interface IntrinsicElements
    {
        Break: Structureˉui.Break
        Panel: Structureˉui.Panel
        Part: Structureˉui.Part     
    }

    /**
     * The base element for JSX, usually empty, required only by the Visual Studio compiler.
     */
    export type Element = any

    /** 
     * Notifies the Visual Studio compiler with the name of the object that contains the Attributes.
     */
    export interface ElementAttributesProperty 
    {
        Attributes: any // Specify the property name to use
    }

    /**
     * Every component must have a construct method
     */
    export interface ElementClass
    {
        Execute(Attributes: any, Children: any[]): void
    }
}