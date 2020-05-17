$(document).ready(function () {
    $.getJSON("http://localhost:8080/api/thoi-gian-dang-ky/laySoDotDaMo/", function (response) {
        var number = JSON.parse(JSON.stringify(response));
        $("#input-number").val("Đợt " + number);
    });
    saveDotDangKy();
});

function saveDotDangKy() {
    $("#saveDotDangKy").on('click', function () {
        var thoiGianDong = document.getElementById("datetimepicker2").value;
        var thoiGianMo = document.getElementById("datetimepicker1").value;
        var soTinChi = document.getElementById("input-credit").value;
        var dotDangKy = {
            thoiGianMo: thoiGianMo,
            thoiGianDong: thoiGianDong,
            soTinChi: soTinChi,
        }
        alert("Tạo thời gian đăng ký thành công");
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/thoi-gian-dang-ky/',
            data: JSON.stringify(dotDangKy),
            processData: false,
            contentType: "application/json",
            success: function () {
                location.reload();
            }
        })
    })
}