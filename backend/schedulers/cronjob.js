const cron = require('node-cron');

const DoseHistory = require('../models/doseHistory');
const { setMidNight } = require('../utils/date');

/*
this will run a cron job and
check which reminders have been missed and update them in DoseHistory table
*/
module.exports.markMissedReminders = () => {
  const cronExpression = '0 2 * * *';
    cron.schedule(cronExpression, async() => {

        const today = new Date();
        const yesterday = new Date(today.getTime() - 86400000);
        const yesterdayMidNight = setMidNight(yesterday);
        const filterQuery = {date: yesterdayMidNight, istaken: false, edited: false};
        const updateValues = {
            $set: {
              edited: true
            }
          };
        const updatedDocs = await DoseHistory.updateMany(filterQuery, updateValues);
    });
}