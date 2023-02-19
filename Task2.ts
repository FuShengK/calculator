function orders(value: string): number {
    const number: number[] = [];
    for (let i = 0; i < value.length; i++) {
        number.push(eval(value[i]));
    }
    const ans = eval(value);
    const result: number[] = [];
    const compare: number[] = [];
    let breakPoint = false;
    for (let j = 0; j < number.length; j++) {
        if (breakPoint) {
            result.push(0);
        } else {
            result.push(number[j]);
        }

        if (number[j] > number[j + 1]) {
            breakPoint = true;
        }
        compare.push(number[j]);
    }

    let final = +result.join("");

    if (final === ans) {
        if (compare[-1] == 0) {
            return final - 1;
        } else {
            return final;
        }
    } else {
        if (compare[0] === compare[1]) {
            const variant: number[] = [];
            variant.push(compare[0]);
            for (let k = 1; k < compare.length; k++) {
                variant.push(0);
            }
            return +variant.join("") - 1;
        } else {
            return final - 1;
        }
    }
}

console.log(orders("23245"));
