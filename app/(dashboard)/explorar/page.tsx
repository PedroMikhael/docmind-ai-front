"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function ExplorarPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Here you would typically navigate to results or trigger a search
      console.log("[v0] Searching for:", searchQuery)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="w-full max-w-3xl space-y-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
          Que tipo de artigo científico você quer encontrar hoje?
        </h1>

        {/* Search Box */}
        <div className="mx-auto w-full max-w-xl">
          <div className="relative flex items-center gap-2 rounded-2xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800">
            <Input
              type="text"
              placeholder="Digite o tema ou área de pesquisa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              size="icon"
              onClick={handleSearch}
              className="h-10 w-10 shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Research Flow © 2025 — UECE
      </footer>
    </div>
  )
}
