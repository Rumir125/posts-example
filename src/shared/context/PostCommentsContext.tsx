import { ReactNode, createContext, useContext, useState } from "react";

import { CommentResponse } from "../type";

type PostsProviderType = {
  cachedPostComments: { postId: number; comments: CommentResponse[] }[];
  addCachedComments: (postId: number, comments: CommentResponse[]) => void;
};

// This context is used to cache the comments of a post
export const PostCommentsContext = createContext<PostsProviderType>({
  cachedPostComments: [],
  addCachedComments: () => {},
});

export const PostCommentsProvider = ({ children }: { children: ReactNode }) => {
  const [postComments, setPostComments] = useState<
    { postId: number; comments: CommentResponse[] }[]
  >([]);

  const addCachedComments = (postId: number, comments: CommentResponse[]) => {
    setPostComments((prevState) => [
      ...prevState,
      { postId: postId, comments },
    ]);
  };

  return (
    <PostCommentsContext.Provider
      value={{
        cachedPostComments: postComments,
        addCachedComments,
      }}
    >
      {children}
    </PostCommentsContext.Provider>
  );
};

// This context is used to cache the comments of a post
export const usePostCommentsContext = () => useContext(PostCommentsContext);
