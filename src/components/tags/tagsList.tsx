import { FunctionComponent } from "react";
import "./tagsList.css"
import TagComponent from "./tag/tag";
import { Tag, TagColors, User } from "../../api/interfaces/interfaces";


interface TagsListProps{
    highlightedTagColor: TagColors
    coloredIds?: string[]
    tags?: Tag[]
    userTags?: User[]
}
const TagsList: FunctionComponent<TagsListProps> = (props)=>{
    const tagComponents = () =>{
        return props.tags ? props.tags.map((tag)=>{
            return <TagComponent tag={tag} color="white" />
        }) : null
    }
    const userTagComponents = () =>{
        return props.userTags ? props.userTags.map((userTag)=>{
            const isHighlightedTag = props.coloredIds ? props.coloredIds.includes(userTag.id) : false;
            if(isHighlightedTag){
                return <TagComponent tag={userTag} color={props.highlightedTagColor} />
            }
            return <TagComponent tag={userTag} color="white" />
        }) : null
    }
    return (
        <div className="tags-list">
            {tagComponents()}
            {userTagComponents()}
        </div>
    )
}

export default TagsList