import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";
import withLogger from "../../shared/hoc/withLogger";
import { PostData } from "../../shared/type";
import CommentList from "../CommentList";
import LoadingScreen from "../LoadingScreen";
import PostCard from "../PostCard";
import { usePosts } from "./hooks/usePosts";

function PostList() {
  const { posts, currentPostId, setCurrentPostId, searchText, setSearchText } =
    usePosts();

  if (!posts) {
    return <LoadingScreen propsMessage={DEFAULT_PROPS_MESSAGE} />;
  }

  return (
    <div style={{ height: "100%", display: "flex" }}>
      <div
        style={{
          flex: 3,
          maxHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>List of posts</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            value={searchText}
            style={{
              width: "100%",
              maxWidth: "700px",
              padding: "12px",
              borderRadius: "8px",
            }}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search posts by user name..."
          />
        </div>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: "0px",
            overflow: "auto",
          }}
        >
          {posts.map((postData: PostData) => (
            <li style={{}} key={postData.id}>
              <PostCard
                postData={postData}
                setCurrentPostId={setCurrentPostId}
                propsMessage={DEFAULT_PROPS_MESSAGE}
              />
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 2, maxHeight: "100vh", overflow: "hidden" }}>
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
