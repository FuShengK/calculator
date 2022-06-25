
function applyOp(op, b, a) {
	switch (op) {
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		case '/':
			if (b === 0) {
				throw 'Cannot divide by zero';
			}
			return Math.floor(a / b);
	}
	return 0;
};

// Returns true if 'op2' has higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(op1, op2) {
	if (op2 === '(' || op2 === ')') { return false; }
	if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) { return false; }
	return true;
};

function calculating(value) {
	let values = [];
	let operators = [];
	for (let i = 0; i < value.length; i++) {
		if (value[i] === ' ') { continue; }
		if (value[i] >= '0' && value[i] <= '9') {
			let buffer = '';
			while (i < value.length && value[i] >= '0' && value[i] <= '9') {
				buffer += value[i++];
			}
			values.push(parseInt(buffer));
			i--;
		} else if (value[i] === '(') {
			operators.push(value[i]);
		} else if (value[i] === ')') {
			while (operators[operators.length - 1] !== '(') {
				values.push(applyOp(operators.pop(), values.pop(), values.pop()));
			}
			operators.pop();
		} else if (value[i] === '+' || value[i] === '-' || value[i] === '*' || value[i] === '/') {
			// Current token is an operator.
			// While top of 'ops' has same or greater precedence to current
			// token, which is an operator. Apply operator on top of 'ops'
			// to top two elements in values stack
			while (operators.length && hasPrecedence(value[i], operators[operators.length - 1])) {
				values.push(applyOp(operators.pop(), values.pop(), values.pop()));
			}
			// Push current token to 'ops'.
			operators.push(value[i]);
		}
	}

	while (operators.length) {
		values.push(applyOp(operators.pop(), values.pop(), values.pop()));
	}

	return values.pop();
};


console.log(calculating('(15-9)*7'))