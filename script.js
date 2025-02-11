function showSection(sectionId) {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('juego').classList.add('hidden');
    document.getElementById('historial').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

