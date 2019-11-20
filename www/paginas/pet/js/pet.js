//Mudar entre Abas meus pet e todos os pets
function abas_pet()
	{	
	
	
			if($("#valor_tab").val() == 1)
			{
				$("#link-pet").attr('style','color:green;margin-left: 100%;margin-top: 0%;');
				$("#link-pet").attr('href','#tab-1');
				$("#valor_tab").val(0)
			}else{
				$("#link-pet").attr('style','color:white;margin-left: 100%;margin-top: 0%;');
				$("#link-pet").attr('href','#tab-2');				
				$("#valor_tab").val(1)		
			}
	
		
		
	}


function buscar_pet()
{
	
	$("#botao_pet_mais").click();
	
}