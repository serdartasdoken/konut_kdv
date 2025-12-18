def kdv_orani_hesapla():
    print("--- Konut Teslimlerinde KDV Oranı Tespit Uygulaması ---")
    print("Not: Bu hesaplama 10.07.2023 tarihinden sonraki teslimler için güncel oranları (%10 ve %20) baz alır.\n")

    # 1. ADIM: Ruhsat Tarihi
    print("1. Yapı ruhsatı hangi tarihte alındı?")
    print("A) 31/12/2012 ve öncesi")
    print("B) 01/01/2013 - 31/12/2016 arası")
    print("C) 01/01/2017 - 31/03/2022 arası")
    print("D) 01/04/2022 ve sonrası")
    
    ruhsat = input("Seçiminiz (A/B/C/D): ").upper()

    # 2. ADIM: Net Alan
    net_alan = float(input("\n2. Konutun net alanı kaç m²? : "))

    # MANTIK AKIŞI
    
    # DURUM A: 2012 Öncesi
    if ruhsat == 'A':
        if net_alan <= 150:
            sonuc = "KDV Oranı: %1"
        else:
            sonuc = "KDV Oranı: %20"

    # DURUM B: 2013-2016 Arası
    elif ruhsat == 'B':
        print("\n3. Konutun durumu nedir?")
        print("1) Büyükşehir belediyesi sınırları dışında")
        print("2) Büyükşehirde ancak 6306 sayılı kanun kapsamında (Kentsel Dönüşüm)")
        print("3) Büyükşehirde ve lüks/birinci sınıf inşaat (Dönüşüm kapsamında değil)")
        durum = input("Seçiminiz (1/2/3): ")

        if durum in ['1', '2']:
            if net_alan <= 150: sonuc = "KDV Oranı: %1"
            else: sonuc = "KDV Oranı: %20"
        else:
            if net_alan > 150: sonuc = "KDV Oranı: %20"
            else:
                arsa_degeri = float(input("Arsa birim m² vergi değeri nedir? (TL): "))
                if arsa_degeri < 500: sonuc = "KDV Oranı: %1"
                elif 500 <= arsa_degeri <= 1000: sonuc = "KDV Oranı: %10"
                else: sonuc = "KDV Oranı: %20"

    # DURUM C: 2017-2022 Arası
    elif ruhsat == 'C':
        print("\n3. Konutun durumu nedir?")
        print("1) Büyükşehir belediyesi sınırları dışında")
        print("2) Büyükşehirde ancak 6306 sayılı kanun kapsamında (Kentsel Dönüşüm)")
        print("3) Büyükşehirde ve lüks/birinci sınıf inşaat (Dönüşüm kapsamında değil)")
        durum = input("Seçiminiz (1/2/3): ")

        if durum in ['1', '2']:
            if net_alan <= 150: sonuc = "KDV Oranı: %1"
            else: sonuc = "KDV Oranı: %20"
        else:
            if net_alan > 150: sonuc = "KDV Oranı: %20"
            else:
                arsa_degeri = float(input("Arsa birim m² vergi değeri nedir? (TL): "))
                if arsa_degeri < 1000: sonuc = "KDV Oranı: %1"
                elif 1000 <= arsa_degeri <= 2000: sonuc = "KDV Oranı: %10"
                else: sonuc = "KDV Oranı: %20"

    # DURUM D: 2022 Sonrası (Kademeli Oran Sistemi)
    elif ruhsat == 'D':
        print("\n3. Konut 6306 sayılı kanun kapsamında (Kentsel Dönüşüm) mı?")
        donusum = input("Evet/Hayır (E/H): ").upper()
        
        if donusum == 'E':
            if net_alan <= 150:
                sonuc = "KDV Oranı: %1"
            else:
                sonuc = "Kademeli Oran: 150 m²'ye kadar %1, aşan kısım için %20"
        else:
            if net_alan <= 150:
                sonuc = "KDV Oranı: %10"
            else:
                sonuc = "Kademeli Oran: 150 m²'ye kadar %10, aşan kısım için %20"

    else:
        sonuc = "Geçersiz seçim yaptınız."

    print("\n--------------------------")
    print("SONUÇ:", sonuc)
    print("--------------------------")

# Uygulamayı çalıştır
kdv_orani_hesapla()