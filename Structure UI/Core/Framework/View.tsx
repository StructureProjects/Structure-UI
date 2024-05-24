// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    /**
     * A view is a chunk of UI markup and code, imagine it as the JSX equivalent of 
     * an html page or part of an html page.     
     */
    export interface View
    {
        /** 
         * The JSX markup and code.
         */
        Render(): HTMLElement | HTMLElement[]
    }
}
