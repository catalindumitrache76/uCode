var exec = require("child_process").exec;
var formulario = require('./formulario.js');
var querystring = require("querystring");
fs =require("fs");
formidable = require("formidable");



function start(response, postData) {
	console.log("Request handler 'start' was called.");
    	response.writeHead(200, {"Content-Type": "text/html"});
    	response.write(formulario.crearFormHtml());
	response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		/* Possible error on Windows systems:
			tried to rename to an already existing file */
		fs.rename(files.upload.path, "/tmp/test.jpg", function(error) {
			if (error) {
				fs.unlink("/tmp/test.jpg");
				fs.rename(files.upload.path, "$HOME/Escritorio/Validation/test.jpg");
			}
		});

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' style= 'max-width: 300px;'/>");

		console.log("Request handler 'start' was called.");
		var content = "empty";
		
		exec("mv -f /tmp/test.jpg $HOME/Escritorio/Validation/test.jpg", function (error, stdout, stderr) {
			//content = stdout;
			//console.log(stdout);		
		});
		
		exec("ls $HOME/Escritorio/Validation/te*", function (error, stdout, stderr) {
			content = stdout;
			console.log(content);		
		});
		exec("bazel build tensorflow/examples/label_image:label_image --ignore_unsupported_sandboxing --nocheck_visibility && bazel-bin/tensorflow/examples/label_image/label_image --graph=/tmp/output_graph.pb --labels=/tmp/output_labels.txt --output_layer=final_result --image=$HOME/Escritorio/Validation/test.jpg 2>&1 | grep 'tensorflow/examples' | head -n 1 | cut -d ' ' -f 5", function (error, stdout, stderr) {				
			content = stdout;
			
			console.log("Content:" + content);
			//console.log("Error:" + stderr);
			content = content.toLowerCase();
			if (content.includes("gazelle")){
				console.log("SIIII GAZELLE");
				response.write("<h1>"+"Parece que buscas las Gazelle"+"</h1>");
			}		
			else if (content.includes("superstar")){
				console.log("SIIII SUPERSTAR");
				
				response.write("<h1>"+"Parece que buscas las Superstar"+"</h1>");
			}
			else if (content.includes("noadidas")){
				console.log("OHH NO ES ADIDAS, ES ADADIDAS");
				
				response.write("<h1>"+"Vaya! No hemos encontrado zapatos que coincidan :("+"</h1>");
			}
			else if (content.includes("thebrandwiththeandstripes")){
				console.log("SIIII THE ALGO");

				response.write("<h1>"+"Parece que buscas las zapatillas Thebrandwiththethreestripes"+"</h1>");
			}
			else if (content.includes("ultraboost")){
				console.log("SIIII ULTRA");

				response.write("<h1>"+"Parece que buscas las Ultra Boost"+"</h1>");
			}
			else if (content.includes("equipment")){
				console.log("SIIII EQUIP");

				response.write("<h1>"+"Parece que buscas las Equipment"+"</h1>");
			}
			else if (content.includes("stansmith")){
				console.log("SIIII STAN");

				response.write("<h1>"+"Parece que buscas las Stan Smith"+"</h1>");
			}
		console.log(content);
		response.end();

		});
		
		
		//return content;
	});

	

}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200,{"Content-Type": "image/jpg"});
	fs.createReadStream("/home/catalin/Escritorio/Validation/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
