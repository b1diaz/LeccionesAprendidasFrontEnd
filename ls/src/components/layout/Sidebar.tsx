import { Home, Search, FileText, Calendar, Lightbulb, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const navItems: { icon: LucideIcon; label: string; active?: boolean }[] = [
    { icon: Home, label: "Inicio", active: true },
    { icon: Search, label: "Buscar" },
    { icon: FileText, label: "Documentos" },
    { icon: Calendar, label: "Calendario" },
  ];

  return (
    <aside className="w-20 bg-card flex flex-col items-center py-6 shadow-elevation-3 relative z-30">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-elevation-2">
          <Lightbulb className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full items-center">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg transition-all ${
              item.active
                ? "bg-primary text-primary-foreground shadow-elevation-1"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
            title={item.label}
          >
            <item.icon className="h-5 w-5" />
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
