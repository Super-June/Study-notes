// 用来存放 constructor的this 
let _this

class Tab {
  constructor(id) {
    _this = this
    // 获取元素
    this.main = document.querySelector(id)
    this.add = this.main.querySelector('.tabadd')
    this.uls = this.main.querySelector('.fisrstnav ul')
    this.tabscon = this.main.querySelector('.tabscon')
    this.init()
  }
  init() {
    this.updateNode()
    // 添加切换事件
    this.lis.forEach((item, index) => {
      // 将下边存入item
      item.index = index
      item.onclick = this.toggleTab
      // 删除事件
      this.remove[index].onclick = this.removeTab
      // 编辑事件
      this.sapns[index].ondblclick = this.editTab
      this.sections[index].ondblclick = this.editTab
    })
    // 添加标签事件
    this.add.onclick = this.addTab
  }
  // 获取 li 和 section
  updateNode() {
    this.lis = this.main.querySelectorAll('.fisrstnav li')
    this.sections = this.main.querySelectorAll('.tabscon section')
    this.remove = this.main.querySelectorAll('.fisrstnav .icon-guanbi')
    this.sapns = this.main.querySelectorAll('.fisrstnav li span:first-child')
  }
  // 1.切换功能
  toggleTab() {
    // 清除其他的class
    _this.clearClass()
    // 添加class
    this.className = 'liactive'
    _this.sections[this.index].className = 'conactive'
  }
  // 清除 class
  clearClass() {
    this.lis.forEach((item,index) => {
      item.classList.remove('liactive')
      this.sections[index].classList.remove('conactive')
    })
  }
  // 2. 添加功能
  addTab() {
    // 清除clss
    _this.clearClass()
    // 创建li
    let li = `<li class="liactive"><span>测试${_this.lis.length + 1}</span><span class="iconfont icon-guanbi"></span></li>`
    // 追加到父元素里面
    _this.uls.insertAdjacentHTML('beforeend', li)
    let section = `<section class="conactive">测试${_this.lis.length + 1}</section>`
    _this.tabscon.insertAdjacentHTML('beforeend', section)
    // 更新 获取li 和 section
    _this.init()
  }
  // 3.删除功能
  removeTab(event) {
    // 阻止事件冒泡
    event.stopPropagation()
    // 获取下标
    let index = this.parentNode.index
    // remove()方法可以直接删除指定的元素 删除自身
    _this.lis[index].remove()
    _this.sections[index].remove()
    // 更新获取元素
    _this.init()
    // 判断当前有没有选择状态
    if (document.querySelector('.liactive')) return
    // 删除当前选中后自动选择上一个 (判断是不是删除第一个) 
    index === 0 ? index : index--
    // click() 自动点击 没有标签不执行这段
    _this.lis[index] && _this.lis[index].click()
  }
  // 4.修改功能
  editTab() {
    // 取消双击选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty()
    // 添加文本框 并 添加选中的内容
    this.innerHTML = `<input type="text" value="${this.innerText}" >`
    // 获取文本框
    let input = this.children[0]
    // 文本框选定状态
    input.select()
    // 失去焦点
    input.onblur = function () {
      this.parentNode.innerHTML = input.value
    }
    // 回车
    input.onkeyup = function (event) {
      if (event.keyCode === 13) this.blur()
    }
  }
}

new Tab('#tab')