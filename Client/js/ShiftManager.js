$(document).ready(function () {
    loadShift();
    createShift();
    updateShift();
    deleteShift();
});

function loadShift() {
    $("#listRoom").empty();
    $('#dataTable').dataTable().fnDestroy();
    let shift = [];
    $.getJSON("http://localhost:8080/api/shift/", function (response) {
        shift = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < shift.length; i++) {
            let out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + shift[i].startShift + '</td>'
                + '<td>' + shift[i].endShift + '</td>'
                + '<td>' + shift[i].dayOfWeek + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateShift" data-toggle="modal" data-target="#modalUpdateShift"' +
                'data-id=\"' + shift[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteShift" data-toggle="modal" data-target="#modalDeleteShift"' +
                'data-rid=\"' + shift[i]._id + '">'
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

function createShift() {
    $("#newShift").on('click', function () {
        console.log("123")
        let start = $("#newStartShift").val();
        let end = $("#newEndShift").val();
        let dow = $("#newDayOfWeek").val();
        const newShift = {
            startShift: start,
            endShift: end,
            dayOfWeek: dow,
            isDeleted: false
        };
        if (start === '' || end === '' || dow === '') {
            alert("Vui lòng nhập đầy đủ thông tin")
        } else {
            $.getJSON("http://localhost:8080/api/shift/isExist/" + start + "/" + end + "/" + dow, function (response) {
                if (response === false) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/api/shift/',
                        data: JSON.stringify(newShift),
                        contentType: "application/json",
                        success: function () {
                            window.location.reload();
                        }
                    })
                }
                else {
                    alert("Ca học đã tồn tại, xin nhập ca học khác");
                }
            });

        }
    })
}

function deleteShift() {
    $(document).on('click', '#deleteShift', function() {
        const shiftId = $(this).data("rid");
        $(document).on('click', '#acceptDelete', function() {
            $.ajax({
                url: 'http://localhost:8080/api/shift/' + shiftId,
                type: 'DELETE',
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

function updateShift() {
    $(document).on('click', '#updateShift', function() {
        let id = $(this).data("id");
        let shift;
        $.getJSON("http://localhost:8080/api/shift/" + id, function (response) {
            shift = JSON.parse(JSON.stringify(response));
            $("#startShift").val(shift.startShift);
            $("#endShift").val(shift.endShift);
            $("#dayOfWeek").val(shift.dayOfWeek);
        });

        $(document).on('click', '#saveShift', function() {
            let shift = {
                _id: id,
                startShift: $("#startShift").val(),
                endShift: $("#endShift").val(),
                dayOfWeek: $("#dayOfWeek").val()
            };
            $.ajax({
                url: 'http://localhost:8080/api/shift/',
                type: 'PUT',
                data: JSON.stringify(shift),
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

