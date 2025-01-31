import { fetchWithAuth } from "@/lib/fetchWithAuth";
import type { User, UserRole, UserStatus } from "@/types/users.type";

export class UserService {
  static GetAuthenticatedUser = async (): Promise<User> => {
    const UM_API_URL = process.env.NEXT_PUBLIC_UM_API_URL;
    console.log({ url: UM_API_URL });
    const LOGIN_URL = `${UM_API_URL}/api/me`;
    const response = await fetchWithAuth(LOGIN_URL);
    const loginResponse = await response.json();

    if (!loginResponse.success) {
      throw new Error(loginResponse.message);
    }

    return loginResponse.data as User;
  };

  static GetUsers = async ({
    page,
    limit,
    search,
    filterByRole,
    filterByStatus
  }: {
    page: number;
    limit: number;
    search: string;
    filterByRole: UserRole | "";
    filterByStatus: UserStatus | "";
  }): Promise<User[]> => {
    const UM_API_URL = process.env.NEXT_PUBLIC_UM_API_URL;
    const LOGIN_URL = `${UM_API_URL}/api/users?page=${page}&limit=${limit}${
      search !== "" ? `&search=${search}` : ""
    }${filterByRole !== "" ? `&role=${filterByRole}` : ""}${
      filterByStatus !== "" ? `&status=${filterByStatus}` : ""
    }`;
    const response = await fetchWithAuth(LOGIN_URL);
    const loginResponse = await response.json();

    if (!loginResponse.success) {
      throw new Error(loginResponse.message);
    }

    return loginResponse.data as User[];
  };
}
