$(document).ready(function () {
    loadSemester();
    updateSemester();
});

function loadSemester() {
    $("#listSemester").empty();
    $('#dataTable').dataTable().fnDestroy();
    let semesterList = [];
    $.getJSON("http://localhost:8080/api/semester/", function (response) {
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
                + '<td>' + semesterList[i].year + '</td>'
                + '<td>' + semesterList[i].start + '</td>'
                + '<td>' + semesterList[i].end + '</td>'
                + '<td>' + status+ '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateSemester" data-toggle="modal" data-target="#modalUpdateSemester"' +
                'data-id=\"' + semesterList[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a></tr>';
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

function updateSemester() {
    $(document).on('click', '#updateSemester', function() {
        console.log("123123")
        let id = $(this).data("id");
        let semester;
        $.getJSON("http://localhost:8080/api/semester/" + id, function (response) {
            console.log("123123")
            semester = JSON.parse(JSON.stringify(response));
            $("#semester").val(semester.name);
            $("#group").val(semester.group);
            $("#year").val(semester.year);
            $("#startSemester").val(semester.start);
            $("#endSemester").val(semester.end);
        });

        $(document).on('click', '#saveSemester', function() {
            let semester = {
                _id: id,
                name: $("#semester").val(),
                group: $("#group").val(),
                year: $("#year").val(),
                start: $("#startSemester").val(),
                end: $("#endSemester").val()
            };
            $.ajax({
                url: 'http://localhost:8080/api/semester/',
                type: 'PUT',
                data: JSON.stringify(semester),
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

