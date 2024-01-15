export const testUserId = 1;
export const testPostId = 1;
export const testCommentId = 1;

export const testComments = [
  {
    postId: 1,
    id: 1,
    name: "comment",
    email: "test@mail",
    body: "test message",
  },
];

export const testPosts = [
  { id: 1, title: "title", body: "body", userName: "user", userId: 1 },
];

export const testPost = {
  id: 1,
  userId: 1,
  title: "title",
  body: "example body text",
  userName: "John Doe",
};

export const testUser = {
  id: 1,
  name: "John Doe",
  userName: "john123",
  email: "test@mail.com",
};

export const usePostsMockReturnData = (overrides?: object) => {
  return {
    posts: [],
    currentPostId: null,
    setCurrentPostId: jest.fn(),
    loading: false,
    users: [],
    setCurrentOffset: () => {},
    setLoadedPosts: () => {},
    handleSearch: () => {},
    currentOffset: 0,
    loadMoreDisabled: false,
    ...overrides,
  };
};

export const useCommentListMockReturnData = (overrides?: object) => ({
  comments: testComments,
  loadingComments: false,
  error: null,
  ...overrides,
});
