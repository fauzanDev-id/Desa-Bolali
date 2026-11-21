'use client'

import React, { useState, useEffect } from 'react'
import { PaperPlaneTilt, CheckCircle, WarningCircle, ShieldCheck, ArrowsClockwise, User, Phone, Envelope, ChatCircleText } from '@phosphor-icons/react/dist/ssr'

export function FormulirPesan() {
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    email: '',
    kategori: 'Pertanyaan',
    pesan: '',
    // Honeypot spam field (wajib kosong)
    website_url_hp: '',
  })

  // Math Captcha Challenge
  const [captchaNum1, setCaptchaNum1] = useState(4)
  const [captchaNum2, setCaptchaNum2] = useState(3)
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [formStartTime, setFormStartTime] = useState<number>(Date.now())

  // Status & Error
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Generate random simple math challenge on mount
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2 // 2 s.d 9
    const n2 = Math.floor(Math.random() * 7) + 1 // 1 s.d 7
    setCaptchaNum1(n1)
    setCaptchaNum2(n2)
    setCaptchaAnswer('')
  }

  useEffect(() => {
    generateCaptcha()
    setFormStartTime(Date.now())
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}

    // 1. Validasi Nama
    if (!formData.nama.trim()) {
      errs.nama = 'Nama lengkap wajib diisi.'
    } else if (formData.nama.trim().length < 3) {
      errs.nama = 'Nama minimal 3 karakter.'
    }

    // 2. Validasi Nomor Telepon / WA
    if (!formData.telepon.trim()) {
      errs.telepon = 'Nomor telepon/WhatsApp wajib diisi.'
    } else if (!/^[0-9+\s-]{8,18}$/.test(formData.telepon.trim())) {
      errs.telepon = 'Format nomor telepon tidak valid (contoh: 08123456789).'
    }

    // 3. Validasi Email (Opsional, tapi jika diisi harus valid)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Format alamat email tidak valid.'
    }

    // 4. Validasi Pesan
    if (!formData.pesan.trim()) {
      errs.pesan = 'Isi pesan atau aspirasi wajib diisi.'
    } else if (formData.pesan.trim().length < 10) {
      errs.pesan = 'Isi pesan terlalu singkat (minimal 10 karakter).'
    }

    // 5. Proteksi Spam: Honeypot check
    if (formData.website_url_hp.trim() !== '') {
      errs.spam = 'Aktivitas terdeteksi sebagai spam otomatis.'
    }

    // 6. Proteksi Spam: Waktu pengisian terlalu cepat (< 1.5 detik)
    if (Date.now() - formStartTime < 1500) {
      errs.spam = 'Pengisian formulir terlalu cepat, silakan coba lagi.'
    }

    // 7. Proteksi Spam: Math Captcha
    const expected = captchaNum1 + captchaNum2
    if (parseInt(captchaAnswer.trim(), 10) !== expected) {
      errs.captcha = `Jawaban salah. Berapa hasil dari ${captchaNum1} + ${captchaNum2}?`
    }

    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    // Simulasi pengiriman data
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({
        nama: '',
        telepon: '',
        email: '',
        kategori: 'Pertanyaan',
        pesan: '',
        website_url_hp: '',
      })
      generateCaptcha()
    }, 700)
  }

  return (
    <div className="bg-white rounded-desa-card border border-desa-border shadow-desa-sm p-6 sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-desa-primaryGreen uppercase tracking-wider mb-2">
        <ChatCircleText className="w-4 h-4 text-desa-gold" />
        <span>Kanal Aspirasi & Pesan Warga</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-desa-darkGreen tracking-tight mb-2">
        Kirim Pesan & Pengaduan
      </h2>
      <p className="text-xs sm:text-sm text-desa-textMuted leading-relaxed mb-6">
        Sampaikan saran, permohonan informasi, usulan pembangunan, maupun aspirasi Anda secara langsung kepada Pemerintah Desa Bolali.
      </p>

      {/* Success Notification */}
      {isSuccess && (
        <div className="mb-6 p-4 rounded-desa-card bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Pesan Berhasil Terkirim!</h4>
            <p className="text-xs mt-1 text-emerald-800 leading-relaxed">
              Terima kasih atas partisipasi Anda. Pesan Anda telah tercatat dalam sistem layanan terpadu dan akan segera ditindaklanjuti oleh aparat Pemerintah Desa Bolali.
            </p>
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="mt-3 inline-flex items-center text-xs font-bold text-emerald-700 underline hover:text-emerald-950 min-h-[36px]"
            >
              Kirim Pesan Lainnya
            </button>
          </div>
        </div>
      )}

      {/* Spam Error Alert */}
      {errors.spam && (
        <div className="mb-6 p-4 rounded-desa-card bg-rose-50 border border-rose-200 text-rose-950 flex items-center gap-3">
          <WarningCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p className="text-xs font-semibold">{errors.spam}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot Hidden Spam Input */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url_hp">Jangan isi kolom ini jika Anda manusia</label>
          <input
            id="website_url_hp"
            type="text"
            name="website_url_hp"
            value={formData.website_url_hp}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Input Nama & Nomor HP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-desa-textDark uppercase tracking-wider mb-1.5">
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="contoh: Budi Santoso"
                className={`w-full min-h-[44px] pl-10 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border rounded-desa-sm focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20 focus:border-desa-primaryGreen focus:bg-white transition-all ${
                  errors.nama
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-desa-border'
                }`}
              />
              <User className="w-4 h-4 text-desa-textMuted absolute left-3 top-3.5" />
            </div>
            {errors.nama && (
              <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.nama}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-desa-textDark uppercase tracking-wider mb-1.5">
              Nomor WhatsApp / HP <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                placeholder="contoh: 08123456789"
                className={`w-full min-h-[44px] pl-10 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border rounded-desa-sm focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20 focus:border-desa-primaryGreen focus:bg-white transition-all ${
                  errors.telepon
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-desa-border'
                }`}
              />
              <Phone className="w-4 h-4 text-desa-textMuted absolute left-3 top-3.5" />
            </div>
            {errors.telepon && (
              <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.telepon}</p>
            )}
          </div>
        </div>

        {/* Input Email & Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-desa-textDark uppercase tracking-wider mb-1.5">
              Alamat Email <span className="text-desa-textMuted font-normal">(Opsional)</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contoh: warga@gmail.com"
                className={`w-full min-h-[44px] pl-10 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border rounded-desa-sm focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20 focus:border-desa-primaryGreen focus:bg-white transition-all ${
                  errors.email
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-desa-border'
                }`}
              />
              <Envelope className="w-4 h-4 text-desa-textMuted absolute left-3 top-3.5" />
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-desa-textDark uppercase tracking-wider mb-1.5">
              Kategori Aspirasi
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full min-h-[44px] px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-desa-border rounded-desa-sm focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20 focus:border-desa-primaryGreen focus:bg-white transition-all"
            >
              <option value="Pertanyaan">Pertanyaan Umum</option>
              <option value="Aspirasi">Usulan / Pembangunan</option>
              <option value="Administrasi">Pelayanan Administrasi Warga</option>
              <option value="Pengaduan">Pengaduan & Ketertiban Lingkungan</option>
            </select>
          </div>
        </div>

        {/* Isi Pesan */}
        <div>
          <label className="block text-xs font-bold text-desa-textDark uppercase tracking-wider mb-1.5">
            Isi Pesan / Aspirasi <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="pesan"
            rows={4}
            value={formData.pesan}
            onChange={handleChange}
            placeholder="Tuliskan pesan, usulan, atau pertanyaan Anda secara rinci dan jelas..."
            className={`w-full p-3 text-xs sm:text-sm bg-slate-50 border rounded-desa-sm focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20 focus:border-desa-primaryGreen focus:bg-white transition-all ${
              errors.pesan
                ? 'border-rose-400 focus:ring-rose-400'
                : 'border-desa-border'
            }`}
          />
          {errors.pesan && (
            <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.pesan}</p>
          )}
        </div>

        {/* Math Challenge Captcha Anti-Spam */}
        <div className="p-4 rounded-desa-sm bg-slate-50 border border-desa-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-desa-primaryGreen shrink-0" />
            <span className="text-xs text-desa-textDark font-medium">
              Verifikasi Keamanan: Berapakah <strong>{captchaNum1} + {captchaNum2}</strong> ?
            </span>
            <button
              type="button"
              onClick={generateCaptcha}
              className="p-1.5 text-desa-textMuted hover:text-desa-darkGreen transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              title="Ganti Pertanyaan"
            >
              <ArrowsClockwise className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full sm:w-28">
            <input
              type="number"
              placeholder="Jawaban"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className={`w-full min-h-[44px] px-3 py-1.5 text-xs sm:text-sm text-center font-bold bg-white border rounded-desa-sm focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20 focus:border-desa-primaryGreen transition-all ${
                errors.captcha
                  ? 'border-rose-400 focus:ring-rose-400'
                  : 'border-desa-border'
              }`}
            />
          </div>
        </div>
        {errors.captcha && (
          <p className="text-[11px] text-rose-500 font-medium">{errors.captcha}</p>
        )}

        {/* Submit Button (min-h-[44px], rounded-desa-pill) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[44px] rounded-desa-pill bg-desa-primaryGreen text-white text-xs sm:text-sm font-bold hover:bg-desa-darkGreen transition-all shadow-desa-sm disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <ArrowsClockwise className="w-4 h-4 animate-spin" />
              <span>Mengirim Pesan...</span>
            </>
          ) : (
            <>
              <PaperPlaneTilt className="w-4 h-4" />
              <span>Kirim Pesan Sekarang</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
