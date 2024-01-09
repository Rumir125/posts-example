import { useEffect, useMemo } from "react";
import { useFetchHelper } from "../../../shared/fetchHelper";
import { usePostCommentsContext } from "../../../shared/context/PostCommentsContext";
import { CommentResponse } from "../../../shared/type";

const useCommentList = (postId: number | null) => {
  const { cachedPostComments, addCachedComments } = usePostCommentsContext();

  const cachedComments = useMemo(
    () => cachedPostComments.find((item) => item.postId === postId)?.comments,
    [cachedPostComments, postId]
  );

  const {
    data: comments,
    loading,
    error,
  } = useFetchHelper<CommentResponse[]>(
    !cachedComments?.length ? `/posts/${postId}/comments` : ""
  );

  useEffect(() => {
    if (cachedComments?.length) return;
    if (comments?.[0]?.postId === postId) {
      addCachedComments(postId, comments);
    }
  }, [cachedComments?.length, comments, postId, addCachedComments]);

  return {
    comments: cachedComments || comments,
    loadingComments: loading,
    error,
  };
};

export default useCommentList;
