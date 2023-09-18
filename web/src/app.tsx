import { useState } from 'react';
import { Github } from 'lucide-react'
import { useCompletion } from 'ai/react'

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { VideoInputForm } from '@/components/video-input-form';
import { PromptGenerate } from '@/components/prompt-generate';
import { ThumbnailGenerate } from './components/thumbnail-generate';

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ia</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido por Felipe de Senna 🚀</span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className='w-4 h-4 mr-2' />
            Github
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para IA..."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              value={completion}
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável <code className="text-blue-400">{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>

        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <PromptGenerate
            onSubmit={handleSubmit}
            onInputValue={setInput}
            onTemperature={setTemperature}
            temperature={temperature}
            loading={isLoading}
          />

          <Separator />

          <ThumbnailGenerate />
        </aside>
      </main>
    </div>
  )
}
