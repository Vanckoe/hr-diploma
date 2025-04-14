import { apiClient } from "@/lib/api";
import { getTokens } from "@/lib/auth/tokens";
import { UserResume } from "../post/types";

export const createResume = async (data: UserResume) => {
    try {
        const { access } = getTokens();
        if (!access) throw new Error("Требуется авторизация");

        // Преобразование данных
        const payload = {
            ...data,
            education: data.education ? {
                university: data.education.university,
                faculty: data.education.faculty || "",
                graduation_year: data.education.graduation_year
            } : {}
        };

        const response = await apiClient.request('user/resume/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(payload)
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Ошибка при создании резюме";
        throw new Error(errorMessage);
    }
};