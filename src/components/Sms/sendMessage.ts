import { PodUsersQuery } from "../../generated/graphql";

interface Message {
  to: string;
  body: string;
}

export function sendMessage(message: Message) {
  console.log(message);
  fetch(
    process.env.NODE_ENV === "production"
      ? "https://api.poddds.com/api/messages"
      : "http://localhost:4000/api/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("success");
      } else {
        console.log("failed");
      }
    });
}

function compileNumbers(users: PodUsersQuery) {
  const numbers = [];
  users.podUsers.forEach((user) => {
    if (user.phone != null) {
      numbers.push(user.phone);
    }
  });
  return numbers;
}

export function sendMessages(users: PodUsersQuery, body: string) {
  const numbers = compileNumbers(users);
  console.log(numbers);
  numbers.forEach((number) => {
    sendMessage({
      to: number,
      body: body,
    });
  });
}
