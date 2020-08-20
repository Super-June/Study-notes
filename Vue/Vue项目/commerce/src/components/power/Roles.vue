<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!--添加角色列表 -->
            <el-button type="primary">添加角色</el-button>
            <!-- 角色列表 -->
            <el-table :data="rolesList" border stripe>
                <!-- 展开列 -->
                <el-table-column width="50" type="expand">
                    <template slot-scope="scope">
                        <el-row
                            v-for="(item1, index1) of scope.row.children"
                            :key="item1.id"
                            class="border-bottom roles-row vcnter"
                            :class="index1 === 0 ? 'border-top' : ''"
                        >
                            <!-- 渲染一级页面 -->
                            <el-col :span="5">
                                <el-tag
                                    closable
                                    @close="handleClose(scope.row, item1.id)"
                                    >{{ item1.authName }}</el-tag
                                >
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级和三级页面 -->
                            <el-col :span="19">
                                <el-row
                                    v-for="(item2, index2) of item1.children"
                                    :key="item2.id"
                                    :class="index2 !== 0 ? 'border-top' : ''"
                                    class="vcnter"
                                >
                                    <el-col :span="6">
                                        <el-tag
                                            type="success"
                                            closable
                                            @close="
                                                handleClose(scope.row, item2.id)
                                            "
                                        >
                                            {{ item2.authName }}
                                        </el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18" class="roles-row-col">
                                        <el-tag
                                            type="warning"
                                            v-for="item3 of item2.children"
                                            :key="item3.id"
                                            closable
                                            @close="
                                                handleClose(scope.row, item3.id)
                                            "
                                            >{{ item3.authName }}</el-tag
                                        >
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                    label="#"
                    type="index"
                    width="50"
                ></el-table-column>
                <el-table-column
                    label="角色名称"
                    prop="roleName"
                    width="200"
                ></el-table-column>
                <el-table-column
                    label="角色描述"
                    prop="roleDesc"
                ></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small">
                            <i class="el-icon-edit"></i>
                            编辑
                        </el-button>
                        <el-button type="danger" size="small">
                            <i class="el-icon-delete"></i>
                            删除
                        </el-button>
                        <el-button
                            type="warning"
                            size="small"
                            @click="showSetRightDialog(scope.row)"
                        >
                            <i class="el-icon-setting"></i>
                            分配权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分配权限 弹框 -->
        <el-dialog
            title="分配权限"
            width="50%"
            :visible.sync="distributionVisible"
            @close="distributionClose"
        >
            <el-tree
                :data="distributionList"
                :props="treeProps"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="defkeys"
                ref="treeRef"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="distributionVisible = false">取消</el-button>
                <el-button type="primary" @click="allotRights">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Roles',
    data() {
        return {
            // 角色列表
            rolesList: [],
            // 分配权限 框
            distributionVisible: false,
            // 树状结构配置
            treeProps: {
                children: 'children',
                label: 'authName'
            },
            // 分配权限数据
            distributionList: [],
            // 默认选中的节点 ID 值
            defkeys: [],
            // 当前即将分配权限角色id
            roleId: ''
        }
    },
    created() {
        // 获取所有角色列表
        this.getRolesList()
    },
    methods: {
        async getRolesList() {
            const { data: res } = await this.$http.get('roles')
            console.log(res)
            if (res.meta.status !== 200)
                return this.$message.error(res.meta.msg)
            this.rolesList = res.data
        },
        // 权限删除
        async handleClose(role, rightId) {
            console.log(role)
            console.log(rightId)
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
            const { data: res } = await this.$http.delete(
                `roles/${role.id}/rights/${rightId}`
            )
            if (res.meta.status !== 200)
                return this.$message.error(res.meta.msg)
            // 提示删除成功
            this.$message.success(res.meta.msg)

            // 重新赋值权限列表
            role.children = res.data
        },
        // 点击 分配权限
        async showSetRightDialog(role) {
            // 获取当前用户权限id
            this.roleId = role.id

            // 获取所有权限
            const { data: res } = await this.$http.get('rights/tree')
            if (res.meta.status !== 200)
                return this.$message.error(res.meta.msg)
            // 获取到的数据保存到data上
            this.distributionList = res.data

            console.log(this.distributionList)

            this.getLeafkeys(role, this.defkeys)

            this.distributionVisible = true
        },
        // 每次关闭分配权限 对话框 触发事件
        distributionClose() {
            // 清空选中 分配权限
            this.defkeys = []
        },
        // 通过递归的方式， 获取角色下的所有三级权限下的id，并保存到 defKeys
        getLeafkeys(node, arr) {
            // 如果当前 node 节点不包含 children 属性，则是三级节点
            if (!node.children) return arr.push(node.id)

            console.log(node)

            node.children.forEach(item => {
                this.getLeafkeys(item, arr)
            })
        },
        // 点击为角色分配权限
        async allotRights() {
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ]

            const idStr = keys.join(',')

            const { data: res } = await this.$http.post(
                `roles/${this.roleId}/rights`,
                {
                    rids: idStr
                }
            )

            if (res.meta.status !== 200)
                return this.$message.error(res.meta.msg)

            this.$message.success(res.meta.msg)

            // 更新页面数据
            this.getRolesList()

            // 关闭对话框
            this.distributionVisible = false
        }
    }
}
</script>

<style lang="less" scoped>
.roles-row {
    .el-tag {
        margin: 10px 0;
    }
    .roles-row-col {
        .el-tag {
            margin-right: 10px;
        }
    }
}
</style>
