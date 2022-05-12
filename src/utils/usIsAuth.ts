import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

// !! Make it so we can add parameter next_path rather than hard coding
export function useIsAuth() {
  const { data, loading } = useMeQuery();

  const router = useRouter();
  useEffect(() => {
    if (!data?.me && !loading) {
      if (router.pathname == "/project/[id]") {
        router.replace("/login?next=profile");
      } else {
        router.replace("/login?next=" + router.pathname);
      }
    }
  }, [loading, data, router]);
}
