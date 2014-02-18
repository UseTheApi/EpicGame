var $page = $('#page');
var currentPage = 'main';
showMainScreen();
        function showScoreboardScreen() {
            hideMainScreen();
            $page.html(scoreboardTmpl()); // Рендерим шаблон
            $page.find('#js-back-main').on('click', showMainScreen);
            currentPage = 'scoreboard';
        }
        function showMainScreen() { // Конструктор экрана "Главный" 
            if(currentPage === 'scoreboard')
                hideScoreboardScreen();
            else if(currentPage === 'game')
                hideGameScreen();
            $page.html(mainTmpl()); // Рендерим шаблон
            currentPage = 'main';
            // Инициализируем обработчики событий
            $page.find('#js-scoreboard').on('click', showScoreboardScreen);
            $page.find('#js-start-game').on('click', showGameScreen);
        }
        function showGameScreen() { // Конструктор экрана game 
            hideMainScreen();
            $page.html(gameTmpl());
            currentPage = 'game';
            $page.find('#js-back-main').on('click', showMainScreen);

        }
        function hideMainScreen() { // Деструктор экрана "Главный"
            // Удаляем установленные обработчики событий
            $page.find('#js-scoreboard').off('click', showScoreboardScreen);
            $page.find('#js-start-game').off('click', showGameScreen);
        }
/* Деструктор экрана "Лучшие игроки" */
        function hideScoreboardScreen() { 
            $page.find('#js-back-main').off('click', showMainScreen);
        }
          function hideGameScreen() { 
            $page.find('#js-back-main').off('click', showMainScreen);
        }

