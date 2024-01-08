import { CSSProperties, Dispatch, SetStateAction } from "react";
import withLogger from "../../shared/hoc/withLogger";
import { PostData } from "../../shared/type";
import { usePostCard } from "./hooks/usePostCard";
import "./style.css";

interface PostCardProps {
  postData: PostData;
  setCurrentPostId: Dispatch<SetStateAction<number | null>>;
  styleOverrides?: CSSProperties;
  selected?: boolean;
  testId?: string;
}

function PostCard({
  postData,
  setCurrentPostId,
  styleOverrides,
  selected,
  testId,
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
      style={styleOverrides}
      data-testid={testId}
      onClick={handleClickDetails}
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
          <button onClick={handleClickViewComments}>Comments</button>
        </div>
      </div>
    </div>
  );
}

const LoggedPostCard = withLogger(PostCard);

export default LoggedPostCard;
