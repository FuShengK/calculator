import React, { useState } from 'react';
import { Line } from '@ant-design/charts';

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
				throw new Error('Cannot divide by zero');
			}
			return Math.floor(a / b);
		default:
			return 0;
	}
};

// Returns true if 'op2' has higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(op1, op2) {
	if (op2 === '(' || op2 === ')') { return false; }
	if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) { return false; }
	return true;
};

function calculating(props) {
	let x = props.x;
	let value = props.terms
	let idx_x = props.terms.indexOf('x');
	var format = /[0-9]/;
	let transform;
	if (format.test(value[idx_x - 1])) {
		transform = '*(' + x.toString() + ')';
	}

	value = value.replace('x', transform);
	let values = [];
	let operators = [];

	for (let i = 0; i < value.length; i++) {
		if (value[i] === ' ' || value[i] === '=' || value[i] === 'y') { continue; }
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

	console.log(values)
	return values.pop();
};

export default function App() {
	const [num, setNum] = useState(1);
	const [data, setData] = useState([]);
	const [terms, setTerms] = useState("");

	const handleTermChange = (event) => { setTerms(event.target.value); }
	const handleNUmChange = (event) => { setNum(event.target.value); }

	const handleSubmit = (e) => {
		e.preventDefault();
		const allX = Array.from({ length: num }, (_, i) => i);
		const ans = allX.map((x) => ({
			x: x,
			y: calculating({ terms: terms, x: x })
		}))
		setData(ans)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Input functions
				</label>
				<br />
				<input type="text" value={terms} onChange={handleTermChange} />
				<br />
				<br />
				<label>
					Input points numbers
				</label>
				<br />
				<input type="number" value={num} onChange={handleNUmChange} />
				<br />
				<br />
				<input type="submit" value="Submit" />
			</form>
			<Line
				data={data}
				height={500}
				xField="x"
				yField="y"
				point={{ size: 5, shape: 'diamon' }}
				color='blue'
			/>
		</>
	);
}