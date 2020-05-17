$(document).ready(function () {
    var maNguoiDung = window.localStorage.getItem("maNguoiDung");
    loadThongTinCaNhan(maNguoiDung);
    saveThongTinCaNhan();
});


function loadThongTinCaNhan(maNguoiDung) {
    $.getJSON("http://localhost:8080/api/nguoi-dung/ThongTinCaNhan/" + maNguoiDung, function (response) {
        var nguoiDung = JSON.parse(JSON.stringify(response));
        $("#maSinhVien").val(nguoiDung.maNguoiDung);
        $("#hoTen").val(nguoiDung.hoTen);
        $("#ngaySinh").val(nguoiDung.ngaySinh);
        $("#lop").val(nguoiDung.lop);
        $("#soDienThoai").val(nguoiDung.soDienThoai);
        $("#email").val(nguoiDung.email);
        $("#diaChi").val(nguoiDung.diaChi);
    })
}

function saveThongTinCaNhan() {
    var maSinhVien = $("#maSinhVien").val();
    var hoTen = $("#hoTen").val();
    var lop = $("#lop").val();
    var ngaySinh = $("#ngaySinh").val();
    var soDienThoai = $("#soDienThoai").val();
    var email = $("#email").val();
    var diaChi = $("#diaChi").val();
    $("#saveThongTinCaNhan").on('click', function () {
        var thongTinCaNhan = {
            maSinhVien: maSinhVien,
            hoTen: hoTen,
            lop: lop,
            ngaySinh: ngaySinh,
            soDienThoai: soDienThoai,
            email: email,
            diaChi: diaChi
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/nguoi-dung/',
            data: JSON.stringify(thongTinCaNhan),
            processData: false,
            contentType: "application/json",
            success: function () {
                location.reload();
            }
        })
    })
}