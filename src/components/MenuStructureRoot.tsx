import React, { useState, useEffect } from 'react'
import MenuItem from "./MenuItem";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Axios from "axios";
import MenuStructureData from "../menu.json"
import MenuStructureInterface from '../interfaces/MenuStructureInterface';

const MenuStructureRoot: React.FC = () => {

    /*
    Ideen:
    -> displayedItem sind die Menu items die aktuell dargestellt werden sollen
    -> Wird initial auf das erste Array gesetzt, dass das Root Menu objekt als Childen Array hat
    -> Bei klick auf ein Item wird geguckt welche Children das gekliuckte item hat
    -> Das Displayarray wird auf das Array der Kinder gesetzt
    -> Wenn das Menu irgendein key außer 0 oder 0-0 hat, dann soll ein zurück button angezeigt werden
    -> Der Button nimmt die parent ID und sucht irgendwie die Eltern raus und setzt das Dispalyarray entsprechend
    */

    const [displayedItems, setDisplayedItems] = useState<MenuStructureInterface[]>(MenuStructureData.children);
    // bad solution since the depth is not dynamic. Could be if the maximum number of generations could be determined programmatically. 
    const [depthCount, setDepthCount] = useState<number>(1);
    const [displayedItemsHistory1, setDisplayedItemsHistory1] = useState<MenuStructureInterface[]>([]);
    const [displayedItemsHistory2, setDisplayedItemsHistory2] = useState<MenuStructureInterface[]>([]);
    const [displayedItemsHistory3, setDisplayedItemsHistory3] = useState<MenuStructureInterface[]>([]);
    const [displayedItemsHistory4, setDisplayedItemsHistory4] = useState<MenuStructureInterface[]>([]);

    /*   useEffect(() => {
          setDisplayedItems(MenuStructureData.children)
          console.log(displayedItems)
      }, [displayedItems]) */

    // Not used because of CORS Error, importing Data manually
    useEffect(() => {
        //Axios.get("https://durchbiegung.rk-rose-krieger.com/HS.json")
        //    .then((response => {
        //        console.log(response.data)

        //    }));
    }, []);

    const onSelectMenuItem = (clickedKey: string) => {
        //console.log("clicked key: " + clickedKey);

        displayedItems?.forEach((currentLvlMenuObj) => {
            if (currentLvlMenuObj.key === clickedKey) {
                if (currentLvlMenuObj.children.length > 0) {

                    let childrenOfClickedMenuObj: MenuStructureInterface[] = currentLvlMenuObj.children as MenuStructureInterface[]
                    //childrenOfMenuObj.forEach((child) => {
                    //let childIOfMenuObj: MenuStructureInterface = child as MenuStructureInterface
                    //console.log(childIOfMenuObj)
                    setHistory(depthCount, displayedItems);
                    setDepthCount(depthCount + 1)
                    //console.log("new depth: " + depthCount);
                    //console.log(childrenOfClickedMenuObj)
                    setDisplayedItems(childrenOfClickedMenuObj);
                    //console.log("current display:")
                    //console.log(displayedItems);
                    // })
                }
            }
        })
    }

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
            default:
                alert("Error saving Menu Route History");
        }
    }

    const onClickBack = () => {
        setDisplayedItems(loadHistory(depthCount));
    }

    // case 1 is not reachable. 
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
        console.log("new depth: " + depthCount);

        return items;
    }

    let backButton;
    if (depthCount > 1) {
        backButton = <button className="bg-grey shadow-md rounded p-2 float-right" onClick={onClickBack}> Zurück </button>;
    }

    const checkIfChildrenArePresent = (children: MenuStructureInterface[] | string): boolean => {
        let hasChildren = false;
        if (children instanceof Array && children.length !== 0) {
            hasChildren = true;
        }
        return hasChildren;
    }

    return (
        <div className="m-2">
            {backButton}
            <div className="border-2 m-2 text-center font-extrabold">
                {MenuStructureData.name}
            </div>
            <div className="grid grid-cols-2" >
                <div className="inline-flex justify-between">
                    {displayedItems.map((data) => <MenuItem onSelectMenuItem={onSelectMenuItem} key={data.key} exposedKey={data.key} name={data.name} parent={data.parent} premium={data.premium} custom={data.custom} active={data.active}
                        quad={data.quad} basepw={data.basepw} children={checkIfChildrenArePresent(data.children)} masterpw={data.masterpw} text={data.text} ></MenuItem>
                    )}
                </div>
            </div>

        </div>
    )
}

export default MenuStructureRoot