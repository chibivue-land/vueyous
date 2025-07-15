import type { PackageManifest } from '@vueyous/metadata'

export const packages: PackageManifest[] = [
  {
    name: 'metadata',
    display: 'Metadata for VueYous functions',
    manualImport: true,
    iife: false,
    utils: true,
    target: 'node14',
  },
  {
    name: 'shared',
    display: 'Shared utilities',
  },
  {
    name: 'core',
    display: 'VueYous',
    description: 'Collection of essential Vue Composition Utilities',
  },
]
