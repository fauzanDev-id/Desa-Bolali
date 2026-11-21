import { test, expect } from '@playwright/test'

test.describe('Tahap H3: E2E Playwright Role Verification Admin Panel', () => {
  // ==========================================
  // 1. ROLE OPERATOR
  // ==========================================
  test('Operator: Menu sidebar sesuai matriks, akses URL terlarang ditolak, dan bisa kelola berita', async ({ page }) => {
    // 1. Login sebagai Operator
    await page.goto('/admin/login')
    await page.waitForSelector('input[name="email"]')
    await page.fill('input[name="email"]', 'operator@desa.test')
    await page.fill('input[name="password"]', 'DesaBolali2026!')
    await page.click('button[type="submit"]')

    // Tunggu sampai redirect ke dashboard utama /admin
    await page.waitForURL((url) => url.pathname === '/admin')
    await page.waitForLoadState('networkidle')

    // 2. Periksa Menu Sidebar yang Diizinkan (Berita, Pengumuman, Agenda, Galeri, Media)
    const pageText = await page.locator('body').innerText()
    expect(pageText).toContain('Berita Desa')
    expect(pageText).toContain('Pengumuman Warga')
    expect(pageText).toContain('Agenda Kegiatan')
    expect(pageText).toContain('Galeri Foto & Video')
    expect(pageText).toContain('Pustaka Media')

    // 3. Pastikan Menu Non-Operasional & Sistem TIDAK TAMPIL
    expect(pageText).not.toContain('Daftar Pengguna')
    expect(pageText).not.toContain('Pengaturan Website')
    expect(pageText).not.toContain('Transparansi & APBDes')
    expect(pageText).not.toContain('Potensi Unggulan')
    expect(pageText).not.toContain('Badan Permusyawaratan Desa')

    // 4. Uji Akses URL Langsung ke Collection Terlarang (/admin/collections/users)
    await page.goto('/admin/collections/users')
    await page.waitForLoadState('networkidle')
    const usersAccessText = await page.locator('body').innerText()
    expect(
      usersAccessText.includes('Nothing found') ||
      usersAccessText.includes('Not Found') ||
      usersAccessText.includes('Unauthorized') ||
      usersAccessText.includes('Forbidden')
    ).toBe(true)

    // 5. Uji Akses URL Langsung ke Global Terlarang (/admin/globals/pengaturan-website)
    await page.goto('/admin/globals/pengaturan-website')
    await page.waitForLoadState('networkidle')
    const settingsAccessText = await page.locator('body').innerText()
    expect(
      settingsAccessText.includes('Nothing found') ||
      settingsAccessText.includes('Not Found') ||
      settingsAccessText.includes('Unauthorized') ||
      settingsAccessText.includes('Forbidden')
    ).toBe(true)

    // 6. Alur Lengkap: Operator BISA Mengakses Halaman Berita
    await page.goto('/admin/collections/berita')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('body')).toContainText('Berita Desa')
  })

  // ==========================================
  // 2. ROLE ADMIN DESA
  // ==========================================
  test('Admin Desa: Menu konten desa lengkap, menu Users & Pengaturan Website tersembunyi', async ({ page }) => {
    // 1. Login sebagai Admin Desa
    await page.goto('/admin/login')
    await page.waitForSelector('input[name="email"]')
    await page.fill('input[name="email"]', 'admin@desa.test')
    await page.fill('input[name="password"]', 'DesaBolali2026!')
    await page.click('button[type="submit"]')

    await page.waitForURL((url) => url.pathname === '/admin')
    await page.waitForLoadState('networkidle')

    // 2. Periksa Menu Konten Desa Tampil Lengkap
    const pageText = await page.locator('body').innerText()
    expect(pageText).toContain('Profil Desa')
    expect(pageText).toContain('Transparansi & APBDes')
    expect(pageText).toContain('Potensi Unggulan')
    expect(pageText).toContain('Berita Desa')
    expect(pageText).toContain('Badan Permusyawaratan Desa')

    // 3. Pastikan Menu Pengguna & Pengaturan Website Tersembunyi
    expect(pageText).not.toContain('Daftar Pengguna')
    expect(pageText).not.toContain('Pengaturan Website')

    // 4. Akses URL Terlarang (/admin/collections/users) Ditolak
    await page.goto('/admin/collections/users')
    await page.waitForLoadState('networkidle')
    const usersAccessText = await page.locator('body').innerText()
    expect(
      usersAccessText.includes('Nothing found') ||
      usersAccessText.includes('Not Found') ||
      usersAccessText.includes('Unauthorized')
    ).toBe(true)

    // 5. Akses URL Terlarang (/admin/globals/pengaturan-website) Ditolak
    await page.goto('/admin/globals/pengaturan-website')
    await page.waitForLoadState('networkidle')
    const settingsAccessText = await page.locator('body').innerText()
    expect(
      settingsAccessText.includes('Nothing found') ||
      settingsAccessText.includes('Not Found') ||
      settingsAccessText.includes('Unauthorized')
    ).toBe(true)
  })

  // ==========================================
  // 3. ROLE SUPER ADMIN
  // ==========================================
  test('Super Admin: Semua menu navigasi tampil lengkap tanpa pembatasan', async ({ page }) => {
    // 1. Login sebagai Super Admin
    await page.goto('/admin/login')
    await page.waitForSelector('input[name="email"]')
    await page.fill('input[name="email"]', 'super@desa.test')
    await page.fill('input[name="password"]', 'DesaBolali2026!')
    await page.click('button[type="submit"]')

    await page.waitForURL((url) => url.pathname === '/admin')
    await page.waitForLoadState('networkidle')

    // 2. Seluruh Menu Harus Tersedia (Termasuk Users dan Pengaturan Website)
    const pageText = await page.locator('body').innerText()
    expect(pageText).toContain('Daftar Pengguna')
    expect(pageText).toContain('Pengaturan Website')
    expect(pageText).toContain('Profil Desa')
    expect(pageText).toContain('Transparansi & APBDes')
    expect(pageText).toContain('Berita Desa')

    // 3. Akses Langsung ke Users Terbuka dan Menampilkan Daftar Pengguna
    await page.goto('/admin/collections/users')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('body')).toContainText('Daftar Pengguna')
    await expect(page.locator('body')).toContainText('super@desa.test')
  })
})
