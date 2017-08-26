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

        particleground(largeHeader, {
            dotColor: '#fff',
            lineColor: '#555555',
            particleRadius: 6,
            curveLines: true,
            density: 9000,
            proximity: 100
        });
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