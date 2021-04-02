const ListCountGame = class{
    constructor(child, parent, total, footer){
      this.$child = $(child);
      this.$parent = $(parent);
      this.$total = $(total);
      this.$footer = $(footer);
      this.initEvents();
      this.randomSequence();
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

        $(parent).next().find(this.$total).text(total);
      })
    }

    randomSequence(){
        this.gameTotal = 20;
        const stepAmount = this.random(3,4); //4
        let prevAmount = 0;
        let sequence = [];
        for (let stepsLeft = stepAmount-1; stepsLeft >0; stepsLeft--) {
            const maxNumber = this.gameTotal-prevAmount-stepsLeft;
            const randomNumber = this.random(1,maxNumber);
            prevAmount += randomNumber;
            sequence.push(randomNumber);
        }
        const restValue = this.gameTotal - prevAmount;
        sequence.push(restValue);
        console.log('totalSequence:', sequence.reduce((a,b) => a + b, 0));
        console.log('sequence:', sequence);
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
  
  new ListCountGame('li','.js-list', ".js-total", ".js-footer");

// Simplified version of 5 steps:
/* #1  Recources? start?   ####
   - startcijfer = getal tussen 15-30
   - 6-8 random getallen 
*/
/* #2 Objectives? during?  ####
  - move items  between lists
  - recalculate total 
  - find the correct sequence
*/
/* #3 Obstacles? constant? ####
  - given total number (20)
  - randomized sequence
*/
/* #4    Interaction?      ####
  - click list item
*/
/* #5        Goal?         ####
   - 2 kollomen met eenzelfde totaal
   - het totaal wordt gevormd met random getllane
*/


/*------------------------
  |--- Game-generator ---|
  ------------------------
*/
// StartNumber: 20
// [17,1,1,1]

//##step1## (10)
// 20-0-3    = 17-1 ==> 10
//##step2## (5) 
// 20-10-2 = 8-1  ==> 5
//##step3## (3)
// 20-15-1 = 4-1  ==> 3
//##step4## (1)
// 20-(10+5+3) = 2

// =============> sum() = 20


// 2x lijsten  [17,1,1,1] =20 & [5,5,4,4,2]= 20

// [17,1,4,4,2] & [1,1,5,5]