import { redirect } from 'next/navigation'

export default async function PotensiSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/potensi-desa/${slug}`)
}
