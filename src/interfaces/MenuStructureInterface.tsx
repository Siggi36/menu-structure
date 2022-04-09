interface MenuStructureInterface {
    name: string,
    parent: string,
    premium: boolean,
    custom: boolean,
    active: boolean,
    quad: boolean,
    basepw: boolean,
    masterpw: boolean,
    children: MenuStructureInterface[] | string,
    key: string,
    text: string
}

export default MenuStructureInterface;