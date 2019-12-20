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
	let nomeCondominio = localStorage.getItem("CONDO_NOME_EXIBICAO").toLowerCase();

	loteMorador = loteMorador.charAt(0).toUpperCase() + loteMorador.slice(1);
	nomeMorador = nomeMorador.charAt(0).toUpperCase() + nomeMorador.slice(1);
 	blocoMorador = blocoMorador.charAt(0).toUpperCase() + blocoMorador.slice(1);
	nomeCondominio = nomeCondominio.charAt(0).toUpperCase() + nomeCondominio.slice(1);
	
	nomeMorador_ = nomeMorador.substr(0, 20);
	nomeMorador_ = nomeMorador_+'...';

	if (localStorage.getItem("TIPO_PERFIL_QTD") == 'multiprofile') {
		$('#mudarDeCondominio').show();
	}else{
		$('#mudarDeCondominio').hide();
	}

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
	console.log('====>>>'+urlDominio);
	console.log("parametros");
	console.log(localStorage.getItem("ID_CONDOMINIO"));
	console.log(id_morador);
	// return false;


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

foto_perfil = () => {
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 50,
		correctOrientation: true,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true
    });

    function onSuccess(imageURI) {
        console.log(imageURI);
        return false;
        $( '.Perfil_user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
        $.ajax({ 
            type: 'POST', 
            url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_insert.php", 
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador: $( "#DADOS #ID_MORADOR" ).val(), foto: imageURI }, 
            success: function(retorno){ 
            	console.log(retorno);
            }, 
            error      : function() { 
                //alert('Erro'); 
            } 
        }); 
    }
    function onFail(message) {
        alert('Camera Indisponivel');
    }    
}


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
		$("#mor_veiculo_id_morador").val(localStorage.getItem('ID_MORADOR'));
		$("#mor_veiculo_id_morador_editar").val(localStorage.getItem('ID_MORADOR'));

		console.log("dentro da editar perfil passo 2....");

		let arrayVeiculo = localStorage.getItem('arrayVeiculo');
		arrayVeiculo = JSON.parse(arrayVeiculo);
		var veicuArr = null;

		console.log(arrayVeiculo);

		var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
		var url = urlDominio+'appweb/veiculo_get.php';
		
		$.ajax({
			type: 'POST',
			url: url,
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
	        data : { 
	        	id_condominio : localStorage.getItem("ID_CONDOMINIO"), 
	        	id_veiculo : 0, 
	        	tipo_busca : 1
	        },
	        dataType: 'json',
			success: function(retorno){
				console.log(retorno);
				$.each(retorno[0]['marcas'], function(index, val) {
					$(".marcaCAR").append(`<option value="${val.id}">${val.marca}</option>`);
				});

				$.each(retorno[0]['cor'], function(index, val) {
					$(".corCAR").append(`<option value="${val.id}">${val.cor}</option>`);
				});
	        },
	        error: function() {
	            alert('Erro ao carregar');
	        }
		});	
		
		if (arrayVeiculo != undefined && arrayVeiculo.length > 0) {
			$.each(arrayVeiculo, function(index, val) {
				$("#editarPerfilPasso2_veiculos").append(
				`<ul>
						<li class="accordion-item swipeout deletarVeiculo">
							<div class="swipeout-content">
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
								

								<div class="swipeout-actions-right">
							    	<a href="#" data-confirm="tem certeza que deseja deletar esse veículo?" class="swipeout-delete">Deletar</a>
							    </div>
								
								<div class="accordion-item-content">
									<div class="block" style="margin-bottom: 5%">
									  	<div class="list inline-labels no-hairlines-md">
									  		<form action="#" id="id_${val.id}">
											  	<ul data-idveiculo="${val.id}">
													
													<li class="item-content item-input">
													  	<div class="item-inner">
															<div class="item-title item-label">Marca</div>
															<div class="item-input-wrap">
															  	<select class="marcaCAR" name="marca" placeholder="" id="marca_carro_${val.id}" onchange="trazOsVeiculosParaEditar(${val.id}, 2, $(this).val(),  ${val.id})">
	                                                    			<option value="${val.marca}">${val.marca_desc}</option>
	                                                    			
	                                                    		</select>
															</div>
													  	</div>
													</li>
													<li class="item-content item-input">
													  	<div class="item-inner">
															<div class="item-title item-label">Modelo</div>
															<div class="item-input-wrap">
															  	<select class="" name="modelo" placeholder="" id="modelo_carro${val.id}" onchange="">
	                                                    			<option value="${val.modelo}">${val.modelo_desc}</option>
	                                                    		</select>
															</div>
													  	</div>
													</li>
													<li class="item-content item-input">
													  <div class="item-inner">
														<div class="item-title item-label">Cor</div>
															<div class="item-input-wrap">
																<select class="corCAR" name="cor" placeholder="" id="cor_carro${val.id}" onchange="">
	                                                    			<option value="${val.cor}">${val.cor_desc}</option>
	                                                    		</select>
															</div>
													  </div>
													</li>

													<li class="item-content item-input">
													  	<div class="item-inner">
															<div class="item-title item-label">Placa</div>
															<div class="item-input-wrap">
															  	<input name="placa" type="text" value="${val.placa}" placeholder="">
															  	<span class="input-clear-button"></span>
															</div>
													  	</div>
													</li>
												</form>
													<li class="item-content row" style="position: relative;top: 10px;">
														<input type="hidden" name="id_morador" id="mor_veiculo_id_morador_editar">
					                                    <button id="btnSaveDadosContato" onclick="atualizarVeiculo(event, id_${val.id}, ${val.id})" class="col-100 rigth-6 button button-raised color-green button-fill">
					                                    Salvar Edição</button>
					                                </li>
											  	</ul>
										</div>
									</div>
								</div>
							</div>
						</li>
				</ul>`);
			});
		}else{
			console.log("não possui ");
			$("#editarPerfilPasso2_veiculos").append(``);
		}
	});
}


// $$(".deletarVeiculo").on('swipeout:deleted', function (){

// }

///////// atualizar dados pessoais do morador///////////
atualizarDadosContato = (event) => {
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
			console.log("Atualizado com sucesso...");
			if (retorno.status == 'sucess' && retorno.statuscode == 200) {
				alertaDialog("Sucesso", "Dados atualizado com sucesso", afterClose=null)
			}
        },
        error: function(error) {
            alerta(JSON.stringify(error));
        }
	});
}

//////// popular os campos de marca e modelo da edicao de cada veiculo ///////
trazOsVeiculosParaEditar = (id_veiculo,tipo,marca='', idquemchama=null) => {
	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
	var url = urlDominio+'appweb/veiculo_get.php';

	$.ajax({
		type: 'POST',
		url: url,
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data : { 
        	id_condominio : localStorage.getItem("ID_CONDOMINIO"), 
        	id_veiculo : id_veiculo, 
        	tipo_busca : tipo,
        	marca : marca 
        },
        dataType   : 'json',
		success: function(retorno){
			
			if(tipo == 2) {
				var modelo_dados="";
				for (x in retorno[0]['modelo']) {
					modelo_dados += '<option value="'+retorno[0]['modelo'][x]['id']+'">'+retorno[0]['modelo'][x]['modelo']+'</option>';
				}
				$("#modelo_carro"+idquemchama).append(modelo_dados);
			}
        },
        error      : function() {
            alert('Erro ao carregar');
        }
	});	
}

/////Carregar veiculo //////////////////
veiculo_marca_modelo_cor = (id_veiculo,tipo,marca='') => {
	
	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
	var url = urlDominio+'appweb/veiculo_get.php';

	$.ajax({
		type: 'POST',
		url: url,
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data : { 
        	id_condominio : localStorage.getItem("ID_CONDOMINIO"), 
        	id_veiculo : id_veiculo, 
        	tipo_busca : tipo,
        	marca : marca 
        },
        dataType   : 'json',
		success: function(retorno){

			console.log(retorno);
			if(tipo == 1){
				var marca_dados = '<option value="0">Seleciona</option>';
				for (x in retorno[0]['marcas']) {
					marca_dados = marca_dados + '<option value="'+retorno[0]['marcas'][x]['id']+'">'+retorno[0]['marcas'][x]['marca']+'</option>';
				}
			}
			if(tipo == 1 || tipo == 2){
				var modelo_dados = '<option value="0">Seleciona</option>';
				for (x in retorno[0]['modelo']) {
					modelo_dados = modelo_dados + '<option value="'+retorno[0]['modelo'][x]['id']+'">'+retorno[0]['modelo'][x]['modelo']+'</option>';
				}
			}
			if(tipo == 1){
				var cor_dados = '<option value="0">Seleciona</option>';
				for (x in retorno[0]['cor']) {
					cor_dados = cor_dados + '<option value="'+retorno[0]['cor'][x]['id']+'">'+retorno[0]['cor'][x]['cor']+'</option>';
				}
			}

			if(tipo == 1){
				$( "#id_carro" ).val(retorno[0]['veiculo'][0]['id']);
				$( "#marca_carro" ).html(marca_dados);
				$( "#marca_carro" ).val(retorno[0]['veiculo'][0]['marca']);
				$( "#modelo_carro" ).html(modelo_dados);
				$( "#modelo_carro" ).val(retorno[0]['veiculo'][0]['modelo']);
				$( "#cor_carro" ).html(cor_dados);
				$( "#cor_carro" ).val(retorno[0]['veiculo'][0]['cor']);
				$( "#id_carro" ).val(id_veiculo);
				$( "#placa_carro" ).val(retorno[0]['veiculo'][0]['placa']);
				$( '#foto_morador_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['veiculo'][0]['foto']+")");

				// if(retorno[0]['veiculo'][0]['id'] == 0){
				// 	$( '#foto_veiculo_img' ).val('');
				// }

			}else if(tipo == 2) {
				$( "#modelo_carro" ).html(modelo_dados);
				console.log("chegou no final....");
			}
						        
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	
}

/////Salvar veiculo ////////////////////
salvarVeiculo = (event) => {
	event.preventDefault();
	var dados = $("#id_addVeiculo").serialize();
	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';

	console.log(dados);

	$.ajax({
		type: 'POST',
		url: urlDominio+'appweb/veiculo_update.php',
        data : dados+'&id_condominio='+localStorage.getItem("ID_CONDOMINIO"),
		crossDomain: true,
		success: function(retorno){
			console.log(retorno);

			if(retorno == 'A'){
				alertaDialog("Sucesso", "Veiculo atualizado com sucesso", afterClose=null)
				console.log("atualizado condominio");
			}else{
				console.log("inseriu condominio..");
				alertaDialog("Sucesso", "Veiculo adicionado com sucesso", "gotoprofile")
			}
        },
        error: function(error) {
            alerta(JSON.stringify(error));
        }
	});

}

////////atualizar Veiculo///////////////
atualizarVeiculo = (e, dadosVei, idVeiculo) => {
	e.preventDefault();
	let dados =$(dadosVei).serialize();
	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
	console.log(dados+'&id_condominio='+localStorage.getItem("ID_CONDOMINIO")+'&id_veiculo='+idVeiculo);

	$.ajax({
		type: 'POST',
		url: urlDominio+'appweb/veiculo_update.php',
        data : dados+'&id_condominio='+localStorage.getItem("ID_CONDOMINIO")+'&id_veiculo='+idVeiculo,
		crossDomain: true,
		success: function(retorno){
			console.log(retorno);

			if(retorno == 'A'){
				console.log("atualizado condominio");
				alertaDialog("Sucesso", "Veiculo atualizado com sucesso", 'gotoprofile');
			}else{
				console.log("inseriu condominio..");
				alertaDialog("Sucesso", "Veiculo adicionado com sucesso", "gotoprofile");
			}
        },
        error: function(error) {
            alerta(JSON.stringify(error));
        }
	});
}


