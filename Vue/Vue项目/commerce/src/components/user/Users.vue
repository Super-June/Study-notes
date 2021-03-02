<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="card-wrapper">
      <!-- 搜索和添加用户 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUsersBtn">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="usersList.users" border stripe style="width: 100%">
        <el-table-column label="#" type="index" width="50"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="switchStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="openModify(scope.row.id)"
            >
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteUser(scope.row.id)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="small"
                @click="handleAssign(scope.row)"
              >
                <i class="el-icon-setting"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :pager-count="5"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <!-- 修改用户信息对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="assignDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="assignOptionsId" placeholder="请选择">
            <el-option
              v-for="item in assignOptions"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRoleInfo">
          确定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    // 自定义表单验证
    // 邮箱验证
    const mailboxRules = (rule, value, callback) => {
      const reg = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/
      if (reg.test(value)) return callback()
      callback(new Error('邮箱格式错误'))
    }
    // 手机号码验证
    const phoneRules = (rule, value, callback) => {
      const reg = /^[1][35678][0-9]{9}$/
      if (reg.test(value)) return callback()
      callback(new Error('手机号码格式错误'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5
      },
      usersList: [],
      total: 0,
      // 控制对话框显示隐藏
      addDialogVisible: false,
      // 添加用户数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: mailboxRules, trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          { validator: phoneRules, trigger: 'blur' }
        ]
      },
      // 修改用户信息对话框 显示 隐藏
      editDialogVisible: false,
      // 修改用户信息
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色对话框
      assignDialogVisible: false,
      // 需要被分配的用户信息
      userInfo: {},
      // 所有角色的数据绑定
      assignOptions: [],
      assignOptionsId: ''
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    async getUsersList() {
      const that = this
      const { data: res } = await that.$http.get('users', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
      that.usersList = res.data
      that.total = res.data.total
    },
    // 修改 switch 状态
    async switchStatus(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      console.log(res)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    // 点击 添加用户 显示弹框
    addUsersBtn() {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框的关闭事件 初始化输入框
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 请求接口添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('信息填写错误')
        const { data: res } = await this.$http.post('users', this.addForm)
        console.log(res)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        // 关闭添加新用户弹框
        this.addDialogVisible = false
        // 提示添加成功
        this.$message.success(res.meta.msg)
        // 添加成功后重新获取用户列表
        this.getUsersList()
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUsersList()
    },
    // 打开修改信息弹框
    async openModify(id) {
      // 通过id获取用户信息
      const { data: res } = await this.$http.get(`users/${id}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editForm = res.data
      // 打开弹窗
      this.editDialogVisible = true
    },
    // 监听 修改用户的关闭事件 初始化输入框
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息 确定
    editUser() {
      const that = this
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return this.$message.error('信息填写错误')
        const { data: res } = await this.$http.put(
          `users/${that.editForm.id}`,
          {
            email: that.editForm.email,
            mobile: that.editForm.mobile
          }
        )
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        // 关闭修改用户弹框
        this.editDialogVisible = false
        // 提示修改成功
        this.$message.success(res.meta.msg)
        // 修改成功后重新获取用户列表
        this.getUsersList()
      })
    },
    // 删除用户
    async deleteUser(id) {
      console.log(id)
      // 询问用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(error => error)

      // 如果用户确定删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      console.log(confirmResult)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete(`users/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 提示删除成功
      this.$message.success(res.meta.msg)
      // 删除成功后重新获取用户列表
      this.getUsersList()
    },
    // 分配角色
    async handleAssign(userInfo) {
      this.userInfo = userInfo
      // 请求分配角色数据
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.assignOptions = res.data
      console.log(res)
      // 打开角色对话框
      this.assignDialogVisible = true
    },
    // 保存分配角色信息
    async saveRoleInfo() {
      if (!this.assignOptionsId)
        return this.$message.error('请选择要分配的角色')
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.assignOptionsId
        }
      )
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 更新列表
      this.getUsersList()
      // 关闭对话框
      this.assignDialogVisible = false
    },
    // 监听分配权限对话框的关闭事件
    setRoleDialogClosed() {
      // 清除上次选择的id
      this.assignOptionsId = ''
      // 清除用户信息
      this.userInfo = {}
    }
  }
}
</script>

<style lang="less" scope></style>
