goToProfile = () => {
	console.log("go to profile page....");
	app.views.main.router.navigate("/perfil/", {animate:true});
	$$(document).on('page:init', '.page[data-name="pgPerfil"]', function (e) {
		carregaInfoProfile();
		carrega_morador_dados(localStorage.getItem("ID_MORADOR"));
	})
}