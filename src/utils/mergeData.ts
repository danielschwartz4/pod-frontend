import {
  MessagesQuery,
  ProjectsQuery,
  RecurringTasksQuery,
  SingleTasksQuery,
} from "../generated/graphql";

export default function mergeData(
  tasks: RecurringTasksQuery,
  projects: ProjectsQuery,
  orderBy: string
) {
  const taskReduction = tasks?.recurringTasks?.reduce((acc, task) => {
    acc["t" + task.id] = {
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      podId: task.podId,
    };
    return acc;
  }, []);

  const projectReduction = projects?.projects?.reduce((acc, project) => {
    acc["p" + project.id] = {
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      podId: project.podId,
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

export function mergeNotesMessages(
  notes: SingleTasksQuery,
  messages: MessagesQuery
) {
  console.log("notes", notes["recentPodSingleTasks"]["singleTasks"]);
  console.log("messages", messages);
  const notesReduction = notes["recentPodSingleTasks"]["singleTasks"]?.reduce(
    (acc, note) => {
      acc["n" + note.id] = {
        date: note.updatedAt,
        text: note.notes,
        isMessage: false,
        username: note.user?.username,
        avatar: note.user?.avatar,
      };
      return acc;
    },
    {}
  );

  const messageReduction = messages?.messages?.messages?.reduce(
    (acc, message) => {
      acc["m" + message.id] = {
        date: message.createdAt,
        text: message.message,
        isMessage: true,
        username: message.user?.username,
        avatar: message.user?.avatar,
      };
      return acc;
    },
    {}
  );

  const merged = Object.assign(
    {},
    notesReduction,
    messageReduction
    // !! order by clause right here
  );

  // sort by date
  const sorted = Object.values(merged).sort((a, b) => {
    return new Date(b["date"]).getTime() - new Date(a["date"]).getTime();
  });

  return sorted;
}
