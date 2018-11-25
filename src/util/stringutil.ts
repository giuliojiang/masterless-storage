var stringNullOrWhitespace = function(s: string): boolean {
    return s === null || s.match(/^ *$/) !== null;
}

export {
    stringNullOrWhitespace
}