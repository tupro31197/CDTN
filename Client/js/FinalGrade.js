$(document).ready(function () {
    loadFinalGrade();
    gradeDetail();
});

function gradeDetail() {
    $(document).on('click', '#gradeDetail', function() {
        let studentId = $(this).data("id");
        $("#bangDiem").empty();
        let list = [];
        $.getJSON("http://localhost:8080/api/finalGrade/getGrade/" + studentId, function (response) {
            list = JSON.parse(JSON.stringify(response));
            for (var i = 0 ; i < list.length; i++) {
                var STT = i + 1;
                var out = '<tr><th style="width: 5%">' + STT + '</th>'
                    + '<td style="width: 15%">' + list[i].subjectId + '</td>'
                    + '<td style="width: 50%">' + list[i].subjectName + '</td>'
                    + '<td style="width: 15%">' + list[i].credit + '</td>'
                    + '<td style="width: 15%">' + list[i].grade + '</td>';
                $('#bangDiem').append(out);
            }
            $('#dataTableDiem').dataTable({
                "language": {
                    "lengthMenu": "Xem _MENU_ bản ghi",
                    "info": "Đang xem trang _PAGE_ trong _PAGES_",
                },
                "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
            }).fnDraw();
        })
    });
}

function loadFinalGrade() {
    $("#finalGradeReport").empty();
    let finalGradeReport = [];
    $.getJSON("http://localhost:8080/api/finalGrade/getFinalGrade", function (response) {
        finalGradeReport = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < finalGradeReport.length; i++) {
            let out = '<tr><td style="width: 2%">' + (i+1) + '</td>'
                + '<td style="width: 5%">' + finalGradeReport[i].studentId + '</td>'
                + '<td>' + finalGradeReport[i].studentName + '</td>'
                + '<td style="width: 10%">' + finalGradeReport[i].className + '</td>'
                + '<td style="width: 5%">' + finalGradeReport[i].averageGrade + '</td>'
                + '<td>' + finalGradeReport[i].departmentName + '</td>'
                + '<td style="width: 5%">' + finalGradeReport[i].totalCredit + '</td>'
                + '<td style="width: 5%"><button type="button" class="btn btn-success" id="gradeDetail" data-toggle="modal" data-target="#modalGradeDetail" ' +
                'data-id=\"' + finalGradeReport[i].studentId + '"\>Chi tiết</button></td></tr>';
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

$(document).ready(function () {
    var filePath;
    $('#fileChuongTrinhHoc').on('change',function ()
    {
        filePath = document.getElementById("fileChuongTrinhHoc").files[0].name;
    });
    $("#acceptImport").click(function () {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/diem-tong-ket/import/' + filePath,
            contentType: "application/json",
            success: function () {
                location.reload();
            }
        })
    })
});
