var $$ = Dom7;

// Initialize app
var app = new Framework7({
  root: '#app', 
  name: 'My App',
  id: 'com.myapp.test',
  panel: {
    swipe: 'left',
  },

  routes: [
    {
      name: 'pgIndex',
      path: '/index/',
      url: 'index.html',
    },
    {
      path: '/home/',
      url: 'paginas/home.html',
    },
    {
      name: 'pgLogin',
      path: '/login/',
      url: 'paginas/login/login.html',
    },
    {
      path: '/about/',
      url: 'paginas/about.html',
    },
	{
      path: '/comunicado/',
      url: 'paginas/comunicado/comunicado.html',
    },
	{
      path: '/pet/',
      url: 'paginas/pet/pet.html',
    },
	{
      path: '/perfil_pet/',
      url: 'paginas/pet/pet_perfil.html',
    },
	{
      path: '/pet_cadastro/',
      url: 'paginas/pet/pet_cadastro.html',
    },
	{
      path: '/ocorrencia/',
      url: 'paginas/ocorrencia/ocorrencia.html',
    },
	  
    {
      path: '/areacomum/',
      url: 'paginas/areacomum/areacomum.html',
    },
    {
      path: '/minha_reserva/',
      url: 'paginas/areacomum/minha_reserva.html',
    },
    {
      path: '/documentos/',
      url: 'paginas/documentos/documentos.html',
    },
	  {
      path: '/entregas/',
      url: 'paginas/entregas/entregas.html',
    },
    {
      path: '/liberacao/',
      url: 'paginas/liberacao/liberacao.html',
    }, 
	  {
      path: '/chat/',
      url: 'paginas/chat/chat.html',
    },
	  {
      path: '/chat1/',
      url: 'paginas/chat/conversa.html',
    },
	  {
      path: '/perfil/',
      url: 'paginas/perfil/perfil.html',
    },
	  {
      path: '/perfil_editar/',
      url: 'paginas/perfil/editar_perfil.html',
    },
	  {
      path: '/perfil_editar2/',
      url: 'paginas/perfil/editar_perfil2.html',
    },
	  {
      path: '/perfil_editar3/',
      url: 'paginas/perfil/editar_perfil3.html',
    },
    {
      path: '/lib_1/',
      url: 'paginas/liberacao/liberacao_passo1.html',
    },
    {
      path: '/lib_2/',
      url: 'paginas/liberacao/liberacao_passo2.html',
    },
    {
      path: '/lib_3/',
      url: 'paginas/liberacao/liberacao_passo3.html',
    },
    { 
      name: 'pgRecebeEmailToGetCode',
      path: '/activationcode/',
      url: 'paginas/login/gerar_codigo_ativacao.html',
    },
    { 
      name: 'pgValidaCodigo',
      path: '/receveAtivationCode/',
      url: 'paginas/login/validar_codigo_ativacao.html',
    },
    { 
      name: 'pgTermoUso',
      path: '/termo_de_uso/',
      url: 'paginas/login/termo.html',
    },
    { 
      name: 'pgDefineSenha',
      path: '/define_senha/',
      url: 'paginas/login/defineSenha.html',
    },
    {
      path: '/lib_acessos/',
      url: 'paginas/liberacao/liberacao_acessos.html',
    },
  ],
});

var $$ = Dom7;
var mainView = app.views.create('.view-main');
const SERVIDOR_CAMINHO = 'https://old.controlcondo.com.br/controlcondo/v2/'; // teste
// const SERVIDOR_CAMINHO = 'https://controlcondo.com.br/controlcondo/v2/'; // producao
localStorage.setItem('DOMINIO', SERVIDOR_CAMINHO);

var app2 = {
	escondeTeclado: function(){
		Keyboard.hide();
	},
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
    login_user_device();
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
        // atualiza_notificacao();
        // var titulo_notifica = data.title;
        // localStorage.setItem("NOT_ID"  ,data.additionalData.id_ref);
        // localStorage.setItem("NOT_TYPE",data.additionalData.tipo);
        // localStorage.setItem("NOT_COND",data.additionalData.condominio);
        // localStorage.setItem("NOT_TITULO",data.title);
        // localStorage.setItem("NOT_TEXTO",data.message);
        // console.log('notification event');

        // if($( "#DADOS #ID_CONDOMINIO" ).val() == ''){
        //    $( "#DADOS #ID_CONDOMINIO" ).val(localStorage.getItem("NOT_COND"));
        //    window.setTimeout(function() {
        //        perfil_notificacao(localStorage.getItem("NOT_COND"));
        //    },800);
        // }


        // if(localStorage.getItem("NOT_COND") == $( "#DADOS #ID_CONDOMINIO" ).val() ){

        //    if(titulo_notifica == 'Chat'){
        //        if(localStorage.getItem('TELA_ATUAL') == 'chat'){
        //            carrega_msg_eviadas($( "#DADOS #ID_USER" ).val(), $( "#DADOS #CHAT_USER" ).val());
        //        }
        //        if(localStorage.getItem('TELA_ATUAL')=='chat_msg'){
        //            carrega_chat();
        //        }
        //    }
        //    if(localStorage.getItem('TELA_ATUAL') != 'chat'){
        //        if(localStorage.getItem('TELA_ATUAL') != 'chat_msg'){

        //            if(localStorage.getItem("NOT_TYPE") == 123){

        //                var val_confg = localStorage.getItem("NOT_ID").split(';');

        //                localStorage.setItem('MMORADOR',val_confg[2]);
        //                localStorage.setItem('MFPERFIL',val_confg[3]);
        //                localStorage.setItem('MVEICULOS',val_confg[4]);
        //                localStorage.setItem('MCONTATOS',val_confg[5]);
        //                $( "#DADOS #MCOMUNICADOS" ).val(val_confg[6]);
        //                $( "#DADOS #MLUNICA" ).val(val_confg[7]);
        //                $( "#DADOS #MLRECORRENTE" ).val(val_confg[8]);
        //                $( "#DADOS #MRESERVA" ).val(val_confg[9]);
        //                $( "#DADOS #MENTREGAS" ).val(val_confg[10]);
        //                $( "#DADOS #MFALE" ).val(val_confg[11]);
        //                $( "#DADOS #MENQUENTE" ).val(val_confg[12]);
        //                $( "#DADOS #MDOCUMENTOS" ).val(val_confg[13]);
        //                $( "#DADOS #MRELATORIOS" ).val(val_confg[14]);
        //                localStorage.setItem('MOCORRENCIA',val_confg[15]);
        //                localStorage.setItem('MPET',val_confg[16]);
        //                localStorage.setItem('MCAM',val_confg[17]);
        //                localStorage.setItem('MMUDANCA',val_confg[18]);
        //                localStorage.setItem('MAGENDA',val_confg[19]);
        //                //localStorage.setItem('MMUDANCA',retorno[0]['MMUDANCA']);
        // //                                if($( "#DADOS #MCOMUNICADOS" ).val() == 1){ afed('#menu_comunicado','','','',3); }else{ afed('','#menu_comunicado','','',3); } 
        // //                                if($( "#DADOS #MLUNICA" ).val() == 1){ afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3); }else{ afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); } 
        // //                                if($( "#DADOS #MRESERVA" ).val() == 1){ afed('#menu_area','','','',3); }else{ afed('','#menu_area','','',3); } 
        // //                                if($( "#DADOS #MENTREGAS" ).val() == 1){ afed('#menu_entregas','','','',3); }else{ afed('','#menu_entregas','','',3); } 
        // //                                //if($( "#DADOS #MFALE" ).val() == 1){  afed('','','','',3); }else{ afed('','','','',3); } 
        // //                                if($( "#DADOS #MENQUENTE" ).val() == 1){ afed('#menu_enquete','','','',3); }else{ afed('','#menu_enquete','','',3); } 
        // //                                if($( "#DADOS #MDOCUMENTOS" ).val() == 1){ afed('#menu_documentos','','','',3); }else{ afed('','#menu_documentos','','',3); } 
        // //                                if(localStorage.getItem('MOCORRENCIA') == 1){ afed('#menu_ocorrencia','','','',3); }else{ afed('','#menu_ocorrencia','','',3); } 
        // //                                if(localStorage.getItem('MPET') == 1){ afed('#menu_pet','','','',3); }else{ afed('','#menu_pet','','',3); }
        //                if($( "#DADOS #MCOMUNICADOS" ).val() == 1){ afed('#menu_comunicado','','','',3); }else{ afed('','#menu_comunicado','','',3); } 
        //                if($( "#DADOS #MLUNICA" ).val() == 1){ afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3); }else{ afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); } 
        //                if($( "#DADOS #MRESERVA" ).val() == 1){ afed('#menu_area','','','',3); }else{ afed('','#menu_area','','',3); } 
        //                if($( "#DADOS #MENTREGAS" ).val() == 1){ afed('#menu_entregas','','','',3); }else{ afed('','#menu_entregas','','',3); } 
        //                if($( "#DADOS #MFALE" ).val() == 1){  afed('','','','',3); }else{ afed('','','','',3); } 
        //                if($( "#DADOS #MENQUENTE" ).val() == 1){ afed('#menu_enquete','','','',3); }else{ afed('','#menu_enquete','','',3); } 
        //                if($( "#DADOS #MDOCUMENTOS" ).val() == 1){ afed('#menu_documentos','','','',3); }else{ afed('','#menu_documentos','','',3); } 
        //                if(localStorage.getItem('MOCORRENCIA') == 1){ afed('#menu_ocorrencia','','','',3); }else{ afed('','#menu_ocorrencia','','',3); } 
        //                if(localStorage.getItem('MPET') == 1){ afed('#menu_pet','','','',3); }else{ afed('','#menu_pet','','',3); }    
        //                if(localStorage.getItem('MCAM') == 1){ afed('#menu_cameras','','','',3); }else{ afed('','#menu_cameras','','',3); }
        //                if(localStorage.getItem('MMUDANCA') == 1){ afed('#menu_mudanca','','','',3); }else{ afed('','#menu_mudanca','','',3); }
        //                if(localStorage.getItem('MAGENDA') == 1){ afed('#menu_agenda','','','',3); }else{ afed('','#menu_agenda','','',3); }

        //            }else if(localStorage.getItem("NOT_TYPE") == 666){
        //                logout();
        //            }else{
        //                openNotificacao(localStorage.getItem("NOT_TYPE"),data.title,'',data.message);
        //            }

        //        }
        //    }  

        // }else{
        //    navigator.notification.confirm(
        //        'Voce recebeu uma Notificação de outro condominio. Deseja trocar de condominio?',         // message
        //        onConfirm_condo,            // callback
        //        'Trocar de Condominio',
        //        ['Sim','Nao']  // buttonName
        //        );
        // }
      }); 		
		
  		push.on('error', function(e) { 
  			alert(e); 
  		});
    }
  }



  var messages = app.messages.create({
    el: '.messages',
    firstMessageRule: function (message, previousMessage, nextMessage) {
      if (message.isTitle) return false;
      if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
      return false;
    },
    lastMessageRule: function (message, previousMessage, nextMessage) {
      if (message.isTitle) return false;
      if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
      return false;
    },
    tailMessageRule: function (message, previousMessage, nextMessage) {
      if (message.isTitle) return false;
      if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
      return false;
    }
  });

  // Init Messagebar
  var messagebar = app.messagebar.create({
    el: '.messagebar'
  });

  var responseInProgress = false;
  $$('.send-link').on('click', function () {
    var text = messagebar.getValue().replace(/\n/g, '<br>').trim();
    if (!text.length) return;
    messagebar.clear();
    messagebar.focus();
    messages.addMessage({
      text: text,
    });

    if (responseInProgress) return;
    receiveMessage();
  });

  // Dummy response
  var answers = [
    'Yes!',
    'No',
    'Hm...',
    'I am not sure',
    'And what about you?',
    'May be ;)',
    'Lorem ipsum dolor sit amet, consectetur',
    'What?',
    'Are you sure?',
    'Of course',
    'Need to think about it',
    'Amazing!!!'
  ]

  var people = [
    {
      name: 'Kate Johnson',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg'
    },
    {
      name: 'Blue Ninja',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg'
    }
  ];

  function receiveMessage() {
    responseInProgress = true;
    setTimeout(function () {
      var answer = answers[Math.floor(Math.random() * answers.length)];
      var person = people[Math.floor(Math.random() * people.length)];

      messages.showTyping({
        header: person.name + ' is typing',
        avatar: person.avatar
      });

      setTimeout(function () {
        messages.addMessage({
          text: answer,
          type: 'received',
          name: person.name,
          avatar: person.avatar
        });
        messages.hideTyping();
        responseInProgress = false;
      }, 4000);
    }, 1000);
  }
