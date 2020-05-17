$(document).ready(function () {
    loadChuongTrinhHoc("TI");
    autoLoadChuongTrinhHoc();
});

function autoLoadChuongTrinhHoc() {
    $("#selectNganh").change(function () {
        var tenNganh = $("#selectNganh option:selected").val();
        $('#dataTable').dataTable().fnDestroy();
        loadChuongTrinhHoc(tenNganh);
    })
}

function loadChuongTrinhHoc(tenNganh) {
    $("#listChuongTrinhHoc").empty();
    var listChuongTrinhHoc = [];
    $.getJSON("http://localhost:8080/api/chuong-trinh-hoc/" + tenNganh, function (response) {
        listChuongTrinhHoc = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < listChuongTrinhHoc.length; i++) {
            var STT = i + 1;
            var out = '<tr><td>' + STT + '</td>'
                + '<td>' + listChuongTrinhHoc[i].maMon + '</td>'
                + '<td>' + listChuongTrinhHoc[i].tenMon + '</td>'
                + '<td>' + listChuongTrinhHoc[i].dktq + '</td>'
                + '<td>' + listChuongTrinhHoc[i].tctq + '</td>'
                + '<td>' + listChuongTrinhHoc[i].tinChi + '</td>'
                + '<td><button type="button" class="btn btn-info" id="updateRoom" data-toggle="modal" data-target="#modalUpdateRoom" data-id=\"' + listChuongTrinhHoc[i].id + '"\>Sửa</button>'
                + '<button type="button" class="btn btn-danger" id="deleteRoom" data-id=\"' + listChuongTrinhHoc[i].id + '"\>Xóa</button></td></tr>';
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

$(document).ready(function () {
    var filePath;
    $('#fileChuongTrinhHoc').on('change',function ()
    {
        filePath = document.getElementById("fileChuongTrinhHoc").files[0].name;
    });
    $("#acceptImport").click(function () {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/chuong-trinh-hoc/import/' + filePath,
            contentType: "application/json",
            success: function () {
                location.reload();
            }
        })
    })
});

function deleteRoom() {
    $(document).on('click', '#deleteRoom', function() {
        var roomId = $(this).data("id");
        $.ajax({
            url: 'http://localhost:8080/api/room/' + roomId,
            type: 'DELETE',
            success: function () {
                window.location.reload();
            }
        })
    });
}

function updateRoom() {
    $(document).on('click', '#updateRoom', function() {
        var roomId = $(this).data("id");
        var room;
        $.getJSON("http://localhost:8080/api/room/" + roomId, function (response) {
            room = JSON.parse(JSON.stringify(response));
            $("#name").val(room.name);
            $("#type").val(room.type);
            $("#size").val(room.size);
        })
    });
    var roomName = $("#name").val();
    var type = $("#type").val();
    var size = $("#size").val();
    var room = {
        name : roomName,
        type : type,
        size : size
    }
    $("#saveRoom").on('click', function () {
        if (roomName === '' || type === '' || size === '') {
            alert("Vui lòng nhập đầy đủ thông tin")
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/room/',
                data: JSON.stringify(room),
                contentType: "application/json",
                success: function () {

                }
            })
        }
    })
}
