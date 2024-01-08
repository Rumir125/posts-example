import { useFetchHelper } from "../../../shared/fetchHelper";
import { CommentResponse } from "../../../shared/type";

const useCommentList = (postId: number | null) => {
  const {
    data: comments,
    loading,
    error,
  } = useFetchHelper<CommentResponse[]>(`/posts/${postId}/comments`);

  return { comments, loadingComments: loading, error };
};

export default useCommentList;
