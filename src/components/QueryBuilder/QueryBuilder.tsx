import { useCallback, useState } from "react";
import {
  Config,
  Utils as QbUtils,
  Query,
  Builder,
  BuilderProps,
  JsonGroup,
  ImmutableTree,
} from "@react-awesome-query-builder/antd";

import { transformModelToConfig } from "transformers";
import { Model } from "types";

const input: Model = {
  tables: [
    {
      id: "1",
      name: "Users",
      fields: [
        {
          id: "1",
          friendlyName: "ID",
          name: "id",
          sourceField: "id",
          sourceTable: "User",
          type: "number",
        },
        {
          id: "2",
          friendlyName: "Name",
          name: "name",
          sourceField: "name",
          sourceTable: "User",
          category: "Labels",
          type: "text",
        },
        {
          id: "3",
          friendlyName: "Location",
          name: "country",
          sourceField: "country",
          sourceTable: "User",
          type: "select",
        },
      ],
    },
    {
      id: "2",
      name: "Sales",
      fields: [
        {
          id: "3",
          friendlyName: "ID",
          name: "id",
          sourceField: "id",
          sourceTable: "Sale",
          type: "number",
        },
        {
          id: "4",
          friendlyName: "Last sale made at",
          name: "last_sale_date",
          sourceField: "last_sale_date",
          sourceTable: "Sale",
          category: "Dates",
          type: "datetime",
        },
        {
          id: "5",
          friendlyName: "Sale count",
          name: "saleCount",
          sourceField: "saleCount",
          sourceTable: "Sale",
          type: "number",
        },
        {
          id: "6",
          friendlyName: "User ID",
          name: "user_id",
          sourceField: "user_id",
          sourceTable: "Sale",
          type: "number",
        },
      ],
    },
  ],
  relationships: [{ id: "1", sourceColumnId: "1", targetColumnId: "6" }],
};

const config = transformModelToConfig(input);

const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };

const QueryBuilder = () => {
  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
  });

  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config,
      }));

      const jsonTree = QbUtils.getTree(immutableTree);
      console.log(jsonTree);
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    },
    []
  );

  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container" style={{ padding: "10px" }}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result">
        <div>
          Query string:{" "}
          <pre>
            {JSON.stringify(QbUtils.queryString(state.tree, state.config))}
          </pre>
        </div>
        <div>
          MongoDb query:{" "}
          <pre>
            {JSON.stringify(QbUtils.mongodbFormat(state.tree, state.config))}
          </pre>
        </div>
        <div>
          SQL where:{" "}
          <pre>
            {JSON.stringify(QbUtils.sqlFormat(state.tree, state.config))}
          </pre>
        </div>
        <div>
          JsonLogic:{" "}
          <pre>
            {JSON.stringify(QbUtils.jsonLogicFormat(state.tree, state.config))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default QueryBuilder;
