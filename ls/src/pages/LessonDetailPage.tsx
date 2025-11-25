import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import LessonDetailContent from "@/components/LessonDetailContent";
import RightPanelDetail from "@/components/layout/RightPanelDetail";
import type { Lesson } from "@/components/LessonDetail";

// Datos de ejemplo - En una app real, esto vendría de una API o estado global
const mockLessons: Record<string, Lesson> = {
  "LL-2025-001": {
    code: "LL-2025-001",
    dateTime: "2025-05-26T14:30:00",
    relatedPosition: "Tubero",
    location: "Vía interna – Estación Galán",
    situationType: "Condición Insegura",
    description: "Se encontró un charco de aceite hidráulico en el pasillo de tránsito de montacargas. El área no estaba señalizada adecuadamente y representaba un riesgo de resbalón para el personal que transitaba por la zona.",
    analysis: "El análisis de causas raíz identificó que el charco se formó debido a una fuga en una manguera hidráulica de un montacargas que no fue detectada durante las inspecciones rutinarias. La falta de mantenimiento preventivo y la ausencia de señalización temporal fueron factores contribuyentes.",
    consequences: "Herida en dedo índice de la mano derecha debido a una caída al resbalar sobre el aceite. El trabajador requirió atención médica y se perdió un día de trabajo. Además, se generó un retraso en las operaciones del área afectada.",
    lessonLearned: "Es fundamental implementar inspecciones más frecuentes de los sistemas hidráulicos de los montacargas y establecer protocolos claros para señalización temporal de áreas con derrames. Se debe capacitar al personal en identificación temprana de fugas y en procedimientos de contención inmediata.",
    iaScore: 0.92
  },
  "LL-2025-002": {
    code: "LL-2025-002",
    dateTime: "2025-05-26T14:30:00",
    relatedPosition: "Operario",
    location: "Área de montaje",
    situationType: "Incidente",
    description: "Durante el cambio de turno, un operario activó una máquina sin verificar la zona, resultando en un incidente menor.",
    analysis: "La falta de comunicación entre turnos y la ausencia de un protocolo de verificación pre-operacional fueron las causas principales del incidente.",
    consequences: "Daño menor en la máquina y riesgo potencial para el operario que no fue verificado adecuadamente.",
    lessonLearned: "Implementar un sistema de comunicación entre turnos y protocolos de verificación pre-operacional obligatorios.",
    iaScore: 0.65
  },
  "LL-2025-003": {
    code: "LL-2025-003",
    dateTime: "2025-05-10T16:45:00",
    relatedPosition: "Inspector de Calidad",
    location: "Línea de producción",
    situationType: "No Conformidad",
    description: "Se detectó un lote de productos con especificaciones fuera de tolerancia durante el control de calidad.",
    analysis: "El análisis reveló que el sistema de calibración de los instrumentos de medición no se había realizado según el cronograma establecido.",
    consequences: "Lote completo rechazado, pérdida de tiempo y recursos, y necesidad de reprocesamiento.",
    lessonLearned: "Establecer alertas automáticas para el mantenimiento y calibración de equipos de medición críticos.",
    iaScore: 0.38
  },
  "LL-2025-004": {
    code: "LL-2025-004",
    dateTime: "2025-04-28T10:20:00",
    relatedPosition: "Supervisor de Seguridad",
    location: "Almacén principal - Nivel 2",
    situationType: "Condición Insegura",
    description: "Se identificó que varios extintores en el área de almacenamiento no tenían la presión adecuada y estaban fuera de su fecha de vencimiento. Esto comprometía la capacidad de respuesta ante una emergencia.",
    analysis: "La revisión de los extintores no se realizaba con la periodicidad requerida. No existía un sistema de seguimiento automatizado para las fechas de vencimiento y el personal no estaba debidamente capacitado en la inspección visual de estos equipos.",
    consequences: "Riesgo crítico en caso de incendio. Posible pérdida de vidas y daños materiales significativos si no se detecta a tiempo.",
    lessonLearned: "Implementar un sistema de gestión de equipos de emergencia con alertas automáticas para mantenimiento y reemplazo. Capacitar al personal en inspección básica de extintores y establecer responsabilidades claras.",
    iaScore: 0.88
  },
  "LL-2025-005": {
    code: "LL-2025-005",
    dateTime: "2025-04-22T13:45:00",
    relatedPosition: "Técnico de Mantenimiento",
    location: "Taller de mantenimiento",
    situationType: "Incidente",
    description: "Un trabajador sufrió una lesión menor en la mano al manipular una herramienta sin el equipo de protección personal adecuado. El incidente ocurrió durante una tarea de mantenimiento preventivo.",
    analysis: "El trabajador no utilizó guantes de protección porque consideró que la tarea era de bajo riesgo. No había supervisión directa en el momento del incidente y los protocolos de EPP no se estaban aplicando consistentemente.",
    consequences: "Corte superficial en la mano que requirió primeros auxilios. Pérdida de tiempo de trabajo y necesidad de investigación del incidente.",
    lessonLearned: "Reforzar la cultura de seguridad haciendo obligatorio el uso de EPP independientemente de la percepción de riesgo. Implementar inspecciones aleatorias y reconocimientos por cumplimiento de protocolos.",
    iaScore: 0.72
  },
  "LL-2025-006": {
    code: "LL-2025-006",
    dateTime: "2025-04-18T09:00:00",
    relatedPosition: "Operador de Logística",
    location: "Cámaras frigoríficas - Sector B",
    situationType: "No Conformidad",
    description: "Durante una auditoría interna se encontró que los registros de temperatura de las cámaras frigoríficas no estaban siendo documentados correctamente durante el fin de semana.",
    analysis: "El personal de fin de semana no estaba debidamente entrenado en el procedimiento de registro. No existía un sistema de respaldo para la documentación y la supervisión era limitada durante estos períodos.",
    consequences: "Riesgo de pérdida de productos perecederos. Posible incumplimiento de normativas sanitarias y pérdida de trazabilidad.",
    lessonLearned: "Establecer procedimientos simplificados para personal de fin de semana. Implementar sistemas de registro digital con alertas automáticas y capacitación específica para todos los turnos.",
    iaScore: 0.55
  },
  "LL-2025-007": {
    code: "LL-2025-007",
    dateTime: "2025-04-12T11:30:00",
    relatedPosition: "Operador de Grúa",
    location: "Plataforma de carga - Muelle 3",
    situationType: "Condición Insegura",
    description: "Se observó que las escaleras de acceso a la plataforma elevada presentaban varios peldaños con corrosión avanzada y falta de barandales de seguridad en algunos tramos.",
    analysis: "La inspección de infraestructura no incluía un programa sistemático de revisión de escaleras y pasarelas. La corrosión se desarrolló por exposición constante a condiciones climáticas sin mantenimiento preventivo adecuado.",
    consequences: "Alto riesgo de caídas desde altura. Posibilidad de lesiones graves o fatales para el personal que accede a la plataforma.",
    lessonLearned: "Establecer un programa de inspección periódica de toda la infraestructura de acceso. Implementar mantenimiento preventivo con recubrimientos anticorrosivos y reemplazo programado de componentes críticos.",
    iaScore: 0.91
  },
  "LL-2025-008": {
    code: "LL-2025-008",
    dateTime: "2025-04-05T15:20:00",
    relatedPosition: "Químico Analista",
    location: "Laboratorio de Control de Calidad",
    situationType: "Incidente",
    description: "Se produjo un derrame menor de sustancia química en el laboratorio debido a un recipiente mal sellado. El personal actuó rápidamente siguiendo el protocolo de contención.",
    analysis: "El recipiente no fue verificado antes de su uso. El sistema de etiquetado no indicaba claramente el estado del sellado y no había un protocolo de verificación pre-uso para recipientes químicos.",
    consequences: "Derrame contenido exitosamente. Exposición mínima a sustancias químicas. Tiempo de limpieza y descontaminación requerido.",
    lessonLearned: "Implementar verificación obligatoria de sellado antes del uso de recipientes químicos. Mejorar el sistema de etiquetado para incluir estado del recipiente y fecha de apertura.",
    iaScore: 0.68
  },
  "LL-2025-009": {
    code: "LL-2025-009",
    dateTime: "2025-03-30T08:45:00",
    relatedPosition: "Supervisor de Producción",
    location: "Línea de empaque - Sección 4",
    situationType: "No Conformidad",
    description: "Se detectó que el proceso de etiquetado de productos no cumplía con los estándares establecidos, encontrándose etiquetas con información incompleta o incorrecta en varios lotes.",
    analysis: "El proceso de etiquetado dependía demasiado de la atención manual del operador. No existían controles automatizados para validar la información de las etiquetas antes de aplicar el producto final.",
    consequences: "Riesgo de envío de productos con información incorrecta a clientes. Posible retiro de productos del mercado y daño a la reputación de la empresa.",
    lessonLearned: "Implementar sistemas de verificación automática de etiquetas. Establecer controles de calidad en múltiples puntos del proceso y capacitación continua del personal en procedimientos de etiquetado.",
    iaScore: 0.42
  },
  "LL-2025-010": {
    code: "LL-2025-010",
    dateTime: "2025-03-25T16:10:00",
    relatedPosition: "Electricista",
    location: "Pasillo principal - Edificio administrativo",
    situationType: "Condición Insegura",
    description: "Se identificó que el sistema de iluminación de emergencia en el pasillo principal no estaba funcionando correctamente. Varias lámparas presentaban fallas y las baterías de respaldo estaban agotadas.",
    analysis: "El sistema de iluminación de emergencia no tenía un programa de mantenimiento preventivo establecido. Las pruebas periódicas no se realizaban y no había un registro de las fechas de reemplazo de baterías.",
    consequences: "Riesgo crítico en caso de corte de energía. Posible pánico y dificultades para evacuar el edificio de manera segura durante una emergencia.",
    lessonLearned: "Establecer un programa de mantenimiento preventivo para todos los sistemas de emergencia. Implementar pruebas mensuales automatizadas y sistema de alertas para reemplazo de baterías.",
    iaScore: 0.85
  },
  "LL-2025-011": {
    code: "LL-2025-011",
    dateTime: "2025-03-20T12:00:00",
    relatedPosition: "Conductor de Montacargas",
    location: "Zona de carga y descarga",
    situationType: "Incidente",
    description: "Un vehículo de carga golpeó ligeramente una columna estructural al realizar una maniobra de reversa. El daño fue mínimo pero se identificó la falta de señalización adecuada en la zona.",
    analysis: "La zona de carga tenía espacios reducidos y la señalización visual no era suficiente para alertar a los conductores sobre las columnas estructurales. No había espejos de seguridad ni sistemas de alerta sonora.",
    consequences: "Daño menor a la columna. Riesgo de daños más graves en futuros incidentes. Posible interrupción de operaciones si el daño estructural se agrava.",
    lessonLearned: "Mejorar la señalización en zonas de alto tráfico vehicular. Instalar espejos de seguridad, barreras de protección y sistemas de alerta. Capacitar a conductores en técnicas de reversa segura.",
    iaScore: 0.61
  },
  "LL-2025-012": {
    code: "LL-2025-012",
    dateTime: "2025-03-15T14:30:00",
    relatedPosition: "Inspector de Compras",
    location: "Área de recepción de materiales",
    situationType: "No Conformidad",
    description: "Durante la inspección de materiales recibidos se encontró que un proveedor entregó productos que no cumplían con las especificaciones técnicas acordadas en el contrato.",
    analysis: "El proceso de inspección de recepción no incluía verificaciones exhaustivas de especificaciones técnicas. La confianza en el proveedor llevó a aceptar productos sin validación completa.",
    consequences: "Retraso en la producción. Necesidad de devolución de materiales y reorden. Posible impacto en la calidad del producto final.",
    lessonLearned: "Establecer protocolos obligatorios de inspección técnica para todos los materiales recibidos. Implementar muestreo estadístico y mantener registros detallados de no conformidades de proveedores.",
    iaScore: 0.49
  },
  "LL-2025-013": {
    code: "LL-2025-013",
    dateTime: "2025-03-10T09:15:00",
    relatedPosition: "Ingeniero Eléctrico",
    location: "Sala de control - Planta principal",
    situationType: "Condición Insegura",
    description: "Se observó que las conexiones eléctricas en el panel de control principal presentaban signos de sobrecalentamiento y algunas conexiones estaban sueltas, representando un riesgo de cortocircuito.",
    analysis: "Las conexiones no habían sido revisadas desde la instalación inicial. El mantenimiento preventivo no incluía inspección térmica de conexiones eléctricas. La carga del sistema había aumentado sin actualizar las conexiones.",
    consequences: "Riesgo de cortocircuito que podría causar incendio, daño a equipos críticos y parada completa de la planta. Posible riesgo para la seguridad del personal.",
    lessonLearned: "Implementar inspecciones térmicas periódicas de todos los paneles eléctricos. Establecer programa de apriete de conexiones y actualización de capacidad cuando aumente la carga del sistema.",
    iaScore: 0.94
  }
};

const LessonDetailPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  // Buscar la lección por código
  const lesson = code ? mockLessons[code] : null;

  const handleBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  if (!lesson) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Lección no encontrada
          </h1>
          <p className="text-muted-foreground mb-4">
            No se encontró la lección con código: {code}
          </p>
          <button
            onClick={handleBack}
            className="text-primary underline hover:text-primary/90"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <LessonDetailContent lesson={lesson} onBack={handleBack} />
      <RightPanelDetail lesson={lesson} onBack={handleBack} />
    </div>
  );
};

export default LessonDetailPage;

