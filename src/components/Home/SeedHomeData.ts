import init_elements from "../../utils/initElements";

const SeedData = {
  E1Milestones: [
    "Read over sheet music for Scott Joplin's entertainer",
    "Learn section one of the song!",
    "Learn section two!",
    "Learn section three!",
    "Learn section four!",
    "Memorize the entire song!",
    "Perform at the recital 😃🎹🎉",
  ],
  E1milestoneDates: ["1", "2", "3", "4", "5", "6", "7"],
  E1milestoneProgress: [3, 3, 3, 2, 1, 1, 1],
  E1isMainProject: false,
  E1Overview:
    "I'm learning a new Scott Joplin song for my upcoming recital in July! Excited & Nervous!",
  E1CreatedAt: new Date().toString(),
  E1UpdatedAt: new Date().toString(),
  E1ProjectName: "The Entertainer",

  // const elements = init_elements(
  //   milestones,
  //   milestoneDates,
  //   milestoneProgress,
  //   isMainProject
  // );
};

export default SeedData;
