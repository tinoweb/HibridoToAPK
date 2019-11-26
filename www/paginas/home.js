	goToProfile = () => {
		// alert("entrou sim na função");
		carrega_morador_dados(localStorage.getItem("ID_MORADOR"));
		carregaInfoProfile();
		app.views.main.router.navigate("/perfil/", {animate:true});
	}


	// function handleOpenURL(url) {
	//     // alert("recebido url from server..." +url);
	//     setTimeout(function() {
	// 		resultado = url.split("=");
	// 		alert(resultado[0]);
	// 		alert(resultado[1]);
	// 		if (resultado[0] == "mycoolapp://auth?codigo") {
	// 			alert("entrou na condição do codigo recebido apos cadastro...." + resultado[1]);
	// 			localStorage.setItem("ativacaoCode", resultado[1]);
	// 			$("#initApp").hide();
	// 			$("#telaVerificaCodigo").show();
	// 			$("#codigoAtivacao").val(resultado[1]);
	// 		}else if(resultado[0] == "mycoolapp://auth?recoveryPassword"){
	// 			alert("Codigo de Recuperacao de senha => " +resultado[1]);
	// 			let recoveryCode = resultado[1];
	// 			confirmaCodeResetPassword(recoveryCode);
	// 			alert("passou da funcao confirmaCodeResetPassword");

	// 			console.log("enviar esses codigo para validação e se valido envhaminhar para setar nova senha");
	// 		}else{
	// 			alert("Entrou no else nehuma condicao acima certo...");
	// 		}
	// 	}, 1000);
	// }

