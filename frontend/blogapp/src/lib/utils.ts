import { isAxiosError } from "axios";

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