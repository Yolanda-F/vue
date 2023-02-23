<!-- 角色管理 -->
<template>
  <el-row>
    <el-col>
      <el-input
        v-model="searchText"
        placeholder="请输入角色名称"
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
        @click="handleCreateRole"
        >创建</el-button
      >
      <el-button
        type="danger"
        :icon="Delete"
        :disabled="multipleSelection.length > 0 ? false : true"
        class="margin-div"
        @click="handleDeleteRoles"
        >删除</el-button
      >
    </el-col>
    <el-col class="margin-div">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-card header="角色列表">
            <el-table
              :data="tableData"
              style="width: 100%"
              highlight-current-row
              @selection-change="handleSelectionChange"
              @row-click="handleRowClick"
            >
              <el-table-column type="selection" />
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
                    @click="handleEdit(scope.row)"
                  ></el-button>
                  <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    title="确定删除?"
                    @confirm="handleDelete(scope.row)"
                  >
                    <template #reference>
                      <el-button type="danger" :icon="Delete"></el-button>
                    </template>
                  </el-popconfirm>
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
        <el-col :span="6">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>菜单分配</span>
                <el-button type="primary" :icon="Select" :disabled="currentRow"
                  >保存</el-button
                >
              </div>
            </template>
            <el-tree
              :data="MenuList"
              show-checkbox
              node-key="id"
              empty-text="暂无数据"
              @check="handleCheck"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <CreateRole ref="roleRef"></CreateRole>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, provide, computed } from "vue";
import { roleTableData, MenuList } from "@/utill/role";
import {
  RefreshRight,
  Search,
  Plus,
  Delete,
  EditPen,
  Select,
} from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import CreateRole from "./CreateRole.vue";
import { getRoleListApi, findRoleNameApi, deleteRoleApi } from "@/api/role";
import { highlightWord } from "@/components/index";

let searchText = ref("");
let tableData = reactive<RoleType[]>([]);
const multipleSelection = reactive<RoleType[]>([]);
//分页
const currentPage = ref(1);
const pageSize = ref(10);
let total = ref(1);
let checkedMenu = reactive<number[]>([]); //选中的菜单列表
let currentRow = ref<RoleType>({
  id: 0,
  roleName: "",
  date: "",
  level: 0,
}); //当前行
let roleRef = ref();

//搜索
const handleSearch = () => {
  findRoleNameApi(searchText.value).then((res) => {
    tableData.length = 0;
    res.forEach((d) => {
      d.roleName = highlightWord(searchText.value, d.roleName);
      tableData.push(d);
    });
  });
};
//重置
const handleReset = () => {
  searchText.value = "";
  getRoleList();
};
//创建角色
const handleCreateRole = () => {
  currentRow.value.date = new Date().toLocaleString().replaceAll("/", "-");
  roleRef.value.title = "新建角色";
  roleRef.value.dialogVisibile = true; //子组件对话框出现
};
//选择行
const handleSelectionChange = (val: RoleType[]) => {
  multipleSelection.length = 0;
  multipleSelection.push(...val);
};
//编辑操作
const handleEdit = (row: RoleType) => {
  currentRow.value = row;
  roleRef.value.title = "编辑角色";
  roleRef.value.dialogVisibile = true; //子组件对话框出现
};
//改变页数量
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getRoleList();
};
//改变当前页
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getRoleList();
};
//多选删除
const handleDeleteRoles = () => {
  let ids: number[] = [];
  multipleSelection.forEach((role) => {
    ids.push(role.id);
  });
  deleteRole(ids);
};
//单选删除
const handleDelete = (row: RoleType) => {
  deleteRole([row.id]);
};
//删除角色
const deleteRole = (ids: number[]) => {
  ElMessageBox.confirm("确定删除选择的角色", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    closeOnClickModal: false,
    closeOnPressEscape: false,
    autofocus: false,
    type: "warning",
  }).then(() => {
    deleteRoleApi(ids).then(() => {
      getRoleList();
    });
  });
};
//勾选菜单列表
const handleCheck = (node, state) => {
  let checkedKeys: number[] = [...state.checkedKeys, ...state.halfCheckedKeys]; //选中的节点key值
  checkedMenu.length = 0;
  checkedMenu.push(...checkedKeys);
  console.log("----菜单权限---", checkedMenu);
};
//点击某一行，展示该角色的菜单权限
const handleRowClick = (row: RoleType) => {
  // currentRow.value = row;
  console.log(row);
};
//获取表格数据
const getRoleList = () => {
  tableData.length = 0;
  getRoleListApi(currentPage.value - 1, pageSize.value).then((res) => {
    res.content.forEach((r) => {
      r.roleName = highlightWord(searchText.value, r.roleName);
      tableData.push(r);
    });
    total.value = res.totalElements; //记录总数量
  });
};
//过滤出要展示的列
const currentColumn = computed(() => {
  return roleTableData.filter((column) => column.isColumn);
});
onMounted(() => {
  getRoleList();
});

provide("formData", currentRow); //提供给孙组件
provide("getRoleList", getRoleList); //提供给子组件
</script>
<style scoped lang="less">
.el-input {
  width: auto;
  margin-right: 12px;
}
.margin-div {
  margin-top: 12px;
}
:deep(.el-card) {
  height: 100%;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
