const users = [
  {
    id: '1',
    name: 'Harman Saunderson',
    login: 'hsaunderson0@state.gov',
    password: 'fKEIB9GiWuwG'
  },
  {
    id: '2',
    name: 'Harper Dany',
    login: 'hdany1@technorati.com',
    password: '8MeUgqyU8V0w'
  },
  {
    id: '3',
    name: 'Maria Lghan',
    login: 'mlghan2@earthlink.net',
    password: 'mp43HDB'
  }
];

const boards = [
  {
    id: '0',
    title: 'board 1',
    columns: [
      {
        id: '0',
        title: 'column title',
        order: 0
      }
    ]
  },
  {
    id: '1',
    title: 'board 2',
    columns: [
      {
        id: '0',
        title: 'column title',
        order: 0
      }
    ]
  },
  {
    id: '2',
    title: 'board 3',
    columns: [
      {
        id: '0',
        title: 'column title',
        order: 0
      }
    ]
  }
];

const tasks = [
  {
    id: '0',
    title: 'task 0 title',
    order: 0,
    description: 'task 0 description',
    userId: '1',
    boardId: '1',
    columnId: '0'
  },
  {
    id: '1',
    title: 'task 1 title',
    order: 1,
    description: 'task 1 description',
    userId: '1',
    boardId: '1',
    columnId: '0'
  },
  {
    id: '2',
    title: 'task 2 title',
    order: 0,
    description: 'task 2 description',
    userId: '2',
    boardId: '2',
    columnId: '0'
  },
  {
    id: '3',
    title: 'task 3 title',
    order: 0,
    description: 'task 3 description',
    userId: '2',
    boardId: '2',
    columnId: '0'
  },
  {
    id: '4',
    title: 'task 4 title',
    order: 4,
    description: 'task 4 description',
    userId: '2',
    boardId: '2',
    columnId: '0'
  }
];

module.exports = {
  users,
  boards,
  tasks
};
