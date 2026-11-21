import { describe, it, expect } from 'vitest'
import {
  anyone,
  readPublishedOnly,
  canManageContent,
  canManageOperatorContent,
  canManageWebsiteSettings,
  canCreateUsers,
  canReadUsers,
  canUpdateUsers,
  canDeleteUsers,
  canCreateMedia,
  canUpdateMedia,
  canDeleteMedia,
  isSuperAdminField,
  canReadSensitiveUserField,
  hideForOperator,
  hideForNonSuperAdmin,
} from '../src/access/roles'

describe('RBAC Access Control Unit Tests', () => {
  const superAdmin = { id: '1', role: 'super-admin', email: 'super@desa.test' }
  const adminDesa = { id: '2', role: 'admin-desa', email: 'admin@desa.test' }
  const operator = { id: '3', role: 'operator', email: 'operator@desa.test' }

  describe('1. Super Admin', () => {
    const req = { req: { user: superAdmin } } as any

    it('bisa mengelola semua konten desa', () => {
      expect(canManageContent(req)).toBe(true)
      expect(canManageOperatorContent(req)).toBe(true)
    })

    it('bisa mengelola pengaturan website', () => {
      expect(canManageWebsiteSettings(req)).toBe(true)
    })

    it('bisa CRUD pengguna (users)', () => {
      expect(canCreateUsers(req)).toBe(true)
      expect(canReadUsers(req)).toBe(true)
      expect(canUpdateUsers(req)).toBe(true)
      expect(canDeleteUsers(req)).toBe(true)
    })

    it('bisa CRUD media apapun', () => {
      expect(canCreateMedia(req)).toBe(true)
      expect(canUpdateMedia(req)).toBe(true)
      expect(canDeleteMedia(req)).toBe(true)
    })

    it('memiliki akses ke field sensitif', () => {
      expect(isSuperAdminField(req)).toBe(true)
      expect(canReadSensitiveUserField({ req: { user: superAdmin }, doc: { id: '999' } } as any)).toBe(true)
    })

    it('tidak ada menu admin panel yang disembunyikan', () => {
      expect(hideForOperator({ user: superAdmin })).toBe(false)
      expect(hideForNonSuperAdmin({ user: superAdmin })).toBe(false)
    })
  })

  describe('2. Admin Desa', () => {
    const req = { req: { user: adminDesa } } as any

    it('bisa mengelola konten desa & operasional', () => {
      expect(canManageContent(req)).toBe(true)
      expect(canManageOperatorContent(req)).toBe(true)
    })

    it('DITOLAK mengelola pengaturan website', () => {
      expect(canManageWebsiteSettings(req)).toBe(false)
    })

    it('DITOLAK membuat atau menghapus pengguna', () => {
      expect(canCreateUsers(req)).toBe(false)
      expect(canDeleteUsers(req)).toBe(false)
    })

    it('hanya bisa membaca dan mengedit akun miliknya sendiri', () => {
      expect(canReadUsers(req)).toEqual({ id: { equals: '2' } })
      expect(canUpdateUsers(req)).toEqual({ id: { equals: '2' } })
    })

    it('DITOLAK memodifikasi field role', () => {
      expect(isSuperAdminField(req)).toBe(false)
    })

    it('menu pengaturan website & users disembunyikan', () => {
      expect(hideForNonSuperAdmin({ user: adminDesa })).toBe(true)
      expect(hideForOperator({ user: adminDesa })).toBe(false)
    })
  })

  describe('3. Operator', () => {
    const req = { req: { user: operator } } as any

    it('HANYA bisa mengelola 4 konten operasional (berita, pengumuman, agenda, galeri)', () => {
      expect(canManageOperatorContent(req)).toBe(true)
    })

    it('DITOLAK mengelola konten desa non-operasional', () => {
      expect(canManageContent(req)).toBe(false)
    })

    it('DITOLAK mengelola pengaturan website', () => {
      expect(canManageWebsiteSettings(req)).toBe(false)
    })

    it('DITOLAK membuat atau menghapus pengguna', () => {
      expect(canCreateUsers(req)).toBe(false)
      expect(canDeleteUsers(req)).toBe(false)
    })

    it('hanya bisa mengedit media miliknya sendiri', () => {
      expect(canCreateMedia(req)).toBe(true)
      expect(canUpdateMedia(req)).toEqual({ uploadedBy: { equals: '3' } })
      expect(canDeleteMedia(req)).toEqual({ uploadedBy: { equals: '3' } })
    })

    it('DITOLAK memodifikasi field role', () => {
      expect(isSuperAdminField(req)).toBe(false)
    })

    it('menu non-operasional & pengaturan disembunyikan dari sidebar', () => {
      expect(hideForOperator({ user: operator })).toBe(true)
      expect(hideForNonSuperAdmin({ user: operator })).toBe(true)
    })
  })

  describe('4. Publik / Anonim', () => {
    const anonReq = { req: { user: null } } as any

    it('hanya dapat membaca konten berstatus terbit (draft dilarang)', () => {
      expect(readPublishedOnly(anonReq)).toEqual({ status: { equals: 'terbit' } })
      expect(anyone(anonReq)).toBe(true)
    })

    it('DITOLAK membaca data pengguna (users)', () => {
      expect(canReadUsers(anonReq)).toBe(false)
    })

    it('DITOLAK melakukan mutasi apapun', () => {
      expect(canManageContent(anonReq)).toBe(false)
      expect(canManageOperatorContent(anonReq)).toBe(false)
      expect(canManageWebsiteSettings(anonReq)).toBe(false)
      expect(canCreateUsers(anonReq)).toBe(false)
      expect(canCreateMedia(anonReq)).toBe(false)
    })
  })
})
