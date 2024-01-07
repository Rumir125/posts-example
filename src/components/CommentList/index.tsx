import "./style.css";
import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";
import withLogger from "../../shared/hoc/withLogger";
import LoadingScreen from "../LoadingScreen";
import { useCommentList } from "./hooks/useCommentList";

function CommentList({ postId }: { postId: number }) {
  const { comments, loadingComments } = useCommentList(postId);

  if (loadingComments) {
    return <LoadingScreen propsMessage={DEFAULT_PROPS_MESSAGE} />;
  }

  return (
    <div className="CommentList__wrapper">
      <h2>Comments</h2>
      <ul className="CommentList__container">
        {comments?.map((comment) => (
          <li key={comment.id}>
            <div className="CommentList__item-container">
              <h4 className="CommentList__name">{comment.name}</h4>
              <p className="CommentList__email">{comment.email}</p>
              <p className="CommentList__body">{comment.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LoggedCommentList = withLogger(CommentList);

export default LoggedCommentList;
