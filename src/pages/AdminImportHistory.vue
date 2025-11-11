<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Importar Histórico Financeiro (Excel)</h1>
        <p class="mt-2 text-gray-600">Utilize esta ferramenta para importar seu histórico de custos e receitas de eventos passados.</p>
      </div>

      <div class="flex items-center gap-3 mb-6">
        <button @click="downloadTemplate" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
          <i class="pi pi-download"></i>
          Baixar Modelo de Planilha (.xlsx)
        </button>
      </div>

      <div class="flex flex-wrap gap-3 mb-8">
        <label class="inline-flex">
          <input ref="fileInput" type="file" accept=".xlsx,.csv" class="hidden" @change="onFileChange" />
          <button @click="chooseFile" class="px-5 py-2.5 rounded bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300">Escolher Arquivo</button>
        </label>
        <button @click="startImport" :disabled="!selectedFile || isImporting" class="px-5 py-2.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-40">
          Iniciar Importação
        </button>
        <span v-if="selectedFile" class="text-sm text-gray-700">Arquivo selecionado: <strong>{{ selectedFile.name }}</strong></span>
      </div>

      <!-- Status da Importação -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl">
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-bold text-gray-800">Status da Importação</h2>
        </div>
        <div class="p-6">
          <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div class="h-full bg-gradient-to-r from-purple-500 to-indigo-500" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="space-y-2 text-sm">
            <div v-for="(msg, i) in logs" :key="i" :class="msg.type === 'error' ? 'text-red-600' : 'text-gray-700'">
              {{ msg.text }}
            </div>
            <div v-if="!logs.length" class="text-gray-500">Nenhum arquivo selecionado.</div>
          </div>
        </div>
      </div>

      <!-- Hidden link for download -->
      <a ref="hiddenLink" class="hidden"></a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref(null)
const hiddenLink = ref(null)
const selectedFile = ref(null)
const isImporting = ref(false)
const progress = ref(0)
const logs = ref([])

function chooseFile() {
  fileInput.value?.click()
}

function onFileChange(e) {
  const file = e.target.files?.[0]
  selectedFile.value = file || null
  logs.value = []
  progress.value = 0
  if (file) {
    logs.value.push({ text: `Arquivo "${file.name}" selecionado.`, type: 'info' })
    const valid = /\.(xlsx|csv)$/i.test(file.name)
    if (!valid) logs.value.push({ text: 'Formato inválido. Use .xlsx ou .csv.', type: 'error' })
  }
}

function startImport() {
  if (!selectedFile.value) return
  logs.value.push({ text: 'Validando arquivo...', type: 'info' })
  const isXlsx = /\.xlsx$/i.test(selectedFile.value.name)
  const isCsv = /\.csv$/i.test(selectedFile.value.name)
  if (!isXlsx && !isCsv) {
    logs.value.push({ text: 'Formato inválido. Apenas .xlsx ou .csv.', type: 'error' })
    return
  }
  isImporting.value = true
  progress.value = 5

  const reader = new FileReader()
  reader.onerror = () => {
    logs.value.push({ text: 'Erro ao ler o arquivo.', type: 'error' })
    isImporting.value = false
  }
  reader.onload = () => {
    logs.value.push({ text: 'Arquivo carregado. Iniciando processamento...', type: 'info' })
    simulateProcessing(isCsv ? String(reader.result || '') : null)
  }
  if (isCsv) reader.readAsText(selectedFile.value)
  else reader.readAsArrayBuffer(selectedFile.value)
}

function simulateProcessing(csvText) {
  // Simula 6 etapas de processamento com pequenos atrasos
  const steps = [
    'Analisando colunas do modelo...',
    'Validando linhas (datas, valores, tipos)...',
    'Importando custos...',
    'Importando receitas...',
    'Reconciliando com eventos existentes...',
    'Finalizando e gerando resumo...'
  ]

  let i = 0
  const tick = () => {
    if (i < steps.length) {
      logs.value.push({ text: steps[i], type: 'info' })
      progress.value = Math.min(95, progress.value + 15)
      i++
      setTimeout(tick, 400)
    } else {
      // Pequena validação: se CSV vazio, erro
      if (csvText != null && csvText.trim().length === 0) {
        logs.value.push({ text: 'Arquivo CSV vazio. Nenhum dado importado.', type: 'error' })
        progress.value = 100
        isImporting.value = false
        return
      }
      logs.value.push({ text: 'Importação concluída com sucesso!', type: 'info' })
      progress.value = 100
      isImporting.value = false
    }
  }
  setTimeout(tick, 300)
}

function downloadTemplate() {
  // Gera um CSV mínimo como modelo e baixa com extensão .csv
  const headers = ['data(DD/MM/AAAA)','tipo(Receita|Custo)','categoria','descricao','valor(R$)','eventoId'].join(',')
  const example = ['26/10/2023','Receita','Buffet','Pagamento casamento Silva & Costa','22000,00','101'].join(',')
  const example2 = ['20/10/2023','Custo','Profissionais','Diária Garçom','150,00','101'].join(',')
  const csv = [headers, example, example2].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = hiddenLink.value
  a.href = url
  a.download = 'modelo-historico.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
