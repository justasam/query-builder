import { AntdConfig, Config, Fields } from "@react-awesome-query-builder/antd";
import "@react-awesome-query-builder/antd/css/styles.css";

import { Field, Model, Table } from "types";

const reduceFields = (fields: Array<Field>) =>
  fields.reduce<Fields>((previousFields, field) => {
    return {
      ...previousFields,
      [field.name]: {
        label: field.name,
        type: field.type,
        label2: field.friendlyName,
      },
    };
  }, {});

const reduceTables = (tables: Array<Table>) =>
  tables.reduce<Fields>((previousFields, table) => {
    return {
      ...previousFields,
      [table.name]: {
        label: table.name,
        type: "!struct",
        subfields: reduceFields(table.fields),
      },
    };
  }, {});

export const transformModelToConfig = (model: Model): Config => ({
  ...AntdConfig,
  fields: reduceTables(model.tables),
});
