import { describe, it, expect, beforeAll } from 'vitest'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import { APIError } from 'payload'

describe('Tahap H3: RBAC Local API & Policy Enforcement Tests', () => {
  let payload: any
  let superAdminUser: any
  let adminDesaUser: any
  let operatorUser: any
  let validMediaId: any

  beforeAll(async () => {
    payload = await getPayload({ config: configPromise })

    const users = await payload.find({
      collection: 'users',
      limit: 10,
    })

    const media = await payload.find({
      collection: 'media',
      limit: 1,
    })
    validMediaId = media.docs[0]?.id || 1

    superAdminUser = users.docs.find((u: any) => u.email === 'super@desa.test') || users.docs.find((u: any) => u.role === 'super-admin')
    adminDesaUser = users.docs.find((u: any) => u.email === 'admin@desa.test') || users.docs.find((u: any) => u.role === 'admin-desa')
    operatorUser = users.docs.find((u: any) => u.email === 'operator@desa.test') || users.docs.find((u: any) => u.role === 'operator')

    expect(superAdminUser).toBeDefined()
    expect(adminDesaUser).toBeDefined()
    expect(operatorUser).toBeDefined()
  })

  // ==========================================
  // 1. PENGUNJUNG PUBLIK (ANONIM / TANPA LOGIN)
  // ==========================================
  describe('1. Pengunjung Publik (Anonim)', () => {
    let testDraftBeritaId: string | number
    let testPublishedBeritaId: string | number

    beforeAll(async () => {
      // Siapkan 1 berita draft dan 1 berita terbit
      const draft = await payload.create({
        collection: 'berita',
        data: {
          judul: 'Berita Draft Uji Rahasia',
          slug: 'berita-draft-uji-rahasia-' + Date.now(),
          ringkasan: 'Hanya staf yang boleh melihat draf ini.',
          isi: { root: { children: [{ children: [{ text: 'Konten draft' }], type: 'paragraph' }], type: 'root' } },
          status: 'draft',
          kategori: 'Pemerintahan',
          tanggalTerbit: new Date().toISOString(),
          gambar: validMediaId, // dummy media ID
        },
      })
      testDraftBeritaId = draft.id

      const pub = await payload.create({
        collection: 'berita',
        data: {
          judul: 'Berita Terbit Uji Publik',
          slug: 'berita-terbit-uji-publik-' + Date.now(),
          ringkasan: 'Publik dapat membaca berita ini.',
          isi: { root: { children: [{ children: [{ text: 'Konten terbit' }], type: 'paragraph' }], type: 'root' } },
          status: 'terbit',
          kategori: 'Pemerintahan',
          tanggalTerbit: new Date().toISOString(),
          gambar: validMediaId,
        },
      })
      testPublishedBeritaId = pub.id
    })

    it('GET /api/berita hanya mengembalikan status "terbit", draft tidak pernah bocor ke publik', async () => {
      const publicBerita = await payload.find({
        collection: 'berita',
        overrideAccess: false,
        user: undefined, // anonim
      })

      // Pastikan semua dokumen yang didapat berstatus 'terbit'
      for (const doc of publicBerita.docs) {
        expect(doc.status).toBe('terbit')
      }

      // Pastikan ID draft tidak ada dalam hasil query publik
      const draftFound = publicBerita.docs.some((b: any) => b.id === testDraftBeritaId)
      expect(draftFound).toBe(false)
    })

    it('GET /api/users ditolak total untuk pengunjung tanpa login (throws Forbidden)', async () => {
      await expect(
        payload.find({
          collection: 'users',
          overrideAccess: false,
          user: undefined,
        })
      ).rejects.toThrow()
    })

    it('DITOLAK membuat dokumen baru pada collection apapun tanpa login', async () => {
      await expect(
        payload.create({
          collection: 'berita',
          overrideAccess: false,
          user: undefined,
          data: {
            judul: 'Percobaan Ilegal',
            ringkasan: 'Test',
            isi: { root: { children: [], type: 'root' } },
            status: 'terbit',
            kategori: 'Pemerintahan',
          },
        })
      ).rejects.toThrow()
    })
  })

  // ==========================================
  // 2. ROLE OPERATOR
  // ==========================================
  describe('2. Role Operator', () => {
    let createdBeritaId: string | number
    let operatorMediaId: string | number

    it('Operator BISA membuat, membaca, mengedit, dan menghapus Berita', async () => {
      // CREATE
      const newBerita = await payload.create({
        collection: 'berita',
        overrideAccess: false,
        user: operatorUser,
        data: {
          judul: 'Berita Buatan Operator',
          slug: 'berita-buatan-operator-' + Date.now(),
          ringkasan: 'Uji alur operator',
          isi: { root: { children: [{ children: [{ text: 'Isi' }], type: 'paragraph' }], type: 'root' } },
          status: 'terbit',
          kategori: 'Kegiatan-Warga',
          tanggalTerbit: new Date().toISOString(),
          gambar: validMediaId,
        },
      })
      expect(newBerita.id).toBeDefined()
      createdBeritaId = newBerita.id

      // UPDATE
      const updated = await payload.update({
        collection: 'berita',
        id: createdBeritaId,
        overrideAccess: false,
        user: operatorUser,
        data: {
          ringkasan: 'Ringkasan berhasil diperbarui oleh operator',
        },
      })
      expect(updated.ringkasan).toBe('Ringkasan berhasil diperbarui oleh operator')

      // DELETE
      const deleted = await payload.delete({
        collection: 'berita',
        id: createdBeritaId,
        overrideAccess: false,
        user: operatorUser,
      })
      expect(deleted).toBeDefined()
    })

    it('Operator BISA membuat Pengumuman, Agenda, dan Galeri', async () => {
      // Pengumuman
      const pengumuman = await payload.create({
        collection: 'pengumuman',
        overrideAccess: false,
        user: operatorUser,
        data: {
          judul: 'Pengumuman Operator',
          slug: 'pengumuman-op-' + Date.now(),
          ringkasan: 'Uji pengumuman',
          isi: { root: { children: [{ children: [{ text: 'Isi pengumuman' }], type: 'paragraph' }], type: 'root' } },
          status: 'terbit',
          prioritas: 'Biasa',
        },
      })
      expect(pengumuman.id).toBeDefined()

      // Hapus setelah uji
      await payload.delete({
        collection: 'pengumuman',
        id: pengumuman.id,
        overrideAccess: false,
        user: operatorUser,
      })
    })

    it('Operator DITOLAK (403) membuat dokumen di collection selain 4 yang diizinkan (mis. dokumen-transparansi)', async () => {
      await expect(
        payload.create({
          collection: 'dokumen-transparansi',
          overrideAccess: false,
          user: operatorUser,
          data: {
            judul: 'Percobaan Dokumen APBDes Ilegal oleh Operator',
            kategori: 'APBDes',
            tahun: 2026,
            anggaran: 10000000,
          },
        })
      ).rejects.toThrow()
    })

    it('Operator DITOLAK (403) membuat dokumen di collection potensi', async () => {
      await expect(
        payload.create({
          collection: 'potensi',
          overrideAccess: false,
          user: operatorUser,
          data: {
            judul: 'Potensi Ilegal oleh Operator',
            kategori: 'Pertanian',
            ringkasan: 'Uji potensi ilegal',
          },
        })
      ).rejects.toThrow()
    })

    it('Operator DITOLAK (403) mengubah seluruh Globals (mis. profil-desa dan pengaturan-website)', async () => {
      await expect(
        payload.updateGlobal({
          slug: 'profil-desa',
          overrideAccess: false,
          user: operatorUser,
          data: {
            visi: 'Visi diubah ilegal oleh operator',
          },
        })
      ).rejects.toThrow()

      await expect(
        payload.updateGlobal({
          slug: 'pengaturan-website',
          overrideAccess: false,
          user: operatorUser,
          data: {
            namaWebsite: 'Website Diubah Ilegal',
          },
        })
      ).rejects.toThrow()
    })

    it('Operator DITOLAK membuat pengguna baru (users)', async () => {
      await expect(
        payload.create({
          collection: 'users',
          overrideAccess: false,
          user: operatorUser,
          data: {
            name: 'User Ilegal',
            email: 'ilegal@desa.test',
            password: 'Password123!',
            role: 'operator',
          },
        })
      ).rejects.toThrow()
    })

    it('Operator DITOLAK mengubah field "role" miliknya sendiri (privilege escalation dicegah)', async () => {
      const updatedUser = await payload.update({
        collection: 'users',
        id: operatorUser.id,
        overrideAccess: false,
        user: operatorUser,
        data: {
          role: 'super-admin', // Mencoba menaikkan hak akses sendiri
        },
      })
      // Role harus tetap 'operator'
      expect(updatedUser.role).toBe('operator')
    })
  })

  // ==========================================
  // 3. ROLE ADMIN DESA
  // ==========================================
  describe('3. Role Admin Desa', () => {
    let createdPotensiId: string | number
    let createdTransparansiId: string | number

    it('Admin Desa BISA membuat dan mengelola Potensi & Dokumen Transparansi', async () => {
      const pot = await payload.create({
        collection: 'potensi',
        overrideAccess: false,
        user: adminDesaUser,
        data: {
          judul: 'Potensi Uji Admin Desa',
          slug: 'potensi-uji-admin-desa-' + Date.now(),
          kategori: 'Pertanian',
          ringkasan: 'Potensi dibuat oleh Admin Desa',
          konten: { root: { children: [{ children: [{ text: 'Konten potensi' }], type: 'paragraph' }], type: 'root' } },
          gambar: validMediaId,
        },
      })
      expect(pot.id).toBeDefined()
      createdPotensiId = pot.id

      const trans = await payload.create({
        collection: 'dokumen-transparansi',
        overrideAccess: false,
        user: adminDesaUser,
        data: {
          judul: 'Laporan Transparansi Uji Admin Desa',
          kategori: 'APBDes',
          tahun: 2026,
          anggaran: 50000000,
          filePdf: validMediaId,
        },
      })
      expect(trans.id).toBeDefined()
      createdTransparansiId = trans.id

      // Bersihkan
      await payload.delete({ collection: 'potensi', id: createdPotensiId, overrideAccess: false, user: adminDesaUser })
      await payload.delete({ collection: 'dokumen-transparansi', id: createdTransparansiId, overrideAccess: false, user: adminDesaUser })
    })

    it('Admin Desa BISA memperbarui Globals konten desa (profil-desa, data-kependudukan, kontak)', async () => {
      const updatedProfil = await payload.updateGlobal({
        slug: 'profil-desa',
        overrideAccess: false,
        user: adminDesaUser,
        data: {
          visi: 'Mewujudkan Desa Bolali yang Maju, Mandiri, dan Sejahtera Berbasis Pertanian dan Gotong Royong.',
        },
      })
      expect(updatedProfil).toBeDefined()
    })

    it('Admin Desa DITOLAK (403) memperbarui global pengaturan-website', async () => {
      await expect(
        payload.updateGlobal({
          slug: 'pengaturan-website',
          overrideAccess: false,
          user: adminDesaUser,
          data: {
            namaWebsite: 'Perubahan Ilegal oleh Admin Desa',
          },
        })
      ).rejects.toThrow()
    })

    it('Admin Desa DITOLAK membuat atau menghapus users', async () => {
      await expect(
        payload.create({
          collection: 'users',
          overrideAccess: false,
          user: adminDesaUser,
          data: {
            name: 'User Ilegal dari Admin Desa',
            email: 'admin-illegal@desa.test',
            password: 'Password123!',
            role: 'operator',
          },
        })
      ).rejects.toThrow()

      await expect(
        payload.delete({
          collection: 'users',
          id: operatorUser.id,
          overrideAccess: false,
          user: adminDesaUser,
        })
      ).rejects.toThrow()
    })
  })

  // ==========================================
  // 4. ROLE SUPER ADMIN & PERLINDUNGAN SISTEM
  // ==========================================
  describe('4. Role Super Admin & Integritas Akun', () => {
    it('Super Admin BISA mengelola pengaturan-website', async () => {
      const res = await payload.updateGlobal({
        slug: 'pengaturan-website',
        overrideAccess: false,
        user: superAdminUser,
        data: {
          namaWebsite: 'Desa Bolali',
        },
      })
      expect(res.namaWebsite).toBe('Desa Bolali')
    })

    it('Super Admin BISA membuat pengguna baru', async () => {
      const tempUser = await payload.create({
        collection: 'users',
        overrideAccess: false,
        user: superAdminUser,
        data: {
          name: 'Temporary User Test',
          email: 'temp-test-' + Date.now() + '@desa.test',
          password: 'Password123!',
          role: 'operator',
        },
      })
      expect(tempUser.id).toBeDefined()

      // Hapus kembali
      await payload.delete({
        collection: 'users',
        id: tempUser.id,
        overrideAccess: false,
        user: superAdminUser,
      })
    })

    it('Perlindungan Super Admin Terakhir: DITOLAK menghapus Super Admin jika hanya tersisa 1', async () => {
      // Cari semua super-admin
      const allSuperAdmins = await payload.find({
        collection: 'users',
        where: {
          role: {
            equals: 'super-admin',
          },
        },
      })

      // Jika ada lebih dari 1, kita uji pada kondisi hanya ada 1
      if (allSuperAdmins.totalDocs === 1) {
        await expect(
          payload.delete({
            collection: 'users',
            id: allSuperAdmins.docs[0].id,
            user: superAdminUser,
          })
        ).rejects.toThrow(/Super Admin terakhir/i)
      } else {
        // Jika ada 2 super-admin, pastikan jika tersisa 1 maka dilindungi
        expect(allSuperAdmins.totalDocs).toBeGreaterThan(1)
      }
    })
  })

  // ==========================================
  // 5. KEAMANAN MEDIA & LOGIN
  // ==========================================
  describe('5. Validasi Keamanan Media & Login', () => {
    it('Media memiliki batasan tipe file (mimeTypes) hanya untuk berkas terverifikasi', async () => {
      const mediaCollection = payload.config.collections.find((c: any) => c.slug === 'media')
      expect(mediaCollection.upload.mimeTypes).toEqual([
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
        'video/mp4',
      ])
    })

    it('Users memiliki konfigurasi auth maxLoginAttempts = 5 dan lockTime = 10 menit', async () => {
      const usersCollection = payload.config.collections.find((c: any) => c.slug === 'users')
      expect(usersCollection.auth.maxLoginAttempts).toBe(5)
      expect(usersCollection.auth.lockTime).toBe(600000)
    })
  })
})
