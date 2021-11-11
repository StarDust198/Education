import MainSlider from "./modules/slider/slider-main";
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Forms from './modules/forms';
import Accordion from './modules/accordion';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    const mainSlider = new MainSlider({ container: '.page', btns: '.next' });
    mainSlider.render();

    const modulesPageSlider = new MainSlider({
        container: '.moduleapp',
        btns: 'a.next',
        next: '.nextmodule',
        prev: '.prevmodule'
    });
    modulesPageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    new Difference('.officerold', '.officer__card-item').init();
    new Difference('.officernew', '.officer__card-item').init();

    new Forms('.form').init();
    new Accordion('.module__info-show > .plus').init();

    new Download('.download', '/assets/img/bitmap.jpg').init();
});