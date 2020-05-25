let currentUserId = window.localStorage.getItem("userId");

$(document).ready(function () {
    $('#spinner1').hide();
    $('#spinner2').hide();
    searchStudent();
    // loadDanhSachMonHoc(currentUserId);
    // autoloadLesson(currentUserId);
    // registerLesson(currentUserId);
    // getSemesterByStudent(currentUserId);
});

function searchStudent() {
    $(document).on('click', '#searchStudent', function () {
        let studentId = $('#studentId').val();
        console.log(studentId);
        let id;
        $.getJSON("http://localhost:8080/api/student/getInfo/" + studentId, function (response) {
            console.log(response)
            id = response._id;
            loadDanhSachMonHoc(id);
            autoloadLesson(id);
            registerLesson(id);
            getSemesterByStudent(id);
        });

    })
}

function getSemesterByStudent(currentUserId) {
    $.getJSON("http://localhost:8080/api/semester/findByGroupAndStatus/" + currentUserId, function (response) {
        $("#selectSemester").empty();
        let out = '<option value=\"' + response._id + '\">Học kì ' + response.name
            + ' nhóm ' + response.group
            + '</option>';
        $("#selectSemester").append(out);
        loadSchedule(currentUserId);
    })
}

function registerLesson(currentUserId) {
    $(document).on('click', '.form-check-label', function() {
        let checkedValue = $('.form-check-input:checked').val();
        checkedValue.replace(/undefined/, "");
        let semesterId = $("#selectSemester option:selected").val();
        let checkNumber = $(this).data("id");
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/registerCondition/registerLesson/'
                + currentUserId + '/' + checkedValue + '/' + checkNumber + "/" + semesterId,
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

function autoloadLesson(currentUserId) {
    $(document).on('click', '#listMonHoc', function() {
        $('#milestone').empty();
        $("#milestone").append('<div class="card h-100 py-2" id="listLopHoc">' + '</div>');
        let subjectName = $(this).text();
        console.log(subjectName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        $("#listLopHoc").empty();
        loadLesson(subjectName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), currentUserId);
    });
}

function loadDanhSachMonHoc(currentUserId) {
    $('#spinner1').show();
    var listDanhSachMonHoc = [];
    // $.getJSON("http://localhost:8080/api/thoi-gian-dang-ky/checkThoiGianDangKy/" + maNguoiDung, function (response) {
    //     listDanhSachMonHoc = JSON.parse(JSON.stringify(response));
    //     if (response === true) {
    $.getJSON("http://localhost:8080/api/registerCondition/listSubjectToRegister/" + currentUserId + "/5e9295c049dc3d05f638ff72", function (response) {
        listDanhSachMonHoc = JSON.parse(JSON.stringify(response));
        for (var i = 0 ; i < listDanhSachMonHoc.length; i++) {
            var out =
                '<div class="col-xl-2 col-md-6 mb-4">' +
                '<div class="btn-light card" style="cursor: pointer">' +
                '<div class="card-body " id="listMonHoc">' +
                '<div class="row no-gutters align-items-center">' +
                '<div class="col mr-2">' +
                '<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">' + listDanhSachMonHoc[i].subjectName + '</div>' +
                '</div>' +
                '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
            $("#listSubject").append(out);
        }
        $('#spinner1').hide();
    })

    // }
    // else {
    //     $("#listSubject").append('<div><h5 style="color: green"><b>Thông báo thời gian đăng ký học</b></h5><h6>Bạn không nằm trong thời gian đăng ký</h6></div');
    // }
    // });
}

function loadLesson(subjectName, currentUserId) {
    $('#spinner2').show();
    let listLesson = [];
    let list = [];
    let semesterId = $("#selectSemester option:selected").val();
    $.getJSON("http://localhost:8080/api/registerCondition/listLessonToRegister/"
        + subjectName + '/' + currentUserId + "/" + semesterId, function (response) {
        listLesson = JSON.parse(JSON.stringify(response));
        console.log(listLesson);
        for (let i = 0 ; i < listLesson.length; i++) {
            let temp = listLesson[i].tenLop.match(/\d+/)[0];
            if (!list.includes(temp)) {
                let value = listLesson[i].tenLop.substring(0, listLesson[i].tenLop.indexOf('.'));
                let t;
                if(listLesson[i].checked === true) {
                    t =
                        '<div class="card-body">' +
                        '<div class="row no-gutters align-items-center">' +
                        '<div class="form-check">' +
                        '<label class="form-check-label" data-id=\"'+ temp +'"\ id=\"'+ temp +'"\ >' +
                        '<input type="checkbox" class="form-check-input" checked value=\"' + value +'"\>' +
                        listLesson[i].tenLop + ' - [ Thứ ' + listLesson[i].thu + ' - Ca ( ' + listLesson[i].caHoc + ' ) ]. &nbsp;&nbsp;&nbsp;&nbsp;' +
                        '</label>' + '</div>' + '</div>' + '</div>'
                }
                else {
                    t =
                        '<div class="card-body">' +
                        '<div class="row no-gutters align-items-center">' +
                        '<div class="form-check">' +
                        '<label class="form-check-label" data-id=\"'+ temp +'"\ id=\"'+ temp +'"\ >' +
                        '<input type="checkbox" class="form-check-input"  value=\"' + value +'"\>' +
                        listLesson[i].tenLop + ' - [ Thứ ' + listLesson[i].thu + ' - Ca ( ' + listLesson[i].caHoc + ' ) ]. &nbsp;&nbsp;&nbsp;&nbsp;' +
                        '</label>' + '</div>' + '</div>' + '</div>'
                }
                $("#listLopHoc").append(t);
                list.push(temp);
            }
            else {
                let out = listLesson[i].tenLop + ' - [ Thứ ' + listLesson[i].thu + ' - Ca ( ' + listLesson[i].caHoc + ' ) ]. &nbsp;&nbsp;&nbsp;&nbsp;'
                ;
                $("#" + temp).append(out);
            }
            $('#spinner2').hide();
        }
    })
}

function loadSchedule(currentUserId) {
    $("#timelineTable").empty();
    let semesterId = $("#selectSemester option:selected").val();
    var list = [];
    console.log(semesterId + "    " + currentUserId);
    $.getJSON("http://localhost:8080/api/student/getSchedule/" + currentUserId + "/" + semesterId, function (response) {
        console.log(response)
        list = JSON.parse(JSON.stringify(response));
        let out = '<tr>'
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
        for (var i = 0; i < list.length; i++)
        {
            var course = list[i];
            var startShift = parseInt(course.startShift);
            var endShift = parseInt(course.endShift);
            for (var j = startShift; j <= endShift; j++){
                var id = "r" + j + "t" + list[i].dayOfWeek;
                if (j === startShift) {
                    $("#" + id).html(list[i].lessonName + "<br/>" + list[i].roomName);
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
});

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

        // pdf.text(200, 50, 'Thời khóa biểu cá nhân');
        // pdf.text(200, 100,semesterName + " Năm " + semesterYear);

        pdf.addImage(imgData, 'JPG', top_left_margin, 200,canvas_image_width,canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }

        window.open(pdf.output('bloburl'), '_blank');
    });
};

