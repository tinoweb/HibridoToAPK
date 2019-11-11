// Initialize app
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/home/',
      url: 'paginas/home.html',
    },
    {
      path: '/about/',
      url: 'paginas/about.html',
    },
  ],
	
  // ... other parameters
});

var mainView = app.views.create('.view-main');