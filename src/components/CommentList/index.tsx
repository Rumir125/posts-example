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
    <div
      style={{
        maxHeight: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Comments</h2>
      <ul
        style={{
          listStyleType: "none",
          paddingLeft: "0px",
          padding: "8px",
          marginLeft: "8px",
          overflow: "auto",
        }}
      >
        {comments?.map((comment) => (
          <li key={comment.id}>
            <div
              style={{
                border: "1px solid #d9d9d9",
                marginBottom: "8px",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h4 style={{ textAlign: "left" }}>{comment.name}</h4>
              <p
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                {comment.email}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "gray",
                  textAlign: "justify",
                }}
              >
                {comment.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LoggedCommentList = withLogger(CommentList);

export default LoggedCommentList;
