
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Chạy về khóc với anh',
            img: 'assets/music/bai7/img.webp',
            singer: 'Erik',
            path: 'assets/music/bai7/Chay-Ve-Khoc-Voi-Anh-ERIK.mp3'

        },
        {
            name: 'Daydreams',
            img: 'assets/music/bai8/img.webp',
            singer: 'SOOBIN Hoàng Sơn',
            path: 'assets/music/bai8/Daydreams-SOOBIN-BigDaddy-Touliver.mp3'

        },
        {
            name: 'Anh luôn là lý do',
            img: 'assets/music/bai9/img.webp',
            singer: 'Erik',
            path: 'assets/music/bai9/Anh-Luon-La-Ly-Do-ERIK.mp3'

        },
        {
            name: 'Điều anh biết',
            img: 'assets/music/bai10/img.webp',
            singer: 'Chi dân',
            path: 'assets/music/bai10/Dieu-Anh-Biet-Chi-Dan.mp3'

        },
        {
            name: 'Cứ yêu đi',
            img: 'assets/music/bai11/img.webp',
            singer: 'Ngô Kiến Huy',
            path: 'assets/music/bai11/Cu-Yeu-Di-Ngo-Kien-Huy-Si-Thanh.mp3'

        },
        {
            name: 'Nơi này có anh',
            img: 'assets/music/bai12/img.webp',
            singer: 'Sơn Tùng MTP',
            path: 'assets/music/bai12/Noi-Nay-Co-Anh-Masew-Bootleg-Son-Tung-M-TP-Masew.mp3'

        },
        {
            name: 'Từ chối nhẹ nhàng thôi',
            img: 'assets/music/bai1/img.webp',
            singer: 'Bích Phương',
            path: 'assets/music/bai1/tu-choi-nhe-nhang-thoi-liu-riu-version-Bich-Phuong-Phuc-Du.mp3'

        },
        {
            name: 'Tình yêu ngủ quên',
            img: 'assets/music/bai2/img.webp',
            singer: 'Hoàng Tôn',
            path: 'assets/music/bai2/Tinh-Yeu-Ngu-Quen-Chill-Version-Hoang-Ton-LyHan.mp3'

        },
        {
            name: 'Phải lòng anh',
            img: 'assets/music/bai3/img.webp',
            singer: 'Dream Ver',
            path: 'assets/music/bai3/Phai-Long-Anh-Dream-Ver-MIN.mp3'

        },
        {
            name: 'Chạy khỏi thế giới này',
            img: 'assets/music/bai4/img.webp',
            singer: 'Phương Ly',
            path: 'assets/music/bai4/Chay-Khoi-The-Gioi-Nay-Da-LAB-Phuong-Ly.mp3'

        },
        {
            name: 'Lose You',
            img: 'assets/music/bai5/img.webp',
            singer: 'Rickie',
            path: 'assets/music/bai5/Lose-You-T-R-I-Rickie.mp3'

        },
        {
            name: 'tiny love',
            img: 'assets/music/bai6/img.webp',
            singer: 'Thịnh Suy',
            path: 'assets/music/bai6/tiny-love-Thinh-Suy.mp3'

        },

    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    // Method render song
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                        <div class="song ${index === this.currentIndex ? "active" : ""
                }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.img}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
        });
        playlist.innerHTML = htmls.join("");
    },
    // Method defined properties of app
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    // Method handle events
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Handle CD spins / stops
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        // Handles CD enlargement / reduction
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Handle when click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // When the song is played
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };

        // When the song is pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        // When the song progress changes
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
        };

        // Handling when seek
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };

        // When next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // When prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Handling on / off random song
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        };

        // Single-parallel repeat processing
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        // Handle next song when audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Listen to playlist clicks
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
                // Handle when clicking on the song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Handle when clicking on the song option
                if (e.target.closest(".option")) {
                }
            }
        };
    },
    // Method handle scroll
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 300);
    },

    // Method handle load current song
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    // Method handle next song
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    // Method handle previous song
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    // Method handle random song
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    // Method synthetic contains and call all methods 
    start: function () {
        // Assign configuration from config to application
        this.loadConfig();

        // Defines properties for the object
        this.defineProperties();

        // Listening / handling events (DOM events)
        this.handleEvents();

        // Load the first song information into the UI when running the app
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Display the initial state of the repeat & random button
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
};

app.start();
