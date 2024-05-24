// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    export namespace Styles
    {
        /**
         * The 3 shared css properties that can be used with all elements
         */
        export const enum Shared
        {
            /**
             * The inherit CSS keyword causes the element for which it is specified to take the computed value of the property from its parent element. 
             * It can be applied to any CSS property, including the CSS shorthand all.
             */
            Inherit = 'inherit',

            /** 
             * The initial value of a CSS property is its default value, as listed in its definition table in the specification. 
             * The usage of the initial value depends on whether a property is inherited or not:
             *    For inherited properties, the initial value is used on the root element only, as long as no specified value is supplied.
             *    For non-inherited properties, the initial value is used on all elements, as long as no specified value is supplied. 
             */
            Initial = 'initial',

            /**
             * The unset CSS keyword resets a property to its inherited value if the property naturally inherits from its parent, 
             * and to its initial value if not. In other words, it behaves like the inherit keyword in the first case, when the 
             * property is an inherited property, and like the initial keyword in the second case, when the property is a non-inherited property.
             */
            Unset = 'unset'
        }

        /**
         * The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.
         */
        export const enum Positions
        {
            /** 
             * The element is removed from the normal document flow, and no space is created for the element in the page layout. 
             * It is positioned relative to its closest positioned ancestor, if any; otherwise, it is placed relative to the initial containing block. 
             * Its final position is determined by the values of top, right, bottom, and left.
             * 
             * This value creates a new stacking context when the value of z-index is not auto. The margins of absolutely positioned boxes do not
             * collapse with other margins. 
             */
            Absolute = 'absolute',

            /**
             * The element is removed from the normal document flow, and no space is created for the element in the page layout. 
             * It is positioned relative to the initial containing block established by the viewport, 
             * except when one of its ancestors has a transform, perspective, or filter property set to something other than none (see the CSS Transforms Spec), 
             * in which case that ancestor behaves as the containing block. (Note that there are browser inconsistencies with perspective and 
             * filter contributing to containing block formation.) Its final position is determined by the values of top, right, bottom, and left.
             * 
             * This value always creates a new stacking context. In printed documents, the element is placed in the same position on every page.
             */
            Fixed = 'fixed',

            /** The element is positioned according to the normal flow of the document, and then offset relative to itself based on the values of top, 
             * right, bottom, and left. The offset does not affect the position of any other elements; thus, the space given for the element in the page 
             * layout is the same as if position were static.
             * 
             * This value creates a new stacking context when the value of z-index is not auto. Its effect on table-*-group, table-row, table-column, 
             * table-cell, and table-caption elements is undefined. 
             */
            Relative = 'relative',

            /** 
             * The element is positioned according to the normal flow of the document. The top, right, bottom, left, and z-index properties have no effect. 
             * This is the default value. 
             */
            Static = 'static',

            /**
             * The element is positioned according to the normal flow of the document, and then offset relative to its nearest scrolling ancestor and 
             * containing block (nearest block-level ancestor), including table-related elements, based on the values of top, right, bottom, and left. 
             * The offset does not affect the position of any other elements.
             * 
             * This value always creates a new stacking context. Note that a sticky element "sticks" to its nearest ancestor that has a 
             * "scrolling mechanism" (created when overflow is hidden, scroll, auto, or overlay), even if that ancestor isn't the nearest actually 
             * scrolling ancestor. This effectively inhibits any "sticky" behavior
             */
            Sticky = 'sticky',
        }

        export const enum Display
        {
            /** Displays an element as an inline element (like <span>). Any height and width properties will have no effect */
            Inline = 'inline',

            /** Displays an element as a block element (like <p>). It starts on a new line, and takes up the whole width */
            Block = 'block',

            /** Makes the container disappear, making the child elements children of the element the next level up in the DOM */
            Contents = 'contents',

            /** Displays an element as a block-level flex container */
            Flex = 'flex',

            /** Displays an element as a block-level grid container */
            Grid = 'grid',

            /** Displays an element as an inline-level block container. The element itself is formatted as an inline element, but you can apply height and width values */
            Inlineˉblock = 'inline-block',

            /** Displays an element as an inline-level flex container */
            inlineˉflex = 'inline-flex',

            /** Displays an element as an inline-level grid container */
            inlineˉgrid = 'inline-grid',

            /** The element is displayed as an inline-level table */
            inlineˉtable = 'inline-table',

            /** Let the element behave like a <li> element */
            listˉitem = 'list-item',

            /** Displays an element as either block or inline, depending on context */
            Runˉin = 'run-in',

            /** Let the element behave like a <table> element */
            Table = 'table',

            /** Let the element behave like a <caption> element */
            Tableˉcaption = 'table-caption',

            /** Let the element behave like a <colgroup> element */
            Tableˉcolumnˉgroup = 'table-column-group',

            /** Let the element behave like a <thead> element */
            Tableˉheaderˉgroup = 'table-header-group',

            /** Let the element behave like a <tfoot> element */
            Tableˉfooterˉgroup = 'table-footer-group',

            /** Let the element behave like a <tbody> element */
            Tableˉrowˉgroup = 'table-row-group',

            /** Let the element behave like a <td> element */
            Tableˉcell = 'table-cell',

            /** Let the element behave like a <col> element */
            Tableˉcolumn = 'table-column',

            /** Let the element behave like a <tr> element */
            Tableˉrow = 'table-row',

            /** The element is completely removed. */
            None = 'none',

            /** Sets this property to its default value. */
            Initial = 'initial',

            /** Inherits this property from its parent element. */
            Inherit = 'inherit'
        }

        export const enum Userˉselects
        {
            All = 'all',
            Element = 'element',
            Elements = 'elements',
            Inherit = 'inherit',
            Initial = 'initial',
            None = 'none',
            Text = 'text',
            Toggle = 'toggle',
            Unset = 'unset'
        }

        export const enum Touchˉactions
        {
            Auto = 'auto',
            Crossˉslideˉx = 'cross-slide-x',
            Crossˉslideˉy = 'cross-slide-y',
            Doubleˉtapˉzoom = 'double-tap-zoom',
            Inherit = 'inherit',
            Initial = 'initial',
            Manipulation = 'manipulation',
            None = 'none',
            Panˉx = 'pan-x',
            Panˉy = 'pan-y',
            Pinchˉzoom = 'pinch-zoom',
            Unset = 'unset'
        }

        export const enum Backgroundˉrepeats
        {
            Inherit = 'inherit',
            Initial = 'initial',
            Noˉrepeat = 'no-repeat',
            Repeat = 'repeat',
            Repeatˉx = 'repeat-x',
            Repeatˉy = 'repeat-y',
            Round = 'round',
            Space = 'space',
            Unset = 'unset'
        }

        export const enum Backgroundˉsizes
        {
            Auto = 'auto',
            Contain = 'contain',
            Cover = 'cover',
            Inherit = 'inherit',
            Initial = 'initial',
            Unset = 'unset'
        }

        export const enum Backgroundˉpositions
        {
            Bottom = 'bottom',
            Center = 'center',
            Inherit = 'inherit',
            Initial = 'initial',
            Left = 'left',
            Right = 'right',
            Top = 'top',
            Unset = 'unset'
        }

        export const enum Fontˉstyles
        {
            Inherit = 'inherit',
            Initial = 'initial',
            Italic = 'italic',
            Normal = 'normal',
            Oblique = 'oblique',
            Unset = 'unset'
        }

        export const enum Whiteˉspaces
        {
            Inherit = 'inherit',
            Initial = 'initial',
            Normal = 'normal',
            Nowrap = 'nowrap',
            Pre = 'pre',
            Preˉline = 'pre-line',
            Preˉwrap = 'pre-wrap',
            Unset = 'unset'
        }

        export const enum Textˉaligns
        {
            Center = 'center',
            End = 'end',
            Inherit = 'inherit',
            Initial = 'initial',
            Justify = 'justify',
            Left = 'left',
            Matchˉparent = 'match-parent',
            Right = 'right',
            Start = 'start',
            Unset = 'unset'
        }

        export const enum Mixˉblendˉmodes
        {
            /* Keyword values */
            Normal = 'normal',
            Multiply = 'multiply',
            Screen = 'screen',
            Overlay = 'overlay',
            Darken = 'darken',
            lighten = 'lighten',
            Colorˉdodge = 'color-dodge',
            Colorˉburn = 'color-burn',
            Hardˉlight = 'hard-light',
            Softˉlight = 'soft-light',
            Difference = 'difference',
            Exclusion = 'exclusion',
            Hue = 'hue',
            Saturation = 'saturation',
            Color = 'color',
            Luminosity = 'luminosity',

            /* Global values */
            Inherit = 'inherit',
            Initial = 'initial',
            Revert = 'revert',
            Revertˉlayer = 'revert-layer',
            Unset = 'unset'
        }
    }
}