import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";

interface PostTagProps {
  tagsListSetter: Dispatch<SetStateAction<string[]>>;
  tagsList: string[];
  previousTagsList?: string[]
}
const PostTag: FunctionComponent<PostTagProps> = (props) => {
  function updateInputValue(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      setInputValue(event.target.value);
    }
  }
  function makeTagWhenHitSpace(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key == " ") {
      if (event.currentTarget.value) {
        props.tagsListSetter((prevTagsList) => {
            const spacelessTag = event.currentTarget.value.split(" ").join("")
          const tagAlreadyInList = prevTagsList.find(
            (tag) => tag == spacelessTag
          ) == undefined ? false : true;
          if(tagAlreadyInList || spacelessTag == ""){
            return prevTagsList
          }
          return [...prevTagsList, spacelessTag];
        });
      }

      setInputValue("");
    }
  }
  const tagComponents = () => {
    return props.tagsList.map((tag, index) => {
      return <span className="voter-tag s-border bg-pastel-yellow" key={index}>{tag}</span>;
    });
  };

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <input
        type="text"
        className="standard-text-input"
        name="tagName"
        placeholder="gêneros: drama, romance, ação"
        onKeyDown={makeTagWhenHitSpace}
        onChange={updateInputValue}
        value={inputValue}
      />
      <div className="flex s-gap wide wrap">{tagComponents()}</div>
    </>
  );
};

export default PostTag;
