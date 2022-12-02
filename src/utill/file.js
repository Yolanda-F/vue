//文件管理
export const TableColumns = [
  {
    prop: "fileName",
    label: "文件名称",
    isColumn: true, //是否展示为表格列
    isForm: false, //是否展示为表单项
    type: "input", //表单类型
    required: false, //是否必填
    disabled: false, //是否不可编辑
  },
  {
    prop: "creator",
    label: "创建人",
    isColumn: true,
    isForm: true,
    type: "input",
    disabled: true,
  },
  {
    prop: "createTime",
    label: "创建日期",
    isColumn: true,
    isForm: true,
    type: "date",
    required: false,
    disabled: true,
  },
  {
    prop: "description",
    label: "文件描述",
    isColumn: true,
    isForm: true,
    type: "textarea",
    required: false,
    disabled: false,
  },
  {
    prop: "users",
    label: "指定用户",
    isColumn: false,
    isForm: true,
    type: "select",
    required: true,
    disabled: false,
    options: [],
  },
  {
    prop: "fileList",
    label: "文件列表",
    isColumn: false,
    isForm: true,
    type: "file",
    required: true,
    disabled: false,
  },
];
