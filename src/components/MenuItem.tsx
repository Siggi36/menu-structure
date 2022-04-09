import React from 'react'

// Interface for the definition of the props that this component receives 
interface Props {
    name: string,
    parent: string,
    premium: boolean,
    custom: boolean,
    active: boolean,
    quad: boolean,
    basepw: boolean,
    masterpw: boolean,
    children: boolean,
    key: string,
    exposedKey: string,
    text: string,
    onSelectMenuItem: (key: string) => void,
}

// HTML and CSS. Box that displays the menuItem data
const MenuItem: React.FC<Props> = ({ active, basepw, custom, key, masterpw, exposedKey, name, onSelectMenuItem, parent, premium, quad, text, children }) => {

    return (
        <div className="border-2 rounded-lg border-tailwind-blue m-2 text-center bg-tailwind-blue text-tailwind-text">
            <div className="p-2" >
                <div className={children ? "cursor-pointer" : ""} onClick={() => onSelectMenuItem(exposedKey)}>
                    <span className='font-bold'>{name}</span>
                    <hr className='mb-2' />
                    <div>
                        <span className='font-medium'> Vorheriger Menu Id:</span> {parent}
                    </div>
                    <div>
                        <span className='font-medium'> Aktuelle Menu Id:</span> {exposedKey}
                    </div>
                    <hr className='mb-2' />
                    <div>
                        <span className='font-medium'>Eigenschaften:</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <label className='font-medium'> Premium: </label>
                            <input type="checkbox" disabled checked={premium}></input>

                        </div>
                        <div>
                            <label className='font-medium'> Custom: </label>
                            <input type="checkbox" disabled checked={custom}></input>

                        </div>
                        <div>
                            <label className='font-medium'> Active: </label>
                            <input type="checkbox" disabled checked={active}></input>

                        </div>
                        <div>
                            <label className='font-medium'> Quad: </label>
                            <input type="checkbox" disabled checked={quad}></input>

                        </div>
                        <div>
                            <label className='font-medium'> Basepw: </label>
                            <input type="checkbox" disabled checked={basepw}></input>

                        </div>
                        <div>
                            <label className='font-medium'> Masterpw: </label>
                            <input type="checkbox" disabled checked={masterpw}></input>
                        </div>
                    </div>
                    <hr className='mb-2' />
                    {
                        children ? <div>Weitere Menüpunkte verfügbar</div> : <div></div>
                    }
                </div>
                <div>
                    <span className='font-medium'>Text: </span> <a className='underline' href={text}>https://www.rk-rose-krieger.com</a>
                </div>
            </div>
        </div >
    )
}

export default MenuItem