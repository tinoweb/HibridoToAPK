// JavaScript Document
// veiculo_marca_modelo_cor = (id_veiculo,tipo,marca='') => {
// 	var urlDominio = localStorage.getItem('IP_LOCAL')+'/controlcondo/v2/';
// 	var url = urlDominio+'appweb/veiculo_get.php.php',
// 	// localStorage.getItem('DOMINIO')+'appweb/veiculo_get.php',
// 	$.ajax({
// 		type: 'POST',
// 		url: url,
// 		crossDomain: true,
// 		beforeSend : function() { $("#wait").css("display", "block"); },
// 		complete   : function() { $("#wait").css("display", "none"); },
//         data : { 
//         	id_condominio : localStorage.getItem("ID_CONDOMINIO"), 
//         	id_veiculo : id_veiculo, 
//         	tipo_busca : tipo,
//         	marca : marca 
//         },
//         dataType   : 'json',
// 		success: function(retorno){
// 			if(tipo == 1){
// 				var marca_dados = '<option value="0">Seleciona</option>';
// 				for (x in retorno[0]['marcas']) {
// 					marca_dados = marca_dados + '<option value="'+retorno[0]['marcas'][x]['id']+'">'+retorno[0]['marcas'][x]['marca']+'</option>';
// 				}
// 			}
// 			if(tipo == 1 || tipo == 2){
// 				var modelo_dados = '<option value="0">Seleciona</option>';
// 				for (x in retorno[0]['modelo']) {
// 					modelo_dados = modelo_dados + '<option value="'+retorno[0]['modelo'][x]['id']+'">'+retorno[0]['modelo'][x]['modelo']+'</option>';
// 				}
// 			}
// 			if(tipo == 1){
// 				var cor_dados = '<option value="0">Seleciona</option>';
// 				for (x in retorno[0]['cor']) {
// 					cor_dados = cor_dados + '<option value="'+retorno[0]['cor'][x]['id']+'">'+retorno[0]['cor'][x]['cor']+'</option>';
// 				}
// 			}
			
// 			if(tipo == 1){
// 				$( "#id_carro" ).val(retorno[0]['veiculo'][0]['id']);
// 				$( "#marca_carro" ).html(marca_dados);
// 				$( "#marca_carro" ).val(retorno[0]['veiculo'][0]['marca']);
// 				$( "#modelo_carro" ).html(modelo_dados);
// 				$( "#modelo_carro" ).val(retorno[0]['veiculo'][0]['modelo']);
// 				$( "#cor_carro" ).html(cor_dados);
// 				$( "#cor_carro" ).val(retorno[0]['veiculo'][0]['cor']);
// 				$( "#id_carro" ).val(id_veiculo);
// 				$( "#placa_carro" ).val(retorno[0]['veiculo'][0]['placa']);
// 				$( '#foto_morador_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['veiculo'][0]['foto']+")");
// 				if(retorno[0]['veiculo'][0]['foto'] == ''){
// 				   $( '#foto_morador_veiculo' ).html('<i class="icon material-icons" style="margin: -30px 0 0 14px; font-size: 50px; ">directions_car</i>');
// 				}
// 				if(retorno[0]['veiculo'][0]['id'] == 0){
// 					$( '#foto_veiculo_img' ).val('');
// 				}
// 			}else if(tipo == 2) {
// 				$( "#modelo_carro" ).html(modelo_dados);
// 			}
						        
//         },
//         error      : function() {
//             alert('Erro ao carregar');

//         }
// 	});	
// }


function atualiza_veiculo_morador(){
	
	var dados = $( "#form_morador_veiculo" ).serialize();
	if($('#marca_carro').val() != 0 && $('#modelo_carro').val() != 0 && $('#cor_carro').val() != 0 && $('#placa_carro').val() != ''){
		//alert(dados);
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/veiculo_update.php',
			data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){
				if(retorno == 'A'){
					alerta(2);
				}else{
					alerta(1);
				}
				$(".veiculo-morador .sheet-close")[0].click();
				carrega_morador_dados($('#mor_veiculo_id_morador').val());
			},
			error: function(data){
				alerta(4);
			}	
		});	
	}else{
		if($('#marca_carro').val() == 0){
		   	alerta('',"Informe uma marca");
		}else if($('#modelo_carro').val() == 0){
			alerta('',"Informe um modelo");
		}else if($('#cor_carro').val() == 0){
			alerta('',"Informe uma cor");
		}else if($('#placa_carro').val() == ''){
			alerta('',"Informe a placa");
		}
	}
}

function delete_veiculo_morador(){
	
	app2.dialog.confirm('Confirma a exclusÃ£o','Excluir', function () {
		var dados = $( "#form_morador_veiculo" ).serialize();
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/veiculo_update.php',
			data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&excluir=1',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){
				//alert(retorno);
				if(retorno == 'E'){
					alerta(3);
				}else{
					alerta(4);
				}
				$(".veiculo-morador .sheet-close")[0].click();
			  	carrega_morador_dados($('#mor_veiculo_id_morador').val());
			},
			error: function(data){
				alerta(4);
			}	
		});	
	});
	
}

