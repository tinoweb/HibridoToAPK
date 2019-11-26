//FUNCAO CARREGA TODOS VISITAMTES
var temp;
function carrega_visitantes(valor_busca,tipo){
    //alert(localStorage.getItem('TIPO_BUSCA_VISITANTE')+'///'+sql);
	
    var dados    = '';
	var cont     = 0;
	var contador = 0;
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');

    

	contador += 1;

	if(contador == 1){
    if(valor_busca != ''){
        if(valor_busca.length > 4 && tipo == 1 || tipo == 0 ){
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/visitante_get.php',
			crossDomain: true,
			//beforeSend : function() { $("#wait").css("display", "block"); },
			//complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_condominio : id_condominio, tipo : tipo, sql : valor_busca},
            dataType   : 'json',
            success: function(retorno){
			//	alert(retorno);
				var dados = '';
                for (x in retorno) {
					cont++;
					if(retorno[x]['foto'].length>0){
						
						var dadof = '<div style=" width: 44px;  height: 44px; background-size: 44px; background-position: center center; background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+')"></div>';
					}else{
						var dadof = '<div class="item-media"> <i class="f7-icons" style="font-size: 44px;">User</i></div>';
					}
					var dados = dados+'<li class="item-content">'+
						'<a href="#" class="item-link item-content" onClick="hidden_btn();escolhe_visita(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\',\''+retorno[x]['rg']+'\')">'+
							'<div class="item-media">'+dadof+'</div>'+
							'<div class="item-inner" >'+
								'<div class="item-title-row"  style="width:100%">'+
									'<div class="item-title">'+retorno[x]['nome']+'</div>'+
								'</div>'+
								'<div class="item-subtitle">'+retorno[x]['rg']+'</div>'+
							'</div>'+
						'</a>'+
					'</li>';	
                }
                dados = dados + '<div class="" style="background-color: #f86464;color: white;height: 50px;padding-top: -10px;" onClick="novo_visitante()"><strong><i class="fa fa-user"></i> Novo Visitante</strong></div>';
                $( "#visitantes" ).html(dados);
                
            },
            error      : function(error) {
                //console.log(error);
                //alert('Erro ao carregar visitantes');
                //alert(dados);
            }
        });
        }
    }else{
        $( "#retorno_visita" ).html('');
    }
	if(cont === 0){
		var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>";

		$("#retorno_visita").html(sem_reg);
	 }

	 clearInterval(temp);

	}
	

}


//FUNCAO SELECIONA UM VISITANTE
function escolhe_visita(id,nome,rg){

	$( "#add_liberacao #nome" ).val(nome);
	$( "#add_liberacao #rg" ).val(rg);
	$( "#add_liberacao #visita" ).val(id);
	$( "#add_liberacao #visita" ).val(id);
	afed('#liberacao2','#visitantes','','',3,'liberacao_add');
	$( "#add_liberacao #savarLib").html('<span class="fa fa-check"></span> Salvar');
	$("#liberacao_placa").val("");
	$("#cad_veiculo").hide();
	
	

}

//FUNCAO NOVO VISITANETE
function novo_visitante(){

   /* $( '#foto_visitante' ).css("background-image", "url(img/user2.png)");*/
    $( "#add_visitante #nome" ).val('');    
    $( "#add_visitante #rg" ).val('');
    $( "#add_visitante #cpf" ).val('');
    $( "#add_visitante #end" ).val('');
    $( "#add_visitante #num" ).val('');
    $( "#add_visitante #bairro" ).val('');
    $( "#add_visitante #cidade" ).val('');
    $( "#add_visitante #uf" ).val('');
    $( "#add_visitante #cep" ).val('');
    $( "#add_visitante #cel" ).val('');
    $( "#add_visitante #fone" ).val('');
    $( "#add_visitante #email" ).val('');
    $( "#add_visitante #obs" ).val('');
	$( '#foto_visitante' ).css("background-image", "url()");
	$( "#foto_visitante" ).html('<span class="fa fa-user-circle" id="nophoto" style="font-size: 7em;margin-left: -22px;color: #cecece;"></span>');
    
    if(localStorage.getItem('TIPO_BUSCA_VISITANTE') == 0){
        $( "#add_visitante #nome" ).val($("#visitante_busca").val());
    }else{
        $( "#add_visitante #rg" ).val($("#visitante_busca").val());
    }
    
    afed('#visitante','#visitantes','','','2','visitante');
    $("#visi_scroll").scrollTop(0);

	$("#add_visitante #nome").focus();
}

//FUNCAO SALVA CADASTRO VISITANETE
function salva_visitante(){
    var qtd_nome = $( "#add_visitante #nome" ).val().split(' ');
	var msg = '';
	if($( "#add_visitante #nome" ).val() == ''){
		notifica('Preencha o campo/Preencha os campos Nome/Ok',1000,0);
	}else if($( "#add_visitante #rg" ).val() == ''){
        notifica('Preencha o campo/Preencha os campos RG/Ok',1000,0);
    }else if(qtd_nome.length < 2){
        notifica('Preencha o campo/Informe um sobrenome/Ok',1000,0);
    }else if(qtd_nome[1].length < 2){
        notifica('Preencha o campo/Informe sobrenome completo/Ok',1000,0);
	}else{
		//processando(1);
		
		var dados = $( "#add_visitante" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/visitante_insert.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val()+'&'+dados,
            //data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),sql : sql},
            dataType   : 'json',
			//url: SERVIDOR_CAMINHO+'appweb/visitante_salva.php',
			//data: dados+'&id_morador='+ID_MORADOR+'&banco='+BANCO+'&id_unidade='+ID_UNIDADE,
			success: function(retorno){
				//alert(retorno);
				if (retorno[0]['id'] == 0) {
					notifica('Aviso/RG já registrado/OK',0,0);
				}else{
					$( "#add_liberacao #nome" ).val(retorno[0]['nome']);
					$( "#add_liberacao #rg" ).val(retorno[0]['rg']);
					$( "#add_liberacao #visita" ).val(retorno[0]['id']);


					afed('#liberacao2','#visitante','','',3,'liberacao_add');

				}
				//alert(retorno);
			},
			error:function(){
				
				alerta("","RG já cadastrado");
			}
		});
	}
}

function foto_visitante(){
    navigator.notification.confirm(
        'Escolha uma opção',  // message
        foto_v_carrega,              // callback to invoke with index of button pressed
        'Visitante',            // title
        'Camera,Galeria'          // buttonLabels
    );
}

function foto_v_carrega(opcao) {
    if(opcao == 1){
        //alert('Camera');
        app.foto_visitante();
    }else if(opcao == 2){
        //alert('Galeria');
        app.foto_visitante2();
    }
}

function hidden_btn(){
	
	$( "#add_liberacao #l_deletar" ).hide();
	$( "#add_liberacao #l_cadastrar" ).parent().attr("class","col-xs-12");
	
}

function get_veiculo(placa){
	
	let tamanho    = placa.length;
	let parametro1 = "";
	let parametro2 = "";
	
	if(tamanho==8){
		sessionStorage.setItem("completo","true");
		$("#l_placa_carro").val(placa);	    
		$.ajax({
				type: 'POST',
				url: localStorage.getItem('DOMINIO')+'appweb/veiculo_visitante_get.php',
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
				data       : 'placa='+placa+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
				dataType   : 'json',
				success: function(retorno){
					
					if(retorno.marca == null){
				        parametro1 = "Não informado"; 
						var marca_dados = '<option value="0">Selecione</option>';
						for (x in retorno['all_marca']) {
							marca_dados = marca_dados + '<option value="'+retorno['all_marca'][x]['id']+'">'+retorno['all_marca'][x]['marca']+'</option>';
						}
						$('#l_marca_carro').html(marca_dados);
					}else{
						parametro1 = retorno.marca.toLowerCase();
					}
					
					if(retorno.modelo == null){
				        parametro2 = "Não informado";
						$('#l_modelo_carro').html('<option value="0">Selecione</option>');
					}
					
					if(retorno.cor == null){
						var cor_dados = '<option value="0">Selecione</option>';
						for (x in retorno['all_cor']) {
							cor_dados = cor_dados + '<option value="'+retorno['all_cor'][x]['id']+'">'+retorno['all_cor'][x]['cor']+'</option>';
						}
						//alert(cor_dados);
						$('#l_cor_carro').html(cor_dados);
					}
					
					console.log(retorno);
					if(retorno.id == null ){
 						$("#cad_veiculo").fadeIn();
						$("#cad_veiculo_ok").hide();
						app2.dialog.confirm('Para continuar e necessário cadastrar esse veiculo. Deseja cadastrar agora?','Cadastro', function () {
							$("#cad_veiculo").click();
						});
					 }else{
						$("#liberacao2 #id_veiculo").val(retorno.id);
						$("#cad_veiculo_ok").fadeIn();
						$("#cad_veiculo").hide();
						$("#libMarca").html("Marca: "+parametro1).fadeIn();
						$("#libModelo").html("Modelo: "+retorno.modelo.toLowerCase()).fadeIn();
						$("#libCor").html("Cor: "+retorno.cor.toLowerCase()).fadeIn();
					}
				}
		   });
	   }else{
		   $("#cad_veiculo").hide();
		   $("#cad_veiculo_ok").hide();
		   $("#libMarca").hide();
	       $("#libModelo").hide();
		   $("#libCor").hide();
		   
	  }
  };


