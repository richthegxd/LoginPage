class Preloader {
    constructor() {
        this.container = null;
    }

    init() {
        this.createContainer();
        this.container = this.preloaderContainer;
    }

    renderPreloader() {
        this.createContainer();
        const preloader = Preloader.preloaderTemplate();
        this.container.insertAdjacentHTML("afterbegin", preloader);
    }

    createContainer() {
        if (!this.preloaderContainer) {
            const container = Preloader.containerTemplate();

            document.body.insertAdjacentHTML("afterbegin", container);
        }
    }

    clearPreloader() {
        this.container.remove();
    }

    get preloaderContainer() {
        return document.querySelector(".preloader-container");
    }

    static containerTemplate() {
        return `
        <div class="preloader-container">
        </div>
        `;
    }

    static preloaderTemplate() {
        return `
        <div class="preloader-container_wrapper">
            <div class="preloader-container_content">
            </div>
        </div>
      `;
    }
}

const preloader = new Preloader();

export default preloader;
