let studentId = window.localStorage.getItem("userId");
let role = window.localStorage.getItem("userRole")

$(document).ready(function () {
    loadProfile(studentId);
    saveProfile();
});


function loadProfile(userId) {
    $.getJSON("http://localhost:8080/api/student/getProfile/" + userId, function (response) {
        let userResponse = JSON.parse(JSON.stringify(response));
        $("#studentId").val(userResponse.userId);
        $("#userName").val(userResponse.userName);
        if (userResponse.class === "") {
            userResponse.class = "No information *"
        }
        $("#userClassName").val(userResponse.class);
        if (userResponse.department === "") {
            userResponse.department = "No information *"
        }
        $("#userDepartment").val(userResponse.department);
        if (userResponse.email === "") {
            userResponse.email = "No information *"
        }
        $("#userEmail").val(userResponse.email);
        if (userResponse.phoneNumber === "") {
            userResponse.phoneNumber = "No information *"
        }
        $("#userPhoneNumber").val(userResponse.phoneNumber);
        if (userResponse.dob === "") {
            userResponse.dob = "No information *"
        }
        $("#userDob").val(userResponse.dob);
        if (userResponse.address === "") {
            userResponse.address = "No information *"
        }
        $("#userAddress").val(userResponse.address);
    })
}

function saveProfile() {
    let studentId = $("#studentId").val();
    let userName = $("#userName").val();
    let userClassName = $("#userClassName").val();
    let userDepartment = $("#userDepartment").val();
    let userEmail = $("#userEmail").val();
    let userPhoneNumber = $("#userPhoneNumber").val();
    let userDob = $("#userDob").val();
    let userAddress = $("#userAddress").val();
    $("#btnSubmit").on('click', function () {
        let profile = {
            userId: studentId,
            userName: userName,
            userClassName: userClassName,
            userDepartment: userDepartment,
            userEmail: userEmail,
            userPhoneNumber: userPhoneNumber,
            userDob: userDob,
            userAddress: userAddress
        };
        if (role === "SV") {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/nguoi-dung/',
                data: JSON.stringify(profile),
                processData: false,
                contentType: "application/json",
                success: function () {
                    location.reload();
                }
            })
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/nguoi-dung/',
            data: JSON.stringify(profile),
            processData: false,
            contentType: "application/json",
            success: function () {
                location.reload();
            }
        })
    })
}
