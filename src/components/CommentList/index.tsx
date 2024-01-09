import { HTMLAttributes } from "react";
import withLogger from "../../shared/hoc/withLogger";
import ListComponent from "../../ui-library/ListComponent";
import useCommentList from "./hooks/useCommentList";
import "./style.css";

interface CommentListProps extends HTMLAttributes<HTMLDivElement> {
  postId: number | null;
  testId?: string;
}

function CommentList({ postId, testId, ...props }: CommentListProps) {
  const { comments, loadingComments } = useCommentList(postId);

  return (
    <div className="CommentList__wrapper" data-testid={testId} {...props}>
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

export default withLogger(CommentList);
