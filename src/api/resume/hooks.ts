import { useMutation } from "@tanstack/react-query";
import { createResume } from "./queries";

export const useCreateResume = () => {
    return useMutation({
      mutationFn: createResume
    });
};