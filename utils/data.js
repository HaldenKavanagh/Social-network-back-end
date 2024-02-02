const userData = [
  {
    username: "user1",
    email: "user1@email.com",
  },
  {
    username: "user2",
    email: "user2@email.com",
  },
  {
    username: "user2",
    email: "user2@email.com",
  },
  {
    username: "user3",
    email: "user3@email.com",
  },
  {
    username: "user4",
    email: "user4@email.com",
  },
  {
    username: "user5",
    email: "user5@email.com",
  },
];

const thoughtData = [
  {
    thoughtText: "I think I want pizza",
    username: "user1",
    reactions: [
      {
        reactionBody: "I like interesting, thought!",
        username: "user4",
      },
      {
        reactionBody: "Sometimes I have thoughts same :D",
        username: "user3",
      },
    ],
  },
  {
    thoughtText: "I think I want view film",
    username: "user2",
    reactions: [
      {
        reactionBody: "I like stunning video movie!",
        username: "user1",
      },
      {
        reactionBody: "Sometimes I realize me also",
        username: "user3",
      },
    ],
  },
  {
    thoughtText: "I thought about a park walking",
    username: "user5",
    reactions: [
      {
        reactionBody: "Me too twin",
        username: "user4",
      },
      {
        reactionBody: "Sometimes I have thoughts same :D",
        username: "user3",
      },
    ],
  },
  {
    thoughtText: "I think about fish fry",
    username: "user3",
    reactions: [
      {
        reactionBody: "unlimited fish fry friday at village in!",
        username: "user4",
      },
      {
        reactionBody: "good thought, Friend",
        username: "user3",
      },
    ],
  },
  {
    thoughtText: "im thinking of videogam",
    username: "user5",
    reactions: [
      {
        reactionBody: "I like fortnite",
        username: "user2",
      },
      {
        reactionBody: "cosign brother ",
        username: "user1",
      },
    ],
  },
];

module.exports = { userData, thoughtData };
