$(document).ready(function () {
    loadAllSubject();
    createSubject();
    updateSubject();
    deleteSubject();
    loadGroupSubject();
    $('#spinner').hide();
});

function loadAllSubject() {
    $("#listSubject").empty();
    $('#dataTable').dataTable().fnDestroy();
    let subjectList = [];
    $('#spinner').show();
    $.getJSON("http://localhost:8080/api/subject/", function (response) {
        subjectList = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < subjectList.length; i++) {
            let out = '<tr><td>' + (i+1) + '</td>'
                + '<td>' + subjectList[i].subjectId + '</td>'
                + '<td>' + subjectList[i].name + '</td>'
                + '<td>' + subjectList[i].credit + '</td>'
                + '<td>' + subjectList[i].theory + '</td>'
                + '<td>' + subjectList[i].practice + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateSubject" data-toggle="modal" data-target="#modalUpdateSubject" data-id=\"' + subjectList[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteSubject" data-toggle="modal" data-target="#modalDeleteSubject" data-rid=\"' + subjectList[i]._id + '">'
                + '<i class="fas fa-trash text-white"></i></a></tr>';
            $('#dataTable').find('tbody').append(out);
        }
        $('#spinner').hide();
        $('#dataTable').dataTable({
            "language": {
                "lengthMenu": "Xem _MENU_ bản ghi",
                "info": "Đang xem trang _PAGE_ trong _PAGES_",
            },
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
        }).fnDraw();
    })
}

function loadGroupSubject() {
    let listGroupSubject = [];
    $.getJSON("http://localhost:8080/api/groupSubject/", function (response) {
        listGroupSubject = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < listGroupSubject.length; i++){
            let out = '<option value=\"' + listGroupSubject[i]._id + '\">' + listGroupSubject[i].name + '</option>';
            $("#newSelectGroupSubject").append(out);
            $("#selectGroupSubject").append(out);
        }
    });
}

function createSubject() {
    $("#createSubject").on('click', function () {
        let subjectId = $("#newSubjectId").val();
        let subjectName = $("#newSubjectName").val();
        let credit = $("#newCredit").val();
        let theory = $("#newTheory").val();
        let practice = $("#newPractice").val();
        let newSubject = {
            subjectId: subjectId,
            name: subjectName,
            groupSubjectId: $("#newSelectGroupSubject option:selected").val(),
            credit: credit,
            theory: theory,
            practice: practice,
            isDeleted: false
        };
        if (subjectId === '' || subjectName === '' || credit === '' || theory === '' || practice === '') {
            alert("Vui lòng nhập đầy đủ thông tin")
        } else {
            $.getJSON("http://localhost:8080/api/subject/isExist/" + subjectId, function (response) {
                if (response === false) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/api/subject/',
                        data: JSON.stringify(newSubject),
                        contentType: "application/json",
                        success: function () {
                            window.location.reload();
                        }
                    })
                }
                else {
                    alert("Mã ngành đã tồn tại, xin nhập mã ngành khác");
                }
            });

        }
    })
}

function deleteSubject() {
    $(document).on('click', '#deleteSubject', function() {
        const subject = $(this).data("rid");
        $(document).on('click', '#acceptDelete', function() {
            $.ajax({
                url: 'http://localhost:8080/api/subject/' + subject,
                type: 'DELETE',
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

function updateSubject() {
    $(document).on('click', '#updateSubject', function() {
        let id = $(this).data("id");
        let subject;
        $.getJSON("http://localhost:8080/api/subject/" + id, function (response) {
            subject = JSON.parse(JSON.stringify(response));
            $("#subjectId").val(subject.subjectId);
            $("#subjectName").val(subject.name);
            $("#credit").val(subject.credit );
            $("#theory").val(subject.theory);
            $("#practice").val(subject.practice);
        });
        $.getJSON("http://localhost:8080/api/subject/getGroupSubject/" + id, function (response) {
            $("#selectGroupSubject option:selected").text(response.name);
        });

        $(document).on('click', '#saveSubject', function() {
            let subject = {
                _id: id,
                subjectId:  $("#subjectId").val(),
                name:  $("#subjectName").val(),
                groupSubjectId: $("#selectGroupSubject option:selected").val(),
                credit:  $("#credit").val(),
                theory:  $("#theory").val(),
                practice:  $("#practice").val()
            };
            $.ajax({
                url: 'http://localhost:8080/api/subject/',
                type: 'PUT',
                data: JSON.stringify(subject),
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

