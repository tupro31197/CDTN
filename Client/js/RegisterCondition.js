$(document).ready(function () {
    loadCurrentYear();
    loadAllSemester();
    saveRegisterCondition();
    loadRegisterConditionBySemester();
    deleteRegisterCondition();
    updateRegisterCondition();
});

function loadCurrentYear() {
    $("#year").empty();
    $.getJSON("http://localhost:8080/api/semester/currentYear/", function (response) {
        $("#year").val(response.year);
        loadAllSemester();
    })
}

function loadAllSemester() {
    let currentYear = $("#year").val();
    $("#semester").empty();
    let listSemester = [];
    $.getJSON("http://localhost:8080/api/semester/getListSemester/" + currentYear, function (response) {
        listSemester = JSON.parse(JSON.stringify(response));
        for (let i = 0; i<listSemester.length; i++){
            let out = '<option value=\"' + listSemester[i]._id + '\">Học kì ' + listSemester[i].name
                + ' nhóm ' + listSemester[i].group
                + '</option>';
            $("#semester").append(out);
        }
        let semesterId = $("#semester option:selected").val();
        loadRegisterCondition(semesterId);
    })
}

function saveRegisterCondition() {
    $("#createRegisterCondition").on('click', function () {
        let name = $("#registerCondition").val();
        let openTime = $("#datetimepicker1").val();
        let closeTime = $("#datetimepicker2").val();
        let credit = $("#creditCondition").val();
        let semesterId = $("#semester option:selected").val();
        const registerCondition = {
            name: name,
            openTime: openTime,
            closeTime: closeTime,
            credit: credit,
            semesterId: semesterId,
            isDeleted: false
        };
        console.log(name)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/registerCondition/',
            data: JSON.stringify(registerCondition),
            processData: false,
            contentType: "application/json",
            success: function () {
                alert("Tạo thời gian đăng ký thành công");
                location.reload();
            },
            error: function () {
                alert("Lỗi không xác định");
            }
        })
    })
}
function loadRegisterConditionBySemester() {
    $("#semester").change(function () {
        let semesterId = $("#semester option:selected").val();
        loadRegisterCondition(semesterId);
    });
}

function loadRegisterCondition(semesterId) {
    $("#listRegisterCondition").empty();
    let list = [];
    $.getJSON("http://localhost:8080/api/registerCondition/findBySemester/" + semesterId, function (response) {
        list = JSON.parse(JSON.stringify(response));
        for (let i = 0; i < list.length; i++) {
            let out = '<tr><td style="width: 5%">' + (i+1) + '</td>'
                + '<td>' + list[i].name + '</td>'
                + '<td>' + list[i].openTime + '</td>'
                + '<td>' + list[i].closeTime + '</td>'
                + '<td>' + list[i].credit + '</td>'
                + '<td class="text-center" style="width: 5%">'
                + '<a class="btn btn-warning btn-circle" id="updateRegisterCondition" data-toggle="modal" data-target="#modalUpdateRegisterCondition" data-id=\"' + list[i]._id +'" style="margin-right: 10px">'
                + '<i class="fas fa-edit text-white"></i></a>'
                + '<a class="btn btn-danger btn-circle" id="deleteRegisterCondition" data-toggle="modal" data-target="#modalDeleteRegisterCondition" data-rid=\"' + list[i]._id + '">'
                + '<i class="fas fa-trash text-white"></i></a></tr>';
            $('#dataTable').find('tbody').append(out);
        }
        $('#dataTable').dataTable({
            "searching": false,
            "lengthChange": false,
            "paging": false
        }).fnDraw();
    })
}

function deleteRegisterCondition() {
    $(document).on('click', '#deleteRegisterCondition', function() {
        const registerConditionId = $(this).data("rid");
        $(document).on('click', '#acceptDelete', function() {
            $.ajax({
                url: 'http://localhost:8080/api/registerCondition/' + registerConditionId,
                type: 'DELETE',
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}

function updateRegisterCondition() {
    $(document).on('click', '#updateRegisterCondition', function() {
        let id = $(this).data("id");
        let registerCondition;
        let semesterId;
        $.getJSON("http://localhost:8080/api/registerCondition/" + id, function (response) {
            registerCondition = JSON.parse(JSON.stringify(response));
            console.log(registerCondition)

            $("#updateDatetimepicker1").val(registerCondition.openTime);
            $("#updateDatetimepicker2").val(registerCondition.closeTime);
            $("#updateCreditCondition").val(registerCondition.credit);
            $("#registerName").val(registerCondition.name);
            semesterId = response.semesterId;
            $.getJSON("http://localhost:8080/api/semester/" + semesterId, function (response){
                $("#semesterName").append('<option value=\"' + response._id + '\">Học kì ' + response.name
                    + ' nhóm ' + response.group
                    + '</option>');
            })
        });

        $(document).on('click', '#saveRegisterCondition', function() {
            const registerCondition = {
                _id: id,
                name: $("#registerName").val(),
                openTime: $("#updateDatetimepicker1").val(),
                closeTime: $("#updateDatetimepicker2").val(),
                credit: $("#updateCreditCondition").val(),
                semesterId: semesterId
            };
            console.log(registerCondition);
            $.ajax({
                url: 'http://localhost:8080/api/registerCondition/',
                type: 'PUT',
                data: JSON.stringify(registerCondition),
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
}
