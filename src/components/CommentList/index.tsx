import { CSSProperties } from "react";
import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";
import withLogger from "../../shared/hoc/withLogger";
import ListComponent from "../shared/ListComponent";
import { useCommentList } from "./hooks/useCommentList";
import "./style.css";

function CommentList({
  postId,
  styleOverrides,
}: {
  postId: number | null;
  styleOverrides?: CSSProperties;
}) {
  const { comments, loadingComments } = useCommentList(postId);

  return (
    <div className="CommentList__wrapper" style={styleOverrides}>
      <h2>Comments</h2>
      <div className="CommentList__container">
        <ListComponent
          propsMessage={DEFAULT_PROPS_MESSAGE}
          itemKey="id"
          data={comments || []}
          loadingData={loadingComments}
          renderItem={(comment) => (
            <div className="CommentList__item-container">
              <h4 className="CommentList__name">{comment.name}</h4>
              <p className="CommentList__email">{comment.email}</p>
              <p className="CommentList__body">{comment.body}</p>
            </div>
          )}
          noDataComponent={
            <div className="CommentList__empty">
              <p style={{ textAlign: "center", width: "100%" }}>
                {postId
                  ? "No comments"
                  : "Please select a post to see comments"}
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}

const LoggedCommentList = withLogger(CommentList);

export default LoggedCommentList;
