
function maxProfit(arr){
    let profit = 0;
    let currDiff = 0;
    let buyDate = 0;
    let sellDate = 0;

    for(let j = 0; j < arr.length; j++){
        for(let i = 0; i < arr.length; i++){
            currDiff = arr[i] - arr[j];
            if (currDiff > profit){
                profit = currDiff;
                buyDate = j;
                sellDate= i;
            }
        }
    }

    return `maximum profit is ${profit}. Buy date was ${buyDate + 1} and sell date was ${sellDate +1}`
}

console.log(maxProfit([128, 97, 121, 123, 98, 97, 105]))