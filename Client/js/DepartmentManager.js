$(document).ready(function () {
    loadAllDepartment();
    createDepartment();
    updateDepartment();
    deleteDepartment();
});

function loadAllDepartment() {
    $("#listDepartment").empty();
    $('#dataTable').dataTable().fnDestroy();
    let list = [];
    $.getJSON("http://localhost:8080/api/department/", function (response) {
        list = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < list.length; i++) {
            let out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + list[i].departmentId + '</td>'
                + '<td>' + list[i].departmentName + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateDepartment" data-toggle="modal" data-target="#modalUpdateDepartment" data-id=\"' + list[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteDepartment" data-toggle="modal" data-target="#modalDeleteDepartment" data-rid=\"' + list[i]._id + '">'
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

function createDepartment() {
    $("#createNewDepartment").on('click', function () {
        let departmentId = $("#newDepartmentId").val();
        let departmentName = $("#newDepartmentName").val();
        const newDepartment = {
            departmentId: departmentId,
            departmentName: departmentName,
            isDeleted: false
        };
        if (departmentId === '' || departmentName === '') {
            alert("Vui lòng nhập đầy đủ thông tin")
        } else {
            $.getJSON("http://localhost:8080/api/department/isExist/" + departmentId, function (response) {
                if (response === false) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/api/department/',
                        data: JSON.stringify(newDepartment),
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

function deleteDepartment() {
    $(document).on('click', '#deleteDepartment', function() {
        const departmentId = $(this).data("rid");
        $(document).on('click', '#acceptDelete', function() {
            $.ajax({
                url: 'http://localhost:8080/api/department/' + departmentId,
                type: 'DELETE',
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

function updateDepartment() {
    $(document).on('click', '#updateDepartment', function() {
        let id = $(this).data("id");
        let department;
        $.getJSON("http://localhost:8080/api/department/" + id, function (response) {
            department = JSON.parse(JSON.stringify(response));
            $("#departmentId").val(department.departmentId);
            $("#departmentName").val(department.departmentName);
        });

        $(document).on('click', '#saveDepartment', function() {
            let department = {
                _id: id,
                departmentId: $("#departmentId").val(),
                departmentName: $("#departmentName").val()
            };
            $.ajax({
                url: 'http://localhost:8080/api/department/',
                type: 'PUT',
                data: JSON.stringify(department),
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}
