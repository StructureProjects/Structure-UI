// Structure UI | stru.ca | Copyright Neural Systems Inc

module Structureˉui
{
    /**
     * These are the items repeated in most Structure UI tag, example: <Panel Id="abc", Style="…" … />
     */
    export interface Uiˉattributes
    {
        [Index: string]: any;
        
        /** The html element id. */
        Id?: string

        /** The style of the html element. */
        Style?: Uiˉstyles

        /** The class name(s) of the html element. */
        Class?: string

        /** Disable the original style that comes with the component, this will allow you to style the component yourself */
        Disableˉoriginalˉstyle?: boolean

        Onˉnabort?: (ev: UIEvent) => any;
        Onˉanimationˉcancel?: (ev: AnimationEvent) => any
        Onˉanimationˉend?: (ev: AnimationEvent) => any
        Onˉanimationˉiteration?: (ev: AnimationEvent) => any
        Onˉanimationˉstart?: (ev: AnimationEvent) => any
        Onˉauxˉclick?: (ev: MouseEvent) => any
        Onˉblur?: (ev: FocusEvent) => any
        Onˉcancel?: (ev: Event) => any
        Onˉcanˉplay?: (ev: Event) => any
        Onˉcanˉplayˉthrough?: (ev: Event) => any
        Onˉchange?: (ev: Event) => any
        Onˉclick?: (ev: MouseEvent) => any
        Onˉclose?: (ev: Event) => any
        Onˉcontextˉmenu?: (ev: MouseEvent) => any
        Onˉcueˉchange?: (ev: Event) => any
        Onˉdblˉclick?: (ev: MouseEvent) => any
        Onˉdrag?: (ev: DragEvent) => any
        Onˉdragˉend?: (ev: DragEvent) => any
        Onˉdragˉenter?: (ev: DragEvent) => any
        Onˉdragˉexit?: (ev: Event) => any
        Onˉdragˉleave?: (ev: DragEvent) => any
        Onˉdragˉover?: (ev: DragEvent) => any
        Onˉdragˉstart?: (ev: DragEvent) => any
        Onˉdrop?: (ev: DragEvent) => any
        Onˉdurationˉchange?: (ev: Event) => any
        Onˉemptied?: (ev: Event) => any
        Onˉended?: (ev: Event) => any
        Onˉerror?: OnErrorEventHandler;
        Onˉfocus?: (ev: FocusEvent) => any
        Onˉgotˉpointerˉcapture?: (ev: PointerEvent) => any
        Onˉinput?: (ev: Event) => any
        Onˉinvalid?: (ev: Event) => any
        Onˉkeyˉdown?: (ev: KeyboardEvent) => any
        Onˉkeyˉpress?: (ev: KeyboardEvent) => any
        Onˉkeyˉup?: (ev: KeyboardEvent) => any
        Onˉload?: (ev: Event) => any
        Onˉloadedˉdata?: (ev: Event) => any
        Onˉloadedˉmetaˉdata?: (ev: Event) => any
        Onˉloadˉstart?: (ev: Event) => any
        Onˉlostˉpointerˉcapture?: (ev: PointerEvent) => any
        Onˉmouseˉdown?: (ev: MouseEvent) => any
        Onˉmouseˉenter?: (ev: MouseEvent) => any
        Onˉmouseˉleave?: (ev: MouseEvent) => any
        Onˉmouseˉmove?: (ev: MouseEvent) => any
        Onˉmouseˉout?: (ev: MouseEvent) => any
        Onˉmouseˉover?: (ev: MouseEvent) => any
        Onˉmouseˉup?: (ev: MouseEvent) => any
        Onˉpause?: (ev: Event) => any
        Onˉplay?: (ev: Event) => any
        Onˉplaying?: (ev: Event) => any
        Onˉpointerˉcancel?: (ev: PointerEvent) => any
        Onˉpointerˉdown?: (ev: PointerEvent) => any
        Onˉpointerˉenter?: (ev: PointerEvent) => any
        Onˉpointerˉleave?: (ev: PointerEvent) => any
        Onˉpointerˉmove?: (ev: PointerEvent) => any
        Onˉpointerˉout?: (ev: PointerEvent) => any
        Onˉpointerˉover?: (ev: PointerEvent) => any
        Onˉpointerˉup?: (ev: PointerEvent) => any
        Onˉprogress?: (ev: ProgressEvent) => any
        Onˉrateˉchange?: (ev: Event) => any
        Onˉreset?: (ev: Event) => any
        Onˉresize?: (ev: UIEvent) => any
        Onˉscroll?: (ev: Event) => any
        Onˉsecurityˉpolicyˉviolation?: (ev: SecurityPolicyViolationEvent) => any
        Onˉseeked?: ((ev: Event) => any) | null;
        Onˉseeking?: (ev: Event) => any
        Onˉselect?: (ev: Event) => any
        Onˉselectionˉchange?: (ev: Event) => any
        Onˉselectˉstart?: (ev: Event) => any
        Onˉstalled?: (ev: Event) => any
        Onˉsubmit?: (ev: Event) => any
        Onˉsuspend?: (ev: Event) => any
        Onˉtimeˉupdate?: (ev: Event) => any
        Onˉtoggle?: (ev: Event) => any
        Onˉtouchˉcancel?: (ev: TouchEvent) => any
        Onˉtouchˉend?: (ev: TouchEvent) => any
        Onˉtouchˉmove?: (ev: TouchEvent) => any
        Onˉtouchˉstart?: (ev: TouchEvent) => any
        Onˉtransitionˉcancel?: (ev: TransitionEvent) => any
        Onˉtransitionˉend?: (ev: TransitionEvent) => any
        Onˉtransitionˉrun?: (ev: TransitionEvent) => any
        Onˉtransitionˉstart?: (ev: TransitionEvent) => any
        Onˉvolumeˉchange?: (ev: Event) => any
        Onˉwaiting?: (ev: Event) => any
        Onˉwheel?: (ev: WheelEvent) => any
    } 
}