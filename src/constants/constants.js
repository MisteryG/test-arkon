// funciones que se usan para ambos contenedores, relativos al tiempo
export const secondsToString = (seconds) => {
    //funcion para convertir de segundos a horas
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour + ':' + minute + ':' + second;
}

export const arrayToSeconds = (array) => {
    // funcion donde se convierte el string de tiempo en segundos
    let setterTime = array.split(':')
    return (parseInt(setterTime[0])*3600)+(parseInt(setterTime[1])*60)+parseInt(setterTime[2])
}