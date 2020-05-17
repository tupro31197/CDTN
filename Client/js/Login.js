let userId = window.localStorage.getItem("userId");
let userName = window.localStorage.getItem("userName");
let userRole = window.localStorage.getItem("userRole");

$(document).ready(function () {
    login();
    loadUser();
});

function login() {
    $("#submitLogin").click(function () {
        let account = $("#account").val();
        let password = $("#password").val();
        $.getJSON("http://localhost:8080/api/student/checkLogin/" + account + "/" + password, function (response) {
            let user = JSON.parse(JSON.stringify(response));
            console.log(user);
            if (user !== {}) {
                window.localStorage.setItem("userId", user.userId);
                window.localStorage.setItem("userName", user.userName);
                window.localStorage.setItem("userRole", user.role);
                window.location.assign("http://localhost:63342/Client/cdtnHTML/Home.html")
            }
        });
    })
}

function loadUser() {
    $("#userDropdown").empty();
    let out = '<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"' +
        ' aria-expanded="false" data-role= \"' + userRole + '\">'
        + '<span class="mr-2 d-none d-lg-inline text-gray-600 small">' + userName + '</span>'
        + '<img class="img-profile rounded-circle" src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg">'
        + '</a>';
    $("#user-info").append(out);
    if (userRole == "PDT") {

    } else if (userRole = "Trưởng bộ môn") {

    } else if (userRole = "Giảng viên") {

    } else if (userRole = "SV") {

    }

}
