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

export function sendMessages(numbers: string[], body: string) {
  numbers.forEach((number) => {
    sendMessage({
      to: number,
      body: body,
    });
  });
}
