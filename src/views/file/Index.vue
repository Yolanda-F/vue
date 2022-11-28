<!-- 文件管理 -->
<template>
  <div class="file-manage">
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-input placeholder="输入名称或者描述搜索" v-model="fileName" />
      <el-date-picker
        v-model="fileDate"
        type="daterange"
        range-separator=":"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
      />
      <el-button type="success" :icon="Search" @click="handleSearch"
        >搜索</el-button
      >
      <el-button type="warning" :icon="RefreshLeft" @click="handleReset"
        >重置</el-button
      >
    </div>
    <!-- 操作区域 -->
    <div class="operation-area">
      <el-button type="primary" :icon="Upload" @click="handleUpload"
        >上传</el-button
      >
      <el-button
        type="danger"
        :icon="Delete"
        :disabled="currentSelect.length == 0"
        @click="handleDelete"
        v-permission="Permission.admin"
        >删除</el-button
      >
      <el-button
        type="warning"
        :icon="Download"
        :disabled="currentSelect.length == 0"
        @click="handleDownload"
        >下载</el-button
      >
    </div>
    <!-- 数据区域 -->
    <div class="data-area">
      <el-card header="文件列表">
        <el-table
          :data="fileData"
          style="width: 100%"
          @select="handleSelect"
          empty-text="暂无数据"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            v-for="column in tableColumns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
          ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button
                type="warning"
                :icon="Download"
                @click="handleDownloadFile(scope.row)"
              ></el-button>
              <el-popconfirm
                title="确定删除？"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="handleDeleteFile(scope.row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    :icon="Delete"
                    v-permission="Permission.admin"
                  ></el-button>
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
    </div>
  </div>
  <UploadFile ref="uploadRef"></UploadFile>
</template>

<script setup>
import {
  Search,
  RefreshLeft,
  Upload,
  Download,
  Delete,
} from "@element-plus/icons-vue";
import { onMounted, reactive, ref, computed } from "vue";
import { Permission } from "@/utill/permission";
import { TableColumns } from "@/utill/file";
import { ElMessageBox } from "element-plus";
import UploadFile from "./UploadFile.vue";

let fileName = ref(""); //要搜索的文件名称或描述
let fileDate = ref(""); //搜索的文件日期
let fileData = reactive([]); //文件列表数据
let currentSelect = reactive([]); //当前选择的行
let currentPage = ref(1); //当前页
let pageSize = ref(10); //当前页数量
let total = ref(0);
let uploadRef = ref();

//搜索
const handleSearch = () => {
  console.log(fileName, fileDate);
};
//重置
const handleReset = () => {
  console.log("reset");
};
//选择行
const handleSelect = (selection, row) => {
  currentSelect.length = 0;
  //记录当前勾选的行
  selection.forEach((select) => {
    currentSelect.push(select.id);
  });
  console.log(selection, row);
};
//上传文件
const handleUpload = () => {
  uploadRef.value.dialogVisibile = true;
};
//批量删除
const handleDelete = () => {
  ElMessageBox.confirm("确定删除选择的文件", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    closeOnClickModal: false,
    closeOnPressEscape: false,
    autofocus: false,
    type: "warning",
  }).then(() => {
    console.log("要删除的文件", currentSelect);
  });
};
//批量下载
const handleDownload = () => {
  console.log("download");
};
//删除某行数据
const handleDeleteFile = (row) => {
  console.log("delete file", row);
};
//下载某个文件
const handleDownloadFile = (row) => {
  console.log("download file", row);
};
//改变每页数量
const handleSizeChange = (size) => {
  console.log(size);
  pageSize.value = size;
};
//改变当前页
const handleCurrentChange = (page) => {
  console.log(page);
  currentPage.value = page;
};
//获取表格数据
const getFileList = () => {
  fileData.length = 0;
  for (let i = 0; i < 50; i++) {
    fileData.push({
      id: i,
      fileName: "文件1",
      creator: "fanfan",
      createTime: "2022-11-26",
      description: "这是一个文件",
    });
  }
  total.value = fileData.length;
};
//过滤出要展示的列
const tableColumns = computed(() => {
  return TableColumns.filter((column) => column.isColumn);
});
onMounted(() => {
  getFileList();
});
</script>

<style lang="less" scoped>
.file-manage {
  width: 100%;
  height: 100%;
  .el-row {
    height: 100%;
    width: 100%;
    align-items: center;
  }
  .search-area,
  .operation-area {
    height: 50px;
  }
  .search-area {
    display: inline-flex;
    align-items: center;
  }
  :deep(.el-date-editor) {
    margin: 0 12px !important;
  }
  .operation-area {
    display: flex;
    align-items: center;
  }
  .data-area {
    height: calc(100% - 100px);
  }
}
.el-input {
  width: auto;
}
:deep(.el-card) {
  height: 100%;
  .el-card__body {
    height: calc(100% - 58px) !important;
    box-sizing: border-box;
  }
}
:deep(.el-table) {
  height: calc(100% - 32px);
  .cell {
    text-align: center;
  }
}
</style>
