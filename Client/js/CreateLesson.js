let currentUserId = window.localStorage.getItem("userId");

$(document).ready(function () {
    loadCurrentYear()
    loadAllSemester();
    loadAllTeacher(currentUserId);
    loadAllShift();
    loadAllRoom();
    createCourseOffering();
    loadCourseOffering();
    $('#spinner').hide();
    $('#spinner2').hide();
});

function loadCurrentYear() {
    $.getJSON("http://localhost:8080/api/semester/currentYear/", function (response) {
        $("#input-year").val(response.year);
        loadAllSemester()
    })
}

function loadAllSemester() {
    let year = $("#input-year").val();
    $("#choose-semester").empty();
    let listSemester = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemesterByStatus/" + year, function (response) {
        listSemester = JSON.parse(JSON.stringify(response));
        for (var i = 0; i<listSemester.length; i++){
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
        loadCourseOfferingBySemester(semester);
        loadAllSubject(currentUserId, semester);
    })
}

function loadAllSubject(currentUserId, semesterId) {
    $("#choose-subject").empty();
    var listSubject = [];
    $.getJSON("http://localhost:8080/api/lesson/getListSubject/" + currentUserId + "/" + semesterId , function (response) {
        listSubject = JSON.parse(JSON.stringify(response));
        for (var i = 0; i<listSubject.length; i++){
            var out = '<option value=\"' + listSubject[i]._id + '\">' + listSubject[i].name + '</option>';
            $("#choose-subject").append(out);
        }
    })
}

function loadAllTeacher(currentUserId) {
    $("#choose-teacher").empty();
    var listTeacher = [];
    $.getJSON("http://localhost:8080/api/lesson/getListTeacher/" + currentUserId, function (response) {
        listTeacher = JSON.parse(JSON.stringify(response));
        for (var i = 0; i<listTeacher.length; i++){
            var out = '<option value=\"' + listTeacher[i]._id + '\">' + listTeacher[i].name + '</option>';
            $("#choose-teacher").append(out);
        }
    })
}

function loadShiftByTeacher(semester, dayOfWeek, teacherId) {
    var listShift = [];
    $("#choose-shift").empty();
    $.getJSON("http://localhost:8080/api/shift/getListShift/" + semester + "/" + dayOfWeek + "/" + teacherId, function (response) {
        listShift = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < listShift.length; i++){
            var out = '<option value=\"' + listShift[i]._id + '\">' + "Ca " + listShift[i].startShift + " - " + listShift[i].endShift + '</option>';
            $("#choose-shift").append(out);
        }
        let shiftId = $("#choose-shift option:selected").val();
        let size = $("#choose-size option:selected").val();
        if (shiftId !== undefined){
            loadRoomByShift(semester, shiftId, size);
        }
    })
}

function loadAllShift() {
    $("#choose-teacher").change(function () {
        var teacherId = $("#choose-teacher option:selected" ).val();
        var dayOfWeek = $("#choose-dayOfWeek option:selected").val();
        var semester = $("#choose-semester option:selected").val();
        loadShiftByTeacher(semester, dayOfWeek, teacherId);
    });
    $("#choose-dayOfWeek").change(function () {
        var teacherId = $("#choose-teacher option:selected" ).val();
        var dayOfWeek = $("#choose-dayOfWeek option:selected").val();
        var semester = $("#choose-semester option:selected").val();
        loadShiftByTeacher(semester, dayOfWeek, teacherId);
    });
    $("#choose-semester").change(function () {
        var teacherId = $("#choose-teacher option:selected" ).val();
        var dayOfWeek = $("#choose-dayOfWeek option:selected").val();
        var semester = $("#choose-semester option:selected").val();
        loadShiftByTeacher(semester, dayOfWeek, teacherId);
        loadAllSubject(currentUserId, semester);
    })
}

function loadRoomByShift(semester, shiftId, size) {
    let listRoom = [];
    $("#choose-room").empty();
    $.getJSON("http://localhost:8080/api/room/getListRoom/" + semester + "/" + shiftId + "/" + size, function (response) {
        listRoom = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < listRoom.length; i++){
            let out = '<option value=\"' + listRoom[i]._id + '\">' + listRoom[i].name  + '</option>';
            $("#choose-room").append(out);
            $('#spinner').hide();
        }
    })
}

function loadAllRoom() {
    $("#choose-shift").change(function () {
        let shiftId = $("#choose-shift option:selected").val();
        let semesterId = $("#choose-semester option:selected").val();
        let size = $("#choose-size option:selected").val();
        $('#spinner').show();
        loadRoomByShift(semesterId, shiftId, size);
    })
    $("#choose-size").change(function () {
        let shiftId = $("#choose-shift option:selected").val();
        let semesterId = $("#choose-semester option:selected").val();
        let size = $("#choose-size option:selected").val();
        $('#spinner').show();
        loadRoomByShift(semesterId, shiftId, size);
    })
}

function createCourseOffering() {
    $("#createCourseOffering").on('click', function () {
            var name = $("#name-courseOffering").val();
            var teacherId = $("#choose-teacher").val();
            var subjectId = $("#choose-subject").val();
            var shiftId = $("#choose-shift").val();
            var roomId = $("#choose-room").val();
            var semesterId = $("#choose-semester").val();
            var status = "waiting";
            var courseOffering = {
                lessonName: name,
                teacherId: teacherId,
                subjectId: subjectId,
                shiftId: shiftId,
                roomId: roomId,
                semesterId: semesterId,
                status: status
            };
            if (name === '' || teacherId === '' || subjectId === '' || shiftId === '' || roomId === '' || semesterId === '') {
                alert("Vui lòng nhập đầy đủ thông tin")
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/api/lesson/',
                    data: JSON.stringify(courseOffering),
                    contentType: "application/json",
                    success: function () {
                        window.location.reload();
                    }
                })
            }
        })
}

function loadCourseOfferingBySemester(semesterId) {
    $('#spinner2').show();
    $("#listCourseOffering").empty();
    var listCourseOffering = [];
    $.getJSON("http://localhost:8080/api/lesson/getLessonBySemester/" + semesterId, function (response) {
        $('#spinner2').show();
        listCourseOffering = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < listCourseOffering.length; i++) {
            var out;
            if (listCourseOffering[i].status === "active") {
                out = '<tr><td>' + listCourseOffering[i].lessonName + '</td>'
                    + '<td style="width: 3%">' + listCourseOffering[i].dayOfWeek + '</td>'
                    + '<td style="width: 3%">' + listCourseOffering[i].shift + '</td>'
                    + '<td style="width: 15%">' + listCourseOffering[i].roomName + '</td>'
                    + '<td>' + listCourseOffering[i].teacherName + '</td>'
                    + '<td><a class="btn btn-success">Active <i class="fas fa-check text-white"></i></a></td></tr>';
            } else {
                out = '<tr><td>' + listCourseOffering[i].lessonName + '</td>'
                    + '<td style="width: 3%">' + listCourseOffering[i].dayOfWeek + '</td>'
                    + '<td style="width: 3%">' + listCourseOffering[i].shift + '</td>'
                    + '<td style="width: 15%">' + listCourseOffering[i].roomName + '</td>'
                    + '<td>' + listCourseOffering[i].teacherName + '</td>'
                    + '<td><a class="btn btn-warning">Waiting <i class="fas fa-spinner"></i></a></td></tr>';
            }
            $('#dataTable').find('tbody').append(out);
        }
        $('#dataTable').dataTable({
            "language": {
                "lengthMenu": "Xem _MENU_ bản ghi",
                "info": "Đang xem trang _PAGE_ trong _PAGES_",
            },
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
        }).fnDraw();
        $('#spinner2').hide();
    })
}

function loadCourseOffering() {
    $("#choose-semester").change(function () {
        var semester = $("#choose-semester").val();
        $('#dataTable').dataTable().fnDestroy();
        loadCourseOfferingBySemester(semester);
    })
}

