import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import RightPanel from "@/components/layout/RightPanel";
import { FilterProvider } from "@/contexts/FilterContext";

const Index = () => {
  return (
    <FilterProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <MainContent />
        <RightPanel />
      </div>
    </FilterProvider>
  );
};

export default Index;
