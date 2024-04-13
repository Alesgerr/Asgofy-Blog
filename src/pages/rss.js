import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RssRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/api/rss");
  }, []);

  return null;
}
