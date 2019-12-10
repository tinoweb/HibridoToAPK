carregaInfoProfile = () => {
	let img;
	let foto = localStorage.getItem("FOTO");
	if (foto.length > 0) {
		img = "data:image/png;base64,"+foto;
	}else{
		img = "img/avatar.png";
	}

	let nomeMorador = localStorage.getItem("MORADOR_NOME");
	let blocoMorador = localStorage.getItem("QUADRA").toLowerCase();
	let loteMorador = localStorage.getItem("LOTE").toLowerCase();
	let nomeCondominio = localStorage.getItem("CONDOMINIO").toLowerCase();

	loteMorador = loteMorador.charAt(0).toUpperCase() + loteMorador.slice(1);
	nomeMorador = nomeMorador.charAt(0).toUpperCase() + nomeMorador.slice(1);
 	blocoMorador = blocoMorador.charAt(0).toUpperCase() + blocoMorador.slice(1);
	nomeCondominio = nomeCondominio.charAt(0).toUpperCase() + nomeCondominio.slice(1);
	
	nomeMorador_ = nomeMorador.substr(0, 20);
	nomeMorador_ = nomeMorador_+'...';
	
	setTimeout(function() {
		$("#moradorName").html(nomeMorador);
		$("#nomeMorardorMenu").html(nomeMorador_);
		$("#moradorBloco").html(blocoMorador);
		$("#moradorApt").html(loteMorador);
		$('.Perfil_user_foto').attr("src", img);
		$(".perfil_condominio").html(nomeCondominio);
	}, 200);
}

carrega_dados_and_info = (id_condominio) => {
	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
	var families = {};
	let dados
	let id_unidade = localStorage.getItem('ID_UNIDADE');
	$.ajax({
		type: 'POST',
		url: urlDominio+'appweb/morador_get.php',
		crossDomain: true,
        data       : { id_condominio : id_condominio, id_unidade_morador: id_unidade, getType: "parentes" },
        dataType   : 'json',
		success: function(retorno){
			console.log("dados info morador...");
			$.each(retorno, function(index, el) {
				$$("#familiares_morador").append( `<li class="accordion-item">
					    <a class="item-content item-link" href="#">
					        <div class="item-media">
					            <div class="item-media">
					               <img src="${el.foto.length <= 0 ? "img/avatar.png" : "data:image/png;base64,"+el.foto}" width="40"/>
					            </div>
					        </div>
					        <div class="item-inner">
					            <div class="item-title">
					                ${el.nome}
					                <p class="size-10">
					                    ${el.descricao}
					                </p>
					            </div>
					        </div>
					    </a>
					    <div class="accordion-item-content">
					        <div class="block" style="margin-bottom: 5%">
					            <div class="navbar">
					                <div class="navbar-inner">
					                    <div class="left">
					                        <a class="link color-theme-green size-10" data-transition="f7-circle" href="/chat1/">
					                            <i class="f7-icons" style="color:green">
					                                chat_bubble_text
					                            </i>
					                            Conversar
					                        </a>
					                    </div>
					                    <div class="center">
					                        <a class="link color-theme-blue size-10" href="/perfil/">
					                            <i class="f7-icons" style="color:blue">
					                                person_crop_circle_badge_exclam
					                            </i>
					                            Perfil
					                        </a>
					                    </div>
					                    <div class="right">
					                        <a class="link color-theme-red size-10" href="/perfil_editar/">
					                            <i class="f7-icons" style="color:red">
					                                pencil_circle
					                            </i>
					                            Editar
					                        </a>
					                    </div>
					                </div>
					            </div>
					        </div>
					    </div>
					</li>`);
				});
        	localStorage.setItem("FAMILIASGETED", "geted");
        },
        error: function() {
            alerta(4);
        }
	});
}

carrega_morador_dados = (id_morador) => {
	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
	$.ajax({
		type: 'POST',
		url: urlDominio+'appweb/morador_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { id_condominio : localStorage.getItem("ID_CONDOMINIO"), id_morador : id_morador },
        dataType   : 'json',
		success: function(retorno){
			console.log(retorno);
			console.log("carregando dados do morador....");

            let gernero = retorno[0]['masculino']==1? "Masculino" : "Feminino";
            let statusVisita = retorno[0]['perfil_statusVisita']==1? "Ativo" : "Inativo";
            let statusCondo = retorno[0]['usar_control_condo']==1? "Ativo" : "Inativo";  

			$("#perfil_rg").html(retorno[0]['rg']);
			$("#perfil_telefone").html(retorno[0]['telefone']);
			$("#perfil_nascimento").html(retorno[0]['nascimento']);
			$("#perfil_gernero").html(gernero);
			$("#perfil_parentesco").html(retorno[0]['descricao']);
			$("#perfil_statusCondo").html(statusCondo);
			$("#perfil_statusVisita").html(statusVisita);
			$("#perfil_email").html(retorno[0]['email']);

			console.log(retorno);
			setProfileData(retorno, gernero, statusCondo, statusVisita);


			if (retorno[0]['parentesco'] == 1) {
				carrega_dados_and_info(retorno[0]['id_condominio']);
			}else{
				$$(".hasFamilia").hide();
			}
			// if(retorno[0]['foto'] == ''){
			//    var foto_morador = 'img/user2.png';
			// }else{
			//    var foto_morador = 'data:image/jpeg;base64,'+retorno[0]['foto']+'';
			// }

			// $( '#foto_morador_edit' ).css("background-image", "url("+foto_morador+")");
            
            // $( "#mor_id_morador" ).val(id_morador);
            // $( "#mor_veiculo_id_morador" ).val(id_morador);
            // $( "#mor_contato_id_morador" ).val(id_morador);

			// $( "#mor_nome" ).val(retorno[0]['nome']);
			// $( "#mor_rg" ).val(retorno[0]['rg']);
			// $( "#mor_cpf" ).val(retorno[0]['telefone']);
			// $( "#mor_nascimento" ).val(retorno[0]['nascimento']);
			// $( "#mor_unidade" ).val(retorno[0]['unidade']);

			// if(id_morador == 0){
	  		//		$( "#mor_unidade" ).val($( "#DADOS #ID_UNIDADE" ).val());
			// 	$("#tab_add_morador_veiculo,#tab_add_morador_contato").addClass("disabled");
			// }else{
			// 	$("#tab_add_morador_veiculo,#tab_add_morador_contato").removeClass("disabled");
			// }

			// var paretesco_dados = '<option value="0">Selecione</option>';
			// for (x in retorno[0]['parentescos']) {
			// 	if(localStorage.getItem('TEM_TITULAR') == 1 && retorno[0]['parentescos'][x]['id'] == 1){
			// 		paretesco_dados = paretesco_dados + '<option disabled value="'+retorno[0]['parentescos'][x]['id']+'">'+retorno[0]['parentescos'][x]['descricao']+'</option>';

			// 	}else{
			// 		paretesco_dados = paretesco_dados + '<option value="'+retorno[0]['parentescos'][x]['id']+'">'+retorno[0]['parentescos'][x]['descricao']+'</option>';
			// 	}
			// }
			// $( "#mor_parentesco" ).html(paretesco_dados);
			// $( "#mor_parentesco" ).val(retorno[0]['parentesco']);
			// $( "#mor_parentesco_hidden" ).val(retorno[0]['parentesco']);
			// if(retorno[0]['parentesco'] == 1){
			// 	$("#mor_parentesco").addClass("disabled");
			// }else{
			// 	$("#mor_parentesco").removeClass("disabled");
			// }
			// $( "#mor_email" ).val(retorno[0]['email']);
			// if(retorno[0]['masculino'] == 1){
   			//              document.getElementById("mor_homem").checked = true;
			// }else{
   			//              document.getElementById("mor_mulher").checked = true;
			// }
			// if(retorno[0]['autoriza'] == 1){
   			//              document.getElementById("mor_autoriza").checked = true;
			// }else{
   			//              document.getElementById("mor_autoriza").checked = false;
			// }
			// if(retorno[0]['usar_control_condo'] == 1){
   			//              document.getElementById("mor_controlcondo").checked = true;
			// }else{
   			//              document.getElementById("mor_controlcondo").checked = false;
			// }
			// $( "#mor_msg" ).val(retorno[0]['observacao']);
			
			// if(localStorage.getItem('MMORADOR') != 1){
			// 	afed('','#bt_mor_atu,#bt_mor_del','','',2,'');
			// 	$("#form_moradores input,#form_moradores textarea,#form_moradores select").prop("disabled", true);
			// }else{
			// 	afed('#bt_mor_atu,#bt_mor_del','','','',2,'');
			// 	$("#form_moradores input,#form_moradores textarea,#form_moradores select").prop("disabled", false);
			// }
			
			// if(localStorage.getItem('MFPERFIL') != 1){
			// 	afed('#bt_mor_ftn','#bt_mor_ft1,#bt_mor_ft2','','',2,'');
			// }else{
			// 	afed('#bt_mor_ft1,#bt_mor_ft2','#bt_mor_ftn','','',2,'');
			// }
			//alert(localStorage.getItem('MMORADOR')+localStorage.getItem('MVEICULOS')+localStorage.getItem('MCONTATOS')+localStorage.getItem('MFPERFIL'));
			
			
			
			// var veiculos_dados = '';
			// for (x in retorno[0]['veiculos']) {
				
			// 	if(retorno[0]['veiculos'][x]['foto'] == ""){
			// 		var fotov = '<i class="icon material-icons" style="margin: 0px 0 0 8px;  ">directions_car</i>';
			// 	}else{
			// 		var fotov = '<img style="width:40px;height:40px; background-image:url(data:image/jpeg;base64,'+retorno[0]['veiculos'][x]['foto']+'); background-size: 52px; background-position: center center; border-radius: 20px;" />';
			// 	}
				
			// 	veiculos_dados = veiculos_dados + 
			// 		'<li>'+
			// 		'<a href="#" class="item-link item-content sheet-open" data-sheet=".veiculo-morador" onClick="veiculo_marca_modelo_cor('+retorno[0]['veiculos'][x]['id']+',1)">'+
			// 		'<div class="item-media" style="width: 44px; height: 44px; margin-top:15px; border-radius: 22px; border: 2px solid #8e8e93;">'+fotov+'</div>'+
			// 		'<div class="item-inner">'+
			// 		'<div class="item-title-row">'+
			// 		'<div class="item-title">'+retorno[0]['veiculos'][x]['marca_desc']+' - '+retorno[0]['veiculos'][x]['modelo_desc']+' - '+retorno[0]['veiculos'][x]['cor_desc']+'</div>'+
			// 		'</div>'+
			// 		'<div class="item-subtitle">'+retorno[0]['veiculos'][x]['placa']+'</div>'+
			// 		'</div>'+
			// 		'</a>'+
			// 		'</li>';
			// }
			// $( "#retorno_veiculo_morador" ).html(veiculos_dados);
			// if(localStorage.getItem('MVEICULOS') != 1){
			// 	afed('','#bt_mv_atu,#bt_mv_del,#bt_mv_add,#bt_mv_ft1,#bt_mv_ft2','','',2,'');
			// 	$("#form_morador_veiculo input,#form_morador_veiculo textarea,#form_morador_veiculo select").prop("disabled", true);
			// }else{
			// 	afed('#bt_mv_atu,#bt_mv_del,#bt_mv_add,#bt_mv_ft1,#bt_mv_ft2','','','',2,'');
			// 	$("#form_morador_veiculo input,#form_morador_veiculo textarea,#form_morador_veiculo select").prop("disabled", false);
			// }

			
			// var contatos_dados = '';
			// for (x in retorno[0]['contatos']) {
			// 	contatos_dados = contatos_dados + 
			// 		'<li>'+
			// 		'<a href="#" class="item-link item-content sheet-open" data-sheet=".contato-morador" onClick="contatos('+retorno[0]['contatos'][x]['id_contato']+',1)" >'+
			// 		'<div class="item-inner">'+
			// 		'<div class="item-title">'+
			// 		'<div class="item-header">'+retorno[0]['contatos'][x]['descricao']+'</div>'+
			// 		''+retorno[0]['contatos'][x]['contato']+''+
			// 		'</div>'+
			// 		'<div class="item-after"></div>'+
			// 		'</div>'+
			// 		'</a>'+
			// 		'</li>';
			// }
			// $( "#retorno_contato_morador" ).html(contatos_dados);
			// if(localStorage.getItem('MCONTATOS') != 1){
			// 	afed('','#bt_mc_atu,#bt_mc_del,#bt_mc_add','','',2,'');
			// 	$("#form_morador_contato input,#form_morador_contato textarea,#form_morador_contato select").prop("disabled", true);
			// }else{
			// 	afed('#bt_mc_atu,#bt_mc_del,#bt_mc_add','','','',2,'');
			// 	$("#form_morador_contato input,#form_morador_contato textarea,#form_morador_contato select").prop("disabled", false);
			// }

			
			// if(localStorage.getItem('TELA_ATUAL') == 'morador_perfil'){
			// 	$("#voltar_morador").attr("onclick","afed('#home','#morador','','',2,'home');");
			// }else{
			// 	$("#voltar_morador").attr("onclick","afed('#moradores','#morador','','',2,'moradores');");
			// 	afed('#morador','#moradores','','',2,'morador');
			// }
        },
        error: function(error) {
            // alerta(4);
            alerta(JSON.stringify(error));
        }
	});
}

setProfileData = (retorno, gernero, statusCondo, statusVisita) => {
	localStorage.setItem('profile_rg', retorno[0]['rg']);
	localStorage.setItem('profile_email', retorno[0]['email']);
	localStorage.setItem('profile_gernero', gernero);
	localStorage.setItem('profile_telefone', retorno[0]['telefone']);
	localStorage.setItem('profile_nascimento', retorno[0]['nascimento']);
	localStorage.setItem('profile_parentesco', retorno[0]['descricao']);
	localStorage.setItem('profile_statusCondo', statusCondo);
	localStorage.setItem('profile_statusVisita', statusVisita);
	localStorage.setItem('arrayVeiculo', JSON.stringify(retorno[0]['veiculos']));
}

getProfileData = () => {
	$("#perfil_rg").html(localStorage.getItem('profile_rg'));
	$("#perfil_email").html(localStorage.getItem('profile_email'));
	$("#perfil_gernero").html(localStorage.getItem('profile_gernero'));
	$("#perfil_telefone").html(localStorage.getItem('profile_telefone'));
	$("#perfil_nascimento").html(localStorage.getItem('profile_nascimento'));
	$("#perfil_parentesco").html(localStorage.getItem('profile_parentesco'));
	$("#perfil_statusCondo").html(localStorage.getItem('profile_statusCondo'));
	$("#perfil_statusVisita").html(localStorage.getItem('profile_statusVisita'));
}

clearProfileData = () => {
	localStorage.removeItem('profile_rg');
	localStorage.removeItem('profile_email');
	localStorage.removeItem('profile_gernero');
	localStorage.removeItem('profile_telefone');
	localStorage.removeItem('profile_nascimento');
	localStorage.removeItem('profile_parentesco');
	localStorage.removeItem('profile_statusCondo');
	localStorage.removeItem('profile_statusVisita');	
}


//////////////////////////////EDITAR PERFIL/////////////////////////////

goToEditarPerfil = () => {
	console.log("goToEditarPerfil function....");
	app.views.main.router.navigate("/editar_profile/", {animate:true});


	$(document).on('page:init', '.page[data-name="pgEditarProfile"]', function (e) {
		console.log("dentro da editar perfil....");
		$("#editarPerfil_rg").val(localStorage.getItem('profile_rg'));
		$("#editarPerfil_telefone").val(localStorage.getItem('profile_telefone'));
		$("#editarPerfil_cpf").val(localStorage.getItem('profile_cpf'));
		$("#editarPerfil_nome").val(localStorage.getItem('MORADOR_NOME'));
		$("#editarPerfil_sexo").val(localStorage.getItem('profile_gernero'));
		$("#editarPerfil_dataNascimento").val(localStorage.getItem('profile_nascimento'));
	});


	$(document).one('click', '.tabDadosVeiculos', function (e) {
		console.log("dentro da editar perfil passo 2....");
		let arrayVeiculo = localStorage.getItem('arrayVeiculo');
		arrayVeiculo = JSON.parse(arrayVeiculo);
		var veicuArr = null;
		
		console.log(arrayVeiculo);

		if (arrayVeiculo.length > 0) {
			$.each(arrayVeiculo, function(index, val) {
				$("#editarPerfilPasso2_veiculos").append(
				`<ul>
						<li class="accordion-item">
							<a href="#" class="item-content item-link">
								<div class="item-media">
									<div class="item-media">
										<i class="f7-icons" width="40">car_fill</i>
									</div>
								</div>
								
								<div class="item-inner">
								   <div class="item-title">${val.marca_desc}</div>
								</div>
							</a>
							
							<div class="accordion-item-content">
								<div class="block" style="margin-bottom: 5%">
								  	<div class="list inline-labels no-hairlines-md">
								  		<form action="#" id="id_${val.id}">
										  	<ul data-idveiculo="${val.id}">
												<li class="item-content item-input">
												  	<div class="item-inner">
														<div class="item-title item-label">Placa</div>
														<div class="item-input-wrap">
														  	<input name="placa" type="text" value="${val.placa}" placeholder="">
														  	<span class="input-clear-button"></span>
														</div>
												  	</div>
												</li>
												<li class="item-content item-input">
												  	<div class="item-inner">
														<div class="item-title item-label">Marca</div>
														<div class="item-input-wrap">
														  	<input name="marca" type="text" data-marca="${val.marca}" value="${val.marca_desc}" placeholder="">
														  	<span class="input-clear-button"></span>
														</div>
												  	</div>
												</li>
												<li class="item-content item-input">
												  	<div class="item-inner">
														<div class="item-title item-label">Modelo</div>
														<div class="item-input-wrap">
														  	<input name="modelo" type="text" data-modelo="${val.modelo}" value="${val.modelo_desc}" placeholder="">
														  	<span class="input-clear-button"></span>
														</div>
												  	</div>
												</li>
												<li class="item-content item-input">
												  <div class="item-inner">
													<div class="item-title item-label">Cor</div>
														<div class="item-input-wrap">
														  	<input name="cor" type="text" data-cor="${val.cor}" value="${val.cor_desc}" placeholder="">
														  	<span class="input-clear-button"></span>
														</div>
												  </div>
												</li>

												<li class="item-content" style="position: relative;top: 10px;">
				                                    <button id="btnSaveDadosContato" onclick="salvarVeiculo(event, id_${val.id})" class="col-50 rigth-6 button button-raised color-green button-fill">Salvar</button>
				                                </li>
										  	</ul>
									  	</form>
									</div>
								</div>
							</div>
						</li>
					</ul>`);
			});
		}else{
			console.log("não possui ");
		}
	});

}


salvarVeiculo = (e, id_form, idVeiculo) => {
	e.preventDefault();
	console.log(id_form);
	console.log(idVeiculo);
	console.log($(id_form).serialize());


	return false;


}


salvarDadosContato = (event) => {
	event.preventDefault();
	let moradorData = $("#personalInfo").serialize();
	console.log(moradorData);
	// return false;

	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
	$.ajax({
		type: 'POST',
		url: urlDominio+'appweb/morador_update.php',
        data : { 
        	id_condominio : localStorage.getItem("ID_CONDOMINIO"), 
        	dataMorador : moradorData,
        	id_morador : localStorage.getItem("ID_MORADOR"),
        	typeOperation: 'updateMorador'
        },
        dataType   : 'json',
		crossDomain: true,
		success: function(retorno){
			console.log("reorno do morador atualizado");
			console.log(retorno);
			return false;

        },
        error: function(error) {
            alerta(JSON.stringify(error));
        }
	});
}