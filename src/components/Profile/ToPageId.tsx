import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ProjectQuery } from "../../generated/graphql";

interface ToPageIdProps {
  // project: ProjectQuery["project"]["project"];
  toId: string;
}

// const ToPageId: React.FC<ToPageIdProps> = ({ children, project }) => {
//   return (
//     <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
//       <Link>{children}</Link>
//     </NextLink>
//   );
// };

const ToPageId: React.FC<ToPageIdProps> = ({ children, toId }) => {
  console.log("HELLOOOO");
  console.log(toId);
  return (
    <NextLink href="/project/[id]" as={`/project/${toId}`}>
      <Link>{children}</Link>
    </NextLink>
  );
};

export default ToPageId;
