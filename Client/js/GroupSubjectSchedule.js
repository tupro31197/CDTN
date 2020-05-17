let currentUserId = window.localStorage.getItem("userId");
let semesterId;
let semesterName;
let semesterYear;

$(document).ready(function () {
    loadYear();
    loadAllSemester();
    autoLoadTimeline();
    reDrawTable();
    // var semester;
    // $.getJSON("http://localhost:8080/api/semester/5d9dcb307885e9948f87162d", function (response) {
    //     semester = JSON.parse(JSON.stringify(response));
    //     semesterName = semester.name;
    //     semesterYear = semester.year;
    // });

    $("#selectType").change(function () {
        loadTable();
    })
});

function loadTable() {
    var selectType = $("#selectType option:selected").text();
    if (selectType === 'Dạng 1'){
        $("#dataTable").show();
        $('#dataTable_wrapper').show();
        $("#dataTable2").hide();
        $('#dataTable2_wrapper').hide();
    }
    else if (selectType === 'Dạng 2') {
        $("#dataTable").hide();
        $('#dataTable_wrapper').hide();
        $("#dataTable2").show();
        $('#dataTable2_wrapper').show();
    }
}

function loadYear() {
    $("#selectYear").empty();
    var listYear = [];
    $.getJSON("http://localhost:8080/api/semester/getAllYear", function (response) {
        console.log(listYear);
        listYear = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < listYear.length; i++) {
            var out = '<option value=\"' + listYear[i].year + '"\> Năm học ' + listYear[i].year + '</option>';
            $("#selectYear").append(out);
        }
        var year = $("#selectYear option:selected").val();
        loadSemesterByYear(year);
    })
}

function loadSemesterByYear(year) {
    $("#selectSemester").empty();
    var listSemester = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemester/" + year, function (response) {
        listSemester = JSON.parse(JSON.stringify(response));
        for (var i = 0; i<listSemester.length; i++){
            let out = '<option value=\"' + listSemester[i]._id + '\">Học kì ' + listSemester[i].name
                + ' nhóm ' + listSemester[i].group
                + '</option>';
            $("#selectSemester").append(out);
        }
        var semester = $("#selectSemester").val();
        semesterId = semester;
        $('#dataTable').dataTable().fnDestroy();
        $('#dataTable2').dataTable().fnDestroy();
        loadTimelineBySemester(semester, currentUserId);
    })
}

function loadAllSemester() {
    $("#selectYear").change(function () {
        let year = $("#selectYear option:selected").val();
        loadSemesterByYear(year);
    })
}

function autoLoadTimeline() {
    $("#selectSemester").change(function () {
        let semester = $("#selectSemester option:selected").val();
        $('#dataTable').dataTable().fnDestroy();
        $('#dataTable2').dataTable().fnDestroy();
        loadTimelineBySemester(semester, currentUserId);
    })
}

function loadTimelineBySemester(semesterId, currentUserId) {
    $("#groupSubjectTimelineTable").empty();
    var list = [];
    var list2 = [];
    $.getJSON("http://localhost:8080/api/groupSubject/getGroupSubjectSchedule/" + semesterId + "/" + currentUserId, function (response) {
        list = JSON.parse(JSON.stringify(response));
        list.sort(function(a, b)
        {
            let nA = a.teacher.toLowerCase();
            let nB = b.teacher.toLowerCase();

            if(nA < nB)
                return -1;
            else if(nA > nB)
                return 1;
            return 0;
        });
        for (let i = 0 ; i < list.length; i++) {
            let out = '<tr><td id="STT" style="width: 5%">' + (i+1) + '</td>'
                + '<th style="width: 20%">' + list[i].teacherName + '</th>'
                + '<td id = \"' + (i+1) + "T2" + '"\ >'
                + '<td id = \"' + (i+1) + "T3" + '"\ >'
                + '<td id = \"' + (i+1) + "T4" + '"\ >'
                + '<td id = \"' + (i+1) + "T5" + '"\ >'
                + '<td id = \"' + (i+1) + "T6" + '"\ >'
                + '<td id = \"' + (i+1) + "T7" + '"\ >'
            $('#dataTable').find('tbody').append(out);
        }
        for (let i = 0 ; i < list.length; i++) {
            let row = i + 1;
            console.log("row" + row);
            console.log(list[i].dayOfWeek)
            $("#" + (i+1) + "T" + list[i].dayOfWeek).append('<b>' + list[i].lessonName + '</b></br>');
            $("#" + (i+1) + "T" + list[i].dayOfWeek).append(list[i].roomName + '</br>');
            $("#" + (i+1) + "T" + list[i].dayOfWeek).append(list[i].shift);
            $("#" + (i+1) + "T" + list[i].dayOfWeek).attr("style", "text-align: center")
        }
        $('#dataTable').dataTable({
            "language": {
                "lengthMenu": "Xem _MENU_ bản ghi",
                "info": "Đang xem trang _PAGE_ trong _PAGES_",
            },
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
        }).fnDraw();
        $('#groupSubjectTimelineTable').each(function () {
            $('#groupSubjectTimelineTable').find('th').each(function () {
                var $this = $(this);
                var col = $this.index();
                var html = $this.html();
                var row = $(this).parent()[0].rowIndex;
                var span = 1;
                var cell_above = $($this.parent().prev().children()[col]);

                while (cell_above.html() === html) {
                    span += 1;
                    cell_above_old = cell_above;
                    cell_above = $(cell_above.parent().prev().children()[col]);
                }

                if (span > 1) {
                    $(cell_above_old).attr('rowspan', span);
                    $(cell_above_old).attr("style", "vertical-align: middle; background-color: white; border-bottom-width: 1px");
                    $this.hide();
                }

            });
        });

        list2 = JSON.parse(JSON.stringify(response));
        for (var i = 0 ; i < list2.length; i++) {
            var out = '<tr><th id="dayOfWeek" style="width: 5%">' + list2[i].dayOfWeek + '</th>'
                + '<td>' + list2[i].subjectName + '</td>'
                + '<td>' + list2[i].lessonName + '</td>'
                + '<td>' + list2[i].subjectId + '</td>'
                + '<td>' + list2[i].shift + '</td>'
                + '<td>' + list2[i].roomName + '</td>'
                + '<td>' + list2[i].teacherName + '</td>'
            $('#dataTable2').find('tbody').append(out);
        }
        $('#dataTable2').dataTable({
            "language": {
                "lengthMenu": "Xem _MENU_ bản ghi",
                "info": "Đang xem trang _PAGE_ trong _PAGES_",
            },
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
        }).fnDraw();
        $('#groupSubjectTimelineTable2').each(function () {
            $('#groupSubjectTimelineTable2').find('th').each(function () {
                var $this = $(this);
                var col = $this.index();
                var html = $this.html();
                var row = $(this).parent()[0].rowIndex;
                var span = 1;
                var cell_above = $($this.parent().prev().children()[col]);

                while (cell_above.html() === html) {
                    span += 1;
                    cell_above_old = cell_above;
                    cell_above = $(cell_above.parent().prev().children()[col]);
                }

                if (span > 1) {
                    $(cell_above_old).attr('rowspan', span);
                    $(cell_above_old).attr("style", "vertical-align: middle; background-color: white; border-bottom-width: 1px");
                    $this.hide();
                }

            });
        });
        loadTable()
    })

}


function reDrawTable() {
    $("#clickTeacher ").click(function () {
        $('#groupSubjectTimelineTable').each(function () {
            $('#groupSubjectTimelineTable').find('th').each(function () {
                var $this = $(this);
                var col = $this.index();
                var html = $this.html();
                var row = $(this).parent()[0].rowIndex;
                var span = 1;
                var cell_above = $($this.parent().prev().children()[col]);

                while (cell_above.html() === html) {
                    span += 1;
                    cell_above_old = cell_above;
                    cell_above = $(cell_above.parent().prev().children()[col]);
                }

                if (span > 1) {
                    $(cell_above_old).attr('rowspan', span);
                    $(cell_above_old).attr("style", "vertical-align: middle; background-color: white; border-bottom-width: 1px");
                    $this.hide();
                }

            });
        });
    })
    $("#clickDayOfWeek ").click(function () {
        $('#dataTable2_wrapper').each(function () {
            $('#dataTable2_wrapper').find('th').each(function () {
                var $this = $(this);
                var col = $this.index();
                var html = $this.html();
                var row = $(this).parent()[0].rowIndex;
                var span = 1;
                var cell_above = $($this.parent().prev().children()[col]);

                while (cell_above.html() === html) {
                    span += 1;
                    cell_above_old = cell_above;
                    cell_above = $(cell_above.parent().prev().children()[col]);
                }

                if (span > 1) {
                    $(cell_above_old).attr('rowspan', span);
                    $(cell_above_old).attr("style", "vertical-align: middle; background-color: white; border-bottom-width: 1px");
                    $this.hide();
                }

            });
        });
    })

}

$("#export").click(function () {
    getPDF();
})

function getPDF(){

    var HTML_Width = $("#dataTable").width();
    var HTML_Height = $("#dataTable").height();
    var top_left_margin = 100;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


    html2canvas( $("#dataTable")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');

        var imgData = canvas.toDataURL("image/jpeg", 2.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.setFont("times");

        pdf.text(200, 50, 'Thời khóa biểu bộ môn');
        pdf.text(200, 100,semesterName + " Năm " + semesterYear);

        pdf.addImage(imgData, 'JPG', top_left_margin, 150, canvas_image_width, canvas_image_height);

        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        window.open(pdf.output('bloburl'), '_blank');

    });
}
