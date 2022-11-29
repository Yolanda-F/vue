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
      <el-popconfirm
        confirm-button-text="确认"
        cancel-button-text="取消"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="是否删除本条数据?"
        @confirm="confirmEvent"
        @cancel="cancelEvent"
      >
        <template #reference>
          <el-button
            type="danger"
            :icon="Delete"
            :disabled="multipleSelection.length > 0 ? false : true"
            class="margin-div"
            >删除</el-button
          >
        </template>
      </el-popconfirm>
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
            :key="item.name"
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
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="是否删除本条数据?"
                @confirm="tableConfirmEvent(scope.row)"
                @cancel="tableCancelEvent"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete"></el-button>
                </template>
              </el-popconfirm>
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
  InfoFilled,
  ChatDotRound,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
// import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import OperationUser from "./OperationUser.vue";
const store = useStore();
// const router = useRouter();
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
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
//新增用户
const addUser = () => {
  currentRow.value = {};
  store.userDialogTips = "新增用户";
  store.userDialogVisible = true;
};
//表格外删除时的确认和取消
const confirmEvent = () => {
  ElMessage({
    message: "删除成功.",
    type: "success",
  });
};
const cancelEvent = () => {
  console.log("cancel!");
};
//表格内的删除按钮的确认于取消
const tableConfirmEvent = (row) => {
  console.log(row);
  ElMessage({
    message: "删除成功.",
    type: "success",
  });
};
const tableCancelEvent = () => {
  console.log("cancel!");
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
  // margin-bottom: 12px;
}
</style>
