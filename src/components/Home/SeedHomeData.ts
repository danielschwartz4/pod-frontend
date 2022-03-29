import init_elements from "../../utils/initElements";

const SeedData = {
  ExampleProject1: {
    project: {
      milestones: [
        "Read over sheet music for Scott Joplin's entertainer",
        "Learn section one of the song!",
        "Learn section two!",
        "Learn section three!",
        "Learn section four!",
        "Memorize the entire song!",
        "Perform at the recital 😃🎹🎉",
      ],
      milestoneDates: ["1", "2", "3", "4", "5", "6", "7"],
      milestoneProgress: [3, 3, 3, 2, 1, 1, 1],

      overview:
        "I'm learning a new Scott Joplin song for my upcoming recital in July! Excited & Nervous!",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      projectName: "The Entertainer",
      groupSize: 3,
      id: 1,
      userId: 1,
    },
    isMainProject: false,
  },

  // const elements = init_elements(
  //   milestones,
  //   milestoneDates,
  //   milestoneProgress,
  //   isMainProject
  // );
};

export default SeedData;
