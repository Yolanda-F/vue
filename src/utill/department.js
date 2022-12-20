export const departmentData = [
  {
    prop: "name",
    label: "部门名称",
    // width: 150,
    isColumn: true, //是否展示为表格列
    isForm: true, //是否展示为表单项
    type: "input", //表单类型
    required: true, //是否必填
    disabled: false, //是否不可编辑
  },
  // {
  //   prop: "order",
  //   label: "排序",
  //   // width: 150,
  //   isColumn: true,
  //   isForm: true,
  //   type: "input",
  //   required: true,
  //   disabled: false,
  // },
  {
    prop: "date",
    label: "创建日期",
    // width: 150,
    isColumn: true,
    isForm: true,
    type: "date",
    required: true,
    disabled: true,
  },
];
