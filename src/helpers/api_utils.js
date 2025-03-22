// Subraya el proyecto seleccionado
export const handleSelectLink = (id) => {
    const ul = document.querySelector('.content');
    const li = ul.querySelectorAll('.content_li');
    const str = String(id);

    li.forEach((element) => {
        const child = element.children[0];
        if (str === child.getAttribute('id')) {
            child.classList.add('activeLink');
        }
        if (str !== child.getAttribute('id')) {
            child.classList.remove('activeLink');
        }
    });
};

// Elimina el link seleccionado
export const handleCleanLink = () => {
    const ul = document.querySelector('.content');
    const li = ul.querySelectorAll('.content_li');

    li.forEach((element) => {
        const child = element.children[0];
        child.classList.remove('activeLink');
    });
}