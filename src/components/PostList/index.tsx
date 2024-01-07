import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";
import withLogger from "../../shared/hoc/withLogger";
import CommentList from "../CommentList";
import PostCard from "../PostCard";
import ListComponent from "../shared/ListComponent";
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
        <ListComponent
          propsMessage={DEFAULT_PROPS_MESSAGE}
          data={posts}
          loadingData={loading}
          itemKey="id"
          noDataMessage="No posts found"
          renderItem={(postData) => (
            <PostCard
              postData={postData}
              setCurrentPostId={setCurrentPostId}
              propsMessage={DEFAULT_PROPS_MESSAGE}
              selected={postData.id === currentPostId}
            />
          )}
        />
      </div>
      <div className="PostList__comments-wrapper">
        <CommentList
          propsMessage={DEFAULT_PROPS_MESSAGE}
          postId={currentPostId}
        />
      </div>
    </div>
  );
}

const LoggedPostList = withLogger(PostList);

export default LoggedPostList;
