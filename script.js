document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation for Hero Section
    const typingElement = document.querySelector('.typing-animation');
    const phrases = [
        "AI & Machine Learning Researcher",
        "Deep Learning Enthusiast",
        "Cybersecurity Expert",
        "Educator & Innovator"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typeSpeed);
    }
    type();

    // Sticky Navbar and Active Section Highlighting
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 20; // Adjust for navbar height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call to set sticky and active state on load

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - navbar.offsetHeight, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        });
    });

    // Scroll-triggered Reveal Effects and Progress Bar Animation
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (elementTop < viewportHeight - 100) { // Adjust 100px as needed
                element.classList.add('active');

                // If the revealed element is the research section, animate progress bars
                if (element.id === 'research') {
                    const progressBars = element.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress;
                        bar.textContent = progress;
                    });
                }
            } else {
                element.classList.remove('active'); // Optional: remove active class when scrolling up
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on load

    // Project Modals
    const projectCardsContainer = document.querySelector('.project-grid');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    // --- GitHub Projects Integration (Client-side limitations) ---
    // Directly fetching from GitHub API (e.g., https://api.github.com/users/ifares-csi/repos) 
    // from client-side JavaScript is subject to CORS restrictions and API rate limits.
    // For a production-ready solution, you would typically use a server-side proxy
    // to fetch data from GitHub and then serve it to your frontend.
    // For this demo, we'll use a hardcoded list of projects.

    const githubProjects = [
        {
            id: "project1",
            name: "CKAN: Convolutional Kolmogorov–Arnold Networks",
            description: "Implementing CNN model by Using KAN (Kolmogorov-Arnold Networks). IEEE Document Reference: Title: CKAN: Convolutional Kolmogorov–Arnold Networks Model for Intrusion Detection in IoT Environment. Authors: Mohamed Abd Elaziz; Ibrahim Ahmed Fares; Ahmad O. Aseeri. Publication: IEEE Access. Year: 2024. DOI: 10.1109/ACCESS.2024.3462297",
            imageUrl: "https://raw.githubusercontent.com/ifares-csi/CKAN/main/CKAN.png",
            githubUrl: "https://github.com/ifares-csi/CKAN"
        },
        {
            id: "project2",
            name: "TFKAN",
            description: "Building New Transformer based on KAN: Kolmogorov-Arnold Networks",
            imageUrl: "https://raw.githubusercontent.com/ifares-csi/TFKAN/main/TFKAN.png",
            githubUrl: "https://github.com/ifares-csi/TFKAN"
        },
        {
            id: "project3",
            name: "Attendance-System",
            description: "this project for auto taking absence of students in lecture based on GPS also it have online test for students enrolled to your subjects",
            imageUrl: "https://via.placeholder.com/300x200?text=Attendance+System",
            githubUrl: "#"
        },
        {
            id: "project4",
            name: "Examination Schedule Generator",
            description: "A comprehensive web application for generating, managing, and optimizing examination schedules for educational institutions.",
            imageUrl: "https://via.placeholder.com/300x200?text=Exam+Schedule+Generator",
            githubUrl: "#"
        },
        {
            id: "project5",
            name: "RAG-Chat with Gemini 2",
            description: "This project demonstrates a Retrieval-Augmented Generation (RAG) chat application using: Google Generative AI (Gemini model via google.generativeai) LangChain (HuggingFaceEmbeddings, FAISS vector store, ConversationalRetrievalChain) Streamlit for a ChatGPT-like user interface",
            imageUrl: "https://raw.githubusercontent.com/ifares-csi/ChatDocs/main/img.png",
            githubUrl: "https://github.com/ifares-csi/ChatDocs"
        },
        {
            id: "project6",
            name: "WebChat: Chat with Web Pages using DeepSeek R1 locally [Ollama]",
            description: "WebChat is an RAG-based web application that allows users to interact with web pages by summarizing their content and answering user queries using the Deepseek R1 language model. The app extracts textual content from a given URL, processes it into vector embeddings using FAISS, and retrieves relevant responses based on the user prompt.",
            imageUrl: "https://raw.githubusercontent.com/ifares-csi/WebChat/main/img.png",
            githubUrl: "https://github.com/ifares-csi/WebChat"
        },
        {
            id: "project7",
            name: "Chat With WebPage",
            description: "This project is a RAG application for chatting with Webpages that allows users to input a webpage URL and a custom query to retrieve response content using LangChain and OpenAI GPT-4o. The application processes webpage content, extracts relevant text, generates context-aware summaries, and answer the questions accodring the the content of the webpage.",
            imageUrl: "https://raw.githubusercontent.com/ifares-csi/Chat-With-WebPage-Agent/main/img.png",
            githubUrl: "https://github.com/ifares-csi/Chat-With-WebPage-Agent"
        }
    ];

    function renderProjects() {
        projectCardsContainer.innerHTML = ''; // Clear existing placeholders
        githubProjects.forEach(project => {
            const cardHtml = `
                <div class="project-card" data-project-id="${project.id}">
                    <img src="${project.imageUrl}" alt="${project.name} Thumbnail">
                    <h3>${project.name}</h3>
                    <p>${project.description.substring(0, 100)}...</p>
                    <div class="project-overlay">
                        <button class="view-details-btn">View Details</button>
                    </div>
                </div>
            `;
            projectCardsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Re-attach event listeners after rendering new cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                const details = githubProjects.find(p => p.id === projectId);

                if (details) {
                    modalTitle.textContent = details.name;
                    modalImage.src = details.imageUrl;
                    modalDescription.textContent = details.description;
                    modalLink.href = details.githubUrl;
                    modal.style.display = 'flex';
                }
            });
        });
    }

    renderProjects();

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact Form Validation and Animations
    const contactForm = document.querySelector('.contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentNode.classList.remove('focused');
            }
        });
        // For pre-filled inputs (e.g., browser autofill)
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.parentNode.classList.add('invalid');
            } else {
                input.parentNode.classList.remove('invalid');
            }
        });

        if (isValid) {
            alert('Message sent successfully! (This is a demo. Form submission is not active.)');
            contactForm.reset();
            formInputs.forEach(input => {
                input.parentNode.classList.remove('focused');
            });
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });

    // Google Scholar Publications Fetching from publications.txt
    // IMPORTANT: Due to browser security (CORS), fetching local files directly
    // from 'file://' URLs is usually blocked. To make this work, you need to
    // serve your portfolio using a local web server (e.g., Python's http.server).
    // Example: cd /home/ifares/portofilo && python3 -m http.server 8000
    // Then open http://localhost:8000 in your browser.

    function parseBibtex(bibtexString) {
        const publications = [];
        const entries = bibtexString.split('@').filter(entry => entry.trim() !== '');

        entries.forEach(entry => {
            const typeMatch = entry.match(/^(\w+){/);
            if (!typeMatch) return;

            const content = entry.substring(entry.indexOf('{') + 1, entry.lastIndexOf('}'));

            const fields = {};
            // Use a more robust regex to handle nested braces and different formatting
            const regex = /\s*(\w+)\s*=\s*{(.*?[^\\])}/gs;
            let match;
            while ((match = regex.exec(content)) !== null) {
                fields[match[1].toLowerCase()] = match[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            }

            let title = fields.title || 'No Title';
            let authors = fields.author || 'No Authors';
            let journal = fields.journal || fields.booktitle || 'No Journal/Booktitle';
            let year = fields.year || 'No Year';
            let link = fields.url || (fields.doi ? `https://doi.org/${fields.doi}` : '#');

            // Format authors: Replace "Fares, Ibrahim A" with "<strong>Ibrahim A. Fares</strong>"
            authors = authors.split(' and ').map(author => {
                if (author.includes('Fares, Ibrahim A') || author.includes('Fares, Ibrahim Ahmed') || author.includes('Fares, Issam')) {
                    const parts = author.split(',').map(p => p.trim());
                    return `<strong>${parts[1]} ${parts[0]}</strong>`;
                }
                return author;
            }).join(', ');


            publications.push({ title, authors, journal, year, link });
        });
        return publications;
    }

    async function updatePublications() {
        const publicationsContainer = document.getElementById('scholar-publications');
        publicationsContainer.innerHTML = 'Loading publications...';

        try {
            const response = await fetch('publications.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const bibtexContent = await response.text();
            let parsedPublications = parseBibtex(bibtexContent);

            // Reverse the order of publications as they appear in the file
            parsedPublications.reverse();

            // Group publications by year (still useful for display structure)
            const publicationsByYear = parsedPublications.reduce((acc, pub) => {
                const year = pub.year || 'Forthcoming';
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(pub);
                return acc;
            }, {});

            let htmlContent = '';
            // Sort years in descending order for display, but publications within year are reversed from the file
            const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b - a);

            sortedYears.forEach(year => {
                htmlContent += `<div class="year-container"><h3>${year}</h3><ol>`;
                // Publications within each year are already in the desired reversed order from the file
                publicationsByYear[year].forEach(pub => {
                    htmlContent += `
                        <li>
                            ${pub.authors}, 
                            <a href="${pub.link}" target="_blank">
                                <em>"${pub.title}"</em>
                            </a>, 
                            ${pub.journal}.
                        </li>
                    `;
                });
                htmlContent += `</ol></div>`;
            });

            publicationsContainer.innerHTML = htmlContent;

        } catch (error) {
            console.error('Error fetching or parsing publications:', error);
            publicationsContainer.innerHTML = '<p>Failed to load publications. Please ensure you are serving the site via a web server (e.g., `python3 -m http.server`) and that `publications.txt` is in the same directory.</p>';
        }
    }

    updatePublications();
});
