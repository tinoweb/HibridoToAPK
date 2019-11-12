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
    {
      path: '/liberacao/',
      url: 'paginas/liberacao/liberacao.html',
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

          push.on('notification', function(data) {


//              atualiza_notificacao();
//              var titulo_notifica = data.title;
//              localStorage.setItem("NOT_ID"  ,data.additionalData.id_ref);
//              localStorage.setItem("NOT_TYPE",data.additionalData.tipo);
//              localStorage.setItem("NOT_COND",data.additionalData.condominio);
//              localStorage.setItem("NOT_TITULO",data.title);
//              localStorage.setItem("NOT_TEXTO",data.message);
//              console.log('notification event');
//
//              if($( "#DADOS #ID_CONDOMINIO" ).val() == ''){
//                  $( "#DADOS #ID_CONDOMINIO" ).val(localStorage.getItem("NOT_COND"));
//                  window.setTimeout(function() {
//                      perfil_notificacao(localStorage.getItem("NOT_COND"));
//                  },800);
//              }
//
//
//               if(localStorage.getItem("NOT_COND") == $( "#DADOS #ID_CONDOMINIO" ).val() ){
//
//                  if(titulo_notifica == 'Chat'){
//                      if(localStorage.getItem('TELA_ATUAL') == 'chat'){
//                          carrega_msg_eviadas($( "#DADOS #ID_USER" ).val(), $( "#DADOS #CHAT_USER" ).val());
//                      }
//                      if(localStorage.getItem('TELA_ATUAL')=='chat_msg'){
//                          carrega_chat();
//                      }
//                  }
//                  if(localStorage.getItem('TELA_ATUAL') != 'chat'){
//                      if(localStorage.getItem('TELA_ATUAL') != 'chat_msg'){
//
//                          if(localStorage.getItem("NOT_TYPE") == 123){
//
//                              var val_confg = localStorage.getItem("NOT_ID").split(';');
//
//                              localStorage.setItem('MMORADOR',val_confg[2]);
//                              localStorage.setItem('MFPERFIL',val_confg[3]);
//                              localStorage.setItem('MVEICULOS',val_confg[4]);
//                              localStorage.setItem('MCONTATOS',val_confg[5]);
//                              $( "#DADOS #MCOMUNICADOS" ).val(val_confg[6]);
//                              $( "#DADOS #MLUNICA" ).val(val_confg[7]);
//                              $( "#DADOS #MLRECORRENTE" ).val(val_confg[8]);
//                              $( "#DADOS #MRESERVA" ).val(val_confg[9]);
//                              $( "#DADOS #MENTREGAS" ).val(val_confg[10]);
//                              $( "#DADOS #MFALE" ).val(val_confg[11]);
//                              $( "#DADOS #MENQUENTE" ).val(val_confg[12]);
//                              $( "#DADOS #MDOCUMENTOS" ).val(val_confg[13]);
//                              $( "#DADOS #MRELATORIOS" ).val(val_confg[14]);
//                              localStorage.setItem('MOCORRENCIA',val_confg[15]);
//                              localStorage.setItem('MPET',val_confg[16]);
//                              localStorage.setItem('MCAM',val_confg[17]);
//                              localStorage.setItem('MMUDANCA',val_confg[18]);
//                              localStorage.setItem('MAGENDA',val_confg[19]);
//                              //localStorage.setItem('MMUDANCA',retorno[0]['MMUDANCA']);
////                                if($( "#DADOS #MCOMUNICADOS" ).val() == 1){ afed('#menu_comunicado','','','',3); }else{ afed('','#menu_comunicado','','',3); } 
////                                if($( "#DADOS #MLUNICA" ).val() == 1){ afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3); }else{ afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); } 
////                                if($( "#DADOS #MRESERVA" ).val() == 1){ afed('#menu_area','','','',3); }else{ afed('','#menu_area','','',3); } 
////                                if($( "#DADOS #MENTREGAS" ).val() == 1){ afed('#menu_entregas','','','',3); }else{ afed('','#menu_entregas','','',3); } 
////                                //if($( "#DADOS #MFALE" ).val() == 1){  afed('','','','',3); }else{ afed('','','','',3); } 
////                                if($( "#DADOS #MENQUENTE" ).val() == 1){ afed('#menu_enquete','','','',3); }else{ afed('','#menu_enquete','','',3); } 
////                                if($( "#DADOS #MDOCUMENTOS" ).val() == 1){ afed('#menu_documentos','','','',3); }else{ afed('','#menu_documentos','','',3); } 
////                                if(localStorage.getItem('MOCORRENCIA') == 1){ afed('#menu_ocorrencia','','','',3); }else{ afed('','#menu_ocorrencia','','',3); } 
////                                if(localStorage.getItem('MPET') == 1){ afed('#menu_pet','','','',3); }else{ afed('','#menu_pet','','',3); }
//                              if($( "#DADOS #MCOMUNICADOS" ).val() == 1){ afed('#menu_comunicado','','','',3); }else{ afed('','#menu_comunicado','','',3); } 
//                              if($( "#DADOS #MLUNICA" ).val() == 1){ afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3); }else{ afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); } 
//                              if($( "#DADOS #MRESERVA" ).val() == 1){ afed('#menu_area','','','',3); }else{ afed('','#menu_area','','',3); } 
//                              if($( "#DADOS #MENTREGAS" ).val() == 1){ afed('#menu_entregas','','','',3); }else{ afed('','#menu_entregas','','',3); } 
//                              if($( "#DADOS #MFALE" ).val() == 1){  afed('','','','',3); }else{ afed('','','','',3); } 
//                              if($( "#DADOS #MENQUENTE" ).val() == 1){ afed('#menu_enquete','','','',3); }else{ afed('','#menu_enquete','','',3); } 
//                              if($( "#DADOS #MDOCUMENTOS" ).val() == 1){ afed('#menu_documentos','','','',3); }else{ afed('','#menu_documentos','','',3); } 
//                              if(localStorage.getItem('MOCORRENCIA') == 1){ afed('#menu_ocorrencia','','','',3); }else{ afed('','#menu_ocorrencia','','',3); } 
//                              if(localStorage.getItem('MPET') == 1){ afed('#menu_pet','','','',3); }else{ afed('','#menu_pet','','',3); }    
//                              if(localStorage.getItem('MCAM') == 1){ afed('#menu_cameras','','','',3); }else{ afed('','#menu_cameras','','',3); }
//                              if(localStorage.getItem('MMUDANCA') == 1){ afed('#menu_mudanca','','','',3); }else{ afed('','#menu_mudanca','','',3); }
//                              if(localStorage.getItem('MAGENDA') == 1){ afed('#menu_agenda','','','',3); }else{ afed('','#menu_agenda','','',3); }
//
//                          }else if(localStorage.getItem("NOT_TYPE") == 666){
//                              logout();
//                          }else{
//                              openNotificacao(localStorage.getItem("NOT_TYPE"),data.title,'',data.message);
//                          }
//
//                      }
//                  }  
//
//               }else{
//                  navigator.notification.confirm(
//                      'Voce recebeu uma Notificação de outro condominio. Deseja trocar de condominio?',         // message
//                      onConfirm_condo,            // callback
//                      'Trocar de Condominio',
//                      ['Sim','Nao']  // buttonName
//                      );
//               }

        }); 		
		
		push.on('error', function(e) { 
			alert(e); 
		});
		


    }
}