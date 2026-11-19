import { redirect } from 'next/navigation'

export default async function PengumumanSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/informasi/pengumuman/${slug}`)
}
