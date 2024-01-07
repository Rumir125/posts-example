export type CommentResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type PostData = {
  id: number;
  userId: number;
  title: string;
  body: string;
  userName: string;
};
