require.config({
	urlArgs: "_=" + (new Date()).getTime(),
	baseUrl: "js",
	paths: {
		jquery: "../js/lib/jquery",
		underscore: "../js/lib/underscore",
		backbone: "../js/lib/backbone",
		Connector: "../js/lib/Connector",
		FnQuery: "../js/lib/FnQuery",
		"socket.io": "../js/lib/socket.io"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		"socket.io": {
			exports: "io"
		}
	}
});


require(['../js/lib/Connector.js'], function(Connector) {

	if (!window.DeviceMotionEvent || !window.DeviceOrientationEvent) {
		alert('Not supported');
	} else {


		window.addEventListener("devicemotion", motion, false);
		window.addEventListener('orientationchange', changeOrient);
		window.addEventListener('touchstart', touch);

		var message = document.getElementById('message');
		var input = document.getElementById('token');
		var start, init, reconnect;



		// Создаем связь с сервером
		var server = new Connector({
			server: ['bind'],
			remote: '/player'
		});



		// Инициализация
		init = function() {

			var self = this;


			$('#restart').click(function() {
				self.server.send({
					type: 'restart'
				})
			})

			message.innerHTML = 'ready';
			// Если id нет
			if (!localStorage.getItem('playerguid')) {
				// Ждем ввода токена
				input.parentNode.addEventListener('submit', function(e) {
					e.preventDefault();

					// И отправляем его на сервер
					server.bind({
						token: input.value
					}, function(data) {
						if (data.status == 'success') { //  В случае успеха
							// Стартуем джостик
							start(data.guid);
						}
					});
				}, false);

			} else { // иначе
				// переподключаемся к уже созданной связке
				reconnect();
			}
		};

		// Переподключение
		// Используем сохранненный id связки
		reconnect = function() {
			server.bind({
				guid: localStorage.getItem('playerguid')
			}, function(data) {
				// Если все ок
				if (data.status == 'success') {
					// Стартуем
					start(data.guid);
					// Если связки уже нет
				} else if (data.status == 'undefined guid') {
					// Начинаем все заново
					localStorage.removeItem('playerguid');
					init();
				}
			});
		};

		function changeOrient() {
			//if (window.orientation % 90 == 0) {
			server.send({
				type: 'orient',
				angle: window.orientation
			});
			/*} else {
            server.send({
            	type: 'orient',
                angle = window.orientation
            });
        }*/
		};

		function motion(evt) {
			//var xSpeed =  evt.acceleration.x;
			//var ySpeed = -evt.acceleration.y;
			server.send({
				type: 'orient',
				angle: window.orientation
			}, function(answer) {
				server.send({
					type: 'rotate',
					alpha: evt.rotationRate.alpha,
					beta: evt.rotationRate.beta,
					gamma: evt.rotationRate.gamma
				});

			});

			//console.log(alpha,betta,gamma);
		};

		function touch(evt) {
			server.send({
				type: 'touch',

			});
			//console.log(alpha,betta,gamma);
		};

		// Старт игры
		start = function(guid) {
			console.log('start player');
			// Сохраняем id связки
			localStorage.setItem('playerguid', guid);
			message.innerHTML = 'game';
		};



		server.on('reconnect', reconnect);

		init();

		// Обмен сообщениями
		server.on('message', function(data, answer) {

			if (data.type == 'gameover') {
				// TODO показываем очки и форму ввода имени на клиенте
			}

			answer(data);
		});

		window.server = server;
	}
	/*
	server.send('message', function(answer){
		console.log(answer);
	});
	*/
});