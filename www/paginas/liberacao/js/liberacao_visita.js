//FUNCAO CARREGA LIBERACOES TODAS

goToLiberacao = () => {
	console.log("pagina liberacao");
	app.views.main.router.navigate("/liberacao/", {animate:true});
	$$(document).on('page:init', '.page[data-name="PgLiberacao"]', function (e) {
		carrega_liberacao();
	}); 
}

goBack = () => {
	console.log("sair da pagina validacao");
	app.views.main.router.navigate("/home/", {animate:true});
}

function define_hora(valor){
	
	var formata_h  = valor.substr(0,2);
	var hora       = "";

	if(formata_h.indexOf(":") >=0){
	   hora = "0"+valor;						
	}else{
	   hora = valor;
	}

	return hora;
	
}

function carregar_todos_selects()
{ //$("#motivos_de_visita").html(' <option value="banana">Banana</option>');
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
 	 var cont=0;
 	 var todo_motivos="";
	$.ajax({
			type:'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/liberacao_get.php',
			data:{id_condominio: id_condominio,busca_motivo: 1},
		   dataType   : 'json',
			success: function(retorno)
			{   
		//alert(retorno);
				for (x in retorno) {
					cont++;
						// var motivo ="dddd"; 
						
                        var motivo = '<option class="link back" value="'+retorno[x]['id_motivo']+'">'+retorno[x]['motivo']+'</option>';
                  	
                    todo_motivos = todo_motivos + motivo;
                }
				var selecione = '<option >Selecione..</option>';
				todo_motivos = selecione+todo_motivos;
				$("#motivos_de_visita").html(todo_motivos);
				
			},
		error: function(retorno)
		{
			alert(retorno+'aa');
		}
	})
	
setTimeout(function(){
		var crdito = localStorage.getItem('QTD_CREDITO');
	var qtd_cred = "";
	
	if(crdito == 0)
	{	var qtd_max = 9;
		qtd_cred += '<option class="link back" value="0">Ilimitado</option>';			
	}else{
		 var qtd_max = crdito;
		
	   	 }
		for (var i = 1; i <= qtd_max; i++)
		{	var selecione = '<option >Selecione..</option>';
		 	qtd_cred ='<option class="link back" value="'+i+'">'+i+'</option>';
		 qtd_cred =selecione + qtd_cred;
		
		}
		 $("#qtd_credito_slc").html(qtd_cred);
	
	atualiza_veiculo(0,1,'');
},100);

	
}
///SELECIONAR QUANTIDADE DE CREDITO
function selecionar_credito()
{
	//alert('dd');

	var valor = $("#qtd_credito_slc option:selected").val();
	
	$("#qtd_credito_qr").attr('value',''+valor+'');
	
	

	$(".left .icon.icon-back").attr('id','slc_creditos_visita');


	$("#slc_creditos_visita").click();
	
}
// SELECIONAR MOTIVO DA VISITA
function selecionar_motivo()
{
	//alert('dd');

	var valor = $("#motivos_de_visita option:selected").val();
	
	$("#motivo_vst").attr('value',''+valor+'');
	
	

	$(".left .icon.icon-back").attr('id','slc_motivo_visita');


	$("#slc_motivo_visita").click();
	
}

function carrega_liberacao(){
	$("#retorno_liberacao").html('');
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var id_morador = localStorage.getItem('ID_MORADOR');

	var cont =0;
    var dados = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/liberacao_get.php',
        data       : {id_condominio : id_condominio ,id_morador : id_morador,op:1},
       // dataType   : 'json',
		crossDomain: true,
		//beforeSend : function() { $("#wait").css("display", "block"); },
		//complete   : function() { $("#wait").css("display", "none"); },
		success: function(retorno){ 
			//alert('retorno');
			  for (x in retorno) {
				cont++;
                var credito = '';
                if(retorno[x]['numero_acesso_perm'] != null){
                    if(retorno[x]['numero_acesso_perm'] == 0){
                        credito = 'Créditos Ilimitados';
                    }else{
                        credito = 'Créditos Usados: '+retorno[x]['numero_acesso']+' de '+retorno[x]['numero_acesso_perm'];
                    }
                }
                var bt_convite = '';
				if(retorno[x]['valido']==1){

                    if(retorno[x]['numero_acesso_perm'] != null){
						//$("#enviar_qr").attr('onClick','gera_qrcode(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\')');
					   bt_convite ='<a href="#" id="enviar_qr" style="color:green"  onClick="gera_qrcode(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\')" class="link sheet-open"  data-sheet=".my-sheet"><i class="f7-icons" style="color:green">qrcode</i> Enviar</a>';
						   
						  // '<button type="button" class="col button button-fill color-orange">Reenviar Convite</button>';
                    }else{
						 bt_convite ='<a href="#"  " id="enviar_qr" style="color:orange"  onClick="gera_qrcode(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\')" class="link"><i class="f7-icons" style="color:orange">qrcode</i>Reenviar</a>';
						
						
					  // bt_convite = '<button type="button" onClick="gera_qrcode(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\')" class="col button button-fill color-green">Enviar Convite</button>';
                    }
				}else{
					  bt_convite ='<a href="#" class="link " id="enviar_qr" style="color:red" ><i class="f7-icons" style="color:red">qrcode</i> Vencido</a>';
				}
				  
				  
                var foto  = '';

				
                      if(retorno[x]['foto'].length>0){
                    foto = '<img src="data:image/jpeg;base64,'+retorno[x]['foto']+'" width="34" height="34"/>';
                }else
					{
					foto = '<img src="img/avatar.png" width="34" height="34"/>'	
					}
				  
				  dados = '<div class="card demo-facebook-card">'
		  	 + '<div class="card-header">'
				
						+' <div class="item-media">'+foto+''
						+ '</div>'
					
					 +'  <div class="item-inner">'
					   + ' <div class="size-15">'+retorno[x]['nome']+''	
					  +   '</div>'
					+'  </div>'
		  	 +' </div>'
		  	  +'<div class="card-content card-content-padding">'
				  +'<div class="card-content card-content-padding">'
				    +'<div class="item-subtitle" style="color:gray;font-size:12px;"><b class="size-15" >Validade</b>: '+retorno[x]['validadeInicio']+' á '+retorno[x]['validadeFim']+'</div>'
				  		  +'<div class="item-subtitle" style="color:gray"><b >Crédito</b>:  '+credito+' </div>'
				  		  +'<div class="item-subtitle" style="color:gray"><b >Motivo</b>:   '+retorno[x]['motivo']+' </div>'  
			+	'<div class="card-footer" >'
				+'<a href="#" class="link left">Alterar</a>'+bt_convite+' '
				

			+	'</div>'
		  +	 ' </div> '  
		  +'  </div>'
				  
               	$( "#retorno_liberacao" ).append(dados);
          }
     
		
		
           
		},
        error   : function(retorno) {
           alert('Erro ao carregar liberacao');
           alert(retorno);
			
        }
	});
}

function carrega_liberacao2(tipo,id_visita=0){
    //alert('teste');
	app.controler_pull("liberacao2");
	if(tipo ==4){
		$("#busca_liberacao2").val("");
	}
    if(tipo == 0 || tipo==3 || tipo==4){
        var pg = 1;
        var offset = 0;
    }else{
        //var offset = $("#retorno_liberacao").find(".liberado").size();
        var offset = $(".liberado2-card").length;
        if(offset != 0){
            var pg = (offset/5)+1;
        }else{
            var pg = 1
        }
		if(parseInt(pg) != parseFloat(pg)) { 
			pg = pg+1; 
		}
	}
    var dados = '';
	var check = '';
    //alert($( "#busca_liberacao2" ).val());
	$.ajax({
		type: 'POST',
		//url: localStorage.getItem('DOMINIO')+"appweb/liberacao_get.php",
		url: localStorage.getItem('DOMINIO')+'appweb/liberacao2_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_morador : $( "#DADOS #ID_MORADOR" ).val(),pg : parseInt(pg), nome : $( "#busca_liberacao2" ).val(), id_visita : id_visita},
        dataType   : 'json',
		success: function(retorno){
			var icone = "";
            for (x in retorno) {
				if(retorno[x]['check_acesso'].indexOf("QR Code") >=0){
					check = "Acesso por QR Code";
			    }else{
					check = "Liberado Pela Portaria";
				}
				if(retorno[x]['foto'] == ''){
					icone = "<span style='font-size: 2em;color: #b9b9b9;' class='fa fa-user-circle'></span>";
				}else{
					icone = "";
				}
				
                var dado =  '<div class="card liberacao2-card liberado2-card" onclick="sheet_modulo(\'visita\',\''+retorno[x]['foto']+'||'+retorno[x]['foto_entrada']+'||'+retorno[x]['nome']+'||'+retorno[x]['dt_entrada']+'||'+retorno[x]['dt_saida']+'||'+retorno[x]['periodo']+'||'+retorno[x]['foto_saida']+retorno[x]['motivo']+'||'+check+'||'+retorno[x]['morador']+'\')">'+
                                '<div class="card-header">'+
                                    '<div class="liberacao2-avatar" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+')">'+icone+'</div>'+
                                    '<div class="liberacao2-name">'+retorno[x]['nome']+'</div>'+
                                    '<div class="liberacao2-date">'+retorno[x]['motivo']+'</div>'+
                                '</div>'+
                                '<div class="card-content card-content-padding">Entrada: '+retorno[x]['dt_entrada']+'<br>Saida: '+retorno[x]['dt_saida']+'</div>'+
                            '</div>';
                dados = dados + dado;
            }
			dados = '<div class="main">'+dados+'</div>';
			if(tipo == 0 || tipo==3 || tipo==4){
				$("#retorno_liberacao2").html("");
			}
			$( "#retorno_liberacao2" ).append(dados);
			$("#wait").css("display", "none");
		},
        error   : function() {
            //alert('Erro ao carregar liberacao 2');
			$("#wait").css("display", "none");
        }
	});
    localStorage.setItem('TELA_ATUAL','liberacao_list2');
}

//FUNCAO CRREGA LIBERACAO PRA EDITAR
function carrega_liberacao_visita(visita,tipo){
	var cont = 0;
	
var id_condominio = localStorage.getItem('ID_CONDOMINIO');
var id_morador = localStorage.getItem('ID_MORADOR');

	if(tipo == 0){
		
	}else{
    var todo_motivos ='';
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/liberacao_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_condominio : id_condominio,id_morador : id_morador,id_liberacao : visita},
            dataType   : 'json',
            success: function(retorno){
                var motivos = retorno[0]['motivos'];
                //alert(motivos)
                for (x in motivos) {
					cont++;
                    if(motivos[x]['motivo'] == retorno[0]['motivo']){
                        var motivo = '<option selected value="'+motivos[x]['id']+'">'+motivos[x]['motivo']+'</option>';
                    }else{
                        var motivo = '<option value="'+motivos[x]['id']+'">'+motivos[x]['motivo']+'</option>';
                    }
                    todo_motivos = todo_motivos + motivo;
                }
				var qtd_cred = '';
				if(localStorage.getItem('QTD_CREDITO') == 0){
					var qtd_max = 9;
					qtd_cred += '<option value="0">Ilimitado</option>';			
				}else{
					var qtd_max = localStorage.getItem('QTD_CREDITO')
				}
				for (i = 1; i <= qtd_max; i++) {
					qtd_cred += '<option value="'+i+'">'+i+'</option>';
				}

				$( "#add_liberacao #numero_acesso_perm" ).html(qtd_cred);

				//console.log(retorno[0]['placa']);
				$( "#new_visit" ).attr('onClick',"");
                $( "#add_liberacao #visita_motivo" ).html(todo_motivos);
                $( "#add_liberacao #id" ).val(retorno[0]['id']);
                $( "#add_liberacao #tipo" ).val(tipo);
                $( "#add_liberacao #nome" ).val(retorno[0]['nome']);
                $( "#add_liberacao #rg" ).val(retorno[0]['rg']);
                var dt_de = retorno[0]['validadeInicio'].split(' ');
                $( "#add_liberacao #dt_de" ).val(dt_de[0]);
                $( "#add_liberacao #hr_de" ).val(dt_de[1]);
                var dt_ate = retorno[0]['validadeFim'].split(' ');
                $( "#add_liberacao #dt_ate" ).val(dt_ate[0]);
                $( "#add_liberacao #hr_ate" ).val(dt_ate[1]);
                $( "#add_liberacao #visita" ).val(retorno[0]['visitante']);
                if(retorno[0]['numero_acesso_perm'] == null){ retorno[0]['numero_acesso_perm'] = 0;}
                $( "#add_liberacao #numero_acesso_perm" ).val(retorno[0]['numero_acesso_perm']);
				if(retorno[0]['placa'] == "-"){
				   var placa_lib = "";
				}else{
				   var placa_lib = retorno[0]['placa'];
				}
				$( "#add_liberacao #liberacao_placa" ).val(placa_lib);
				get_veiculo(placa_lib);
				closePopUp();
                afed('#liberacao2,#del_lib','#home,#liberacao3','','',3,'liberacao_add');
          		
						if(cont == 0){
		var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
		+"</div>";
							
		
        $("#retorno_liberacao").append(sem_reg);
		
										
	}
            },
            error      : function() {
                //alert('Erro ao carregar liberacao');
				$("#wait").css("display", "none");
            }
        });
		

		
    }
}



//FUNCAO ABRE FORM E LIMPA DADOS LIBERACAO
function adiciona_liberacao(){
	//processando(1);
    var motivos = '';
	$("#more_information").css({"display":"none"});
	$("#collapse_more").css({"display":"block"});
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/motivo_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
        success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                //alert(retorno[x]['id']);
                var motivo = '<option value="'+retorno[x]['id']+'">'+retorno[x]['motivo']+'</option>';
                motivos = motivos + motivo;
            };
			var qtd_cred = '';
			if(localStorage.getItem('QTD_CREDITO') == 0){
				var qtd_max = 9;
				qtd_cred += '<option value="0">Ilimitado</option>';			
			}else{
				var qtd_max = localStorage.getItem('QTD_CREDITO')
			}
			for (i = 1; i <= qtd_max; i++) {
				qtd_cred += '<option value="'+i+'">'+i+'</option>';
			}

            //alert(motivos);
            $( "#add_liberacao #visita_motivo" ).html(motivos);
            $( "#add_liberacao #numero_acesso_perm" ).html(qtd_cred);
            //localStorage.setItem('TELA_ATUAL','visitantes');
        },
        error      : function() {
            //alert('Erro ao carregar motivos');
			$("#wait").css("display", "none");
        }
    });
    
    var dt_atual_1 = new Date();
    var dt_atual_2 = new Date();
    var dt_atual_1 = new Date();
    var dt_atual_2 = new Date();
    
	var dt_1       = app.getFormattedDate(dt_atual_1);
    dt_atual_2.setDate(dt_atual_2.getDate()+1);
    var dt_2 	   = app.getFormattedDate(dt_atual_2);
	var hora = define_hora(dt_atual_1.getHours()+":"+dt_atual_1.getMinutes());
    //alert(hora);
    //alert(dt_2);
	$("#new_visit").attr('onClick',"afed('#visitantes','#liberacao2','','','2', 'visitantes' ); $('#visitante_busca').val('');$('#retorno_visita').html('');$('#visitante_busca').focus()");
	
	$( "#add_liberacao #id" ).val('0');
	$( "#add_liberacao #tipo" ).val('0');
	$( "#add_liberacao #nome" ).val(' ');
	$( "#add_liberacao #rg" ).val(' ');
    //alert(dt_1);
	$( "#add_liberacao #dt_de" ).val(dt_1);
	$( "#add_liberacao #hr_de" ).val(hora);
	$( "#add_liberacao #dt_ate" ).val(dt_2);
	$( "#add_liberacao #hr_ate" ).val(hora);
	$( "#add_liberacao #visita" ).val('0');
    $( "#add_liberacao #numero_acesso_permc" ).val('0');
	$("#numero_acesso_perm").val(0).change();
	$("#add_liberacao #id_veiculo").val("");
	$("#libMarca").hide();
    $("#libModelo").hide();
    $("#libCor").hide();
	$("#cad_veiculo_ok").hide();
    
	afed('#liberacao2','#home,#del_lib','','',3,'liberacao_add');
    //localStorage.setItem('TELA_ATUAL','liberacao_add');
	$("#new_visit").click();
	
}

//FUNCAO ADICIONA LIBERACAO
function salva_liberacao(){
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var id_morador = localStorage.getItem('ID_MORADOR');
	var msg = '';
	if($( "#add_liberacao #visita" ).val() == 0 || $( "#add_liberacao #dt_de" ).val() == '' || $( "#add_liberacao #hr_de" ).val() == '' || $( "#add_liberacao #dt_ate" ).val() == '' || $( "#add_liberacao #hr_ate" ).val() == ''){
		notifica('Preencha o campo/Preencha todos os campos/Ok',1000,0);
	}else{
		
		var visivel  = $('#cad_veiculo').is(':visible');
		if (visivel){
			alerta('','Cadastre esse veiculo para continuar!');
		}else{
			var dt_atual = new Date();
			dt_atual.setMinutes(dt_atual.getMinutes()-30);
			var dt_de = new Date($('#add_liberacao #dt_de').val()+ " "+$('#add_liberacao #hr_de').val() );
			var dt_ate = new Date($('#add_liberacao #dt_ate').val()+ " "+$('#add_liberacao #hr_ate').val() );
			var dt_limite = new Date(dt_de.getFullYear(),dt_de.getMonth(),dt_de.getDate(),23,59,59,0);
			
			if(localStorage.getItem('PERIODO_MAX') == 0){
				dt_limite.setDate(dt_limite.getDate() + 1460);
			}else{
				dt_limite.setDate(dt_limite.getDate() + (localStorage.getItem('PERIODO_MAX') - 1));
			}
			//alert(dt_limite);											 
			var tipo = $('#add_liberacao #tipo').val();

			if(dt_de < dt_atual && tipo != 1){
			   alerta('Data Inválida/Data INICIAL não pode ser inferior a data atual/Ok',0,0);
			}else if(dt_ate < dt_atual){
			   alerta('Data Inválida/Data FINAL não pode ser inferior a data atual/Ok',0,0);
			}else if(dt_ate <= dt_de){
			   alerta('Data Inválida/Data FINAL não pode ser inferior a data INICIAL/Ok',0,0);
			}else if(dt_ate > dt_limite ){
			   alerta('Data Inválida/Data FINAL não pode ser superior a '+dt_limite.getDate()+'-'+(dt_limite.getMonth()+1)+'-'+dt_limite.getFullYear()+' '+dt_limite.getHours()+':'+dt_limite.getMinutes()+'/Ok',0,0);
			}else{
				var dados = $( "#add_liberacao" ).serialize();

				$.ajax({
					type: 'POST',
					url: localStorage.getItem('DOMINIO')+'appweb/liberacao_insert.php',
					crossDomain: true,
					beforeSend : function() { $("#wait").css("display", "block"); },
					complete   : function() { $("#wait").css("display", "none"); },
					data       : dados+'&id_condominio='+id_condominio+'&id_morador='+id_morador,
					success: function(retorno){
							//alert(retorno);
							carrega_liberacao(0);
							openPopUp();
							afed('#home','#liberacao2','','',3,'liberacao_list');
					},
					error      : function() {
						//alert('Erro ao carregar liberacao');
						$("#wait").css("display", "none");
					}
				});           
			}
		} 
        
        
	}
}

function gera_qrcode(qrcode_numero,nome){
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var conde_nome = localStorage.getItem('CONDOMINIO');
	
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/qrcode_insert.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : id_condominio,id_autorizacao_visita : qrcode_numero},
        dataType   : 'json',
        success: function(retorno){
			
	            $('#qrcodeCanvas').html('');
            jQuery('#qrcodeCanvas').qrcode({
                text	: retorno[0]['code'],
                quiet   : 2,
                ecLevel: 'L',
                radius: 0.5
            });
         
            var dados_qr = 'Olá '+nome+', <br>essa é sua autorização para acessar o <br>condomínio '+conde_nome+' <br>no período de '+retorno[0]['data_inicio']+' a '+retorno[0]['data_validade']+'';
       
            $('#qr_dados').html(dados_qr);
			

        },
        error      : function() {
            
			$("#wait").css("display", "none");
        }
    });
   
}



function preview(){
	
	//$("#enviar_qr").attr('style','display:none');
  var element = document.querySelector("#printscr_qrcode"); // global variable
    var getCanvas; // global variable
	$("#resultado_qr").html("");
	//alert(element);
    html2canvas(element, {
		
        onrendered: function (canvas) {
            $("#resultado_qr").html(canvas);
            var dataURL = canvas.toDataURL();
           $("#url_qr").val(dataURL); 
            localStorage.setItem("resultado_qr", dataURL);
        }
    }); 
	$("#printscr_qrcode").hide();
	
	
	$("#download").show();
	$("#whatsp").show();
	
}



function download_qrcode(){ 
    console.log('0');
    console.log(cordova.file.externalRootDirectory);
    console.log('1');
	//statusDom    = document.querySelector('#status');
	//$('#downloadProgress').css({"display":"block"});
  //	app2.progressbar.set('#status', "0");
	
    var fileTransfer = new FileTransfer();
   // var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    //var canvas = document.getElementById('qr_s_teste');
	
	//alert($('img[id="qr_liberacao"]').attr('src'));
    var dataURL = $("#url_qr").val();
	
    var uri = encodeURI(dataURL);
    var filePath = cordova.file.externalApplicationStorageDirectory+'Download/qrcode.png';
    console.log('2');
	//alert(uri);
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "%...";
			app2.progressbar.set('#status', perc);
		}
	};
    fileTransfer.download(
        uri,
        filePath,
	
        function(entry) {
          //  console.log("download complete: " + entry.fullPath);
			//$('#downloadProgress').css({"display":"none"});
            //notifica('Download/Download Concluído90 /ok',0,0);
			var path = entry.toURL(); //**THIS IS WHAT I NEED**
			//alert(path);
			var ref = cordova.InAppBrowser.open(uri, '_blank', 'location=no,hideurlbar=yes');
			
			/*var myCallback = function(event) { console.log('envio ok'); }
			ref.addEventListener('loadstart', myCallback);
			ref.addEventListener('loaderror', myCallback);
			ref.removeEventListener('loadstart', myCallback);*/
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
           
			
			$('#downloadProgress').css({"display":"none"});
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
    console.log('3');
}

function whatsapp_qrcode(){
    //var canvas = document.getElementById('qr_s_teste');
    var dataURL = $("#url_qr").val();
    var uri = encodeURI(dataURL);
    window.plugins.socialsharing.shareViaWhatsApp('' /* msg */, uri /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
}

function liberacao_delete_notifica(){
    navigator.notification.confirm(
        'Voce tem certeza que deseja excluir essa Liberação',  // message
        liberacao_delete,              // callback to invoke with index of button pressed
        'Excluir Liberação',            // title
        'Sim,Não'          // buttonLabels
    );
}

function liberacao_delete(buttonIndex){
    if(buttonIndex == 1){
        var dados = $( "#liberacao2 #add_liberacao" ).serialize();
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/liberacao_delete.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
            success: function(retorno){
                //alert(retorno);
                carrega_liberacao(0);
                openPopUp();
				afed('#home','#liberacao2','','',3,'liberacao_list');
            },
            error      : function() {
                alert('erro');
				$("#wait").css("display", "none");
            }
        });  
    }
}
function moreInformation(){
	
	$("#more_information").fadeIn("slow");
	setTimeout(function(){
		$("#collapse_more").hide();
	},300);
	

}

function foto_visita(id_visitante){
    afed('#bg_box6','','','',1);
    localStorage.setItem("id_visitante_up_foto",id_visitante);
}



function get_visitante(){
	$("#main_acesso").html("");
	let html = "";
	let id_visitante =$( "#add_liberacao #visita" ).val();
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/acesso_visitante.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id:id_visitante,id_condominio:$( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
			
		   for (x in retorno) {
				html ='<div class="card"><div class="card-header" style="background: #2196f3; color: white;">Acessos <i class="fa fa-sign-in"></i> </div><div class="card-content card-content-padding"><div class=""><p><strong>Morador - '+retorno[x].nome+'</strong></div></p>Entrada - '+retorno[x].entrada+'<p>Saida - '+retorno[x].saida+'';
				html +='</div></div>';
				
				
				$("#main_acesso").append(html);
			}
		},
		
		error:function(){
			alerta("","Nenhum registro encontrado!");
			$("#wait").css("display", "none");
		}
	});	
}


function atualiza_veiculo(id_veiculo,tipo,marca=''){
	///alert(marca+'???'+modelo+'???'+cor+'???'+tipo);
	
		var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/veiculo_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : id_condominio, id_veiculo : id_veiculo, tipo_busca : tipo, marca : marca },
        dataType   : 'json',
		success: function(retorno){
			
				//alert(retorno);
			
			
			if(tipo == 1){
				
				var marca_dados = '';
				for (x in retorno[0]['marcas']) {
					marca_dados = marca_dados + '<option value="'+retorno[0]['marcas'][x]['id']+'">'+retorno[0]['marcas'][x]['marca']+'</option>';
				}
				
			}
			if(tipo == 1 || tipo == 2){
				var modelo_dados = '';
				for (x in retorno[0]['modelo']) {
					modelo_dados = modelo_dados + '<option value="'+retorno[0]['modelo'][x]['id']+'">'+retorno[0]['modelo'][x]['modelo']+'</option>';
				}
			}
			if(tipo == 1){
			var cor_dados = '';
			for (x in retorno[0]['cor']) {
				cor_dados = cor_dados + '<option value="'+retorno[0]['cor'][x]['id']+'">'+retorno[0]['cor'][x]['cor']+'</option>';
			}
			}
			
			if(tipo == 1){
				$( "#l_id_carro" ).val(retorno[0]['veiculo'][0]['id']);
				$( "#marca_carro_visitant" ).html(marca_dados);
				$( "#l_marca_carro" ).val(retorno[0]['veiculo'][0]['marca']);
				$( "#modelo_carro_visitante" ).html(modelo_dados);
				$( "#l_modelo_carro" ).val(retorno[0]['veiculo'][0]['modelo']);
				$( "#cor_veicolo_visitante" ).html(cor_dados);
				$( "#l_cor_carro" ).val(retorno[0]['veiculo'][0]['cor']);
				$( "#l_id_carro" ).val(id_veiculo);
				$( "#l_placa_carro" ).val(retorno[0]['veiculo'][0]['placa']);
				$( '#foto_visitante_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['veiculo'][0]['foto']+")");
				if(retorno[0]['veiculo'][0]['id'] == 0){
					$( '#foto_veiculo_img' ).val('');
				}
			}else if(tipo == 2) { 
				$( "#modelo_carro_visitante" ).html(modelo_dados);
				//alert('modelos');
					var valor = $("#marca_carro_visitant option:selected").val();
	
					$("#marca_cv").attr('value',''+valor+'');
	
	

				$(".left .icon.icon-back").attr('id','marc_selec');


				$("#marc_selec").click();
			}
			
			//$( '#l_marca_carro option[value=""]').attr("selected","selected");
			//$( '#l_marca_carro').val("").change();
			//$( '#l_cor_carro').val("").change();
						        
        },
        error      : function() {
			$("#wait").css("display", "none");
       }
	});	

}

function atualiza_veiculo_visitante(){
	
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var placa = $("#liberacao_placa").val();
	var modelo = $("#modelo_cv").val();
	var cor = $("#cor_cv").val();
	
    if($("#carro_marca .item-after").html() == "" || $("#carro_marca .item-after").html() == null ){
		alerta("","Preencha a marca");
	}else 
	if($("#carro_modelo .item-after").html() == ""){
		alerta("","Preencha o modelo");	 
	}else 
	if($("#carro_cor .item-after").html() == "" || $("#carro_cor .item-after").html() == null){
		alerta("","Preencha a cor");
	}else{
				
								
								
			
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/veiculo_insert_liberacao.php',
			data:{modelo: modelo, cor: cor, placa: placa,id_condominio: id_condominio},
			success: function(retorno){
				alerta('Veículo Cadastrado com Sucesso!');
				
				$("#id_carro_visitante").val(retorno);
		
				
				
					get_veiculo($("#liberacao_placa").val());
				
				
			},
			error: function(data){
				alert('erro');
				$("#wait").css("display", "none");
			}	
		});	
	}
}

function abre_imagem_carro(el){
	
	let imagem = $(el).data("img");
	let modelo = $(el).data("modelo");
	let placa  = $(el).data("placa");
	
	$(".veiculo-foto_veiculo .block").html('<strong><p>Modelo - '+modelo+'</p><p> Placa - '+placa+'</p></strong><hr><div class="liberacao_img" style="'+imagem+'"></div>');
	$(".liberacao_img").css("margin-left","57px").css("width","200px").css("height","200px").css("background-repeat","no-repeat").show();
		
}
 
function seleciona_modelo()
{	
	var valor = $("#modelo_carro_visitante option:selected").val();
	
	$("#modelo_cv").attr('value',''+valor+'');
	$(".left .icon.icon-back").attr('id','model_selec');
	$("#model_selec").click();
	
}
function seleciona_cor()
{	
	var valor = $("#cor_veicolo_visitante option:selected").val();
	
	$("#cor_cv").attr('value',''+valor+'');
	$(".left .icon.icon-back").attr('id','cor_selec');
	$("#cor_selec").click();
	
}
function sem_veiculo()
{	
	    if($("#check_veic").is(":checked") == false)
	{	$("#link_tab").attr('href','#');
		 $('#botao_avancar').removeClass('tema-azul');	
		
	}else
		{
		
	
	   	$("#botao_avancar").addClass('tema-azul');
		$("#link_tab").attr('onClick','avancar3()');
		$("#link_tab").attr('href','#tab-4'); 
			
		}

	

	
}
function tipo_acesso()
{	
	
	if($("#veicl").prop( "checked" )== true)
		{
			$("#tipo_acesso").css('display','block');
			$('#botao_avancar').removeClass('tema-azul');	
			$("#buscar_placa").attr('onClick','get_veiculo($("#liberacao_placa").val())');
			$("#buscar_placa").html('<i class="f7-icons size-15">car_fill</i> Buscar').addClass('button button-fill color-theme-red');
			$("#buscar_placa").attr('style','background-color:red;margin-top: -10px;font-size:10px');
			$("#carro_marca .item-after").html('');
			$("#carro_modelo .item-after").html('');
			$("#carro_cor .item-after").html('');
			$("#id_carro_visitante").val('');
			
			$('#liberacao_placa').mask('AAA-0000');
			
		}
	else if($("#pedestr").prop( "checked" )== true){
			
		$("#tipo_acesso").css('display','none');
		
		$("#link_tab").attr('href','#tab-4');
		$("#botao_avancar").addClass('tema-azul');
		
	}
	
}
function validadecredito()
{	var liberar = 0;
	var motivo = $("#motivo_vst").val();
 	var inicio =$("#data_inici_vl").val();
 	var fim =$("#data_fim_vl").val();
 	var qtd_qr = $("#qtd_credito_qr").val();
 ///alert(qtd_qr);

	
	if(motivo == "" ||motivo == 0)
	{
	 liberar =0;
	$("#label_visit").attr('style','border-bottom: 2px solid red;color:red');	
	}
 	else
	{ 
	 liberar =1;
	 $("#label_visit").attr('style','');	
 	}
	if(inicio == "")
	{
	 liberar =0;
	 $("#label_inicio").addClass('item-input-focused color-theme-red');
	}
 	else
	{
	  $("#label_inicio").removeClass('item-input-focused color-theme-red');
	 liberar =1;
 	}
	 
	 if(fim == "")
	{
	 liberar =0;
	 $("#label_fim").addClass('item-input-focused color-theme-red');
	}
 	else
	{
	  $("#label_fim").removeClass('item-input-focused color-theme-red');
	 liberar =1;
 	}
	 if(qtd_qr == "" || qtd_qr == 0 )
	{ 
		$("#label_credito").attr('style','border-bottom: 2px solid red;color:red');	 
		liberar =0;
	}
	else
	{
		$("#label_credito").attr('style','');	
		liberar =1;
	} 
 
if(liberar ==1)
	{
	
		
					$("#botao_avancar").addClass('tema-azul');		
					$("#link_tab").attr('onClick','avancar3()');
					$("#link_tab").attr('href','#tab-3');
			
 }
 else{

	  	 
	 
	 
	 
 }
 
 
 
}
