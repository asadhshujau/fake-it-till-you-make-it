import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(request: VercelRequest, response: VercelResponse) {
  console.log(request)
  const endpoints = [
    { name: "Users List", url: "/api/users/users" },
    { name: "Single User", url: "/api/users/user" },
    { name: "Posts List", url: "/api/posts/posts" },
    { name: "Single Post", url: "/api/posts/post" },
    { name: "Comments List", url: "/api/comments/comments" },
    { name: "Single Comment", url: "/api/comments/comment" }
  ];

  response.setHeader("Content-Type", "application/json");
  response.status(200).json(endpoints);
}
