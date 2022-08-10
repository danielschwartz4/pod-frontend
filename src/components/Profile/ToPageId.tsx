import { Link, Text, Tooltip } from "@chakra-ui/react";
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
        display={"flex"}
      >
        {children}
        <div style={{ margin: "5px" }} />
        <Tooltip
          hasArrow
          label={"# of reputation points you have in your pod"}
          bg="gray.300"
          color="black"
          placement="bottom"
          fontFamily={"ubuntu"}
        >
          <Text fontWeight={"normal"} m={0}>
            {task?.points}
          </Text>
        </Tooltip>
      </Link>
    </NextLink>
  );
};
