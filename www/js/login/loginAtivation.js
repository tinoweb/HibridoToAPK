// DONE BY TINO 22/10/2019

swich_tela_login = () => {
	app.views.main.router.navigate("/login/", {animate:true, transition: 'f7-dive'});
	$$(document).on('page:init', function (e) {
		// alert("tum");
		app.sheet.create({
		  el: '.loginApp',
		  closeByOutsideClick: false,
		  closeByBackdropClick: false,
		  closeOnEscape: false
		});
		app.actions.open('.loginApp', true);
	})
}

loginOut = () => {
	app.views.main.router.navigate("/index/", {animate:true});
	$$(document).on('page:init', function (e) {
		app.actions.close('.loginApp', true);
	})
}

setPwdOut = () => {
	app.actions.close('.defineSenhaApp', true);
	app.views.main.router.navigate("/index/", {animate:true});
	$$(document).on('page:init', function (e) {
		app.actions.close('.defineSenhaApp', true);
	})
}

setingPwdVoltar = () => {
	app.actions.close('.defineSenhaApp', true);
	$$(".defineSenhaApp").on('sheet:closed', function(event) {
		app.views.main.router.navigate("/termo_de_uso/", {animate:true});
		$$(document).on('page:init', function (e) {
			app.actions.close('.defineSenhaApp', true);
		})
	});
}

fechaRecoverEmail = () => {
	app.actions.close('.recuperaSenha', true);
	app.actions.open('.loginApp', true);
	console.log("fecha recuypera e abre login....");
}

esqueciMinhaSenha = () => {
	app.actions.close('.loginApp', true);
	app.sheet.create({
	 	el: '.recuperaSenha',
		closeByOutsideClick: false,
	  	closeByBackdropClick: false,
	  	closeOnEscape: false
	});
	app.actions.open('.recuperaSenha', true);
}

primeiroAcessoBtnVoltar = () => {
	app.views.main.router.navigate("/index/", {animate:true});

}

swich_tela_primeiroAcesso = () => {
	app.views.main.router.navigate("/activationcode/", {animate:true, transition: 'f7-cover'});
}

voltaraoPrimeiroAcesso = () => {
	app.views.main.router.navigate("/index/", {animate:true});
}

swich_to_primeiroAcesso = () => {
	app.views.main.router.navigate("/activationcode/", {animate:true});
}

cancelarTermo = () => {	
	localStorage.removeItem('idUsuarioAtivacao');	// remover o id_usuairo do storage... não aceitou o termo
	app.views.main.router.navigate("/index/", {animate:true});
}

// function emailNotRecognizedBySystemAlert(type, messenge, afterClose=null){
// 	Swal.fire({
// 	  	type: type,
// 	  	text: messenge,
// 		timer: 4000,
// 		onBeforeOpen: () => {
// 			Swal.showLoading()
// 			timerInterval = setInterval(() => {}, 100)
// 		},
// 		onClose: () => {
// 			if (afterClose == "primeiroAcesso") {
// 				$("#inputReceveEmailToGetCode").val("");
// 				$("#telaVerificaCodigo").css('display', 'block');
// 				$("#primeiroAcesso").css('display', 'none');
// 				$("#initApp").css('display', 'none');
// 			}else if(afterClose == "defineSenha"){
// 				switchTelaDefineSenhaToLogin();
// 			}else if (afterClose == "logaNoApp") {

// 			}else if(afterClose == "logaDoFace"){
// 				login_user_device();
// 			}else if(afterClose == "logaDoGoogle"){
// 				login_user_device();
// 			}else if (afterClose == "termoUso") {
// 				$("#initApp").hide();
// 				$("#login_ini").hide();
// 				$("#telaAceitaTermo").show(); // a função coorespondente está no index logo abaixo do elemento button aceita termo
// 			}
// 		}
// 	}).then((result) => {
// 		if (result.dismiss === Swal.DismissReason.timer) {
// 			// console.log('I was closed by the timer');
// 		}
// 	});
// }

// function alertShowPosibilityToResetPassword(email){
// 	Swal.fire({
// 	  	text: "Esse email se encontra ativo! Deseja recuperar a sua senha",
// 	  	type: 'warning',
// 	  	showCancelButton: true,
// 	  	confirmButtonColor: '#3085d6',
// 	  	cancelButtonColor: '#d33',
// 	  	confirmButtonText: 'Sim recuperar senha!'
// 	}).then((result) => {
// 	  	if (result.value) {
// 	  		Swal.close();
// 	  		primeiroAcessoBtnVoltar();
// 	  		swich_tela_login();
// 	  		esqueciMinhaSenha();
// 	  		$("#email_recupera").val(email);
// 	  	}
// 	});
// }

function choosedMail(){
	let campoEmail = $("#inputReceveEmailToGetCode").val();
	if (campoEmail.length !== 0) {

		app.sheet.close('.recebEmail', true); // tirar depois

		// let chama = () => {
		// 	console.log("certo");
		// }
		// app.dialog.alert("Testo do Dialog", "title", chama());
		
		app.views.main.router.navigate("/receveAtivationCode/", {animate:true});

		// console.log(localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php');
		// $.ajax({
		// 	type: 'POST',
		// 	url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
		// 	crossDomain: true,
		// 	beforeSend : function() { $("#wait").css("display", "block"); },
		// 	complete   : function() { $("#wait").css("display", "none"); },
	 //        data       : { email : campoEmail, typeFunction : 'enviarEmailParaAtivacao' },
	 //        dataType   : 'json',
		// 	success: function(retorno){
		// 		if (retorno.status == "emailNaoReconhecidoPeloSistema") {
		// 			app2.sheet.close('.recebEmail', true);
		// 			emailNotRecognizedBySystemAlert('error','Email não reconhecido pelo sistema, Insira seu email cadastrado');
		// 			$("#inputReceveEmailToGetCode").val("");
		// 		}else if(retorno.status == "naoPossuiNenhumPerfilAtivo"){
		// 			app2.sheet.close('.recebEmail', true);
		// 			emailNotRecognizedBySystemAlert('error','Esse email não possui perfil Ativo no sistema');
		// 			$("#inputReceveEmailToGetCode").val("");
		// 		}else if (retorno.status == "codigoEnviadoParaEmailComSucesso" && retorno.statuscode == 200) {
		// 			app2.sheet.close('.recebEmail', true);
		// 			emailNotRecognizedBySystemAlert('success', "Código de Ativação enviado para o email com Sucesso", "primeiroAcesso");
		// 		}else if (retorno.status == "proporRecuperacaoSenhaUsuarioAtivo" && retorno.statuscode == 200) {
		// 			app2.sheet.close('.recebEmail', true);
		// 			alertShowPosibilityToResetPassword(campoEmail);
		// 			$("#inputReceveEmailToGetCode").val("");
		// 		}
	 //        },
	 //        error: function(error) {
	 //        	console.log("tem informacoes com erro");
		// 		console.log(error);
	 //        }
		// });	
	}else{
		alerta("","Insira seu email para continuar", 3000);	
	}
}

// function choosedSms(){
// 	$("#primeiroAcesso").hide();
// 	$("#initApp").hide();
// 	$("#telaVerificaCodigo").css('display', 'block');
// }


enviarCodigoAtivacao = () => {
	console.log("send code ativacao...");
	app.views.main.router.navigate("/termo_de_uso/", {animate:true});


// 	let codigoAtivacao = $("#codigoAtivacao").val();
// 	console.log(localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php');
// 	if (codigoAtivacao.length !== 0) {
// 		$.ajax({
// 			type: 'POST',
// 			url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
// 			crossDomain: true,
// 			beforeSend : function() { $("#wait").css("display", "block"); },
// 			complete   : function() { $("#wait").css("display", "none"); },
// 	        data       : { codigo : codigoAtivacao, typeFunction : 'enviarCodigoAtivacao' },
// 	        dataType   : 'json',
// 			success: function(retorno){
// 				console.log(retorno);    
// 				if (retorno.statuscode == 200 && retorno.status == "codigoOk") {
// 					localStorage.setItem("idUsuarioAtivacao", retorno.idUsuario); // Id do usuario recebido atraves do codigo de ativacao
// 					$("#btnCancelarConta").hide();
// 					$("#btnAtivarConta").hide();
// 					$("#telaVerificaCodigo").hide();
// 					$("#telaAceitaTermo").show();
// 					$(".aceitaTermoClass").css('display', 'block');
// 					$("#concordaComTermo").hide();
// 				}else if (retorno.statuscode == 204 && retorno.status == "usuarioNaoEncontradoParaCodigo") {
// 					emailNotRecognizedBySystemAlert('error', "Código de Ativação Inválido, Confira o codigo enviado no seu email");
// 					$("#codigoAtivacao").val("");
// 				}
// 	        },
// 	        error: function(error) {
// 				console.log(error);
// 	        }
// 		});	
// 	}else{
// 		app2.input.validate("#codigoAtivacao");
// 	}
}

// let enviarSenhaEliberarAcesso = () => {
// 	let email = localStorage.getItem('emailSocialMidia');
// 			    localStorage.removeItem('emailSocialMidia');
// 	$.ajax({
// 		type: 'POST',
// 		url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
// 		crossDomain: true,
// 		beforeSend : function() { $("#wait").css("display", "block"); },
// 		complete   : function() { $("#wait").css("display", "none"); },
//         data: { 
// 			uuid: device.uuid,
// 			nome: device.model,
// 			versao: device.version,
// 			sistema: device.platform,
// 			typeFunction : "setPassworLiberaUsuario",
// 			emailGmail : email, 
// 			id_notificacao: localStorage.getItem('registrationId')
// 		},
//         dataType   : 'json',
// 		success: function(retorno){
// 			console.log(retorno);
			
// 			if (retorno.status == "usuarioValidoToLogin" && retorno.statuscode == 200) {
// 				emailNotRecognizedBySystemAlert('success', "direcionando para App", afterClose="logaDoFace");
// 			}else{
// 				emailNotRecognizedBySystemAlert("error", 'O ' +email+ ' não está liberado para acessar o condominio tente outra forma de autenticar..', afterClose=null)
// 			}
//         },
//         error: function(error) {
// 			console.log(error);
// 			// alert('não foi possivel continuar...');
//         }
// 	});
// }

 let aceiteiTermo = (prossigaOutroCaminho=null) => {
	if (prossigaOutroCaminho == null) {
		console.log("entrou aki");
		app.views.main.router.navigate("/define_senha/", {animate:true});
		$$(document).on('page:init', function (e) {
			app.sheet.create({
			  el: '.defineSenhaApp',
			  closeByOutsideClick: false,
			  closeByBackdropClick: false,
			  closeOnEscape: false
			});
			app.actions.open('.defineSenhaApp', true);
		})

		// $("#inputDefineSenha").blur(function() {
		// 	$("#btnSaveSenha").attr('disabled', false);
		// 	if ($("#inputDefineSenha").val().length === 0 ) {
		// 		$("#btnSaveSenha").attr('disabled', true);
		// 	}
		// });
	}else{
		console.log("posso continuar agora...");
		enviarSenhaEliberarAcesso();
	}
}



myFunction = () => {
	if($("#tab-1").scrollTop() + $("#tab-1").height() >= $("#tab-1").get(0).scrollHeight -70) {
		$("#concordaComTermo").show('700');
		$("#checkboxElementoTermo").change(function() {
			if (this.checked) {
				$("#concordaComTermo").hide();
				$("#btnAtivarConta").show();
				$("#btnCancelarConta").show();
			}
		});
	}else{
		$("#checkboxElementoTermo").prop("checked", false);
		$("#btnAtivarConta").hide();
		$("#btnCancelarConta").hide();
	}
}


// function definesenha(){
// 	afed('#defineSenha','#initApp','','',1);	
// }

// function btnSairTelaDefineSenha(){
// 	afed('#initApp','#defineSenha','','',1);
// }

// function switchTelaDefineSenhaToLogin(){
// 	afed('#login_ini','#defineSenha','','');
// 	app2.sheet.create({
// 	  el: '.loginApp',
// 	  closeByOutsideClick: false,
// 	  closeByBackdropClick: false,
// 	  closeOnEscape: false
// 	});
// 	app2.actions.open('.loginApp', true);
// }

// function salvarSenha(){
// 	if ($("#inputDefineSenha").val().length !== 0 ) {
// 		$("#btnSaveSenha").attr('disabled', false);
// 		if ($("#inputDefineSenha").val() != $("#inputDefineSenhaRepita").val()) {
// 			alerta("", "As senhas não combinam. Elas devem ser iguais!", 4000);
// 		}else{

// 			let senha = $("#inputDefineSenha").val();

// 			idUsuario = null;	
// 			idUsuario = localStorage.getItem('idUsuarioAtivacao');
// 			alert("usuariio ===>>" + idUsuario);

// 			$.ajax({
// 				type: 'POST',
// 				url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
// 				crossDomain: true,
// 				beforeSend : function() { $("#wait").css("display", "block"); },
// 				complete   : function() { $("#wait").css("display", "none"); },
// 		        data: { 
// 	    				idUsuario : idUsuario, 
// 	    				senha : senha,
// 	    				typeFunction : "definirSenha"
// 		    		},
// 		        dataType   : 'json',
// 				success: function(retorno){
// 					if (retorno.statuscode == 200 && retorno.status == "senhaDefinidoOk") {
// 						$('#formSendDefineSenha').trigger("reset");
// 						emailNotRecognizedBySystemAlert('success', "Senha definida com sucesso", "defineSenha");
// 					}
// 		        },
// 		        error: function(error) {
// 					console.log(error);
// 					alert('Não foi possivel executar a ação pretendida, entre em contato com seu administrador');
// 		        }
// 			});	
// 		}
// 	}else{
// 		alerta("","Defina uma senha para continuar", 3000);
// 	}
// }

// não ta sendo usado essa função..............
// confirmaCodeResetPassword = (recoveryCode) => {
// 	alert("codigo recebido "+recoveryCode);
// 	$.ajax({
// 		type: 'POST',
// 		url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
// 		crossDomain: true,
// 		beforeSend : function() { $("#wait").css("display", "block"); },
// 		complete   : function() { $("#wait").css("display", "none"); },
//         data: { 
// 				recoveryCode : recoveryCode, 
// 				typeFunction : "validaCodigo"
//     		},
//         dataType   : 'json',
// 		success: function(retorno){
// 			console.log(retorno);

// 			if (retorno.status == "codigoConfere" && retorno.statuscode == 200) {
				
// 				console.log("definir senha");
// 				alert("definir senha");
// 				alert("codigo confirmado");

// 				localStorage.removeItem('idUsuarioAtivacao');
// 				localStorage.setItem("idUsuarioAtivacao", retorno.id_usuario);
// 				definesenha();
// 			}else{
// 				emailNotRecognizedBySystemAlert("error", "Não foi possivel continuar o processo...", afterClose=null)
// 			}
//         },
//         error: function(error) {
// 			console.log(error);
// 			alert('Não foi possivel executar a ação pretendida, entre em contato com seu administrador');
//         }
// 	});	
// }
// não ta sendo usado essa função..............

  /*
  ########################################
  #     Adicionar Facebook login         #
  ########################################
  */

function loginFB() {
	console.log("chama funcao login FB");
	facebookConnectPlugin.logout(
	function(successo){
		// alert(JSON.stringify(successo));
	    facebookConnectPlugin.login(['public_profile', 'email'], function(result){
	    	// alert(JSON.stringify(result));
	        facebookConnectPlugin.api("/me?fields=id,name,email", ["email"], function(userData){
	        	// alert(JSON.stringify(userData));
	            let name = userData.name;
	            let email = userData.email;
	    		localStorage.setItem('emailSocialMidia', email);
	    		alert("vai para a checkUsuarioFacebookToLogin()");
	            // checkUsuarioFacebookToLogin(email);
	        },function(error){
	            alert("erro no query do api...");
	        });
	    },function(error){
	        alert(JSON.stringify(error));
	        alert("erro no metodo login...");
	    })
	},
	function(erroror){
		alert(JSON.stringify(erroror));
	});


}

checkUsuarioFacebookToLogin = (email) => {
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data: { 
			uuid: device.uuid,
			nome: device.model,
			versao: device.version,
			sistema: device.platform,
			typeFunction : "checkEmailFacebook",
			emailFacebook : email, 
			id_notificacao: localStorage.getItem('registrationId')
		},
        dataType   : 'json',
		success: function(retorno){
			// alert(retorno);
			// alert(JSON.stringify(retorno));
			if (retorno.status == "usuarioValidoToLoginFacebook" && retorno.statuscode == 200) {
				emailNotRecognizedBySystemAlert('success', "direcionando para App", afterClose="logaDoFace");
			}else 
			if (retorno.status == "perfilAtivoSemSenha" && retorno.statuscode == 200) {
				$("#btnAtivarConta").attr('data-liberarSemSenha', 'liberarSemSenha');
				emailNotRecognizedBySystemAlert('success', "direcionando para termo de uso", afterClose="termoUso");
			}else{
				emailNotRecognizedBySystemAlert("error", 'O ' +email+ ' não está liberado para acessar o condominio tente outra forma de autenticar ou entre em contato com a sua adminstradora..', afterClose=null)
			}
        },
        error: function(error) {
			console.log(error);
			console.log('não foi possivel continuar...');
        }
	});	
}

  /*
  ########################################
  #       Adicionar Google login         #
  ########################################
  */

let loginGoogle = () =>{
	console.log("chama funcao login");
	window.plugins.googleplus.login({},
	    function(obj) {
	      	let email = obj.email;
	      	let nome = obj.displayName;
			localStorage.setItem('emailSocialMidia', email);

			alert("vai para a checkUsuarioGoogleToLogin()");
		    // checkUsuarioGoogleToLogin(email);
	    },
	    function(msg) {
	      console.log('error: ' + msg);
	    }
	);
}

checkUsuarioGoogleToLogin = (email) => {
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data: { 
			uuid: device.uuid,
			nome: device.model,
			versao: device.version,
			sistema: device.platform,
			typeFunction : "checkEmailGoogle",
			emailGoogle : email, 
			id_notificacao: localStorage.getItem('registrationId')
		},
        dataType   : 'json',
		success: function(retorno){
			if (retorno.status == "usuarioValidoToLogin" && retorno.statuscode == 200) {
				emailNotRecognizedBySystemAlert('success', "direcionando para App", afterClose="logaDoFace");
			}else 
			if (retorno.status == "perfilAtivoSemSenha" && retorno.statuscode == 200) {
				$("#btnAtivarConta").data('liberarSemSenha', 'liberarSemSenha');
				emailNotRecognizedBySystemAlert('success', "direcionando para termo de uso", afterClose="termoUso");
			}else 
			if (retorno.status == "usuarioValidoToLoginGoogle" && retorno.statuscode == 200){
				emailNotRecognizedBySystemAlert('success', "direcionando para App", afterClose="logaDoGoogle");
			}
			else{
				emailNotRecognizedBySystemAlert("error", 'O ' +email+ ' não está liberado para acessar o condominio tente outra forma de autenticar ou entre em contato com a sua adminstradora..', afterClose=null)
			}
        },
        error: function(error) {
			console.log(error);
			console.log('não foi possivel continuar...');
        }
	});	
}



