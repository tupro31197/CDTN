$(document).ready(function () {
    loadFinalGrade();
    chiTietDiem();
});

function chiTietDiem() {
    $(document).on('click', '#chiTietDiem', function() {
        var msv = $(this).data("id");
        $("#bangDiem").empty();
        var list = [];
        $.getJSON("http://localhost:8080/api/nguoi-dung/bangDiem/" + msv, function (response) {
            list = JSON.parse(JSON.stringify(response));
            for (var i = 0 ; i < list.length; i++) {
                var STT = i + 1;
                var out = '<tr><th style="width: 10px">' + STT + '</th>'
                    + '<td style="width: 25%">' + list[i].maHocPhan + '</td>'
                    + '<td style="width: 25%">' + list[i].tenHocPhan + '</td>'
                    + '<td style="width: 25%">' + list[i].soTinChi + '</td>'
                    + '<td style="width: 25%">' + list[i].diem + '</td>';
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
    $("#finalGradeList").empty();
    let listDiemTongKet = [];
    $.getJSON("http://localhost:8080/api/diem-tong-ket/layDiemTongKet", function (response) {
        listDiemTongKet = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < listDiemTongKet.length; i++) {
            let STT = i + 1;
            let out = '<tr><td id="STT">' + (i+1) + '</td>'
                + '<td>' + listDiemTongKet[i].maSinhVien + '</td>'
                + '<td>' + listDiemTongKet[i].hoTen + '</td>'
                + '<td>' + listDiemTongKet[i].maLop + '</td>'
                + '<td>' + listDiemTongKet[i].diemTongKet + '</td>'
                + '<td>' + listDiemTongKet[i].soLanThi + '</td>'
                + '<td>' + listDiemTongKet[i].lopChuyenNganh + '</td>'
                + '<td>' + listDiemTongKet[i].soTinChi + '</td>'
                + '<td><button type="button" class="btn btn-success" id="chiTietDiem" data-toggle="modal" data-target="#modalDiemTongKet" data-id=\"' + listDiemTongKet[i].maSinhVien + '"\>Chi tiết</button></td></tr>';
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
