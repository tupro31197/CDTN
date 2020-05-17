$(document).ready(function () {
    loadAllTeacher();
    updateSubject();
    deleteSubject();
});

function loadAllTeacher() {
    $("#listTeacher").empty();
    $('#dataTable').dataTable().fnDestroy();
    var teacherList = [];
    $.getJSON("http://localhost:8080/api/employee/", function (response) {
        teacherList = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < teacherList.length; i++) {
            var out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + teacherList[i].teacherId + '</td>'
                + '<td>' + teacherList[i].name + '</td>'
                + '<td>' + teacherList[i].groupSubject + '</td>'
                + '<td>' + teacherList[i].email + '</td>'
                + '<td>' + teacherList[i].phone + '</td>'
                + '<td>' + teacherList[i].dob + '</td>'
                + '<td>' + teacherList[i].address + '</td>'
                + '<td>' + teacherList[i].role + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateTeacher" data-toggle="modal" data-target="#modalUpdateTeacher" data-id=\"' + teacherList[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteTeacher"  data-id=\"' + teacherList[i]._id + '">'
                + '<i class="fas fa-trash text-white"></i></a></tr>';
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
