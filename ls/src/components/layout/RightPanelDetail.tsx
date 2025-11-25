import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Lesson } from "@/components/LessonDetail";

interface RightPanelDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

const RightPanelDetail: React.FC<RightPanelDetailProps> = ({ lesson, onBack }) => {
  // Formatear fecha y hora
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const dateStr = date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const timeStr = date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return { date: dateStr, time: timeStr };
  };

  const { date, time } = formatDateTime(lesson.dateTime);

  return (
    <aside className="w-96 bg-card flex flex-col shadow-elevation-0 relative z-20">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Información
        </h2>

        {/* Score IA */}
        <Card className="bg-green-50 border-green-200 mb-6 shadow-elevation-1">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700 mb-2">
                {lesson.iaScore.toFixed(2)}
              </div>
              <p className="text-sm font-semibold text-green-700 uppercase">
                Score IA / Alta Coincidencia
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Campos de Información */}
        <div className="space-y-4">
          {/* Clasificación */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Clasificación
            </label>
            <div className="bg-background border border-input rounded-md px-3 py-2 shadow-elevation-1">
              <p className="text-sm text-foreground">
                {lesson.situationType}
              </p>
            </div>
          </div>

          {/* Fecha */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Fecha
            </label>
            <div className="bg-background border border-input rounded-md px-3 py-2 shadow-elevation-1">
              <p className="text-sm text-foreground">
                {date}
              </p>
            </div>
          </div>

          {/* Hora */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Hora
            </label>
            <div className="bg-background border border-input rounded-md px-3 py-2 shadow-elevation-1">
              <p className="text-sm text-foreground">
                {time}
              </p>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Ubicación
            </label>
            <div className="bg-background border border-input rounded-md px-3 py-2 shadow-elevation-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-foreground">
                {lesson.location}
              </p>
            </div>
          </div>

          {/* Cargo */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Cargo
            </label>
            <div className="bg-background border border-input rounded-md px-3 py-2 shadow-elevation-1">
              <p className="text-sm text-foreground">
                {lesson.relatedPosition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 mt-auto space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 shadow-elevation-1 hover:shadow-elevation-2"
          onClick={onBack}
        >
          Atrás
        </Button>
        <Button
          variant="default"
          className="w-full h-12 bg-primary text-primary-foreground shadow-elevation-2 hover:shadow-elevation-3"
        >
          Editar Registro
        </Button>
      </div>
    </aside>
  );
};

export default RightPanelDetail;


