export const revealTypes = ['bottomFirst', 'topFirst'] as const

export type RevealType = (typeof revealTypes)[number]
