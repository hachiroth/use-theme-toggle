import type { TransitionLoader } from '@/types'

export function defineTransitionLoader<const Light extends string, const Dark extends string>(
  loader: TransitionLoader<Light, Dark>,
): TransitionLoader<Light, Dark> {
  return loader
}
