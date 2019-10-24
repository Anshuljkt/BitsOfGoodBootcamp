const timeBlock = document.getElementById('time');
setInterval(() => {
    const currTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    timeBlock.innerText = currTime;
}, 999);