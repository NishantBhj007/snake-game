export function setupRestartButton() {
    document.querySelector('#reset-button').addEventListener('click', () => {
        location.reload();
    });
}
