console.log("Estamos na tela do perfil.....");
var foto = localStorage.getItem("FOTO");

setTimeout(function(){
	console.log($('.Perfil_user_foto'));
	console.log(foto);

	let img = "data:image/png;base64,"+foto;
	$('.Perfil_user_foto').attr("src", img);
},600);


