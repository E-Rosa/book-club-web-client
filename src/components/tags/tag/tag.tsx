import { FunctionComponent } from "react";
import "./tag.css"
import { Tag, TagColors, User } from "../../../api/interfaces/interfaces";

interface TagProps{
    tag?: Tag
    userTag?: User
    color: TagColors;
}
const TagComponent: FunctionComponent<TagProps> = (props)=>{
    return (
        <div className={`TagComponent tag-${props.color}`}>
            {props.tag ? props.tag.name : props.userTag?.name}
        </div>
    )
}

export default TagComponent