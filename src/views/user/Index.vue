<!-- 用户管理 -->
<template>
  <el-row>
    <el-col
      ><div class="search">
        <el-input
          v-model="data.search"
          placeholder="请输入"
          :prefix-icon="Search"
        />
        <el-button type="primary" :icon="Search">搜索</el-button>
        <el-button type="warning" :icon="RefreshRight">重置</el-button>
      </div></el-col
    >
    <el-col>
      <div class="operation">
        <el-button type="primary" :icon="Plus">新增</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          :disabled="multipleSelection.length > 0 ? false : true"
          >删除</el-button
        >
      </div></el-col
    >
    <el-col
      ><el-table
        :data="data.tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in userTableData"
          :prop="item.prop"
          :label="item.label"
          width="item.width"
          :key="item.name"
        >
          <template #default="scope" v-if="item.prop == 'state'">
            <el-switch v-model="scope.row.state" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template #default>
            <el-button
              type="primary"
              :icon="EditPen"
              @click="handleClick()"
            ></el-button>
            <el-button type="danger" :icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage2"
          v-model:page-size="pageSize2"
          :page-sizes="[10, 15, 20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /></div
    ></el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { userTableData } from "../../utill/systenTableData";
import {
  RefreshRight,
  Search,
  Plus,
  Delete,
  EditPen,
} from "@element-plus/icons-vue";
const data = reactive({
  search: "",
  tableData: [
    {
      date: "2016-05-03",
      name: "Tom",
      state: true,
      phone: "123456",
      department: "No. 189, Grove St, Los Angeles",
      mail: "123@163.com",
      gender: "male",
    },
  ],
});
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
//分页
const currentPage2 = ref(1);

const pageSize2 = ref(10);
const handleClick = () => {
  console.log("click");
};
const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
</script>
<style scoped lang="less">
.search {
  width: 100%;

  .el-input {
    width: auto;
    margin-right: 15px;
  }
  ::v-deep .table-operation {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
.el-col {
  margin-bottom: 20px;
}

.el-table {
  text-align: center;
}
</style>
