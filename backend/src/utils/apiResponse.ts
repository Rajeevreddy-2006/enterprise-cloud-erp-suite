import { success } from "zod";

export const successResponse = (data: any, message="success") =>({
    success: true,
    message,
    data,
});