//角色列
export const roleTableData = [
  {
    prop: "name",
    label: "角色名称",
    isColumn: true, //是否展示为表格列
    isForm: true, //是否展示为表单项
    type: "input", //表单类型
    required: true, //是否必填
    disabled: false, //是否不可编辑
  },
  {
    prop: "permission",
    label: "权限",
    isColumn: false,
    isForm: false,
    type: "input",
    required: false,
    disabled: false,
  },
  {
    prop: "date",
    label: "创建日期",
    isColumn: true,
    isForm: true,
    type: "date",
    required: false,
    disabled: true,
  },
];
//菜单权限数据
export const MenuList = [
  {
    id: "system",
    label: "系统管理",
    children: [
      {
        id: "user",
        label: "用户管理",
        children: [
          { id: "userInsert", label: "用户新增" },
          { id: "userDelete", label: "用户删除" },
          { id: "userEdit", label: "用户编辑" },
        ],
      },
      {
        id: "role",
        label: "角色管理",
        children: [
          { id: "roleInsert", label: "角色创建" },
          { id: "roleDelete", label: "角色删除" },
          { id: "roleEdit", label: "角色编辑" },
        ],
      },
      {
        id: "department",
        label: "部门管理",
        children: [
          { id: "departmentInsert", label: "部门新增" },
          { id: "departmentDelete", label: "部门删除" },
          { id: "departmentEdit", label: "部门编辑" },
        ],
      },
      // {
      //   id: "post",
      //   label: "岗位管理",
      //   children: [
      //     { id: "postInsert", label: "岗位创建" },
      //     { id: "postDelete", label: "岗位删除" },
      //     { id: "postEdit", label: "岗位编辑" },
      //   ],
      // },
    ],
  },
  {
    id: "file",
    label: "文件管理",
    children: [
      { id: "fileUpload", label: "文件上传" },
      { id: "fileDelete", label: "文件删除" },
      { id: "fileDownload", label: "文件下载" },
    ],
  },
];
