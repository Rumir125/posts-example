import withLogger from "../../shared/hoc/withLogger";
import CommentList from "../CommentList";
import PostCard from "../PostCard";
import ListComponent from "../shared/ListComponent";
import usePosts from "./hooks/usePosts";
import "./style.css";

function PostList({ testId }: { testId?: string }) {
  const {
    posts,
    currentPostId,
    setCurrentPostId,
    searchText,
    setSearchText,
    loading,
  } = usePosts();

  return (
    <div className="PostList__wrapper" data-testid={testId}>
      <div className="PostList__container">
        <h1>List of posts</h1>
        <div className="PostList__input-wrapper">
          <input
            value={searchText}
            className="PostList__search-input"
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search posts by user name..."
          />
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

const LoggedPostList = withLogger(PostList);

export default LoggedPostList;
