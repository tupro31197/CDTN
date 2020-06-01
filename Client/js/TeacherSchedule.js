let currentUserId = window.localStorage.getItem("userId");
let semesterId;
let semesterName;
let semesterYear;

$(document).ready(function () {
    loadYear();
    loadAllSemester();
    autoLoadTimeline();
});

function loadYear() {
    $("#selectYear").empty();
    var listYear = [];
    $.getJSON("http://localhost:8080/api/semester/getAllYear", function (response) {
        console.log(listYear);
        listYear = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < listYear.length; i++) {
            var out = '<option value=\"' + listYear[i].year + '"\> Năm học ' + listYear[i].year + '</option>';
            $("#selectYear").append(out);
        }
        var year = $("#selectYear option:selected").val();
        loadSemesterByYear(year);
    })
}

function loadSemesterByYear(year) {
    $("#selectSemester").empty();
    let listSemester = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemester/" + year, function (response) {
        listSemester = JSON.parse(JSON.stringify(response));
        for (let i = 0; i<listSemester.length; i++){
            let out = '<option value=\"' + listSemester[i]._id + '\">Học kì ' + listSemester[i].name
                + ' nhóm ' + listSemester[i].group
                + '</option>';
            $("#selectSemester").append(out);
        }
        let semester = $("#selectSemester").val();
        semesterId = semester;
        loadTimeline(currentUserId, semester);
    })
}

function loadAllSemester() {
    $("#selectYear").change(function () {
        var year = $("#selectYear option:selected").val();
        loadSemesterByYear(year);
    })
}

function autoLoadTimeline() {
    $("#selectSemester").change(function () {
        var semester = $("#selectSemester option:selected").val();
        semesterId = semester;
        loadTimeline(currentUserId, semester);
    })
}

function loadTimeline(teacherId, semesterId) {
    $("#timelineTable").empty();
    let list = [];
    $.getJSON("http://localhost:8080/api/employee/getSchedule/" + teacherId + "/" + semesterId, function (response) {
        list = JSON.parse(JSON.stringify(response));
        let out = '<tr>'
            + '<th id="r1">1</th>'
            + '<td id="r1t2"></td>'
            + '<td id="r1t3"></td>'
            + '<td id="r1t4"></td>'
            + '<td id="r1t5"></td>'
            + '<td id="r1t6"></td>'
            + '<td id="r1t7"></td>'
            + '<td id="r1t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r2">2</th>'
            + '<td id="r2t2"></td>'
            + '<td id="r2t3"></td>'
            + '<td id="r2t4"></td>'
            + '<td id="r2t5"></td>'
            + '<td id="r2t6"></td>'
            + '<td id="r2t7"></td>'
            + '<td id="r2t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r3">3</th>'
            + '<td id="r3t2"></td>'
            + '<td id="r3t3"></td>'
            + '<td id="r3t4"></td>'
            + '<td id="r3t5"></td>'
            + '<td id="r3t6"></td>'
            + '<td id="r3t7"></td>'
            + '<td id="r3t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r4">4</th>'
            + '<td id="r4t2"></td>'
            + '<td id="r4t3"></td>'
            + '<td id="r4t4"></td>'
            + '<td id="r4t5"></td>'
            + '<td id="r4t6"></td>'
            + '<td id="r4t7"></td>'
            + '<td id="r4t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r5">5</th>'
            + '<td id="r5t2"></td>'
            + '<td id="r5t3"></td>'
            + '<td id="r5t4"></td>'
            + '<td id="r5t5"></td>'
            + '<td id="r5t6"></td>'
            + '<td id="r5t7"></td>'
            + '<td id="r5t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r6">6</th>'
            + '<td id="r6t2"></td>'
            + '<td id="r6t3"></td>'
            + '<td id="r6t4"></td>'
            + '<td id="r6t5"></td>'
            + '<td id="r6t6"></td>'
            + '<td id="r6t7"></td>'
            + '<td id="r6t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r7">7</th>'
            + '<td id="r7t2"></td>'
            + '<td id="r7t3"></td>'
            + '<td id="r7t4"></td>'
            + '<td id="r7t5"></td>'
            + '<td id="r7t6"></td>'
            + '<td id="r7t7"></td>'
            + '<td id="r7t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r8">8</th>'
            + '<td id="r8t2"></td>'
            + '<td id="r8t3"></td>'
            + '<td id="r8t4"></td>'
            + '<td id="r8t5"></td>'
            + '<td id="r8t6"></td>'
            + '<td id="r8t7"></td>'
            + '<td id="r8t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r9">9</th>'
            + '<td id="r9t2"></td>'
            + '<td id="r9t3"></td>'
            + '<td id="r9t4"></td>'
            + '<td id="r9t5"></td>'
            + '<td id="r9t6"></td>'
            + '<td id="r9t7"></td>'
            + '<td id="r9t8"></td>'
            + '</tr>'
            +'<tr>'
            + '<th id="r10">10</th>'
            + '<td id="r10t2"></td>'
            + '<td id="r10t3"></td>'
            + '<td id="r10t4"></td>'
            + '<td id="r10t5"></td>'
            + '<td id="r10t6"></td>'
            + '<td id="r10t7"></td>'
            + '<td id="r10t8"></td>'
            + '</tr>';
        $("#timelineTable").append(out);
        for (var i = 0; i < list.length; i++)
        {
            var course = list[i];
            var startShift = parseInt(course.startShift);
            var endShift = parseInt(course.endShift);
            for (var j = startShift; j <= endShift; j++){
                var id = "r" + j + "t" + list[i].dayOfWeek;
                if (j === startShift) {
                    $("#" + id).html(list[i].lessonName + "<br/>" + list[i].roomName);
                    $("#" + id).attr("rowspan", endShift - startShift + 1);
                    $("#" + id).attr("style", "vertical-align: middle; background-color: white");
                }
                else {
                    $("#" + id).hide();
                }
            }
        }
    })
}

$("#export").click(function () {
    getPDF();
})

function getPDF(){

    var HTML_Width = $("#dataTable").width();
    var HTML_Height = $("#dataTable").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


    html2canvas($("#dataTable")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');

        console.log(canvas.height+"  "+canvas.width);


        var imgData = canvas.toDataURL("image/jpeg", 2.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height])

        pdf.text(200, 50, 'Thời khóa biểu cá nhân');
        pdf.text(200, 100,semesterName + " Năm " + semesterYear);

        pdf.addImage(imgData, 'JPG', top_left_margin, 200,canvas_image_width,canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }

        window.open(pdf.output('bloburl'), '_blank');
    });
};

