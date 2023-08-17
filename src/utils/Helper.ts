
export const getRandomNeonColor = (numberOfDifferentColors: number): string[] => {
    const neonPalettes = [
        '#00FEFC',
        '#00FF00',
        '#6F00FF',
        '#8F00FF',
        '#BF00FF',
        '#CCFF00',
        '#F6890A',
        '#FE347E',
        '#FF2603',
        '#FF6EFF'
    ];

    const differentNeonColors: string[] = [];

    let idx = Math.floor(Math.random() * neonPalettes.length);

    for (let i = 0; i < numberOfDifferentColors; i++) {
        differentNeonColors.push(neonPalettes[idx]);
        idx = (idx + 1) % neonPalettes.length;
    }

    return differentNeonColors;
};