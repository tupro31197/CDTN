$(document).ready(function () {
    loadYear();
    loadAllSemester();
    autoLoadTimeline();
    reDrawTable();
    $('#spinner').hide();
});


function loadYear() {
    $("#selectYear").empty();
    var listYear = [];
    $.getJSON("http://localhost:8080/api/semester/getAllYear", function (response) {
        console.log(listYear);
        listYear = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < listYear.length; i++) {
            let out = '<option value=\"' + listYear[i].year + '"\> Năm học ' + listYear[i].year + '</option>';
            $("#selectYear").append(out);
        }
        let year = $("#selectYear option:selected").val();
        loadSemesterByYear(year);
    })
}

function loadSemesterByYear(year) {
    $("#selectSemester").empty();
    let listSemester = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemester/" + year, function (response) {
        listSemester = JSON.parse(JSON.stringify(response));
        for (let i = 0; i<listSemester.length; i++){
            let out = '<option value=\"' + listSemester[i]._id + '\">' + 'Học kì ' + listSemester[i].name + ' nhóm ' + listSemester[i].group + '</option>';
            $("#selectSemester").append(out);
        }
        var semester = $("#selectSemester").val();
        semesterId = semester;
        $('#spinner').show();
        $('#dataTable').dataTable().fnDestroy();
        loadTimelineBySemester(semester);
    })
}

function loadAllSemester() {
    $("#selectYear").change(function () {
        var year = $("#selectYear option:selected").val();

        loadSemesterByYear(year);
    })
}

function autoLoadTimeline() {
    $("#selectSemester").change(function () {
        var semester = $("#selectSemester option:selected").val();
        $('#spinner').show();
        $('#dataTable').dataTable().fnDestroy();
        loadTimelineBySemester(semester);
    })
}

function loadTimelineBySemester(semesterId) {
    $("#schoolScheduleTable").empty();
    var list = [];
    $('#spinner').show();
    $.getJSON("http://localhost:8080/api/lesson/getSchoolSchedule/" + semesterId, function (response) {
        list = JSON.parse(JSON.stringify(response));
        for (var i = 0 ; i < list.length; i++) {
            var out = '<tr><th style="width: 5%" id="dayOfWeek">' + list[i].dayOfWeek + '</th>'
                + '<td>' + list[i].subjectName + '</td>'
                + '<td>' + list[i].lessonName + '</td>'
                + '<td style="width: 5%">' + list[i].subjectId + '</td>'
                + '<td style="width: 5%">' + list[i].shiftName + '</td>'
                + '<td style="width: 5%">' + list[i].roomName + '</td>'
                + '<td style="width: 5%">' + list[i].credit + '</td>'
                + '<td>' + list[i].teacherName + '</td>'
            $('#dataTable').find('tbody').append(out);
        }
        $('#dataTable').dataTable({
            "language": {
                "lengthMenu": "Xem _MENU_ bản ghi",
                "info": "Đang xem trang _PAGE_ trong _PAGES_",
            },
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
        }).fnDraw();
        $('#spinner').hide();
        // $('#schoolScheduleTable').each(function () {
        //     $('#schoolScheduleTable').find('th').each(function () {
        //         var $this = $(this);
        //         var col = $this.index();
        //         var html = $this.html();
        //         var row = $(this).parent()[0].rowIndex;
        //         var span = 1;
        //         var cell_above = $($this.parent().prev().children()[col]);
        //
        //         while (cell_above.html() === html) {
        //             span += 1;
        //             cell_above_old = cell_above;
        //             cell_above = $(cell_above.parent().prev().children()[col]);
        //         }
        //
        //         if (span > 1) {
        //             $(cell_above_old).attr('rowspan', span);
        //             $(cell_above_old).attr("style", "vertical-align: middle; background-color: white; border-bottom-width: 1px");
        //             $this.hide();
        //         }
        //
        //     });
        // });
    })

}

// function reDrawTable() {
//     $("#clickDayOfWeek ").click(function () {
//         $('#schoolScheduleTable').each(function () {
//             $('#schoolScheduleTable').find('th').each(function () {
//                 var $this = $(this);
//                 var col = $this.index();
//                 var html = $this.html();
//                 var row = $(this).parent()[0].rowIndex;
//                 var span = 1;
//                 var cell_above = $($this.parent().prev().children()[col]);
//
//                 while (cell_above.html() === html) {
//                     span += 1;
//                     cell_above_old = cell_above;
//                     cell_above = $(cell_above.parent().prev().children()[col]);
//                 }
//
//                 if (span > 1) {
//                     $(cell_above_old).attr('rowspan', span);
//                     $(cell_above_old).attr("style", "vertical-align: middle; background-color: white; border-bottom-width: 1px");
//                     $this.hide();
//                 }
//
//             });
//         });
//     })
// }


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

        console.log(canvas.height+"  "+canvas.width);


        var imgData = canvas.toDataURL("image/jpeg", 2.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }

        pdf.save("HTML-Document.pdf");
    });
};
