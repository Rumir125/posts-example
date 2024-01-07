import { useNavigate, useParams } from "react-router-dom";
import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";
import withLogger from "../../shared/hoc/withLogger";
import CommentList from "../CommentList";
import LoadingScreen from "../LoadingScreen";
import { usePostDetails } from "./hooks/usePostDetails";

import "./style.css";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { post, user, loading } = usePostDetails(Number(id));

  if (!post || loading) {
    return <LoadingScreen propsMessage={DEFAULT_PROPS_MESSAGE} />;
  }

  return (
    <div className="PostDetails__wrapper">
      <div className="PostDetails__container">
        <div className="PostDetails__content-container">
          <div className="PostDetails__button-container">
            <button onClick={() => navigate("/posts", { replace: true })}>
              Go Back
            </button>
          </div>
          <h2 className="PostDetails__title">{post.title}</h2>
          <p>
            Created by:{" "}
            <span className="PostDetails__user-name"> {user?.name} </span>
          </p>
          <p>{post.body}</p>
        </div>
        <div className="PostDetails__comments-container">
          <CommentList postId={post.id} propsMessage={DEFAULT_PROPS_MESSAGE} />
        </div>
      </div>
    </div>
  );
}

const LoggedPostDetails = withLogger(PostDetails);

export default LoggedPostDetails;
