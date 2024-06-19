const cron =require('node-cron');

const test1 = cron.schedule('* * * * *',()=>
{
    console.log('running a task everyminute')
});

exports.test1=test1;