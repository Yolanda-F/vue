<!-- 用户管理 -->
<template>
  <el-row>
    <el-col>
      <el-input
        v-model="searchText"
        placeholder="请输入"
        :prefix-icon="Search"
      />
      <el-button type="primary" :icon="Search">搜索</el-button>
      <el-button type="warning" :icon="RefreshRight">重置</el-button>
    </el-col>
    <el-col>
      <el-button type="primary" :icon="Plus" class="margin-div">新增</el-button>
      <el-button
        type="danger"
        :icon="Delete"
        :disabled="multipleSelection.length > 0 ? false : true"
        class="margin-div"
        >删除</el-button
      >
    </el-col>
    <el-col class="margin-div">
      <el-card header="用户列表">
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-for="item in userTableData"
            :prop="item.prop"
            :label="item.label"
            :aria-current="item.width"
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
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { userTableData } from "@/utill/user";
import {
  RefreshRight,
  Search,
  Plus,
  Delete,
  EditPen,
} from "@element-plus/icons-vue";

let searchText = ref("");
let tableData = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    state: true,
    phone: "123456",
    department: "No. 189, Grove St, Los Angeles",
    mail: "123@163.com",
    gender: "male",
  },
]);
const multipleSelection = ref([]);
//分页
const currentPage = ref(1);
const pageSize = ref(10);
let total = ref(1);

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
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
.el-input {
  width: auto;
  margin-right: 12px;
}
.margin-div {
  margin-top: 12px;
  // margin-bottom: 12px;
}
</style>
