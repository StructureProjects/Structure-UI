// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    /**
     * A view is a chunk of UI markup and code, imagine it as the JSX equivalent of 
     * an html page or part of an html page.     
     */
    export abstract class View
    {
        /** 
         * The JSX markup and code.
         */
        abstract Render(): HTMLElement | HTMLElement[]

        /**
         * Optional, implement when needed to clean event handlers, memory, etc.
         */
        abstract Dispose?(): void

        /** A list of views in the app, (view name, view constructor). */
        static Allˉviews = new Map<string, { new(): View }>()
        static Allˉviewsˉreverseˉlookup = new Map<{ new(): View }, string>()

        static Registerˉview(Viewˉname: string, Viewˉconstructor: { new(): View }): void
        {
            View.Allˉviews.set(Viewˉname, Viewˉconstructor)
            View.Allˉviewsˉreverseˉlookup.set(Viewˉconstructor, Viewˉname)
        }
    }
}

const View = Structureˉui.View