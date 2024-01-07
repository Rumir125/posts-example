import { useEffect, useMemo, useState } from "react";
import { PostData, UserData } from "../../../shared/type";
import { API_URL } from "../../../config/constants";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const results = await Promise.all([
          fetch(`${API_URL}/posts`),
          fetch(`${API_URL}/users`),
        ]);
        const postData = await results[0].json();
        const userData = await results[1].json();
        setUsers(userData);
        setPosts(
          postData.map((post: PostData) => ({
            ...post,
            userName: userData?.find(
              (user: UserData) => user.id === post.userId
            )?.name,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchText) return posts;
    return posts.filter((post) =>
      post.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [posts, searchText]);

  return {
    posts: filteredPosts,
    currentPostId,
    setCurrentPostId,
    loading,
    users,
    searchText,
    setSearchText,
  };
};
