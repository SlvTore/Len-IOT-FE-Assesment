export function convertDmsToDd(
  degree: number,
  minutes: number,
  seconds: number,
  direction: 'N' | 'S' | 'E' | 'W'
): number {
  // Rumus konversi dari DMS (Derajat, Menit, Detik) ke DD (Desimal Derajat)
  let decimal = degree + (minutes / 60) + (seconds / 3600);

  //Arah Barat dan Selatan harus bernilai negatif
  if (direction === 'S' || direction === 'W') {
    decimal *= -1;
  }

  return decimal;
}

// Konversi DD ke DMS
export function convertDdToDms(decimal: number, isLatitude: boolean) {

    //gunakan math absolute untuk mengubah nilai negatif menjadi positif  untuk sementara 
    // dan math floor untuk membulatakan angka
    const absDecimal = Math.abs(decimal);
    const degree = Math.floor(absDecimal);
    const minutesFloat = (absDecimal - degree) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60);

    //Fungsi Menentukan arah anginn
    let  direction = '';
    if (isLatitude) {
      direction = decimal >= 0 ? 'N' : 'S'; //positif
    } else {
      direction = decimal >= 0 ? 'E' : 'W';//negatif
    }
    return { degree, minutes, seconds, direction };
  }

