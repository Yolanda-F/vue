declare interface PermissionType {
  id: string;
  label: string;
  children?: PermissionType[];
}
