import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchData } from "../../../shared/fetchHelper";
import { PostData, UserData } from "../../../shared/type";

const POSTS_FETCH_LIMIT = 50;

// TODO - add unit tests for this hook
const usePosts = () => {
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [loadedPosts, setLoadedPosts] = useState<PostData[]>([]);
  const [activeSearch, setActiveSearch] = useState<string>("");

  const { data: users, loading: loadingUsers } =
    useFetchData<UserData[]>("/users");

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
    let filteredUserIds: number[] = filterUserIdsBySearch(
      users || [],
      activeSearch
    );
    return `&${filteredUserIds.map((id) => `userId=${id}`).join("&")}`;
  }, [activeSearch, users]);

  const { data: posts, loading: loadingPosts } = useFetchData<PostData[]>(
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

  const handleSearch = () => {
    if (searchText === activeSearch) return;
    const newIds = filterUserIdsBySearch(users || [], searchText);
    const oldIds = filterUserIdsBySearch(users || [], activeSearch);
    if (JSON.stringify(oldIds) === JSON.stringify(newIds)) return;
    setCurrentOffset(0);
    setActiveSearch(searchText);
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
    searchText,
    setSearchText,
    setCurrentOffset,
    setLoadedPosts,
    handleSearch,
    currentOffset,
    loadMoreDisabled,
  };
};

export default usePosts;
