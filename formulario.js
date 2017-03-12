//Generacion del formulario html con un textarea
function crearFormHtml(){
	var html = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'+
    '</body>'+
    '</html>';
    return html;
}

exports.crearFormHtml = crearFormHtml;