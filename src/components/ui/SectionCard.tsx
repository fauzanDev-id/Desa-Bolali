import React from 'react'
import { Card, type CardProps } from './Card'

export interface SectionCardProps extends CardProps {}

/**
 * SectionCard (Alias kompatibel untuk Card standar)
 */
export function SectionCard(props: SectionCardProps) {
  return <Card {...props} />
}
