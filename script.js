const ListSumGame = class{
  constructor(child, parent, total, footer){
    this.$child = $(child);
    this.$parent = $(parent);
    this.$total = $(total);
    this.$footer = $(footer);
    this.initEvents();
    this.randomTotal();
    this.calcTotal();
  }

  initEvents(){
    this.$child.on('click',(e)=>{
      this.appendItem(e);
      this.calcTotal();
    })
  }

  appendItem(e){
    const $clickedItem = $(e.currentTarget);
    const $clickedParent = $clickedItem.parent();
    const clickedLeftList = $clickedParent.is(this.$parent.first());
    
    // append item to the other list
    if (clickedLeftList) {
      this.$parent.last().append($clickedItem);
    } else {
      this.$parent.first().append($clickedItem);
    }
  }

  calcTotal(){
    this.$parent.each((index, parent)=>{
      const $children = $(parent).find(this.$child);
      let total = 0;
      // sum of list items
      $children.text((index, text)=>{
        if (isNaN(parseInt(text))) return;
        total += parseInt(text);
      });
      
      // different calculation for the right list
      const isRightList = (index == 1);
      if (isRightList){
        total = this.gameTotal-total;
        this.checkWon(total);
      }
      $(parent).next().find(this.$total).text(total);
    })
  }

  randomTotal(){
    const randomAmount = this.random(2,4);
    this.gameTotal = 0;
    let prevRandomItems = [];

    // Select X amount of random list items
    for (let i = 0; i < randomAmount; i++) {
      let randomListItem = this.random(0,4);

      // check if duplcate random number
      let isDuplicate = prevRandomItems.includes(randomListItem);
      while (isDuplicate) {
        randomListItem = this.random(0,4);
        isDuplicate = prevRandomItems.includes(randomListItem);
      }

      // add random item to history
      prevRandomItems.push(randomListItem);
      this.gameTotal += parseInt(this.$child.eq(randomListItem).text());
    }

    // update right list total
    this.$parent.last().next().find(this.$total).text(this.gameTotal);
  }

  random(min, max){
    return  Math.floor(Math.random()*(max+1-min))+min;
  }

  checkWon(total){
    if (total == 0) {
      this.$footer.addClass("locked");
      this.$child.off('click');
    }
  }

}

new ListSumGame('li','.js-list', ".js-total", ".js-footer");