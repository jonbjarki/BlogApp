import { isAxiosError } from "axios";
import { cookies } from "next/headers";

import {z} from "zod"

export function getErrorMessage(error: unknown): string {
    if (isAxiosError(error) && error.response) {
         if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    return `Error occurred with status code ${error.response.status} and data: ${JSON.stringify(error.response.data)}`;
                } else if (error.request) {
                    return "Error occurred, No response received";
                } else {
                    // Something happened in setting up the request that triggered an Error
                    return error.message;
                }
    }
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

export async function getAuthCookie() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(".AspNetCore.Identity.Application");
    return authCookie ?? null
}

export function getZodIssues(issues: z.core.$ZodIssue[]) {
    const result: Record<string, string> = {};
    const titleError = issues.find(issue=> issue.path[0] === "title");
    const descriptionError = issues.find(issue=> issue.path[0] === "description");
    const contentError = issues.find(issue=> issue.path[0] === "content");
    const coverImageUrlError = issues.find(issue=> issue.path[0] === "coverImageUrl");

    if (titleError) {
        result.title = titleError.code === "too_small" ? "Title is too short" : "Invalid title";
    }

    if (descriptionError) {
        result.description = descriptionError.code === "too_small" ? "Description is too short" : "Invalid description";
    }

    if (contentError) {
        if (contentError.code === "too_small") {
            result.content = "Content is too short";
        }
        else if (contentError.code === "too_big") {
            result.content = "Content is too long";
        }
        else {
            result.content = "Invalid content";
        }
    }

    if (coverImageUrlError) {
        result.coverImageUrl = coverImageUrlError.code === "invalid_type" ? "Not a valid URL!" : "Invalid cover image URL";
    }

    return result;
}