<template>
    <div>
        <CityHeader>城市选择</CityHeader>
        <CitySearch :cities="cities"></CitySearch>
        <CityList :hotCities="hotCities" :cities="cities"></CityList>
    </div>
</template>

<script>
    import CityHeader from './components/Header'
    import CitySearch from './components/Search'
    import CityList from './components/List'

    export default {
		name: "City",
        components: {
            CityHeader,
            CitySearch,
            CityList
        },
        data() {
            return {
                hotCities: [],
                cities: {}
            }
        },
        methods: {
            getCityData () {
                this.$http.get('/api/city.json').then( res => {
                    const data = res.data.data;
                    if (data != null){
                        this.hotCities = data.hotCities;
                        this.cities = data.cities;
                    }
                })
            }
        },
        created() {
            // 获取city数据
            this.getCityData()
        }
    }
</script>