$(document).ready(function () {
    loadDepartment();
    changeDepartmentSelected();
    $('#spinner').hide();
});


function loadDepartment() {
    $("#selectDepartment").empty();
    let listDepartment = [];
    $.getJSON("http://localhost:8080/api/department/", function (response) {
        listDepartment = JSON.parse(JSON.stringify(response));
        console.log(listDepartment)
        for (let i = 0; i < listDepartment.length; i++) {
            let out = '<option value=\"' + listDepartment[i].departmentId + '"\>' + listDepartment[i].departmentName + '</option>';
            $("#selectDepartment").append(out);
        }
        let departmentId = $("#selectDepartment option:selected").val();
        $('#dataTable').dataTable().fnDestroy();
        loadStudyProgram(departmentId);
    })
}

function changeDepartmentSelected() {
    $("#selectDepartment").change(function () {
        let departmentId = $("#selectDepartment option:selected").val();
        $('#dataTable').dataTable().fnDestroy();
        loadStudyProgram(departmentId);
    })
}

function loadStudyProgram(departmentId) {
    $("#studyProgramTable").empty();
    var studyProgram = [];
    $('#spinner').show();
    $.getJSON("http://localhost:8080/api/studyProgram/" + departmentId, function (response) {
        studyProgram = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < studyProgram.length; i++) {
            var out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + studyProgram[i].subjectId + '</td>'
                + '<td style="width: 30%">' + studyProgram[i].subjectName + '</td>'
                + '<td>' + studyProgram[i].predictSubjectCondition + '</td>'
                + '<td>' + studyProgram[i].predictCreditCondition + '</td>'
                + '<td>' + studyProgram[i].credit + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateStudyProgram" data-toggle="modal" data-target="#modalUpdateStudyProgram" data-id=\"' + studyProgram[i].id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteStudyProgram"  data-id=\"' + studyProgram[i].id + '">'
                + '<i class="fas fa-trash text-white"></i></a></tr>';
            $('#dataTable').find('tbody').append(out);
        }
        $('#spinner').hide();
        $('#dataTable').dataTable({
            "language": {
                "lengthMenu": "Xem _MENU_ bản ghi",
                "info": "Đang xem trang _PAGE_ trong _PAGES_",
            },
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
        }).fnDraw();
    })
}
