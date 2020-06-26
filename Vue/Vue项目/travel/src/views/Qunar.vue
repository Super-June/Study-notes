<template>
    <div class="Quner-content">
        <Header></Header>
        <Swiper></Swiper>
        <Icons></Icons>
    </div>
</template>

<script>
    import Header from '@/components/Qunar/Header'
    import Swiper from '@/components/Qunar/Swiper'
    import Icons from '@/components/Qunar/Icons'
    export default {
        data(){
            return {}
        },
        components: {
            Header,
            Swiper,
            Icons
        }
    }
</script>