'use strict'
//
// прикрепляем все нужные элементы к переменным
//
let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],

    expenses_item = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName("button")[0],
    optionalExpensesBtn = document.getElementsByTagName("button")[1],
    countBtn = document.getElementsByTagName("button")[2],

    optionExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector(".choose-income"),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;
//
// делаем кнопки неактивными
expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;
//

function start() {
// Делаем все кнопки активными
    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
//
    time =  prompt("Введите дату в формате YYYY-MM-DD", "");

    while(isNaN(money) || money == "" || money == null) { // команда isNAN возвращает true когда в нее
                            //попадают не цифры
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    // Вносим дату
    // конструкция new Date принимает значения в такой форме YYYY-MM-DD
    //  мы должны взять то что ввел пользователь - YYYY-MM-DD, преобразовать
    // и затем отдать конструкции new Date().
    // у объекта Date есть метод который принимает данные в форме YYYY-MM-DD и
    // превращает их в количество миллисекунд которые были пройдены с 1 го января
    // 1970 г
    // Потом эти миллисекунды используются для создания новой даты
    // в конце чтобы получить год мы воспользуемся методом getFullYear();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth()+1; // в js большинство значений начинаются с нуля, январь - это 0, поэтому прибавляем 1
    dayValue.value = new Date(Date.parse(time)).getDate();
}

startBtn.addEventListener('click', start);   // слушатель для кнопки Начать расчет

expensesBtn.addEventListener('click', function(){ // слушатель для кнопки Утвердить расчета обязательных расходов
    let sum = 0;
    for( let i = 0; i < expenses_item.length; i++) {
        let ques = expenses_item[i].value, // значения приходят в виде строки
            answr = expenses_item[++i].value; // с input работаем через value 
        if( (typeof(ques))=== 'string' && (typeof(ques)) != null && (typeof(answr)) != null 
        && ques !='' && answr != '' && ques.length < 50)  {
                console.log('Всё верно!');
                appData.expenses[ques] = answr;
                sum += +answr;
        }  else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() { // слушатель для кнопки Утвердить расчета необязательных расходов
    for( let i = 0; i < optionExpensesItem.length; i++) {
        let opt = optionExpensesItem[i].value;
                        
            appData.optionalExpenses[i+1] = opt ;
            optionalExpensesValue.textContent += appData.optionalExpenses[i+1] + ' ';
        
            
    }
});
// Расчитываем дневной бюджет и достаток
countBtn.addEventListener('click', function(){
    if(appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget- +expensesValue.textContent)/30).toFixed(); //если пустые скобки 
        // то округляет до ближайшего целого
        // также toFixed меняет переменную делая ее строковой
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else dayBudgetValue.textContent = "Произошла ошибка";
});
// Статьи возможного дохода:
// Теперь нужно вводить статьи возможного дохода через запятую и они должны
// сразу появляться в графе дополнительный доход
    // события input происходят только тогда, когда пользователь что то вводит
    // прямо в этот момент
    // событие change происходят когда мы убираем нашу мышь с input a и где то
    // кликаем в другом месте
    //вот как это сделать :
    // припомощи input :
    // incomeItem.addEventListener('input', function(){
    //     let items;
    //     while ( !isNaN(items) || items == "" || items == null) {
    //         items = incomeItem.value;
           
    //     }
    //     appData.Income = items.split(", "); //заносим в элементы массива строку, в которой
    //     // запятая и пробел - разделитель
    //     incomeValue.textContent = appData.Income;
    // });
    // при помощи change:
incomeItem.addEventListener('change', function(){
    let items;
    while ( !isNaN(items) || items == "" || items == null) {
        items = incomeItem.value;
        
    }
    appData.Income = items.split(", "); //заносим в элементы массива строку, в которой
    // запятая и пробел - разделитель
    incomeValue.textContent = appData.Income;
});
// Чекбокс :
checkSavings.addEventListener('click', function(){
    if (appData.savings == true){
        appData.savings = false; 
    } else {
        appData.savings = true;
    }
    
});
// Накопления:
sumValue.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData  = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    Income: [],
    savings: false
};
