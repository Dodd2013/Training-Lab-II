var urlbase="../1606StevePHP/web/"
var config={
	url:{
		login:urlbase+"login.php",
		loginstate:urlbase+"loginstate.php",
		logout:urlbase+"logout.php",
		course:urlbase+"course.php",
		checkAttendance:urlbase+"attendance_check.php",
		addAttendance:urlbase+"attendance_insert.php",
		addQuestion:urlbase+"questionmake.php",
		testmake:urlbase+"testmake.php",
		exam:urlbase+"examsche.php",
		stuexam:urlbase+"stu_exam.php",
        examReport:urlbase+"exam_report.php"
	}
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes();
    return currentdate;
}