
interface ReturnObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


const calculateExcercises = (dailyHours: number[], target: number): ReturnObject => {
  
    let sum = 0;
    dailyHours.forEach(dh => { sum += dh});

    let rate = 1;
    let rateDesc = '';

    if ((sum/dailyHours.length) >= target){
        rate = rate + 2;
        rateDesc = 'Good Job! Keep it going!'
    } else if ((sum/dailyHours.length) >= (target/2)) {
        rate = rate + 1;
        rateDesc = 'Not too bad, but could be better.'
    } else {
        rateDesc = 'The only way now is up :)'
    }



    return {
        periodLength: Number(dailyHours.length),
        trainingDays: Number(dailyHours.filter((dh) => dh > 0).length),
        success: Boolean((sum/dailyHours.length) >= target),
        rating: Number(rate),
        ratingDescription: String(rateDesc),
        target: Number(target),
        average: Number(sum / dailyHours.length)
    }
    
}

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 2))
