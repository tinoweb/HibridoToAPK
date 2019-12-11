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

	// console.log(localStorage.getItem("MORADOR_NOME"));
	
	setTimeout(function() {
		// $("#moradorName").append(nomeMorador);
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

			localStorage.setItem("MORADOR_NOME", retorno[0]['nome']);
			localStorage.setItem("NOME_MORADOR", retorno[0]['nome']);

			$("#moradorName").append(retorno[0]['nome']);
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

			setProfileData(retorno, gernero, statusCondo, statusVisita);

			if (retorno[0]['parentesco'] == 1) {
				carrega_dados_and_info(retorno[0]['id_condominio']);
			}else{
				$$(".hasFamilia").hide();
			}
        },
        error: function(error) {
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
			console.log(retorno);
			if (retorno.status == 'sucess' && retorno.statuscode == 200) {
				alertaDialog("Sucesso", "Dados atualizado com sucesso", afterClose=null)
			}
        },
        error: function(error) {
            alerta(JSON.stringify(error));
        }
	});
}