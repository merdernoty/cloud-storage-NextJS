import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("_token");
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect("http://localhost:3000/dashboard/auth");
  }
}

export const config = {
  matcher: ["/dashboard", "/", "/dashboard/profile"],
};
