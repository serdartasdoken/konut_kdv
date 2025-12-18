// DOM Elements
const form = document.getElementById('kdvForm');
const ruhsatTarihi = document.getElementById('ruhsatTarihi');
const netAlan = document.getElementById('netAlan');
const konutDurumu = document.getElementById('konutDurumu');
const arsaDegeri = document.getElementById('arsaDegeri');
const kentselDonusum = document.getElementById('kentselDonusum');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultArea = document.getElementById('resultArea');
const resultText = document.getElementById('resultText');

// Steps
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const stepDurum = document.getElementById('step_durum');
const stepArsa = document.getElementById('step_arsa');
const stepDonusum = document.getElementById('step_donusum');
const actionArea = document.getElementById('actionArea');

// State Manager
function updateVisibility() {
    const ruhsat = ruhsatTarihi.value;

    // Reset secondary questions if main selection changes
    if (!ruhsat) return;

    // Show Net Area (Always required after date selection)
    step2.classList.remove('hidden');

    // Hide all dynamic steps first
    stepDurum.classList.add('hidden');
    stepArsa.classList.add('hidden');
    stepDonusum.classList.add('hidden');

    // Logic for showing steps
    if (ruhsat === 'B' || ruhsat === 'C') {
        stepDurum.classList.remove('hidden');

        const durum = konutDurumu.value;
        // If Status is 3 (Luxury), show Land Value
        if (durum === '3') {
            stepArsa.classList.remove('hidden');
        }
    } else if (ruhsat === 'D') {
        stepDonusum.classList.remove('hidden');
    }

    // Show action button if basic requirements are met
    // Simplification: We show the button, but validate on click.
    actionArea.classList.remove('hidden');
}

// Event Listeners
ruhsatTarihi.addEventListener('change', updateVisibility);
konutDurumu.addEventListener('change', updateVisibility);
kentselDonusum.addEventListener('change', updateVisibility);

// Calculation Logic
calculateBtn.addEventListener('click', () => {
    const ruhsat = ruhsatTarihi.value;
    const alan = parseFloat(netAlan.value);

    // Validation
    if (!ruhsat || isNaN(alan)) {
        alert("Lütfen tüm zorunlu alanları doldurun.");
        return;
    }

    let sonuc = "";

    // 1. Durum: 2012 Öncesi (A)
    if (ruhsat === 'A') {
        if (alan <= 150) {
            sonuc = "KDV Oranı: %1";
        } else {
            sonuc = "KDV Oranı: %20";
        }
    }
    // 2. Durum: 2013-2016 Arası (B)
    else if (ruhsat === 'B') {
        const durum = konutDurumu.value;
        if (!durum) { alert("Lütfen konut durumunu seçin."); return; }

        if (durum === '1' || durum === '2') { // Dışarıda veya Dönüşüm
            if (alan <= 150) sonuc = "KDV Oranı: %1";
            else sonuc = "KDV Oranı: %20";
        } else { // Lüks (3)
            if (alan > 150) {
                sonuc = "KDV Oranı: %20";
            } else {
                const arsa = parseFloat(arsaDegeri.value);
                if (isNaN(arsa)) { alert("Lütfen arsa değerini girin."); return; }

                if (arsa < 500) sonuc = "KDV Oranı: %1";
                else if (arsa <= 1000) sonuc = "KDV Oranı: %10"; // Updated per python logic: 500 <= x <= 1000
                else sonuc = "KDV Oranı: %20";
            }
        }
    }
    // 3. Durum: 2017-2022 Arası (C)
    else if (ruhsat === 'C') {
        const durum = konutDurumu.value;
        if (!durum) { alert("Lütfen konut durumunu seçin."); return; }

        if (durum === '1' || durum === '2') {
            if (alan <= 150) sonuc = "KDV Oranı: %1";
            else sonuc = "KDV Oranı: %20";
        } else { // Lüks (3)
            if (alan > 150) {
                sonuc = "KDV Oranı: %20";
            } else {
                const arsa = parseFloat(arsaDegeri.value);
                if (isNaN(arsa)) { alert("Lütfen arsa değerini girin."); return; }

                if (arsa < 1000) sonuc = "KDV Oranı: %1";
                else if (arsa <= 2000) sonuc = "KDV Oranı: %10";
                else sonuc = "KDV Oranı: %20";
            }
        }
    }
    // 4. Durum: 2022 Sonrası (D)
    else if (ruhsat === 'D') {
        const donusum = kentselDonusum.value;
        if (!donusum) { alert("Lütfen kentsel dönüşüm durumunu seçin."); return; }

        if (donusum === 'E') { // Evet Dönüşüm
            if (alan <= 150) sonuc = "KDV Oranı: %1";
            else sonuc = "Kademeli Oran: 150 m²'ye kadar %1, aşan kısım için %20";
        } else { // Hayır
            if (alan <= 150) sonuc = "KDV Oranı: %10";
            else sonuc = "Kademeli Oran: 150 m²'ye kadar %10, aşan kısım için %20";
        }
    }

    // Display Result
    resultText.textContent = sonuc;
    form.classList.add('hidden'); // Hide form
    resultArea.classList.remove('hidden'); // Show result
});

// Reset
resetBtn.addEventListener('click', () => {
    form.reset();
    resultArea.classList.add('hidden');
    form.classList.remove('hidden');
    updateVisibility(); // Reset visibility states
});
