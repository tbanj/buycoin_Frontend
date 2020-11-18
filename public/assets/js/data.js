

function getDays(date1) {
    // var date1 = new Date("2020-02-17T01:26:30Z");
    var date2 = new Date();
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.floor(Difference_In_Days);
}

function getDate(data) {
    let extract = new Date(data).toString().split(" ");
    return `${extract[2]} ${extract[1]}`
}

// getRepoData(data);

