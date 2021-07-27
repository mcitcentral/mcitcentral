"use strict";
exports.__esModule = true;
exports.Semesters = exports.getSemesters = exports.getSemester = exports.Rating = exports.Difficulty = void 0;
exports.Difficulty = {
    1: "Very Easy",
    2: "Easy",
    3: "Medium",
    4: "Hard",
    5: "Very Hard"
};
exports.Rating = {
    1: "Strongly Disliked",
    2: "Disliked",
    3: "Neutral",
    4: "Liked",
    5: "Strongly Liked"
};
// Determine season based on a date
function getSemester(date) {
    var year_str = String(date.getFullYear());
    var month = date.getMonth();
    if (month < 6) {
        return "Spring" + year_str;
    }
    else if (month < 9) {
        return "Summer" + year_str;
    }
    else {
        return "Fall" + year_str;
    }
}
exports.getSemester = getSemester;
// Generate an array of Semesters using getSeason and a start_date and end_date
function getSemesters(start_date, end_date) {
    start_date = new Date(start_date.getFullYear(), start_date.getMonth(), 1);
    end_date = new Date(end_date.getFullYear(), end_date.getMonth(), 1);
    var semesters = new Set;
    var current_date = start_date;
    while (current_date <= end_date) {
        semesters.add(getSemester(current_date));
        current_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 1);
    }
    return Array.from(semesters);
}
exports.getSemesters = getSemesters;
exports.Semesters = getSemesters(new Date(2019, 0, 1), new Date());
//print Semesters
console.log(exports.Semesters);
