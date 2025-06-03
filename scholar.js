async function updatePublications() {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const scholarUrl = encodeURIComponent('https://scholar.google.com/citations?user=G33DEsgAAAAJ&hl=en&authuser=1');
    const response = await fetch(proxyUrl + scholarUrl);
    const text = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const papers = doc.querySelectorAll('.gsc_a_tr');
    
    let publications = [];
    
    papers.forEach(paper => {
        const title = paper.querySelector('.gsc_a_t a').textContent;
        const grayDivs = paper.querySelectorAll('.gs_gray');
        const authors = grayDivs[0] ? grayDivs[0].textContent : '';
        const journal = grayDivs[1] ? grayDivs[1].textContent : '';
        const year = paper.querySelector('.gsc_a_h').textContent;
        let link = paper.querySelector('.gsc_a_t a').getAttribute('href');
        if (link && !link.startsWith('http')) {
            link = 'https://scholar.google.com' + link;
        }
        publications.push({title, authors, journal, year, link});
    });
    
    publications = publications.filter(pub => pub.year && !isNaN(pub.year)).sort((a, b) => b.year - a.year);
    
    const pubSection = document.getElementById('publications');
    pubSection.innerHTML = '<h2>Publications</h2><ol id="pub-list"></ol>';
    const pubList = document.getElementById('pub-list');
    console.log(publications[0].journal);
    publications.forEach(pub => {
        const authors = pub.authors.replace('IA Fares', '<strong>Ibrahim A. Fares</strong>');
        const li = document.createElement('li');
        li.innerHTML = `
        ${authors},
        <a href="${pub.link}" 
        target="_blank" 
         style="color: #1565c0; text-decoration: underline;">
         ${pub.title},</a>  
         ${pub.journal}.`;
        pubList.appendChild(li);
        
    });
}

document.addEventListener('DOMContentLoaded', updatePublications); 