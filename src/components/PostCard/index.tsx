import { CSSProperties, Dispatch, SetStateAction } from "react";
import withLogger from "../../shared/hoc/withLogger";
import { PostData } from "../../shared/type";
import { usePostCard } from "./hooks/usePostCard";
import "./style.css";

function PostCard({
  postData,
  setCurrentPostId,
  styleOverrides,
  selected,
}: {
  postData: PostData;
  setCurrentPostId: Dispatch<SetStateAction<number | null>>;
  styleOverrides?: CSSProperties;
  selected?: boolean;
}) {
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
          <p className="PostCard__user-name">Created by: {postData.userName}</p>
        </div>
        <div className="PostCard__button-container">
          <button onClick={handleClickDetails}>Details</button>
          <button onClick={handleClickViewComments}>Comments</button>
        </div>
      </div>
    </div>
  );
}

const LoggedPostCard = withLogger(PostCard);

export default LoggedPostCard;
