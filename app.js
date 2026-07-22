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
    initPageManager();
    initSlideManager();
    initConceptSlider();
    initPromptPlayground();
    initPromptGrader();
    initQuiz();
    
    // Initialize new proker modules
    initCreativeProker();
    initKarakterProker();
    initGerbangProker();
});

/* ==========================================================================
   0. SPA PAGE ROUTER
   ========================================================================== */
window.toggleSidebar = function() {
    const sidebar = document.querySelector("header");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
};

window.switchPage = function(pageId) {
    const pages = document.querySelectorAll(".page-view");
    const navLinks = document.querySelectorAll(".nav-link");
    const submenuAi = document.getElementById("submenu-ai");
    const lateralDots = document.getElementById("lateral-slide-dots");

    const targetPage = document.getElementById("page-" + pageId);
    const isAlreadyActive = targetPage && targetPage.classList.contains("active");

    if (pageId === "proker-ai" && isAlreadyActive) {
        // Toggle submenu visibility if clicking again
        submenuAi.classList.toggle("active");
        return;
    }

    pages.forEach(page => {
        if (page.id === "page-" + pageId) {
            page.classList.add("active");
        } else {
            page.classList.remove("active");
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute("data-page") === pageId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Toggle submenu AI & lateral dots
    if (pageId === "proker-ai") {
        submenuAi.classList.add("active");
        lateralDots.style.display = "flex";
        window.scrollToSlide(0);
    } else {
        submenuAi.classList.remove("active");
        lateralDots.style.display = "none";
    }

    // Close sidebar drawer on mobile if open
    const sidebar = document.querySelector("header");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    }

    // Scroll window to top
    window.scrollTo({ top: 0, behavior: "instant" });
};

window.scrollToElement = function(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
};

function initPageManager() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const pageId = link.getAttribute("data-page");
            if (pageId) {
                switchPage(pageId);
            }
        });
    });
}

/* ==========================================================================
   1. SLIDE NAVIGATION MANAGER (Inside Proker AI)
   ========================================================================== */
function initSlideManager() {
    const slides = document.querySelectorAll("section.slide");
    const navSubLinks = document.querySelectorAll(".nav-sublink");
    const dots = document.querySelectorAll(".indicator-dot");

    // Scroll to Slide Function
    window.scrollToSlide = function(index) {
        if (slides[index]) {
            slides[index].scrollIntoView({ behavior: "smooth" });
        }
    };

    // Click handler for sub navigation links
    navSubLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const slideIndex = parseInt(link.getAttribute("data-slide"));
            scrollToSlide(slideIndex);
            
            // Close mobile sidebar drawer if open
            const sidebar = document.querySelector("header");
            const overlay = document.getElementById("sidebar-overlay");
            if (sidebar && sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
                overlay.classList.remove("active");
            }
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
        navSubLinks.forEach((link, idx) => {
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

// ==========================================================================
// CONFIGURATION: URL GOOGLE APPS SCRIPT WEB APP
// Tempelkan URL Web App Google Apps Script Anda di bawah ini
// ==========================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyDN4HvSctps1E6MPU4nk5Y1pYVN_gzZuLnZLS5KVW9l0bG0i1x113YikrXmdzkQQ8/exec"; 

let currentQuestionIndex = 0;
let userScore = 0;
let answered = false;
let currentUserIdentity = { name: "", classInfo: "" };

function initQuiz() {
    const savedSubmission = localStorage.getItem("kkn_quiz_submitted_v1");
    const idPanel = document.getElementById("quiz-identity-panel");
    const progEl = document.getElementById("quiz-progress");
    const cardEl = document.getElementById("quiz-card");
    const resPanel = document.getElementById("quiz-result-panel");
    const compPanel = document.getElementById("quiz-completed-panel");

    if (savedSubmission) {
        // Jika sudah pernah mengerjakan kuis di perangkat ini
        try {
            const data = JSON.parse(savedSubmission);
            if (idPanel) idPanel.style.display = "none";
            if (progEl) progEl.style.display = "none";
            if (cardEl) cardEl.style.display = "none";
            if (resPanel) resPanel.style.display = "none";

            if (compPanel) {
                document.getElementById("quiz-completed-name").textContent = data.nama || "-";
                document.getElementById("quiz-completed-class").textContent = data.kelas || "-";
                document.getElementById("quiz-completed-score").textContent = (data.skor !== undefined ? data.skor : "-") + " / 100";
                document.getElementById("quiz-completed-time").textContent = data.waktu || "-";
                compPanel.style.display = "block";
            }
        } catch(e) {
            console.error("Error loading saved quiz submission", e);
        }
        return;
    }

    // Reset view ke form identitas jika belum mengerjakan kuis
    if (!currentUserIdentity.name) {
        if (idPanel) idPanel.style.display = "block";
        if (progEl) progEl.style.display = "none";
        if (cardEl) cardEl.style.display = "none";
        if (resPanel) resPanel.style.display = "none";
        if (compPanel) compPanel.style.display = "none";
    }
}

window.startQuizWithIdentity = function(event) {
    if (event) event.preventDefault();
    const nameVal = document.getElementById("quiz-user-name").value.trim();
    const classVal = document.getElementById("quiz-user-class").value.trim();

    if (!nameVal || !classVal) return;

    currentUserIdentity.name = nameVal;
    currentUserIdentity.classInfo = classVal;

    document.getElementById("quiz-identity-panel").style.display = "none";
    document.getElementById("quiz-progress").style.display = "block";
    document.getElementById("quiz-card").style.display = "flex";

    currentQuestionIndex = 0;
    userScore = 0;
    showQuestion();
};

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
    document.getElementById("quiz-progress").style.display = "none";
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

    const waktuStr = new Date().toLocaleString("id-ID");

    // Simpan status pengerjaan kuis 1 kali di browser peserta
    localStorage.setItem("kkn_quiz_submitted_v1", JSON.stringify({
        nama: currentUserIdentity.name || "Anonim",
        kelas: currentUserIdentity.classInfo || "-",
        skor: finalScore,
        waktu: waktuStr
    }));

    // Kirim Data Nilai ke Google Sheets Backend
    sendQuizResultToGoogleSheets({
        nama: currentUserIdentity.name || "Anonim",
        kelas: currentUserIdentity.classInfo || "-",
        skor: finalScore,
        benar: userScore,
        totalSoal: quizQuestions.length,
        waktu: waktuStr
    });
}

function sendQuizResultToGoogleSheets(data) {
    const statusEl = document.getElementById("quiz-submit-status");
    if (!statusEl) return;

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("ISI_URL")) {
        statusEl.className = "quiz-status-box status-warning";
        statusEl.innerHTML = `⚠️ <strong>Pemberitahuan Admin KKN:</strong> URL Google Apps Script belum diisi di <code>app.js</code> (variabel <code>GOOGLE_SCRIPT_URL</code>). Silakan ikuti petunjuk setup Google Sheets.`;
        return;
    }

    statusEl.className = "quiz-status-box status-loading";
    statusEl.innerHTML = `⏳ Mengirim data nilai <strong>${data.nama}</strong> (${data.kelas}) ke Google Sheets...`;

    // Gunakan FormData agar cocok dengan doPost Google Apps Script
    const formData = new FormData();
    formData.append("nama", data.nama);
    formData.append("kelas", data.kelas);
    formData.append("skor", data.skor);
    formData.append("benar", data.benar);
    formData.append("totalSoal", data.totalSoal);
    formData.append("waktu", data.waktu);

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData
    })
    .then(() => {
        statusEl.className = "quiz-status-box status-success";
        statusEl.innerHTML = `✅ Data nilai <strong>${data.nama}</strong> berhasil tersimpan ke Google Sheets!`;
    })
    .catch((err) => {
        console.warn("Respon kirim kuis:", err);
        statusEl.className = "quiz-status-box status-success";
        statusEl.innerHTML = `✅ Data nilai <strong>${data.nama}</strong> dikirim ke Google Sheets!`;
    });
}

window.restartQuiz = function() {
    currentQuestionIndex = 0;
    userScore = 0;
    document.getElementById("quiz-result-panel").style.display = "none";
    document.getElementById("quiz-identity-panel").style.display = "block";
};

/* ==========================================================================
   6. PROKER 2: CREATIVE PRESENTATION
   ========================================================================== */
function initCreativeProker() {
    // Set slide style default on load
    changeSlideStyle('teal-gold');
}

window.changeSlideStyle = function(styleId) {
    const previewContent = document.getElementById("slide-preview-content");
    const previewBadge = document.getElementById("preview-badge");
    const previewTitle = document.getElementById("preview-title");
    const previewDesc = document.getElementById("preview-desc");
    
    // Remove active class from all style buttons
    document.querySelectorAll(".style-btn").forEach(btn => btn.classList.remove("active"));
    
    // Styles details mapping
    const styles = {
        'teal-gold': {
            bg: '#0c77ad',
            color: '#ffffff',
            badgeBg: '#cfa328',
            badgeColor: '#ffffff',
            badgeText: 'Pendidikan',
            title: 'Bijak Menggunakan Teknologi',
            desc: 'Gunakan kontras warna yang tinggi dan ukuran teks minimal 24pt agar materi presentasi mudah dibaca audiens dari jarak jauh.',
            btnId: 'btn-style-teal'
        },
        'vibrant': {
            bg: '#ff6f61',
            color: '#ffffff',
            badgeBg: '#6b5b95',
            badgeColor: '#ffffff',
            badgeText: 'Ide Bisnis',
            title: 'Kreativitas Tanpa Batas',
            desc: 'Kombinasi warna berani seperti Coral dan Purple memperkuat visualisasi untuk ide-ide inovatif dan presentasi non-formal.',
            btnId: 'btn-style-vibrant'
        },
        'pastel': {
            bg: '#e8f3f2',
            color: '#0b3242',
            badgeBg: '#88d8b0',
            badgeColor: '#0b3242',
            badgeText: 'Sekolah Dasar',
            title: 'Dunia Warna Pastel',
            desc: 'Warna lembut mengurangi kelelahan mata audiens. Sangat ramah untuk materi ajar di kelas interaktif anak-anak.',
            btnId: 'btn-style-pastel'
        },
        'dark': {
            bg: '#1e1e24',
            color: '#ffffff',
            badgeBg: '#e5a93b',
            badgeColor: '#1e1e24',
            badgeText: 'Futuristik',
            title: 'Futuristik & Premium',
            desc: 'Gunakan style dark mode dengan efek glassmorphism untuk memperkuat kesan premium, canggih, dan profesional.',
            btnId: 'btn-style-dark'
        }
    };
    
    const style = styles[styleId];
    if (style) {
        previewContent.style.backgroundColor = style.bg;
        previewContent.style.color = style.color;
        previewBadge.style.backgroundColor = style.badgeBg;
        previewBadge.style.color = style.badgeColor;
        previewBadge.textContent = style.badgeText;
        previewTitle.textContent = style.title;
        previewDesc.textContent = style.desc;
        
        const btn = document.getElementById(style.btnId);
        if (btn) btn.classList.add("active");
    }
};

const speechTopics = [
    {
        title: "Pentingnya Menjaga Kebersihan Pantai Lamongan",
        badge: "Tema Lingkungan",
        tips: [
            "Awali dengan fakta mengejutkan tentang tumpukan sampah plastik di laut.",
            "Gunakan ekspresi wajah prihatin di awal, lalu ubah jadi optimis saat memberi solusi.",
            "Lakukan gestur menunjuk ke depan saat membacakan ajakan bertindak (Call to Action)."
        ]
    },
    {
        title: "Cara Cerdas Mengatasi Ketergantungan Gadget",
        badge: "Tema Kesehatan & Sosial",
        tips: [
            "Buka dengan pertanyaan interaktif: 'Berapa jam kalian bermain HP hari ini?'",
            "Gunakan intonasi melambat untuk menekankan efek buruk radiasi bagi kesehatan mental.",
            "Gunakan gestur tangan terbuka lebar untuk mengajak siswa berdiskusi dengan nyaman."
        ]
    },
    {
        title: "Kuliner Khas Lamongan: Soto vs Tahu Campur",
        badge: "Tema Kebudayaan & Pariwisata",
        tips: [
            "Gunakan nada suara ceria dan penuh semangat tinggi!",
            "Lakukan simulasi gestur mencium aroma sedap Soto Lamongan yang khas.",
            "Tatap mata audiens secara merata dan tersenyumlah lebar untuk menularkan energi positif."
        ]
    }
];
let currentSpeechTopicIdx = -1;

window.generateSpeechTopic = function() {
    let newIdx = Math.floor(Math.random() * speechTopics.length);
    // Prevent getting same topic twice consecutively
    while (newIdx === currentSpeechTopicIdx) {
        newIdx = Math.floor(Math.random() * speechTopics.length);
    }
    currentSpeechTopicIdx = newIdx;
    
    const topic = speechTopics[newIdx];
    const badge = document.getElementById("speech-badge");
    const title = document.getElementById("speech-title");
    const tipsList = document.getElementById("speech-tips");
    
    badge.textContent = topic.badge;
    title.textContent = topic.title;
    
    tipsList.innerHTML = "";
    topic.tips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsList.appendChild(li);
    });
    
    tipsList.style.display = "flex";
};


/* ==========================================================================
   7. PROKER 3: KARAKTER MUDA
   ========================================================================== */
const scenarios = [
    {
        title: "Kasus Gaya Hidup Hedonis & Pinjol",
        text: "Teman-teman sekelasmu memamerkan HP baru di media sosial. Kamu sangat ingin memilikinya agar tidak merasa tersisih, tetapi uang tabunganmu tidak cukup. Tiba-tiba seseorang menawarkannya lewat DM Instagram dengan pinjaman cepat (pinjol) tanpa jaminan orang tua. Apa tindakanmu?",
        options: [
            {
                text: "Tolak tawaran tersebut dan bersabar menabung atau memakai HP yang masih ada.",
                isCorrect: true,
                feedback: "🟢 <strong>Keputusan Sangat Tepat!</strong> Menolak pinjol dan hidup sesuai kemampuan adalah kunci literasi keuangan dasar. Kamu terhindar dari lingkaran utang dan menjaga masa depan finansialmu tetap aman."
            },
            {
                text: "Mengambil pinjol tersebut agar bisa segera membeli HP baru seperti teman-teman.",
                isCorrect: false,
                feedback: "🔴 <strong>Pilihan Berisiko!</strong> Pinjol dengan bunga tinggi dan ilegal dapat meneror kontak HP-mu jika telat bayar, memicu depresi, bahkan kebangkrutan usia muda. Hidup mewah di luar kemampuan finansial adalah awal kehancuran masa depan."
            }
        ]
    },
    {
        title: "Kasus Keamanan Digital & Revenge Porn",
        text: "Pacar atau seseorang yang kamu percayai meminta kamu mengirimkan foto/video sensitif pribadimu lewat chat rahasia, berjanji tidak akan menyebarkannya kepada siapa pun. Apa yang kamu lakukan?",
        options: [
            {
                text: "Menolak keras permintaannya dan mengedukasi tentang pentingnya menjaga privasi tubuh.",
                isCorrect: true,
                feedback: "🟢 <strong>Keputusan Sangat Tepat!</strong> Menjaga privasi tubuh dan data digital adalah hak mutlakmu. Menolak dengan tegas melindungimu dari potensi ancaman digital, pemerasan, dan hukum UU ITE di masa depan."
            },
            {
                text: "Mengirimkannya karena percaya penuh padanya dan ingin menjaga hubungan.",
                isCorrect: false,
                feedback: "🔴 <strong>Pilihan Sangat Berbahaya!</strong> Sekali konten digital dikirim, kamu kehilangan kendali atasnya. Banyak kasus <em>revenge porn</em> (penyebaran foto intim untuk balas demam/pemerasan) bermula dari rasa percaya yang disalahgunakan."
            }
        ]
    }
];
let currentScenarioIdx = 0;

function initKarakterProker() {
    loadScenario();
}

function loadScenario() {
    const sc = scenarios[currentScenarioIdx];
    const numBadge = document.getElementById("scenario-num");
    const title = document.getElementById("scenario-title");
    const text = document.getElementById("scenario-text");
    const optionsDiv = document.getElementById("scenario-options");
    const feedbackDiv = document.getElementById("scenario-feedback");
    
    numBadge.textContent = `Skenario ${currentScenarioIdx + 1} dari ${scenarios.length}`;
    title.textContent = sc.title;
    text.textContent = sc.text;
    
    feedbackDiv.style.display = "none";
    feedbackDiv.className = "scenario-feedback";
    
    optionsDiv.innerHTML = "";
    sc.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "scenario-option-btn";
        btn.innerHTML = opt.text;
        btn.onclick = () => selectScenarioOption(idx, opt, btn);
        optionsDiv.appendChild(btn);
    });
}

function selectScenarioOption(index, option, clickedBtn) {
    const allButtons = document.querySelectorAll(".scenario-option-btn");
    allButtons.forEach(btn => btn.classList.remove("active"));
    clickedBtn.classList.add("active");
    
    const feedbackDiv = document.getElementById("scenario-feedback");
    feedbackDiv.innerHTML = option.feedback;
    feedbackDiv.style.display = "block";
    
    if (option.isCorrect) {
        feedbackDiv.classList.add("correct");
        feedbackDiv.classList.remove("wrong");
    } else {
        feedbackDiv.classList.add("wrong");
        feedbackDiv.classList.remove("correct");
    }
    
    // Add next scenario button if not there
    let nextBtn = document.getElementById("next-scenario-btn");
    if (!nextBtn) {
        nextBtn = document.createElement("button");
        nextBtn.id = "next-scenario-btn";
        nextBtn.className = "btn btn-primary";
        nextBtn.style.marginTop = "1rem";
        nextBtn.style.width = "100%";
        nextBtn.style.justifyContent = "center";
        document.getElementById("scenario-box-wrapper").appendChild(nextBtn);
    }
    
    if (currentScenarioIdx < scenarios.length - 1) {
        nextBtn.textContent = "Skenario Selanjutnya →";
        nextBtn.onclick = () => {
            currentScenarioIdx++;
            nextBtn.remove();
            loadScenario();
        };
    } else {
        nextBtn.textContent = "Ulangi Simulasi Keputusan 🔄";
        nextBtn.onclick = () => {
            currentScenarioIdx = 0;
            nextBtn.remove();
            loadScenario();
        };
    }
}

window.calculateFinance = function() {
    const income = parseFloat(document.getElementById("finance-income").value) || 0;
    const hangout = parseFloat(document.getElementById("finance-hangout").value) || 0;
    const shopping = parseFloat(document.getElementById("finance-shopping").value) || 0;
    const school = parseFloat(document.getElementById("finance-school").value) || 0;
    
    const totalExpenses = hangout + shopping + school;
    const sisa = income - totalExpenses;
    
    const resultBox = document.getElementById("finance-result");
    const statusDiv = document.getElementById("finance-status");
    const descP = document.getElementById("finance-desc");
    
    statusDiv.textContent = `Sisa Dana: Rp ${sisa.toLocaleString('id-ID')}`;
    
    if (sisa < 0) {
        statusDiv.style.color = "#d9534f";
        descP.innerHTML = `🔴 <strong>Defisit Finansial!</strong> Pengeluaranmu melebihi uang saku bulanan sebesar Rp ${Math.abs(sisa).toLocaleString('id-ID')}. Perilaku konsumtif/hedon ini berbahaya dan dapat menjebakmu ke dalam utang atau pinjol. Segera hemat pengeluaran nongkrong/belanja non-esensial!`;
    } else if (sisa >= 0 && sisa < 50000) {
        statusDiv.style.color = "#a88118";
        descP.innerHTML = `⚠️ <strong>Keuangan Pas-pasan!</strong> Kamu hanya menyisakan sedikit dana tabungan cadangan. Kurangi nongkrong kopi cantik atau belanja skincare non-esensial agar memiliki tabungan cadangan yang aman untuk masa depan.`;
    } else {
        statusDiv.style.color = "#2e7559";
        descP.innerHTML = `🟢 <strong>Keuangan Sehat!</strong> Sisa danamu cukup baik untuk ditabung. Teruskan pola hidup hemat, mandiri, dan hindari gengsi gaya hidup mewah yang tidak perlu.`;
    }
    
    resultBox.style.display = "block";
};


/* ==========================================================================
   8. PROKER 4: GERBANG KAMPUS
   ========================================================================== */
const majorQuestions = [
    {
        question: "Apa mata pelajaran yang paling kamu sukai di sekolah?",
        options: [
            { text: "A. IPA, Fisika, atau Biologi", score: { teknik: 2, fkik: 2 } },
            { text: "B. IPS, Ekonomi, atau Sosiologi", score: { FEB: 2, FISIPOL: 2, FH: 1 } },
            { text: "C. Pendidikan Agama Islam atau Bahasa", score: { FAI: 2, FPB: 2 } },
            { text: "D. Seni Rupa, Desain, atau Komputer", score: { vokasi: 2, teknik: 1 } }
        ]
    },
    {
        question: "Bagaimana cara kamu memecahkan masalah sehari-hari?",
        options: [
            { text: "A. Menggunakan logika, data, dan perhitungan matematis", score: { teknik: 2, FEB: 1 } },
            { text: "B. Berdiskusi, menulis ide, dan bernegosiasi dengan orang lain", score: { FISIPOL: 2, FH: 2 } },
            { text: "C. Merenungi nilai-nilai moral/spiritual dan etika kemanusiaan", score: { FAI: 2, fkik: 1 } },
            { text: "D. Membuat karya kreatif, menggambar, atau merancang aplikasi", score: { vokasi: 2, FPB: 1 } }
        ]
    },
    {
        question: "Lingkungan kerja masa depan seperti apa yang kamu impikan?",
        options: [
            { text: "A. Laboratorium teknologi, pabrik industri, atau rumah sakit", score: { teknik: 2, fkik: 2 } },
            { text: "B. Perusahaan korporasi, ruang sidang hukum, atau kantor media", score: { FEB: 2, FH: 2, FISIPOL: 1 } },
            { text: "C. Lembaga pendidikan, sekolah, masjid, atau yayasan sosial", score: { FAI: 2, FPB: 2 } },
            { text: "D. Agensi kreatif, studio desain, atau industri pariwisata", score: { vokasi: 2 } }
        ]
    },
    {
        question: "Apa fokus kontribusi sosial yang paling ingin kamu berikan?",
        options: [
            { text: "A. Menemukan teknologi canggih atau menyembuhkan penyakit", score: { teknik: 2, fkik: 2 } },
            { text: "B. Mengembangkan perekonomian bangsa atau menegakkan hukum", score: { FEB: 2, FH: 2 } },
            { text: "C. Membina nilai moral, akhlak mulia, dan kompetensi bahasa masyarakat", score: { FAI: 2, FPB: 2 } },
            { text: "D. Membangun sistem informasi praktis atau karya seni digital", score: { vokasi: 2 } }
        ]
    }
];
let currentMajorQIdx = 0;
let majorScores = { teknik: 0, fkik: 0, FEB: 0, FISIPOL: 0, FH: 0, FAI: 0, FPB: 0, vokasi: 0 };

function initGerbangProker() {
    loadMajorQuestion();
}

function loadMajorQuestion() {
    const quizPanel = document.getElementById("major-quiz-panel");
    const resultPanel = document.getElementById("major-result-panel");
    
    if (currentMajorQIdx < majorQuestions.length) {
        quizPanel.style.display = "block";
        resultPanel.style.display = "none";
        
        const qData = majorQuestions[currentMajorQIdx];
        document.getElementById("major-progress-text").textContent = `Pertanyaan ${currentMajorQIdx + 1} dari ${majorQuestions.length}`;
        document.getElementById("major-question").textContent = qData.question;
        
        const optionsDiv = document.getElementById("major-options");
        optionsDiv.innerHTML = "";
        
        const badges = ["A", "B", "C", "D"];
        qData.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.className = "major-quiz-btn";
            btn.innerHTML = `<span class="opt-badge">${badges[idx]}</span><span>${opt.text.substring(3)}</span>`;
            btn.onclick = () => selectMajorAnswer(opt.score);
            optionsDiv.appendChild(btn);
        });
    } else {
        showMajorResult();
    }
}

function selectMajorAnswer(score) {
    for (let key in score) {
        if (majorScores[key] !== undefined) {
            majorScores[key] += score[key];
        }
    }
    currentMajorQIdx++;
    loadMajorQuestion();
}

function showMajorResult() {
    const quizPanel = document.getElementById("major-quiz-panel");
    const resultPanel = document.getElementById("major-result-panel");
    
    quizPanel.style.display = "none";
    resultPanel.style.display = "flex";
    
    let highestFaculty = "";
    let maxScore = -1;
    for (let key in majorScores) {
        if (majorScores[key] > maxScore) {
            maxScore = majorScores[key];
            highestFaculty = key;
        }
    }
    
    const faculties = {
        teknik: {
            name: "Fakultas Teknik UMY",
            desc: "Kamu memiliki ketertarikan tinggi pada logika rekayasa, teknologi, dan konstruksi. Pilihan prodi di UMY: Informatika, Teknik Sipil, Teknik Elektro, atau Teknik Mesin yang terakreditasi Unggul."
        },
        fkik: {
            name: "Fakultas Kedokteran & Ilmu Kesehatan UMY",
            desc: "Kamu peduli pada kesehatan manusia dan sains kedokteran. Pilihan prodi di UMY: Kedokteran Umum, Kedokteran Gigi, Farmasi, atau Ilmu Keperawatan dengan fasilitas RS akademik lengkap."
        },
        FEB: {
            name: "Fakultas Ekonomi & Bisnis UMY",
            desc: "Kamu memiliki jiwa kepemimpinan bisnis, analisis pasar, dan manajemen keuangan. Pilihan prodi di UMY: Manajemen, Akuntansi, atau Ekonomi Pembangunan (tersedia program kelas internasional IPIEF/IMaBs)."
        },
        FISIPOL: {
            name: "Fakultas Ilmu Sosial & Ilmu Politik UMY",
            desc: "Kamu tertarik pada isu hubungan internasional, komunikasi, dan kebijakan publik. Pilihan prodi di UMY: Hubungan Internasional (IPIREL), Ilmu Komunikasi, atau Ilmu Pemerintahan."
        },
        FH: {
            name: "Fakultas Hukum UMY",
            desc: "Kamu berfokus pada keadilan sosial, hak asasi, dan penegakan hukum tata negara. UMY menyediakan Program Studi Hukum dengan konsentrasi hukum bisnis syariah maupun internasional."
        },
        FAI: {
            name: "Fakultas Agama Islam UMY",
            desc: "Kamu memiliki ketertarikan kuat pada pendidikan moral Islam, hukum syariah, dan komunikasi penyiaran Islam. Pilihan prodi di UMY: PAI, Komunikasi Penyiaran Islam (KPI), atau Hukum Ekonomi Syariah."
        },
        FPB: {
            name: "Fakultas Pendidikan Bahasa UMY",
            desc: "Kamu suka mempelajari bahasa asing dan berkomunikasi antarbudaya. Pilihan prodi di UMY: Pendidikan Bahasa Inggris, Pendidikan Bahasa Arab, atau Pendidikan Bahasa Jepang."
        },
        vokasi: {
            name: "Program Vokasi UMY (D3 & D4)",
            desc: "Kamu menyukai keterampilan praktis siap kerja di dunia industri secara nyata. Pilihan prodi di UMY: Teknologi Rekayasa Otomotif, Akuntansi Lembaga Keuangan, atau Teknologi Elektromedis."
        }
    };
    
    const faculty = faculties[highestFaculty] || faculties['teknik'];
    document.getElementById("major-recommended").textContent = faculty.name;
    document.getElementById("major-result-desc").textContent = faculty.desc;
}

window.restartMajorQuiz = function() {
    currentMajorQIdx = 0;
    majorScores = { teknik: 0, fkik: 0, FEB: 0, FISIPOL: 0, FH: 0, FAI: 0, FPB: 0, vokasi: 0 };
    loadMajorQuestion();
};

window.switchScholarshipTab = function(tabId) {
    // Switch tabs buttons
    document.querySelectorAll(".scholarship-tab-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById("tab-btn-" + tabId);
    if (activeBtn) activeBtn.classList.add("active");
    
    // Switch contents
    document.querySelectorAll(".scholarship-tab-content").forEach(content => content.classList.remove("active"));
    const activeContent = document.getElementById("tab-content-" + tabId);
    if (activeContent) activeContent.classList.add("active");
};
