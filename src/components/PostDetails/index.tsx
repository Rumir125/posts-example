import { useNavigate, useParams } from "react-router-dom";
import withLogger from "../../shared/hoc/withLogger";
import CommentList from "../CommentList";
import LoadingScreen from "../LoadingScreen";
import usePostDetails from "./hooks/usePostDetails";

import "./style.css";
import Button from "../../ui-library/Button";

function PostDetails({ testId }: { testId?: string }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { post, user, loading } = usePostDetails(Number(id));

  if (!post || loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="PostDetails__wrapper" data-testid={testId}>
      <div className="PostDetails__container">
        <div className="PostDetails__content-container">
          <div className="PostDetails__button-container">
            <Button
              onClick={() => navigate("/posts", { replace: true })}
              variant="secondary"
            >
              Go Back
            </Button>
          </div>
          <h2 className="PostDetails__title">{post.title}</h2>
          <p>
            Created by:{" "}
            <span className="PostDetails__user-name"> {user?.name} </span>
          </p>
          <p>{post.body}</p>
        </div>
        <div className="PostDetails__comments-container">
          <CommentList postId={post.id} testId={`${testId}-comment-list`} />
        </div>
      </div>
    </div>
  );
}

export default withLogger(PostDetails);
