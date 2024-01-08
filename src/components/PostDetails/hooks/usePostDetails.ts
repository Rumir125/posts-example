import { useFetchHelper } from "../../../shared/fetchHelper";
import { PostData, UserData } from "../../../shared/type";

const usePostDetails = (id: number) => {
  const { data: post, loading: loadingPost } = useFetchHelper<PostData>(
    `/posts/${id}`
  );
  const { data: user, loading: loadingUser } = useFetchHelper<UserData>(
    post?.userId ? `/users/${post?.userId}` : ""
  );
  return { post, user, loading: loadingPost || loadingUser };
};

export default usePostDetails;
