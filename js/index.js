let index = 0;
const length = document.getElementsByClassName("slider-image").length;

let slide = change => {
    const width = $(".slider").width();

    index += change;

    if (index < 0) {
        index = length - 1;
    }
    else if (index > length - 1) {
        index = 0;
    }

    $(".slider-image-wrapper").animate({
        left: -width * index
    }, 1200);
};

$('#previous-button').click(() => {
    slide(-1);
});

$('#next-button').click(() => {
    slide(1);
});