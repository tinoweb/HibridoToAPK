//FUNCAO CARREGA LIBERACOES TODAS

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

function carrega_liberacao(tipo){
    //alert('teste');
	app.controler_pull("liberacao");
	if(tipo ==4){
		$("#busca_liberacao").val("");
	}
    if(tipo == 0 || tipo==3 || tipo==4){
        var pg = 1;
    }else{
        //var offset = $("#retorno_liberacao").find(".liberado").size();
        var offset = $(".liberado-card").length;
        //alert(offset);
        if(offset != 0){
            var pg = (offset/5)+1;
        }else{
            var pg = 1
        }
		if(parseInt(pg) != parseFloat(pg)) { 
			pg = pg+1; 
		}
	}
    //alert(pg);
	var cont =0;
    var dados = '';
	$.ajax({
		type: 'POST',
		//url: localStorage.getItem('DOMINIO')+"appweb/liberacao_get.php",
		url: localStorage.getItem('DOMINIO')+'appweb/liberacao_get.php',
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_morador : $( "#DADOS #ID_MORADOR" ).val(),pg : parseInt(pg),tipo : 1,nome : $( "#busca_liberacao" ).val()},
        dataType   : 'json',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
		success: function(retorno){
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
					   bt_convite = '<button type="button" onClick="gera_qrcode(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\')" class="col button button-fill color-orange">Reenviar Convite</button>';
                    }else{
					   bt_convite = '<button type="button" onClick="gera_qrcode(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\')" class="col button button-fill color-green">Enviar Convite</button>';
                    }
				}else{
					bt_convite = '<button type="button" class="col button button-fill color-red">CONVITE VENCIDO</button>';	
				}
                
                var foto           = '';
				var foto_veiculo   = '';
				var icone_foto     = '';
				var modelo         = '';
				var placa          = '';
				var icon           = '';
				
                if(retorno[x]['foto'].length>0){
                    foto = 'style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+')"';
                }
				
				if(retorno[x]['foto_veiculo'] != ""){
					foto_veiculo = 'display:none;background-image:url(data:image/jpeg;base64,'+retorno[x]['foto_veiculo']+')';
					icone_foto   = '<i onClick="afed(\'\',\'\',\'\',\'\',2,\'foto_veiculo_visitante\')" data-sheet=".veiculo-foto_veiculo" class="sheet-open material-icons">directions_car</i>';
					modelo       = retorno[x]['modelo'];
					placa        = retorno[x]['placa'];
                }
				
				if(foto == ""){
					icon = '<span class="fa fa-user-circle" style="font-size: 2.5em;color: gray;"></span>';
				}else{
					icon = '';
				}
				

                var dado =  '<div class="card liberado-card">'+
                                '<div class="card-header">'+
                                    '<div class="liberacao2-avatar" '+foto+'  onClick="foto_visita(\''+retorno[x]['visitante']+'\')">'+icon+'</div><div style="float:right" data-img="'+foto_veiculo+'" data-modelo="'+modelo+'" data-placa="'+placa+'" onclick="abre_imagem_carro(this);" id="veic_foto">'+icone_foto+'</div>'+
                                    '<div class="liberacao2-name" onClick="$(\'#cad_veiculo\').hide();carrega_liberacao_visita(\''+retorno[x]['id']+'\',\'1\')">'+retorno[x]['nome']+'</div>'+
                                    '<div class="liberacao2-date" onClick="$(\'#cad_veiculo\').hide();carrega_liberacao_visita(\''+retorno[x]['id']+'\',\'1\')">'+retorno[x]['motivo']+'</div>'+
                                '</div>'+
                                '<div class="card-content card-content-padding">Validade de: '+retorno[x]['validadeInicio']+' até '+retorno[x]['validadeFim']+'<br>'+credito+bt_convite+'</div>'+ 
                            '</div>';
                dados = dados + dado;
            }
            //alert(dados);
			//dados = '<div class="main">'+dados+'</div>';
			if(tipo == 0 || tipo==3 || tipo==4){
				$("#retorno_liberacao").html("");
			}
		
			$( "#retorno_liberacao" ).append(dados);
		},
        error   : function() {
            //alert('Erro ao carregar liberacao');
			$("#wait").css("display", "none");
        }
	});
    localStorage.setItem('TELA_ATUAL','liberacao_list');
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
	
	$( "#add_liberacao #l_deletar" ).show();
	$( "#add_liberacao #l_cadastrar" ).parent().attr("class","col-xs-6");
	$( "#add_liberacao #savarLib").html('<span class="fa fa-check"></span> Alterar');

	if(tipo == 0){
		
	}else{
    var todo_motivos ='';
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/liberacao_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_morador : $( "#DADOS #ID_MORADOR" ).val(),id_liberacao : visita},
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
		+"<img  width='50%' src='data:image/png;base64,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'> </div>";
							
		
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
			   notifica('Data Inválida/Data INICIAL não pode ser inferior a data atual/Ok',0,0);
			}else if(dt_ate < dt_atual){
			   notifica('Data Inválida/Data FINAL não pode ser inferior a data atual/Ok',0,0);
			}else if(dt_ate <= dt_de){
			   notifica('Data Inválida/Data FINAL não pode ser inferior a data INICIAL/Ok',0,0);
			}else if(dt_ate > dt_limite ){
			   notifica('Data Inválida/Data FINAL não pode ser superior a '+dt_limite.getDate()+'-'+(dt_limite.getMonth()+1)+'-'+dt_limite.getFullYear()+' '+dt_limite.getHours()+':'+dt_limite.getMinutes()+'/Ok',0,0);
			}else{
				var dados = $( "#add_liberacao" ).serialize();

				$.ajax({
					type: 'POST',
					url: localStorage.getItem('DOMINIO')+'appweb/liberacao_insert.php',
					crossDomain: true,
					beforeSend : function() { $("#wait").css("display", "block"); },
					complete   : function() { $("#wait").css("display", "none"); },
					data       : dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val(),
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

    localStorage.setItem('TELA_ATUAL','qrcode_gera');
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/qrcode_insert.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_autorizacao_visita : qrcode_numero},
        dataType   : 'json',
        success: function(retorno){
            $('#qrcodeCanvas').html('');
            jQuery('#qrcodeCanvas').qrcode({
                text	: retorno[0]['code'],
                quiet   : 2,
                ecLevel: 'L',
                radius: 0.5
            });
            //preview();
            var dados_qr = 'Olá '+nome+', <br>essa é sua autorização para acessar o <br>condomínio '+$( "#DADOS #CONDOMINIO" ).val()+' <br>no período de '+retorno[0]['data_inicio']+' a '+retorno[0]['data_validade']+'';
            //var dados_qr = 'Condominio '+$( "#DADOS #CONDOMINIO" ).val()+'<br>Morador: '+$( "#DADOS #NOME_MORADOR" ).val()+'<br>'+$( "#DADOS #QUADRA" ).val()+' '+$( "#DADOS #LOTE" ).val()+'<br>Válido de '+retorno[0]['data_inicio']+'<br>Até '+retorno[0]['data_validade']+'';
            $('#qr_dados').html(dados_qr);
			afed('#qrcode','#home,#del_lib','','',3,'qrcode');
			closePopUp();
            
            //var canvas = document.getElementById('qrcodeCanvas');
            //var dataURL = canvas.toDataURL();
            //alert(dataURL);
        },
        error      : function() {
            //alert('Erro ao carregar qcode');
			$("#wait").css("display", "none");
        }
    });
   
}

//function downloadCanvas(link) {
////    var canvas = document.getElementById('qr_code_img');
////    var dataURL = canvas.toDataURL();
//    var url = 'http://www.planalto.gov.br/ccivil_03/manual/manualredpr2aed.pdf';
//    var filePath = 'qrcode.pdf';
//    alert(filePath);
//    var fileTransfer = new FileTransfer();
//    var uri = encodeURI(url);
//    fileTransfer.download(
//        uri,
//        filePath,
//        function(entry) {
//            console.log("download complete: " + entry.fullPath);
//        },
//        function(error) {
//            console.log("download error source " + error.source);
//            console.log("download error target " + error.target);
//            console.log("upload error code" + error.code);
//        },
//        false,
//        {
//            headers: {
//                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
//            }
//        }
//    );
////    var canvas = document.getElementById('qr_code_img');
////    var dataURL = canvas.toDataURL();
////    //alert(dataURL);
////    link.href = dataURL;
////    link.download = 'qrcode.png';
//}

function preview(){
    //alert(globale);
    var element = $("#printscr_qrcode"); // global variable
    var getCanvas; // global variable
	$("#share_img").html("");
    html2canvas(element, {
        onrendered: function (canvas) {
            $("#share_img").html(canvas);
            var dataURL = canvas.toDataURL();
            //alert(dataURL); 
            localStorage.setItem("img_share", dataURL);
        }
    });
    afed('#qrcode_share','#qrcode','','',2,'qrcode_share');

    
}

//
//function download_qrcode(){
//        alert('1');
//        var getCanvas = localStorage.getItem("getCanvas");
//        //alert(getCanvas);
//        alert('2');
//        var imgageData = getCanvas.toDataURL("image/png");
//        // Now browser starts downloading it instead of just showing it
//        alert('3');
//        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
//        alert('4');
//        $("#qrcodeCanvas").attr("download", "your_pic_name.png").attr("href", newData);
//
//}

function download_qrcode(){ 
    console.log('0');
    console.log(cordova.file.externalRootDirectory);
    console.log('1');
	statusDom    = document.querySelector('#status');
	$('#downloadProgress').css({"display":"block"});
  	app2.progressbar.set('#status', "0");
	
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    //var canvas = document.getElementById('qr_s_teste');
    var dataURL = localStorage.getItem("img_share");
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
            console.log("download complete: " + entry.fullPath);
			$('#downloadProgress').css({"display":"none"});
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
            //console.log("upload error code" + error.code);
			alert("erro");
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
    var dataURL = localStorage.getItem("img_share");
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
	//alert(marca+'???'+modelo+'???'+cor+'???'+tipo);
	
	
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/veiculo_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_veiculo : id_veiculo, tipo_busca : tipo, marca : marca },
        dataType   : 'json',
		success: function(retorno){
			
			//console.log(retorno);
			
			
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
				$( "#l_marca_carro" ).html(marca_dados);
				$( "#l_marca_carro" ).val(retorno[0]['veiculo'][0]['marca']);
				$( "#l_modelo_carro" ).html(modelo_dados);
				$( "#l_modelo_carro" ).val(retorno[0]['veiculo'][0]['modelo']);
				$( "#l_cor_carro" ).html(cor_dados);
				$( "#l_cor_carro" ).val(retorno[0]['veiculo'][0]['cor']);
				$( "#l_id_carro" ).val(id_veiculo);
				$( "#l_placa_carro" ).val(retorno[0]['veiculo'][0]['placa']);
				$( '#foto_visitante_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['veiculo'][0]['foto']+")");
				if(retorno[0]['veiculo'][0]['id'] == 0){
					$( '#foto_veiculo_img' ).val('');
				}
			}else if(tipo == 2) {
				$( "#l_modelo_carro" ).html(modelo_dados);
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
	
	var dados = $( "#form_visitante_veiculo" ).serialize();
    if($("#l_marca_carro").val() == "" || $("#l_marca_carro").val() == null ){
		alerta("","Preencha a marca");
	}else 
	if($("#l_modelo_carro").val() == 0){
		alerta("","Preencha o modelo");	 
	}else 
	if($("#l_cor_carro").val() == "" || $("#l_cor_carro").val() == null){
		alerta("","Preencha a cor");
	}else{
			
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/veiculo_insert_liberacao.php',
			data:dados+'&id_morador=""&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
			success: function(retorno){
				alerta(1);
				$(".veiculo-morador .sheet-close")[0].click();
				$("#liberacao2 #id_veiculo").val(retorno);
				$("#cad_veiculo").hide();
				$("#cad_veiculo_ok").fadeIn();
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

