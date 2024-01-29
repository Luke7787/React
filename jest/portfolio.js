class Portfolio {
    constructor() {
        this.stocks = {};
    }

    isEmpty() {
        return Object.keys(this.stocks).length === 0;
    }

    addStock(symbol, shares) {
        if (!this.stocks[symbol]) {
            this.stocks[symbol] = 0;
        }
        this.stocks[symbol] += shares;
    }

    sellStock(symbol, shares) {
        if (this.stocks[symbol] && this.stocks[symbol] >= shares) {
            this.stocks[symbol] -= shares;
            if (this.stocks[symbol] === 0) {
                delete this.stocks[symbol];
            }
        } else {
            throw new Error('Not possible to sell this number of shares.');
        }
    }

    getShares(symbol) {
        return this.stocks[symbol] || 0;
    }

    countSymbols() {
        return Object.keys(this.stocks).length;
    }
}

module.exports = Portfolio;

