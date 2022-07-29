import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { ProjectQuery, RecurringTaskQuery } from "../../generated/graphql";

interface ToProjectPageIdProps {
  project: ProjectQuery["project"]["project"];
}

interface ToTaskPageIdProps {
  task: RecurringTaskQuery["recurringTask"]["task"];
}

export const ToProjectPageId: React.FC<ToProjectPageIdProps> = ({
  children,
  project,
}) => {
  return (
    <NextLink href="/project/[id]" as={`/project/${project?.id}`}>
      <Link>{children}</Link>
    </NextLink>
  );
};

export const ToTaskPageId: React.FC<ToTaskPageIdProps> = ({
  children,
  task,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <NextLink href="/task/[id]" as={`/task/${task?.id}`}>
      <Link
        onClick={() => setLoading(true)}
        cursor={!loading ? "pointer" : "progress"}
      >
        {children}
      </Link>
    </NextLink>
  );
};
