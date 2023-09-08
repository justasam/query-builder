import { ConfigProvider } from "antd";
import "./App.css";
import { QueryBuilder } from "./components";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#323842",
          borderRadius: 6,
          colorBgContainer: "#ECF1F6",
        },
      }}
    >
      <div className="App">
        <QueryBuilder />
      </div>
    </ConfigProvider>
  );
}

export default App;
