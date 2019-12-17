// DONE BY TINO 22/10/2019

var sheetDefineSenhaApp=null;
var sheetloginApp=null;
var sheetMultiUser=null;
var smartSelect=null;


swich_tela_login = () => {
	app.views.main.router.navigate("/login/", {animate:true, transition: 'f7-dive'});
	$$(document).on('page:init', '.page[data-name="pgLogin"]', function (e) {
		sheetloginApp = app.sheet.create({
		  el: '.loginApp',
		  closeByOutsideClick: false,
		  closeByBackdropClick: false,
		  closeOnEscape: false
		});
		app.sheet.open('.loginApp', true);
	})
}

swich_tela_login_recuperaSenha = (email_recupera) => {
	console.log("entrou na tela sim...");
	console.log(email_recupera);

	app.views.main.router.navigate("/login/", {animate:true, transition: 'f7-dive'});
	$$(document).on('page:init', '.page[data-name="pgLogin"]', function (e) {
		sheetloginApp = app.sheet.create({
		  el: '.loginApp',
		  closeByOutsideClick: false,
		  closeByBackdropClick: false,
		  closeOnEscape: false
		});
		app.sheet.open('.loginApp', true);
		app.sheet.close('.loginApp', true);a

		app.sheet.create({
		  el: '.recuperaSenha',
		  closeByOutsideClick: false,
		  closeByBackdropClick: false,
		  closeOnEscape: false
		});
		app.sheet.open('.recuperaSenha', true);
		$$('#email_recupera').val(email_recupera);
		// $$(".inputRecuperaSenha").focus();
	})
}


loginOut = () => {
	goToIndexPage();
	$$(document).on('page:init', '.page[data-name="pgIndex"]', function (e) {
		app.actions.close('.loginApp', true);
	})
}

setPwdOut = () => {
	app.actions.close('.defineSenhaApp', true);
	app.views.main.router.navigate("/index/", {
		animate:true,
		transition: 'f7-dive',
		reloadAll:true
	});
	
	$$(document).on('page:init', '.page[data-name="pgIndex"]', function (e) {
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
}

esqueciMinhaSenha = () => {
	app.actions.close('.loginApp', true);
	app.sheet.create({
	 	el: '.recuperaSenha',
		closeByOutsideClick: false,
	  	closeByBackdropClick: false,
	  	closeOnEscape: false
	});
	app.sheet.open('.recuperaSenha', true);
}

goToIndexPage = () => {
	return app.views.main.router.navigate("/index/", {animate:true});
}

goToIndexPageNoCache = () => {
	return app.views.main.router.navigate("/index/", {
		animate:true,
		transition: 'f7-dive',
		reloadAll:true
	});
}

primeiroAcessoBtnVoltar = () => {
	goToIndexPageNoCache()
}

swich_tela_primeiroAcesso = () => {
	app.views.main.router.navigate("/activationcode/", {animate:true});
}

voltaraoPrimeiroAcesso = () => {
	goToIndexPage();
}

swich_to_primeiroAcesso = () => {
	app.views.main.router.navigate("/activationcode/", {animate:true});
}

cancelarTermo = () => {	
	localStorage.removeItem('idUsuarioAtivacao');	// remover o id_usuairo do storage... não aceitou o termo
	goToIndexPageNoCache();
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

/*
########################################
# Actions Function login Email e senha #
########################################
*/
login_user = (e, logarDaValidacao=null) => {
	e.preventDefault();
	if(navigator.connection.type != 'none'){
		if (logarDaValidacao == null) {
			var dados = $("#form_login").serialize();

			if(dados.indexOf('=&') > -1 || dados.substr(dados.length - 1) == '='){
			   alertaDialog("Falha ao Logar","Necessário email e senha para continuar");
			   return false;
			}
		}else{
			dados = `email=${localStorage.getItem('emailDefinidoOk')}&senha=${localStorage.getItem('senhaDefinidoOk')}`;
		}

        if(device.uuid == null){
            var UUID = '1234567890';
        }else{
            var UUID = device.uuid;
        }

		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/login.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data: dados+'&nome='+device.model+'&sistema='+device.platform+'&uuid='+UUID+'&versao='+device.version+'&id_notificacao='+localStorage.getItem('registrationId'), //APP
			success: function(retorno){
				//console.log(retorno);
					//alert(retorno);
				if(retorno[0]['error'] == 1){
					alertaDialog("Falha ao Entrar", "Usuário ou senha inválida", );
				}else{
					login_user_device();	
				}
			},
            error: function(error){
            	console.log(error);
                alertaDialog('Aviso','Erro de conexão com o servidor');
            }
		});
	}else{
		alertaDialog('Internet','Sem conex\u00e3o com a Internet');
	}
}

/*
########################################
# Actions Function Device by uuid      #
########################################
*/
login_user_device = (autoInit=null) => {
	localStorage.setItem('VERSAO','1.2.5');
    if(navigator.connection.type != 'none'){
        if(device.uuid == null){
            var UUID = '1234567890';
        }else{
            var UUID = device.uuid;
        }

        $.ajax({
            type       : "POST",
            url        : localStorage.getItem('DOMINIO_LOGIN')+"appweb/login.php",
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {uuid : UUID, id_notificacao : localStorage.getItem('registrationId')}, //APP
            success    : function(retorno) {
				//console.log("retorno do login.....===>>>");
				//console.log(retorno);
				// return false;
					
				
				if(retorno[0]['error'] == 0){
					if(retorno[0]['VERSAO'] == localStorage.getItem('VERSAO')){
						if(retorno[0]['perfil'] > 1){
							console.log("vai carregar perfil.........");
							// multprofile user....
							if (autoInit != null) {
								carrega_user_perfil(retorno[0]['id_usuario'], autoInit);
							}else{
								carrega_user_perfil(retorno[0]['id_usuario']);
							}

							localStorage.setItem('ID_USER_L',retorno[0]['id_usuario']);
						}else{  

							// console.log(JSON.stringify(retorno));
							// return false;

							if(retorno[0]['usar_control_condo'] == 1){
								console.log("PERMITIDO CONTROLCONDO....");

								localStorage.setItem('ID_USER',retorno[0]['id_usuario_condominio']);
								localStorage.setItem('ID_USER_L',retorno[0]['id_usuario']);
								localStorage.setItem('ID_MORADOR',retorno[0]['id_referencia']);
								localStorage.setItem('ID_UNIDADE',retorno[0]['id_unidade']);
								localStorage.setItem('ID_CONDOMINIO',retorno[0]['id_condominio']);
								localStorage.setItem('CONDOMINIO',retorno[0]['nome_condominio']);
								localStorage.setItem('TIPO_BUSCA_VISITANTE',retorno[0]['tipo_busca_visitante']);
								localStorage.setItem('QTD_CONTROL_CONDO',retorno[0]['qtd_control_condo']);
								localStorage.setItem('QTD_CREDITO',retorno[0]['qtd_credito_liberacao']);
								localStorage.setItem('PERIODO_MAX',retorno[0]['periodo_max_liberacao']);
								localStorage.setItem('EXIBIR_NOME',retorno[0]['exibir_nome_qrcode']);

								setTimeout(function(){
									$.ajax({
										type : "POST",
										url : localStorage.getItem('DOMINIO')+"appweb/notificacao_correspondencia.php",
										data : {
											id_condominio : localStorage.getItem('ID_CONDOMINIO'),
											id_unidade : localStorage.getItem('ID_UNIDADE')
										},
										success : function(retornos){
											localStorage.setItem('ID_MORADORES_UNIDADE',retornos);
										}
									});	
								},3);
								
								if(retorno[0]['tipo_busca_visitante'] == 0){
									console.log("tipo_busca_visitante == 0");
									// descomentar e rever corretamente ======>>>
									// afed('#btipo_nome','#btipo_rg','','',3,'home');
								}else{
									console.log("tipo_busca_visitante != 0");
									// descomentar e rever corretamente ======>>>
									// afed('#btipo_rg','#btipo_nome','','',3,'home');
								}

								if(retorno[0]['GRUPOS'].indexOf("Morador") != -1){ 
									localStorage.setItem('GRUPO_MOR',1);
									// descomentar e rever corretamente ======>>>
									// $("#gmor").css("display","block");
								}

								if(retorno[0]['GRUPOS'].indexOf("Síndico") != -1){
									$(".mlsindico").show();
									$(".msindico").show();  
									localStorage.setItem('GRUPO_SIN',1);
									$("#gsin").css("display","block"); 
								}else{ 
									$(".mlsindico").hide();
									$(".msindico").hide();  
								}

								if(retorno[0]['GRUPOS'].indexOf("Administração") != -1){
									$(".madministracao").show();
									$(".mlsindico").show(); 
									localStorage.setItem('GRUPO_ADM',1);
									$("#gadm" ).css("display","block"); 
								}else{
									$(".mlsindico").hide();
									$(".madministracao").hide();  
								}

								if(retorno[0]['GRUPOS'].indexOf("Administradora") != -1){
									$(".mlsindico").show();
									localStorage.setItem('GRUPO_ADM2',1);
									$("#gadm2").css("display","block"); 
								}else{ 
									$(".mlsindico").hide();
									$(".madministradora").hide(); 
								}

								if(retorno[0]['GRUPOS'].indexOf("Diretoria") != -1){
									$(".mlsindico").show();
									$(".mdiretoria").show();
									localStorage.setItem('GRUPO_DIR',1);
									$("#gdir").css("display","block"); 
								}else{ 
									$(".mlsindico").hide();
									$(".mdiretoria").hide(); 
								}

								localStorage.setItem('MPET',retorno[0]['MPET']);
								localStorage.setItem('MCAM',retorno[0]['MCAM']);
								localStorage.setItem('FOTO',retorno[0]['foto']);
								localStorage.setItem('LOTE',retorno[0]['rlote']+' '+retorno[0]['lote']);
								localStorage.setItem('MFALE',retorno[0]['MFALE']);
								localStorage.setItem('MHOME',retorno[0]['perfil']);
								localStorage.setItem('QUADRA',retorno[0]['rquadra']+' '+retorno[0]['quadra']);
								localStorage.setItem('MAGENDA',retorno[0]['MAGENDA']);
								localStorage.setItem('MLUNICA',retorno[0]['MLUNICA']);
								localStorage.setItem('MFPERFIL',retorno[0]['MFPERFIL']);
								localStorage.setItem('MRESERVA',retorno[0]['MRESERVA']);
								localStorage.setItem('CRESERVA',retorno[0]['CRESERVA']);
								localStorage.setItem('MMUDANCA',retorno[0]['MMUDANCA']);
								localStorage.setItem('MMORADOR',retorno[0]['MMORADOR']);
								localStorage.setItem('CENQUETE',retorno[0]['CENQUETE']);
								localStorage.setItem('CUNIDADES',retorno[0]['CUNIDADES']);
								localStorage.setItem('MVEICULOS',retorno[0]['MVEICULOS']);
								localStorage.setItem('MCONTATOS',retorno[0]['MCONTATOS']);
								localStorage.setItem('MENTREGAS',retorno[0]['MENTREGAS']);
								localStorage.setItem('MENQUENTE',retorno[0]['MENQUENTE']);
								localStorage.setItem('PARENTESCO',retorno[0]['parentesco']);
								localStorage.setItem('CMORADORES',retorno[0]['CMORADORES']);
								localStorage.setItem('CDOCUMENTOS',retorno[0]['CDOCUMENTOS']);
								localStorage.setItem('MDOCUMENTOS',retorno[0]['MDOCUMENTOS']);
								localStorage.setItem('MOCORRENCIA',retorno[0]['MOCORRENCIA']);
								localStorage.setItem('MRELATORIOS',retorno[0]['MRELATORIOS']);
								localStorage.setItem('MCOMUNICADOS',retorno[0]['MCOMUNICADOS']);
								localStorage.setItem('NOME_MORADOR',retorno[0]['nome']);
								localStorage.setItem('MLRECORRENTE',retorno[0]['MLRECORRENTE']);
								localStorage.setItem('MORADOR_NOME',retorno[0]['nome']);
								localStorage.setItem('CCOMUNICADOS',retorno[0]['CCOMUNICADOS']);
								localStorage.setItem('OCORRENCIA_PUBLICA',retorno[0]['TIPO_OCORRENCIA']);

								LOTE 	= retorno[0]['rlote']+' '+retorno[0]['lote'];
								QUADRA  = retorno[0]['rquadra']+' '+retorno[0]['quadra'];
								MORADOR_SEXO = retorno[0]['masculino'];

								localStorage.setItem('AUTORIZA',     retorno[0]['autoriza']);
								localStorage.setItem('ROTULO_LOTE',  retorno[0]['rlote']);
								localStorage.setItem('ROTULO_QUADRA',retorno[0]['rotulo_quadra']);

								localStorage.setItem('CHAT_MSG'  ,retorno[0]['CHAT_MSG']);
								localStorage.setItem('CHAT_TOCA' ,retorno[0]['CHAT_TOCA']);
								localStorage.setItem('CHAT_EMAIL',retorno[0]['CHAT_EMAIL']);
								localStorage.setItem('CHAT_VIBRA',retorno[0]['CHAT_VIBRA']);

								localStorage.setItem('COM_MSG'  ,retorno[0]['COM_MSG']);
								localStorage.setItem('COM_TOCA' ,retorno[0]['COM_TOCA']);
								localStorage.setItem('COM_EMAIL',retorno[0]['COM_EMAIL']);
								localStorage.setItem('COM_VIBRA',retorno[0]['COM_VIBRA']);

								localStorage.setItem('DOC_MSG'  ,retorno[0]['DOC_MSG']);
								localStorage.setItem('DOC_TOCA' ,retorno[0]['DOC_TOCA']);
								localStorage.setItem('DOC_EMAIL',retorno[0]['DOC_EMAIL']);
								localStorage.setItem('DOC_VIBRA',retorno[0]['DOC_VIBRA']);

								localStorage.setItem('ENQ_MSG',  retorno[0]['ENQ_MSG']);
								localStorage.setItem('ENQ_TOCA', retorno[0]['ENQ_TOCA']);
								localStorage.setItem('ENQ_EMAIL',retorno[0]['ENQ_EMAIL']);
								localStorage.setItem('ENQ_VIBRA',retorno[0]['ENQ_VIBRA']);

								localStorage.setItem('COR_MSG',  retorno[0]['COR_MSG']);
								localStorage.setItem('COR_TOCA', retorno[0]['COR_TOCA']);
								localStorage.setItem('COR_EMAIL',retorno[0]['COR_EMAIL']);
								localStorage.setItem('COR_VIBRA',retorno[0]['COR_VIBRA']);


								MORADOR_NOME = retorno[0]['nome'];
								var nome_formatado = '';
								if(MORADOR_NOME.length > 18){
									nome_formatado = MORADOR_NOME.substr(0,18)+'...';
								}else{
									nome_formatado = MORADOR_NOME;
								}

								if(localStorage.getItem("PARENTESCO") == 1 ){ 
									tipo_user_ = ' - Titular';		 
								}else{
									tipo_user_ = '';	
								}

								app.sheet.close('.loginApp', true);
								app.views.main.router.navigate("/home/", {reloadAll:true});

								console.log('IP_LOCAL ============>>>>> ');
								console.log(retorno[0]['ip_local']);
								localStorage.removeItem('DOMINIO');
								localStorage.setItem('DOMINIO',retorno[0]['ip_local']+"/controlcondo/v2/");

								console.log('IP_LOCAL ============>>>>> fixado===========>>>>');
								console.log(localStorage.getItem("DOMINIO"));
								// return false;

								$$(document).on('page:init', '.page[data-name="pgHome"]', function (e) {
									app.sheet.destroy(sheetloginApp);
									app.sheet.destroy(sheetDefineSenhaApp);

									localStorage.removeItem('emailDefinidoOk');
									localStorage.removeItem('senhaDefinidoOk');
								}); 

								setTimeout(function(){
									$(".perfil_condominio").html(limita_txt(retorno[0]['nome_condominio'],27));
									$(".perfil_nome").html(nome_formatado+tipo_user_);
									let img = "data:image/png;base64,"+retorno[0]['foto'];
									$('.user_foto').attr("src", img);
								},500);
					
								// descomentar e rever corretamente ======>>>
								// afed('#home','#login_ini','','',3,'home');
								// $("#initApp").hide('fast');
								// afed('.smenu,#perfil_abre,#perfil','#perfil_edit,#perfil_fecha','','',2);

								// descomentar e rever corretamente ======>>>
								// $("#bloco").html(QUADRA);
								// $("#apto").html(LOTE);
								// $("#blocoapto").html(QUADRA.toLowerCase()+' - '+LOTE.toLowerCase());

								// carrega_notificacoes(0);

								if(localStorage.getItem("MCOMUNICADOS") == 1){ 
									// descomentar e rever corretamente ======>>>
									// afed('#menu_comunicado','','','',3); 
								}else{ 
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_comunicado','','',3); 
								}

								if(localStorage.getItem("MLUNICA") == 1){ 
									if(localStorage.getItem('AUTORIZA') == 1){
										// afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3);
									}else{
										// afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3);
									}
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); 
								}
								
								if(localStorage.getItem("MRESERVA") == 1){
									// descomentar e rever corretamente ======>>>
									// afed('#menu_area','','','',3); 
								}else{ 
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_area','','',3); 
								}
								
								if(localStorage.getItem("MENTREGAS") == 1){ 
									// descomentar e rever corretamente ======>>>
									// afed('#menu_entregas','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_entregas','','',3); 
								}

								if(localStorage.getItem("MFALE") == 1){
									// descomentar e rever corretamente ======>>>
									// afed('','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','','','',3); 
								}

								if(localStorage.getItem("MENQUENTE") == 1){
									// descomentar e rever corretamente ======>>>
									// afed('#menu_enquete','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_enquete','','',3); 
								}

								if(localStorage.getItem("MDOCUMENTOS") == 1){
									// descomentar e rever corretamente ======>>>
									// afed('#menu_documentos','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_documentos','','',3); 
								} 
								
								if(localStorage.getItem('MOCORRENCIA') == 1){
									// descomentar e rever corretamente ======>>>
									// afed('#menu_ocorrencia','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_ocorrencia','','',3); 
								}

								if(localStorage.getItem('MPET') == 1){ 
									// descomentar e rever corretamente ======>>>
									// afed('#menu_pet','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_pet','','',3); 
								}

								if(localStorage.getItem('MCAM') == 1){
									// descomentar e rever corretamente ======>>>
									// afed('#menu_cameras','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_cameras','','',3); 
								}

								if(localStorage.getItem('MMUDANCA') == 1){
									// descomentar e rever corretamente ======>>>
									// afed('#menu_mudanca','','','',3); 
								}else{ 
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_mudanca','','',3); 
								}

								if(localStorage.getItem('MAGENDA') == 1){
									// descomentar e rever corretamente ======>>>
									// afed('#menu_agenda','','','',3); 
								}else{
									// descomentar e rever corretamente ======>>>
									// afed('','#menu_agenda','','',3); 
								}
								
								if(localStorage.getItem('MFPERFIL') == 1){
									// descomentar e rever corretamente ======>>>
									// $("#foto_user_mor").attr("onclick","afed('#bg_box3','','','',1);");
								}else{
									// descomentar e rever corretamente ======>>>
									// $("#foto_user_mor").attr("onclick","alertaDialog('','Para alterar a foto, entre em contato com administração');"); 
								}

 									// $('.back').hide();
									// carrega_chat();
									// inicia(0);
									// localStorage.setItem('TELA_ATUAL','home');	
									// atualiza_notificacao(0);


									// setTimeout(function(){
									// 	nome_exibicao(retorno[0]['id_condominio']);
									// },500);

							}else{
								alertaDialog("Perfil","Perfil usuário inválido");
							}
						}
					}else{
						alertaDialog('Atualização','Há uma nova versão do Control Condo. Atualize seu aplicativo para continuar...');
					}
				}
            
            },
            error : function() {
                alertaDialog('Aviso','Erro ao logar automático');
            }
        });
    }
}

/*
########################################
# Actions login UserByCondominioID     #
########################################
*/
select_user = (id_usuario_condominio=0) => {
	if(navigator.connection.type != 'none'){
	console.log("entrou na funcao.... kakakak");
	console.log(id_usuario_condominio);
        if(id_usuario_condominio == 0){
            var dados = $("#perfil_login").val();
        }else{
            var dados = 'perfil='+id_usuario_condominio;
        }
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/login.php',
			data: dados,
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){
				console.log(retorno);
				console.log("vai para pagina home....");
				console.log(retorno[0]['ip_local']);

				localStorage.setItem('DOMINIO',retorno[0]['ip_local']+"/controlcondo/v2/");
				
                if(retorno[0]['usar_control_condo'] == 1){
					localStorage.setItem('IP_LOCAL',retorno[0]['ip_local']);
                    localStorage.setItem('ID_USER',retorno[0]['id_usuario_condominio']);
					localStorage.setItem('ID_USER_L',retorno[0]['id_usuario']);
					localStorage.setItem('ID_MORADOR',retorno[0]['id_referencia']);
					localStorage.setItem('ID_UNIDADE',retorno[0]['id_unidade']);

					// setTimeout(function(){
					// 	$.ajax({
					// 		type       : "POST",
					// 		url        : localStorage.getItem('DOMINIO')+"appweb/notificacao_correspondencia.php",
					// 		data       : {id_condominio : $("#DADOS #ID_CONDOMINIO").val(),id_unidade : $("#DADOS #ID_UNIDADE").val()}, //APP
					// 		success    : function(retornos) {
					// 			localStorage.setItem('ID_MORADORES_UNIDADE',retornos);
					// 	    }
					// 	});	
					// },3);		
                    
					localStorage.setItem('CONDOMINIO',retorno[0]['nome_condominio']);
					localStorage.setItem('QTD_CREDITO',retorno[0]['qtd_credito_liberacao']);
					localStorage.setItem('EXIBIR_NOME',retorno[0]['exibir_nome_qrcode']);
					localStorage.setItem('PERIODO_MAX',retorno[0]['periodo_max_liberacao']);
                    localStorage.setItem('ID_CONDOMINIO',retorno[0]['id_condominio']);
					localStorage.setItem('QTD_CONTROL_CONDO',retorno[0]['qtd_control_condo']);
                    localStorage.setItem('TIPO_BUSCA_VISITANTE',retorno[0]['tipo_busca_visitante']);
						
                    if(retorno[0]['tipo_busca_visitante'] == 0){
                    	// descomentar e rever corretamente ======>>>
                        // afed('#btipo_nome','#btipo_rg','','',3,'home');
                    }else{
                    	// descomentar e rever corretamente ======>>>
                        // afed('#btipo_rg','#btipo_nome','','',3,'home');
                    }

                    if(retorno[0]['GRUPOS'].indexOf("Morador") != -1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// $( "#DADOS #GRUPO_MOR" ).val(1); 
                    	// $( "#gmor" ).css("display","block"); 
                    }
                    
                    if(retorno[0]['GRUPOS'].indexOf("Síndico") != -1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").show();$(".msindico").show(); 
                    	// $( "#DADOS #GRUPO_SIN" ).val(1); 
                    	// $( "#gsin" ).css("display","block"); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").hide();$(".msindico").hide(); 
                    }

                    if(retorno[0]['GRUPOS'].indexOf("Administração") != -1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").show();
                    	// $(".madministracao").show(); 
                    	// $( "#DADOS #GRUPO_ADM" ).val(1); 
                    	// $( "#gadm" ).css("display","block"); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").hide();$(".madministracao").hide();  
                    }
                    
                    if(retorno[0]['GRUPOS'].indexOf("Administradora") != -1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").show();
                    	// $(".madministradora").show(); 
                    	// $("#DADOS #GRUPO_ADM2" ).val(1); 
                    	// $("#gadm2" ).css("display","block"); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").hide(); 
                    	// $(".madministradora").hide(); 
                    }

                    if(retorno[0]['GRUPOS'].indexOf("Diretoria") != -1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").show();
                    	// $(".mdiretoria").show(); 
                    	// $("#DADOS #GRUPO_DIR").val(1); 
                    	// $("#gdir").css("display","block"); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// $(".mlsindico").hide();
                    	// $(".mdiretoria").hide(); 
                    }

					localStorage.setItem('LOTE',retorno[0]['rlote']+' '+retorno[0]['lote']);
                    localStorage.setItem('MPET',retorno[0]['MPET']);
                    localStorage.setItem('MCAM',retorno[0]['MCAM']);
					localStorage.setItem('MHOME',retorno[0]['perfil']);
					localStorage.setItem('MFALE',retorno[0]['MFALE']);
					localStorage.setItem('QUADRA',retorno[0]['rquadra']+' '+retorno[0]['quadra']);
					localStorage.setItem('MAGENDA',retorno[0]['MAGENDA']);
					localStorage.setItem('MLUNICA',retorno[0]['MLUNICA']);
					localStorage.setItem('MFPERFIL',retorno[0]['MFPERFIL']);
					localStorage.setItem('MMUDANCA',retorno[0]['MMUDANCA']);
					localStorage.setItem('MMORADOR',retorno[0]['MMORADOR']);
					localStorage.setItem('CRESERVA',retorno[0]['CRESERVA']);
					localStorage.setItem('MRESERVA',retorno[0]['MRESERVA']);
					localStorage.setItem('CENQUETE',retorno[0]['CENQUETE']);
					localStorage.setItem('MENTREGAS',retorno[0]['MENTREGAS']);
					localStorage.setItem('MENQUENTE',retorno[0]['MENQUENTE']);
					localStorage.setItem('MCONTATOS',retorno[0]['MCONTATOS']);
					localStorage.setItem('MVEICULOS',retorno[0]['MVEICULOS']);
					localStorage.setItem('CUNIDADES',retorno[0]['CUNIDADES']);
					localStorage.setItem('CMORADORES',retorno[0]['CMORADORES']);
					localStorage.setItem('PARENTESCO',retorno[0]['parentesco']);
                    localStorage.setItem('MOCORRENCIA',retorno[0]['MOCORRENCIA']);
					localStorage.setItem('MRELATORIOS',retorno[0]['MRELATORIOS']);
					localStorage.setItem('MDOCUMENTOS',retorno[0]['MDOCUMENTOS']);
					localStorage.setItem('CDOCUMENTOS',retorno[0]['CDOCUMENTOS']);
					localStorage.setItem('MCOMUNICADOS',retorno[0]['MCOMUNICADOS']);
					localStorage.setItem('MLRECORRENTE',retorno[0]['MLRECORRENTE']);
					localStorage.setItem('CCOMUNICADOS',retorno[0]['CCOMUNICADOS']);
					localStorage.setItem('NOME_MORADOR',retorno[0]['nome']);
					localStorage.setItem('MORADOR_NOME',retorno[0]['nome']);
                    
                    LOTE = retorno[0]['rlote']+' '+retorno[0]['lote'];
                    QUADRA = retorno[0]['rquadra']+' '+retorno[0]['quadra'];
                    MORADOR_NOME = retorno[0]['nome'];
                    MORADOR_SEXO = retorno[0]['masculino'];
                    MORADOR_PARENTESCO = retorno[0]['parentesco'];
				  	
				  	// descomentar e rever corretamente ======>>>
				  	// $( "#blocoapto" ).html(QUADRA+' - '+LOTE);
                    
                    localStorage.setItem('AUTORIZA' ,retorno[0]['autoriza']);
                    localStorage.setItem('ROTULO_LOTE' ,retorno[0]['rlote']);
                    localStorage.setItem('ROTULO_QUADRA',retorno[0]['rotulo_quadra']);
					localStorage.setItem('OCORRENCIA_PUBLICA',retorno[0]['TIPO_OCORRENCIA']);
					localStorage.setItem('FOTO',retorno[0]['FOTO']);
					
					if(retorno[0]['foto']==""){
						// descomentar e rever corretamente ======>>>
						// $( '.back' ).hide();
						// $( '.fundo1 #bloco' ).css('margin','2% 0 0 -3%');
						// $( '.fundo1 #apto' ).css('margin','-8% 0 0 81%;');
						// $( '.user_foto' ).attr("style","");
						// $( '.user_foto' ).css('border','none').html('<div class="back" style=""><span class="fa fa-user-circle icone_sem_foto" style="color:#c2c2c2;font-size: 3.1em;" ></span></div>');
					}else{
						// descomentar e rever corretamente ======>>>
						// $( '.back' ).hide();
						// $( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['foto']+")");
						// $( '.fundo1 .user_foto' ).css("border","2px solid white");
						// $( '.fundo1 #bloco' ).css('margin','2% 0 0 -8%');
						// $( '#perfil .user_foto').html('<div id="border_m"></div>');
                    }
					
                    localStorage.setItem('CHAT_MSG',retorno[0]['CHAT_MSG']);
                    localStorage.setItem('CHAT_TOCA',retorno[0]['CHAT_TOCA']);
                    localStorage.setItem('CHAT_EMAIL',retorno[0]['CHAT_EMAIL']);
                    localStorage.setItem('CHAT_VIBRA',retorno[0]['CHAT_VIBRA']);

                    localStorage.setItem('COM_MSG',retorno[0]['COM_MSG']);
                    localStorage.setItem('COM_TOCA',retorno[0]['COM_TOCA']);
                    localStorage.setItem('COM_EMAIL',retorno[0]['COM_EMAIL']);
                    localStorage.setItem('COM_VIBRA',retorno[0]['COM_VIBRA']);

                    localStorage.setItem('DOC_MSG',retorno[0]['DOC_MSG']);
                    localStorage.setItem('DOC_TOCA',retorno[0]['DOC_TOCA']);
                    localStorage.setItem('DOC_EMAIL',retorno[0]['DOC_EMAIL']);
                    localStorage.setItem('DOC_VIBRA',retorno[0]['DOC_VIBRA']);

                    localStorage.setItem('ENQ_MSG',retorno[0]['ENQ_MSG']);
                    localStorage.setItem('ENQ_TOCA',retorno[0]['ENQ_TOCA']);
                    localStorage.setItem('ENQ_EMAIL',retorno[0]['ENQ_EMAIL']);
                    localStorage.setItem('ENQ_VIBRA',retorno[0]['ENQ_VIBRA']);

                    localStorage.setItem('COR_MSG',retorno[0]['COR_MSG']);
                    localStorage.setItem('COR_TOCA',retorno[0]['COR_TOCA']);
                    localStorage.setItem('COR_EMAIL',retorno[0]['COR_EMAIL']);
                    localStorage.setItem('COR_VIBRA',retorno[0]['COR_VIBRA']);

					/* Tratativa para limitar nome do morador no menu */
					var nome_formatado = '' 
					if(MORADOR_NOME.length > 18){
						nome_formatado = MORADOR_NOME.substr(0,18)+'...';
					}else{
						nome_formatado = MORADOR_NOME;
					}
			
					if(localStorage.getItem("PARENTESCO") == 1 ){ 
						tipo_user_ = ' - Titular';		 
					}else{
						tipo_user_ = '';	
					}
			
                    app.views.main.router.navigate("/home/", {animate:true});
                    $$(document).on('page:init', '.page[data-name="pgHome"]', function (e) {
                    	
                    	console.log("negavar para pagina home....");

                    	app.actions.close('#multiProfileUserNoAutoInit', true);
						
						app.actions.close('#multiProfileUser', true);
						app.actions.close('.defineSenhaApp', true);
						
						app.sheet.destroy('#multiProfileUser');
						app.sheet.destroy('.defineSenhaApp');
					}); 

                 	setTimeout(function(){
	                    $(".perfil_condominio" ).html(limita_txt(retorno[0]['nome_condominio'],27));
	                    $(".perfil_nome" ).html(nome_formatado+tipo_user_);
	                    // $("#apto" ).html("<strong> "+LOTE+"</storng>");
	                    // $("#bloco" ).html("<strong> "+QUADRA+"</storng>");
                    },500);

                    if(MORADOR_PARENTESCO == 1){ 
                    	$("#edit_moradores").css("display","block"); 
                    }

                    // descomentar e rever corretamente ======>>>
                    // carrega_notificacoes(0);

                    if(localStorage.getItem("MCOMUNICADOS") == 1){ 
						// descomentar e rever corretamente ======>>>
						// afed('#menu_comunicado','','','',3); 
					}else{ 
						// descomentar e rever corretamente ======>>>
						// afed('','#menu_comunicado','','',3); 
					}

                    if(localStorage.getItem("MLUNICA") == 1){
						if(localStorage.getItem('AUTORIZA') == 1){
							// descomentar e rever corretamente ======>>>
							// afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3);
						}else{
							// descomentar e rever corretamente ======>>>
							// afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3);
						}
					}else{ 
						// descomentar e rever corretamente ======>>>
						// afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); 
					}

                    if(localStorage.getItem("DADOS #MRESERVA") == 1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('#menu_area','','','',3); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_area','','',3);
                    }

                    if(localStorage.getItem("MENTREGAS") == 1){
                    	// descomentar e rever corretamente ======>>> 
                    	// afed('#menu_entregas','','','',3); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_entregas','','',3); 
                    } 
                    
                    if(localStorage.getItem("MFALE") == 1){  
                    	// afed('','','','',3); 
                    }else{ 
                    	// afed('','','','',3); 
                    }

                    if(localStorage.getItem("MENQUENTE") == 1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('#menu_enquete','','','',3);
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_enquete','','',3);
                    }

                    if(localStorage.getItem("MDOCUMENTOS") == 1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('#menu_documentos','','','',3);
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_documentos','','',3);
                    }

                    if(localStorage.getItem('MOCORRENCIA') == 1){
                    	// descomentar e rever corretamente ======>>>
                    	// afed('#menu_ocorrencia','','','',3); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_ocorrencia','','',3);
                    } 
                    
                    if(localStorage.getItem('MPET') == 1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('#menu_pet','','','',3);
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_pet','','',3);
                    }

                    if(localStorage.getItem('MCAM') == 1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('#menu_cameras','','','',3);
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_cameras','','',3); 
                    }

                    if(localStorage.getItem('MMUDANCA') == 1){ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('#menu_mudanca','','','',3); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_mudanca','','',3); 
                    }

                    if(localStorage.getItem('MAGENDA') == 1){
                    // descomentar e rever corretamente ======>>> 
                    	// afed('#menu_agenda','','','',3); 
                    }else{ 
                    	// descomentar e rever corretamente ======>>>
                    	// afed('','#menu_agenda','','',3); 
                    }

					if(localStorage.getItem('MFPERFIL') == 1){ 
						// descomentar e rever corretamente ======>>> 
						// $("#foto_user_mor").attr("onclick","afed('#bg_box3','','','',1);");
					}else{ 
						// descomentar e rever corretamente ======>>> 
						// $("#foto_user_mor").attr("onclick","alertaDialog('','Para alterar a foto, entre em contato com administração');"); 
					}
              
                    // carrega_chat();
                    // inicia(0);
					// altera_menu();

                    // localStorage.setItem('TELA_ATUAL','home');	
					// atualiza_notificacao();
					// setTimeout(function(){
					// 	nome_exibicao(retorno[0]['id_condominio']);
					// },500);

                }else{
                    alertaDialog('Perfil','Perfil usuário inválido');
                }
			}
		});
	}else{
		alertaDialog('Internet','Sem conex\u00e3o com a Internet');
	}
}


/*
########################################
# Actions Function Logout of App       #
########################################
*/
logout = () => {
	// inicia2(0); // descomenta se for necessário
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/logout.php',
		data: 'id='+localStorage.getItem('ID_USER_L'),
		crossDomain: true,
		success: function(retorno){
			localStorage.removeItem('loginSocialMidia');
			localStorage.removeItem('emailDefinidoOk');
			localStorage.removeItem('senhaDefinidoOk');

			console.log(`Deslogado o usuario id ${retorno}`);
			setPwdOut();
			clearProfileData();
			logoutFacebookOnError();
			logoutGoogleOnError();
		}
	});
}



// levar essa função para arquivo geral;.....
limita_txt = (titulo,qtd) => {
	if(titulo.length > qtd){
		$(this).text($(this).text().substr(0,qtd)+'...');
		titulo = titulo.substr(0,qtd)+'...';
	}
	return titulo;
}


socialAutologinMultiUser = () => {
	
}


// FUNCAO CARREGA PERFIL
function carrega_user_perfil(id, autoInit=null) {
	console.log("entrou na funcao carrega_user_perfil");
    var dados = '';
	if(navigator.connection.type != 'none'){
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/login.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_usuario : id},
            dataType   : 'json',
			success: function(retorno){
				console.log("carrega user perfil .....");
				console.log(JSON.stringify(retorno));

				if (autoInit == null && localStorage.getItem('loginSocialMidia') == "loginsocialmidiaFG") {
					console.log("====>>>>>>"+autoInit);
					console.log("=======>>>"+localStorage.getItem('loginSocialMidia'));
					console.log('carrega perfil loginSocialMidia');
					app.views.main.router.navigate("/select_profile_noAuto/", {animate:true, transition: 'f7-dive'});
					$$(document).on('page:init', '.page[data-name="pgMultiProfileNoAutoInit"]', function (e) {
						$$(".loginApp").hide();
						sheetMultiUser = app.sheet.create({
						 	el: '.multiProfileUserNoAutoInit',
							closeByOutsideClick: false,
						  	closeByBackdropClick: false,
						  	closeOnEscape: false
						}).open(true);

						
						$$('.multiProfileUserNoAutoInit').on('sheet:opened', function (e) {
						  	console.log('multiProfileUserNoAutoInit Aberto ...');
							$(".selectCondoMinio")[0].click();
							console.log("clickou automatico");
						});

						app.views.create('.multiprofileSheetNoAutoInit');
						// sleep(100);

						// Declarando a smart-select como view para poder funcionar...
						smartSelect = app.smartSelect.create({
							el:'.selectCondoMinio',
							on: {
							    opened: function () {
							    	console.log("entrou no multi no autoinit ===<<<<>>>>===")
							      	var elemento = $(".page-content")[1];
									
									setTimeout(function() {
										console.log(elemento);
										var esseElemento = elemento.firstElementChild;
										esseElemento.style.position="relative !important";
										esseElemento.style.top="40px !important";
										$(".icon-back").attr('style', 'color: #037aff !important');
									}, 200);
							    },
							}
						});
						
						var primeiro = '<option value="" selected="">Selecione Condominio</option>';
				        for (x in retorno) {
				            dado = '<option onclick="select_user('+retorno[x]['id_usuario_condominio']+')" value="'+retorno[x]['id_usuario_condominio']+'">'+retorno[x]['nome_condominio']+'</option>';
				            dados = dados + dado;
				        }
				        dados = primeiro + dados;

				        setTimeout(function() {
				            $('.perfil_loginClass').html(dados);
				        }, 200);
				    });
					console.log('carrega condominios do perfil');
					// localStorage.removeItem('loginSocialMidia');
				}else if (autoInit == "inicializaAutomatico" && localStorage.getItem('loginSocialMidia') == "loginsocialmidiaFG") {
					app.views.main.router.navigate("/select_profile/", {animate:true, transition: 'f7-dive'});
					$$(document).on('page:init', '.page[data-name="pgMultiprofile"]', function (e) {
						$$(".loginApp").hide();
						sheetMultiUser = app.sheet.create({
						 	el: '.multiProfileUser',
							closeByOutsideClick: false,
						  	closeByBackdropClick: false,
						  	closeOnEscape: false
						}).open(true);
						
						$$('.multiProfileUser').on('sheet:opened', function (e) {
						  	console.log('my-sheet opened==>> multiprofile autoinit...');
							$(".selectCondo")[0].click();
						});
						// Declarando a smart-select como view para poder funcionar...
						app.views.create('.multiprofileSheet');

						smartSelect = app.smartSelect.create({
							el:'.selectCondo',
							on: {
							    opened: function () {
							      	let elemento = $(".page-content")[1];
									let esseElemento = elemento.firstElementChild;
									esseElemento.style.position="relative";
									esseElemento.style.top="26px";
									$(".icon-back").attr('style', 'color: #037aff !important');
							    },
							}
						});
						
						var primeiro = '<option value="" selected="">Selecione o seu Condominio</option>';
				        for (x in retorno) {
				            dado = '<option onclick="select_user('+retorno[x]['id_usuario_condominio']+')" value="'+retorno[x]['id_usuario_condominio']+'">'+retorno[x]['nome_condominio']+'</option>';
				            dados = dados + dado;
				        }
				        dados = primeiro + dados;

				        setTimeout(function() {
				            $('.perfil_loginClass').html(dados);
				        }, 200);
				    });
				}else if (localStorage.getItem('logarDaValidacao') == 'true') {
					console.log("login multiuser com usuario e senha logarDaValidacao....");
					app.views.main.router.navigate("/select_profile/", {animate:true, transition: 'f7-dive'});
					$$(document).on('page:init', '.page[data-name="pgMultiprofile"]', function (e) {
						$$(".loginApp").hide();
						sheetMultiUser = app.sheet.create({
						 	el: '.multiProfileUser',
							closeByOutsideClick: false,
						  	closeByBackdropClick: false,
						  	closeOnEscape: false
						}).open(true);
						
						$$('.multiProfileUser').on('sheet:opened', function (e) {
						  	console.log('my-sheet opened');
							$(".selectCondo")[0].click();
						});
						// Declarando a smart-select como view para poder funcionar...
						app.views.create('.multiprofileSheet');

						smartSelect = app.smartSelect.create({
							el:'.selectCondo',
							on: {
							    opened: function () {
							    	console.log('atribui props para multiprofile');
							      	let elemento = $(".page-content")[1];
									let esseElemento = elemento.firstElementChild;
									esseElemento.style.position="relative";
									esseElemento.style.top="26px";
									$(".icon-back").attr('style', 'color: #037aff !important');
							    },
							}
						});
						
						var primeiro = '<option value="" selected="">Selecione o seu Condominio</option>';
				        for (x in retorno) {
				            dado = '<option onclick="select_user('+retorno[x]['id_usuario_condominio']+')" value="'+retorno[x]['id_usuario_condominio']+'">'+retorno[x]['nome_condominio']+'</option>';
				            dados = dados + dado;
				        }
				        dados = primeiro + dados;

				        setTimeout(function() {
				            $('.perfil_loginClass').html(dados);
				        }, 200);
				    });
				    localStorage.removeItem('logarDaValidacao');
				}else if (autoInit == "inicializaAutomatico") {
					console.log("login automatico multiuser com usuario e senha ....");
					app.views.main.router.navigate("/select_profile/", {animate:true, transition: 'f7-dive'});
					$$(document).on('page:init', '.page[data-name="pgMultiprofile"]', function (e) {
						$$(".loginApp").hide();
						console.log("auto com user e senha ====>>>>>");
						sheetMultiUser = app.sheet.create({
						 	el: '.multiProfileUser',
							closeByOutsideClick: false,
						  	closeByBackdropClick: false,
						  	closeOnEscape: false
						}).open(true);
						
						$$('.multiProfileUser').on('sheet:opened', function (e) {
						  	console.log('my-sheet opened');
							$(".selectCondo")[0].click();
						});
						// Declarando a smart-select como view para poder funcionar...
						app.views.create('.multiprofileSheet');

						smartSelect = app.smartSelect.create({
							el:'.selectCondo',
							on: {
							    opened: function () {
							    	console.log('atribui props para multiprofile');
							      	let elemento = $(".page-content")[1];
									let esseElemento = elemento.firstElementChild;
									esseElemento.style.position="relative";
									esseElemento.style.top="26px";
									$(".icon-back").attr('style', 'color: #037aff !important');
							    },
							}
						});
						
						var primeiro = '<option value="" selected="">Selecione o seu Condominio</option>';
				        for (x in retorno) {
				            dado = '<option onclick="select_user('+retorno[x]['id_usuario_condominio']+')" value="'+retorno[x]['id_usuario_condominio']+'">'+retorno[x]['nome_condominio']+'</option>';
				            dados = dados + dado;
				        }
				        dados = primeiro + dados;

				        setTimeout(function() {
				            $('.perfil_loginClass').html(dados);
				        }, 200);
				    });
				}else{
					console.log("login multiuser com usuario e senha..sem autoInit..");
					app.views.main.router.navigate("/select_profile_noAuto/", {animate:true, transition: 'f7-dive'});
					$$(document).on('page:init', '.page[data-name="pgMultiProfileNoAutoInit"]', function (e) {
						$$(".loginApp").hide();
						sheetMultiUser = app.sheet.create({
						 	el: '.multiProfileUserNoAutoInit',
							closeByOutsideClick: false,
						  	closeByBackdropClick: false,
						  	closeOnEscape: false
						}).open(true);

						
						$$('.multiProfileUserNoAutoInit').on('sheet:opened', function (e) {
						  	console.log('multiProfileUserNoAutoInit Aberto ...');
							$(".selectCondoMinio")[0].click();
							console.log("clickou automatico");
						});

						app.views.create('.multiprofileSheetNoAutoInit');
						// sleep(100);

						// Declarando a smart-select como view para poder funcionar...
						smartSelect = app.smartSelect.create({
							el:'.selectCondoMinio',
							on: {
							    opened: function () {
							    	console.log("entrou no multi no user senha ===<<<<>>>>===")
							      	var elemento = $(".page-content")[1];
							    	setTimeout(function() {
										console.log(elemento);
										var esseElemento = elemento.firstElementChild;
										esseElemento.style.position="relative !important";
										esseElemento.style.top="40px !important";
										$(".icon-back").attr('style', 'color: #037aff !important');
									}, 100);
							    },
							}
						});
						
						var primeiro = '<option value="" selected="">Selecione o seu Condominio</option>';
				        for (x in retorno) {
				            dado = '<option onclick="select_user('+retorno[x]['id_usuario_condominio']+')" value="'+retorno[x]['id_usuario_condominio']+'">'+retorno[x]['nome_condominio']+'</option>';
				            dados = dados + dado;
				        }
				        dados = primeiro + dados;

				        setTimeout(function() {
				            $('.perfil_loginClass').html(dados);
				        }, 200);
				    });
				}
			}
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0);
	}
}
// ====>>>>>>>>>>>>>>>>>>>>>


alertaDialog = (title, msg, afterClose=null) => {
	app.dialog.create({
		title: title,
		text: msg,
		buttons: [{
			text:"Fechar"
		}],
		on: {
		    close: function () {
		    	$("#login").val("");
		    	$("#senha").val("");

		    	if (afterClose == "primeiroAcesso") {
					app.views.main.router.navigate("/receveAtivationCode/", {animate:true});
				}else if(afterClose == "defineSenha"){
					console.log("Logar no sistema automaticamente.....");
				}else if(afterClose == "voltaInicio") {
					goToIndexPageNoCache();
				}else if(afterClose == 'gotoprofile'){
					goToProfile();
				}else if (afterClose == "termoUso") {
					app.views.main.router.navigate("/termo_de_uso/", {animate:true, transition: 'f7-dive'});
				}
		    }
		},
	}).open();
	
	if (afterClose == "logaDoFace" || afterClose == "logaDoGoogle" || afterClose == "termoUso") {
		setTimeout(function () {
			app.dialog.close();
		}, 4000);
	}else{
		setTimeout(function () {
			app.dialog.close();
		}, 5000);
	}

}
// levar essa função para arquivo geral;.....

elementoDefineSenha = () => {
	sheetDefineSenhaApp = 
	app.sheet.create({
		el: '.defineSenhaApp',
	 	closeByOutsideClick: false,
	  	closeByBackdropClick: false,
	  	closeOnEscape: false
	});
	return sheetDefineSenhaApp;
}


aceiteiTermo = (prossigaOutroCaminho=null) => {
	var liberar = localStorage.getItem('data-liberarSemSenha');

	if (liberar == null) {
		app.views.main.router.navigate("/define_senha/", {animate:true});
		$$(document).on('page:init', '.page[data-name="pgDefineSenha"]', function (e) {
			elementoDefineSenha();
			app.sheet.open('.defineSenhaApp', true);
		})
	}else{
		console.log("else do aceitei o termo...");
		localStorage.removeItem('data-liberarSemSenha');
		enviarSenhaEliberarAcesso();
	}
}

recuperaEmail = (email) => {
    if(email.length>0){
        var dados = 'email='+email+'&origin=mobileApp&type=appNovo';
        var url = "https://aut.controlcondo.com.br/login/appweb/recupera_senha.php";
        $.ajax({
            type: 'POST',
            data: dados,
            url: url,
            crossDomain: true,
            dataType   : 'json',
            beforeSend : function() { $("#wait").css("display", "block"); },
            complete   : function() { $("#wait").css("display", "none"); },
            success: function(retorno){
                console.log(retorno);
                if (retorno.statuscode == 200 && retorno.status == "successoEmailEnviado") {
                    app.sheet.close('.recuperaSenha', true);
                    alertaDialog('Sucesso', 'Dados para recuperação de senha enviado por email Verifique seu email!', 'voltaInicio');
                    $("#email_recupera").val("");
                }else if (retorno.statuscode == 204 && retorno.status == "emailNaoEnviadoErro"){
                    app.sheet.close('.recuperaSenha', true);
                    alertaDialog('Erro', 'não foi possivel processar o pedido, tente mais tarde!');
                    $("#email_recupera").val("");
                }else{
                    app.sheet.close('.recuperaSenha', true);
                    alertaDialog('Erro', 'Não foi possivel solicitar a recuperacao da senha! Entre em contato com a administração!');
                    $("#email_recupera").val("");
                }
                
            },
            error: function(){
            }
        })
    }else{
    	alertaDialog('Erro',"É necessário o email para continuar... ");
    }
}

function choosedMail(){
	let campoEmail = $("#inputReceveEmailToGetCode").val();
	console.log(campoEmail);
	if (campoEmail.length !== 0) {
		$.ajax({
			url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/ativacao_post.php',
			type: 'POST',
	 	    data: {
	 	    	email : campoEmail, 
	 	    	typeFunction : 'enviarEmailParaAtivacao' 
	 	    },
	 	    dataType: 'json',
			crossDomain: true,
			success: function(retorno){
				if (retorno.status == "emailNaoReconhecidoPeloSistema") {
					app.sheet.close('.recebEmail', true);
					alertaDialog('Erro','Email não reconhecido pelo sistema, Insira seu email cadastrado');
					$("#inputReceveEmailToGetCode").val("");
				}else if(retorno.status == "naoPossuiNenhumPerfilAtivo"){
					app.sheet.close('.recebEmail', true);
					alertaDialog('Error','Esse email não possui perfil Ativo no sistema');
					$("#inputReceveEmailToGetCode").val("");
				}else if (retorno.status == "codigoEnviadoParaEmailComSucesso" && retorno.statuscode == 200) {
					app.sheet.close('.recebEmail', true);
					alertaDialog('Ativação do Cadastro', "Código de Ativação enviado para o email. Clica no link no seu email, ou copia o codigo para continuar a validação", "primeiroAcesso");
				}else if (retorno.status == "proporRecuperacaoSenhaUsuarioAtivo" && retorno.statuscode == 200) {
				  	app.dialog.confirm('Esse email se encontra ativo! Deseja recuperar a sua senha', 'Ativação do Cadastro', 
					  	function () {
							app.sheet.close('.recebEmail', true);
							app.sheet.destroy('.recebEmail');
					  		app.dialog.close();
					  		primeiroAcessoBtnVoltar();
					  		setTimeout(function() {
					    		swich_tela_login_recuperaSenha(campoEmail);
					    		setTimeout(function() {
					    			$$('#itemInput').addClass('item-input-focused');
					    			$$('#email_recupera').addClass('input-focused');
					    		}, 100);
					  		}, 500);
					  	}, 
					  	function () {
					  		app.sheet.close('.recebEmail', true);
					  		primeiroAcessoBtnVoltar();
					  	}
				 	);
					$("#inputReceveEmailToGetCode").val("");
				}
	        },
	        error: function(error) {
	        	console.log("tem informacoes com erro");
				console.log(error);
	        }
		});	
	}else{
		alertaDialog("","Insira seu email para continuar", 3000);	
	}
}


enviarCodigoAtivacao = (codigoAtivacao) => {
	console.log(codigoAtivacao);
	console.log(localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php'); // rever o dominio certo

	if (codigoAtivacao.length !== 0) {
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php', // rever o dominio certo (agora ela é dinamica)
	        data       : { codigo : codigoAtivacao, typeFunction : 'enviarCodigoAtivacao' },
	        dataType   : 'json',
			complete   : function() { $("#wait").css("display", "none"); },
			beforeSend : function() { $("#wait").css("display", "block"); },
			crossDomain: true,
			success: function(retorno){
				console.log(retorno);   
				// return false;
				if (retorno.statuscode == 200 && retorno.status == "codigoOk") {
					localStorage.setItem("idUsuarioAtivacao", retorno.idUsuario); // Id do usuario recebido atraves do codigo de ativacao
					app.views.main.router.navigate("/termo_de_uso/", {animate:true});
				}else if (retorno.statuscode == 204 && retorno.status == "usuarioNaoEncontradoParaCodigo") {
					alertaDialog('Erro Validação', "Código de Ativação Inválido, Confira o codigo enviado no seu email", afterClose="voltaInicio");
					$("#codigoAtivacao").val("");
				}
	        },
	        error: function(error) {
				console.log(error);
	        }
		});	
	}else{
		app2.input.validate("#codigoAtivacao");
	}
}

let enviarSenhaEliberarAcesso = () => {
	app.dialog.preloader("Direcionando para App", 'blue');
	let email = localStorage.getItem('emailSocialMidia');
			    localStorage.removeItem('emailSocialMidia');
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
			typeFunction : "setPassworLiberaUsuario",
			emailGmail : email, 
			id_notificacao: localStorage.getItem('registrationId')
		},
        dataType   : 'json',
		success: function(retorno){
			console.log(retorno);
			if (retorno.status == "usuarioValidoToLogin" && retorno.statuscode == 200) {
				app.dialog.close();
				login_user_device();
			}else{
				app.dialog.close();
				alertaDialog("Tentativa login", 'O ' +email+ ' não está liberado para acessar o condominio tente outra forma de autenticar..', afterClose=null)
			}
        },
        error: function(error) {
			console.log(error);
			// alert('não foi possivel continuar...');
        }
	});
}

function salvarSenha(){
	if ($("#inputDefineSenha").val().length !== 0 ) {
		$("#btnSaveSenha").attr('disabled', false);
		if ($("#inputDefineSenha").val() != $("#inputDefineSenhaRepita").val()) {
			$$("#inputDefineSenha").val('');
			$$("#inputDefineSenhaRepita").val('');
			alertaDialog("Erro na Senha", "As senhas não combinam. Elas devem ser iguais!");
		}else{

			let senha = $("#inputDefineSenha").val();
			idUsuario = null;	
			idUsuario = localStorage.getItem('idUsuarioAtivacao');

			$.ajax({
				type: 'POST',
				url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/ativacao_post.php',
		        data: { 
    				idUsuario : idUsuario, 
    				senha : senha,
    				typeFunction : "definirSenha"
		    	},
		        dataType   : 'json',
				complete   : function() { $("#wait").css("display", "none"); },
				beforeSend : function() { $("#wait").css("display", "block"); },
				crossDomain: true,
				success: function(retorno){

					console.log(retorno);

					if (retorno.statuscode == 200 && retorno.status == "senhaDefinidoOk") {
						$('#formSendDefineSenha').trigger("reset");

						localStorage.setItem('emailDefinidoOk', retorno.emailUsuario);
						localStorage.setItem('senhaDefinidoOk', senha);

						localStorage.removeItem('idUsuarioAtivacao');
						
						app.sheet.close('.defineSenhaApp', true);
						app.sheet.destroy(sheetDefineSenhaApp);

						app.dialog.preloader("Direcionando para App", 'blue');
						setTimeout(function () {
							event = new CustomEvent('click');
							localStorage.setItem('logarDaValidacao', true);							
							login_user(event, 'logarDaValidacao');
							app.dialog.close();
						}, 1000);

						// alertaDialog('Define Senha', "Senha definida com sucesso", 'defineSenha');
					}
		        },
		        error: function(error) {
					console.log(error);
					alertaDialog('Erro', 'Não foi possivel executar a ação pretendida, entre em contato com seu administrador');
		        }
			});	
		}
	}else{
		alertaDialog("Erro","Senha não definida");
	}
}

confirmaCodeResetPassword = (recoveryCode) => {
	alert("codigo recebido "+recoveryCode);
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/ativacao_post.php',
		// url: "https://aut.controlcondo.com.br/login/appweb/ativacao_post_multi.php",
		crossDomain: true,
        data: { 
			recoveryCode : recoveryCode, 
			typeFunction : "validaCodigo"
		},
        dataType   : 'json',
		success: function(retorno){
			
			console.log("chegou agora....");
			console.log(retorno);

			if (retorno.status == "codigoConfere" && retorno.statuscode == 200) {
				app.views.main.router.navigate("/define_senha/", {animate:true});
				$$(document).on('page:init', '.page[data-name="pgDefineSenha"]', function (e) {
					elementoDefineSenha();
					app.sheet.open('.defineSenhaApp', true);
				})
				
				localStorage.removeItem('idUsuarioAtivacao');
				localStorage.setItem("idUsuarioAtivacao", retorno.idUsuario);
				
			}else{
				alertaDialog("error", "Não foi possivel continuar o processo...", afterClose=null)
			}
        },
        error: function(error) {
			console.log(error);
			alert('Não foi possivel executar a ação pretendida, entre em contato com seu administrador');
        }
	});	
}

  /*
  ########################################
  #     Adicionar Facebook login         #
  ########################################
  */

let loginFB = () => {
    // facebookConnectPlugin.login(['public_profile', 'email'], function(result){
    // 	alert(JSON.stringify(result));

    //     facebookConnectPlugin.api("/me?fields=id,name,email", ["email"], function(userData){
    //     	alert(JSON.stringify(userData));
        	
    //         let name = userData.name;
    //         let email = userData.email;
    		email = "wendy@firstcontrol.com.br";
			localStorage.setItem('emailSocialMidia', email);
			localStorage.setItem('idUserFacebook', email);
        	
            checkUsuarioFacebookToLogin(email);
    //     },function(error){
    //         alertaDialog("Login com FB", "Falha ao tentar logar com facebook");
    //         alert(JSON.stringify(error));
    //     });
    // },function(error){
    //     alertaDialog("Login com FB", "Falha ao tentar logar com facebook");
    //     alert(JSON.stringify(error));
    // })
}

logoutFacebookOnError = () => {
	// facebookConnectPlugin.logout(
	// 	function sucesso(succes){
	// 		alert("deslogado do facebook com sucesso...");
	//       	alert(JSON.stringify(succes)); 
	// 	}, 
	// 	function erro(error){
	// 		alert("erro ao deslogar do facebook...");
	//       	alert(JSON.stringify(error)); 
	// 	}
	// );


	// idUserFb = localStorage.getItem('idUserFacebook');
	// facebookConnectPlugin.api(idUserFb,'DELETE',
	//   function(response){
	//   	console.log(response);
	//   	alert(JSON.stringify(response));
	//   },
	//   function(error) {
	//   	alert(JSON.stringify(error));
	//   	alert("idUserFacebook===>>>>"+idUserFb);
	//   	alert("user deletado com sucesso");
	// 	localStorage.removeItem('idUserFacebook');	  	   
	//   }
	// );


}

checkUsuarioFacebookToLogin = (email) => {
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/ativacao_post.php',
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
			console.log(retorno);
			// return false;
			if (retorno.status == "usuarioValidoToLoginFacebook" && retorno.statuscode == 200) {
				app.dialog.preloader("Direcionando para App", 'blue');
				localStorage.setItem("loginSocialMidia", "loginsocialmidiaFG");
				app.dialog.close();
				setTimeout(function () {
					app.dialog.close();
					login_user_device();
				}, 1000);
				app.dialog.close();
			}else 
			if (retorno.status == "perfilAtivoSemSenha" && retorno.statuscode == 200) {
				localStorage.setItem('data-liberarSemSenha','liberarSemSenha');
				app.views.main.router.navigate("/termo_de_uso/", {animate:true, transition: 'f7-dive'});
			}else{
				let msg = `O  ${email} Não está liberado para acessar o condominio tente outra forma de autenticar ou entre em contato com a sua adminstradora..`;
				alertaDialog("Tentativa de login",msg, afterClose=null);
				logoutFacebookOnError();
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
	app.dialog.preloader("carregando", 'blue');
	window.plugins.googleplus.login({},
	    function(obj) {
			app.dialog.close();
	      	let email = obj.email;
	      	let nome = obj.displayName;

			localStorage.setItem('emailSocialMidia', email);
			app.dialog.close();
		    checkUsuarioGoogleToLogin(email);
	    },
	    function(msg) {
	    	app.dialog.close();
	      	console.log('error: ' + msg);
	    }
	);
}

logoutGoogleOnError = () => {
	// window.plugins.googleplus.disconnect(
	//     function (msg) {
	//     	alert("deslogado do google com sucesso...");
	//       	alert(JSON.stringify(msg)); 
	//     },
	//     function (args) {
	//     	alert("deslogado do google com sucesso...");
	//       	alert(JSON.stringify(args)); 
	//     }	
	// );
	// console.log("eexecuta a funcao...");
}

checkUsuarioGoogleToLogin = (email) => {
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO_LOGIN')+'appweb/ativacao_post.php',
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

			if (retorno.status == "perfilAtivoSemSenha" && retorno.statuscode == 200) {
				localStorage.setItem('data-liberarSemSenha','liberarSemSenha');
				alertaDialog('Login Google', "direcionando para termo de uso", afterClose="termoUso");
			}else 
			if (retorno.status == "usuarioValidoToLoginGoogle" && retorno.statuscode == 200){
				localStorage.setItem("loginSocialMidia", "loginsocialmidiaFG");
				app.dialog.close();
				login_user_device();
			}
			else{
				let msg = `O  ${email} Não está liberado para acessar o condominio tente outra forma de autenticar ou entre em contato com a sua adminstradora..`;
				alertaDialog("Tentativa de login",msg, afterClose=null);
				logoutGoogleOnError();
			}
        },
        error: function(error) {
			console.log(error);
			console.log('não foi possivel continuar...');
        }
	});	
}
