// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    /**
     * All the styles used by the UI Element -> Styles attribute.
     * Notes:
     *  - Update this list as needed.
     *  - It will be nice to have most of the styles here.
     */
    export interface Uiˉstyles
    {
        // Location
        Position?: Styles.Positions | string
        Top?: string
        Bottom?: string
        Left?: string
        Right?: string
        Width?: string
        Maxˉwidth?: string
        Height?: string
        Maxˉheight?: string
        Zˉindex?: string
        Transform?: string
        Transformˉorigin?: string
        Transformˉbox?: string
        Transformˉstyle?: string
        Translate?: string
        Backfaceˉvisibility?: string

        Margin?: string
        Marginˉbottom?: string
        Marginˉleft?: string
        Marginˉright?: string
        Marginˉtop?: string
        Padding?: string
        Paddingˉbottom?: string
        Paddingˉleft?: string
        Paddingˉright?: string
        Paddingˉtop?: string

        // Selections
        Userˉselect?: Styles.Userˉselects | string
        Touchˉaction?: Styles.Touchˉactions | string

        // Backgrounds
        Opacity?: string
        Color?: string
        Background?: string
        Backgroundˉimage?: string
        Backgroundˉrepeat?: Styles.Backgroundˉrepeats | string
        Backgroundˉsize?: Styles.Backgroundˉsizes | string
        Backgroundˉposition?: Styles.Backgroundˉpositions | string
        Backgroundˉpositionˉx?: Styles.Backgroundˉpositions | string
        Backgroundˉpositionˉy?: Styles.Backgroundˉpositions | string
        Backgroundˉcolor?: string
        Colorˉadjust?: string
        Mixˉblendˉmode?: Styles.Mixˉblendˉmodes | string

        // Fonts
        Font?: string
        Fontˉsize?: string
        Fontˉfamily?: string
        Fontˉweight?: string
        Fontˉstyle?: Styles.Fontˉstyles | string
        Fontˉstretch?: string
        Whiteˉspace?: Styles.Whiteˉspaces | string
        Textˉalign?: Styles.Textˉaligns | string
        Textˉtransform?: string
        Letterˉspacing?: string
        Direction?: string
        Lineˉheight?: string

        // Display
        Cursor?: string
        Display?: string
        Flexˉdirection?: string
        Flexˉwrap?: string
        Flexˉflow?: string
        Justifyˉcontent?: string
        Alignˉitems?: string
        Alignˉcontent?: string
        Order?: string
        Flexˉgrow?: string
        Flexˉshrink?: string
        Flexˉbasis?: string
        Flex?: string
        Alignˉself?: string
        Breakˉafter?: string
        Pageˉbreakˉafter?: string

        // Border        
        Border?: string
        Borderˉcollapse?: string
        Borderˉradius?: string
        Borderˉcolor?: string
        Borderˉimage?: string
        Borderˉimageˉoutset?: string
        Borderˉimageˉrepeat?: string
        Borderˉimageˉslice?: string
        Borderˉimageˉsource?: string
        Borderˉimageˉwidth?: string
        Borderˉbottom?: string
        Borderˉbottomˉcolor?: string
        Borderˉbottomˉleftˉradius?: string
        Borderˉbottomˉrightˉradius?: string
        Borderˉbottomˉstyle?: string
        Borderˉbottomˉwidth?: string
        Borderˉleft?: string
        Borderˉleftˉcolor?: string
        Borderˉleftˉstyle?: string
        Borderˉleftˉwidth?: string
        Borderˉright?: string
        Borderˉrightˉcolor?: string
        Borderˉrightˉstyle?: string
        Borderˉrightˉwidth?: string
        Borderˉspacing?: string
        Borderˉstyle?: string
        Borderˉtop?: string
        Borderˉtopˉleftˉradius?: string
        Borderˉtopˉrightˉradius?: string
        Borderˉtopˉstyle?: string
        Borderˉtopˉwidth?: string
        Borderˉtopˉcolor?: string
        Borderˉwidth?: string
        Boxˉsizing?: string
        Boxˉshadow?: string

        // Scroll
        Overflow?: string

        Filter?: string
    }
}