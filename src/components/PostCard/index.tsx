import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import withLogger from "../../shared/hoc/withLogger";
import { PostData } from "../../shared/type";
import { Button } from "../../ui-library";
import { usePostCard } from "./hooks/usePostCard";
import "./style.css";

// TODO: Create a generic card component that can be used for posts and comments
interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  postData: PostData;
  setCurrentPostId: Dispatch<SetStateAction<number | null>>;
  selected?: boolean;
  testId?: string;
}

function PostCard({
  postData,
  setCurrentPostId,
  selected,
  testId,
  ...props
}: PostCardProps) {
  const { handleClickDetails, handleClickViewComments } = usePostCard(
    postData.id,
    setCurrentPostId
  );

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
        {postData.title}
      </h3>
      <div className="PostCard__container">
        <div>
          <p className="PostCard__created-by">
            Created by:{" "}
            <span className="PostCard__user-name">{postData.userName}</span>
          </p>
        </div>
        <div className="PostCard__button-container">
          <Button onClick={handleClickViewComments} variant="secondary">
            Comments
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withLogger(PostCard);
