switchToEntrega = () => {
	app.views.main.router.navigate("/entregas/", {animate:true});

	$$(document).on('page:init', '.page[data-name="PgEntregas"]', function (e) {
		app.sheet.close('.defineSenhaApp', true);
		app.sheet.close('.loginApp', true);
	}); 
}