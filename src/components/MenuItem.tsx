import React from 'react'

interface Props {
    name: string,
    parent: string,
    premium: boolean,
    custom: boolean,
    active: boolean,
    quad: boolean,
    basepw: boolean,
    masterpw: boolean,
    children?: [{}],
    key: string,
    exposedKey: string,
    text: string,
    onSelectMenuItem: (key: string) => void,
}

const MenuItem: React.FC<Props> = ({ active, basepw, custom, key, masterpw, exposedKey, name, onSelectMenuItem, parent, premium, quad, text, children }) => {

    return (
        <div>
            <div className='border-2 m-2 text-center' onClick={() => onSelectMenuItem(exposedKey)}>
                <span className='font-semibold'>{name}</span>
                <p>
                    Parent: {parent}
                </p>
                <div className="grid grid-cols-3">
                    <p>
                        <label>
                            Premium:
                            <input type="checkbox" disabled checked={premium}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Custom:
                            <input type="checkbox" disabled checked={custom}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Active:
                            <input type="checkbox" disabled checked={active}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Quad:
                            <input type="checkbox" disabled checked={quad}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Basepw:
                            <input type="checkbox" disabled checked={basepw}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Masterpw:
                            <input type="checkbox" disabled checked={masterpw}></input>
                        </label>
                    </p>
                </div>

                <p>
                    Children: {children}
                </p>
                <p>
                    Key: {exposedKey}
                </p>
                <p>
                    <a href={text}>Text: Link</a>

                </p>
            </div>
        </div>
    )
}

export default MenuItem