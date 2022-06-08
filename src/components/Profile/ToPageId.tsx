import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ProjectQuery } from "../../generated/graphql";

interface ToPageIdProps {
  // project: ProjectQuery["project"]["project"];
  toId: string;
}

export const ToProjectPageId: React.FC<ToPageIdProps> = ({
  children,
  toId,
}) => {
  return (
    <NextLink href="/project/[id]" as={`/project/${toId}`}>
      <Link>{children}</Link>
    </NextLink>
  );
};

export const ToTaskPageId: React.FC<ToPageIdProps> = ({ children, toId }) => {
  return (
    <NextLink href="/task/[id]" as={`/task/${toId}`}>
      <Link>{children}</Link>
    </NextLink>
  );
};
