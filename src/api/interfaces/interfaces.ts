interface SignUpData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Book {
  author: string;
  id: string;
  postAuthorId: string;
  title: string;
  voters?: User[];
  readers?: User[];
  isRead: boolean;
  description: string;
}
interface Meeting {
  id: string;
  hostId: string;
  host: User;
  address: string;
  date: Date;
  description: string;
  bookTitle: string;
  participants?: User[];
}

type feedNames =
  | "suggested-books"
  | "read-books"
  | "user-books"
  | "scheduled-meetings"
  | "past-meetings"
  | "suggest-book"
  | "suggest-meeting";

export type { SignUpData, LoginData, User, Book, feedNames, Meeting };
