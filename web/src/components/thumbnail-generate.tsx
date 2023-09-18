import { FormEvent, useRef, useState } from "react"
import { FileImage, Image } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/axios"

export function ThumbnailGenerate() {
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const titleInputRef = useRef<HTMLTextAreaElement>(null)

  async function handleThumbnailGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    const prompt = titleInputRef.current?.value

    const response = await api.post('/ai/image', { prompt })

    setImage(response.data[0].url)
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="border flex rounded-md aspect-video border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
        {image ? (
          <img src={image} className="w-full object-cover" />
        ) : (
          <>
            <FileImage className="w-4 h-4" />
            Adicione um título abaixo
          </>
        )}
      </div>

      <Separator />

      <form onSubmit={handleThumbnailGenerate} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title_thumbnail">Título</Label>
          <Textarea
            ref={titleInputRef}
            id="title_thumbnail"
            className="h-20 leading-relaxed resize-none"
            placeholder="Inclua um dos títulos gerados pela IA para gerar uma thumbnail do vídeo..."
          />
        </div>

        <Button disabled={isLoading} type="submit" className="w-full text-white disabled:cursor-not-allowed">
          Gerar thumbnail
          <Image className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  )
}
