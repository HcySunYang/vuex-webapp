<template>
    <!-- Swiper -->
    <div class="swiper-container" id="swiper-container">
        <div class="swiper-wrapper">
            <div class="slide swiper-slide" v-for="item in getImageData" track-by="id">
                <a href="doumi://browser/{{item.url}}">
                    <img class="js-slider-img" data-imgid="{{item.id}}" v-bind:src="item.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    /**
     *  引入工具类库 或 模块API
     */
    // import Swiper from 'tool/lib/swiper.min'
    // import KCwidget from 'clientApi/KCwidget'

    /**
     *  引入Action
     */

    /**
     *  引入Getter
     */
    import { getImageData, getSwiperObj } from './SwiperGetters'

    export default {
        vuex: {
            getters: {
                getImageData,
                getSwiperObj
            }
        },
        data (){
            return {
                sObj : null
            }
        },
        methods: {
            mountingWindow (){
                var self = this;
                window.renderFocusImg = function(){
                    self.getSwiperObj.slideNext();
                };
            }
        },
        created (){
            this.mountingWindow();
        },
        ready(){

            var self = this;

            var slideHeight = $(window).width() * 290 / 750;

            $('.swiper-wrapper').css({height: slideHeight + 'px'});
            
        }
        
    }

    
</script>

<style src="static/css/swiper.min.css"></style>
<style>
    #swiper-container{
        /*position: absolute;*/
        width: 100%;
    }
    .js-slider-img{
        width: 100%;
    }
    .slide img{
        display: block;
    }
    .swiper-container .swiper-pagination-bullet{
        width: 6px;
        height: 6px;
    }
    .swiper-container .swiper-pagination-bullet-active{
        width: 6px;
        height: 6px;
        background: rgba(255, 204, 0, 1);
    }
    #swiper-container .swiper-pagination-bullet{
        margin: 0 2px;
    }
    #swiper-container .swiper-pagination{
        height: 12px;
    }
</style>
