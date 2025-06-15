// Next Imports
import { NextResponse } from "next/server";

// Types
import { APIResponse } from "@/types";

export function ResponseSuccess(statusCode: number, data: object): NextResponse<APIResponse> {
    return NextResponse.json({ success: true, data }, { status: statusCode });
}

export function ResponseError(statusCode: number, message: string): NextResponse<APIResponse> {
    return NextResponse.json({ success: false, message }, { status: statusCode });
}