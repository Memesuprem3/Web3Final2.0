document.addEventListener('DOMContentLoaded', () => {
    loadLinks();

    document.getElementById('addLinkBtn').addEventListener('click', () => {
        const title = document.getElementById('linkTitle').value;
        const url = document.getElementById('linkUrl').value;
        if (title && url) {
            addLink(title, url);
            document.getElementById('linkTitle').value = '';
            document.getElementById('linkUrl').value = '';
        } else {
            alert('Vänligen fyll i både titel och URL.');
        }
    });
});

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('savedLinks') || '[]');
    const linksList = document.getElementById('linksList');
    linksList.innerHTML = ''; 
    links.forEach((link, index) => {
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.url}`;
        const li = document.createElement('li');
        li.style.listStyleType = "none"; 
        
        li.innerHTML = `<img src="${faviconUrl}" alt="Favicon" style="vertical-align: middle; margin-right: 5px; width: 24px; height: 24px;"> 
                        <a href="${link.url}" target="_blank">${link.title}</a>
                        <button class="remove-btn" onclick="removeLink(${index})">&#8722;</button>`;
        linksList.appendChild(li);
    });
}
function addLink(title, url) {
    const links = JSON.parse(localStorage.getItem('savedLinks') || '[]');
    links.push({ title, url });
    localStorage.setItem('savedLinks', JSON.stringify(links));
    loadLinks();
}

function removeLink(index) {
    const links = JSON.parse(localStorage.getItem('savedLinks') || '[]');
    links.splice(index, 1);
    localStorage.setItem('savedLinks', JSON.stringify(links));
    loadLinks();
}