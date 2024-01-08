import { CSSProperties } from "react";
import withLogger from "../../shared/hoc/withLogger";
import ListComponent from "../../ui-library/ListComponent";
import useCommentList from "./hooks/useCommentList";
import "./style.css";

interface CommentListProps {
  postId: number | null;
  styleOverrides?: CSSProperties;
  testId?: string;
}

function CommentList({ postId, styleOverrides, testId }: CommentListProps) {
  const { comments, loadingComments } = useCommentList(postId);

  return (
    <div
      className="CommentList__wrapper"
      style={styleOverrides}
      data-testid={testId}
    >
      <h2>Comments</h2>
      <div className="CommentList__container">
        <ListComponent
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
            <div
              className="CommentList__empty"
              data-testid={`${testId}-no-data`}
            >
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
