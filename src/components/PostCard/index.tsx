import { Dispatch, SetStateAction } from "react";
import withLogger from "../../shared/hoc/withLogger";
import { PostData } from "../../shared/type";
import { usePostCard } from "./hooks/usePostCard";
import "./style.css";

function PostCard({
  postData,
  setCurrentPostId,
}: {
  postData: PostData;
  setCurrentPostId: Dispatch<SetStateAction<number | null>>;
}) {
  const { handleClickDetails, handleClickViewComments } = usePostCard(
    postData.id,
    setCurrentPostId
  );

  return (
    <div className="post_card__wrapper">
      <h3
        style={{
          textAlign: "left",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {postData.title}
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ margin: 0 }}>Created by: {postData.userName}</p>
        </div>
        <div style={{ display: "flex", columnGap: "8px" }}>
          <button onClick={handleClickDetails}>Details</button>
          <button onClick={handleClickViewComments}>Comments</button>
        </div>
      </div>
    </div>
  );
}

const LoggedPostCard = withLogger(PostCard);

export default LoggedPostCard;
