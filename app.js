/* ==========================================================================
   KKN LAMONGAN 2026 - AI PRESENTATION APP JS (CLEAN SLIDE DECK THEME)
   ========================================================================== */

// Global error fallback for KKN logo file formats
window.handleLogoError = function(img) {
    if (img.src.endsWith('logo.png')) {
        img.src = 'logo.jpg';
    } else if (img.src.endsWith('logo.jpg')) {
        img.src = 'logo.jpeg';
    } else if (img.src.endsWith('logo.jpeg')) {
        img.src = 'logo.png'; // prevent infinite loops
        img.onerror = null;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initSlideManager();
    initConceptSlider();
    initPromptPlayground();
    initPromptGrader();
    initQuiz();
});

/* ==========================================================================
   1. SLIDE NAVIGATION MANAGER
   ========================================================================== */
function initSlideManager() {
    const slides = document.querySelectorAll("section.slide");
    const navLinks = document.querySelectorAll(".nav-link");
    const dots = document.querySelectorAll(".indicator-dot");

    // Scroll to Slide Function
    window.scrollToSlide = function(index) {
        if (slides[index]) {
            slides[index].scrollIntoView({ behavior: "smooth" });
        }
    };

    // Click handler for top navigation
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const slideIndex = parseInt(link.getAttribute("data-slide"));
            scrollToSlide(slideIndex);
        });
    });

    // Click handler for indicator dots
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const slideIndex = parseInt(dot.getAttribute("data-slide"));
            scrollToSlide(slideIndex);
        });
    });

    // IntersectionObserver to detect which slide is currently in view
    const observerOptions = {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideId = entry.target.id;
                let activeIndex = 0;
                
                // Find slide index
                slides.forEach((slide, idx) => {
                    if (slide.id === slideId) {
                        activeIndex = idx;
                    }
                });

                updateNavigationUI(activeIndex);
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    function updateNavigationUI(index) {
        navLinks.forEach((link, idx) => {
            if (idx === index) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }
}

/* ==========================================================================
   2. SLIDE 3: CONCEPT SLIDER (Sebelum vs Sesudah AI)
   ========================================================================== */
function initConceptSlider() {
    const slider = document.getElementById("concept-slider");
    const descText = document.getElementById("slider-desc");

    const descriptions = [
        `<strong>💻 Sebelum AI (Kaku):</strong> Pemrosesan data sepenuhnya mengandalkan aturan pemrograman manual (coding kaku). Programmer harus menulis semua kondisi aturan satu per satu secara detail di komputer agar komputer bisa memprosesnya. Hasilnya sangat kaku, lambat beradaptasi, dan sistem akan langsung eror jika ada data baru yang sedikit tidak sesuai aturan tertulis.`,
        `<strong>🤖 Sesudah AI (Adaptif):</strong> Dengan Kecerdasan Buatan (Machine Learning), komputer diajarkan dengan cara memberikan ribuan contoh data (Input & Output). Sistem AI akan menganalisis pola secara otomatis untuk menemukan rumusnya sendiri. Jika terjadi situasi atau ada data baru, AI dengan cerdas dapat menyesuaikan perilakunya tanpa perlu diprogram ulang oleh manusia!`
    ];

    function updateDescription() {
        const value = parseInt(slider.value);
        descText.innerHTML = descriptions[value];
    }

    // Initialize
    updateDescription();
    slider.addEventListener("input", updateDescription);
}

/* ==========================================================================
   3. SLIDE 6: PROMPT SALAH VS BENAR DIALOGUE SIMULATOR (WhatsApp Style)
   ========================================================================== */
function initPromptPlayground() {
    const options = document.querySelectorAll(".prompt-option");
    const chatBody = document.getElementById("chat-body");

    const dialogues = {
        "salah-1": {
            user: "Buatkan saya konten edukasi AI.",
            ai: "Berikut adalah informasi singkat tentang edukasi AI:<br><br>Kecerdasan Buatan (AI) adalah bidang ilmu komputer yang bertujuan membuat sistem komputer pintar. AI banyak digunakan untuk otomasi, analisis data, dan membantu pekerjaan manusia sehari-hari.<br><br>Apakah ada hal spesifik lain yang Anda butuhkan?"
        },
        "benar-1": {
            user: "Anda adalah seorang pengajar AI (<strong>Context</strong>). Anda diminta untuk membuatkan saya artikel edukasi tentang teknik prompting dengan maksimal 1500 kata untuk sebuah acara seminar (<strong>Task</strong>). Gunakan bahasa yang mudah dipahami orang awam (<strong>Instruction</strong>). Hasilkan 3 paragraf dari artikel tersebut (<strong>Format</strong>).",
            ai: "Halo semuanya! Selamat datang di seminar hari ini. Sebagai pengajar AI Anda, saya ingin mengenalkan sebuah konsep penting: teknik prompting. Prompting secara sederhana adalah cara kita berbicara dan memberikan perintah kepada sistem AI agar ia mengerti apa yang kita inginkan. Bagaikan mengajari asisten baru, cara kita memberikan instruksi menentukan seberapa bagus hasil pekerjaannya.<br><br>Kunci utama dari teknik prompting yang efektif terletak pada kejelasan dan kedetailan perintah. Banyak orang mengeluh jawaban AI kurang memuaskan, padahal masalahnya terletak pada perintahnya yang terlalu singkat dan ambigu. Dengan memberikan konteks peran dan format keluaran yang jelas kepada AI, kita bisa menghindari jawaban yang melantur atau salah informasi.<br><br>Untuk mempermudah latihan, kita bisa menggunakan rumus jitu bernama Metode CTIF: tentukan perannya (Context), jelaskan tugas utamanya (Task), batasi aturan penyampaiannya (Instruction), dan tentukan bentuk outputnya (Format). Dengan mempraktikkan metode ini, Anda akan terkejut melihat betapa cerdas dan membantunya AI dalam mempermudah pembelajaran dan pekerjaan Anda sehari-hari! 🎓🚀"
        },
        "salah-2": {
            user: "buatkan saya poster bahaya membuang sampah",
            ai: "Saya tidak dapat memproduksi file gambar secara langsung, namun berikut konsep poster bahaya membuang sampah:<br><br>- <strong>Judul:</strong> Jangan Buang Sampah Sembarangan<br>- <strong>Gambar:</strong> Tempat sampah dan tanda silang merah<br>- <strong>Keterangan:</strong> Buanglah sampah pada tempatnya demi kebersihan lingkungan kita bersama."
        },
        "benar-2": {
            user: "Anda adalah seorang tim edukasi lingkungan (<strong>Context</strong>). Anda diminta untuk membuatkan saya konsep poster bahaya membuang sampah sembarangan di lingkungan sekitar (<strong>Task</strong>). Informasi memuat dampak lingkungan dan dampak kesehatan bagi manusia. Gunakan visual yang ramah anak dan tidak menyeramkan namun maknanya tetap tersampaikan (<strong>Instruction</strong>). Tulis dalam bentuk terstruktur (<strong>Format</strong>).",
            ai: "Tentu! Berikut adalah konsep struktur detail untuk poster edukasi lingkungan Anda: 🌿💚<br><br><strong>1. Detail Visual & Desain:</strong><br>- <strong>Gaya Visual:</strong> Ilustrasi kartun ramah anak (gaya flat design) dengan palet warna hijau alam hangat, kuning ceria, dan sedikit warna biru bersih.<br>- <strong>Gambar Utama:</strong> Ilustrasi bumi tersenyum yang sedang memegang sapu bersih, didampingi dua anak sekolah dasar yang membuang botol plastik ke tempat sampah berkode warna.<br><br><strong>2. Konten Informasi Poster:</strong><br>- <strong>Judul Poster:</strong> 'Bumi Bersih, Kita Sehat! Yuk Sayangi Lingkunganmu.'<br>- <strong>Poin Dampak Lingkungan:</strong> Mengilustrasikan saluran air (selokan) tersumbat plastik dengan ikan kecil berwajah sedih, menunjukkan bahaya banjir lokal.<br>- <strong>Poin Dampak Kesehatan:</strong> Gambar nyamuk lucu membawa kaca pembesar dengan tulisan 'Bahaya demam berdarah dari genangan sampah liar.'<br><br><strong>3. Kalimat Ajakan (Call to Action):</strong><br>- Di bagian bawah poster ditulis dengan huruf tebal berwarna cokelat ramah: 'Setiap sampah kecil yang kamu buang pada tempatnya adalah hadiah besar bagi kesehatan Bumi!' 🌍✨"
        }
    };

    let typingTimeout;

    function runSimulation(promptId) {
        chatBody.innerHTML = "";
        const data = dialogues[promptId];
        if (!data) return;

        // User Bubble
        const userBubble = document.createElement("div");
        userBubble.className = "chat-bubble user";
        userBubble.innerHTML = data.user;
        chatBody.appendChild(userBubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Show Typing Indicator
        setTimeout(() => {
            const indicator = document.createElement("div");
            indicator.className = "typing-indicator";
            indicator.id = "typing-indicator";
            indicator.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatBody.appendChild(indicator);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Type Response
            setTimeout(() => {
                const indNode = document.getElementById("typing-indicator");
                if (indNode) indNode.remove();

                const aiBubble = document.createElement("div");
                aiBubble.className = "chat-bubble ai";
                chatBody.appendChild(aiBubble);
                
                typeText(aiBubble, data.ai);
            }, 1000);

        }, 400);
    }

    function typeText(element, htmlContent) {
        clearTimeout(typingTimeout);
        element.innerHTML = "";
        let index = 0;
        
        function type() {
            if (index < htmlContent.length) {
                if (htmlContent[index] === '<') {
                    const closing = htmlContent.indexOf('>', index);
                    if (closing !== -1) {
                        element.innerHTML += htmlContent.substring(index, closing + 1);
                        index = closing + 1;
                    } else {
                        element.innerHTML += htmlContent[index];
                        index++;
                    }
                } else {
                    element.innerHTML += htmlContent[index];
                    index++;
                }
                chatBody.scrollTop = chatBody.scrollHeight;
                typingTimeout = setTimeout(type, 8); // faster typing speed
            }
        }
        type();
    }

    options.forEach(opt => {
        opt.addEventListener("click", () => {
            options.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");
            const promptId = opt.getAttribute("data-prompt-id");
            runSimulation(promptId);
        });
    });

    runSimulation("salah-1");
}

/* ==========================================================================
   4. SLIDE 7: INTERACTIVE PROMPT GRADER (Lembar Koreksi Tugas KKN)
   ========================================================================== */
function initPromptGrader() {
    const inputField = document.getElementById("student-prompt-input");
    const checkBtn = document.getElementById("check-prompt-btn");
    const gradeCircle = document.getElementById("grade-circle");
    const gradeVal = document.getElementById("grade-val");
    const feedbackBox = document.getElementById("grader-feedback");

    const pillC = document.getElementById("pill-c");
    const pillT = document.getElementById("pill-t");
    const pillI = document.getElementById("pill-i");
    const pillF = document.getElementById("pill-f");

    const exampleCorrectPrompt = "Anda adalah seorang desainer grafis ahli KKN (Context). Buatkan saya rencana konsep poster edukasi tentang bahaya manipulasi deepfake dalam kasus penipuan uang online (Task). Gunakan bahasa yang mudah dipahami anak SMA dan tekankan pentingnya kroscek (Instruction). Tulis dalam bentuk poin-poin terstruktur (Format).";

    window.insertExamplePrompt = function() {
        inputField.value = exampleCorrectPrompt;
        gradeCircle.classList.remove("active");
        gradeVal.textContent = "0";
        feedbackBox.innerHTML = "Contoh dimasukkan. Silakan klik tombol <strong>'Koreksi Tugas Saya'</strong> untuk menguji!";
        
        pillC.classList.remove("checked");
        pillT.classList.remove("checked");
        pillI.classList.remove("checked");
        pillF.classList.remove("checked");
    };

    checkBtn.addEventListener("click", () => {
        const text = inputField.value.trim().toLowerCase();

        if (text.length < 10) {
            feedbackBox.innerHTML = "<span style='color: #d9534f;'>Catatan: Kolom tugas kosong atau terlalu pendek! Silakan tulis kalimat latihan prompt kamu terlebih dahulu.</span>";
            return;
        }

        // Context (C)
        const cKeywords = ["anda adalah", "kamu adalah", "sebagai", "seorang", "tim", "ahli", "pakar", "desainer", "creator", "spesialis"];
        const hasC = cKeywords.some(keyword => text.includes(keyword));

        // Task (T)
        const tKeywords = ["buatkan", "membuat", "tuliskan", "rancang", "desain", "konsep", "poster", "deepfake", "penipuan", "scam", "manipulasi", "scammer"];
        const hasT = tKeywords.some(keyword => text.includes(keyword));

        // Instruction (I)
        const iKeywords = ["jangan", "gunakan", "bahasa", "ramah", "detail", "dampak", "bahaya", "penjelasan", "mudah dipahami", "menarik", "warna", "gaya", "tekankan", "tulis dengan"];
        const hasI = iKeywords.some(keyword => text.includes(keyword));

        // Format (F)
        const fKeywords = ["format", "bentuk", "paragraf", "poin", "list", "terstruktur", "bullet", "tabel", "judul", "subjudul", "ringkasan"];
        const hasF = fKeywords.some(keyword => text.includes(keyword));

        // Update indicators
        updatePill(pillC, hasC);
        updatePill(pillT, hasT);
        updatePill(pillI, hasI);
        updatePill(pillF, hasF);

        // Calculate score
        let score = 20;
        if (hasC) score += 20;
        if (hasT) score += 20;
        if (hasI) score += 20;
        if (hasF) score += 20;

        animateScore(score);

        // Teacher correction feedback
        let feedback = "";
        if (score === 100) {
            feedback = "<strong>Luar Biasa! (Nilai 100)</strong> 👍 Prompt kamu sangat lengkap dan mengikuti Metode CTIF dengan sempurna! Kakak sangat bangga. Hasil asisten AI dipastikan sangat akurat.";
        } else if (score === 80) {
            feedback = "<strong>Sangat Baik! (Nilai 80)</strong> 👏 Keren! Kamu sudah memasukkan 3 kriteria CTIF. Tinggal menambahkan sedikit aturan penulisan yang spesifik (Instruction/Format) agar nilaimu sempurna.";
        } else if (score === 60) {
            feedback = "<strong>Cukup Baik! (Nilai 60)</strong> 🙂 Bagus, tapi masih ada pilar penting CTIF yang terlewat. Coba tambahkan peran asisten AI (Context) atau bentuk jawabannya (Format) ya.";
        } else {
            feedback = "<strong>Perlu Perbaikan (Nilai &le; 40)</strong> ✍️ Prompt kamu masih terlalu pendek atau belum terarah. Yuk coba lengkapi dengan Metode CTIF agar asisten AI tidak kebingungan saat diperintah!";
        }

        feedbackBox.innerHTML = feedback;
        gradeCircle.classList.add("active");
    });

    function updatePill(pillElement, condition) {
        if (condition) {
            pillElement.classList.add("checked");
        } else {
            pillElement.classList.remove("checked");
        }
    }

    function animateScore(targetScore) {
        let current = 0;
        const interval = setInterval(() => {
            if (current >= targetScore) {
                clearInterval(interval);
                gradeVal.textContent = targetScore;
            } else {
                current += 5;
                gradeVal.textContent = current;
            }
        }, 20);
    }
}

/* ==========================================================================
   5. SLIDE 9: KUIS INTERAKTIF
   ========================================================================== */
const quizQuestions = [
    {
        question: "Apa definisi dari Kecerdasan Buatan (AI)?",
        options: [
            "Mesin hitung angka matematika super cepat",
            "Cabang ilmu komputer yang mensimulasikan kecerdasan manusia",
            "Platform untuk membuat website sekolah gratis",
            "Kabel penghubung internet bawah laut"
        ],
        correct: 1, // index B
        feedback: "Betul! AI mensimulasikan proses kecerdasan manusia seperti belajar, bernalar, dan pemecahan masalah."
    },
    {
        question: "Mengapa kita memerlukan teknik khusus saat menulis Prompt ke AI?",
        options: [
            "Agar kuota internet kita tidak cepat habis",
            "Untuk menghindari halusinasi AI dan meningkatkan akurasi respon",
            "Karena AI hanya menerima perintah berbahasa asing",
            "Supaya komputer tidak mati mendadak"
        ],
        correct: 1, // index B
        feedback: "Keren! Prompt yang spesifik membantu AI memahami batasan tugas dan memberikan jawaban yang akurat."
    },
    {
        question: "Di bawah ini yang merupakan 4 pilar dalam rumus jitu prompting adalah...",
        options: [
            "Coding, Typing, Installing, Formatting",
            "Context, Task, Instruction, Format",
            "Computer, Technology, Internet, File",
            "Chatting, Translating, Image, Feedback"
        ],
        correct: 1, // index B
        feedback: "Tepat! CTIF (Context, Task, Instruction, Format) adalah formula wajib agar hasil prompting maksimal."
    },
    {
        question: "Bagaimanakah sikap yang etis dan bijak dalam menggunakan AI untuk belajar?",
        options: [
            "Copy-paste mentah-mentah seluruh hasil AI untuk tugas tanpa dibaca ulang",
            "Memasukkan data pribadi rahasia keluarga ke platform AI",
            "Menggunakan AI sebagai asisten diskusi/ide awal dan tetap menjaga kejujuran akademik",
            "Menghindari penggunaan AI sama sekali karena teknologi itu buruk"
        ],
        correct: 2, // index C
        feedback: "Luar biasa! AI adalah asisten belajar yang hebat, asalkan orisinalitas pemikiran kita tetap diutamakan."
    }
];

let currentQuestionIndex = 0;
let userScore = 0;
let answered = false;

function initQuiz() {
    showQuestion();
}

function showQuestion() {
    answered = false;
    const qData = quizQuestions[currentQuestionIndex];
    
    document.getElementById("quiz-progress-text").textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizQuestions.length}`;
    const fillPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById("quiz-progress-fill").style.width = `${fillPercent}%`;

    document.getElementById("quiz-question").textContent = qData.question;
    
    const optionsContainer = document.getElementById("quiz-options");
    optionsContainer.innerHTML = "";

    const abc = ["A", "B", "C", "D"];

    qData.options.forEach((optText, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.innerHTML = `
            <span class="opt-index">${abc[index]}</span>
            <span>${optText}</span>
        `;
        
        btn.addEventListener("click", () => selectAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, clickedBtn) {
    if (answered) return;
    answered = true;

    const qData = quizQuestions[currentQuestionIndex];
    const correctIndex = qData.correct;
    const allButtons = document.querySelectorAll(".quiz-opt-btn");

    if (selectedIndex === correctIndex) {
        userScore++;
        clickedBtn.classList.add("correct");
    } else {
        clickedBtn.classList.add("wrong");
        allButtons[correctIndex].classList.add("correct");
    }

    setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showQuizResults();
        }
    }, 1800);
}

function showQuizResults() {
    document.getElementById("quiz-card").style.display = "none";
    const resultPanel = document.getElementById("quiz-result-panel");
    resultPanel.style.display = "flex";
    
    const finalScore = Math.round((userScore / quizQuestions.length) * 100);
    document.getElementById("quiz-score-val").textContent = finalScore;

    let feedback = "";
    if (finalScore === 100) {
        feedback = "Luar biasa! 🥳 Kamu mendapatkan skor sempurna! Kamu adalah calon Ahli AI masa depan dari Lamongan! 🚀🌟";
    } else if (finalScore >= 75) {
        feedback = "Keren sekali! 👍 Pemahamanmu tentang kecerdasan buatan sudah sangat mantap. Teruskan belajar!";
    } else if (finalScore >= 50) {
        feedback = "Cukup baik! 🙂 Kamu sudah memahami dasar-dasar AI dengan oke. Yuk pelajari lebih lanjut!";
    } else {
        feedback = "Tidak apa-apa! Kuis ini adalah proses belajar yang bagus. Ayo ulangi kuisnya dan coba lagi! 💪";
    }
    
    document.getElementById("quiz-result-feedback").innerHTML = feedback;
}

window.restartQuiz = function() {
    currentQuestionIndex = 0;
    userScore = 0;
    document.getElementById("quiz-card").style.display = "flex";
    document.getElementById("quiz-result-panel").style.display = "none";
    showQuestion();
};
