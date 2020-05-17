let currentUserId = window.localStorage.getItem("userId");
let listSubject = [];

$(document).ready(function () {
    loadCurrentYear();
    loadAllSemester();
    loadSubjectPlan();
    createSubjectPlan();
    deleteSubjectPlan();
    moreInput();
});

function loadCurrentYear() {
    $.getJSON("http://localhost:8080/api/semester/currentYear/", function (response) {
        console.log(response);
        $("#input-year").val(response.year);
        loadAllSemester();
    });
}

function loadAllSemester() {
    let year = $("#input-year").val();
    $("#choose-semester").empty();
    let listSemester = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemesterByStatus/" + year, function (response) {
        listSemester = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < listSemester.length; i++){
            let status;
            if (listSemester[i].status === 1) {
                status = " (Đang tiến hành) ";
            } else {
                status = " (Chưa bắt đầu) ";
            }
            let out = '<option value=\"' + listSemester[i]._id + '\">Học kì ' + listSemester[i].name
                + ' nhóm ' + listSemester[i].group + status
                + '</option>';
            $("#choose-semester").append(out);
        }
        let semester = $("#choose-semester").val();
        $('#dataTable').dataTable().fnDestroy();
        loadSubjectPlanBySemester(semester);
        loadAllSubject(currentUserId, semester);
    })
}

function loadAllSubject(currentUserId, semesterId) {
    $("#choose-subject").empty();
    $('.moreInput').append('<option value="none">Chọn môn học</option>');
    $.getJSON("http://localhost:8080/api/subjectPlan/getListSubject/" + currentUserId + "/" + semesterId, function (response) {
        listSubject = JSON.parse(JSON.stringify(response));
        for (let i = 0; i<listSubject.length; i++){
            let out = '<option value=\"' + listSubject[i]._id + '\">' + listSubject[i].name + '</option>';
            $('.moreInput').append(out);
        }
    })
}

function createSubjectPlan() {
    $("#createSubjectPlan").click(function () {
        $('.moreInput').each(function () {
            console.log($(this).val());
            if ($(this).val() !== "none") {
                let semesterId = $("#choose-semester").val();
                let subjectId = $(this).val();
                let subjectPlan = {
                    semesterId: semesterId,
                    subjectId: subjectId
                };
                console.log(subjectPlan);
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/api/subjectPlan/',
                    data: JSON.stringify(subjectPlan),
                    contentType: "application/json",
                    success: function () {
                        window.location.reload();
                    }
                })
            }
        })

    })
}

function loadSubjectPlanBySemester(semester) {
    $("#listSubjectPlan").empty();
    let listSubjectPlan = [];
    $.getJSON("http://localhost:8080/api/subjectPlan/getBySemester/" + semester, function (response) {
        listSubjectPlan = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < listSubjectPlan.length; i++) {
            var out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + listSubjectPlan[i].subjectName + '</td>'
                + '<td class="text-center" style="width: 5%">'
                + '<a class="btn btn-danger btn-circle" id="deleteSubjectPlan" data-toggle="modal" data-target="#modalDeleteSubjectPlane" data-id=\"' + listSubjectPlan[i]._id + '">'
                + '<i class="fas fa-trash text-white"></i></a></tr>';
            $('#dataTable').find('tbody').append(out);
        }
        $('#dataTable').dataTable({
            "lengthChange": false
        }).fnDraw();
    })
}

function loadSubjectPlan() {
    $("#choose-semester").change(function () {
        let semester = $("#choose-semester").val();
        $('#dataTable').dataTable().fnDestroy();
        loadSubjectPlanBySemester(semester);
        loadAllSubject(currentUserId, semester);
    })
}

function deleteSubjectPlan() {
    $(document).on('click', '#deleteSubjectPlan', function() {
        const subjectPlanId = $(this).data("id");
        $(document).on('click', '#acceptDelete', function() {
            $.ajax({
                url: 'http://localhost:8080/api/subjectPlan/' + subjectPlanId,
                type: 'DELETE',
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}



function moreInput() {
    $("#moreInput").click(function () {
        let input = '<select class="custom-select mr-sm-2 moreInput" id="choose-subject" style="margin-top: 10px"></select>';
        $("#formInputSubject").append(input);
        $('.moreInput').append('<option value="none">Chọn môn học</option>');
        for (let i = 0; i<listSubject.length; i++){
            let out = '<option value=\"' + listSubject[i]._id + '\">' + listSubject[i].name + '</option>';
            $('.moreInput').append(out);
        }
    });
}
