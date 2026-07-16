import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiFailure = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export class ApiError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, data }, init);
}

export function apiFailure(status: number, code: string, message: string, details?: unknown) {
  return NextResponse.json<ApiFailure>(
    {
      ok: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status },
  );
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return apiFailure(error.status, error.code, error.message, error.details);
  }

  if (error instanceof ZodError) {
    return apiFailure(400, "VALIDATION_ERROR", "Invalid request body.", error.flatten());
  }

  console.error(error);
  return apiFailure(500, "INTERNAL_SERVER_ERROR", "Something went wrong.");
}
