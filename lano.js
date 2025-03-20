async function downloadTikTokVideo() {
    const url = document.getElementById('tiktok-url').value;
    const videoContainer = document.getElementById('video-info');
    const preview = document.getElementById('preview');
    const downloadVideoLink = document.getElementById('download-video-link');
    const downloadMp3Link = document.getElementById('download-mp3-link');
    const errorMessage = document.getElementById('error-message');
    const pasteLink = document.getElementById('paste-link');
    const downloadButton = pasteLink.querySelector('button');

    if (!url) {
        errorMessage.textContent = 'Masukkan URL TikTok terlebih dahulu!';
        return;
    }

    errorMessage.textContent = '';

    try {
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data && data.data && data.data.play) {
            const videoUrl = data.data.play;
            const mp3Url = data.data.music;

            videoContainer.style.display = 'flex';
            preview.src = videoUrl;

            // Membuat nama file kustom
            const now = new Date();
            const tanggal = String(now.getDate()).padStart(2, '0');
            const bulan = String(now.getMonth() + 1).padStart(2, '0');
            const tahun = now.getFullYear();
            const jam = String(now.getHours()).padStart(2, '0') + '-' + String(now.getMinutes()).padStart(2, '0') + '-' + String(now.getSeconds()).padStart(2, '0');
            const fileName = `Lanovt ${tanggal}-${bulan}-${tahun} ${jam}.mp4`; // Asumsi video adalah mp4

            downloadVideoLink.href = videoUrl;
            downloadVideoLink.textContent = 'Download Video';
            downloadVideoLink.download = fileName; // Menetapkan nama file

            if (mp3Url) {
                downloadMp3Link.href = mp3Url;
                downloadMp3Link.textContent = 'Download MP3';
                downloadMp3Link.style.display = 'inline-block';
                // Membuat nama file MP3
                const mp3FileName = `Lanovt ${tanggal}-${bulan}-${tahun} ${jam}.mp3`;
                downloadMp3Link.download = mp3FileName;
            } else {
                downloadMp3Link.style.display = 'none';
            }

            pasteLink.style.display = 'none';
        } else {
            errorMessage.textContent = 'Gagal mendapatkan video. Pastikan URL benar!';
            videoContainer.style.display = 'none';
        }
    } catch (error) {
        errorMessage.textContent = 'Terjadi kesalahan saat mengambil data.';
        videoContainer.style.display = 'none';
        console.error("Download Error:", error);
    }
}

document.getElementById('back-button').addEventListener('click', function () {
    document.getElementById('paste-link').style.display = 'block';
    document.getElementById('video-info').style.display = 'none';
    document.getElementById('tiktok-url').value = '';
    document.getElementById('error-message').textContent = '';
});

document.getElementById('tiktok-url').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        downloadTikTokVideo();
    }
});
