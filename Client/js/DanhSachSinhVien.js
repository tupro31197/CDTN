$(document).ready(function () {
    danhSachSinhVien();
});

function danhSachSinhVien() {
    $("#danhSachSinhVien").empty();
    var list = [];
    $.getJSON("http://localhost:8080/api/diem-tong-ket/danhSachSinhVien", function (response) {
        list = JSON.parse(JSON.stringify(response));
        for (var i = 0 ; i < list.length; i++) {
            var STT = i + 1;
            var out = '<tr><th>' + STT + '</th>'
                + '<td>' + list[i].maSinhVien + '</td>'
                + '<td>' + list[i].hoTen + '</td>'
                + '<td>' + list[i].lopChuyenNganh + '</td>'
                + '<td>' + list[i].ngaySinh + '</td>'
                + '<td>' + list[i].soDienThoai + '</td>'
                + '<td>' + list[i].email + '</td>'
                + '<td>' + list[i].diaChi + '</td>'
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

$("#export").click(function () {
    getPDF();
})

function getPDF(){

    var HTML_Width = $("#dataTable").width();
    var HTML_Height = $("#dataTable").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


    html2canvas($("#dataTable")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');

        console.log(canvas.height+"  "+canvas.width);


        var imgData = canvas.toDataURL("image/jpeg", 2.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }

        pdf.save("HTML-Document.pdf");
    });
};