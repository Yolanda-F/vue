<!-- 用户管理 -->
<template>
  <el-row>
    <el-col>
      <el-input
        v-model="searchText"
        placeholder="请输入用户名"
        :prefix-icon="Search"
      />
      <el-button type="primary" :icon="Search" @click="handleSearch"
        >搜索</el-button
      >
      <el-button type="warning" :icon="RefreshRight" @click="handleReset"
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
            :key="item.prop"
          >
            <template #default="scope">
              <span v-if="item.prop == 'gender'">{{
                getGenderLabel(scope.row[item.prop])
              }}</span>
              <span v-html="scope.row[item.prop]" v-else></span>
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
              <!-- <el-button type="success" :icon="ChatDotRound"></el-button> -->
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
  <OperationUser ref="userRef"></OperationUser>
</template>

<script setup lang="ts">
import { reactive, ref, computed, provide, onMounted } from "vue";
import { userTableData } from "@/utill/user";
import {
  RefreshRight,
  Search,
  Plus,
  Delete,
  EditPen,
} from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import OperationUser from "./OperationUser.vue";
import { getUserListApi, findUserApi, deleteUsersApi } from "@/api/user";
import { Gender } from "@/types/enum";
import { highlightWord } from "@/components/index";

let searchText = ref("");
//当前行的数据，传递给FormCreate组件
const currentRow = ref<UserType>({
  id: 0,
  username: "",
  date: "",
  gender: Gender.male,
  phone: "",
  mail: "",
  departmentId: 0,
  state: "离线",
  password: "",
  roleId: 0,
  roleName: "",
});
let tableData = reactive<UserType[]>([]);
let multipleSelection = reactive<UserType[]>([]);
//分页
const currentPage = ref(1);
const pageSize = ref(10);
let total = ref(1);
let userRef = ref();

//搜索
const handleSearch = () => {
  findUserApi(searchText.value).then((res) => {
    tableData.length = 0;
    res.forEach((d) => {
      d.username = highlightWord(searchText.value, d.username);
      tableData.push(d);
    });
  });
};
//重置
const handleReset = () => {
  searchText.value = "";
  getAllUser();
};
//选择行
const handleSelectionChange = (val: UserType[]) => {
  console.log(val);
  multipleSelection.length = 0;
  multipleSelection.push(...val);
};
//编辑用户
const editUser = (row: UserType) => {
  currentRow.value = row;
  userRef.value.title = "编辑用户";
  userRef.value.dialogVisibile = true;
};
//改变页数量
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getAllUser();
};
//改变当前页
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getAllUser();
};
//新增用户
const addUser = () => {
  currentRow.value.date = new Date().toLocaleString().replaceAll("/", "-");
  userRef.value.title = "新增用户";
  userRef.value.dialogVisibile = true;
};
//删除多个用户
const handleDeleteUsers = () => {
  let ids: number[] = [];
  multipleSelection.forEach((user) => {
    ids.push(user.id);
  });
  deleteUsers(ids);
};
//删除一个用户
const deleteUser = (row: UserType) => {
  deleteUsers([row.id]);
};
//删除用户
const deleteUsers = (ids: number[]) => {
  ElMessageBox.confirm("确定删除选择的用户", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    closeOnClickModal: false,
    closeOnPressEscape: false,
    autofocus: false,
    type: "warning",
  }).then(() => {
    deleteUsersApi(ids).then(() => {
      getAllUser();
    });
  });
};
//过滤出要展示的列
const currentColumn = computed(() => {
  return userTableData.filter((column) => column.isColumn);
});
//区分在线或离线
const isOnLine = (value: string) => {
  let classname = value == "在线" ? "on-line" : "off-line";
  return `<span class=${classname}>${value}</span>`;
};
//获取用户列表
const getAllUser = () => {
  getUserListApi(currentPage.value - 1, pageSize.value).then((res) => {
    tableData.length = 0;
    res.content.forEach((r) => {
      r.username = highlightWord(searchText.value, r.username);
      r.state = isOnLine(r.state); //标识在线或离线
      tableData.push(r);
    });
    total.value = res.totalElements; //记录总数量
  });
};
//获取性别label
const getGenderLabel = (gender) => {
  if (gender == Gender.male) {
    return "男";
  }
  return "女";
};

onMounted(() => {
  getAllUser();
});
provide("formData", currentRow); //提供给孙组件
provide("getAllUser", getAllUser); //提供给子组件
</script>
<style scoped lang="less">
.el-input {
  width: auto;
  margin-right: 12px;
}
.margin-div {
  margin-top: 12px;
}
:deep(.highlight-text) {
  background-color: yellow;
}
:deep(.on-line) {
  color: var(--el-color-success);
}
:deep(.off-line) {
  color: var(--el-color-info);
}
</style>
