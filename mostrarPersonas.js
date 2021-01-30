//Make a Request-Promise GET to a given URL
const requestPromise = require('request-promise');

requestPromise('https://reclutamiento-14cf7.firebaseio.com/personas.json').then((response) => {
    console.log(JSON.parse(response));
});