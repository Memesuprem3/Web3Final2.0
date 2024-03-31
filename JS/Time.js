function updateDateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    
    const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 
                    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
    const day = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    
    const dateTimeStr = `<span class="time">${hours}:${minutes}:</span> <span class="date">${day} ${monthName} ${year}</span>`;
    document.getElementById('dateTimeDisplay').innerHTML = dateTimeStr;
}


setInterval(updateDateTime, 1000);
updateDateTime();