import { FieldType } from "@react-awesome-query-builder/antd";

export type Field = {
  id: string;
  name: string;
  friendlyName: string;
  sourceField: string;
  sourceTable: string;
  type: FieldType;
  category?: string;
};
export type Table = {
  id: string;
  name: string;
  fields: Array<Field>;
};
export type Relationship = {
  id: string;
  sourceColumnId: string;
  targetColumnId: string;
};
export type Model = {
  tables: Array<Table>;
  relationships: Array<Relationship>;
};
