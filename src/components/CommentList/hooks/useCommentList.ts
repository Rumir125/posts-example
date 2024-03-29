import { useFetchData } from "../../../shared/fetchHelper";
import { CommentResponse } from "../../../shared/type";

const useCommentList = (postId: number | null) => {
  const {
    data: comments,
    loading,
    error,
  } = useFetchData<CommentResponse[]>(
    postId ? `/posts/${postId}/comments` : ""
  );
  return {
    comments: comments,
    loadingComments: loading,
    error,
  };
};

export default useCommentList;
