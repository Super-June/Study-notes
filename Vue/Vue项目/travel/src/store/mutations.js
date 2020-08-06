export default {
    // 点击更换城市
    setCity(state, city) {
        localStorage.city = city;
        state.city = city
    }
}