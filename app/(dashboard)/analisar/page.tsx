"use client"

import type React from "react"

import { useState } from "react"
import { Brain, LinkIcon, Upload, Loader2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalisarPage() {
  const [articleUrl, setArticleUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<{
    problem: string
    methodology: string
    results: string
    conclusion: string
  } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleUrlAnalysis = async () => {
    if (!articleUrl.trim()) return

    setIsAnalyzing(true)
    // Simular análise com IA
    setTimeout(() => {
      setAnalysis({
        problem:
          "O artigo aborda o problema de classificação de imagens médicas utilizando técnicas de aprendizado profundo, especificamente para detecção de anomalias em radiografias de tórax.",
        methodology:
          "Foi utilizada uma arquitetura de rede neural convolucional (CNN) baseada em ResNet-50, treinada com um dataset de 100.000 imagens rotuladas. O modelo foi otimizado usando Adam optimizer com learning rate de 0.001.",
        results:
          "O modelo alcançou uma acurácia de 94.2% no conjunto de teste, com precisão de 92.8% e recall de 95.1%. O tempo médio de inferência foi de 0.3 segundos por imagem.",
        conclusion:
          "A abordagem proposta demonstra eficácia na detecção automática de anomalias em radiografias, podendo auxiliar profissionais de saúde no diagnóstico precoce. Trabalhos futuros incluem a expansão para outros tipos de exames médicos.",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    }
  }

  const handlePdfAnalysis = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    // Simular análise com IA
    setTimeout(() => {
      setAnalysis({
        problem:
          "O estudo investiga a eficácia de algoritmos de processamento de linguagem natural (NLP) na análise de sentimentos em redes sociais, focando em tweets relacionados a eventos políticos.",
        methodology:
          "Foram coletados 500.000 tweets usando a API do Twitter. Os dados foram pré-processados e analisados usando modelos BERT e GPT-3, com validação cruzada de 5 folds.",
        results:
          "O modelo BERT fine-tuned alcançou F1-score de 0.89, superando o GPT-3 (0.84). A análise revelou padrões temporais significativos na polarização de opiniões durante períodos eleitorais.",
        conclusion:
          "Os resultados indicam que modelos BERT são mais adequados para análise de sentimentos em textos curtos. A metodologia pode ser aplicada para monitoramento de opinião pública em tempo real.",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Analisar com IA</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gere resumos estruturados de artigos científicos automaticamente
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Enviar Artigo para Análise</CardTitle>
          <CardDescription>Cole o link de um artigo científico ou faça upload de um arquivo PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">
                <LinkIcon className="mr-2 h-4 w-4" />
                Link do Artigo
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="article-url">URL do Artigo</Label>
                <Input
                  id="article-url"
                  placeholder="https://arxiv.org/abs/..."
                  value={articleUrl}
                  onChange={(e) => setArticleUrl(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <Button onClick={handleUrlAnalysis} disabled={isAnalyzing || !articleUrl.trim()} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analisar Artigo
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">Arquivo PDF</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <FileText className="h-4 w-4" />
                      {selectedFile.name}
                    </div>
                  )}
                </div>
              </div>
              <Button onClick={handlePdfAnalysis} disabled={isAnalyzing || !selectedFile} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analisar PDF
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Resumo Estruturado</h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Problema</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{analysis.problem}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metodologia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{analysis.methodology}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{analysis.results}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{analysis.conclusion}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
