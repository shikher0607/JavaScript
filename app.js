//Budget Controller
var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

   var data = {
       allItems: {
           exp: [],
           inc: []
       },
       totals: {
           exp: 0,
           inc: 0
       }
   }

   return{
       addItem: function(type, des, val){
        var newItem, ID;

        //ID = 0;
        //Create new ID
        if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }else{
            ID = 0;
        }
         

        //Create new Item based on type
        if(type === 'exp'){
            newItem = new Expense(ID, des, val);
        }else if(type === 'inc'){
            newItem = new Income(ID, des, val);
        }

        //Push it into data struture
        data.allItems[type].push(newItem);

        //Return    
        return newItem;

       }
   };

    })();
    
    //UI Controller
    var UIController = (function(){
        
        var domStrings = {
            inputType: '.add__type',
            inputDescription: '.add__description',
            inputValue: '.add__value',
            inputBtn: '.add__btn'
        }
    
        return{
            getInput: function(){
                return{
                type: document.querySelector(domStrings.inputType).value, // Either inc or exp
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
                };
            },
            getDomStrings: function(){
                return domStrings;
            }
        };
    
    })();
    
    //Global App Controller
    var controller = (function(budgetCtrl, UICtrl){
    
        var setupEventListners = function(){
            
            var DOM = UICtrl.getDomStrings();
            document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    
            document.addEventListener('keypress', function(event){
                if(event.keyCode === 13 || event.which === 13){
                    ctrlAddItem();
                }
            });
        }
    
        var ctrlAddItem = function(){
            var input, newIem;
             //Get the filled input data
             input = UICtrl.getInput();

            //Add the item to budget controller
             newIem =  budgetCtrl.addItem(input.type, input.description, input.value)
            //Add the new item to user interface
            //calculate the budget
            //display the budget on the UI
        };
    
        return{
            init: function(){
                setupEventListners();
            }
        }
    
    })(budgetController, UIController);
    
    controller.init();