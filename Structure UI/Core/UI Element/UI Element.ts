// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    /**
    * The base class for all Structure UI Elements.
    */
    export abstract class Uiˉelement<Attributesˉtype> extends HTMLElement
    {
        public Attributes?: Attributesˉtype

        /**
         * Called to convert the UI Element to html element, it is up to the developer to decide how to render the component.
         * @param Attributes - The attributes of that element.
         * @param Children - The children of that element.
         * @returns - Returns the html element after the conversion, or nothing in some cases, up to you.
         */
        public abstract Execute(Attributes: Uiˉattributes, Children: any[]): void


        public static Convertˉattributes(Parentˉhtmlˉelement: HTMLElement, Attributes: Uiˉattributes): void
        {
            if (Attributes != null)
            {
                for (let Attributeˉname in Attributes)
                {
                    Uiˉelement.Convertˉattribute(Parentˉhtmlˉelement, Attributeˉname, Attributes)
                }
            }
        }

        public static Convertˉattribute(Parentˉhtmlˉelement: HTMLElement, Attributeˉname: string, Attributes: Uiˉattributes): void 
        {
            let Htmlˉattributeˉname = (Uiˉattributesˉmap as any)[Attributeˉname]
            let Attributeˉvalue = (Attributes as any)[Attributeˉname]

            if (Htmlˉattributeˉname == 'style')
            {
                Uiˉelement.Setˉstyle(Attributes.Style, Parentˉhtmlˉelement)
            }
            else if (Htmlˉattributeˉname != undefined)
            {
                if (Attributeˉvalue instanceof Function)
                {
                    (Parentˉhtmlˉelement as any)[Htmlˉattributeˉname] = Attributeˉvalue
                }
                else
                {
                    Parentˉhtmlˉelement.setAttribute(Htmlˉattributeˉname, Attributeˉvalue)
                }
            }
        }

        public static Setˉstyle = (Styleˉattributes: Uiˉstyles, Targetˉhtmlˉelement: HTMLElement): void =>
        {
            for (let Styleˉname in Styleˉattributes)
            {
                let Htmlˉstyleˉname = Uiˉstylesˉmapˉindex[Styleˉname]
                let Styleˉvalue = (Styleˉattributes as any)[Styleˉname];
                (Targetˉhtmlˉelement.style as any)[Htmlˉstyleˉname] = Styleˉvalue
            }
        }

        /**
         * Append the child elements
         * @param Parentˉelement - Append the child elements to this parent element.
         * @param Children - The child elements
         */
        public static Appendˉchildren = (Parentˉelement: Node, Children: any[]): void =>
        {
            for (let Index: number = 0; Index < Children.length; Index++)
            {
                let Childˉelement = Children[Index]
                if (typeof (Childˉelement) === 'string' || typeof (Childˉelement) === 'number')
                {
                    let Textˉfragment = document.createDocumentFragment()
                    Textˉfragment.textContent = Childˉelement.toString()
                    Parentˉelement.appendChild(Textˉfragment)
                }
                else if (Childˉelement instanceof HTMLElement)
                {
                    Parentˉelement.appendChild(Childˉelement)
                }
                else if (typeof Childˉelement === "function")
                {
                    let Results = Childˉelement()
                    if (Results instanceof HTMLElement)
                    {
                        Parentˉelement.appendChild(Results)
                    }
                }
                else if (Childˉelement != undefined)
                {
                    let Asyncˉelement = Childˉelement as Promise<any>
                    Asyncˉelement.then(Childˉelement => Uiˉelement.Asyncˉelementˉrender(Parentˉelement, Childˉelement))
                }
            }
        }

        private static Asyncˉelementˉrender = (Parentˉelement: Node, Childˉelement: HTMLElement) =>
        {
            Parentˉelement.appendChild(Childˉelement)
        }
    }
}