function CBR_XML_Daily_Ru(rates) {
    var EURrate = rates.Valute.EUR.Value.toFixed(4);
    var EUR = document.getElementById('euro');
    EUR.value = `${EURrate}`;
};