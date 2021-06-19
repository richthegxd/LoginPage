class Slider {
    #setInterval = null;
    #setTimeout = null;
    #currentSlideIndex = 0;
    constructor() {
        this.slider = document.querySelector(".slider");
        this.sliderContainer = document.querySelector(".slider-container");
        this.slides = [...document.querySelectorAll(".slider-container_slide")];
        this.progressContainer = document.querySelector(".slider-progress");
        this.controlsButton = null;
        this.setSlideInterval = 8000;
        this.timeoutSetSlide = 5000;
    }

    init() {
        this.createSlideIndexes();
        this.createControls();
        this.startProgress(this.setSlideInterval / 1000)
        this.startSelectSlide(this.setSlideInterval);
        this.focusButton();
    }

    createSlideIndexes() {
        this.slides.forEach((slide, index) => {
            slide.dataset.index = index;
        });
    }

    createControls() {
        const containerControls = document.createElement("div");
        containerControls.classList.add("slider-controls");

        this.slides.forEach((slide, index) => {
            const control = Slider.controlButtonTemplate(index);
            containerControls.appendChild(control);
        });

        this.slider.appendChild(containerControls);
    }

    selectSlide(index) {
        this.#currentSlideIndex = index;
        const currentSlide = document.querySelector(
            `.slider-container_slide[data-index="${this.#currentSlideIndex}"]`
        );
        const currentSlideHeight = currentSlide.getBoundingClientRect();

        this.sliderContainer.style.transform = `translateY(-${
            currentSlideHeight.height * index
        }px)`;

        this.focusButton();
        this.startProgress(this.setSlideInterval / 1000)
    }

    startSelectSlide(interval) {
        this.#setInterval = setInterval(() => {
            this.#currentSlideIndex++;
            if (this.#currentSlideIndex <= this.slides.length - 1) {
                this.selectSlide(this.#currentSlideIndex);
            } else {
                this.#currentSlideIndex = 0;
                this.selectSlide(this.#currentSlideIndex);
            }
        }, interval);
    }

    startProgress(time) {
        this.clearProgressContainer();

        const progress = document.createElement("div");
        progress.classList.add("slider-progress_content")
        progress.style.animation = `progress ${time}s`;

        this.progressContainer.appendChild(progress);
    }

    clearProgressContainer() {
        if(this.progressContainer.firstChild) {
            this.progressContainer.firstChild.remove();
        }
    }

    stopSelectSlide() {
        clearTimeout(this.#setTimeout);
        clearInterval(this.#setInterval);
        this.clearProgressContainer();
        
        this.#setTimeout = setTimeout(() => {
            this.startProgress(this.setSlideInterval / 1000)
            this.startSelectSlide(this.setSlideInterval);
        }, this.timeoutSetSlide);
    }

    focusButton() {
        const allButtons = this.allControls;
        const currentButton = document.querySelector(
            `.slider-controls_button[data-index-of-slide="${this.#currentSlideIndex}"]`
        );
        allButtons.forEach((button) => {
            button.classList.remove("slider-controls_button-active");
        });

        currentButton.classList.add("slider-controls_button-active");
    }

    get allControls() {
        this.controlsButton = [
            ...document.querySelectorAll(".slider-controls_button"),
        ];

        return this.controlsButton;
    }

    static controlButtonTemplate(index) {
        const control = document.createElement("div");
        control.classList.add("slider-controls_button");
        control.dataset.indexOfSlide = index;

        return control;
    }
}

const slider = new Slider();

export default slider;
