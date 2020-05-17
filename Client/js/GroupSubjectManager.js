$(document).ready(function () {
    loadGroupSubject();
    createGroupSubject();
    updateGroupSubject();
    deleteGroupSubject();
});

function loadGroupSubject() {
    $("#listGroupSubject").empty();
    $('#dataTable').dataTable().fnDestroy();
    var groupSubjectList = [];
    $.getJSON("http://localhost:8080/api/groupSubject/", function (response) {
        groupSubjectList = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < groupSubjectList.length; i++) {
            var out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + groupSubjectList[i].name + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateGroupSubject" data-toggle="modal" data-target="#modalUpdateGroupSubject"' +
                'data-id=\"' + groupSubjectList[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteGroupSubject" data-toggle="modal" data-target="#modalDeleteGroupSubject"' +
                'data-rid=\"' + groupSubjectList[i]._id + '">'
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

function deleteGroupSubject() {
    $(document).on('click', '#deleteGroupSubject', function() {
        const groupSubjectId = $(this).data("rid");
        $(document).on('click', '#acceptDelete', function() {
            $.ajax({
                url: 'http://localhost:8080/api/groupSubject/' + groupSubjectId,
                type: 'DELETE',
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

function updateGroupSubject() {
    $(document).on('click', '#updateGroupSubject', function() {
        let id = $(this).data("id");
        console.log(id)
        $.getJSON("http://localhost:8080/api/groupSubject/" + id, function (response) {
            console.log(response)
            $("#groupSubjectName").val(response.name);
        });

        $(document).on('click', '#saveGroupSubject', function() {
            let groupSubject = {
                _id: id,
                name: $("#groupSubjectName").val()
            };
            $.ajax({
                url: 'http://localhost:8080/api/groupSubject/',
                type: 'PUT',
                data: JSON.stringify(groupSubject),
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

function createGroupSubject() {
    $("#createGroupSubject").on('click', function () {
        let groupSubjectName = $("#newGroupSubjectName").val();
        const newGroupSubject = {
            name: groupSubjectName,
            isDeleted: false
        };
        if (groupSubjectName === '') {
            alert("Vui lòng nhập đầy đủ thông tin")
        } else {
            $.getJSON("http://localhost:8080/api/department/isExist/" + groupSubjectName, function (response) {
                if (response === false) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/api/groupSubject/',
                        data: JSON.stringify(newGroupSubject),
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
