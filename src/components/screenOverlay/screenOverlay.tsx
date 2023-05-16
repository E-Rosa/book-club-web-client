import { Dispatch, FunctionComponent, SetStateAction} from "react";
import './screenOverlay.css'

interface ScreenOverlayProps {
  onClose?: Function;
  isActive: boolean;
  isActiveSetter: Dispatch<SetStateAction<boolean>>;
  content: JSX.Element
}

const ScreenOverlayComponent: FunctionComponent<ScreenOverlayProps> = (
  props
) => {
  //responsibility: display a screen overlay with centered content and an exist button
  return (
    <>
      {props.isActive && (
        <div className="ScreenOverlay">
          <button
            className="red-button screenoverlay-close-button"
            onClick={() => {
              props.onClose ? props.onClose() : null;
              props.isActiveSetter(false);
            }}
          >
            x
          </button>
          {props.content}
        </div>
      )}
    </>
  );
};

export default ScreenOverlayComponent;
