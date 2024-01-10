import withLogger from "../../shared/hoc/withLogger";
import CommentList from "../../components/CommentList";
import PostCard from "../../components/PostCard";
import { ListComponent } from "../../ui-library";
import usePosts from "./hooks/usePosts";
import "./style.css";
import { HTMLAttributes } from "react";
import { Option, SearchSelect } from "../../ui-library";

interface PostListProps extends HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

function PostList({ testId, ...props }: PostListProps) {
  const {
    posts,
    currentPostId,
    setCurrentPostId,
    setSearchText,
    loading,
    users,
  } = usePosts();

  return (
    <div className="PostList__wrapper" data-testid={testId} {...props}>
      <div className="PostList__container">
        <h1>List of posts</h1>
        <div className="PostList__input-wrapper">
          <SearchSelect
            onChangeValue={(val) => {
              setSearchText(val);
            }}
            placeholder="Search posts by user name..."
          >
            {users.map((user) => (
              <Option value={user.name}>{user.name}</Option>
            ))}
          </SearchSelect>
        </div>
        <ListComponent
          data={posts}
          loadingData={loading}
          itemKey="id"
          noDataMessage="No posts found"
          renderItem={(postData) => (
            <PostCard
              postData={postData}
              setCurrentPostId={setCurrentPostId}
              selected={postData.id === currentPostId}
              testId={`${testId}-post-card-${postData.id}`}
            />
          )}
        />
      </div>
      <div className="PostList__comments-wrapper">
        <CommentList postId={currentPostId} testId={`${testId}-comment-list`} />
      </div>
    </div>
  );
}

export default withLogger(PostList);
