(function () {

    var width, height, largeHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height + 'px';
    }

    // Event handling
    function addListeners() {
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
    }

})();