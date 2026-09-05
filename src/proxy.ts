import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@insforge/sdk/ssr/middleware";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/setup"];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  await updateSession({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && !PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    const hasSession =
      request.cookies.has("insforge_access_token") || response.cookies.has("insforge_access_token");
    if (!hasSession) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
