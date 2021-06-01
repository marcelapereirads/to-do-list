const db = require('./db');

const Tasks = db.sequelize.define('tasks', {
    name: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.TEXT
    },
    done: {
        type: db.Sequelize.BOOLEAN
    }
});

//Tasks.sync();

module.exports = Tasks;
