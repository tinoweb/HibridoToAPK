	goToProfile = (elemento) => {
		if ($(elemento).hasClass('goToProfile')) {
			carrega_morador_dados(localStorage.getItem("ID_MORADOR"));
			carregaInfoProfile();
			app.views.main.router.navigate("/perfil/", {animate:true});
		}
	}
