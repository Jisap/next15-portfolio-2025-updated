import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  // Personaliza aquí si tienes clases en conflicto que tailwind-merge no resuelve bien.
  // Por ahora, la configuración por defecto suele ser suficiente.
  // Ejemplo de personalización:
  // extend: {
  //   classGroups: {
  //     'font-size': [{ text: ['sm', 'base', 'lg', 'xl'] }],
  //   },
  //   conflictingClassGroups: {
  //     'font-size': ['leading'],
  //   },
  // },
})