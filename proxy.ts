import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // studioradial.nl → redirect to studioradial.com/nl
  if (host.includes("studioradial.nl")) {
    const url = request.nextUrl.clone();
    const path = url.pathname;
    // Already on /nl path? Just redirect domain
    const nlPath = path.startsWith("/nl") ? path : `/nl${path === "/" ? "" : path}`;
    return NextResponse.redirect(
      new URL(`https://www.studioradial.com${nlPath}`, request.url),
      308
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|llms.txt|sitemap.xml|robots.txt|.*\\..*).*)"],
};
