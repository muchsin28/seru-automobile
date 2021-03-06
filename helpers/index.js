
const bcrypt = require('bcrypt');
module.exports = {
  hashPassword: async (password, saltRounds = 10) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      if (!salt) throw new Error();

      return await bcrypt.hash(password, salt);
    } catch (error) {
      return error;
    }
  },
  checkPassword: async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      return error;
    }
  },
  parseSort: (sort) => {
    const arrSort = [];
    const criterias = sort.split(',');

    criterias.forEach(criteria => {
      criteria = criteria.trim().split('_');
      const order = criteria.pop();
      const column = criteria.join('_');
      arrSort.push([column, order]);
    });

    return arrSort;
  },
  randomString: (string_length) => {
    let string = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 1; i <= string_length; i++) {
      const index = Math.floor(Math.random() * str.length);
      const char = str.charAt(index);

      string += char;
    }

    return string;
  }

};
