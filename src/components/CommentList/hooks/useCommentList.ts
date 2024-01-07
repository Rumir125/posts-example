import { useFetchHelper } from "../../../shared/fetchHelper";
import { CommentResponse } from "../../../shared/type";

export const useCommentList = (postId: number) => {
  const {
    data: comments,
    loading,
    error,
  } = useFetchHelper<CommentResponse[]>(`/posts/${postId}/comments`);

  return { comments, loadingComments: loading, error };
};
