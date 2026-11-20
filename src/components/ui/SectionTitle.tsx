import React from 'react'
import { SectionHeader, type SectionHeaderProps } from './SectionHeader'

export interface SectionTitleProps extends SectionHeaderProps {}

/**
 * SectionTitle (Alias kompatibel untuk SectionHeader standar)
 */
export function SectionTitle(props: SectionTitleProps) {
  return <SectionHeader {...props} />
}
