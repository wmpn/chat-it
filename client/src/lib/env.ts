class Env {
  static CLIENT_URL: string = process.env.NEXT_PUBLIC_CLIENT_URL as string;
  static SERVER_URL: string = process.env.NEXT_PUBLIC_SERVER_URL as string;
}

export default Env;
