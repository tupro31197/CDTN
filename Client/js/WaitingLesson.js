let currentYear;

$(document).ready(function () {
    loadCurrentYear();
    accept();
    disagree();
    loadListWaiting();
});

function loadCurrentYear() {
    $.getJSON("http://localhost:8080/api/semester/currentYear/", function (response) {
        currentYear = response.year;
        loadAllSemester(currentYear);
    });
}

function loadAllSemester(currentYear) {
    $("#selectSemester").empty();
    let list = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemester/" + currentYear, function (response) {
        list = JSON.parse(JSON.stringify(response));
        for (var i = 0; i<list.length; i++){
            let out = '<option value=\"' + list[i]._id + '\">Học kì ' + list[i].name
                + ' nhóm ' + list[i].group
                + '</option>';
            $("#selectSemester").append(out);
        }
        let semesterId = $("#selectSemester").val();
        $('#dataTable').dataTable().fnDestroy();
        loadListWaitingBySemester(semesterId);
    })
}

function loadListWaiting() {
    $("#selectSemester").change(function () {
        let semesterId = $("#selectSemester").val();
        $('#dataTable').dataTable().fnDestroy();
        loadListWaitingBySemester(semesterId);
    });
}

function loadListWaitingBySemester(semesterId) {
    $("#list-waiting").empty();
    var list = [];
    $.getJSON("http://localhost:8080/api/lesson/getListWaiting/" + semesterId, function (response) {
        list = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < list.length; i++) {
            var out = '<tr><td>' + list[i].subjectName + '</td>'
                + '<td>' + list[i].subjectId + '</td>'
                + '<td>' + list[i].lessonName + '</td>'
                + '<td>' + list[i].dayOfWeek + '</td>'
                + '<td>' + list[i].shift + '</td>'
                + '<td>' + list[i].roomName + '</td>'
                + '<td>' + list[i].credit + '</td>'
                + '<td>' + list[i].teacherName + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="agree" data-id=\"' + list[i].lessonId +'" style="margin-right: 10px">'
                + '<i class="fas fa-check text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="disagree" data-id=\"' + list[i].lessonId + '">'
                + '<i class="fas fa-ban text-white"></i></a></tr>';
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

function accept() {
    $(document).on('click', '#acceptButton', function() {
        var courseOfferingId = $(this).data("id");
        $.ajax({
            url: 'http://localhost:8080/api/courseOffering/' + courseOfferingId,
            type: 'PUT',
            success: function () {
                window.location.reload();
            }
        })
    });
}

function disagree() {
    $(document).on('click', '#disagreeButton', function() {
        var courseOfferingId = $(this).data("id");
        $.ajax({
            url: 'http://localhost:8080/api/courseOffering/' + courseOfferingId,
            type: 'DELETE',
            success: function () {
                window.location.reload();
            }
        })
    });
}
