document.querySelector(".control-buttons span").onclick = function(){
    let yourName =prompt("what your Name?");
    
    if(yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "Unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();//remove it in all cases
};
//chalanging sound to game and rsit if time is over
  setTimeout(() => {
    document.getElementById('game').play();
    alert('time is over')
    
  },60000)
 
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

//now that array we must define random order number for each

//make array have length: blocks.length and have keys 1, 2, 3, 4 .... => .. to extract all that حتى افكهم جوا مصفوفه واقدر اوزعهم (جرب على لكونسل)
//that mean to extract all that element that inside created array to orderRange
//Array(n) creat emty array have length n
 let orderRange = [...Array(blocks.length).keys()];
 //0r =>let orderRange = Array.from(Arrat(blocks.length).keys());

//console.log(orderRange);
shuffie(orderRange);
//console.log(orderRange);

//add order css property to game blocks , block => each block of that blocks , block{} or (block,index){}
blocks.forEach((block, index) => {
    
    //now for ech one we will add style=> order="index"(inhtml)
    block.style.order = orderRange[index]; // see the resulr in html ,
    //each one of blocks we will add the number in  order range in same index(test order range is randomly orderd)
    
    //add click Event , each block if has event click do that fun
    block.addEventListener('click', function (){
        //trigger the flip block function
        flipBlock(block);
    });
    });


//Flip Block function , selectedBlock which you clck on it
function flipBlock(selectedBlock){
    
    //add class is-flipped
    selectedBlock.classList.add('is-flipped');
    
    //collect all flipped card (to each it the same or not), blocks(from bigger function), flippedBlock(just name)
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
                                                                                          
    //if there two selected blocks => dont let him to open thered one
    if(allFlippedBlocks.length === 2){
        
        //i need:
    //stop clicking function (dont allow to open two one)
    stopClicking();
    //check mached block function(if that two one is the same or not), => remember allFlippedBlocks has two element
    checkMachedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
        
    }
    
}

//stop Clicking function
function stopClicking(){
    
    //add class no clicking on main container
    blocksContainer.classList.add('no-clicking');
    
    setTimeout(() => {
        //remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');
    },duration);//wee define duration 1000ms above
}

//cjeck matched blocks
function checkMachedBlocks(firstBlock, secoundBlock){
    
    //if wrong select add one to tries
    let triesElement = document.querySelector('.tries span');
    
    if (firstBlock.dataset.technolgy === secoundBlock.dataset.technolgy){
        
        firstBlock.classList.remove('is-flipped');
        secoundBlock.classList.remove('is-flipped');
        //has match have the same attribute of is-flipped but wuchout check in time out function after 1000ms(يعني ما برجع يلف بعد 100ms)
        firstBlock.classList.add('has-match');
        secoundBlock.classList.add('has-match');
        
        document.getElementById('success').play();
        
    }else{//parsInt to ensure number is int
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        //set time out حتى يخلي المستخدم يشوف البلوك الثالني قبل ما يشيل منو مباشره ال is-flipped
        setTimeout(() => {
             //to return ! and applay time out function after 1000ms
        firstBlock.classList.remove('is-flipped');
        secoundBlock.classList.remove('is-flipped');
        },duration).
        
        document.getElementById('fail').play();
    }
    
}

//shuffie function => array with random range
function shuffie(array){
    //setting vars
    let current = array.length,
    temp,//temparly var
    random;
    
    while(current > 0){
        //get random number=> Math.random*current (to get random number in range of current which is array length) => Math.fllor to remove ,00
        random = Math.floor(Math.random()*current);
        
        //decrease Length by one
        current--;
        
        //[1] save current element is stash
        temp = array[current]; // f:temp=0
        
        //[2] current Element = random element
        array[current] = array[random];//to get random index from array => array[random] is random index , f: araay[9](0)=array[3](4)
        
        //[3] random element = get element from stash
        array[random] = temp; //f: [3]=0
    }
    
    return array;
}

//steps for creat shufie function:
//current Array [1,2,3,4,5,6,7,8,9,0]
//new Array [1,2,3,4,5,6,7,8,9,4]
/*
[1] save current element is stash => which is first 0 save it in box 
[2] current Element = random element 0 = 4(random) (index 3)
[3] random element = get element from stash => 0 become 4 , and 4 becoume 0(in stash)
>>>and so on 
*/





