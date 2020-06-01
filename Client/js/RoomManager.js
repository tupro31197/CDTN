$(document).ready(function () {
    loadRoom();
    createRoom();
    updateRoom();
    deleteRoom();
});

function loadRoom() {
    $("#listRoom").empty();
    $('#dataTable').dataTable().fnDestroy();
    let room = [];
    $.getJSON("http://localhost:8080/api/room/", function (response) {
        room = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < room.length; i++) {
            let out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + room[i].name + '</td>'
                + '<td>' + room[i].type + '</td>'
                + '<td>' + room[i].size + '</td>'
                + '<td class="text-center">'
                + '<a class="btn btn-warning btn-circle" id="updateRoom" data-toggle="modal" data-target="#modalUpdateRoom"' +
                'data-id=\"' + room[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteRoom" data-toggle="modal" data-target="#modalDeleteRoom"' +
                'data-rid=\"' + room[i]._id + '">'
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

function createRoom() {
    $("#createNewRoom").on('click', function () {
        let roomSize = $("#newRoomSize").val();
        let roomName = $("#newRoomName").val();
        let roomType = $("#newRoomType").val();
        const newRoom = {
            name: roomName,
            type: roomType,
            size: roomSize,
            isDeleted: false
        };
        if (roomSize === '' || roomName === '' || roomType === '') {
            alert("Vui lòng nhập đầy đủ thông tin")
        } else {
            $.getJSON("http://localhost:8080/api/room/isExist/" + roomName, function (response) {
                if (response === false) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/api/room/',
                        data: JSON.stringify(newRoom),
                        contentType: "application/json",
                        success: function () {
                            window.location.reload();
                        }
                    })
                }
                else {
                    alert("Tên phòng đã tồn tại, xin nhập tên phòng khác");
                }
            });

        }
    })
}

function deleteRoom() {
    $(document).on('click', '#deleteRoom', function() {
        const roomId = $(this).data("rid");
        $(document).on('click', '#acceptDelete', function() {
            $.ajax({
                url: 'http://localhost:8080/api/room/' + roomId,
                type: 'DELETE',
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

function updateRoom() {
    $(document).on('click', '#updateRoom', function() {
        let id = $(this).data("id");
        let room;
        $.getJSON("http://localhost:8080/api/room/" + id, function (response) {
            room = JSON.parse(JSON.stringify(response));
            $("#roomName").val(room.name);
            $("#roomType").val(room.type);
            $("#roomSize").val(room.size);
        });

        $(document).on('click', '#saveRoom', function() {
            let room = {
                _id: id,
                name: $("#roomName").val(),
                type: $("#roomType").val(),
                size: $("#roomSize").val()
            };
            $.ajax({
                url: 'http://localhost:8080/api/room/',
                type: 'PUT',
                data: JSON.stringify(room),
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}
