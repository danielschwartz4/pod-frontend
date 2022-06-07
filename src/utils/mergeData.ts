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
    // !! order by clause right here
  );

  return merged;
}
