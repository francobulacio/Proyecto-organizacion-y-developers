

export const getInitials = (name: string) => {
    const names = name.split(' ');
    let iniciales = '';
    for (let i = 0; i <= names.length - 1; i++) {
        iniciales = iniciales + names[i].substring(0, 1);
    }
    return iniciales.toUpperCase();
}