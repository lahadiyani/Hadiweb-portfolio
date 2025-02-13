document.addEventListener("DOMContentLoaded", async () => {
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
    const fullText = " yang selalu penasaran dengan hal-hal baru, hobi ngulik proyek, eksplorasi teknologi, dan nonton anime. Bagi saya, coding adalah seni dan tantangan yang bikin otak terus berpikir kreatif. Saya fokus pada pengembangan web dengan Flask untuk backend dan JavaScript native untuk frontend, serta tertarik eksplorasi AI dan embedding teks. Setiap hari adalah kesempatan untuk belajar, berkembang, dan menghadapi tantangan baru 🚀.";
        
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