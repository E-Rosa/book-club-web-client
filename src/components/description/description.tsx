import { FunctionComponent, useState } from "react";
import "./description.css"

interface DescriptionProps {
  description?: string;
}
const DescriptionComponent: FunctionComponent<DescriptionProps> = (props) => {
  const [isReadingDescription, setIsReadingDescription] = useState(false);
  return (
    <div className="DescriptionComponent">
      {!isReadingDescription && props.description && (
        <div className="description-container">
          <button
            className="toggle-description-button"
            onClick={() => setIsReadingDescription(true)}
          >
            descrição
          </button>
        </div>
      )}
      {isReadingDescription && (
        <div className="description-container">
          <span className="book-description-text">
            {props.description}
          </span>
          <button
            className="close-description-button"
            onClick={() => setIsReadingDescription(false)}
          >
            ver menos
          </button>
        </div>
      )}
    </div>
  );
};

export default DescriptionComponent;
