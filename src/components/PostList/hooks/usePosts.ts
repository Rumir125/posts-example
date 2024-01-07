import { useMemo, useState } from "react";
import { useFetchHelper } from "../../../shared/fetchHelper";
import { PostData, UserData } from "../../../shared/type";

export const usePosts = () => {
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const { data: posts, loading: loadingPosts } =
    useFetchHelper<PostData[]>("/posts");
  const { data: users, loading: loadingUsers } =
    useFetchHelper<UserData[]>("/users");

  const updatedPosts = posts?.map((post: PostData) => ({
    ...post,
    userName:
      users?.find((user: UserData) => user.id === post.userId)?.name || "",
  }));

  const filteredPosts = useMemo(() => {
    if (!searchText) return updatedPosts;
    return updatedPosts?.filter((post) =>
      post?.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [updatedPosts, searchText]);

  return {
    posts: filteredPosts || [],
    currentPostId,
    setCurrentPostId,
    loading: loadingPosts || loadingUsers,
    users: users || [],
    searchText,
    setSearchText,
  };
};
