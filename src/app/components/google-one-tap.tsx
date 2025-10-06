"use client";
import { useEffectOnce } from "react-use";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const GoogleOneTap = () => {
  const router = useRouter();
  useEffectOnce(() => {
    authClient.oneTap({
      fetchOptions: {
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    });
  });
  return null;
};
