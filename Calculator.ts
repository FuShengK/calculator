function applyOp(op: string, b: number, a: number): number {
	switch (op) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "*":
			return a * b;
		case "/":
			if (b === 0) {
				throw new Error("Cannot divide by zero");
			}
			return Math.floor(a / b);
	}
	return 0;
}

// Returns true if 'op2' has higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(op1: string, op2: string): boolean {
	if (op2 === "(" || op2 === ")") {
		return false;
	}
	if ((op1 === "*" || op1 === "/") && (op2 === "+" || op2 === "-")) {
		return false;
	}
	return true;
}

function calculating(value: string): number {
	const values: number[] = [];
	const operators: string[] = [];
	for (let i = 0; i < value.length; i++) {
		if (value[i] === " ") {
			continue;
		}
		if (value[i] >= "0" && value[i] <= "9") {
			let buffer = "";
			while (i < value.length && value[i] >= "0" && value[i] <= "9") {
				buffer += value[i++];
			}
			values.push(parseInt(buffer));
			i--;
		} else if (value[i] === "(") {
			operators.push(value[i]);
		} else if (value[i] === ")") {
			while (operators[operators.length - 1] !== "(") {
				values.push(
					applyOp(
						operators.pop() as string,
						values.pop() as number,
						values.pop() as number
					)
				);
			}
			operators.pop();
		} else if (
			value[i] === "+" ||
			value[i] === "-" ||
			value[i] === "*" ||
			value[i] === "/"
		) {
			while (
				operators.length &&
				hasPrecedence(value[i], operators[operators.length - 1])
			) {
				values.push(
					applyOp(
						operators.pop() as string,
						values.pop() as number,
						values.pop() as number
					)
				);
			}
			operators.push(value[i]);
		}
	}

	while (operators.length) {
		values.push(
			applyOp(
				operators.pop() as string,
				values.pop() as number,
				values.pop() as number
			)
		);
	}

	return values.pop() as number;
}

console.log(calculating("9*(3)"));
