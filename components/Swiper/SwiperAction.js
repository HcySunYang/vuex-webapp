import Swiper from 'tool/lib/swiper.min'

let sObj = null;
export const setImageData = function({dispatch}, data){
    // alert('add')
    dispatch('SET_IMAGE_DATA', data);
    if(sObj){
        sObj.destroy();
    }
    setTimeout(function(){
    	sObj = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        spaceBetween: 0,
	        centeredSlides: true,
	        // autoplay: t.imgNum == 1 ? 0 : 2500,
	        autoplay: 2500,
	        autoplayDisableOnInteraction: false,
	        loop : true
	    });
	    dispatch('SET_SWIPEROBJ', sObj);
    }, 100);
    
}

