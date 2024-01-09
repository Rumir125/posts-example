import { useEffect, useMemo } from "react";
import { useFetchData } from "../../../shared/fetchHelper";
import { usePostCommentsContext } from "../../../shared/context/PostCommentsContext";
import { CommentResponse } from "../../../shared/type";

const useCommentList = (postId: number | null) => {
  const { cachedPostComments, addCachedComments } = usePostCommentsContext();

  const cachedComments = useMemo(
    () => cachedPostComments.find((item) => item.postId === postId)?.comments,
    [cachedPostComments, postId]
  );
  const hasCachedComments = !!cachedComments?.length;

  const {
    data: comments,
    loading,
    error,
  } = useFetchData<CommentResponse[]>(
    !hasCachedComments ? `/posts/${postId}/comments` : ""
  );

  useEffect(() => {
    if (hasCachedComments) return;
    if (comments?.[0]?.postId === postId) {
      addCachedComments(postId, comments);
    }
  }, [hasCachedComments, comments, postId, addCachedComments]);

  return {
    comments: cachedComments || comments,
    loadingComments: loading,
    error,
  };
};

export default useCommentList;
