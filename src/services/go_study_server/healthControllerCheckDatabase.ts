// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 GET /api/health/database */
export async function healthControllerCheckDatabase(options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>("/api/health/database", {
    method: "GET",
    ...(options || {}),
  });
}
