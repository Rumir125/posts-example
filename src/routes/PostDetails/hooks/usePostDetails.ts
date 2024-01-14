import { useFetchData } from "../../../shared/fetchHelper";
import { PostData, UserData } from "../../../shared/type";

const usePostDetails = (id: number) => {
  const {
    data: post,
    loading: loadingPost,
    error: postError,
  } = useFetchData<PostData>(`/posts/${id}`);
  const {
    data: user,
    loading: loadingUser,
    error: userError,
  } = useFetchData<UserData>(post?.userId ? `/users/${post?.userId}` : "");
  return {
    post,
    user,
    loading: loadingPost || loadingUser,
    error: postError || userError,
  };
};

export default usePostDetails;
