import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "@/config/routes.js";

const tokenCache = {};

export async function middleware(request) {
  const currentUser = request.cookies.get("token")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!currentUser || Date.now() > JSON.stringify(currentUser).expiredAt) {
      request.cookies.delete("token");
      const response = NextResponse.redirect(
        new URL("/account/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }

    try {
      let verificationResult = tokenCache[currentUser];
      if (!verificationResult) {
        const response = await fetch("http://localhost:5000/api/user/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${currentUser}` },
        });
        const responseData = await response.json();
        verificationResult = {
          responseDataToken: responseData.token,
        };

        tokenCache[currentUser] = verificationResult;
      }
      const { responseDataToken } = verificationResult;
      if (currentUser !== responseDataToken) {
        const response = NextResponse.redirect(
          new URL("/account", request.url)
        );

        return response;
      }
    } catch (error) {
      console.error("Verification Error:", error);
    }
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }
}
export const config = {
  matcher: ["/account/:path*", "/login"],
};
