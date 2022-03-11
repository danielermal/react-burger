import { data } from "./data";

export const bun = []
export const main = []
export const sauce = []

data.forEach((ingridient) => {
    if (ingridient.type === "bun") {
        bun.push(ingridient)
    }
    else if (ingridient.type === "main") {
        main.push(ingridient)
    }
    else {
        sauce.push(ingridient)
    }
})