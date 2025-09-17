import { NextRequest } from "next/server";
import { createApiHandler } from "@/lib/apiUtils";

// 채팅 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return createApiHandler({
    endpoint: `/chat/${params.id}`,
    method: "GET",
    request,
  });
}

// 채팅 저장
export async function POST(request: NextRequest) {
  return createApiHandler({
    endpoint: `/chat`,
    method: "POST",
    request,
    transformBody: (body) => ({ ...body }),
  });
}

// 채팅 업데이트
export async function PUT(request: NextRequest) {
  return createApiHandler({
    endpoint: `/chat`,
    method: "PUT",
    request,
    transformBody: (body) => ({ ...body }),
  });
}
