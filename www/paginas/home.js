	goToProfile = () => {
		// alert("entrou sim na função");
		carrega_morador_dados(localStorage.getItem("ID_MORADOR"));
		carregaInfoProfile();
		alert("roteando agora....");
		app.views.main.router.navigate("/perfil/", {animate:true});
	}

	
