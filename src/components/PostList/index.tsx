import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";
import withLogger from "../../shared/hoc/withLogger";
import { PostData } from "../../shared/type";
import CommentList from "../CommentList";
import LoadingScreen from "../LoadingScreen";
import PostCard from "../PostCard";
import { usePosts } from "./hooks/usePosts";
import "./style.css";

function PostList() {
  const {
    posts,
    currentPostId,
    setCurrentPostId,
    searchText,
    setSearchText,
    loading,
  } = usePosts();

  if (loading) {
    return <LoadingScreen propsMessage={DEFAULT_PROPS_MESSAGE} />;
  }

  return (
    <div className="PostList__wrapper">
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
        {!!posts.length ? (
          <ul className="PostList__list-container">
            {posts.map((postData: PostData) => (
              <li key={postData.id}>
                <PostCard
                  postData={postData}
                  setCurrentPostId={setCurrentPostId}
                  propsMessage={DEFAULT_PROPS_MESSAGE}
                  selected={postData.id === currentPostId}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="PostList__list-empty">
            <p>No posts found</p>
          </div>
        )}
      </div>
      <div className="PostList__comments-wrapper">
        {currentPostId && (
          <CommentList
            propsMessage={DEFAULT_PROPS_MESSAGE}
            postId={currentPostId}
          />
        )}
      </div>
    </div>
  );
}

const LoggedPostList = withLogger(PostList);

export default LoggedPostList;
