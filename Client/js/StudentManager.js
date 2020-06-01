$(document).ready(function () {
    loadAllStudent();
    // updateSubject();
    // deleteSubject();
});

function loadAllStudent() {
    $("#listStudent").empty();
    $('#dataTable').dataTable().fnDestroy();
    var studentList = [];
    $.getJSON("http://localhost:8080/api/student/", function (response) {
        studentList = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < studentList.length; i++) {
            var out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td style="width: 10%">' + studentList[i].studentId + '</td>'
                + '<td>' + studentList[i].name + '</td>'
                + '<td style="width: 5%">' + studentList[i].className + '</td>'
                + '<td>' + studentList[i].department + '</td>'
                + '<td style="width: 5%"> ' + studentList[i].group + '</td>'
                // + '<td>' + studentList[i].email  + '</td>'
                // + '<td>' + studentList[i].phone + '</td>'
                // + '<td>' + studentList[i].dob + '</td>'
                // + '<td>' + studentList[i].address + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateStudent" data-toggle="modal" data-target="#modalUpdateStudent" data-id=\"' + studentList[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-info-circle text-white"></i></a>'
                // + '<a class="btn btn-danger btn-circle" id="deleteStudent"  data-id=\"' + studentList[i]._id + '">'
                // + '<i class="fas fa-trash text-white"></i></a></tr>';
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

// function deleteSubject() {
//     $(document).on('click', '#deleteSubject', function() {
//         var subjectId = $(this).data("id");
//         $.ajax({
//             url: 'http://localhost:8080/api/subject/' + subjectId,
//             type: 'DELETE',
//             success: function () {
//                 window.location.reload();
//             }
//         })
//     });
// }
//
// function updateSubject() {
//     $(document).on('click', '#updateSubject', function() {
//         var subjectId = $(this).data("id");
//         var subject;
//         $.getJSON("http://localhost:8080/api/subject/" + subjectId, function (response) {
//             subject = JSON.parse(JSON.stringify(response));
//             $("#idSubject").val(subject.subjectId);
//             $("#subjectName").val(subject.name);
//             $("#credit").val(subject.credits);
//             $("#theory").val(subject.theory);
//             $("#practice").val(subject.practice);
//         })
//     });
// }
