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
}

interface Book{
  author: string;
  id: string;
  postAuthorId: string;
  title: string;
  voters: User[]
}

export type { SignUpData, LoginData, User, Book };
