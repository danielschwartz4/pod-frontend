interface Message {
  to: string;
  body: string;
}

export function sendMessage(message: Message) {
  console.log(message);
  fetch("http://localhost:4001/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("success");
      } else {
        console.log("failed");
      }
    });
}
