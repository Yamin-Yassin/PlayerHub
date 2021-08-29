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
}

export interface Game {
  images: string[] | null;
  name: string;
  studio: string;
  score: number | null;
  releaseDate: string | null;
  platforms: string[] | null;
  genre: string[];
  reviews: PostReview[] | null;
}
