const TABS = ["Overview", "Repositories", "Projects"];

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-3 border-b border-white/10 pb-3 w-full">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={
            activeTab === tab.toLowerCase()
              ? "px-4 py-2 rounded-full bg-white text-black text-sm"
              : "px-4 py-2 rounded-full bg-[#181b22] text-gray-400 text-sm hover:bg-[#22262f]"
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;