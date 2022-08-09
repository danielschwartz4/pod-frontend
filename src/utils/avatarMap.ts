import av1 from "../images/Avatars/av1.svg";
import av2 from "../images/Avatars/av2.svg";
import av3 from "../images/Avatars/av3.svg";
import av4 from "../images/Avatars/av4.svg";
import av5 from "../images/Avatars/av5.svg";
import av6 from "../images/Avatars/av6.svg";
import av7 from "../images/Avatars/av7.svg";
import av8 from "../images/Avatars/av8.svg";
import av9 from "../images/Avatars/av9.svg";
import av10 from "../images/Avatars/av10.svg";
import av11 from "../images/Avatars/av11.svg";
import av12 from "../images/Avatars/av12.svg";
import av13 from "../images/Avatars/av13.svg";
import av14 from "../images/Avatars/av14.svg";
import av15 from "../images/Avatars/av15.svg";
import av16 from "../images/Avatars/av16.svg";
import av17 from "../images/Avatars/av17.svg";
import av18 from "../images/Avatars/av18.svg";
import av19 from "../images/Avatars/av19.svg";
import av20 from "../images/Avatars/av20.svg";
import av21 from "../images/Avatars/av21.svg";
import av22 from "../images/Avatars/av22.svg";

// https://codesandbox.io/s/react-random-avatar-3o1t9?file=/src/App.js
const avatarMap = (avatarInt: number) => {
  const mapping = {
    1: av1.src,
    2: av2.src,
    3: av3.src,
    4: av4.src,
    5: av5.src,
    6: av6.src,
    7: av7.src,
    8: av8.src,
    9: av9.src,
    10: av10.src,
    11: av11.src,
    12: av12.src,
    13: av13.src,
    14: av14.src,
    15: av15.src,
    16: av16.src,
    17: av17.src,
    18: av18.src,
    19: av19.src,
    20: av20.src,
    21: av21.src,
    22: av22.src,
  };

  return mapping[avatarInt];
};

export default avatarMap;
