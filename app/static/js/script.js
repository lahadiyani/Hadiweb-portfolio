document.addEventListener("DOMContentLoaded", async () => {
    const menuIcon = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");
    const navContainer = document.querySelector(".navigation-container");
    const body = document.body;
    const sunnyIcon = document.querySelector(".sunny-icon");
    const moonIcon = document.querySelector(".moon-icon");
    const savedTheme = localStorage.getItem("theme");
    const toolbarBox = document.querySelector(".toolbar-box");
    const logoImage = document.querySelector(".logo-image");
    const logoDark = logoImage.getAttribute("data-logo-dark");
    const logoLight = logoImage.getAttribute("data-logo-light");
    const progressBars = document.querySelectorAll('.progress');

    progressBars.forEach(bar => {
        const skillName = bar.parentElement.previousElementSibling.textContent.trim(); // Ambil nama skill
        const progressValue = parseInt(bar.dataset.progress); // Ambil nilai progress

        // Objek untuk mapping warna berdasarkan skill
        const skillColors = {
            "HTML": "maroon",
            "CSS": "blue",
            "JavaScript": "gold",
            "Python": "dodgerblue",
            "React": "cyan",
            "Flask": "black",
            "Django": "#333",
            "MySQL": "#015b85",
            "MongoDB": "#40A578",
            "Git": "red",
            "GitHub": "black",
            "Adobe XD": "purple",
            "AI & Prompt Engginering": "#11CBD7",
            "Construct 2": "teal",
            "Php": "#7886C7",
            "Laravel": "#FA4659",
            "PostgreSQL": "#7886C7"
        };

        // Set warna berdasarkan skill (default: abu-abu jika tidak ditemukan)
        const barColor = skillColors[skillName] || "gray"; 
        bar.style.backgroundColor = barColor;
        bar.style.width = "0%"; // Mulai animasi dari 0

        if (!isNaN(progressValue)) {
            setTimeout(() => {
                bar.style.width = `${progressValue}%`; // Jalankan animasi progress bar
                bar.parentElement.previousElementSibling.setAttribute('data-progress', progressValue); // Set nilai data-progress
            }, 300);
        }
    });
    
    // Mode Tema
    function setLightMode() {
        body.classList.remove("darkmode");
        toolbarBox.style.border = "4px solid #FFE700";
        sunnyIcon.style.background = "#FFE700";
        moonIcon.style.background = "none";
        logoImage.src = logoLight;
        localStorage.setItem("theme", "light");
    }

    function setDarkMode() {
        body.classList.add("darkmode");
        toolbarBox.style.border = "4px solid #003161";
        moonIcon.style.background = "#003161";
        sunnyIcon.style.background = "none";
        logoImage.src = logoDark;
        localStorage.setItem("theme", "dark");
    }

    savedTheme === "dark" ? setDarkMode() : setLightMode();
    
    sunnyIcon.addEventListener("click", setLightMode);
    moonIcon.addEventListener("click", setDarkMode);
    
    // Menu Navigation
    menuIcon.addEventListener("click", () => {
        navContainer.classList.add("active");
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
    });

    closeIcon.addEventListener("click", () => {
        navContainer.classList.remove("active");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    });
    
    // Buka Facebook di Aplikasi atau Browser
    function openFacebook(event) {
        event.preventDefault();
        const fbAppUrl = "fb://profile/100078252237871";
        const fbWebUrl = "https://www.facebook.com/profile.php?id=100078252237871";
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) {
            let timeout = setTimeout(() => window.location.href = fbWebUrl, 1000);
            window.location.href = fbAppUrl;
            setTimeout(() => clearTimeout(timeout), 500);
        } else {
            window.location.href = fbWebUrl;
        }
    }
    
    // Sembunyikan Spinner Setelah Halaman Selesai Dimuat
    window.addEventListener("load", () => {
        document.querySelector(".spinner-wrapper").style.display = "none";
        document.querySelector(".container").style.display = "block";
    });
    
    // Fetch Data Repository
    try {
        const response = await fetch("/api/repos");
        const repos = await response.json();
        const projectContainer = document.querySelector(".project-content");
        const card = document.querySelector(".card-repo");
        
        card.innerHTML = repos.map(repo => `
            <div class="repo-item">
                <h3 class="repo-title">${repo.title}</h3>
                <p class="repo-description">${repo.description}</p>
                <a href="${repo.url}" class="link-repo">Visit Here</a>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error fetching repos:", error);
    }
    
    // Efek Ketik dan Hapus
    const roles = ["Web developer", "Mahasiswa", "Animelovers"];
    let roleIndex = 0;
    const textElement = document.querySelector(".lead-text");
    const fullText = " yang selalu penasaran dengan hal-hal baru, hobi ngulik proyek, eksplorasi teknologi, dan baca komik. Bagi saya, coding adalah seni dan tantangan yang bikin otak terus berpikir kreatif.";
    
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1, callback), 50);
        } else if (callback) {
            setTimeout(callback, 1500);
        }
    }
    
    function eraseText(callback) {
        let currentText = textElement.innerHTML;
        if (currentText.length > 0) {
            textElement.innerHTML = currentText.slice(0, -1);
            setTimeout(() => eraseText(callback), 30);
        } else if (callback) {
            callback();
        }
    }
    
    function startTypingCycle() {
        let roleText = `Saya seorang ${roles[roleIndex]}`;
        typeWriter(roleText, 0, () => {
            typeWriter(fullText, 0, () => {
                setTimeout(() => {
                    eraseText(() => {
                        roleIndex = (roleIndex + 1) % roles.length;
                        startTypingCycle();
                    });
                }, 1500);
            });
        });
    }
    
    startTypingCycle();
});