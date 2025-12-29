import Sidebar from "./components/Sidebar";
const App = () => {
  return (
    <div className="max-w-7xl">
      <Sidebar isOpen={false} chats={[]} />
    </div>
  );
};

export default App;
