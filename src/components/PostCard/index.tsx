import { Dispatch, HTMLAttributes, SetStateAction, memo } from "react";
import withLogger from "../../shared/hoc/withLogger";
import { Button } from "../../ui-library";
import { usePostCard } from "./hooks/usePostCard";
import "./style.css";

// TODO: Create a generic card component that can be used for posts and comments
interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  postId: number;
  title: string;
  userName: string;
  setCurrentPostId: Dispatch<SetStateAction<number | null>>;
  selected?: boolean;
  testId?: string;
}

function PostCard({
  setCurrentPostId,
  selected,
  testId,
  postId,
  title,
  userName,
  ...props
}: PostCardProps) {
  const { handleClickDetails, handleClickViewComments } = usePostCard(
    postId,
    setCurrentPostId
  );

  console.log("render post card", postId);

  return (
    <div
      className={`PostCard__wrapper ${
        selected ? "PostCard__wrapper__selected" : ""
      }`}
      data-testid={testId}
      onClick={handleClickDetails}
      {...props}
    >
      <h3
        className={`PostCard__title ${
          selected ? "PostCard__title__selected" : ""
        }`}
      >
        {title}
      </h3>
      <div className="PostCard__container">
        <div>
          <p className="PostCard__created-by">
            Created by: <span className="PostCard__user-name">{userName}</span>
          </p>
        </div>
        <div className="PostCard__button-container">
          <Button
            onClick={handleClickViewComments}
            variant="secondary"
            icon="edit"
          >
            Comments
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(withLogger(PostCard));
