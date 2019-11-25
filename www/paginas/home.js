	goToProfile = (elemento) => {
		alert("===>>>>>" + elemento[0]);
		// console.log(elemento[0]);
		// return false;
		
		if ($(elemento[0]).hasClass('goToProfile')) {
			carrega_morador_dados(localStorage.getItem("ID_MORADOR"));
			carregaInfoProfile();
			app.views.main.router.navigate("/perfil/", {animate:true});
		}
	}

	
