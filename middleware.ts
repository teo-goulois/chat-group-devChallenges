import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { i } from "vitest/dist/index-ea17aa0c";
import getEnvVar from "./utils/getEnvVar";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/channels", "/channels/:id*"] };


