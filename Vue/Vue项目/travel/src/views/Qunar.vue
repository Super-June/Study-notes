<template>
    <div class="Quner-content">
        <HomeHeader></HomeHeader>
        <HomeSwiper></HomeSwiper>
        <HomeIcons></HomeIcons>
    </div>
</template>

<script>
    import HomeHeader from '@/components/Qunar/Home/Header'
    import HomeSwiper from '@/components/Qunar/Home/Swiper'
    import HomeIcons from '@/components/Qunar/Home/Icons'
    export default {
        data(){
            return {}
        },
        components: {
            HomeHeader,
            HomeSwiper,
            HomeIcons
        }
    }
</script>