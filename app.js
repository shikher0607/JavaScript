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
            inputBtn: '.add__btn',
            incomeContainer: '.income__list',
            expensesContainer: '.expenses__list'
        }
    
        return{
            getInput: function(){
                return{
                type: document.querySelector(domStrings.inputType).value, // Either inc or exp
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
                };
            },

            addListItem: function(obj, type){
                var html, newHtml,element;
                //Create HTML with placeholder string
                if(type === 'inc'){
                    element = domStrings.incomeContainer;
                    html =  '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';       
                }else if(type === 'exp'){
                    element = domStrings.expensesContainer;
                    html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
                }
                //Replace placeholder

                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%', obj.description);
                newHtml = newHtml.replace('%value%',obj.value);


                //Insert HTML into the DOM
                document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);


            },

            clearFields: function(){
                var fields, fieldsArray;
                fields =  document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue);

                fieldsArray = Array.prototype.slice.call(fields);

                fieldsArray.forEach(function(current, index, array){
                    current.value = '';
                });

                fieldsArray[0].focus();
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
            var input, newItem;
             //Get the filled input data
             input = UICtrl.getInput();

            //Add the item to budget controller
             newItem =  budgetCtrl.addItem(input.type, input.description, input.value)

            //Add the new item to user interface
            UICtrl.addListItem(newItem, input.type);

            //Clear the Fields
            UICtrl.clearFields();
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