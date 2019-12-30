
 function avancar2()
{
	$('#botao_avancar').removeClass('tema-azul');
	$("#link_tab").attr('onClick','avancar3()');
	$("#link_tab").attr('href','#tab-4');
	//$("#botao_avancar").attr('class','tema-azul');
}
function avancar3()
{ 
	
//$("#link_tab #text_btn").html('Salvar');
$("#link_tab").attr('href','#tab-4');
 $('#botao_avancar').removeClass('tema-azul');

}
 function avancar4()
{ 
	
//$("#link_tab #text_btn").html('Salvar');
$("#link_tab").attr('href','#');
 $('#botao_avancar').removeClass('tema-azul');
$("#text_btn").html('Salvar');
}
 



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
        if(valor_busca.length >= 5 && tipo == 1 ||valor_busca.length >= 3 && tipo == 0 ){
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/visitante_get.php',
			crossDomain: true,
			//beforeSend : function() { $("#wait").css("display", "block"); },
			//complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_condominio : id_condominio, tipo : tipo, sql : valor_busca},
            dataType   : 'json',
            success: function(retorno){
				
				var dados = '';
                for (x in retorno) {
					cont++;
					if(retorno[x]['foto'].length>0){
						
						var dadof = '<div style=" width: 44px;  height: 44px; background-size: 44px; background-position: center center; background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+')"></div>';
					}else{
						var dadof = '<div class="item-media"> <i class="f7-icons" style="font-size: 44px;">User</i></div>';
					}
					var dados = dados+'<li class="item-content">'+
						'<a  class="item-link item-content link tab-link sheet-close" data-sheet=".buscar-visitante" href="#tab-2" style="width:100%" onClick="hidden_btn();escolhe_visita(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\',\''+retorno[x]['rua']+'\',\''+retorno[x]['numero']+'\',\''+retorno[x]['cidade']+'\',\''+retorno[x]['bairro']+'\',\''+retorno[x]['observacao']+'\',\''+retorno[x]['estado']+'\',\''+retorno[x]['tel']+'\',\''+retorno[x]['cel']+'\',\''+retorno[x]['cep']+'\',\''+retorno[x]['email']+'\',\''+retorno[x]['bloqueado']+'\',\''+retorno[x]['rg']+'\',\''+retorno[x]['foto']+'\')">'+
							'<div class="item-media">'+dadof+'</div>'+
							'<div class="item-inner" >'+
								'<div class="item-title-row"  style="width:100%">'+
									'<div class="item-title">'+retorno[x]['nome']+'</div>'+
								'</div>'+
								'<div class="item-subtitle" style="font-size:15px !important">'+retorno[x]['rg']+'</div>'+
							'</div>'+
						'</a>'+
					'</li>';	
                }
                dados = dados + '<button class="col button button-fill color-theme-red" onClick="novo_visitante()"><i class="f7-icons size-20" style="padding-top:10px;">person_badge_plus</i> Novo Cadastro</button>';
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
        $( "#visitantes" ).html('');
    }
	if(cont === 0){
		var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>";

		$("#retorno_visita").html(sem_reg);
	 }

	 clearInterval(temp);

	}
	

}


//FUNCAO SELECIONA UM VISITANTE
function escolhe_visita(id,nome,rua,numero,cidade,bairro,observacao,estado,tel,cel,cep,email,bloqueado,rg,foto){


	
	if(rua == 'null'){rua = "Não Informado"}	
	if(numero == 'null'){numero = "Não Informado"}	
	if(cidade == 'null'){cidade = "Não Informado"}	
	if(bairro == 'null'){bairro = "Não Informado"}	
	if(observacao == 'null'){observacao = "Não Informado"}	
	if(estado == 'null'){estado = "Não Informado"}	
	if(tel == 'null'){tel = "Não Informado"}	
	if(cel == 'null'){cel = "Não Informado"}	
	if(cep == 'null'){cep = "Não Informado"}	
	if(email == 'null'){email = "Não Informado"}	
		
	$( "#nome_vis" ).val(nome);
	$( "#rg_vis" ).val(rg);
	$( "#visitante_id").val(id);
	$( "#end_visit").val(rua);
	$( "#num_casav").val(numero);
	$( "#cidade_vs").val(cidade);
	$( "#bairro_visit").val(bairro);
	$( "#obs_vst").val(observacao);
	$( "#std_visi").val(estado);
	$( "#tel_visi").val(tel);
	$( "#cel_visi").val(cel);
	$( "#cep_vst").val(cep);
	$( "#email_visit").val(email);
	$( "#botao_avancar").attr('style','display:block;background: #919191;');
	$("#foto_visitante").html('<div style=" width: 54px;  height: 54px; background-size: 54px; background-position: center center; background-image:url(data:image/jpeg;base64,'+foto+')"></div>');
//alert(bloqueado);
	
	

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
	//alert(placa);
	let tamanho    = placa.length;
	let parametro1 = "";
	let parametro2 = "";
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	if(tamanho==8){
		sessionStorage.setItem("completo","true");
		$("#l_placa_carro").val(placa);	    
		$.ajax({
				type: 'POST',
				url: localStorage.getItem('DOMINIO')+'appweb/veiculo_visitante_get.php',
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
				data       : {placa:placa,id_condominio: id_condominio},
				dataType   : 'json',
				success: function(retorno){
					
				
					if(retorno.id == null)
						{
						
							alertaDialog("","Veículo não Cadastrado!");
							$("#buscar_placa").html('<i class="f7-icons size-15">car_fill</i> Cadastrar');
							$("#buscar_placa").attr('style','background-color:green;margin-top: -10px');
							$("#buscar_placa").attr('onClick','atualiza_veiculo_visitante()');
								$("#carro_marca .item-after").html('');
								$("#carro_modelo .item-after").html('');
								$("#carro_cor .item-after").html('');
							$("#liberacao_placa").attr('onKeyUp','botao_bs()');
								
						}else{
								$("#carro_marca .item-after").html(retorno.marca);
								$("#carro_modelo .item-after").html(retorno.modelo);
								$("#carro_cor .item-after").html(retorno.cor);
								$("#id_carro_visitante").val(retorno.id);
								$("#liberacao_placa").attr('onKeyUp','botao_bs()');
							
								$("#buscar_placa").attr('onClick','');
								$("#buscar_placa").html('<i class="f7-icons size-15">checkmark_alt</i> Veículo Encontrado');
								$("#buscar_placa").attr('style','background-color:green;margin-top: -10px;font-size:10px');
								$("#botao_avancar").addClass('tema-azul');		
								$("#link_tab").attr('onClick','avancar4()');
								$("#link_tab").attr('href','#tab-4');
							
								$( "#inicio_rs").mask('00/00/0000 00:00:00');
								$( "#nome_rs" ).val($( "#nome_vis" ).val());
								$( "#rg_rs" ).val($( "#rg_vis" ).val());
								$( "#id_visitante_rs").val($( "#visitante_id").val());
							
								$( "#inicio_rs").val($( "#data_inici_vl").val());
								$( "#fim_rs").val($( "#data_fim_vl").val());
							
								$( "#credito_rs").val($( "#qtd_credito_qr").val());
								$( "#placa_visitante_rs").val($( "#liberacao_placa").val());
							
								$( "#motivo_rs").val($("#motivo_selec_aft .item-after").html());
							
								$("#marca_cvisitante_rs").val($("#carro_marca .item-after").html());
							
								$( "#modelo_visitante_rs").val($("#carro_modelo .item-after").html());
								$( "#cor_visitante_rs").val($("#carro_cor .item-after").html());
							
			
						}
					 
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
					

				}
		   });
	   }else{
		   	 alertaDialog("Erro","Verifique se foi digitado a placa corretamente!");
		   
	  }
  };

function botao_bs()
{
			$("#buscar_placa").attr('onClick','get_veiculo($("#liberacao_placa").val())');
			$("#buscar_placa").html('<i class="f7-icons size-15">car_fill</i> Buscar').addClass('button button-fill color-theme-red');
			$("#buscar_placa").attr('style','background-color:red;margin-top: -10px;font-size:10px');	
	
	
}

function visitant_nomeb()
{
	$("#titulo_busca").html('');
	$("#titl_camp").html('');
	$("#titulo_busca").html('Buscar visitante pelo Nome');
	$("#titl_camp").html('Nome');
	$("#campo_texto").val(0);
	setTimeout(function(){$("#busc_input_visitante").focus();},100);
	
}
function visitante_rgb()
{
	$("#titulo_busca").html('Buscar visitante pelo RG');
	$("#titl_camp").html('RG');
	$("#campo_texto").val(1);
	//$("#busc_input_visitante").focus();
	setTimeout(function(){$("#busc_input_visitante").focus();},150);
}




