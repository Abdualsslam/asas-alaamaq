import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ar", "en"];
const defaultLocale = "ar";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and files with an extension (like favicon.ico, images)
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.avif$|.*\\.ico$|.*\\.css$).*)"],
};
