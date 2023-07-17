export class IndentifyWhenPlayerWon {
    constructor ( arrayDesorder, arrayOrder ) {
        this.arrayDesorder = arrayDesorder;
        this.arrayOrder = arrayOrder;
    }
    arrayEqualsBlocksOrder() {
        return Array.isArray(this.arrayDesorder)
            && Array.isArray(this.arrayOrder)
            && this.arrayDesorder.length === this.arrayOrder.length 
            && this.arrayDesorder.every((val, index) => val === this.arrayOrder[index]);
    }
}