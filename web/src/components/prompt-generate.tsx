import { FormEvent } from 'react';
import { Wand2 } from 'lucide-react'

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { PromptSelect } from '@/components/prompt-select';

type PromptGenerateProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onInputValue: (value: string) => void
  onTemperature: (value: number) => void
  temperature: number
  loading: boolean
}

export function PromptGenerate({ onSubmit, onInputValue, onTemperature, temperature, loading }: PromptGenerateProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Prompt</Label>
        <PromptSelect onPromptSelected={onInputValue} />
      </div>

      <div className="space-y-2">
        <Label>Modelo</Label>
        <Select disabled defaultValue="gpt3.5">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
          </SelectContent>
        </Select>
        <span className="block text-xs text-muted-foreground italic">
          Você poderá customizar essa opção em breve
        </span>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Temperatura</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={value => onTemperature(value[0])}
        />
        <span className="block text-xs text-muted-foreground italic leading-relaxed">
          Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
        </span>
      </div>

      <Separator />

      <Button disabled={loading} type="submit" className="w-full text-white">
        Executar
        <Wand2 className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
