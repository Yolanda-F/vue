//文件管理
import { useStore } from "@/store/index";

const store = useStore();

export const TableColumns = [
  {
    prop: "fileName",
    label: "文件名称",
    isColumn: true, //是否展示为表格列
    isForm: false, //是否展示为表单项
    type: "input", //表单类型
    defaultValue: "", //默认值
    required: false, //是否必填
    disabled: false, //是否不可编辑
  },
  {
    prop: "creator",
    label: "创建人",
    isColumn: true,
    isForm: true,
    type: "input",
    defaultValue: store.userName,
    disabled: true,
  },
  {
    prop: "createTime",
    label: "创建日期",
    isColumn: true,
    isForm: false,
    type: "date",
    defaultValue: "",
    required: false,
    disabled: false,
  },
  {
    prop: "description",
    label: "文件描述",
    isColumn: true,
    isForm: true,
    type: "textarea",
    defaultValue: "",
    required: false,
    disabled: false,
  },
  {
    prop: "fileList",
    label: "文件列表",
    isColumn: false,
    isForm: true,
    type: "file",
    defaultValue: "",
    required: true,
    disabled: false,
  },
];
