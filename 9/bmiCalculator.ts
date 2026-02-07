const calculateBmi = (height: number, weight: number) => {
    if ((weight / (height / 100)**2) < 18.5) {
        return 'low range'
     } else if ((weight / (height / 100)**2) < 25) {
        return 'normal range'
     } else if ((weight / (height / 100)**2) < 30) {
        return 'high range'
     } else {
        return 'highest range'
     }
}

console.log(calculateBmi(180, 100))