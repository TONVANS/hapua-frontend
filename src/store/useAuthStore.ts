import { create } from "zustand";
import Cookies from "js-cookie";
import { authService } from "@/services/auth.service";
import { LoginDto, User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => void;
  initialize: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: () => {
    if (typeof window === "undefined") return;
    const token = Cookies.get("hapua_token");
    const userStr = Cookies.get("hapua_user");

    if (
      token &&
      token !== "undefined" &&
      token !== "null" &&
      userStr &&
      userStr !== "undefined" &&
      userStr !== "null"
    ) {
      try {
        const user = JSON.parse(userStr) as User;
        set({
          token,
          user,
          isAuthenticated: true,
        });
      } catch {
        Cookies.remove("hapua_token");
        Cookies.remove("hapua_user");
        set({ token: null, user: null, isAuthenticated: false });
      }
    } else if (
      token === "undefined" ||
      token === "null" ||
      userStr === "undefined" ||
      userStr === "null"
    ) {
      Cookies.remove("hapua_token");
      Cookies.remove("hapua_user");
      set({ token: null, user: null, isAuthenticated: false });
    }
  },

  login: async (credentials: LoginDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      // Support both unwrapped { accessToken, user } and wrapped { data: { accessToken, user } }
      const resData = (response as any)?.data || response;
      const accessToken = resData?.accessToken;
      const user = resData?.user;

      if (!accessToken || !user) {
        throw new Error("Invalid response received from authentication server.");
      }

      // Save in cookies (4 hours expiration)
      Cookies.set("hapua_token", accessToken, {
        expires: 4 / 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      Cookies.set("hapua_user", JSON.stringify(user), {
        expires: 4 / 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      set({
        token: accessToken,
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: unknown) {
      let message = "Failed to sign in. Please check your credentials.";
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        if (axiosErr.response?.data?.message) {
          message = axiosErr.response.data.message;
        }
      }
      set({
        error: message,
        isLoading: false,
        isAuthenticated: false,
      });
      throw err;
    }
  },

  logout: () => {
    Cookies.remove("hapua_token");
    Cookies.remove("hapua_user");
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
    });
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  },

  clearError: () => set({ error: null }),
}));
