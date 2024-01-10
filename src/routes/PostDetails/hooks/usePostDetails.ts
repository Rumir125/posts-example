import { useFetchData } from "../../../shared/fetchHelper";
import { PostData, UserData } from "../../../shared/type";

const usePostDetails = (id: number) => {
  const { data: post, loading: loadingPost } = useFetchData<PostData>(
    `/posts/${id}`
  );
  const { data: user, loading: loadingUser } = useFetchData<UserData>(
    post?.userId ? `/users/${post?.userId}` : ""
  );
  return { post, user, loading: loadingPost || loadingUser };
};

export default usePostDetails;
