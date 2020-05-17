var maNguoiDung = window.localStorage.getItem("maNguoiDung");

$(document).ready(function () {
    searchSinhVien();
});

function searchSinhVien() {
    $(document).on('click', '#seachSinhVien', function () {
        var maSinhVien = $('#maSinhVien').val();
        console.log(maSinhVien);
        autoloadLopHoc(maSinhVien);
        loadDanhSachMonHoc(maSinhVien);
        loadTimeline(maSinhVien);
        dangKyHoc(maSinhVien);
    })
}

function dangKyHoc(maNguoiDung) {
    $(document).on('click', '.form-check-label', function() {
        var checkedValue = $('.form-check-input:checked').val();
        checkedValue.replace(/undefined/, "");
        var checkNumber = $(this).data("id");
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/lop-hoc/dangKyHoc/' + maNguoiDung + '/' + checkedValue + '/' + checkNumber,
            contentType: "application/json",
            success: function (response) {
                if (response === 0) {
                    alert("Lớp học đã bị trùng");
                }
                else if (response === 1) {
                    alert("Đăng ký thành công");
                }
                else if (response === 2) {
                    alert("Hủy lớp thành công");
                }
                window.location.reload();
            }
        })
    });
}

function autoloadLopHoc(maNguoiDung) {
    $(document).on('click', '#listMonHoc', function() {
        $('#milestone').empty();
        $("#milestone").append('<div class="card shadow h-100 py-2" id="listLopHoc">' + '</div>');
        var tenMon = $(this).text();
        $("#listLopHoc").empty();
        loadLopHoc(tenMon.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), maNguoiDung);
    });
}

function loadDanhSachMonHoc(maNguoiDung) {
    var listDanhSachMonHoc = [];
    $.getJSON("http://localhost:8080/api/lop-hoc/danhSachMonHocChuaHoc/" + maNguoiDung, function (response) {
        listDanhSachMonHoc = JSON.parse(JSON.stringify(response));
        for (var i = 0 ; i < listDanhSachMonHoc.length; i++) {
            var out =
                '<div class="col-xl-2 col-md-6 mb-4">' +
                '<div class="btn-light card shadow" data-toggle="tooltip" style="cursor: pointer">' +
                '<div class="card-body" id="listMonHoc">' +
                '<div class="row no-gutters align-items-center">' +
                '<div class="col mr-2">' +
                '<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">' + listDanhSachMonHoc[i].tenMon + '</div>' +
                '</div>' +
                '<div class="col-auto">' +
                '<i class="fas fa-calendar fa-2x text-gray-500"></i>' +
                '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
            $("#listSubject").append(out);
        }
    })
}

function loadLopHoc(tenMonHoc, maSinhVien) {
    var listLopHoc = [];
    var list = [];
    $.getJSON("http://localhost:8080/api/lop-hoc/danhSachLopHoc/" + tenMonHoc + '/' + maSinhVien, function (response) {
        listLopHoc = JSON.parse(JSON.stringify(response));
        console.log(listLopHoc);
        for (var i = 0 ; i < listLopHoc.length; i++) {
            var temp = listLopHoc[i].tenLop.match(/\d+/)[0];
            if (!list.includes(temp)) {
                var value = listLopHoc[i].tenLop.substring(0, listLopHoc[i].tenLop.indexOf('.'));
                var t;
                if(listLopHoc[i].checked === true) {
                    t =
                        '<div class="card-body">' +
                        '<div class="row no-gutters align-items-center">' +
                        '<div class="form-check">' +
                        '<label class="form-check-label" data-id=\"'+ temp +'"\ id=\"'+ temp +'"\ >' +
                        '<input type="checkbox" class="form-check-input" checked value=\"' + value +'"\>' +
                        listLopHoc[i].tenLop + ' - [ Thứ ' + listLopHoc[i].thu + ' - Ca ( ' + listLopHoc[i].caHoc + ' ) ]. &nbsp;&nbsp;&nbsp;&nbsp;' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
                else {
                    t =
                        '<div class="card-body">' +
                        '<div class="row no-gutters align-items-center">' +
                        '<div class="form-check">' +
                        '<label class="form-check-label" data-id=\"'+ temp +'"\ id=\"'+ temp +'"\ >' +
                        '<input type="checkbox" class="form-check-input"  value=\"' + value +'"\>' +
                        listLopHoc[i].tenLop + ' - [ Thứ ' + listLopHoc[i].thu + ' - Ca ( ' + listLopHoc[i].caHoc + ' ) ]. &nbsp;&nbsp;&nbsp;&nbsp;' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
                $("#listLopHoc").append(t);
                list.push(temp);
            }
            else {
                var out = listLopHoc[i].tenLop + ' - [ Thứ ' + listLopHoc[i].thu + ' - Ca ( ' + listLopHoc[i].caHoc + ' ) ]. &nbsp;&nbsp;&nbsp;&nbsp;'
                ;
                $("#" + temp).append(out);
            }
        }
    })
}

function loadTimeline(maSinhVien) {
    $("#timelineTable").empty();
    var listCourseOffering = [];
    $.getJSON("http://localhost:8080/api/lop-hoc/thoiKhoaBieuCaNhan/" + maSinhVien, function (response) {
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
                    $("#" + id).attr("style", "vertical-align: middle; background-color: white");
                }
                else {
                    $("#" + id).hide();
                }
            }
        }
    })
}

$("#export").click(function () {
    getPDF();
})

function getPDF(){

    var HTML_Width = $("#dataTable").width();
    var HTML_Height = $("#dataTable").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


    html2canvas($("#dataTable")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');

        var imgData = canvas.toDataURL("image/jpeg", 2.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height])

        pdf.addImage(imgData, 'JPG', top_left_margin, 200,canvas_image_width,canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }

        window.open(pdf.output('bloburl'), '_blank');
    });
};

