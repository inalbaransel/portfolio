import { useState, useEffect } from 'react';

// Bu hook, verdiğimiz font ve resim listelerini yükler
// ve 0-100 arası gerçek progress'i döndürür.
export const useAssetLoader = (fontAssets = [], imageAssets = []) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Yüklenecek toplam asset sayısı
    const totalAssets = fontAssets.length + imageAssets.length;
    if (totalAssets === 0) {
      setProgress(100);
      return;
    }

    let loadedAssets = 0;

    // Yükleme bittiğinde progress'i güncelleyen fonksiyon
    const updateProgress = () => {
      loadedAssets++;
      const newProgress = (loadedAssets / totalAssets) * 100;
      setProgress(newProgress);
    };

    // 1. Fontları yükle
    const fontPromises = fontAssets.map(font => {
      return document.fonts.load(font)
        .then(() => {
          console.log(`Font yüklendi: ${font}`);
          updateProgress();
        })
        .catch(err => {
          console.warn(`Font yüklenemedi: ${font}`, err);
          updateProgress(); // Hata alsa bile devam et
        });
    });

    // 2. Resimleri yükle
    const imagePromises = imageAssets.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          console.log(`Resim yüklendi: ${src}`);
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          console.warn(`Resim yüklenemedi: ${src}`);
          updateProgress(); // Hata alsa bile devam et
          resolve(); // Hata durumunda da promise'i çöz
        };
      });
    });

    // Tüm yüklemelerin bitmesini bekle (aslında progress'i zaten tek tek güncelliyoruz
    // ama temiz bir başlangıç için Promise.all kullanabiliriz)
    // Aslında promise'leri tetiklemek için bu kısım yeterli.
    Promise.all([...fontPromises, ...imagePromises]).then(() => {
      console.log('Tüm kritik assetler yüklendi.');
      setProgress(100); // Ne olur ne olmaz, sonunda %100 yap
    });

  }, [fontAssets, imageAssets]); // Asset listeleri değişirse (pek olası değil) tekrar çalışır

  return progress;
};