import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFilter } from "@/contexts/FilterContext";

const MainContent = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { minScore } = useFilter();

  const lessons = [
    {
      id: 1,
      code: "LL-2025-001",
      type: "Condición Insegura",
      description: "Se encontró un charco de aceite hidráulico en el pasillo de tránsito de montacargas. El área no estaba señalizada adecuadamente y representaba un riesgo de resbalón para el personal que transitaba por la zona.",
      dateTime: "2025-05-26T14:30:00",
      location: "Vía interna – Estación Galán",
      relatedPosition: "Tubero",
      variant: "default" as const,
      score: 0.92
    },
    {
      id: 2,
      code: "LL-2025-002",
      type: "Incidente",
      description: "Durante el cambio de turno, un operario activó una máquina sin verificar la zona, resultando en un incidente menor.",
      dateTime: "2025-05-15T08:15:00",
      location: "Área de montaje",
      relatedPosition: "Operario",
      variant: "secondary" as const,
      score: 0.65
    },
    {
      id: 3,
      code: "LL-2025-003",
      type: "No Conformidad",
      description: "Se detectó un lote de productos con especificaciones fuera de tolerancia durante el control de calidad.",
      dateTime: "2025-05-10T16:45:00",
      location: "Línea de producción",
      relatedPosition: "Inspector de Calidad",
      variant: "outline" as const,
      score: 0.38
    },
    {
      id: 4,
      code: "LL-2025-004",
      type: "Condición Insegura",
      description: "Se identificó que varios extintores en el área de almacenamiento no tenían la presión adecuada y estaban fuera de su fecha de vencimiento. Esto comprometía la capacidad de respuesta ante una emergencia.",
      dateTime: "2025-04-28T10:20:00",
      location: "Almacén principal - Nivel 2",
      relatedPosition: "Supervisor de Seguridad",
      variant: "default" as const,
      score: 0.88
    },
    {
      id: 5,
      code: "LL-2025-005",
      type: "Incidente",
      description: "Un trabajador sufrió una lesión menor en la mano al manipular una herramienta sin el equipo de protección personal adecuado. El incidente ocurrió durante una tarea de mantenimiento preventivo.",
      dateTime: "2025-04-22T13:45:00",
      location: "Taller de mantenimiento",
      relatedPosition: "Técnico de Mantenimiento",
      variant: "secondary" as const,
      score: 0.72
    },
    {
      id: 6,
      code: "LL-2025-006",
      type: "No Conformidad",
      description: "Durante una auditoría interna se encontró que los registros de temperatura de las cámaras frigoríficas no estaban siendo documentados correctamente durante el fin de semana.",
      dateTime: "2025-04-18T09:00:00",
      location: "Cámaras frigoríficas - Sector B",
      relatedPosition: "Operador de Logística",
      variant: "outline" as const,
      score: 0.55
    },
    {
      id: 7,
      code: "LL-2025-007",
      type: "Condición Insegura",
      description: "Se observó que las escaleras de acceso a la plataforma elevada presentaban varios peldaños con corrosión avanzada y falta de barandales de seguridad en algunos tramos.",
      dateTime: "2025-04-12T11:30:00",
      location: "Plataforma de carga - Muelle 3",
      relatedPosition: "Operador de Grúa",
      variant: "default" as const,
      score: 0.91
    },
    {
      id: 8,
      code: "LL-2025-008",
      type: "Incidente",
      description: "Se produjo un derrame menor de sustancia química en el laboratorio debido a un recipiente mal sellado. El personal actuó rápidamente siguiendo el protocolo de contención.",
      dateTime: "2025-04-05T15:20:00",
      location: "Laboratorio de Control de Calidad",
      relatedPosition: "Químico Analista",
      variant: "secondary" as const,
      score: 0.68
    },
    {
      id: 9,
      code: "LL-2025-009",
      type: "No Conformidad",
      description: "Se detectó que el proceso de etiquetado de productos no cumplía con los estándares establecidos, encontrándose etiquetas con información incompleta o incorrecta en varios lotes.",
      dateTime: "2025-03-30T08:45:00",
      location: "Línea de empaque - Sección 4",
      relatedPosition: "Supervisor de Producción",
      variant: "outline" as const,
      score: 0.42
    },
    {
      id: 10,
      code: "LL-2025-010",
      type: "Condición Insegura",
      description: "Se identificó que el sistema de iluminación de emergencia en el pasillo principal no estaba funcionando correctamente. Varias lámparas presentaban fallas y las baterías de respaldo estaban agotadas.",
      dateTime: "2025-03-25T16:10:00",
      location: "Pasillo principal - Edificio administrativo",
      relatedPosition: "Electricista",
      variant: "default" as const,
      score: 0.85
    },
    {
      id: 11,
      code: "LL-2025-011",
      type: "Incidente",
      description: "Un vehículo de carga golpeó ligeramente una columna estructural al realizar una maniobra de reversa. El daño fue mínimo pero se identificó la falta de señalización adecuada en la zona.",
      dateTime: "2025-03-20T12:00:00",
      location: "Zona de carga y descarga",
      relatedPosition: "Conductor de Montacargas",
      variant: "secondary" as const,
      score: 0.61
    },
    {
      id: 12,
      code: "LL-2025-012",
      type: "No Conformidad",
      description: "Durante la inspección de materiales recibidos se encontró que un proveedor entregó productos que no cumplían con las especificaciones técnicas acordadas en el contrato.",
      dateTime: "2025-03-15T14:30:00",
      location: "Área de recepción de materiales",
      relatedPosition: "Inspector de Compras",
      variant: "outline" as const,
      score: 0.49
    },
    {
      id: 13,
      code: "LL-2025-013",
      type: "Condición Insegura",
      description: "Se observó que las conexiones eléctricas en el panel de control principal presentaban signos de sobrecalentamiento y algunas conexiones estaban sueltas, representando un riesgo de cortocircuito.",
      dateTime: "2025-03-10T09:15:00",
      location: "Sala de control - Planta principal",
      relatedPosition: "Ingeniero Eléctrico",
      variant: "default" as const,
      score: 0.94
    },
  ];

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

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "hsl(142, 71%, 45%)"; // Verde
    if (score >= 0.4) return "hsl(45, 93%, 47%)"; // Amarillo
    return "hsl(0, 72%, 51%)"; // Rojo
  };

  // Filtrar y ordenar lecciones por score (mayor a menor)
  const filteredAndSortedLessons = useMemo(() => {
    return lessons
      .filter(lesson => lesson.score >= minScore)
      .sort((a, b) => b.score - a.score);
  }, [minScore]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredAndSortedLessons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLessons = filteredAndSortedLessons.slice(startIndex, endIndex);

  // Resetear página cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [minScore]);

  return (
    <main className="flex-1 flex flex-col bg-background overflow-auto">
      {/* Header con Breadcrumbs y Acciones */}
      <div className="bg-white border-b border-border shadow-elevation-1">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumbs y Título */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Lecciones Aprendidas</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Resultados de búsqueda</span>
              </div>
              <h1 className="text-3xl font-semibold text-foreground">
                Resultados de búsqueda
              </h1>
            </div>

          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 px-6 pt-6 pb-6 space-y-4">
        {currentLessons.map((lesson) => {
          const { date, time } = formatDateTime(lesson.dateTime);
          
          return (
            <div
              key={lesson.id}
              onClick={() => navigate(`/lesson/${lesson.code}`)}
              className="bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow relative overflow-hidden cursor-pointer"
            >
              {/* Marca de agua con score */}
              <div 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl font-bold pointer-events-none select-none"
                style={{ 
                  color: getScoreColor(lesson.score),
                  opacity: 0.08
                }}
              >
                {lesson.score.toFixed(2)}
              </div>
              
              {/* Header con Badge y Score */}
              <div className="flex justify-between items-center mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={lesson.variant}
                    className="rounded-full px-4 py-1"
                  >
                    {lesson.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{lesson.code}</span>
                </div>
                <div 
                  className="px-2.5 py-1 rounded-full font-semibold text-xs"
                  style={{ 
                    backgroundColor: getScoreColor(lesson.score),
                    color: 'white'
                  }}
                >
                  {lesson.score.toFixed(2)}
                </div>
              </div>

              {/* Descripción */}
              <p className="text-foreground mb-3 leading-relaxed relative z-10">
                {lesson.description}
              </p>

              {/* Información compacta en una línea */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground relative z-10">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                  {lesson.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {lesson.relatedPosition}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Mostrar primera página, última página, página actual y páginas adyacentes
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Información de paginación */}
      <div className="px-6 pb-6">
        <div className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1} - {Math.min(endIndex, filteredAndSortedLessons.length)} de {filteredAndSortedLessons.length} resultados
        </div>
      </div>
    </main>
  );
};

export default MainContent;
