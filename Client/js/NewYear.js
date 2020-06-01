
$(document).ready(function () {
    loadNewYearAndSemester();
    changeSemester();
});

function loadNewYearAndSemester() {
    $("#input-year").empty();
    $.getJSON("http://localhost:8080/api/semester/currentYear", function (response) {
        var startYear = parseInt(response.year.substr(0,4))  + 1;
        var endYear = parseInt(response.year.substr(5,9))  + 1;
        $("#input-year").val(startYear + "-" + endYear);

        $("#choose-semester").empty();
        var semesterList = [];
        $.getJSON("http://localhost:8080/api/semester/getListSemester/" + response.year, function (response) {
            console.log("abc");
            semesterList = JSON.parse(JSON.stringify(response));
            for (let i = 0; i < semesterList.length; i++) {
                let status;
                if (semesterList[i].status === 0) {
                    status = "Đã kết thúc";
                } else if (semesterList[i].status === 1) {
                    status = "Đang tiến hành";
                }
                else {
                    status = "Chưa bắt đầu";
                }
                let out = '<tr><td>' + (i+1) + '</td>'
                    + '<td>Học kì ' + semesterList[i].name + ' nhóm ' + semesterList[i].group + '</td>'
                    + '<td>' + semesterList[i].start + '</td>'
                    + '<td>' + semesterList[i].end + '</td>'
                    + '<td>' + status + '</td>'
                    + '<td class="text-center">'
                    + '<a class="btn btn-warning btn-circle" id="updateShift" data-toggle="modal" data-target="#modalUpdateShift" data-id=\"' + semesterList[i].id +'" style="margin-right: 10px">'
                    + '<i class="fas fa-edit text-white"></i></a>'
                    + '</tr>';
                $('#dataTable').find('tbody').append(out);
            }
            $('#dataTable').dataTable({
                "language": {
                    "lengthMenu": false
                },
            }).fnDraw();
        })
    });
}

function changeSemester() {
    $("#choose-semester").change(function () {
        var semester = $("#choose-semester option:selected").val();
        $.getJSON("http://localhost:8080/api/semester/" + semester, function (response) {
            var getSemester = JSON.parse(JSON.stringify(response));
            $("#datetimepicker3").empty();
            $("#datetimepicker4").empty();
            if (getSemester.startSemester === "null") {
                getSemester.startSemester = "";
            }
            if (getSemester.endSemester === "null"){
                getSemester.endSemester = "";
            }
            $("#datetimepicker3").val(getSemester.startSemester);
            $("#datetimepicker4").val(getSemester.endSemester);
        })
    })
}

function loadAllSemester(year) {
    $("#listSemester").empty();
    $('#dataTable').dataTable().fnDestroy();
    let semesterList = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemester/" + year, function (response) {
        console.log("abc");
        semesterList = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < semesterList.length; i++) {
            let out = '<tr><td>' + (i+1) + '</td>'
                + '<td>Học kì ' + semesterList[i].name + ' nhóm ' + semesterList[i].group + '</td>'
                + '<td>' + semesterList[i].year + '</td>'
                + '<td>' + semesterList[i].start + '</td>'
                + '<td>' + semesterList[i].end + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateShift" data-toggle="modal" data-target="#modalUpdateShift" data-id=\"' + semesterList[i].id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '</tr>';
            $('#dataTable').find('tbody').append(out);
        }
        $('#dataTable').dataTable({
            "language": {
                "lengthMenu": "Xem _MENU_ bản ghi",
                "info": "Đang xem trang _PAGE_ trong _PAGES_",
            },
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
        }).fnDraw();
    })
}
