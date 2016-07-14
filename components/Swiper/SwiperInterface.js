
const state = {
    imageData : {},
    swiperObj : null
}

// mutations
const mutations = {
    SET_IMAGE_DATA (state, data) {
        state.imageData = data;
    },
    SET_SWIPEROBJ (state, obj){
        state.swiperObj = obj;
    }
}

export default {
    state,
    mutations
}