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

- ✅ `vercel.json` - Vercel konfigürasyonu (Node.js 18.x sabit)
- ✅ `next.config.js` - Next.js optimizasyonları
- ✅ `.nvmrc` - Node.js 18.19.0 sabit versiyon
- ✅ `.env.production` - Production environment variables
- ✅ `package.json` - Node.js engine 18.x sabit versiyon
- ✅ Kaldırıldı: `@types/axios` (deprecated package)
- ✅ **SSR Sorunları Düzeltildi:** Client-side rendering wrappers eklendi
- ✅ **Navigation Hatası Düzeltildi:** Hash navigation için `window` kontrolü eklendi
- ✅ **Hook Sorunları Düzeltildi:** Tüm React hooks component seviyesine taşındı

## 🔧 Düzeltilen SSR Sorunları

### 1. **Window Object Sorunu**
- `typeof window === 'undefined'` kontrolü eklendi
- Hash navigation güvenli hale getirildi

### 2. **React Hooks Sorunları**
- Callback içindeki `useColorModeValue` kullanımları düzeltildi
- Koşullu hook kullanımları kaldırıldı
- Hook tanımları component başlarına taşındı

### 3. **Client-Only Components**
- `ClientOnly` wrapper component'i eklendi
- Critical UI bileşenleri client-side render'a alındı
- Loading states eklendi

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

#### Application Error: Server-side Exception
- ✅ **Çözüldü:** Client-side rendering wrappers eklendi
- ✅ **Çözüldü:** Window object kontrolü eklendi
- ✅ **Çözüldü:** React hooks proper location'a taşındı

#### Navigation Issues
- ✅ **Çözüldü:** Hash navigation için browser check eklendi
- ✅ **Çözüldü:** setTimeout ile DOM ready kontrolü eklendi

## 📞 Destek

Sorun yaşarsanız:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
