	goToProfile = () => {
		carrega_morador_dados(localStorage.getItem("ID_MORADOR"));
		carregaInfoProfile();
		app.views.main.router.navigate("/perfil/", {
			animate:true,
			transition: 'f7-dive',
			reloadAll:true
		});

		$$(document).on('page:init', '.page[data-name="pgPerfil"]', function (e) {
			console.log("page inited");
		}); 
	}