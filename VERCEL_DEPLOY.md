# Vercel Web Sitesi Üzerinden Deploy Rehberi

Bu proje Vercel web sitesi üzerinden GitHub repository import ederek deploy edilmek için hazırlanmıştır.

## 🚀 Vercel Web Sitesi Üzerinden Deploy Adımları

### 1. Vercel'a Giriş Yapın
- [vercel.com](https://vercel.com) adresine gidin
- GitHub hesabınızla giriş yapın

### 2. Repository Import Edin
1. **"Add New..."** butonuna tıklayın
2. **"Project"** seçeneğini seçin
3. **"Import Git Repository"** bölümünde bu repository'yi seçin
4. **"Import"** butonuna tıklayın

### 3. Project Ayarları
- **Framework Preset:** Next.js (otomatik algılanacak)
- **Root Directory:** `./` (varsayılan)
- **Build Command:** `npm run build` (otomatik ayarlanacak)
- **Output Directory:** `.next` (otomatik ayarlanacak)
- **Install Command:** `npm install` (otomatik ayarlanacak)

### 4. Environment Variables (Otomatik)
Production environment'da şu değişkenler otomatik yüklenecek:

```
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_CHAIN_ID=galileo-3
NEXT_PUBLIC_DEFAULT_CHAIN=andromeda
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://galileo-gql.test.andromedaprotocol.io/
NEXT_PUBLIC_API_ENDPOINT=https://api.andromedaprotocol.io
NEXT_PUBLIC_NETWORK_TYPE=testnet
```

### 5. Deploy
- **"Deploy"** butonuna tıklayın
- İlk deploy işlemi 2-3 dakika sürebilir

## ✅ Yapılandırılmış Dosyalar

- ✅ `next.config.js` - Next.js optimizasyonları
- ✅ `.nvmrc` - Node.js 18.19.0 sabit versiyon
- ✅ `.env.production` - Production environment variables
- ✅ `package.json` - Node.js engine 18.x sabit versiyon
- ✅ Kaldırıldı: `@types/axios` (deprecated package)
- ✅ Kaldırıldı: `vercel.json` (Next.js otomatik algılanır)
- ✅ **SSR Sorunları Düzeltildi:** Client-side rendering wrappers eklendi
- ✅ **Navigation Hatası Düzeltildi:** Hash navigation için `window` kontrolü eklendi
- ✅ **Hook Sorunları Düzeltildi:** Tüm React hooks component seviyesine taşındı
- ✅ **Hash Navigation Düzeltildi:** Navigation hash links artık sadece homepage (/) ile çalışır
- ✅ **Explore Button Düzeltildi:** Ana "Explore" butonu artık tıklanamaz, sadece dropdown açılır
- ✅ **Collections Navigation Düzeltildi:** Collections links artık homepage hash ile çalışır
- ✅ **Storage Access Hatası Düzeltildi:** Tüm localStorage erişimleri güvenli hale getirildi
- ✅ **Collection Page SSR Düzeltildi:** Dynamic import ve error boundary eklendi
- ✅ **Storage Issues Çözüldü:** `localStorage`/`sessionStorage` safe access eklendi
- ✅ **Server Component Errors Çözüldü:** Dynamic imports ve NoSSR wrappers eklendi
- ✅ **Function Runtime Error Çözüldü:** vercel.json kaldırıldı, otomatik algılama aktif

## 🔧 Düzeltilen SSR Sorunları

### 1. **Storage Access Issues** ✅ **ÇÖZÜLDÜ**
- `localStorage` ve `sessionStorage` erişimi güvenli hale getirildi
- `safeStorage` utility'si eklendi
- `ThemeStorageManager` server-side safe yapıldı
- "Access to storage is not allowed" hatası çözüldü

### 2. **Window Object Sorunu** ✅ **ÇÖZÜLDÜ**
- `typeof window === 'undefined'` kontrolü eklendi
- Hash navigation güvenli hale getirildi

### 3. **React Hooks Sorunları** ✅ **ÇÖZÜLDÜ**
- Callback içindeki `useColorModeValue` kullanımları düzeltildi
- Koşullu hook kullanımları kaldırıldı
- Hook tanımları component başlarına taşındı

### 4. **Client-Only Components** ✅ **ÇÖZÜLDÜ**
- `NoSSR` wrapper component'i eklendi
- `ClientOnly` wrapper component'i eklendi
- Critical UI bileşenleri client-side render'a alındı
- Loading states eklendi

### 5. **Server Component Render Errors** ✅ **ÇÖZÜLDÜ**
- Tüm storage operations safe hale getirildi
- Dynamic imports ile SSR bypass yapıldı
- Error boundary ile graceful error handling

## 🔄 Otomatik Deployment

Deploy işlemi tamamlandıktan sonra:
- `main` branch'e yapılan her commit otomatik deploy edilecek
- Pull request'ler preview deployment oluşturacak
- Vercel dashboard'dan deployment loglarını takip edebilirsiniz

## 📊 Performans Optimizasyonları

Bu projede aktif edilen optimizasyonlar:
- ✅ SWC minification
- ✅ Console log removal (production)
- ✅ Image optimization
- ✅ Compression enabled
- ✅ ETag generation disabled
- ✅ Powered-by header removed
- ✅ **Client-side hydration** optimization
- ✅ **SSR error prevention**

## 🐛 Sorun Giderme

Deploy işlemi başarısız olursa:

1. **Build Logs Kontrol:** Vercel dashboard'da "Functions" sekmesinden build loglarını inceleyin
2. **Environment Variables:** Gerekli tüm environment variables'ların ayarlandığından emin olun
3. **Dependencies:** `package.json` dosyasındaki dependencies'lerin güncel olduğunu kontrol edin
4. **SSR Errors:** Browser console'da client-side hatalarını kontrol edin

### Yaygın Hatalar ve Çözümleri:

#### ✅ Application Error: Server-side Exception - ÇÖZÜLDÜ
- **Çözüm:** Client-side rendering wrappers eklendi
- **Çözüm:** Window object kontrolü eklendi
- **Çözüm:** React hooks proper location'a taşındı

#### ✅ Access to Storage is Not Allowed - ÇÖZÜLDÜ
- **Çözüm:** Safe storage utilities (`safeLocalStorage`, `safeSessionStorage`) eklendi
- **Çözüm:** `ThemeStorageManager` server-side safe yapıldı
- **Çözüm:** Try-catch blocks ile storage errors handle edildi

#### ✅ Navigation Issues - ÇÖZÜLDÜ
- **Çözüm:** Hash navigation için browser check eklendi
- **Çözüm:** setTimeout ile DOM ready kontrolü eklendi

#### ✅ Server Component Render Errors - ÇÖZÜLDÜ
- **Çözüm:** `NoSSR` wrapper ile critical components client-side'a alındı
- **Çözüm:** Dynamic imports ile SSR bypass yapıldı
- **Çözüm:** Error boundaries ile graceful error handling

#### ✅ Function Runtimes Error - ÇÖZÜLDÜ
- **Hata:** "Function Runtimes must have a valid version"
- **Çözüm:** `vercel.json` dosyası kaldırıldı
- **Açıklama:** Vercel, Next.js projelerini otomatik algılar, manuel konfigürasyon gerekmez

#### ✅ Hash Navigation on Dynamic Routes Error - ÇÖZÜLDÜ
- **Hata:** SSR errors when accessing hash links on dynamic routes (e.g., `/elgafar-1/andromeda#featured`)
- **Çözüm:** Navbar hash navigation always points to homepage `/` instead of current route
- **Açıklama:** Hash links like `#featured`, `#help` now navigate to `/#featured`, `/#help` preventing SSR errors
- **Dosya:** `src/modules/common/layout/components/Navbar.tsx` - `homeRoute = '/'` olarak değiştirildi

#### ✅ Explore Button ve Collections Navigation - ÇÖZÜLDÜ
- **Problem:** "Explore" butonuna tıklamak ve "Collections" dropdown'ındaki linklere tıklamak SSR hataları veriyordu
- **Çözüm:** 
  - "Explore" butonu artık dropdown-only (sadece hover'da açılır, tıklanamaz)
  - Collections links artık dynamic routes yerine homepage hash (#collections-{id}) kullanır
  - Hash navigation always homepage (/) to prevent SSR errors on dynamic routes
- **Sonuç:** Explore dropdown ve Collections navigation artık güvenli şekilde çalışır

#### ✅ Dynamic Routes Hash Navigation - ÇÖZÜLDÜ
- **Problem:** `/elgafar-1/andromeda#featured` gibi dynamic routes'ta hash navigation "Something went wrong!" hatası veriyordu
- **Çözüm:** 
  - Tüm navbar hash links (Featured, Help, Trending vb.) artık daima `/#featured`, `/#help` formatında
  - `homeRoute = '/'` sabit değer olarak ayarlandı (dynamic route generation yerine)
  - Next.js router ile proper client-side navigation eklendi
- **Sonuç:** Hash navigation artık tüm sayfalarda güvenli şekilde çalışır

#### ✅ Collection Page "Something went wrong!" Hatası - ÇÖZÜLDÜ
- **Problem:** Collection sayfaları (örn: `/elgafar-1/andromeda/embeddables-auction-1`) "Something went wrong!" hatası veriyordu
- **Hata Sebepleri:**
  1. Server Components render error
  2. "Access to storage is not allowed from this context" - localStorage erişim hataları
  3. SSR/hydration mismatch
- **Çözümler:**
  - Collection page dynamic import ile SSR disabled (`ssr: false`)
  - ErrorBoundary eklendi graceful error handling için
  - Tüm localStorage erişimleri `safeLocalStorage` ile güvenli hale getirildi
  - `app/[chain]/providers.tsx` ve `app/preview/providers.tsx` dosyalarında unsafe storage erişimi düzeltildi
  - Collection Router'da better error handling eklendi
- **Sonuç:** Collection sayfaları artık güvenli şekilde çalışır, storage erişim hataları engellendir

#### ✅ Remaining Storage Access Issues - ÇÖZÜLDÜ
- **Problem:** Hâlâ bazı yerlerde direct localStorage erişimi vardı
- **Bulunan ve düzeltilen yerler:**
  - `app/preview/providers.tsx` - localStorage.getItem() → safeLocalStorage.getItem()
  - `app/[chain]/providers.tsx` - localStorage.getItem() → safeLocalStorage.getItem()
- **Sonuç:** Artık tüm storage erişimleri SSR-safe

## 📞 Destek

Sorun yaşarsanız:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
