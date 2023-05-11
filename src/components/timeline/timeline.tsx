import { FunctionComponent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import "./timeline.css";
import { feedNames, readBooksFeedNames } from "../../api/interfaces/interfaces";
import TimelineNav from "./timelineNav/timelineNav";
import TimelineFeed from "./timelineFeed/timelineFeed";

interface TimelineProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  timelineType: "books" | "meetings";
}

const Timeline: FunctionComponent<TimelineProps> = (props) => {
  const [navActiveItem, setNavActiveItem] =
    props.timelineType == "books" ?
    useState<feedNames | readBooksFeedNames>("suggested-books") :
    useState<feedNames | readBooksFeedNames>("scheduled-meetings")
  return (
    //responsibility: display the correct Timeline between "books" and "meetings" using TimelineNav and TimelineFeed
    <div className="Timeline">
      {props.timelineType == "books" && (
        <>
          <TimelineNav
            activeItemName={navActiveItem}
            navItems={[
              { domName: "sugeridos", name: "suggested-books" },
              { domName: "lidos", name: "read-books" },
              { domName: "minhas sugestões", name: "user-books" },
              { domName: "sugerir", name: "suggest-book" },
            ]}
            setActiveItemName={setNavActiveItem}
          />
          <TimelineFeed
            loadingSetter={props.loadingSetter}
            errorIsActiveSetter={props.errorIsActiveSetter}
            successIsActiveSetter={props.successIsActiveSetter}
            feedName={navActiveItem}
          />
        </>
      )}
      {props.timelineType == "meetings" && (
        <>
          <TimelineNav
            activeItemName={navActiveItem}
            navItems={[
              { domName: "agendadas", name: "scheduled-meetings" },
              { domName: "feitas", name: "past-meetings" },
              { domName: "marcar", name: "suggest-meeting" },
            ]}
            setActiveItemName={setNavActiveItem}
          />
          <TimelineFeed
            loadingSetter={props.loadingSetter}
            errorIsActiveSetter={props.errorIsActiveSetter}
            successIsActiveSetter={props.successIsActiveSetter}
            feedName={navActiveItem}
          />
        </>
      )}
    </div>
  );
};

export default Timeline;
