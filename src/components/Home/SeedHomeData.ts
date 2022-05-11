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
      createdAt: "Mar 29 2022",
      updatedAt: "Mar 27 2022",
      projectName: "Learn to play The Entertainer",
      groupSize: 3,
      id: 1,
      userId: 1,
    },
  },
  ExampleProject2: {
    project: {
      milestones: [
        "Launch Pod App!",
        "Get first 10 consistent users",
        "Do 2 user interviews to see what’s missing",
        "Get first 100 consistent users",
        "Do 5 user interviews to see what’s missing",
      ],
      milestoneDates: ["1", "2", "3", "4", "5"],
      milestoneProgress: [3, 3, 2, 1, 1],

      overview:
        "I'm launching this new website called Pod to help users motivate one another!",
      createdAt: "Mar 29 2022",
      updatedAt: "Mar 29 2022",
      projectName: "Create my app called Pod",
      groupSize: 3,
      id: 2,
      userId: 2,
    },
  },
  ExampleProject3: {
    project: {
      milestones: [
        "Read the first three chapters",
        "Read chapters 4-6",
        "Read chapteers 7-9",
        "Read chapteers 10-12",
        "Read chapteers 13-15",
        "Read the last two chapters!!!!!",
      ],
      milestoneDates: ["1", "2", "3", "4", "5", "6"],
      milestoneProgress: [3, 3, 3, 3, 2, 1],

      overview:
        "I know I'm late, but I'm trying to read the Harry Potter Books. First on the list: Harry Potter and the Sorcerer's Stone!",
      createdAt: "Mar 29 2022",
      updatedAt: "Mar 28 2022",
      projectName: "Read Harry Potter (finally)",
      groupSize: 3,
      id: 3,
      userId: 3,
    },
  },
};

export default SeedData;
