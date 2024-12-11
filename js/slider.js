var $Links = $(".itemLinks");
var initialTouchX, initialTouchY, finalTouchX, finalTouchY;
var swipeThreshold = 100;

$Links.click(function (e) {
    $Links.removeClass("active");
    var clickedLink = e.target;
    clickedLink = $(clickedLink);
    var position = clickedLink.attr("data-pos");
    var translateValue = "translate(" + position * 25 + "%)";

    $(".wrapper").css({
        transform: translateValue,
    });

    clickedLink.addClass("active");
});

$($Links[0]).addClass("active");

function prevBtnFunc() {
    var currentActive = $(".active");
    var prevActive = currentActive.next();
    if (prevActive.length == 0) {
        prevActive = $Links.first();
    }
    prevActive.addClass("active");
    currentActive.removeClass("active");
    var position = prevActive.attr("data-pos");
    var translateValue = "translate(" + position * 25 + "%)";
    $(".wrapper").css({
        transform: translateValue,
    });
}

function nextBtnFunc() {
    var currentActive = $(".active");
    var nextActive = currentActive.prev();
    if (nextActive.length == 0) {
        nextActive = $Links.last();
    }
    nextActive.addClass("active");
    currentActive.removeClass("active");
    console.log("nextActive", nextActive.attr("data-pos"));
    var position = nextActive.attr("data-pos");
    var translateValue = "translate(" + position * 25 + "%)";
    $(".wrapper").css({
        transform: translateValue,
    });
}

function handleTouch(startX, endX, onSwipeLeft, onSwipeRight) {
    let horizontalDistance = finalTouchX - initialTouchX;
    let verticalDistance = finalTouchY - initialTouchY;

    if (
        Math.abs(horizontalDistance) > Math.abs(verticalDistance) &&
        Math.abs(horizontalDistance) > swipeThreshold
    ) {
        if (finalTouchX - initialTouchX < 0) {
            onSwipeLeft();
        } else {
            onSwipeRight();
        }
    }
}

window.onload = function () {
    window.addEventListener("touchstart", function (event) {
        initialTouchX = event.touches[0].clientX;
        initialTouchY = event.touches[0].clientY;
    });

    window.addEventListener("touchend", function (event) {
        finalTouchX = event.changedTouches[0].clientX;
        finalTouchY = event.changedTouches[0].clientY;

        handleTouch(initialTouchX, finalTouchX, nextBtnFunc, prevBtnFunc);
    });
};
