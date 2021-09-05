export type UserDetails = {
  email: string;
  username: string;
};

export interface Post {
  avatar: string;
  date: string;
  description: string | null;
  likes: string[];
  photo: string;
  'post-id': string;
  uid: string;
  username: string;
}

export interface Review {
  avatar: string;
  date: string;
  description: string;
  likes: string[];
  score: number;
  'game-id': string;
  'review-id': string;
  uid: string;
  username: string;
}

export type PostReview = Post | Review;

export interface Comment {
  username: string;
  uid: string;
  'comment-id': string;
  'post-review-id': string;
  avatar: string;
  description: string;
  date: string;
}

export interface Game {
  genre: string[];
  'id-game': string;
  images: any;
  name: string;
  platforms: string[] | null;
  'release-date': string | null;
  studio: string;
  score?: number | null;
  reviews?: PostReview[] | null;
}

export interface Profile {
  username: string;
  name: string;
  description: string;
  avatar: string;
  uid: string;
  games: string[];
  posts: string[];
  reviews: string[];
  friends: string[];
  achievements: number;
}

export const isPost = (data: PostReview): data is Post =>
  (data as Post)['post-id'] !== undefined;
