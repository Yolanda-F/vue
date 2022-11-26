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
                  <el-button type="danger" :icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {
  Search,
  RefreshLeft,
  Upload,
  Download,
  Delete,
} from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";

let fileName = ref(""); //要搜索的文件名称或描述
let fileDate = ref(""); //搜索的文件日期
let fileData = reactive([]); //文件列表数据
let currentSelect = reactive([]); //当前选择的行
const tableColumns = reactive([
  { prop: "fileName", label: "文件名称" },
  { prop: "creator", label: "创建人" },
  { prop: "createTime", label: "创建日期" },
  { prop: "description", label: "文件描述" },
]);
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
  console.log("上传");
};
//批量删除
const handleDelete = () => {
  console.log("delete");
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
};
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
.el-table {
  height: 100%;
  .cell {
    text-align: center;
  }
}
</style>
