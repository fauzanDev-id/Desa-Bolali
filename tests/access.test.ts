import test from 'node:test'
import assert from 'node:assert/strict'
import {
  canManageOperatorContent,
  canManageContent,
  canManageWebsiteSettings,
  canManageUsers,
  isSuperAdminField,
  hideForOperator,
  hideForNonSuperAdmin,
  anyone,
} from '../src/access/roles.ts'

test('Verifikasi Hak Akses RBAC Website Desa Bolali', async (t) => {
  const operatorUser = { id: 3, name: 'Operator Desa', role: 'operator' }
  const adminDesaUser = { id: 2, name: 'Admin Desa', role: 'admin-desa' }
  const superAdminUser = { id: 1, name: 'Super Admin', role: 'super-admin' }
  const anonReq = { req: { user: null } } as any

  await t.test('1. Publik / Siapa saja dapat melihat konten publik (read access)', () => {
    assert.equal(anyone(anonReq), true)
  })

  await t.test('2. Operator HANYA bisa CRUD konten operasional (berita, pengumuman, agenda, galeri)', () => {
    const opReq = { req: { user: operatorUser } } as any

    // Operator DIIZINKAN mengelola konten operasional harian
    assert.equal(canManageOperatorContent(opReq), true)

    // Operator DITOLAK mengelola konten desa lain (perangkat desa, BPD, RT/RW, dusun, potensi, transparansi)
    assert.equal(canManageContent(opReq), false, 'Operator harus DITOLAK mengelola konten desa lain')

    // Operator DITOLAK mengelola pengaturan website
    assert.equal(canManageWebsiteSettings(opReq), false, 'Operator harus DITOLAK mengelola pengaturan website')

    // Operator DITOLAK mengubah field sensitif role
    assert.equal(isSuperAdminField(opReq), false, 'Operator tidak boleh mengubah role')

    // Menu non-operasional harus DISEMBUNYIKAN dari UI admin Operator
    assert.equal(hideForOperator({ user: operatorUser }), true, 'Menu harus disembunyikan dari Operator')
  })

  await t.test('3. Admin Desa bisa mengelola seluruh konten desa, tetapi DITOLAK mengelola Pengaturan Website & User', () => {
    const adminReq = { req: { user: adminDesaUser } } as any

    // Admin Desa DIIZINKAN mengelola konten desa & operasional
    assert.equal(canManageContent(adminReq), true)
    assert.equal(canManageOperatorContent(adminReq), true)

    // Admin Desa TIDAK disembunyikan dari menu konten
    assert.equal(hideForOperator({ user: adminDesaUser }), false)

    // Admin Desa DITOLAK mengelola Pengaturan Website
    assert.equal(canManageWebsiteSettings(adminReq), false, 'Admin Desa tidak boleh ubah Pengaturan Website')

    // Menu Pengaturan Website & User harus DISEMBUNYIKAN dari UI Admin Desa
    assert.equal(hideForNonSuperAdmin({ user: adminDesaUser }), true, 'Pengaturan website harus disembunyikan dari Admin Desa')
  })

  await t.test('4. Super Admin memiliki akses penuh (CRUD semua modul)', () => {
    const superReq = { req: { user: superAdminUser } } as any

    assert.equal(canManageContent(superReq), true)
    assert.equal(canManageOperatorContent(superReq), true)
    assert.equal(canManageWebsiteSettings(superReq), true)
    assert.equal(isSuperAdminField(superReq), true)
    assert.equal(canManageUsers(superReq), true)

    // Tidak ada menu yang disembunyikan untuk Super Admin
    assert.equal(hideForOperator({ user: superAdminUser }), false)
    assert.equal(hideForNonSuperAdmin({ user: superAdminUser }), false)
  })

  await t.test('5. Pengguna tanpa login (anonim) ditolak dari semua operasi mutasi', () => {
    assert.equal(canManageContent(anonReq), false)
    assert.equal(canManageOperatorContent(anonReq), false)
    assert.equal(canManageWebsiteSettings(anonReq), false)
    assert.equal(canManageUsers(anonReq), false)
  })
})
