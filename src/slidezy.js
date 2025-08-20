function Slidezy(selector, options) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error(`Slidezy:  Container ${selector} not found`);
        return;
    }

    this.opt = Object.assign(
        {
            loop: false,
        },
        options
    );
    this.slides = Array.from(this.container.children);
    this.currentIndex = 0;

    this._init();
}

Slidezy.prototype._init = function () {
    this.container.classList.add("slidezy-wrapper");

    this._createTrack();

    this._createNavigation();
};

Slidezy.prototype._createTrack = function () {
    this.track = document.createElement("div");
    this.track.className = "slidezy-track";

    this.slides.forEach((slide) => {
        slide.classList.add("slidezy-slide");
        this.track.appendChild(slide);
    });

    this.container.appendChild(this.track);
};

Slidezy.prototype._createNavigation = function () {
    this.preBtn = document.createElement("button");
    this.preBtn.className = "slidezy-prev";
    this.preBtn.textContent = "<";

    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "slidezy-next";
    this.nextBtn.textContent = ">";

    this.container.append(this.preBtn, this.nextBtn);

    this.preBtn.onclick = () => this.moveSlide(-1);
    this.nextBtn.onclick = () => this.moveSlide(1);
};

Slidezy.prototype.moveSlide = function (step) {
    this.currentIndex = Math.min(
        Math.max(this.currentIndex + step, 0),
        this.slides.length - 3
    );
    this.offset = -(this.currentIndex * (100 / 3));
    this.track.style.transform = `translateX(${this.offset}%)`;
};
