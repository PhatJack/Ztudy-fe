import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/dashboard",
        "/profile",
        "/solo",
        "/study-goal",
        "/leaderboard",
        "/room",
        "/room/:roomCode*",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/privacy-policy",
        "/terms-and-conditions",
      ],
      disallow: "/private/",
    },
    sitemap: "https://ztudy.io.vn/sitemap.xml",
  };
}
