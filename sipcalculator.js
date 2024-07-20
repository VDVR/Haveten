let currentWatt,
 catchWatt = document.getElementById("watts"),
 catchTooltipMaxSlide = catchWatt.offsetWidth - 15,
 catchTooltip = document.getElementById("showValue"),
 catchTextValue = document.getElementById("textValue"),
 catchVolt = document.getElementById("volts"),
 catchTooltip2MaxSlide = catchVolt.offsetWidth - 7,
 catchTooltip2 = document.getElementById("showValue2"),
 currentVolt,
 catchTextValue2 = document.getElementById("textValue2"),
 catchAmps = document.getElementById("showAmps"),
 catchReturn = document.getElementById("showReturn"),
 catchInvested = document.getElementById("showInvested"),
 currentYear,
 catchYear = document.getElementById("years"),
 catchTooltip3MaxSlide = catchYear.offsetWidth - 7,
 catchTooltip3 = document.getElementById("showValue3"),
 catchTextValue3 = document.getElementById("textValue3"),
 futureValue,
 invested,
 returnedValue;
 catchWatt.oninput = function () {
 tooltipSliding("watt");
 calculateAmps();
 };
 catchVolt.oninput = function () {
 tooltipSliding("volt");
 calculateAmps();
 };
 catchYear.oninput = function () {
 tooltipSliding("year");
 calculateAmps();
 };
 function tooltipSliding(slider, textInput = "") {
 if (slider == "watt") {
 currentWatt = textInput == "" ? catchWatt.value : 
textInput;
 catchTooltip.innerHTML = currentWatt < 500 ? 500 : 
currentWatt;
 catchTextValue.value = parseInt(currentWatt);
 let tooltipCanSlide = catchTooltipMaxSlide;
 catchTooltip.style.left = `${parseInt(
 (tooltipCanSlide / 200000) * currentWatt
 )}px`;
 } else if (slider == "volt") {
 currentVolt = textInput == "" ? catchVolt.value : 
textInput;
 catchTooltip2.innerHTML = currentVolt;
 catchTextValue2.value = parseInt(currentVolt);
 let tooltipCanSlide = catchTooltip2MaxSlide;
 catchTooltip2.style.left = `${parseInt(
 (tooltipCanSlide / 30) * currentVolt - 9
 )}px`;
 console.log(catchTooltip2.style.left)
 } else if (slider == "year") {
 currentYear = textInput == "" ? catchYear.value : 
textInput;
 catchTooltip3.innerHTML = currentYear;
 catchTextValue3.value = parseInt(currentYear);
 let tooltipCanSlide = catchTooltip3MaxSlide;
 catchTooltip3.style.left = `${parseInt(
 (tooltipCanSlide / 30) * currentYear - 9
 )}px`;
 }
 }
 function setWattValue() {
 let pattern = /^[0-9]*$/,
 v = catchTextValue.value;
 if (pattern.test(v) && v != '' && v <= 200000 && v >= 500 
|| v == 50) {
 originalValue = parseInt(catchTextValue.value);
 catchTextValue.value = originalValue;
 catchWatt.value = originalValue;
 tooltipSliding("watt", originalValue);
 } else {
 catchTextValue.value = 500;
 catchWatt.value = 500;
 tooltipSliding("watt", 500);
 }
 if (v != '' && v <= 200000 && v >= 500) calculateAmps();
 }
 function setVoltValue() {
 let pattern = /^[0-9]*$/,
 v = catchTextValue2.value;
 if (pattern.test(v) && v > -1 && v <= 30) {
 originalValue = 
isNaN(parseInt(catchTextValue2.value)) ? 1 : 
parseInt(catchTextValue2.value);
 catchTextValue2.value = originalValue;
 catchVolt.value = originalValue;
 tooltipSliding("volt", originalValue);
 console.log('here', originalValue)
 } else if (v != '') {
 console.log('here2')
 catchTextValue2.value = 1;
 catchVolt.value = 1;
 tooltipSliding("volt", 1);
 }
 calculateAmps();
 }
 function setYearValue() {
 let pattern = /^[0-9]*$/,
 v = catchTextValue3.value;
 if (pattern.test(v) && v != '' && v >= 1 && v <= 30) {
 originalValue = 
isNaN(parseInt(catchTextValue3.value)) ? 1 : 
parseInt(catchTextValue3.value);
 catchTextValue3.value = originalValue;
 catchYear.value = originalValue;
 tooltipSliding("year", originalValue);
 } else {
 catchTextValue3.value = 1;
 catchYear.value = 1;
 tooltipSliding("year", 1);
 }
 calculateAmps();
 }
 window.addEventListener(
 "resize",
 function (event) {
 catchTooltipMaxSlide = catchWatt.offsetWidth - 20;
 catchTooltip2MaxSlide = catchVolt.offsetWidth - 20;
 },
 true
 );
let myChart;
function calculateAmps() {
 currentWatt = isNaN(currentWatt) ? 500 : currentWatt;
 currentVolt = isNaN(currentVolt) ? 1 : currentVolt;
 currentYear = isNaN(currentYear) ? 1 : currentYear;
 
 futureValue = futureValue == undefined ? 6266.33 : currentWatt * 
(((Math.pow((1 + (currentVolt / 100) / 12), (currentYear * 12))) - 1) 
/ ((currentVolt / 100) / 12)) * (1 + (currentVolt / 100) / 12);
 invested = invested == undefined ? 6000 : currentWatt * currentYear 
* 12;
 returnedValue = futureValue - invested;
 console.log('VALUES :', futureValue, invested, returnedValue)
 
 if (Number.isNaN(futureValue) == false) {
 catchAmps.innerHTML = `₹${futureValue.toFixed(0)}`;
 catchReturn.innerHTML = `₹${returnedValue.toFixed(0)}`;
 catchInvested.innerHTML = `₹${invested.toFixed(0)}`;
 } else {
 catchAmps.innerHTML = "";
 }
 generateChart(parseInt(futureValue), parseInt(invested), 
parseInt(returnedValue))
}
calculateAmps();
function generateChart(a, b, c) { 
 console.log('CHART===========', a, b, c);
 if (!(isNaN(futureValue), isNaN(invested), isNaN(returnedValue))) {
 if (myChart !== undefined) {
 myChart.destroy();
 }
 const data = {
 labels: [
 'Total', 'Invested', 'Return'
 ],
 datasets: [{
 label: 'My First Dataset',
 data: [a, b, c],
 backgroundColor: [
 'rgb(0,0,139)',
 'rgb(63,105,255)',
 'rgb(135,206,235)'
 ],
 hoverOffset: 4
 }]
 };
 const config = {
 type: 'doughnut',
 data: data,
 options: {
 plugins: {
 legend: {
 position: 'right', // Positions the legend to the right
 align: 'start', // Aligns the legend items vertically
 labels: {
 padding: 20 // Adds padding between legend items
 }
 }
 }
 }
 };
 myChart = new Chart(
 document.getElementById('myChart'),
 config
 );
 }
}
