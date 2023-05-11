import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { feedNames, readBooksFeedNames } from "../../../api/interfaces/interfaces";
import "./timelineNav.css";
interface TimelineNavProps {
  navItems: { domName: string; name: feedNames | readBooksFeedNames }[];
  activeItemName: string;
  setActiveItemName: Dispatch<SetStateAction<feedNames | readBooksFeedNames>>;
}
const TimelineNav: FunctionComponent<TimelineNavProps> = (props) => {
  //responsibility: display a navbar with X items and highlight the selected option
  const navItemComponents = () => {
    return props.navItems.map((navItem) => {
      if (navItem.name == props.activeItemName) {
        return (
          <button className="red-button" key={navItem.name}>
            {navItem.domName}
          </button>
        );
      } else {
        return (
          <button
            className="white-button"
            key={navItem.name}
            onClick={() => {
              props.setActiveItemName(navItem.name);
            }}
          >
            {navItem.domName}
          </button>
        );
      }
    });
  };
  return (
    <>
      <div className="timeline-nav">{navItemComponents()}</div>
    </>
  );
};

export default TimelineNav;
