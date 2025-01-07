document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const urlInput = document.getElementById('urlInput').value;
    const version = getVersionFromUrl(urlInput);
  
    if (version) {
        if (checkVersionExists(version)) {
            openInNewTab(version);
            document.getElementById('error').innerText = '';
        } else {
            showError(`Version is not available! Contact: theangel2`);
        }
    } else {
        showError('Invalid URL or version not found.');
    }
  });
  
  function getVersionFromUrl(url) {
    const regex = /replay=([A-Za-z0-9\-_]{2})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  
  function checkVersionExists(version) {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', `emulated_versions/version${version}.html`, false);
    xhr.send();
    return xhr.status !== 404;
  }
  
  function openInNewTab(version) {
    const url = `emulated_versions/version${version}.html`;
    window.open(url, '_blank');
  }
  
  function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = message;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Sponsor 
    const carousel = document.querySelector('.sponsor-container');
    const sponsorContainer = document.querySelector('.sponsor-container');
    const sponsors = [
        {
            name: "PL",
            image: "pit/image1.png",
            link: "https://discord.gg/FpAewUyUXN"
        },
        {
            name: "EU",
            image: "pit/image3.png",
            link: "https://discord.gg/6w6F3Xpadd"
        },
        {
            name: "UA",
            image: "pit/image2.png",
            link: "https://discord.gg/4Z7wSvXr5b"
        },
        {
            name: "TNH",
            image: "pit/image4.png",
            link: "https://discord.gg/kHUDamR5Ut"
        },
        {
            name: "OG",
            image: "pit/image5.png",
            link: "https://discord.com/invite/VQNSh2Ks"
        },
        {
            name: "COLD",
            image: "pit/image6.png",
            link: "https://discord.gg/pwrgYBwXvK"
        },
        {
            name: "ELITE",
            image: "pit/image7.png",
            link: "https://discord.gg/yYFH2shcGp"
        },
        {
            name: "PLUTO",
            image: "pit/image8.png",
            link: "https://discord.gg/a8Gs9p9XhD"
        },
        {
            name: "SWORD",
            image: "pit/image9.png",
            link: "https://discord.gg/2EHbzY2eug"
        },
    ];
  
    // Shuffle sponsors random
    shuffleArray(sponsors);
  
    sponsors.forEach(sponsor => {
        const sponsorDiv = document.createElement('div');
        sponsorDiv.classList.add('sponsor');
        sponsorDiv.innerHTML = `
            <h3>${sponsor.name}</h3>
            <img src="${sponsor.image}" alt="Clan Logo" class="sponsor-logo">
            <a href="${sponsor.link}" target="_blank">
                <button>Join here!</button>
            </a>
        `;
        sponsorContainer.appendChild(sponsorDiv);
    });
  
    const totalSponsors = sponsors.length;
    let currentSponsorIndex = 0;
    const angle = 360 / totalSponsors;
    const translateZ = (carousel.offsetWidth / 2) / Math.tan(Math.PI / totalSponsors);
  
    const sponsorDivs = document.querySelectorAll('.sponsor');
    sponsorDivs.forEach((sponsor, index) => {
        sponsor.style.transform = `rotateY(${index * angle}deg) translateZ(${translateZ}px)`;
    });
  
    // Start random sponsor
    currentSponsorIndex = Math.floor(Math.random() * totalSponsors);
    rotateCarousel();
  
    function rotateCarousel() {
        const newAngle = currentSponsorIndex * angle;
        carousel.style.transform = `translateZ(${-translateZ}px) rotateY(${-newAngle}deg)`;
    }
  
    // Rotate sponsor
    function nextSponsor() {
        currentSponsorIndex = (currentSponsorIndex + 1) % totalSponsors;
        rotateCarousel();
    }
  
    function prevSponsor() {
        currentSponsorIndex = (currentSponsorIndex - 1 + totalSponsors) % totalSponsors;
        rotateCarousel();
    }
  
    let touchStartX = 0;
    let touchEndX = 0;
  
    sponsorContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    }, false);
  
    sponsorContainer.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    }, false);
  
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            nextSponsor(); 
        }
        if (touchEndX > touchStartX) {
            prevSponsor(); 
        }
    }
  
    sponsorDivs.forEach((sponsor, index) => {
        sponsor.addEventListener('click', () => {
            currentSponsorIndex = index;
            rotateCarousel();
        });
    });
  
    setInterval(nextSponsor, 5000); // Change sponsor every 5 seconds
  });
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
