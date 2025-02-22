import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
} from "@/constants/cookies";
import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { getCookie, setCookie } from "cookies-next";
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const apiClient = {
  post: <TResponse = unknown, RRequest = unknown>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>
  ): Promise<AxiosResponse<TResponse, RRequest>> => {
    const res = client.post<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config
    );
    return res;
  },

  get: <TResponse = unknown, TQueryParams = unknown>(
    url: string,
    params?: TQueryParams,
    config?: AxiosRequestConfig<TQueryParams>
  ): Promise<AxiosResponse<TResponse, TQueryParams>> => {
    return client.get<TResponse, AxiosResponse<TResponse, TQueryParams>>(url, {
      params,
      ...config,
    });
  },

  put: <TResponse = unknown, RRequest = unknown>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>
  ): Promise<AxiosResponse<TResponse, RRequest>> => {
    return client.put<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config
    );
  },
};

// async function getAccessToken(): Promise<string | null> {
//   let accessToken: string | undefined = undefined;

//   try {
//     accessToken = getCookie(COOKIE_KEY_ACCESS_TOKEN);
//     if (accessToken) {
//       const payload = accessTokenPayloadSchema.parse(jwtDecode(accessToken));
//       if (payload.exp * 1000 > Date.now()) {
//         return accessToken;
//       }
//     }
//   } catch (error) {
//     console.error("Failed to parse access token payload", error);
//   }

//   let refreshToken: string | undefined = undefined;

//   try {
//     refreshToken = getCookie(COOKIE_KEY_REFRESH_TOKEN);
//     if (!refreshToken) {
//       return null;
//     }
//   } catch (error) {
//     console.error("Failed to get refresh token", error);
//     return null;
//   }

//   if (!isRefreshing) {
//     isRefreshing = true;
//     refreshPromise = refreshTokenApi({ refreshToken })
//       .then((response) => {
//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//           response.tokens;
//         setCookie(COOKIE_KEY_ACCESS_TOKEN, newAccessToken);
//         setCookie(COOKIE_KEY_REFRESH_TOKEN, newRefreshToken);
//         return newAccessToken;
//       })
//       .catch((error) => {
//         throw error;
//       })
//       .finally(() => {
//         isRefreshing = false;
//         refreshPromise = null;
//       });
//   }

//   return refreshPromise;
// }

client.interceptors.request.use(
  async (config) => {
    // const accessToken = await getAccessToken();
    // if (accessToken) {
    //   config.headers["Authorization"] = `Bearer ${accessToken}`;
    // }
    return config;
  },
  null,
  {
    runWhen: (request) => !request.headers["No-Auth"],
  }
);
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        throw {
          type: "NetworkError",
          message: "Failed to connect to the server",
        };
      }
      throw error.response?.data;
    }
    throw {
      type: "UnknownError",
      message: "An unknown error occurred",
    };
  }
);
