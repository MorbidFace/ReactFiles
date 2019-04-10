export const toCamelCase = (input: string) => input.replace(/ ([a-z])/ig, (all, letter) => letter.toUpperCase());

export const toPascalCase = (input: string) => input.replace(/^[a-z]| ([a-z])/ig, (all, letter) => {
    let upper = all.toUpperCase().trim();
    return upper;
});

export const toTileCase = (str: string) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const toUpperCase = (input: string) => toCamelCase(input.charAt(0).toUpperCase() + input.slice(1));