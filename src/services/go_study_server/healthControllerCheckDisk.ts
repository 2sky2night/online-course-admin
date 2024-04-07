// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 GET /api/health/disk */
export async function healthControllerCheckDisk(options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>("/api/health/disk", {
    method: "GET",
    ...(options || {}),
  });
}
