import { ProjectsQuery, RecurringTasksQuery } from "../generated/graphql";

export default function mergeData(
  tasks: RecurringTasksQuery,
  projects: ProjectsQuery,
  orderBy: string
) {
  const taskReduction = tasks?.recurringTasks?.reduce((acc, task) => {
    acc["t" + task.id] = {
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
    return acc;
  }, []);

  const projectReduction = projects?.projects?.reduce((acc, project) => {
    acc["p" + project.id] = {
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
    return acc;
  }, {});

  const merged = Object.assign(
    {},
    taskReduction,
    projectReduction
    // orderBy === "createdAt"
    //   ? Object?.values(taskReduction).sort((a, b) =>
    //       a["createdAt"] > b["createdAt"] ? -1 : 1
    //     )
    //   : Object?.values(taskReduction).sort((a, b) =>
    //       a["updatedAt"] > b["updatedAt"] ? -1 : 1
    //     )
  );

  return merged;
}
