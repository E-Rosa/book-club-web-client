import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { feedNames } from "../../../api/interfaces/interfaces";

interface TimelineNavProps {
  navItems: { domName: string, name: feedNames }[];
  activeItemName: string;
  setActiveItemName: Dispatch<SetStateAction<feedNames>>;
}
const TimelineNav: FunctionComponent<TimelineNavProps> = (props) => {
  //responsibility: display a navbar with X items and highlight the selected option
  const navItemComponents = () => {
    return props.navItems.map((navItem) => {
      if (navItem.name == props.activeItemName) {
        return <button className="red-button">{navItem.domName}</button>;
      } else {
        return <button className="white-button" onClick={()=>{
            props.setActiveItemName(navItem.name)
        }}>{navItem.domName}</button>;
      }
    });
  };
  return (
    <>
      <div className="flex s-gap">{navItemComponents()}</div>
    </>
  );
};

export default TimelineNav;
