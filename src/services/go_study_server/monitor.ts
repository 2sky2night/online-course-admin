// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 GET /api/monitor/database */
export async function monitorControllerCheckDatabase(options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>("/api/monitor/database", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/monitor/error-log */
export async function monitorControllerGetErrorLog(options?: { [key: string]: any }) {
  return request<any>("/api/monitor/error-log", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取系统资源使用情况 获取系统资源使用情况 GET /api/monitor/usage */
export async function monitorControllerGetSystemUsage(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: API.SystemUsageDto }>("/api/monitor/usage", {
    method: "GET",
    ...(options || {}),
  });
}
