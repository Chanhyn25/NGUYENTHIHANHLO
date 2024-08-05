// bài 5

Array.prototype.calculate = function () {
    const results = new Map();

    // tính tổng
    results.set(this.reduce((acc, val) => acc + val, 0));
    // tính thich
    results.set(this.reduce((acc, val) => acc * val, 1));

    this.getResults = function () {
        return results;
    };
};
