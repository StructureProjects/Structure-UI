// Structure UI | stru.ca | Copyright Neural Systems Inc

namespace Structureˉui
{
    export interface Pictureˉattributes extends Uiˉattributes
    {
        Source: string
    }

    export class Picture extends Uiˉelement<Pictureˉattributes>
    {
        static readonly Tagˉname = 'i-'

        public override Execute (Attributes: Pictureˉattributes, Children: any[]): void 
        {
            let Newˉpicture = document.createElement('img')
            if (Attributes.Source != undefined)
            {
                Newˉpicture.setAttribute('src', Attributes.Source)
                delete Attributes.Source
            }

            this.appendChild(Newˉpicture)
            Uiˉelement.Convertˉattributes(Newˉpicture, Attributes)
        }
    }

    customElements.define(Picture.Tagˉname, Picture)
}

const Picture = Structureˉui.Picture
