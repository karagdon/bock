(function() {
    //The ID for the Bock home page
    var homePageId = "homePage";

    //The ID of the Page the user is currently looking at
    var pageHistory = [];

    //A map of PageID's -> PageInfo
    //e.g { "homePage":{ title:"Bock" }}
    var pages = {};

    /**
     * Setup the bock namespace
     * All public bock functions should be exposed in this interface
     */
    if (window.bock === undefined) {
        window.bock = {};
    }

    /**
     * Setup the bock UI namespace
     * All public bock functions related to it's UI should live here
     */
    if (window.bock.ui === undefined) {
        window.bock.ui = {};
    }

    /**
     * Initializes the Bock application
     */
    window.bock.ui.init = function() {
        createHomePage();
        downloadGameData();
    }

    /**
     * Downloads the Bock database
     */
    function downloadGameData() {
        console.log("Downloading games from database");
        var downloadRequest = new XMLHttpRequest();
        downloadRequest.onload = function() {
            processGameData(downloadRequest.responseText);
        }
        downloadRequest.open("GET", "database.txt", true);
        downloadRequest.send();
    }

    /**
     * Parses the JSON String for the Bock database
     * @param gameDataJsonString JSON formatted string
     *        containing all the Bock information
     */
    function processGameData(gameDataJsonString) {
        console.log("Processing Game Database: ");
        var bockData = JSON.parse(gameDataJsonString);
        for (var gameId in bockData.games) {
            var game = bockData.games[gameId];
            addGame(gameId, game);
        }
    }

    /**
     * Adds a game to the application
     * @param gameId The string ID for a game.
     * @param game A game object which contains
     *        information about a game.
     */
    function addGame(gameId, game) {
        createGameMenuItem(gameId, game);
        createGamePage(gameId, game);
    }

    /**
     * Creates a list item representing a game
     * in the Game List
     * @param gameId The string ID for a game.
     * @param game A game object which contains
     *        information about a game.
     */
    function createGameMenuItem(gameId, game) {
        $("#gameListMenu").append("<li class='menuItem clickable' onclick='window.bock.ui.changePage(\"" + gameId + "\");'>" + game.title + "</li>");
    }

    /**
     * Create the page which will contain all the content
     * for a particular game
     * @param gameId The string ID for a game.
     * @param game A game object which contains
     *        information about a game.
     */
    function createGamePage(gameId, game) {
        createPage(gameId, game.title);
        $("#"+gameId).append("<ul id='" + getGamePageTimerListId(gameId) + "' class='menu' ></ul>");
        loadTimers(gameId, game);
    }

    /**
     * Create a list item representing a Bock Timer
     * for a particular event in the given game
     * @param gameId The string ID for a game.
     */
    function getGamePageTimerListId(gameId) {
        return gameId + "Timers";
    }

    /**
     * Loads all the Timers for the given game.
     * @param gameId The string ID for a game.
     * @param game A game object which contains
     *        information about a game.
     */
    function loadTimers(gameId, game) {
        var timers = game.timers;
        for (var timerId in timers) {
            var timer = timers[timerId];
            createTimerMenuItem(gameId, timerId, timer);
            createTimerPage(timerId, timer);
        }
    }

    /**
     * Creates a list item representing a timer
     * for the given timer in the given game.
     * @param gameId The string ID for a game.
     * @param timerId The string ID for a timer.
     * @param timer An object containing information
     *        about a particular timer.
     */
    function createTimerMenuItem(gameId, timerId, timer) {
        $("#" + getGamePageTimerListId(gameId)).append("<li class='menuItem clickable' onclick='window.bock.ui.changePage(\"" + timerId + "\");'>" + timer.title + "</li>");
    }

    /**
     * Creates a page for displaying a timer
     * @param timerId The string ID for a timer.
     * @param timer An object containing information
     *        about a particular timer.
     */
    function createTimerPage(timerId, timer) {
        createPage(timerId, timer.title);
    }

    /**
     * Handles the event when the user presses the Back
     * button in the UI
     */
    var onBackButtonPress = function() {
        //If there are at least two pages, go back to the previous page
        if (pageHistory.length > 1) {
            changePage(pageHistory[pageHistory.length - 2]);
        }
    }

    window.bock.ui.onBackButtonPress = onBackButtonPress;

    /**
     * Changes the currently displayed page to the 
     * given page
     * @param pageId The ID of the page to display
     */
    var changePage = function(pageId) {
        var historyIndex = pageHistory.indexOf(pageId);
        var currentPageId = pageHistory[pageHistory.length -1];

        //If we haven't seen this page yet, add it to the end of our history.
        //Otherwise chop of the end of history except for the page we are going to.
        if (historyIndex === -1) {
            pageHistory.push(pageId);
        } else {
            pageHistory = pageHistory.splice(0, historyIndex + 1);
        }

        updateHeader();
        $("#"+currentPageId).css("display", "none");
        $("#"+pageId).css("display", "block");
    }

    window.bock.ui.changePage = changePage;

    /**
     * Creates an empty page using the given ID and title.
     * @param pageId The ID to use for this page.
     * @param title The title to display when this page is visible
     */
    function createPage(pageId, title) {
        var page = {"title":title};
        pages[pageId] = page;
        $("#content").append("<div id='" + pageId + "' class='contentPage'></div>");
    }

    /**
     * Helper function to update Bock header whenever
     * the page has changed
     */
    function updateHeader() {
        var currentPageId = pageHistory[pageHistory.length-1];
        var currentPage = pages[currentPageId];
        $("#currentPage").text(currentPage.title);
    }

    /**
     * Helper function to generate the homepage for the 
     * Bock application
     */
    function createHomePage() {
        createPage(homePageId, "Bock");
        $("#homePage").append("<ul id='gameListMenu' class='menu'></ul>");
        changePage(homePageId);
    }
})();
