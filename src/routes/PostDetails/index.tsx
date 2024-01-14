import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../../components/CommentList";
import LoadingScreen from "../../components/LoadingScreen";
import withLogger from "../../shared/hoc/withLogger";
import usePostDetails from "./hooks/usePostDetails";

import ErrorScreen from "../../components/ErrorScreen";
import { Button } from "../../ui-library";
import "./style.css";

function PostDetails({ testId }: { testId?: string }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { post, user, loading, error } = usePostDetails(Number(id));

  if (error) {
    return <ErrorScreen />;
  }

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
