import { HTMLAttributes } from "react";
import CommentList from "../../components/CommentList";
import ErrorScreen from "../../components/ErrorScreen";
import PostCard from "../../components/PostCard";
import withLogger from "../../shared/hoc/withLogger";
import { Button, ListComponent, Option, SearchSelect } from "../../ui-library";
import usePosts from "./hooks/usePosts";
import "./style.css";

interface PostListProps extends HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

function PostList({ testId, ...props }: PostListProps) {
  const {
    posts,
    currentPostId,
    setCurrentPostId,
    setSearchText,
    loading: loadingPosts,
    users,
    setCurrentOffset,
    handleSearch,
    loadMoreDisabled,
    currentOffset,
    error,
  } = usePosts();

  if (error) {
    return <ErrorScreen />;
  }

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
              <Option key={user.id} value={user.name}>
                {user.name}
              </Option>
            ))}
          </SearchSelect>
          <Button variant="primary" onClick={handleSearch} icon="search">
            Search
          </Button>
        </div>
        <ListComponent
          data={posts}
          loadingData={loadingPosts && currentOffset === 0}
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
        <div className="PostList__load-more-wrapper">
          <Button
            variant="primary"
            disabled={loadingPosts || loadMoreDisabled}
            onClick={() => setCurrentOffset((prevState) => prevState + 1)}
          >
            Load more
          </Button>
        </div>
      </div>
      <div className="PostList__comments-wrapper">
        <CommentList postId={currentPostId} testId={`${testId}-comment-list`} />
      </div>
    </div>
  );
}

export default withLogger(PostList);
