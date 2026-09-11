# Halo, Saya Mochamad Nur Fadillah

Project ini merupakan Converter untuk mengubah nilai Geografis Degree, Minutes, dan juga second menjadi Decimal degrees yang lebih umum dan sederhana untuk memposisikan koordinat.

## Implementasi

I. Inisiasi Peta OSM
Peta yang dimuat dari library openlayers, disertai button/toggle untuk menampilkan form fungsi utama konversi
[Lihat implementasi MapComponent](./src/components/Map/MapComponent.tsx) dan floating di [Lihat Implementasi Floating button](./src/components/FloatingButton/FloatingButton.tsx)

II. Konversi Latitude dan Longitude
Setelah user mengakses button, maka akan langsung membuka sidebar panel form untuk fungsi utama yaitu konversi antara DD dan Dms atau sebaliknya.
[Lihat Implementasi Sidebar](./src/components/SidebarPanel.tsx) & berisi [Form Konversi](./src/components/ConversionForm/ConversionForm.tsx)

Saat mengisi Nilai DMS ke DD, user diperlukan mmentukan arah angin antara N = utara, E = Timur, S= Selatan, dan W = West, nantinya untuk nilai S dan W, akan dikonversi dulu ke nilai negatif dengan
`*= -1`
setelah itu nilai akan dikonversi melalui rumus perhitungan :
` degree + minutes / 60 + seconds / 3600`

Saat mengisi NIlai DD ke DSMS, user perlu memasukkan nilai parameter desimal degree yang mencakup Longitude dan latitude
ada fungsi math yang mencakup 
1.Math.abs() untuk mengambil nilai secara absolutt koordinat terlebih dahulu menjadi  nilai yang positif
2. Math.floor untukmembulatkan nilai Sebagai contoh, dari nilai 49.502778, bagian derajatnya adalah 49. 
3.Sisa nilai desimalnya kemudian digunakan untuk menghitung menit.
`const minutesFloat = (absoluteDecimal - degree) * 60;`
Sisa desimal dikalikan 60 karena satu derajat terdiri dari enam puluh menit.Nilai menit dibulatkan ke bawah menggunakan mathfloor
4.Setelah menit diperoleh, bagian desimal dari menit dikonversi menjadi detik Nilai tersebut kembali dikalikan 60 karena satu menit terdiri dari enam puluh detik
`const seconds = Math.round((minutesFloat - minutes) * 60);`
5.Pada bagian berikutnya, fungsi menentukan arah koordinat berdasarkan nilai asli sebelum menggunakan Math.abs(). Untuk latitude, nilai positif menunjukkan arah utara (N) dan nilai negatif menunjukkan arah selatan (S)Untuk longitude, nilai positif menunjukkan arah timur (E) dan nilai negatif menunjukkan arah barat (W).
`const direction: Direction = isLatitude ? decimal >= 0 ? 'N' : 'S': decimal >= 0 ? 'E' : 'W';`
Hasil akhirnya dikembalikan sebagai object yang berisi derajat, menit, detik, dan arah
[Lihat Rumus Konversi](./src/utils/coordinateConverter.ts) & hasil dilemparkan ke [Implementasi result](./src/hooks/useCoordinateConverter.ts)

III. Add to Map
Pada form DMS to dd terdapat fungsi pinpoint atau markah ke titik yang telah dikonversi
[Lihat fungsi Markah](./src/hooks/useMapInteraction.ts)

IV. Tambahan
Terdapat toggle dark mode dan juga Help Panel 
[Lihat Help Panel ](./src/components/HelpPanel.tsx)

## Run dan Test

### Menjalankan Aplikasi

1.Pastikan Node.js dan npm sudah terpasang. Buka terminal, lalu masuk ke folder project:

```bash
cd len-ioti-map
```
2.Install seluruh dependency yang diperlukan:

```bash
npm install
```
3. Jalsnkan Aplikasi 


```bash
npm start
```
4.Setelah proses berhasil, buka alamat berikut pada browser: [http://localhost:3000](http://localhost:3000)

Aplikasi akan menampilkan peta OpenLayers dan beberapa tombol aksi di sisi kanan. Tombol tersebut digunakan untuk:

>Mengubah mode tampilan dark dan light.
>Membuka panel bantuan.
>Membuka sidebar Coordinate Converter.

5. Pada sidebar, tersedia dua mode konversi:

DMS ke DD

Masukkan degree, minutes, seconds, dan arah koordinat. Tekan tombol Convert untuk mendapatkan nilai Decimal Degrees. Setelah hasil tersedia, gunakan tombol Pinpoint on map untuk menampilkan lokasi pada peta.

DD ke DMS

Masukkan nilai Decimal Degrees untuk latitude dan longitude. Tekan tombol Convert untuk mendapatkan hasil dalam format Degree, Minutes, Seconds.

### Menjalankan Test menggunakan jest
 jalankan test  menggunakan command 

```bash
npm test
```

untuk test berada di setiap folder fungsional di dalam src

Test utility memeriksa keakuratan perhitungan DMS ke DD dan DD ke DMS. Test hook memeriksa state dan proses konversi. Test component memeriksa interaksi form dan proses penempatan marker. Test integration memeriksa alur aplikasi dari pembukaan sidebar sampai konversi koordinat.openLayers di-mock pada test agar Jest tidak perlu membuat peta yang sebenarnya. 