import { useRouter } from "next/router";

export const useGetIntId = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  // let type: string;
  // let intId: number;
  // if (typeof router.query.id === "string") {
  //   type = router.query.id[0];
  //   intId = parseInt(router.query.id.slice(1));
  // } else {
  //   type = "n";
  //   intId = -1;
  // }
  // return [type, intId] as [string, number];
  return intId;
};
