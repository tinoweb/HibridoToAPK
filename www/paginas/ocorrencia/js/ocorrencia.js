// minha ocorrencia tab
function abas_ocorr()
	{	
	
	
			if($("#valor_tab").val() == 1)
			{
				$("#link-ocorr").attr('style','color:green;margin-left: 100%;margin-top: 0%;');
				$("#link-ocorr").attr('href','#tab-01');
				$("#valor_tab").val(0)
			}else{
				$("#link-ocorr").attr('style','color:white;margin-left: 100%;margin-top: 0%;');
				$("#link-ocorr").attr('href','#tab-02');				
				$("#valor_tab").val(1)		
			}
	
		
		
	}



// ZOOM NA LETRAS

function zoom_ocorrencia2()
{
	var valor = $("#rang_ocr").val();
	var total = valor ;
	
	$("#descricao_ocr").attr('style','font-size:1'+valor+'%');
	$("#valor_range2").attr('value','1'+valor+'');
	
	
	
	var rang2 = $("#valor_range2").val();
	
	if ($("#valor_range2").val() <100)
		{
			$("#descricao_ocr").attr('style','font-size:100%');
		}
	
	
	
}
// Filtrar Categoria
function buscar_ocorrencia()
{
	
	$("#botao_ocorrencia_mais").click();
	
}

// Selecionar categoria 

function selecionar_categoria(valor)
{
	var i =0;
	var total_categorias =12+1;
	while(i < total_categorias)
		{ 
			$("#categoria"+i+"").attr('style','background-color:white;color:black');
		i++;
				
		}
		
	var categoria_resu = $("#"+valor+" .chip-label").html();

	$("#"+valor+"").attr('style','background-color:#019040;color:white');
	 $("#link2_ocr").attr('href','#tab-3');
	
	 $("#cat_ocor_selec").val(categoria_resu);
	
	 $("#barra_proximo2").addClass('tema-azul');
	
	
}
//Bloquear e liberar o botão proximo ao preencher o titulo da ocorrencia
function botao_proximo1() {
   	 $("#link1_ocr").attr('href','#tab-2');
	
	 $("#barra_proximo1").addClass('tema-azul');
	
    if($("#titulo_ocorrencia").val() == "")
	{	$("#link1_ocr").attr('href','#');
		 $('#barra_proximo1').removeClass('tema-azul');	
		
	}


}
//Bloquear e liberar o botão proximo ao preencher a descrição da ocorrencia
function botao_proximo3() {
   	 $("#link3_ocr").attr('href','#tab-4');
	
	 $("#barra_proximo3").addClass('tema-azul');
	
    if($("#descricao_ocorrencia").val() == "")
	{	$("#link3_ocr").attr('href','#');
		 $('#barra_proximo3').removeClass('tema-azul');	
		
	}


}
function botao_proximo3() {
   	 $("#link3_ocr").attr('href','#tab-4');
	
	 $("#barra_proximo3").addClass('tema-azul');
	
    if($("#descricao_ocorrencia").val() == "")
	{	$("#link3_ocr").attr('href','#');
		 $('#barra_proximo3').removeClass('tema-azul');	
		
	}


}
function botao_proximo4() {


	
	
	
    if($("#check_img").is(":checked") == false)
	{	$("#link5_ocr").attr('href','#');
		 $('#barra_proximo5').removeClass('tema-azul');	
		
	}else
		{
		 $("#link5_ocr").attr('href','#tab-5');
	
	   	$("#barra_proximo5").addClass('tema-azul');
		    var titulo =$("#titulo_ocorrencia").val();
			var categoria = $("#cat_ocor_selec").val();
			var decricao =$("#descricao_ocorrencia").val();
			
			$("#resultado_titulo").html(titulo);
			$("#resultado_categoria").html(categoria);
			$("#resultado_descricao").html(decricao);
			
		}


}

function liberar_salvar() {

    if($("#check_resumo").is(":checked") == false)
	{	$("#salvar_ocr_link").attr('href','#');
		 $('#salvar_btn').removeClass('tema-azul');	
		
	}else
		{
		 $("#salvar_ocr_link").attr('href','/ocorrencia/');
	
	   	$("#salvar_btn").addClass('tema-azul');
		 
			
		}


}



//
//$$('.something').on('click', function (e) {
//    $$(this).addClass('hello').attr('title', 'world').insertAfter('.something-else');
//});


//var ac6 = app.actions.create({
//  grid: true,
//  buttons: [
//    [
//      {
//        text: 'Button 1',
//        icon: '<img src="https://cdn.framework7.io/placeholder/people-96x96-1.jpg" width="48"/>'
//      },
//      {
//        text: 'Button 2',
//        icon: '<img src="https://cdn.framework7.io/placeholder/people-96x96-2.jpg" width="48">'
//      },
//      {
//        text: 'Button 3',
//        icon: '<img src="https://cdn.framework7.io/placeholder/people-96x96-3.jpg" width="48">'
//      },
//    ],
//    [
//      {
//        text: 'Button 1',
//        icon: '<img src="https://cdn.framework7.io/placeholder/fashion-96x96-4.jpg" width="48"/>'
//      },
//      {
//        text: 'Button 2',
//        icon: '<img src="https://cdn.framework7.io/placeholder/fashion-96x96-5.jpg" width="48">'
//      },
//      {
//        text: 'Button 3',
//        icon: '<img src="https://cdn.framework7.io/placeholder/fashion-96x96-6.jpg" width="48">'
//      },
//    ]
//  ]
//});
//$$('.ver_anexo').on('click', function () {
//    ac6.open();
//});