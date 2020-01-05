export const CONSTANT_PARAMS = {
    START_WORKING_HOUR: 9,
    END_WORKING_HOUR: 19,
    OUT_OF_STOCK_AMOUNT: 0 
};

export const convertDateToTime = (date) => {
    var dateVal = null;

    if (date) {
        dateVal = Date.parse(date)
    } else {
        return '00:00'
    }
    
    
    return new Date(dateVal).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
      });;
}