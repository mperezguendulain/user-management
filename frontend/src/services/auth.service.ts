export class AuthService {
  static Login = async (email: string, password: string): Promise<string> => {
    const UM_API_URL = process.env.NEXT_PUBLIC_UM_API_URL;
    console.log({ url: UM_API_URL });
    const LOGIN_URL = `${UM_API_URL}/api/auth/login`;
    const response = await fetch(LOGIN_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const loginResponse = await response.json();

    if (!loginResponse.success) {
      throw new Error(loginResponse.message);
    }

    return loginResponse.token;
  };
}
