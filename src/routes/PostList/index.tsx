import { HTMLAttributes, useState } from "react";
import CommentList from "../../components/CommentList";
import ErrorScreen from "../../components/ErrorScreen";
import PostCard from "../../components/PostCard";
import withLogger from "../../shared/hoc/withLogger";
import { Button, Modal, Option, SearchSelect } from "../../ui-library";
import ListComponent from "../../ui-library/ListComponent";
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
    loading: loadingPosts,
    users,
    setCurrentOffset,
    loadMoreDisabled,
    currentOffset,
    error,
    handleSubmit,
  } = usePosts();

  const [modalOpen, setModalOpen] = useState(false);

  // TODO: Maybe create a hoc to handle error states
  if (error) {
    return <ErrorScreen />;
  }

  return (
    <main className="PostList__wrapper" data-testid={testId} {...props}>
      <section className="PostList__container">
        <header>
          <h1>List of posts</h1>
          <form
            onSubmit={handleSubmit}
            className="PostList__input-wrapper"
            autoComplete="off"
          >
            <SearchSelect
              placeholder="Search posts by user name..."
              inputProps={{ name: "searchText" }}
            >
              {users.map((user) => (
                <Option key={user.id} value={user.name}>
                  {user.name}
                </Option>
              ))}
            </SearchSelect>
            <Button variant="primary" type="submit" icon="search">
              Search
            </Button>
          </form>
        </header>
        <ListComponent
          data={posts}
          loadingData={loadingPosts && currentOffset === 0}
          itemKey="id"
          noDataMessage="No posts found"
          renderItem={(postData) => (
            <PostCard
              title={postData.title}
              userName={postData.userName}
              postId={postData.id}
              setCurrentPostId={setCurrentPostId}
              selected={postData.id === currentPostId}
              testId={`${testId}-post-card-${postData.id}`}
              setModalOpen={setModalOpen}
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
      </section>
      {!modalOpen && (
        <aside className="PostList__comments-wrapper">
          <CommentList
            postId={currentPostId}
            testId={`${testId}-comment-list`}
          />
        </aside>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="PostList__Modal-body" style={{ padding: "16px" }}>
          <Button
            variant="secondary"
            onClick={() => setModalOpen(false)}
            style={{ alignSelf: "baseline" }}
          >
            Close
          </Button>
          <h3>{posts.find((post) => post.id === currentPostId)?.title}</h3>
          <CommentList
            postId={currentPostId}
            testId={`${testId}-comment-list-modal`}
          />
        </div>
      </Modal>
    </main>
  );
}

export default withLogger(PostList);
