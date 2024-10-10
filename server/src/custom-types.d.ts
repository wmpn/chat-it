interface AuthUser {
  name: string;
  email: string;
  id: number;
}

declare namespace Express {
  export interface Request {
    user?: AuthUser;
  }
}
