'use strict';

import config from '../../../config/db';
import Sequelize from 'sequelize';

var db = {
    sequelize: new Sequelize(config.station.database, config.station.username, config.station.password, config.station.options)
};

db.Channel = db.sequelize.import('./channel.model');

module.exports = db;