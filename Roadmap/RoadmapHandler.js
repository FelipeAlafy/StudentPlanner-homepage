const initializeRoadmapPage = () => {
    setCurrentYear();
};

const setCurrentYear = () => {
    const yearElement = document.getElementById('current-year-display');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};

document.addEventListener('DOMContentLoaded', initializeRoadmapPage);