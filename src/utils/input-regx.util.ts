export interface Regx {
    rule: RegExp;
    msg: string;
}

/**
 * User
 */
export const usernamaeRegx: Regx = {
    rule: /^[A-Za-z]+(?:[._-][A-Za-z0-9]+)*$/,
    msg: "username must start with eng characters, then number & specific symbol(_-.) allowed",
};

export const passwordRegx: Regx = {
    rule: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    msg: "password too weak",
};

/**
 * hobby
 */
export const hobbyNameRegx: Regx = {
    rule: /^[A-Za-z]+(?:[ -_]{0,1}[A-Za-z]+)*$/,
    msg: "hobby name must start with eng characters, also allowed eng and space"
}