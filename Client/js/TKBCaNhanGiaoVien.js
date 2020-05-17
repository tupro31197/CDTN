var maNguoiDung = window.localStorage.getItem("maNguoiDung");

$(document).ready(function () {
    loadTimeline(maNguoiDung);
    danhSachSinhVien();
});

function danhSachSinhVien() {
    $(document).on('click', '#danhSachSinhVien', function() {
        var maTKBTT = $(this).data("id");
        $("#bangDiem").empty();
        var list = [];
        $.getJSON("http://localhost:8080/api/lop-hoc/danhSachSinhVien/" + maTKBTT, function (response) {
            list = JSON.parse(JSON.stringify(response));
            for (var i = 0 ; i < list.length; i++) {
                var STT = i + 1;
                var out = '<tr><th style="width: 10px">' + STT + '</th>'
                    + '<td>' + list[i].maSinhVien + '</td>'
                    + '<td>' + list[i].hoTen + '</td>'
                    + '<td>' + list[i].lopChuyenNganh + '</td>'
                    + '<td>' + list[i].ngaySinh + '</td>'
                    + '<td>' + list[i].soDienThoai + '</td>'
                    + '<td>' + list[i].email + '</td>'
                    + '<td>' + list[i].diaChi + '</td>'
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

function loadTimeline(maGiangVien) {
    $("#timelineTable").empty();
    var listCourseOffering = [];
    $.getJSON("http://localhost:8080/api/lop-hoc/thoiKhoaBieuCaNhanGiangVien/" + maGiangVien, function (response) {
        console.log(maGiangVien);
        listCourseOffering = JSON.parse(JSON.stringify(response));
        var out = '<tr>'
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
        for (var i = 0; i < listCourseOffering.length; i++)
        {
            var course = listCourseOffering[i];
            var startShift = parseInt(course.caBatDau);
            var endShift = parseInt(course.caKetThuc);
            for (var j = startShift; j <= endShift; j++){
                var id = "r" + j + "t" + listCourseOffering[i].thu;
                if (j === startShift) {
                    $("#" + id).html(listCourseOffering[i].tenLop + "<br/>" + listCourseOffering[i].phongHoc);
                    $("#" + id).attr("rowspan", endShift - startShift + 1);
                    $("#" + id).attr("style", "vertical-align: middle; background-color: white; cursor: pointer");
                    $("#" + id).attr("data-id", listCourseOffering[i].maTKBTT);
                    $("#" + id).attr("data-target", "#modalDanhSachSinhVien");
                    $("#" + id).attr("data-toggle", "modal");
                    $("#" + id).attr("id", "danhSachSinhVien");
                }
                else {
                    $("#" + id).hide();
                }
            }
        }
    })
}