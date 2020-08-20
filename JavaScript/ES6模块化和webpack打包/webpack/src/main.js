import $ from 'jquery'
// 引入样式表
import './css/main.css'
import  './css/less-main.less'
import './css/sass-main.scss'

$(function () {
    $('li:odd').css('backgroundColor', 'pink')
    $('li:even').css('backgroundColor', 'lightblue')
})

class Person{
    static info = '我是class类'
}

console.log(Person.info)

// =============  Vue  =============
import Vue from 'vue'
// 导入单文件组件
import App from './components/App.vue'

const vm = new Vue({
    el: '#app',
    render: h => h(App)
})
