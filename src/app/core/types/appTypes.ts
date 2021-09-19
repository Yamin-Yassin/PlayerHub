import firebase from 'firebase/app';
export interface Post {
  avatar: string;
  postedDate: Date | firebase.firestore.Timestamp | any;
  date: string;
  description: string | null;
  likes: string[];
  photo: string;
  postReviewID: string;
  uid: string;
  username: string;
}

export interface Review {
  avatar: string;
  postedDate: Date | firebase.firestore.Timestamp | any;
  date: string;
  description: string;
  likes: string[];
  score: number;
  'game-id': string;
  postReviewID: string;
  uid: string;
  username: string;
}

export type PostReview = Post | Review;

export interface Game {
  genre: string[];
  'id-game': string;
  images: any;
  name: string;
  platforms: string[] | null;
  'release-date': Date | null | any;
  studio: string;
  score: number | null;
  reviews?: string[] | null;
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
  email: string;
  pushToken: string;
}

export interface Comment {
  description: string;
  username: string;
  uid: string;
  avatar: string;
  postedDate: Date | firebase.firestore.Timestamp | any;
  commentID: string;
  postReviewID: string;
}

export const isReview = (data: PostReview): data is Post =>
  (data as Review)['game-id'] !== undefined;

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
