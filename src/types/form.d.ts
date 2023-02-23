declare namespace Form {
  import { Gender } from "@/types/enum";

  //单选类型（目前主要就是性别）
  interface radioType {
    name: string;
    label: Gender;
  }
  interface FormType {
    prop: string;
    label: string;
    isColumn: boolean;
    isForm: boolean;
    type: string;
    required: boolean;
    disabled: boolean;
    options?: radioType[];
  }
}
