const time = 10000;

function getNotifyContainer() {
    return document.querySelector(".notify-container");
}

function notify({ message = "Info message", className = "alert-info" } = {}) {
    if (!getNotifyContainer()) {
        createNotifyContainer();
    }

    const index = getAlertIndex();
    const messageTemplate = alertTemplate(message, className, index);
    const notifyContainer = getNotifyContainer();
    notifyContainer.insertAdjacentHTML("beforeend", messageTemplate);

    progress(index, time / 1000);

    setTimeout(() => {
        removeNotify(index);
    }, time);
}

function notifyContainerTemplate() {
    return `
        <div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index: 99"></div>
    `;
}

function createNotifyContainer() {
    const notifyTemplate = notifyContainerTemplate();

    document.body.insertAdjacentHTML("afterbegin", notifyTemplate);
}

function alertTemplate(message, className, index) {
    return `
        <div class="alert ${className}" data-index="${index}">
            <span class="remove_alert_button data-delete-alert-index="${index}">×</span>
            <h4>${message}</h4>
            <div class="progress">
                <div class="progress_content"></div>
            </div>
        </div>
    `;
}

function getAlertIndex() {
    return document.querySelectorAll(".notify-container .alert").length;
}

function removeNotify(index) {
    let alert;

    if (index === undefined) {
        alert = document.querySelector(".notify-container .alert");
    } else {
        alert = document.querySelector(
            `.notify-container .alert[data-index="${index}"]`
        );
    }

    if (!alert) {
        console.warn("Alert not found!");
        return;
    }

    const notifyContainer = getNotifyContainer();
    notifyContainer.removeChild(alert);
}

function progress(index, time) {
    const bar = document.querySelector(
        `.notify-container .alert[data-index="${index}"] .progress_content`
    );

    bar.style.animation = `progress ${time}s`;
}

export { notify, removeNotify };
