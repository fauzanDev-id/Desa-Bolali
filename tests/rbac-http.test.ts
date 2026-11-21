import { describe, it, expect, beforeAll } from 'vitest'

const BASE_URL = 'http://localhost:3000'

describe('Tahap H3: RBAC HTTP REST API Endpoint Tests', () => {
  let superAdminToken: string
  let adminDesaToken: string
  let operatorToken: string

  beforeAll(async () => {
    // Login sebagai masing-masing role untuk mendapatkan JWT token
    const superRes = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'super@desa.test', password: 'DesaBolali2026!' }),
    })
    const superData = await superRes.json()
    superAdminToken = superData.token

    const adminRes = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@desa.test', password: 'DesaBolali2026!' }),
    })
    const adminData = await adminRes.json()
    adminDesaToken = adminData.token

    const operatorRes = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'operator@desa.test', password: 'DesaBolali2026!' }),
    })
    const operatorData = await operatorRes.json()
    operatorToken = operatorData.token

    expect(superAdminToken).toBeDefined()
    expect(adminDesaToken).toBeDefined()
    expect(operatorToken).toBeDefined()
  })

  // ==========================================
  // 1. PENGUNJUNG TANPA LOGIN (PUBLIK)
  // ==========================================
  describe('1. Endpoint Publik (Tanpa Autentikasi)', () => {
    it('GET /api/berita hanya mengembalikan dokumen berstatus "terbit"', async () => {
      const res = await fetch(`${BASE_URL}/api/berita`)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.docs).toBeInstanceOf(Array)
      for (const doc of data.docs) {
        expect(doc.status).toBe('terbit')
      }
    })

    it('GET /api/users DITOLAK (403 Forbidden)', async () => {
      const res = await fetch(`${BASE_URL}/api/users`)
      expect(res.status).toBe(403)
    })

    it('POST /api/berita tanpa token DITOLAK (403/401)', async () => {
      const res = await fetch(`${BASE_URL}/api/berita`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul: 'Ilegal' }),
      })
      expect([401, 403]).toContain(res.status)
    })

    it('GET /api/globals/pengaturan-website dapat dibaca publik (200 OK)', async () => {
      const res = await fetch(`${BASE_URL}/api/globals/pengaturan-website`)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.namaWebsite).toBeDefined()
    })
  })

  // ==========================================
  // 2. OPERATOR HTTP ACCESS
  // ==========================================
  describe('2. Endpoint HTTP Role Operator', () => {
    let createdBeritaId: string | number

    it('Operator BISA membuat Berita melalui POST /api/berita (201 Created)', async () => {
      const res = await fetch(`${BASE_URL}/api/berita`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${operatorToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judul: 'Berita HTTP Operator Test',
          slug: 'berita-http-op-' + Date.now(),
          ringkasan: 'Dibuat via REST API oleh Operator',
          isi: { root: { children: [{ children: [{ text: 'Konten' }], type: 'paragraph' }], type: 'root' } },
          status: 'terbit',
          kategori: 'Kegiatan-Warga',
          tanggalTerbit: new Date().toISOString(),
          gambar: 1,
        }),
      })
      expect(res.status).toBe(201)
      const data = await res.json()
      createdBeritaId = data.doc.id
      expect(createdBeritaId).toBeDefined()

      // Hapus kembali
      await fetch(`${BASE_URL}/api/berita/${createdBeritaId}`, {
        method: 'DELETE',
        headers: { Authorization: `JWT ${operatorToken}` },
      })
    })

    it('Operator DITOLAK (403 Forbidden) membuat Dokumen Transparansi', async () => {
      const res = await fetch(`${BASE_URL}/api/dokumen-transparansi`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${operatorToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judul: 'APBDes Ilegal Operator',
          kategori: 'APBDes',
          tahun: 2026,
          anggaran: 10000000,
          filePdf: 1,
        }),
      })
      expect(res.status).toBe(403)
    })

    it('Operator DITOLAK (403 Forbidden) membuat User baru', async () => {
      const res = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${operatorToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Ilegal User',
          email: 'op-illegal-' + Date.now() + '@desa.test',
          password: 'Password123!',
          role: 'operator',
        }),
      })
      expect(res.status).toBe(403)
    })

    it('Operator DITOLAK (403 Forbidden) mengubah pengaturan-website', async () => {
      const res = await fetch(`${BASE_URL}/api/globals/pengaturan-website`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${operatorToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaWebsite: 'Website Hacked by Operator',
        }),
      })
      expect(res.status).toBe(403)
    })
  })

  // ==========================================
  // 3. ADMIN DESA HTTP ACCESS
  // ==========================================
  describe('3. Endpoint HTTP Role Admin Desa', () => {
    it('Admin Desa BISA membuat Dokumen Transparansi (201 Created)', async () => {
      const res = await fetch(`${BASE_URL}/api/dokumen-transparansi`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${adminDesaToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judul: 'APBDes Legal Admin Desa',
          kategori: 'APBDes',
          tahun: 2026,
          anggaran: 50000000,
          filePdf: 1,
        }),
      })
      expect(res.status).toBe(201)
      const data = await res.json()

      // Hapus kembali
      await fetch(`${BASE_URL}/api/dokumen-transparansi/${data.doc.id}`, {
        method: 'DELETE',
        headers: { Authorization: `JWT ${adminDesaToken}` },
      })
    })

    it('Admin Desa DITOLAK (403 Forbidden) membuat User baru', async () => {
      const res = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${adminDesaToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Ilegal User dari Admin Desa',
          email: 'ad-illegal-' + Date.now() + '@desa.test',
          password: 'Password123!',
          role: 'operator',
        }),
      })
      expect(res.status).toBe(403)
    })

    it('Admin Desa DITOLAK (403 Forbidden) mengubah pengaturan-website', async () => {
      const res = await fetch(`${BASE_URL}/api/globals/pengaturan-website`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${adminDesaToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaWebsite: 'Website Diubah Admin Desa',
        }),
      })
      expect(res.status).toBe(403)
    })
  })

  // ==========================================
  // 4. SUPER ADMIN HTTP ACCESS
  // ==========================================
  describe('4. Endpoint HTTP Role Super Admin', () => {
    it('Super Admin BISA mengubah pengaturan-website (200 OK)', async () => {
      const res = await fetch(`${BASE_URL}/api/globals/pengaturan-website`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${superAdminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaWebsite: 'Desa Bolali',
        }),
      })
      expect(res.status).toBe(200)
    })

    it('Super Admin BISA membuat User baru (201 Created)', async () => {
      const res = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${superAdminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Super Admin Created User',
          email: 'super-created-' + Date.now() + '@desa.test',
          password: 'Password123!',
          role: 'operator',
        }),
      })
      expect(res.status).toBe(201)
      const data = await res.json()

      // Hapus kembali
      await fetch(`${BASE_URL}/api/users/${data.doc.id}`, {
        method: 'DELETE',
        headers: { Authorization: `JWT ${superAdminToken}` },
      })
    })
  })
})
