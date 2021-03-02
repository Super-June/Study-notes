<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加分类按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateList">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 分类列表 -->
      <el-table
        :data="cateList"
        width="100%"
        border
        row-key="cat_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column label="#" width="50" type="index"></el-table-column>
        <el-table-column label="分类名称" prop="cat_name"></el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <i
              class="iconfont el-icon-success"
              style="color: #409eff"
              v-if="scope.row.cat_deleted"
            ></i>
            <i class="iconfont el-icon-error" style="color: #f56c6c" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 1">
              二级
            </el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="small">
              编辑
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      @close="addCateDialogClosed"
      width="50%"
    >
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            :options="parentCateList"
            :props="parentCateProps"
            v-model="selectedKeys"
            @change="parentCateChanged"
            clearable
            change-on-select
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类数据列表
      cateList: [],
      // 总数据页数
      total: 0,
      // 添加分类对话框开启/关闭
      addCateDialogVisible: false,
      // 添加分类表单数据
      addCateForm: {
        // 分类名称
        cat_name: '',
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0
      },
      // 添加分类表单验证
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 父级分类存储数据
      parentCateList: [],
      // 父级分类联动选择器配置
      parentCateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 选中的父级分类的Id数组
      selectedKeys: []
    }
  },
  created() {
    this.getCataList()
  },
  methods: {
    // 获取商品数据分类
    async getCataList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      // 判断是否成功
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 表格需要渲染的数据
      this.cateList = res.data.result
      // 总数据页数
      this.total = res.data.total
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      // 跳转页码赋值
      this.queryInfo.pagesize = newSize
      // 从新请求刷新数据
      this.getCataList()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newCurrent) {
      // 将新页码赋值
      this.queryInfo.pagenum = newCurrent
      // 从新请求刷新数据
      this.getCataList()
    },
    // 添加分类
    addCateList() {
      // 调用 获取父级分类
      this.getParentCateList()
      // 打开添加分类对话框
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.parentCateList = res.data
    },
    // 选择项发生变化触发这个函数
    parentCateChanged() {
      console.log(this.selectedKeys)
      // 判断是否选择父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类Id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        // 分类的等级
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        // 父级分类Id
        this.addCateForm.cat_pid = 0
        // 分类的等级
        this.addCateForm.cat_level = 0
      }
    },
    // 点击确认 添加分类对话框
    addCate() {
      console.log(this.addCateForm)
      // 判断校验是否成功
      this.$refs.addCateRef.validate(async valid => {
        if (!valid) return this.$message.error('信息填写错误')
        const { data: res } = await this.$http.post(
          'categories',
          this.addCateForm
        )
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        // 提示创建成功
        this.$message.success(res.meta.msg)
        // 从新刷新数据
        this.getCataList()
        // 关闭对话框
        this.addCateDialogVisible = false
      })
    },
    // 重置添加分类对话框
    addCateDialogClosed() {
      // 重置表单
      this.$refs.addCateRef.resetFields()
      // 重置父级分类
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    }
  }
}
</script>

<style lang="less" scoped></style>
