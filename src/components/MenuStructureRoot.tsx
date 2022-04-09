import React, { useState, useEffect } from 'react'
import MenuItem from "./MenuItem";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Axios from "axios";
import MenuStructureData from "../menu.json"
import MenuStructureInterface from '../interfaces/MenuStructureInterface';

const MenuStructureRoot: React.FC = () => {

    const [displayedItems, setDisplayedItems] = useState<MenuStructureInterface[]>(MenuStructureData.children);
    // Bad solution since the depth is not dynamic. Could be if the maximum number of generations could be determined programmatically. 
    const [depthCount, setDepthCount] = useState<number>(1);
    const [displayedItemsHistory1, setDisplayedItemsHistory1] = useState<MenuStructureInterface[]>([]);
    const [displayedItemsHistory2, setDisplayedItemsHistory2] = useState<MenuStructureInterface[]>([]);
    const [displayedItemsHistory3, setDisplayedItemsHistory3] = useState<MenuStructureInterface[]>([]);
    const [displayedItemsHistory4, setDisplayedItemsHistory4] = useState<MenuStructureInterface[]>([]);

    // Not used because of CORS Error, importing Data manually via menu.json file.
    useEffect(() => {
        /* Axios.get("https://durchbiegung.rk-rose-krieger.com/HS.json")
            .then((response => {
                console.log(response.data)

            })); */
    }, []);

    // Function for handling clicks on a MenuItem
    const onSelectMenuItem = (clickedKey: string) => {
        // Get each currently displayed item and check the keys to find out what item was clicked
        displayedItems?.forEach((currentLvlMenuObj) => {
            if (currentLvlMenuObj.key === clickedKey) {
                // If the clicked item has children, cast them since they can be a string object
                if (currentLvlMenuObj.children.length > 0) {
                    let childrenOfClickedMenuObj: MenuStructureInterface[] = currentLvlMenuObj.children as MenuStructureInterface[]
                    // Set the currently still displayed items as history
                    setHistory(depthCount, displayedItems);
                    // Incease depth counter
                    setDepthCount(depthCount + 1)
                    // Set displayedItems to the casted children of the clicked item
                    setDisplayedItems(childrenOfClickedMenuObj);
                }
            }
        })
    }

    // Saves the previous depth items in a history variable together with the depth they belong to
    const setHistory = (depth: number, currentDisplayItems: MenuStructureInterface[]) => {
        switch (depth) {
            case 1:
                setDisplayedItemsHistory1(currentDisplayItems);
                break;
            case 2:
                setDisplayedItemsHistory2(currentDisplayItems);
                break;
            case 3:
                setDisplayedItemsHistory3(currentDisplayItems);
                break;
            case 4:
                setDisplayedItemsHistory4(currentDisplayItems);
                break;
            // Should not be reachable with the current menu data. Needs reworking if the menu changes in depth    
            default:
                alert("Error saving Menu Route History");
        }
    }

    // On click back simply load the history of the current depth -1
    const onClickBack = () => {
        setDisplayedItems(loadHistory(depthCount));
    }

    // case 1 should not be reachable. Needs reworking if the menu changes in depth
    const loadHistory = (depthCount: number): MenuStructureInterface[] => {
        let items: MenuStructureInterface[] = [];

        switch (depthCount) {
            case 2:
                items = displayedItemsHistory1;
                break;
            case 3:
                items = displayedItemsHistory2;
                break;
            case 4:
                items = displayedItemsHistory3;
                break;
            case 5:
                items = displayedItemsHistory4;
                break;
            default: alert("Error loading Menu Route History")
        }
        setDepthCount(depthCount - 1);

        return items;
    }

    // Defines a back button that might be displayed depending on the depth
    let backButton;
    if (depthCount > 1) {
        backButton = <button className="border-2 rounded-lg p-2 border-tailwind-blue m-2 text-center text-3xl font-extrabold bg-tailwind-blue text-tailwind-text absolute bottom-1 right-1" onClick={onClickBack}> Zurück </button>;
    }

    // Checks if a menuItem has "real" children and returns a boolean value that is processed in the MenuItem component  
    const checkIfChildrenArePresent = (children: MenuStructureInterface[] | string): boolean => {
        let hasChildren = false;
        if (children instanceof Array && children.length !== 0) {
            hasChildren = true;
        }
        return hasChildren;
    }

    // HTML and CSS. Header/Banner and n number of divs depending on the number of children that need to be displayed 
    return (
        <div className="m-2">
            {backButton}
            <div className="border-2 rounded-lg border-tailwind-blue m-2 text-center font-extrabold bg-tailwind-blue text-tailwind-text">
                {MenuStructureData.name}
            </div>
            <div className="grid grid-rows-2 grid-cols-6 justify-between">
                {displayedItems.map((data) => <MenuItem onSelectMenuItem={onSelectMenuItem} key={data.key} exposedKey={data.key} name={data.name} parent={data.parent} premium={data.premium} custom={data.custom} active={data.active}
                    quad={data.quad} basepw={data.basepw} children={checkIfChildrenArePresent(data.children)} masterpw={data.masterpw} text={data.text} ></MenuItem>
                )}
            </div>
        </div >
    )
}

export default MenuStructureRoot