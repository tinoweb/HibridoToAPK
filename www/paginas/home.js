	goToProfile = () => {
		// alert("===>>>>>" + elemento[0]);
		// console.log(elemento[0]);
		// return false;
		alert("entrou sim na função");
		
		// if ($(elemento[0]).hasClass('goToProfile')) {
			carrega_morador_dados(localStorage.getItem("ID_MORADOR"));
			carregaInfoProfile();
			alert("roteando agora....");
			app.views.main.router.navigate("/perfil/", {animate:true});
		// }
	}

	
