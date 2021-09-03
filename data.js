const data = {
  data: {
    human: {
      id: 1,
      name: 'Ash',
    },
  },
};

const data2 = {
  data: {
    locationsByIds: [
      {
        id: 1,
        name: 'Earth (Unknown dimension)',
        color: {
          blue: false,
        },
      },
      {
        id: 2,
        name: 'Gazorpazorp',
        color: {
          blue: true,
        },
      },
    ],
    characters: {
      info: {
        count: 671,
      },
    },
  },
};

const data3 = {
  data: {
    locationsByIds: [
      {
        name: 'Earth (Unknown dimension)',
        id: '30',
        residents: [
          {
            name: 'Diane Sanchez',
            id: '94',
            episode: [
              {
                id: '22',
                name: 'The Rickshank Rickdemption',
                air_date: 'April 1, 2017',
              },
            ],
          },
        ],
      },
      {
        name: 'Gazorpazorp',
        id: '40',
        residents: [
          {
            name: 'Jackie',
            id: '168',
            episode: [
              {
                id: '7',
                name: 'Raising Gazorpazorp',
                air_date: 'March 10, 2014',
              },
            ],
          },
          {
            name: 'Ma-Sha',
            id: '211',
            episode: [
              {
                id: '7',
                name: 'Raising Gazorpazorp',
                air_date: 'March 10, 2014',
              },
            ],
          },
          {
            name: 'Veronica Ann Bennet',
            id: '376',
            episode: [
              {
                id: '7',
                name: 'Raising Gazorpazorp',
                air_date: 'March 10, 2014',
              },
            ],
          },
        ],
      },
    ],
  },
};

module.exports = {
  data,
  data2,
  data3,
};
