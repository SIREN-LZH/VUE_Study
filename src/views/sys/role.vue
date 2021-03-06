<template>
  <div class="app-container">
    <el-form :inline="true" :model="dataForm" size="small" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.roleName" placeholder="角色名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="searchRole()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      size="small"
      style="width: 100%;"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号"
      />
      <el-table-column
        prop="roleid"
        header-align="center"
        align="center"
        label="角色编号"
      />
      <el-table-column
        prop="roleName"
        header-align="center"
        align="center"
        label="角色名称"
      />
      <el-table-column
        prop="tip"
        header-align="center"
        align="center"
        label="备注"
      />
      <el-table-column
        prop="createDate"
        header-align="center"
        align="center"
        :formatter="formatDateTime"
        width="180"
        label="创建时间"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.roleid)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.roleid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './role-add-or-update'
import { getPageRoles, deleteRole, searchRole } from '@/api/role'
import { formatDateTime } from '@/utils/index'
export default {
  name: 'Role',
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        roleName: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    formatDateTime(row, column, cellValue) {
      return formatDateTime(cellValue)
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getPageRoles({
        'pageNum': this.pageIndex,
        'pageSize': this.pageSize,
        'roleName': this.dataForm.roleName
      }).then(data => {
        this.dataList = data.body.roleDTO
        this.totalPage = data.body.total
        this.dataListLoading = false
      })
    },
    searchRole() {
      this.dataListLoading = true
      searchRole(
        this.dataForm.roleName
      ).then(data => {
        this.dataList = data.body.roleDTO
        this.totalPage = data.body.total
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      var roleid = id ? [id] : this.dataListSelections.map(item => {
        return item.roleid
      })
      this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(
          roleid
        ).then(data => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.dataForm.pageIndex = 1
              this.getDataList()
            }
          })
        })
      }).catch(() => {})
    }
  }
}
</script>
