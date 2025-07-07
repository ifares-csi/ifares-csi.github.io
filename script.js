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

    // Project Cards
    const projectCardsContainer = document.querySelector('.project-grid');

    const githubProjects = [{
            id: "project1",
            name: "CKAN: Convolutional Kolmogorov–Arnold Networks",
            description: "Implementing CNN model by Using KAN (Kolmogorov-Arnold Networks). IEEE Document Reference: Title: CKAN: Convolutional Kolmogorov–Arnold Networks Model for Intrusion Detection in IoT Environment. Authors: Mohamed Abd Elaziz; Ibrahim Ahmed Fares; Ahmad O. Aseeri. Publication: IEEE Access. Year: 2024. DOI: 10.1109/ACCESS.2024.3462297",
            imageUrl: "porject_images/ckan.jpg",
            githubUrl: "https://github.com/ifares-csi/CKAN"
        },
        {
            id: "project2",
            name: "TFKAN",
            description: "Building New Transformer based on KAN: Kolmogorov-Arnold Networks",
            imageUrl: "porject_images/tfkan.jpg",
            githubUrl: "https://github.com/ifares-csi/TFKAN"
        },
        {
            id: "project3",
            name: "Attendance-System",
            description: "this project for auto taking absence of students in lecture based on GPS also it have online test for students enrolled to your subjects",
            imageUrl: "porject_images/attendace.jpg",
            githubUrl: "#"
        },
        {
            id: "project4",
            name: "Examination Schedule Generator",
            description: "A comprehensive web application for generating, managing, and optimizing examination schedules for educational institutions.",
            imageUrl: "porject_images/exam sc generator.jpg",
            githubUrl: "#"
        },
        {
            id: "project5",
            name: "RAG-Chat with Gemini 2",
            description: "This project demonstrates a Retrieval-Augmented Generation (RAG) chat application using: Google Generative AI (Gemini model via google.generativeai) LangChain (HuggingFaceEmbeddings, FAISS vector store, ConversationalRetrievalChain) Streamlit for a ChatGPT-like user interface",
            imageUrl: "porject_images/RAG-Chat with Gemini2.jpg",
            githubUrl: "https://github.com/ifares-csi/ChatDocs"
        },
        {
            id: "project6",
            name: "WebChat: Chat with Web Pages using DeepSeek R1 locally [Ollama]",
            description: "WebChat is an RAG-based web application that allows users to interact with web pages by summarizing their content and answering user queries using the Deepseek R1 language model. The app extracts textual content from a given URL, processes it into vector embeddings using FAISS, and retrieves relevant responses based on the user prompt.",
            imageUrl: "porject_images/WebChat.png",
            githubUrl: "https://github.com/ifares-csi/WebChat"
        },
        {
            id: "project7",
            name: "Chat With WebPage",
            description: "This project is a RAG application for chatting with Webpages that allows users to input a webpage URL and a custom query to retrieve response content using LangChain and OpenAI GPT-4o. The application processes webpage content, extracts relevant text, generates context-aware summaries, and answer the questions accodring the the content of the webpage.",
            imageUrl: "porject_images/chat with web.jpg",
            githubUrl: "https://github.com/ifares-csi/Chat-With-WebPage-Agent"
        }
    ];

    function renderProjects() {
        projectCardsContainer.innerHTML = ''; // Clear existing placeholders
        githubProjects.forEach(project => {
            const cardHtml = `
                <div class="project-card" data-project-id="${project.id}">
                    <a href="${project.githubUrl}" target="_blank">
                        <img src="${project.imageUrl}" alt="${project.name} Thumbnail">
                        <h3>${project.name}</h3>
                        <p>${project.description.substring(0, 100)}...</p>
                    </a>
                </div>
            `;
            projectCardsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    renderProjects();

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

    // Publications data is now embedded directly to avoid CORS issues.
    const bibtexContent = `
@article{fares2020multiple,
  title={Multiple cyclic swarming optimization for uni-and multi-modal functions},
  author={Fares, Ibrahim and Rizk-Allah, Rizk M and Hassanien, Aboul Ella and Vaclav, Snasel},
  booktitle={International Conference on Innovative Computing and Communications: Proceedings of ICICC 2019, Volume 1},
  pages={887--898},
  year={2020},
  organization={Springer Singapore}
}

@article{fares2023solving,
  title={Solving capacitated vehicle routing problem with route optimisation based on equilibrium optimiser algorithm},
  author={Fares, Ibrahim and Hassanien, Aboul Ella and Rizk-Allah, Rizk M and Farouk, Roushdy Mohamed and Abo-donia, Hassan Mostafa},
  journal={International Journal of Computing Science and Mathematics},
  volume={17},
  number={1},
  pages={13--27},
  year={2023},
  publisher={Inderscience Publishers (IEL)}
}

@article{abd2024ckan,
  title={Ckan: Convolutional kolmogorov--arnold networks model for intrusion detection in iot environment},
  author={Abd Elaziz, Mohamed and Fares, Ibrahim Ahmed and Aseeri, Ahmad O},
  journal={IEEE Access},
  year={2024},
  publisher={IEEE}
}

@article{fares2025explainable,
  title={Explainable tabnet transformer-based on google vizier optimizer for anomaly intrusion detection system},
  author={Fares, Ibrahim A and Abd Elaziz, Mohamed},
  journal={Knowledge-Based Systems},
  volume={316},
  pages={113351},
  year={2025},
  publisher={Elsevier}
}

@article{fares2025tfkan,
  title={TFKAN: transformer based on Kolmogorov--Arnold networks for intrusion detection in IoT environment},
  author={Fares, Ibrahim A and Abd Elaziz, Mohamed and Aseeri, Ahmad O and Zied, Hamed Shawky and Abdellatif, Ahmed G},
  journal={Egyptian Informatics Journal},
  volume={30},
  pages={100666},
  year={2025},
  publisher={Elsevier}
}

@article{abd2025federated,
  title={Federated learning framework for IoT intrusion detection using tab transformer and nature-inspired hyperparameter optimization},
  author={Abd Elaziz, Mohamed and Fares, Ibrahim A and Dahou, Abdelghani and Shrahili, Mansour},
  journal={Frontiers in Big Data},
  volume={8},
  pages={1526480},
  year={2025},
  publisher={Frontiers Media SA}
}

@article{fares2025ft,
  title={FT-Transformer for Intrusion Detection in IoT Environment},
  author={Fares, Ibrahim Ahmed and Abd Elaziz, Mohamed},
  journal={Bulletin of Faculty of Science, Zagazig University},
  volume={2025},
  number={1},
  pages={114--123},
  year={2025},
  publisher={Zagazig University; Faculty of Science. Center of Scientific Studies and~…}
}

@article{fares2025deep,
  title={Deep Transfer Learning Based on Hybrid Swin Transformers With LSTM for Intrusion Detection Systems in IoT Environment},
  author={Fares, Ibrahim A and Abdellatif, Ahmed G and Abd Elaziz, Mohamed and Shrahili, Mansour and Elmahallawy, Adham and Sohaib, Rana Muhammad and Shawky, Mahmoud A and Shah, Syed Tariq},
  journal={IEEE Open Journal of the Communications Society},
  year={2025},
  publisher={IEEE}
}

@article{nafisah2025deep,
  title={Deep learning-based feature selection for detection of autism spectrum disorder},
  author={Nafisah, Ibrahim and Mahmoud, Nermine and Ewees, Ahmed A and Khattap, Mohamed G and Dahou, Abdelghani and Alghamdi, Safar M and Fares, Ibrahim A and Azmi Al-Betar, Mohammed and Abd Elaziz, Mohamed},
  journal={Frontiers in Artificial Intelligence},
  volume={8},
  pages={1594372},
  year={2025},
  publisher={Frontiers Media SA}
}
`;

    function parseBibtex(bibtexString) {
        const publications = [];
        const entries = bibtexString.split('@').filter(entry => entry.trim() !== '');

        entries.forEach(entry => {
            const typeMatch = entry.match(/^(\w+){/);
            if (!typeMatch) return;

            const content = entry.substring(entry.indexOf('{') + 1, entry.lastIndexOf('}'));

            const fields = {};
            const regex = /(\w+)\s*=\s*{(.*?)}/gs;
            let match;
            while ((match = regex.exec(content)) !== null) {
                fields[match[1].toLowerCase()] = match[2].replace(/\s+/g, ' ').trim();
            }

            let title = fields.title || 'No Title';
            let authors = fields.author || 'No Authors';
            let journal = fields.journal || fields.booktitle || 'No Journal/Booktitle';
            let year = fields.year || 'No Year';
            let link = fields.url || (fields.doi ? `https://doi.org/${fields.doi}` : '#');

            authors = authors.split(' and ').map(author => {
                if (author.includes('Fares, Ibrahim A') || author.includes('Fares, Ibrahim Ahmed') || author.includes('Fares, Ibrahim')) {
                    const parts = author.split(',').map(p => p.trim());
                    return `<strong>${parts[1]} ${parts[0]}</strong>`;
                }
                return author;
            }).join(', ');

            publications.push({ title, authors, journal, year, link });
        });
        return publications;
    }

    function updatePublications() {
        const publicationsContainer = document.getElementById('scholar-publications');
        publicationsContainer.innerHTML = 'Loading publications...';

        try {
            let parsedPublications = parseBibtex(bibtexContent);
            parsedPublications.sort((a, b) => (b.year || 0) - (a.year || 0));

            const publicationsByYear = parsedPublications.reduce((acc, pub) => {
                const year = pub.year || 'Forthcoming';
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(pub);
                return acc;
            }, {});

            let htmlContent = '';
            const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b - a);

            sortedYears.forEach(year => {
                htmlContent += `<div class="year-container"><h3>${year}</h3><ol>`;
                publicationsByYear[year].forEach(pub => {
                    htmlContent += `
                        <li>
                            ${pub.authors},
                            <a href="${pub.link}" target="_blank">
                                <em>"${pub.title}"</em>
                            </a>,
                            <em>${pub.journal}</em>.
                        </li>
                    `;
                });
                htmlContent += `</ol></div>`;
            });

            publicationsContainer.innerHTML = htmlContent;

        } catch (error) {
            console.error('Error parsing publications:', error);
            publicationsContainer.innerHTML = '<p>Failed to load publications.</p>';
        }
    }

    updatePublications();
});