import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { ScoreSlider } from "@/components/ui/score-slider";
import { useFilter } from "@/contexts/FilterContext";

const RightPanel = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { minScore, setMinScore } = useFilter();

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "hsl(142, 71%, 45%)"; // Verde
    if (score >= 0.4) return "hsl(45, 93%, 47%)"; // Amarillo
    return "hsl(0, 72%, 51%)"; // Rojo
  };

  const sliderColor = getScoreColor(minScore);

  return (
    <aside className="w-96 bg-card flex flex-col shadow-elevation-0 relative z-20">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold text-foreground">Búsqueda</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Lightbulb className="h-5 w-5 text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-md p-4">
                <p className="text-sm leading-relaxed">
                  <strong>Describe la SITUACIÓN</strong> que intentas recordar (el qué, el cómo, el por qué) o el <strong>PROBLEMA</strong> que quieres prevenir, con el mayor detalle posible.
                </p>
                <p className="text-sm mt-2 leading-relaxed">
                  La IA analizará y rankeará las Lecciones Aprendidas registradas que tengan mayor <strong>SIMILITUD CONTEXTUAL</strong> con tu narrativa.
                </p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-semibold mb-2">EJEMPLO:</p>
                  <p className="text-xs mb-1">Recuerdo Simple: "Accidente por falta de EPP."</p>
                  <p className="text-xs mb-1">↓</p>
                  <p className="text-xs">Contexto Deseado (Mín. 150 caracteres): "Un accidente ocurrió en el área de montaje hace unos meses, donde la causa principal fue el uso incorrecto de EPP de altura. ¿Qué análisis de consecuencias y qué acciones correctivas se registraron en lecciones relacionadas?"</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-6">
          {/* Search Input with character counter */}
          <div>
            <Textarea
              placeholder="Describe la SITUACIÓN que intentas recordar (el qué, el cómo, el por qué) o el PROBLEMA que quieres prevenir, con el mayor detalle posible. Mínimo 150 caracteres."
              className="min-h-[120px] bg-background shadow-elevation-1 resize-none"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Mínimo 150 caracteres recomendados para mejores resultados
            </p>
          </div>

          {/* Date Range Picker */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Rango de fechas
            </label>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>

          {/* Status Type */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Tipos de estados
            </label>
            <Select>
              <SelectTrigger className="bg-background shadow-elevation-1">
                <SelectValue placeholder="Estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="condicion-insegura">Condición Insegura</SelectItem>
                <SelectItem value="incidente">Incidente</SelectItem>
                <SelectItem value="no-conformidad">No Conformidad</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Score Filter Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                Score mínimo
              </label>
              <span 
                className="text-sm font-semibold px-2 py-1 rounded"
                style={{ 
                  backgroundColor: `${sliderColor}20`,
                  color: sliderColor
                }}
              >
                {minScore.toFixed(2)}
              </span>
            </div>
            <ScoreSlider
              value={[minScore]}
              onValueChange={(value) => setMinScore(value[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
              scoreColor={sliderColor}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.00</span>
              <span>0.50</span>
              <span>1.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 mt-auto space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 shadow-elevation-1 hover:shadow-elevation-2"
        >
          Limpiar
        </Button>
        <Button
          variant="default"
          className="w-full h-12 bg-primary text-primary-foreground shadow-elevation-2 hover:shadow-elevation-3"
        >
          Buscar
        </Button>
      </div>
    </aside>
  );
};

export default RightPanel;
