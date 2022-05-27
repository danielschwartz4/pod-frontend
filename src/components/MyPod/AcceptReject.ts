import {
  MutationFunctionOptions,
  DefaultContext,
  ApolloCache,
  FetchResult,
} from "@apollo/client";
import {
  UpdateUserFriendRequestsMutation,
  Exact,
  ProjectQuery,
} from "../../generated/graphql";

export const rejectInvite = async (
  updateUserFriendRequests: (
    options?: MutationFunctionOptions<
      UpdateUserFriendRequestsMutation,
      Exact<{
        usernameOrEmail: string;
        friendRequest: number;
        isAdding: boolean;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<
    FetchResult<
      UpdateUserFriendRequestsMutation,
      Record<string, any>,
      Record<string, any>
    >
  >,
  friend: string,
  projectId: number
) => {
  const user = await updateUserFriendRequests({
    variables: {
      usernameOrEmail: friend,
      friendRequest: projectId,
      isAdding: false,
    },
  });
  return user;
};

// function acceptInvite() {
//   await props.updateUserFriendRequests({
//     variables: {
//       usernameOrEmail: friend,
//       friendRequest: props.projectData?.project?.project?.id,
//       isAdding: true,
//     },
//   });
// }
