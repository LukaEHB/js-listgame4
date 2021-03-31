const ListCountGame = class{
    constructor(container, parent , child, total, footer, gameNumber){
        this.$container = $(container);
        this.$parent = $(parent);
        this.$child = child;
        this.$total = $(total);
        this.$footer = $(footer);
        this.gameTotal = Math.floor(Math.random()*16)+15;
        $(gameNumber).html(this.gameTotal );
        this.addEvents();
        this.createGameSequence();
        this.calcTotal();
    }

    addEvents(){
        this.$parent.on('click', this.$child ,(e)=>{
            this.appendTarget(e);
            // this.calcTotal();
            // this.checkWon();
        });
    }

    appendTarget(e){
        this.currentContainer = $(e.currentTarget).closest(this.$container);
        let targetParent;
        if (this.currentContainer.next().length) {
            targetParent = this.currentContainer.next().find(this.$parent);
            
        }else{
            targetParent = this.currentContainer.prev().find(this.$parent);
        }

        $(e.currentTarget).addClass("removeCard");

        var cssTransitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        $(e.currentTarget).on(cssTransitionEnd, (event)=>{
            if(event.originalEvent.propertyName  !== 'margin-top') return;
            setTimeout(()=>{
                $(e.currentTarget).removeClass("removeCard").appendTo(targetParent);
                this.calcTotal();
                this.checkWon();
            }, 100)
        })
    }

    calcTotal(){
        this.$container.each((i,element)=>{
            const $listItems = $(element).find("li")
            const total = this.sum($listItems)
            $(element).find(this.$total).html(total);
        })
    }

    generateSequence(){
        this.gameTotal
        const cardAmount = Math.floor(Math.random()*3)+2 //2-5
        const sequence = [];
        let total = this.gameTotal;
        for (let steps = cardAmount; steps >0; steps--) {
            // 20
            // 0-19
            // 1-20 ==> 1-17
            // 3steps

            // 1-17 
            // 2steps (total 3)
            // 3 -2 ==> 1
            // 1step (total 2)
            // 
            // 1==> 1
            // 1
            
            let maxRandomNumber = total-steps;
            const sequenceNumber = Math.floor(Math.random()*maxRandomNumber)+1
            sequence.push(sequenceNumber);
            total -= sequenceNumber;
        }
        sequence.push(total);
        console.log(sequence);
        console.log(sequence.reduce((a, b) => a + b, 0) );
        return sequence;
    }

    createGameSequence(){
        let gameArray = this.generateSequence().concat(this.generateSequence());
        gameArray = this.shuffleArray(gameArray);
        const array1 = gameArray.slice(0,gameArray.length/2);
        const array2 = gameArray.slice(gameArray.length/2, gameArray.length);
        this.makeListItems(this.$parent.first(),array1);
        this.makeListItems(this.$parent.last(),array2);
    }

    shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    makeListItems($domContainer,sequence){
        sequence.forEach(number => {
            $("<li></li>").text(number).appendTo($domContainer);
        });
    }

    sum($doms){
        let result = 0;
        $doms.text( (index, el) => {
            result += parseInt(el);
        });
        return result;
    }


    checkWon(){
        const total = parseInt(this.$container.last().find(this.$total).html());
        if (total === this.gameTotal) {
            this.$footer.addClass("locked");
            this.$parent.off('click');
        }
    }

}

new ListCountGame(".js-container",".js-list", "li", ".js-total", ".js-footer", ".js-gameNumber")

// 20 => [2, 4, 2, ]

// 20 => [5, 4, 4,2, 5]


// generating
// [8, 5, 6, 7, 9,5] ==> 2x = 10
// generate random numbers ==> check if there is a possible solution
// if not==> regenerate

// [3,4,6] <=> 13   keep generating next one with same sum [10,3] => 13
// [1,1,13] <=> 15

// [1,1,1,12] <=> 15
// [1,1,1,1,11] <=> 15

// Logica ==> what does always stay the same?
// 20
// ==> 20-10-5-5 =0
// 18-1 = 10
// 20-10 = 10
// 9-1 = 5
// 10-5 = 5
// [10,5,5]


// what is er constant? what does the gave give? (resources)
// 20