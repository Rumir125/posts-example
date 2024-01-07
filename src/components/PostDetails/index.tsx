import { useNavigate, useParams } from "react-router-dom";
import { usePostDetails } from "./hooks/usePostDetails";
import LoadingScreen from "../LoadingScreen";
import withLogger from "../../shared/hoc/withLogger";
import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { post, user, loading } = usePostDetails(Number(id));

  if (!post || loading) {
    return <LoadingScreen propsMessage={DEFAULT_PROPS_MESSAGE} />;
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <header style={{ display: "flex" }}>
        <button onClick={() => navigate("/posts", { replace: true })}>
          Go Back
        </button>
      </header>
      <div>
        <h2>{post.title}</h2>
        <p>Created by: {user?.name}</p>
        <p>{post.body}</p>
      </div>
    </div>
  );
}

const LoggedPostDetails = withLogger(PostDetails);

export default LoggedPostDetails;
