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

var app2 = {
	
	escondeTeclado: function(){
		Keyboard.hide();
		
	},
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
		console.log('deviceready app');
		app2.receivedEvent('deviceready');
        //document.addEventListener("backbutton", onBackKeyDown, false);		
	},

    receivedEvent: function(id) {
		console.log('receive app');
        var parentElement = document.getElementById(id);
		console.log('APP RECEIVED ID: '+id+ '-------------');
		app2.setupPush();
    },
	
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({ 
            "android": {"senderID": "572833270659"},
            "browser": {},
            "ios": { 
                "senderID": "572833270659",
                "alert": true,
                "sound": true, 
                "vibration": true, 
                "badge": true
            },
            "windows":{}
        }); 
        
		
        push.on('registration', function(data) { 
			console.log(data.registrationId);
            localStorage.setItem('registrationId', data.registrationId);
        }); 
		
		push.on('error', function(e) { 
			alert(e); 
		});

    }
}