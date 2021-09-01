export type UserDetails = {
  email: string;
  username: string;
};

export interface PostReview {
  username: string;
  uid?: string;
  avatar: string;
  description: string | null;
  score: number | null;
  photo: string | null;
  datetime: string | null;
  date: string;
}

export interface Reply {
  username: string;
  uid?: string;
  avatar: string;
  description: string;
  datetime: string | null;
  date: string;
}

export interface Game {
  images: string[] | null;
  name: string;
  gameID;
  studio: string;
  score: number | null;
  releaseDate: string | null;
  platforms: string[] | null;
  genre: string[];
  reviews: PostReview[] | null;
}
