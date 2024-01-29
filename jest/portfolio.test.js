const Portfolio = require('./portfolio');

test('new portfolio should be empty', () => {
    const myPortfolio = new Portfolio();
    expect(myPortfolio.isEmpty()).toBe(true);
});

test('should be able to add stocks to the portfolio', () => {
    const myPortfolio = new Portfolio();
    myPortfolio.addStock('AAPL', 10);
    expect(myPortfolio.getShares('AAPL')).toBe(10);
});

test('should be able to sell stocks from the portfolio', () => {
    const myPortfolio = new Portfolio();
    myPortfolio.addStock('AAPL', 10);
    myPortfolio.sellStock('AAPL', 5);
    expect(myPortfolio.getShares('AAPL')).toBe(5);
});

test('should report the count of unique ticker symbols', () => {
    const myPortfolio = new Portfolio();
    myPortfolio.addStock('AAPL', 10);
    myPortfolio.addStock('MSFT', 15);
    expect(myPortfolio.countSymbols()).toBe(2);
});

test('should not keep symbols with zero shares', () => {
    const myPortfolio = new Portfolio();
    myPortfolio.addStock('AAPL', 10);
    myPortfolio.sellStock('AAPL', 10);
    expect(myPortfolio.countSymbols()).toBe(0);
});

test('should not allow selling more shares than owned', () => {
    const myPortfolio = new Portfolio();
    myPortfolio.addStock('AAPL', 10);
    
    expect(() => {
        myPortfolio.sellStock('AAPL', 15);
    }).toThrow('Not possible to sell this number of shares.');
});

