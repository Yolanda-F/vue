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
      <el-button type="warning" :icon="RefreshRight" @click="searchText = ''"
        >重置</el-button
      >
    </el-col>
    <el-col>
      <el-button
        type="primary"
        :icon="Plus"
        class="margin-div"
        @click="addUser()"
        >新增</el-button
      >
      <el-button
        type="danger"
        :icon="Delete"
        :disabled="multipleSelection.length > 0 ? false : true"
        class="margin-div"
        @click="handleDeleteUsers"
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
            v-for="item in currentColumn"
            :prop="item.prop"
            :label="item.label"
            :aria-current="item.width"
            :key="item.prop"
          >
            <template #default="scope" v-if="item.prop == 'state'">
              <el-switch v-model="scope.row.state" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button
                type="primary"
                :icon="EditPen"
                @click="editUser(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                :icon="Delete"
                @click="deleteUser(scope.row)"
              ></el-button>
              <el-button type="success" :icon="ChatDotRound"></el-button>
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
  <OperationUser></OperationUser>
</template>

<script setup>
import { reactive, ref, onMounted, provide } from "vue";
import { userTableData } from "@/utill/user";
import {
  RefreshRight,
  Search,
  Plus,
  Delete,
  EditPen,
  ChatDotRound,
} from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "@/store/index";
import OperationUser from "./OperationUser.vue";
const store = useStore();
let searchText = ref("");
//当前表格的列
const currentColumn = reactive([]);
//当前行的数据，传递给FormCreate组件
const currentRow = ref({});
provide("formData", currentRow);
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

//选择行
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
//编辑用户
const editUser = (row) => {
  currentRow.value = row;
  store.userDialogTips = "编辑用户";
  store.userDialogVisible = true;
};

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
//改变当前页
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
//新增用户
const addUser = () => {
  currentRow.value = {};
  store.userDialogTips = "新增用户";
  store.userDialogVisible = true;
};
//删除多个用户
const handleDeleteUsers = () => {
  ElMessageBox.confirm("确定删除选择的用户", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    closeOnClickModal: false,
    closeOnPressEscape: false,
    autofocus: false,
    type: "warning",
  }).then(() => {
    console.log(multipleSelection.value);
  });
};
//删除一个用户
const deleteUser = (row) => {
  ElMessageBox.confirm("确定删除选择的用户", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    closeOnClickModal: false,
    closeOnPressEscape: false,
    autofocus: false,
    type: "warning",
  }).then(() => {
    console.log(row);
  });
};
onMounted(() => {
  currentColumn.length = 0;
  userTableData.forEach((column) => {
    //只留下需要展示的项
    if (column.isColumn) {
      currentColumn.push(column);
    }
  });
});
</script>
<style scoped lang="less">
.el-input {
  width: auto;
  margin-right: 12px;
}
.margin-div {
  margin-top: 12px;
}
</style>
