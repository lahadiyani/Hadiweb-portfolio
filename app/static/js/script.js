document.addEventListener("DOMContentLoaded", async () => {
    const menuIcon = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");
    const navContainer = document.querySelector(".navigation-container");

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

    function openFacebook(event) {
        event.preventDefault(); // Mencegah link langsung ke browser
        var fbAppUrl = "fb://profile/100078252237871";
        var fbWebUrl = "https://www.facebook.com/profile.php?id=100078252237871";
    
        // Deteksi apakah perangkat adalah mobile
        var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
        if (isMobile) {
            // Coba buka aplikasi Facebook jika perangkat mobile
            var timeout = setTimeout(function () {
                window.location.href = fbWebUrl; // Jika gagal buka app, alihkan ke web
            }, 1000);
    
            window.location.href = fbAppUrl;
    
            // Jika berhasil buka aplikasi, hentikan redirect ke web
            setTimeout(() => clearTimeout(timeout), 500);
        } else {
            // Jika bukan mobile, langsung ke web
            window.location.href = fbWebUrl;
        }
    }

    window.addEventListener("load", function() {
        // Sembunyikan spinner setelah load selesai
        document.querySelector(".spinner-wrapper").style.display = "none";
        // Tampilkan konten
        document.querySelector(".container").style.display = "block";
    });

    try {
        const response = await fetch("/api/repos");
        const repos = await response.json();
        // console.log(repos);
        
        const projectContainer = document.querySelector(".project-content");
        repos.forEach(repo => {
            const card = document.querySelector('.card-repo');
            card.innerHTML = '';

            let content = '';
            repos.forEach(repo => {
                content += `
                    <div class="repo-item">
                        <h3 class="repo-title">${repo.title}</h3>
                        <p class="repo-description">${repo.description}</p>
                        <a href="${repo.url}" class="link-repo">Visit Here</a>
                    </div>
                `;
            });

            card.innerHTML = content;
        });
    } catch (error) {
        console.error("Error fetching repos:", error);
    }

    const roles = ["Web developer", "Mahasiswa", "Animelovers"];
    let roleIndex = 0;
    let textElement = document.querySelector(".lead-text");
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