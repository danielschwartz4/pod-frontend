import pink_monster from "../images/Avatars/pink_monster.jpeg";
import orange_monster from "../images/Avatars/orange_monster.jpeg";
import green_monster from "../images/Avatars/green_monster.jpeg";
import blue_monster from "../images/Avatars/pink_monster.jpeg";

const avatarMap = (avatarInt: number) => {
  const mapping = {
    1: pink_monster.src,
    2: orange_monster.src,
    3: green_monster.src,
    4: blue_monster.src,
  };

  return mapping[avatarInt];
};

export default avatarMap;
