
module.exports.getDay = function () {
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    var day = today.toLocaleDateString("en-US", options);

    return day;
}