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

  // TODO: Maybe create a hoc to handle loading and error states
  if (error) {
    return <ErrorScreen />;
  }
  if (!post || !user || loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="PostDetails__wrapper" data-testid={testId}>
      <div className="PostDetails__container">
        <section className="PostDetails__content-container">
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
        </section>
        <aside className="PostDetails__comments-container">
          <CommentList postId={post.id} testId={`${testId}-comment-list`} />
        </aside>
      </div>
    </main>
  );
}

export default withLogger(PostDetails);
