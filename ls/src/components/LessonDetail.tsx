import React from "react";
import { 
  ArrowLeft, 
  Lightbulb, 
  Home, 
  Search, 
  FileText, 
  Calendar,
  MapPin,
  FileText as FileTextIcon,
  AlertTriangle,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Lesson {
  code: string;
  dateTime: string;
  relatedPosition: string;
  location: string;
  situationType: string;
  description: string;
  analysis: string;
  consequences: string;
  lessonLearned: string;
  iaScore: number;
}

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack }) => {
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
    <div className="h-screen flex overflow-hidden">
      {/* COLUMNA 1: Sidebar de Navegación (Izquierda) */}
      <aside className="w-16 bg-white border-r border-border flex flex-col items-center py-6">
        <div className="mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-4 w-full items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
            title="Lecciones Aprendidas"
          >
            <Lightbulb className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            title="Inicio"
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            title="Buscar"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            title="Documentos"
          >
            <FileText className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            title="Calendario"
          >
            <Calendar className="h-5 w-5" />
          </Button>
        </nav>
      </aside>

      {/* COLUMNA 2: Área Principal (Centro) */}
      <main className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        {/* Header Sticky */}
        <header className="sticky top-0 z-10 bg-white border-b border-border p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-foreground">
                Detalle de Lección Aprendida
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {lesson.code}
              </p>
            </div>
          </div>
        </header>

        {/* Contenido Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Card 1: Descripción (Ancho completo) */}
            <Card className="bg-white">
              <CardHeader className={cn(
                "bg-gray-50 border-b-2 border-gray-300 rounded-t-lg",
                "flex flex-row items-center gap-2 pb-3"
              )}>
                <FileTextIcon className="h-5 w-5 text-gray-700" />
                <h3 className="text-sm font-bold uppercase text-gray-700">
                  Descripción
                </h3>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {lesson.description}
                </p>
              </CardContent>
            </Card>

            {/* Cards 2 y 3: Análisis y Consecuencias (Grid de 2 columnas) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 2: Análisis */}
              <Card className="bg-white">
                <CardHeader className={cn(
                  "bg-orange-50 border-b-2 border-orange-300 rounded-t-lg",
                  "flex flex-row items-center gap-2 pb-3"
                )}>
                  <AlertTriangle className="h-5 w-5 text-orange-700" />
                  <h3 className="text-sm font-bold uppercase text-orange-700">
                    Análisis
                  </h3>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {lesson.analysis}
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Consecuencias */}
              <Card className="bg-white">
                <CardHeader className={cn(
                  "bg-red-50 border-b-2 border-red-300 rounded-t-lg",
                  "flex flex-row items-center gap-2 pb-3"
                )}>
                  <AlertCircle className="h-5 w-5 text-red-700" />
                  <h3 className="text-sm font-bold uppercase text-red-700">
                    Consecuencias
                  </h3>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {lesson.consequences}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Card 4: Aprendizaje (Destacado) */}
            <Card className="bg-white border-2 border-blue-200">
              <CardHeader className={cn(
                "bg-blue-50 border-b-2 border-blue-300 rounded-t-lg",
                "flex flex-row items-center gap-2 pb-3"
              )}>
                <BookOpen className="h-5 w-5 text-blue-700" />
                <h3 className="text-sm font-bold uppercase text-blue-700">
                  Aprendizaje
                </h3>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {lesson.lessonLearned}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* COLUMNA 3: Panel de Contexto (Derecha) */}
      <aside className="w-80 bg-white border-l border-border shadow-lg flex flex-col">
        {/* Sección Superior */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Información
          </h2>

          {/* Score IA */}
          <Card className="bg-green-50 border-green-200 mb-6">
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
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">
                Clasificación
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                <p className="text-sm text-foreground">
                  {lesson.situationType}
                </p>
              </div>
            </div>

            {/* Fecha */}
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">
                Fecha
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                <p className="text-sm text-foreground">
                  {date}
                </p>
              </div>
            </div>

            {/* Hora */}
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">
                Hora
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                <p className="text-sm text-foreground">
                  {time}
                </p>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">
                Ubicación
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-foreground">
                  {lesson.location}
                </p>
              </div>
            </div>

            {/* Cargo */}
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">
                Cargo
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                <p className="text-sm text-foreground">
                  {lesson.relatedPosition}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer del Panel */}
        <div className="mt-auto p-6 border-t border-border space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 border-gray-300 bg-white text-foreground hover:bg-gray-50"
            onClick={onBack}
          >
            Atrás
          </Button>
          <Button
            variant="default"
            className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700"
          >
            Editar Registro
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default LessonDetail;


