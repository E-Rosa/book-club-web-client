interface SignUpData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface LoginData{
  email: string;
  password: string;
}

interface User{
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Book{
  author: string;
  id: string;
  postAuthorId: string;
  title: string;
  voters?: User[];
  readers?: User[];
  isRead: boolean;
  description: string;
}



type GetBooksFilter = "suggested" | "read" | "my-suggestions"

export type { SignUpData, LoginData, User, Book, GetBooksFilter };
