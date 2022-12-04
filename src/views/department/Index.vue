<!-- 部门管理 -->
<template>
  <el-row>
    <el-col>
      <el-input
        v-model="searchText"
        placeholder="请输入部门名称"
        :prefix-icon="Search"
      />
      <el-button type="primary" :icon="Search">搜索</el-button>
      <el-button type="warning" :icon="RefreshRight" @click="handleReset"
        >重置</el-button
      >
    </el-col>
    <el-col>
      <el-button
        type="primary"
        :icon="Plus"
        class="margin-div"
        @click="addDepartment()"
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
      <el-card header="部门列表">
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          row-key="id"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-for="item in currentColumn"
            :prop="item.prop"
            :label="item.label"
            :key="item.prop"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button
                type="primary"
                :icon="EditPen"
                @click="editDepartment(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                :icon="Delete"
                @click="deleteUser(scope.row)"
              ></el-button>
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
  <CreateDepartment ref="userRef"></CreateDepartment>
</template>

<script setup>
import { departmentData } from "@/utill/department";
import { reactive, ref, onMounted, provide } from "vue";
import {
  RefreshRight,
  Search,
  Plus,
  Delete,
  EditPen,
} from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import CreateDepartment from "./CreateDepartment.vue";
let searchText = ref(""); //搜索绑定的值
const currentColumn = reactive([]); //当前表格绑定的列
const multipleSelection = ref([]); //当前勾选的项
let tableData = reactive([
  {
    id: 1,
    date: "2016-05-03",
    name: "父部门",
  },
]);
//当前行的数据，传递给FormCreate组件
const currentRow = ref({});
provide("formData", currentRow);
//分页
const currentPage = ref(1);
const pageSize = ref(10);
let total = ref(1);
let userRef = ref();

//选择行
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
const addDepartment = () => {
  currentRow.value = {};
  currentRow.value.date = new Date();
  userRef.value.title = "新增部门";
  userRef.value.dialogVisibile = true;
};
//编辑用户
const editDepartment = (row) => {
  currentRow.value = row;
  userRef.value.title = "编辑部门";
  userRef.value.dialogVisibile = true;
};
//删除多个部门
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
//删除一个部门
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
//重置
const handleReset = () => {
  console.log("reset");
};
onMounted(() => {
  currentColumn.length = 0;
  departmentData.forEach((column) => {
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
:deep(.cell) {
  position: relative;
  .el-table__expand-icon {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0, 50%);
  }
}
</style>
