import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Lesson } from "./LessonDetail";

interface LessonDetailContentProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetailContent: React.FC<LessonDetailContentProps> = ({ lesson, onBack }) => {
  return (
    <main className="flex-1 flex flex-col bg-background overflow-auto">
      {/* Header con Breadcrumbs */}
      <div className="bg-white border-b border-border shadow-elevation-1">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Botón Atrás, Breadcrumbs y Título */}
            <div className="flex items-center gap-4 flex-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={onBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Lecciones Aprendidas</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>Resultados de búsqueda</span>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">Detalle</span>
                </div>
                <h1 className="text-3xl font-semibold text-foreground">
                  Detalle de Lección Aprendida
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Scrollable */}
      <div className="flex-1 px-6 pt-6 pb-6 space-y-4">
        {/* Card 1: Descripción (Ancho completo) */}
        <div className="bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow relative overflow-hidden">
          <div className={cn(
            "bg-gray-50 border-b-2 border-gray-300 rounded-t-lg -mx-6 -mt-6 mb-4 px-6 pt-6 pb-3",
            "flex flex-row items-center gap-2"
          )}>
            <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-sm font-bold uppercase text-gray-700">
              Descripción
            </h3>
          </div>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap relative z-10">
            {lesson.description}
          </p>
        </div>

        {/* Cards 2 y 3: Análisis y Consecuencias (Grid de 2 columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 2: Análisis */}
          <div className="bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow relative overflow-hidden">
            <div className={cn(
              "bg-orange-50 border-b-2 border-orange-300 rounded-t-lg -mx-6 -mt-6 mb-4 px-6 pt-6 pb-3",
              "flex flex-row items-center gap-2"
            )}>
              <svg className="h-5 w-5 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-sm font-bold uppercase text-orange-700">
                Análisis
              </h3>
            </div>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap relative z-10">
              {lesson.analysis}
            </p>
          </div>

          {/* Card 3: Consecuencias */}
          <div className="bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow relative overflow-hidden">
            <div className={cn(
              "bg-red-50 border-b-2 border-red-300 rounded-t-lg -mx-6 -mt-6 mb-4 px-6 pt-6 pb-3",
              "flex flex-row items-center gap-2"
            )}>
              <svg className="h-5 w-5 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm font-bold uppercase text-red-700">
                Consecuencias
              </h3>
            </div>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap relative z-10">
              {lesson.consequences}
            </p>
          </div>
        </div>

        {/* Card 4: Aprendizaje (Destacado) */}
        <div className="bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow relative overflow-hidden border-2 border-blue-200">
          <div className={cn(
            "bg-blue-50 border-b-2 border-blue-300 rounded-t-lg -mx-6 -mt-6 mb-4 px-6 pt-6 pb-3",
            "flex flex-row items-center gap-2"
          )}>
            <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-sm font-bold uppercase text-blue-700">
              Aprendizaje
            </h3>
          </div>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap relative z-10">
            {lesson.lessonLearned}
          </p>
        </div>
      </div>
    </main>
  );
};

export default LessonDetailContent;

