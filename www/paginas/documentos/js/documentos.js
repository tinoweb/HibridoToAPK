

function carrega_documentos(tipo){
	//alert(localStorage.getItem('DOMINIO'));
		//apps.controler_pull("documentos");
    var pg = 0;
	if(tipo === 4){
			$( "#main_documento" ).html('');
		var buscar = $("#busca_documento").val();
		var inicio = $("#data_inicio_doc").val();
		var fim = $("#data_fim_doc").val();
		var categoria = $("#select_categoria_doc").val();
	
		
	
	}else{
		var buscar = '';
		var inicio = '';
		var fim = '';
		var categoria = '';
		
	}
	
    if(tipo === 0 || tipo===3 || tipo===4){
        pg = 1;
    }else{
        
        var offset = $(".documento_card").length;
        if(offset !== 0){
            pg = (offset/10)+1;
        }else{
            pg = 1;
        }
		if(parseInt(pg) !== parseFloat(pg)) { 
        	pg = pg+1; 
    	}
    }
	

	var busca_doc = '';//$('#busca_documento').val();
	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
	var id_usuario_condominio = localStorage.getItem('ID_USER');
    var dados     = '';
	var dado      = '';
	var tipo_     = '';  
	var caminho   = '';
	var cor       = '';
	var link      = '';
	var tipo 	  = '';
		//alert(buscar);
	$.ajax({
		type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/documento_get.php",
		crossDomain: true,
		beforeSend : function() { $("#sktl").css("display", "block"); },
		complete   : function() { $("#sktl").css("display", "none"); },
        data       : { id_condominio :id_condominio, id_usuario_condominio :id_usuario_condominio, pg : pg, busca_doc : buscar, op:1,categoria:categoria,inicio:inicio,fim:fim},
       dataType   : 'json',
		success: function(retorno){
			
			var cont = 0;
			for (x in retorno) {
				cont++;
				
			
			var titulo = retorno[x]['titulo'];
			var id_doc = retorno[x]['id_documento'];
			titulo = limita_txt(titulo,20);				
				
		var tipo_arc =	retorno[x]['tipo2'];
		var tipo =	tipo_arc.substr(tipo_arc.length - 3);
		var tipo_dw =	tipo_arc.substr(6);
				
		var download_doc = localStorage.getItem('DOMINIO')+tipo_dw;
	
			if(tipo == 'pdf')
			{
				tipo = '<img src="img/pdf.png" width="44">';
			}                              
			if(tipo == 'jpg' || tipo == 'png')
			{
				tipo =  '<img src="img/imagem.png" width="44">';
			}
			if(tipo == 'doc' || tipo == 'docx' || tipo == 'xml')
			{
				tipo = '<img src="img/word.png" width="44">';
			}
				
			if(tipo == 'xls')
			{
				tipo =  '<img src="img/imagem.png" width="44">';
			}
				
							
			if(tipo == 'ppt')
			{
				tipo =  '<img src="img/PowerPoint.png" width="44">';
			}
			if(tipo == 'ocx')
			{
				tipo =  '<img src="img/ocx.png" width="44">';
			}
			if(tipo == 'txt')
			{
				tipo =  '<img src="img/bloco.jpg" width="44">';
			}


				dado = ' <li class="item-content" id="documento_card" onclick="download_arquivos(\''+download_doc+'\',\''+id_doc+'\');" value="" >'
				+'<div class="item-media">'+tipo+'</div>'
				+' <div class="item-inner">'
				+	'<div class="item-title-row">'
				+	 '  <div class="item-title">'+titulo+'</div>'
				+	'	<i class="f7-icons size-25" >arrow_down_doc</i>'
				+	'</div>'
				
				+	 '<label style="font-size: 10px;">Categoria : '+retorno[x]['descricao']+'</label>'
				 +   ' <label style="font-size: 10px;margin-left: 10%">data: '+retorno[x]['data_criacao']+'</label> '
					+'<div style="display: none" id="doc'+id_doc+'">'
				+'	<label class="size-10">Baixando ...</label>'
				+'	<span class="progressbar-infinite color-multi" ></span>'
				+'</div>'
				
				+' </div>'
			
			 +'</li>';
                dados = dados + dado;
			}
		if(cont == 0)
			{
			 $( "#main_documento" ).html('<h1 style="color:blue;">Nenhum Item Encontrado !</h1><img src="img/erro404.jpg" >');	
			}else{
				 $( "#main_documento" ).append(dados);
			}
           
		
          		
	
		},
        error : function(retonro) {
            alert(retonro);

        }
	});	
}
function download_arquivos(path,id){
	
	$('#doc'+id).css({"display":"block"});
  	//app2.progressbar.set('#status', "0");
	//alert(path);
    var fileTransfer = new FileTransfer();
    var uri          = encodeURI(path);
	var statusDom    = document.querySelector('#status');
	var filePath     = cordova.file.externalApplicationStorageDirectory+'Download/'+uri;
   

    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
			$('#doc'+id).css({"display":"none"});
            var ref = cordova.InAppBrowser.open(uri, '_system', 'location=yes');
			//var ref = cordova.InAppBrowser.open(uri, '_blank', 'location=yes');
			
		 },
        function(error) {
			$('#doc'+id).css({"display":"none"});
			alerta('Erro ao Biaxar este arquivo, tente novamente mais tarde !');
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
			alert(error.code);
			alert(filePath);
	
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}
function carregar_categoria_doc()
{	var dados = '';
 	var dado = '';
 
 	var id_condominio = localStorage.getItem('ID_CONDOMINIO');
 	$( "#select_categoria_doc" ).html(''); 
	$.ajax({
type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/documento_get.php",
		crossDomain: true,
		dataType   : 'json',
        data       : { id_condominio :id_condominio, op:2},
        
		success: function(retorno)
		{
			//alert(retorno);
			var cont = 0;
		   for (x in retorno) {
					cont++;
				dado = '<option value="'+retorno[x]['id_categoria']+'">'+retorno[x]['descricao']+'</option>'
				dados = dados+ dado;
				}
				 $( "#select_categoria_doc" ).append('<option value="">Selecione...</option>'+dados);
			},
		error: function(retorno)
		{
			
		  alerta('erro ao carregar categoria de Documentos'+retorno);
		  console.log(retorno);
			
			
		}
		
	});

	
}
	$("#pull-documentos").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 110);
			var x=$(this).get(0).scrollHeight;
            if ((($(this).scrollTop() + $(this).height()) + 110) > $(this).get(0).scrollHeight) {
                carrega_documentos(1);
				alert('d');
            }
			app.ckBoxUp("#boxUp_documentos","#pull-documentos");
		});	
