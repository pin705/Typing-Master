<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  activeKey?: string
  pressedKey?: string
}>()

const rows = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Space']
]

const getKeyClass = (key: string) => {
  const baseClass = "flex items-center justify-center rounded-lg font-medium transition-all duration-100 shadow-sm border-b-2"
  const isSpecial = ['Backspace', 'Tab', 'Caps', 'Enter', 'Shift'].includes(key)
  const isSpace = key === 'Space'
  
  let widthClass = 'w-10 h-10'
  if (key === 'Backspace') widthClass = 'w-20'
  if (key === 'Tab') widthClass = 'w-16'
  if (key === 'Caps') widthClass = 'w-18'
  if (key === 'Enter') widthClass = 'w-20'
  if (key === 'Shift') widthClass = 'w-24'
  if (key === 'Space') widthClass = 'w-64'

  let colorClass = 'bg-white text-gray-700 border-gray-200'
  
  // Highlight active target key
  if (props.activeKey && key.toLowerCase() === props.activeKey.toLowerCase()) {
    colorClass = 'bg-primary-500 text-white border-primary-600 transform translate-y-0.5 border-b-0'
  }
  
  // Highlight pressed key
  if (props.pressedKey && key.toLowerCase() === props.pressedKey.toLowerCase()) {
    colorClass = 'bg-gray-200 text-gray-900 border-gray-300 transform translate-y-0.5 border-b-0'
  }

  return `${baseClass} ${widthClass} ${colorClass} ${isSpace ? 'h-10' : ''}`
}
</script>

<template>
  <div class="flex flex-col gap-2 p-6 bg-gray-100 rounded-xl select-none">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="flex justify-center gap-2">
      <div 
        v-for="key in row" 
        :key="key"
        :class="getKeyClass(key)"
      >
        {{ key === 'Space' ? '' : key }}
      </div>
    </div>
  </div>
</template>
