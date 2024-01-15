import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchData } from "../../../shared/fetchHelper";
import { PostData, UserData } from "../../../shared/type";

const POSTS_FETCH_LIMIT = 50;

const usePosts = () => {
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [loadedPosts, setLoadedPosts] = useState<PostData[]>([]);
  const [activeSearch, setActiveSearch] = useState<string>("");

  const {
    data: users,
    loading: loadingUsers,
    error: usersError,
  } = useFetchData<UserData[]>("/users");

  const filterUserIdsBySearch = useCallback(
    (users: UserData[], search: string): number[] => {
      return users
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((user) => user.id);
    },
    []
  );

  const usersFilter = useMemo(() => {
    if (!activeSearch) return "";
    const filteredUserIds: number[] = filterUserIdsBySearch(
      users || [],
      activeSearch
    );
    return `&${filteredUserIds.map((id) => `userId=${id}`).join("&")}`;
  }, [activeSearch, users]);

  const {
    data: posts,
    loading: loadingPosts,
    error: postsError,
  } = useFetchData<PostData[]>(
    `/posts?_limit=${POSTS_FETCH_LIMIT}&_start=${
      currentOffset * POSTS_FETCH_LIMIT
    }${usersFilter}`
  );

  useEffect(() => {
    if (
      (currentOffset + 1) * POSTS_FETCH_LIMIT > loadedPosts.length &&
      !loadingPosts
    ) {
      const postIds = loadedPosts?.map((post) => post.id);
      const newPosts =
        posts?.filter((post) => !postIds.includes(post.id)) || [];
      setLoadedPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }
  }, [currentOffset, POSTS_FETCH_LIMIT, posts]);

  const updatedPosts = loadedPosts?.map((post: PostData) => ({
    ...post,
    userName:
      users?.find((user: UserData) => user.id === post.userId)?.name || "",
  }));

  const handleSearch = (textInput:string) => {
    if (textInput === activeSearch) return;
    const newIds = filterUserIdsBySearch(users || [], textInput);
    const oldIds = filterUserIdsBySearch(users || [], activeSearch);
    if (JSON.stringify(oldIds) === JSON.stringify(newIds)) return;
    if(newIds.length === 0) return;

    setCurrentOffset(0);
    setActiveSearch(textInput);
    setLoadedPosts([]);
  };

  const loadMoreDisabled =
    currentOffset * POSTS_FETCH_LIMIT >= loadedPosts.length;

  return {
    posts: updatedPosts || [],
    currentPostId,
    setCurrentPostId,
    loading: loadingPosts || loadingUsers,
    users: users || [],
    setCurrentOffset,
    setLoadedPosts,
    handleSearch,
    currentOffset,
    loadMoreDisabled,
    error: postsError || usersError,
  };
};

export default usePosts;
