//Mudar entre Abas meus pet e todos os pets
function abas_pet()
	{	
	
	
			if($("#valor_tab").val() == 1)
			{
				$("#link-pet").attr('style','color:green;margin-left: 100%;margin-top: 0%;');
				$("#link-pet").attr('href','#tab-1');
				$("#valor_tab").val(0);
				carrega_pets(5);
			}else{
				$("#link-pet").attr('style','color:white;margin-left: 100%;margin-top: 0%;');
				$("#link-pet").attr('href','#tab-2');				
				$("#valor_tab").val(1);
				carrega_pets(0);
			}
	
		
		
	}



// FUNCAO CARREGA TODOS OS PETS 
function carrega_pets(tipo)
{

	//"use strict";	
	//app.controler_pull("pet_lista");
	var id_unidade ='';
	var dados = '';
	var dado  = '';
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var id_usuario_condominio = localStorage.getItem('ID_USER');
	var busca_pet ='';
	if(tipo === 4)
	{
	var	busca_pet = $("#busca_pets").val();	
	}
	if(tipo === 5)
	{
	var id_unidade = localStorage.getItem('ID_UNIDADE');
	}
	var pg = 0;
    if(tipo === 0 || tipo===3 || tipo===4)
	{
        pg = 1;
    }
	else
		{
        	var offset = $('.pet').length;
			if(offset !== 0)
			{
            pg = (offset/6)+1;
			}else
			{
            pg = 1;
        	}
    	}
    if(parseInt(pg) !== parseFloat(pg)) 
	{ 
        pg = pg+1; 
    }
   
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/pet_get.php",
		 	crossDomain: true,
			data       : { id_condominio : id_condominio, id_usuario_condominio : id_usuario_condominio, pg : 1, busca_pet : busca_pet,id_unidade: id_unidade },
			dataType   : 'json',
			beforeSend : function() { $("#sktlp").css("display", "block");$("#sktlp2").css("display", "block"); },
			complete   : function() { $("#sktlp").css("display", "none");$("#sktlp2").css("display", "block"); },
		 	success: function(retorno)
			{ // alert(retorno);
				$("#main_pet").html('');
				$("#meus_pets").html('');	
			var cont = 0;
			for (var x in retorno) 
				{
				cont++;
   				if(retorno[x]['foto'] == ''){
				   var foto_pet = 'img/pet_semfoto.jpg';
				}
				else
				{
				   var foto_pet = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
				} // CARREGANDO OS CARDS DOS PET
				var titulo = ''+localStorage.getItem('ROTULO_LOTE')+' ' +retorno[x]['lote']+'  '+localStorage.getItem('ROTULO_QUADRA')+' :'+retorno[x]['desc_quadra']+'';
				titulo = limita_txt(titulo,20);
					dado = '<li class="item-content">'
							+	'<a href="/perfil_pet/" onClick="carrega_pet(\''+retorno[x]['id_pet']+'\');" data-transition="f7-push"  style="width: 100%">'
							+		'<div class="item-media">'
							+			'<img src="'+foto_pet+'" width="44"></div>'
							+		  '<div class="item-inner">'
							+			'<div class="item-title" style="margin-top: 5%"> '+retorno[x]['nome']+''
							+			'<p class="size-10"> '+titulo+'</p>'
							+		 ' </div>'
							+		'</div>'
			 				+	'</a>'
						    +'</li>'	
                dados = dados + dado;
            } 
			   if(tipo === 0)
				{
					$("#main_pet").append(dados);
				}else if (tipo === 5)
					{
						$("#meus_pets").append(dados);
					}

            	if(cont == 0)
					{
						$("#sktlp").css("display", "none"); $("#sktlp2").css("display", "none");
						$("#main_pet").html('<img src="img/pet_notfound.png" style="width:100%">');
						$("#meus_pets").html('<img src="img/pet_notfound.png"style="width:100%">');;				
					}

		}, 
        error : function() 
		{
				$("#sktlp").css("display", "none"); $("#sktlp2").css("display", "none");
				$("#main_pet").html('<img src="img/pet_notfound.png" style="width:100%">');
				$("#meus_pets").html('<img src="img/pet_notfound.png"style="width:100%">');;
        }
	}); 
	
}

// FUNÇÃO PARA BUSCA DE UM PET 
function get_filtro_pet()
{  //	"use strict";	
	$("#botao_pet_mais").click();

	//app.controler_pull("pets_lista");
	var dado = "";
	var dados ="";
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');

	var busca_nome = $("#pets_nome_busca").val();
 	var buscar_por_nome = busca_nome.toUpperCase();
 	var busca_raca = $("#pets_raca_busca").val();
 	var buscar_por_raca = busca_raca.toUpperCase();
	var busca_cor = $("#pets_cor_busca").val();
 	var buscar_por_cor = busca_cor.toUpperCase();
	var busca_especie = $("#pets_especie_busca").val();

		$.ajax({
			type: 'POST',
            url:  localStorage.getItem('DOMINIO')+"appweb/pet_filtro.php",
			crossDomain: true,
			beforeSend : function() { $("#sktlp").css("display", "block"); $("#sktlp2").css("display", "block"); },
			complete   : function() { $("#sktlp").css("display", "none"); $("#sktlp2").css("display", "block"); },
            data       :{id_condominio :id_condominio,nome: buscar_por_nome, cor: buscar_por_cor, id_especie: busca_especie,raca: buscar_por_raca},
			dataType   : 'json',
			success: function(retorno){  
			$("#main_pet").html('');
			$("#meus_pets").html('');
			var cont = 0;
			for (var x in retorno) 
				{
				cont++;
   				if(retorno[x]['foto'] == ''){
				   var foto_pet = 'img/pet_semfoto.jpg';
				}
				else
				{
				   var foto_pet = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
				} // CARREGANDO OS CARDS DOS PET
				var titulo = ''+localStorage.getItem('ROTULO_LOTE')+' ' +retorno[x]['lote']+'  '+localStorage.getItem('ROTULO_QUADRA')+' :'+retorno[x]['desc_quadra']+'';
				titulo = limita_txt(titulo,20);

					
					dado = '<li class="item-content">'
							+	'<a href="/perfil_pet/"  onClick="carrega_pet(\''+retorno[x]['id_pet']+'\');"  data-transition="f7-push" class="" style="width: 100%">'
							+		'<div class="item-media">'
							+			'<img src="'+foto_pet+'" width="44"></div>'
							+		  '<div class="item-inner">'
							+			'<div class="item-title" style="margin-top: 5%"> '+retorno[x]['nome']+''
							+			'<p class="size-10"> '+titulo+'</p>'
							+		 ' </div>'
							+		'</div>'
			 				+	'</a>'
						    +'</li>'
					dados = dados + dado;
            }
				$("#main_pet").append(dados);
				$("#meus_pets").append(dados);
					
			if (cont == 0)
			{
					$("#main_pet").html('<img src="img/pet_notfound.png" style="width:100%">');
					$("#meus_pets").html('<img src="img/pet_notfound.png"style="width:100%">');			
			}
			},
		  error : function() 
			{
				

					if(buscar_por_nome == '' && buscar_por_raca == ''&& buscar_por_cor == '' )
					{
						 carrega_pets(0);	
					}
				else{
					//$("#botao_pet_mais").click();
					$("#main_pet").html('<img src="img/pet_notfound.png" style="width:100%">');
					$("#meus_pets").html('<img src="img/pet_notfound.png"style="width:100%">');
					
				}
			}	
			
			
		  });
}
//FUNÇÃO CARREGAR AS ESPECIES 
function especies_pet(){
	 $("#pets_nome_busca").val('');
 	 $("#pets_raca_busca").val('');
	 $("#pets_cor_busca").val('');
	 $("#pets_especie_busca").val('');	
	 $("#pets_especie").val('');	

	var dados = '';
	var dado  = '';
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/especie_pet_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : id_condominio, tipo:0 },
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) 
				{
					var dado = '<option value="'+retorno[x]['id_pet_especie']+'" > '+retorno[x]['descricao']+' </option> ';				
					dados = dados + dado;
				}			
			dados= '<option>Selecione ..</option>' + dados ;
			$("#pets_especie_cdr").html(dados);
			$("#pets_especie_busca").html(dados);		
		}
	});	
}


// TELA DE UPDATE DO PET 
function tela_editar_pet(id)
{	$("#nacimento_cdr").val('');
	//alert(id);
		var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	  $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_pet : id, id_condominio : id_condominio, tipo : '1'},
            dataType   : 'json',
            success: function(retorno)
			{ 	var x =0;
				if(retorno[x]['foto'] == ''){
				   var foto_pet = 'img/pet_semfoto.jpg';
				}
				else
				{
				   var foto_pet = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
				} 
				$("#id_pet").val(retorno[x]['id_pet']);
				$("#nome_cdr").val(retorno[x]['nome']);
				$("#titulo_pg").html('Editar Pet');			 
				$("#foto_cdr").html('<img src="'+foto_pet+'" width="44">');
				$("#obs_cdr").val(retorno[x]['observacao']);
				$("#raca_cdr").val(retorno[x]['raca']);
			 	$("#nacimento_cdr").val(retorno[x]['data_nascimento']);
				$("#cor_cdr").val(retorno[x]['cor']);
			 	$('#sexo_cdr option[value="' + retorno[x]['sexo'] +'"]').prop("selected", true);
			 		setTimeout(function()
					{ 
				 		$('#pets_especie_cdr option[value="' + retorno[x]['id_especie'] +'"]').prop("selected", true);
				 		$("#salvar_dados").attr('onClick','edit_pet()');  
						$("#link_back_pet").attr('onClick','carrega_pet('+retorno[x]['id_pet']+')');
			 
					},80);
			 
			 
			},
		  erro : function(retorno)
		  {
			  
		  }
	  });
}
// Editar o pet no bd 
function edit_pet()
{
	var unidade = localStorage.getItem('ID_UNIDADE');
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	
	var id_pet = $("#id_pet").val();
	var nome_pet = $("#nome_cdr").val();
	var id_especie =  $("#pets_especie_cdr").val();	
	
	var raca_pet =	$("#raca_cdr").val();
	var cor_pet = $("#cor_cdr").val();
	var sexo_pet = $("#sexo_cdr").val();
	var observacao = $("#obs_cdr").val();
	var data_nascimento = $("#nacimento_cdr").val();
	var foto_up_pet = $("#foto_cdr").val();

	$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_update.php',
			crossDomain: true,
			beforeSend : function() { $("#loader").css("display", "block"); },
			complete   : function() { $("#loader").css("display", "none"); },
            data       :{id_pet : id_pet, nome: nome_pet,id_especie: id_especie, cor: cor_pet, sexo: sexo_pet, id_unidade: unidade, id_condominio :id_condominio , raca: raca_pet,  observacao: observacao, foto_up_pet: foto_up_pet, data_nascimento: data_nascimento },
			success: function(retorno)
			 {
               
				 alertaDialog("Sucesso","Dados editado com sucesso!");
				//alert(id_pet);
				 
				 carrega_pet(id_pet);
				 $("#back_perfil").click();
			  //carrega_pets(0);
			 },
			erro: function(retorno)
			{
				alert('erro');
			}
		
		  });
}
// Função para inserir onclick no botão salvar na are\ de cadastro de pet
function adicionar_pet()
{	
	//alert ('dd');
	$("#link_back_pet").attr('href','/pet/');
	$("#back_perfil").attr('onClick','carrega_pets(0)');
	$("#salvar_dados").attr('onClick','pet_insert()');

}
// FUNCAO CARREGA UM PET ESPECIFICO 

function carrega_pet(id){
	//"use strict";
	$("#donos_pet").html('');
	var dados='';
	var dado='';
   	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
    var unidade = localStorage.getItem('ID_UNIDADE');
    if(id === 0)
		{
			//$("#form_pet #id_pet").val(id);
			//$("#form_pet #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
		}
	else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_pet : id, id_condominio : id_condominio, tipo : '1'},
            dataType   : 'json',
            success: function(retorno)
			{  
				var cont=0;
				var x =0; 
				
				
				if (retorno[x]['sexo'] == 1)
					{
						var sexo = 'Fêmea';
					}
				else
					{
						var sexo = 'Macho';
					}
				
					if(retorno[x]['foto'] == '')
					{
						var foto_pet = 'img/pet_foto_perfil.png';
					}
					else
					{
						var foto_pet = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
					}
			
					var titulo = ''+localStorage.getItem('ROTULO_LOTE')+'' +retorno[x]['lote']+'   '+localStorage.getItem('ROTULO_QUADRA')+' : '+retorno[x]['desc_quadra']+'';
					titulo = limita_txt(titulo,100);		
               
				$("#foto_perfil_pet").attr("src",foto_pet);
				$("#nome_perfil_pet").html(retorno[x]['nome']);
				$("#unidade_perfil_pet").html(titulo);
				$("#espc_perfil").html(retorno[x]['especie']);
				$("#obs_perfil_pet").html(retorno[x]['observacao']);
				$("#raca_perfil_pet").html(retorno[x]['raca']);
				$("#cor_perfil_pet").html(retorno[x]['cor']);
				$("#data_perfil_pet").html(retorno[x]['nacimento']);
				$("#tel_perfil_pet").html(retorno[x]['telefone']);
				$("#sexo_perfil_pet").html(sexo);
				
				$("#vacinacao").attr('onClick','select_vacinas('+retorno[x]['id_pet']+','+unidade+');');
				var id_unidade = retorno[x]['id_unidade'];
				if(unidade == id_unidade )
					{
						$("#editar_meu_pet").attr('href','/pet_cadastro/');
						$("#editar_meu_pet").attr('onClick','tela_editar_pet('+retorno[x]['id_pet']+'); especies_pet()');
						
						$("#botao_vacina").html('<a class="col button button-fill color-green" href="/vacinacao/" onClick="cadastro_vacinas('+retorno[x]['id_pet']+')" >Adicionar</a>');
						
						
					}
				else{
					
						$("#editar_meu_pet").attr('href','#');
						$("#editar_meu_pet").attr('onClick','');
						$("#editar_meu_pet").attr('style','display:none');
						$("#editr_m").attr('style','display:none');
					
				}
				
		   $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/morador_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_unidade : id_unidade, id_condominio : id_condominio},
            dataType   : 'json',
            success: function(retorno)
			{  //alert(retorno);
				var cont=0;
				for (x in retorno) 
				{ 
				var id_unidade = retorno[x]['unidade'];
			
				if(unidade == id_unidade)
					{
						
					
					var edt ='<div class="right" >'
						+ '<a class="link color-theme-red size-10"  href="/perfil_editar/"> <i class="f7-icons" style="color:red" 								     >pencil_circle</i> Editar </a>'
						+'</div>';				 				 
						}
					else{
						var edt ='';
					}
					
					if(retorno[x]['foto'] == ''){
					   var foto_moador = 'img/avatar.png';
					}
					else
					{
					   var foto_moador = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
					}
					
				 cont ++;
				 dado = '<li class="accordion-item">'
						+	 '<a href="#" class="item-content item-link">'
						+		'<div class="item-media">'
						+			'<div class="item-media">'
						+				'<img src="'+foto_moador+'" width="40">'
						+			'</div>'
						+		'</div>'
						+		'<div class="item-inner">'
						+		  '<div class="item-title">'
						+			  ''+retorno[x]['nome']+' '
						+			'<p class="size-10">'+retorno[x]['descricao']+' </p>'
						+		  '</div>'
						+		'</div>'
						+	 '</a>'
						+	 '<div class="accordion-item-content">'
						+	  '<div class="block" style="margin-bottom: 5%">'
						+		'<div class="navbar">'
						+			'<div class="navbar-inner">'
						+				'<div class="left">'
						+					'<a class="link color-theme-green size-10" href="/chat1/" data-transition="f7-circle">'
						+						'<i class="f7-icons" style="color:green" >chat_bubble_text</i>  Conversar  </a>'
						+				'</div>'
						+				'<div class="center">'
						+					'<a class="link color-theme-blue size-10" href="/perfil/" > <i class="f7-icons" style="color:blue" 											>person_crop_circle_badge_exclam </i>  Perfil  </a>'
						+				'</div>'
					 	+				edt
						+			'</div>'
						+		'</div>'
						+	'</div>'
						+ '</div>'
						+'</li>';
					  dados = dados + dado;
				}
			
				$("#donos_pet").html(dados);
			
			
			},
            error: function() 
			{

            }
        });
	
           },
            error: function() 
			{

            }
        });
    }
	
  
}
/*
function getEspecie_editar(id_espec){
	//alert(id_espec +'id');
	var dados = '';
	var dado  = '';
	var inicio_select = '<select class="item-input-wrap" style="width: 100%;height: 34px;border: 0.5px solid #a4a4a4; padding: 7px;background:white;" name="id_espec" id="id_espec">';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/especie_pet_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno)
		{
            for (var x in retorno) 
			{
				var espc = retorno[x]['id_pet_especie'];
				//alert(espc);
				if (retorno[x]['id_pet_especie'] == id_espec){
                	var dado = '<option value="'+retorno[x]['id_pet_especie']+'" selected> '+retorno[x]['descricao']+' </option> ';
					//alert(dado);
				}else{
					var dado = '<option value="'+retorno[x]['id_pet_especie']+'" > '+retorno[x]['descricao']+' </option> ';
					//alert('erro sem id especie');
				}
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
			$("#form_pet_update #div_especie" ).html(dados);
		}
	});	
}



*/
//*****************EXCLUIR PET BY DAVID 13/02/2019
function excluir_pet(){
	"use strict";
	//Pegando informações do pet
	var id_pet = $("#form_pet #id_pet").html();
	var id_con = $( "#DADOS #ID_CONDOMINIO" ).val();
	//var del = confirm("Tem Certeza que deseja excluir?");
	app2.dialog.confirm('Tem Certeza que deseja excluir?','PET', function () {
	//if (del ===true)
//	{
//	 
	$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_delete.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       :{id_pet : id_pet,id_condominio : id_con},
			success: function(retorno)
			{    setTimeout(carrega_pets(0),300);
			 	 setTimeout(carrega_pets(5),300);
				 
			 	alerta("","Pet excluido com sucesso.");
				afed('#pet_lista','','');
				afed('','#pet_add','','#pet_lista');
				afed('','#pet','','');
				afed('','#update_pet','','');
				
				
				
				//$("#pet_lista #meus_pets").click();
			}
		 })	
	}//else{
//	  
//	}
)}
 
// CADASTRAR NOVO PET BY DAVID 13/02/2019
function pet_insert(){
	//"use strict";
	//alert('d');
	
	var foto_up_pet = $("#foto_cdr").val();
	//alert(foto_up_pet);
	var unidade = localStorage.getItem('ID_UNIDADE');
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	
	
	//alert(foto_up_pet);
	//alert('aqui');
	var nome_pet = $("#nome_cdr").val();
	//alert(nome_pet);
	var especie_pet =  $("#pets_especie_cdr").val();	
	//alert(especie_pet);
	var raca_pet = $("#raca_cdr").val();
	//alert(raca_pet);
	var cor_pet = $("#cor_cdr").val();
	//alert(cor_pet);
	var sexo = $("#sexo_cdr").val();
	//alert(sexo);
	var observacao = $("#obs_cdr").val();
	//alert(observacao);
	var data_nc = $("#nacimento_cdr").val();
	if(nome_pet == ''){
		alertaDialog(""," Informe o nome de seu pet !");
	
	}else if(especie_pet == '0'){
		alertaDialog("","Iforme a espécie de seu pet!");
		
		
	}else if(raca_pet == ''){
		alertaDialog("","Descreva a raça de seu pet!");
		
	}else if(cor_pet == ''){
		alertaDialog("","Defina a cor de seu Pet!");
		
		
	}else if(sexo == "")
     {	alertaDialog("Erro","Selecione o Sexo do pet !");
		 
	 }else if(data_nc == "")
     {	alertaDialog("Erro","Informe a data de nascimento de seu Pet !");
		 
	 }
	else{
		var dados = $( "#form_pet_add" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_insert.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			//data: dados,
           data       :{nome: nome_pet,id_especie: especie_pet, cor: cor_pet, sexo: sexo, id_unidade: unidade, id_condominio : id_condominio,  raca: raca_pet,  observacao: observacao, foto_up_pet: foto_up_pet, data_nascimento : data_nc},
			success: function(retorno)
			{
				
                 carrega_pets(0);
				 alertaDialog("Sucesso","Pet cadastrado com sucesso!");
				 $("#back_perfil").click();
				 $("#link_back_pet").click();
				 
			},
			erro: function(retorno)
			{
			alertaDialog("Erro","Ops! nõa foi possível cadastrar, tente novamente mais tarde !");	
			}
		});
		
	}
}

 function foto_pet_edicao()
{
	
       navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
        });

        function onSuccess(imageURI) { 
           
			
			$( '#foto_cdr' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_cdr' ).html('<img src="'+foto_pet+'" width="40">');
		
			
        }
        function onFail(message) {
           alertaDialog("","Nenhuma imagem carregada !");
        }    
}

 function   foto_pet_galaria() 
{
       
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		   	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        

        function onSuccess(imageURI) { 
           
			
			$( '#foto_cdr' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_cdr' ).html('<img src="'+foto_pet+'" width="40">');
			
			
        }
        function onFail(message) {
            alertaDialog("","Nenhuma imagem carregada !");
        }    
}


 function foto_vacina1()
{
	
       navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
        });

        function onSuccess(imageURI) { 
           
			
			$( '#foto_vacina1' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_vacina1' ).html('<img src="'+foto_pet+'" width="40">');
		
			
        }
        function onFail(message) {
           alertaDialog("","Nenhuma imagem carregada !");
        }    
}

 function  foto_galaria_vacina1() 
{
       
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		   	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        

        function onSuccess(imageURI) { 
           
			
			$( '#foto_vacina1' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_vacina1' ).html('<img src="'+foto_pet+'" width="40">');
			
			
        }
        function onFail(message) {
            alertaDialog("","Nenhuma imagem carregada !");
        }    
}


 function foto_vacina2()
{
	
       navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
        });

        function onSuccess(imageURI) { 
           
			
			$( '#foto_vacina2' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_vacina2' ).html('<img src="'+foto_pet+'" width="40">');
		
			
        }
        function onFail(message) {
           alertaDialog("","Nenhuma imagem carregada !");
        }    
}

 function   foto_galaria_vacina2() 
{
       
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		   	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        

        function onSuccess(imageURI) { 
           
			
			$( '#foto_vacina2' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_vacina2' ).html('<img src="'+foto_pet+'" width="40">');
			
			
        }
        function onFail(message) {
            alertaDialog("","Nenhuma imagem carregada !");
        }    
}


 function foto_vacina3()
{
	
       navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
        });

        function onSuccess(imageURI) { 
           
			
			$( '#foto_vacina3' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_vacina3' ).html('<img src="'+foto_pet+'" width="40">');
		
			
        }
        function onFail(message) {
           alertaDialog("","Nenhuma imagem carregada !");
        }    
}

 function  foto_galaria_vacina3()  
{
       
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		   	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        

        function onSuccess(imageURI) { 
           
			
			$( '#foto_vacina3' ).val(imageURI);
			
			var foto_pet = 'data:image/jpeg;base64,'+imageURI+'';
			

	$( '#foto_vacina3' ).html('<img src="'+foto_pet+'" width="40">');
			
			
        }
        function onFail(message) {
            alertaDialog("","Nenhuma imagem carregada !");
        }    
}



//Função abrir  cadatro de vacina
function cadastro_vacinas(id_pet)
{
 //$("#id_pet_vacina").val(id_pet);
 $("#fechar_mp").click();

localStorage.setItem('ID_PET_VACINA',id_pet);	
}
function salvar_vacinas()
{
	

 
	var id_pet = localStorage.getItem('ID_PET_VACINA');
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var vacina1 =$("#vacina1").val();
	var data1 = $("#data_vacina1").val();
	var foto1 = $( '#foto_vacina1' ).val();
	
	var vacina2 =$("#vacina2").val();
	var data2 = $("#data_vacina2").val();
	var foto2 = $( '#foto_vacina2' ).val();
	
	var vacina3 =$("#vacina3").val();
	var data3 = $("#data_vacina3").val();
	var foto3 = $( '#foto_vacina3' ).val();
	//alert(id_pet);
	$.ajax({
		type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/vacina_pet.php',
	 	crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
		data       :{vacina1: vacina1, data1 : data1, foto1:foto1,vacina2: vacina2, data2 : data2, foto2:foto2,vacina3: vacina3, data3 : data3, foto3:foto3,id_condominio: id_condominio, id_pet :id_pet,op:1},
		success: function(retorno)
			{
				
				alertaDialog("","Dados cadastrados com sucesso!");
				carrega_pet(id_pet);
				$("#link_back_vacina").click();
				
			},
		erro: function(retorno)
			{
				alertaDialog("","Ops!, Tente novamente mais tarde!");
				carrega_pet(id_pet);
				$("#link_back_vacina").click();
				
				
			}
		
	});
	
}
function select_vacinas(id,unidade)
{	//alert(id);
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var id_unidade = localStorage.getItem('ID_UNIDADE');
				$("#data_vcn1").html('aa');
				$("#data_vcn2").html('');
				$("#data_vcn3").html('');
				
				$("#nome_vcn1").html('aa');
				$("#nome_vcn2").html('');
				$("#nome_vcn3").html('');
	
	$.ajax({
		type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/vacina_pet.php',
	 	crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
		data       :{id_condominio: id_condominio, id_pet :id,op:2},
		dataType   : 'json',
		success: function(retorno)
			{// alert(retorno);
			 	
			
				
				 for (var x in retorno){
					 
					 
					 
					 
				//var id_p = retorno[x]['id'];
			
				   var  foto_vcn1 = 'data:image/jpeg;base64,'+retorno[x]['foto1']+'';
				   var  foto_vcn2 = 'data:image/jpeg;base64,'+retorno[x]['foto2']+'';
				   var  foto_vcn3 = 'data:image/jpeg;base64,'+retorno[x]['foto3']+'';
			 
				$("#data_vcn1").html('Data: '+retorno[x]['data1']);
				$("#data_vcn2").html('Data: '+retorno[x]['data2']);
				$("#data_vcn3").html('Data: '+retorno[x]['data3']);
				
				$("#nome_vcn1").html('Vacina: '+retorno[x]['vacina1']);
				$("#nome_vcn2").html('Vacina: '+retorno[x]['vacina2']);
				$("#nome_vcn3").html('Vacina: '+retorno[x]['vacina3']);
				
						
				$("#foto_vcn1").attr("src",foto_vcn1);
				$("#foto_vcn2").attr("src",foto_vcn2);
				$("#foto_vcn3").attr("src",foto_vcn3);
					 
				if(retorno[x]['id'] >0 )
					{
						if(unidade = id_unidade)
							{
								$("#botao_vacina").html('<a class="col button button-fill color-red" href="/vacinacao/" onClick="editar_vcn('+retorno[x]['id_pet']+')" >Editar</a>');	
							}	
					}
				
			}
				
			},
		erro: function(retorno)
			{
				alert('retorno');
				
				
				
			}
	});
	
	
	
	
	
}
function editar_vcn(id)
{
	alert(id);
					
	
	
	
	
	
	
	
	
	var id_pet = id;
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	$.ajax({
		type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/vacina_pet.php',
	 	crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
		data       :{id_condominio: id_condominio, id_pet :id,op:2},
		dataType   : 'json',
		success: function(retorno)
			{  //alert(retorno);
			 	
			
				
				 for (var x in retorno){
					 alert(retorno[x]['data1']);
					 //nome das vacinas 
					 $("#vacina1").attr('value',retorno[x]['vacina1']);
					 $("#vacina2").attr('value',retorno[x]['vacina2']);
					 $("#vacina3").attr('value',retorno[x]['vacina3']);
					 //data de vacinação

					 $("#data_vacina1").attr('value',retorno[x]['data11']);
					 $("#data_vacina2").attr('value',retorno[x]['data22']);
					 $("#data_vacina3").attr('value',retorno[x]['data33']);
					 
					 // fotos
				
					
				   var  foto_vcn1 = 'data:image/jpeg;base64,'+retorno[x]['foto1']+'';
				   var  foto_vcn2 = 'data:image/jpeg;base64,'+retorno[x]['foto2']+'';
				   var  foto_vcn3 = 'data:image/jpeg;base64,'+retorno[x]['foto3']+''; 
					 
					 if(retorno[x]['foto1'] != '')
						 {
							$( '#foto_vacina1' ).html('<img src="'+foto_vcn1+'" width="40">'); 
						 }
					 if(retorno[x]['foto2'] != '')
						 {
							$( '#foto_vacina2' ).html('<img src="'+foto_vcn2+'" width="40">'); 
						 }
					 if(retorno[x]['foto3'] != '')
						 {
							$( '#foto_vacina3' ).html('<img src="'+foto_vcn3+'" width="40">'); 
						 }
					 
					 
					 
				 }
			}
					 
	
	
});
}

