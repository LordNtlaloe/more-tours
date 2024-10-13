import { useContext } from "react";
import { Search, User, Bell, Settings } from "lucide-react";

const DashboardHeader = () => {

  return (
    <div className="h-16 bg-white px-12 rounded-[5px] flex items-center justify-between w-">
      {/* SEARCH BAR */}
      <div className="bg-slate-200 flex py-2 items-center gap-1 px-2 border rounded-[10px] w-full max-w-xs">
        <Search className="text-gray-500" />
        <input
          type="text"
          className="bg-slate-200 outline-none w-full"
          placeholder="Search..."
        />
      </div>

      {/* ICONS */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500">
            <Settings className="w-6 h-6" />
        </button>
        <button className="text-gray-500">
          <Bell className="w-6 h-6" />
        </button>
        <button className="text-gray-500">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
