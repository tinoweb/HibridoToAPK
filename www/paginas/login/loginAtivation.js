// DONE BY TINO 22/10/2019

// let loginEl = $("#login").val();
// let senhaEl = $("#senha").val();

// if ($$("#login").val().length>0 && $$("#senha").val().length>0) {
// 	$$("#btnLoginEntrar").removeAttr('disabled');
// }



swich_tela_login = () => {
	app.views.main.router.navigate("/login/", {animate:true, transition: 'f7-dive'});
	$$(document).on('page:init', '.page[data-name="pgLogin"]', function (e) {
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
	app.actions.open('.recuperaSenha', true);
}

goToIndexPage = () => {
	return app.views.main.router.navigate("/index/", {animate:true});
}

primeiroAcessoBtnVoltar = () => {
	app.views.main.router.navigate("/index/", {
		animate:true,
		transition: 'f7-dive',
		reloadAll:true
	});
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
	app.views.main.router.navigate("/index/", {
		animate:true,
		transition: 'f7-dive',
		reloadAll:true
	});
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
login_user = (e) => {
	e.preventDefault();
	if(navigator.connection.type != 'none'){
		var dados = $("#form_login").serialize();
		
		if(dados.indexOf('=&') > -1 || dados.substr(dados.length - 1) == '='){
		   alerta("Falha ao Logar","Necessário email e senha para continuar");
		   return false;
		}

        if(device.uuid == null){
            var UUID = '1234567890';
        }else{
            var UUID = device.uuid;
        }
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/login.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            dataType   : 'json',
			data: dados+'&nome='+device.model+'&sistema='+device.platform+'&uuid='+UUID+'&versao='+device.version+'&id_notificacao='+localStorage.getItem('registrationId'), //APP
			success: function(retorno){
				if(retorno[0]['error'] == 1){
					alerta("Falha ao Entrar", "Usuário ou senha inválida", );
				}else{
					login_user_device();	
				}
			},
            error: function(error){
                alerta('Aviso','Erro de conexão com o servidor');
            }
		});
	}else{
		alerta('Internet','Sem conex\u00e3o com a Internet');
	}
}

/*
########################################
# Actions Function Device by uuid      #
########################################
*/
login_user_device = () => {
	localStorage.setItem('VERSAO','1.2.5');
    if(navigator.connection.type != 'none'){
        if(device.uuid == null){
            var UUID = '1234567890';
        }else{
            var UUID = device.uuid;
        }
        $.ajax({
            type       : "POST",
            url        : localStorage.getItem('DOMINIO')+"appweb/login.php",
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {uuid : UUID, id_notificacao : localStorage.getItem('registrationId')}, //APP
            dataType   : 'json',
            success    : function(retorno) {
				console.log(retorno);
				if(retorno[0]['error'] == 0){
					if(retorno[0]['VERSAO'] == localStorage.getItem('VERSAO')){
						if(retorno[0]['perfil'] > 1){
							// multprofile user....
							carrega_user_perfil(retorno[0]['id_usuario']);

							localStorage.setItem('ID_USER_L',retorno[0]['id_usuario']);
						}else{  
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

								app.views.main.router.navigate("/home/", {animate:true});

								$$(document).on('page:init', '.page[data-name="pgHome"]', function (e) {
									app.actions.close('.loginApp', true);
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
									// $("#foto_user_mor").attr("onclick","alerta('','Para alterar a foto, entre em contato com administração');"); 
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
								// notifica('Perfil/Perfil usuário inválido/Fechar',0,0);
								alerta("Perfil","Perfil usuário inválido");
							}
						}
					}else{
						alerta('Atualização','Há uma nova versão do Control Condo. Atualize seu aplicativo para continuar...');
					}
				}
            
            },
            error : function() {
                alerta('Aviso','Erro ao logar automático');
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
			url: localStorage.getItem('DOMINIO')+'appweb/login.php',
			data: dados,
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){

                if(retorno[0]['usar_control_condo'] == 1){
                    localStorage.setItem('ID_USER',retorno[0]['id_usuario_condominio']);
					localStorage.setItem('ID_USER_L',retorno[0]['id_usuario']);
					localStorage.setItem('ID_MORADOR',retorno[0]['id_referencia']);
					localStorage.setItem('ID_UNIDADE',retorno[0]['id_unidade']);

					setTimeout(function(){
						$.ajax({
							type       : "POST",
							url        : localStorage.getItem('DOMINIO')+"appweb/notificacao_correspondencia.php",
							data       : {id_condominio : $("#DADOS #ID_CONDOMINIO").val(),id_unidade : $("#DADOS #ID_UNIDADE").val()}, //APP
							success    : function(retornos) {
								localStorage.setItem('ID_MORADORES_UNIDADE',retornos);
						    }
						});	
					},3);		
                    
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
						app.actions.close('#multiProfileUser', true);
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
						// $("#foto_user_mor").attr("onclick","alerta('','Para alterar a foto, entre em contato com administração');"); 
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
                    alerta('Perfil','Perfil usuário inválido');
                }
			}
		});
	}else{
		alerta('Internet','Sem conex\u00e3o com a Internet');
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
		url: localStorage.getItem('DOMINIO')+'appweb/logout.php',
		data: 'id='+localStorage.getItem('ID_USER_L'),
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
		success: function(retorno){
			console.log(retorno);
			setPwdOut();
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

// FUNCAO CARREGA PERFIL
function carrega_user_perfil(id) {
    var dados = '';
	if(navigator.connection.type != 'none'){
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/login.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_usuario : id},
            dataType   : 'json',
			success: function(retorno){
				
				app.sheet.create({
				 	el: '#multiProfileUser',
					closeByOutsideClick: false,
				  	closeByBackdropClick: false,
				  	closeOnEscape: false
				});

				app.actions.close('.loginApp', true);
				app.actions.open('#multiProfileUser', true);
				$$('#multiProfileUser').on('sheet:opened', function (e) {
				  	console.log('my-sheet opened');
					$(".selectCondo")[0].click();
				});
				
				var viewSheetModal = app.views.create('.view-sheet-modal');
				smartSelect = app.smartSelect.create({
					el:'.selectCondo',
					on: {
					    opened: function () {
					      	// console.log('Smart select opened');
					      	// console.log($(".page-content")[1]);

					      	let elemento = $(".page-content")[1];
							let esseElemento = elemento.firstElementChild;
							esseElemento.style.position="relative";
							esseElemento.style.top="26px";
							$(".icon-back").attr('style', 'color: #037aff !important');
					    },
					}
				});

				// console.log(smartSelect);
				
				var primeiro = '<option value="" selected="">Selecione o seu Condominio</option>';
                for (x in retorno) {
                    dado = '<option onclick="select_user('+retorno[x]['id_usuario_condominio']+')" value="'+retorno[x]['id_usuario_condominio']+'">'+retorno[x]['nome_condominio']+'</option>';
                    dados = dados + dado;
                }
                dados = primeiro + dados;

                $('#perfil_login').html(dados);
			}
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0);
	}
}

// ====>>>>>>>>>>>>>>>>>>>>>

alerta = (title, msg, afterClose=null) => {
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
					$("#inputReceveEmailToGetCode").val("");

					// $("#telaVerificaCodigo").css('display', 'block');
					// $("#primeiroAcesso").css('display', 'none');
					// $("#initApp").css('display', 'none');

				}else if(afterClose == "defineSenha"){
					switchTelaDefineSenhaToLogin();
				}else if (afterClose == "logaNoApp") {

				}
				// else if(afterClose == "logaDoFace"){
				// 	login_user_device();
				// }else if(afterClose == "logaDoGoogle"){
				// 	login_user_device();
				// }
				else if (afterClose == "termoUso") {
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


aceiteiTermo = (prossigaOutroCaminho=null) => {
	var liberar = localStorage.getItem('data-liberarSemSenha');
	if (liberar == null) {
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
		localStorage.removeItem('data-liberarSemSenha');
		enviarSenhaEliberarAcesso();
	}
}

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
				alerta("Tentativa login", 'O ' +email+ ' não está liberado para acessar o condominio tente outra forma de autenticar..', afterClose=null)
			}
        },
        error: function(error) {
			console.log(error);
			// alert('não foi possivel continuar...');
        }
	});
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

let loginFB = () => {
	// app.dialog.preloader("carregando", 'blue');
	facebookConnectPlugin.logout(
		function(successo){
		    facebookConnectPlugin.login(['public_profile', 'email'], function(result){
		        facebookConnectPlugin.api("/me?fields=id,name,email", ["email"], function(userData){
		            let name = userData.name;
		            let email = userData.email;
		    		localStorage.setItem('emailSocialMidia', email);
		            checkUsuarioFacebookToLogin(email);
		        },function(error){
		            alerta("Login com FB", "Erro ao logar com facebook (api)...");
		        });
		    },function(error){
		        alerta("Login com FB", "Erro ao logar com facebook (login)...");
		    })
		},
		function(erroror){
			facebookConnectPlugin.login(['public_profile', 'email'], function(result){
		        facebookConnectPlugin.api("/me?fields=id,name,email", ["email"], function(userData){
		            let name = userData.name;
		            let email = userData.email;
		    		localStorage.setItem('emailSocialMidia', email);
		            checkUsuarioFacebookToLogin(email);
		        },function(error){
		            alerta("Login com FB", "Erro ao logar com facebook (api)...");
		        });
		    },function(error){
		        alerta("Login com FB", "Erro ao logar com facebook (login)...");
		    });
			// alerta("Login com FB", "Erro ao conectar com FB...");
			// alert(JSON.stringify(erroror));
		}
	);
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
			if (retorno.status == "usuarioValidoToLoginFacebook" && retorno.statuscode == 200) {
				app.dialog.preloader("Direcionando para App", 'blue');
				setTimeout(function () {
					app.dialog.close();
					login_user_device();
				}, 1000);

			}else 
			if (retorno.status == "perfilAtivoSemSenha" && retorno.statuscode == 200) {
				localStorage.setItem('data-liberarSemSenha','liberarSemSenha');
				alerta('Login pelo Facebook', "Direcionando para termo de uso", afterClose="termoUso");
			}else{
				let msg = `O  ${email} Não está liberado para acessar o condominio tente outra forma de autenticar ou entre em contato com a sua adminstradora..`;
				alerta("Tentativa de login",msg, afterClose=null)
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



	// window.plugins.googleplus.disconnect(
	//     function (msg) {
	//       alert(msg); 
	//     }
	// );


	window.plugins.googleplus.login({},
	    function(obj) {
			app.dialog.close();
	      	let email = obj.email;
	      	let nome = obj.displayName;
			localStorage.setItem('emailSocialMidia', email);
		    checkUsuarioGoogleToLogin(email);
	    },
	    function(msg) {
	    	app.dialog.close();
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
	
			if (retorno.status == "perfilAtivoSemSenha" && retorno.statuscode == 200) {
				$("#btnAtivarConta").data('liberarSemSenha', 'liberarSemSenha');
				alerta('Login Google', "direcionando para termo de uso", afterClose="termoUso");
			}else 
			if (retorno.status == "usuarioValidoToLoginGoogle" && retorno.statuscode == 200){
				app.dialog.close();
				login_user_device();
			}
			else{
				let msg = `O  ${email} Não está liberado para acessar o condominio tente outra forma de autenticar ou entre em contato com a sua adminstradora..`;
				alerta("Tentativa de login",msg, afterClose=null);
			}
        },
        error: function(error) {
			console.log(error);
			console.log('não foi possivel continuar...');
        }
	});	
}
