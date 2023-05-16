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
  metadata?: BookMetadata;
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

interface BarChartData {
  name: string;
  value: number;
}

type feedNames =
  | "suggested-books"
  | "read-books"
  | "user-books"
  | "scheduled-meetings"
  | "past-meetings"
  | "suggest-book"
  | "suggest-meeting";

type readBooksFeedNames = "list" | "statistics";

interface BookStatistics {
  totalBooks: number;
  totalPagesRead: number;
  avaragePagesPerBook: number;
  bookCountByCentury: BookCountByCentury[];
  bookCountByGender: BookCountByGender[];
  bookCountByTag: BookCountByTag[];
  bookCountByAuthorNationality: BookCountByAuthorNationality[];
}

interface BookCountByCentury {
  name: number;
  value: number;
}
interface BookCountByGender {
  name: string;
  value: number;
}
interface BookCountByTag {
  name: string;
  value: number;
}
interface BookCountByAuthorNationality {
  name: string;
  value: number;
}
interface BookMetadata {
  year: number;
  pages: number;
  authorNationality: string;
  authorGender: string;
  tags: Tag[];
}
interface Tag {
  name: string;
  id: string;
}

type TagColors = "white" | "blue" | "green" | "red";

export type {
  BookMetadata,
  BarChartData,
  SignUpData,
  LoginData,
  User,
  Book,
  feedNames,
  Meeting,
  readBooksFeedNames,
  BookStatistics,
  Tag,
  TagColors,
};
