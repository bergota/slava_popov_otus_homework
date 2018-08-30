
function sum(x) {
	var buff = 0;

	function f(x) {
		if (x) {
			buff += x;
			return f;

		} else {
			return buff;
		}
	}

	return f(x);
}
