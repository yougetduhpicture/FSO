
interface ReturnObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface InputValues {
    target: number;
    dailyHours: number[];
}

const parser = (args: string[]): InputValues => {
   let dh:number[] = [];
   const relevantArgs = args.slice(3);

   relevantArgs.map((x) => {
    if (!isNaN(parseFloat(String(x)))){
      dh.push(parseFloat(x));
    }
   }
   )
  if (!isNaN(Number.parseFloat(args[2]))) {
    
    return {
      target: Number.parseFloat(args[2]),
      dailyHours: dh
    }
  } else {
    throw new Error('here Provided values were not numbers!');
  }
}


const calculateExcercises = (target: number, dailyHours: number[]): ReturnObject => {
  
    let sum = 0;
    dailyHours.forEach(a => { sum += a});

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



   console.log( {
        periodLength: Number(dailyHours.length),
        trainingDays: Number(dailyHours.filter((dh) => dh > 0).length),
        success: Boolean((sum/dailyHours.length) >= target),
        rating: Number(rate),
        ratingDescription: String(rateDesc),
        target: Number(target),
        average: Number(sum / dailyHours.length)
    })
    return{
        periodLength: Number(dailyHours.length),
        trainingDays: Number(dailyHours.filter((dh) => dh > 0).length),
        success: Boolean((sum/dailyHours.length) >= target),
        rating: Number(rate),
        ratingDescription: String(rateDesc),
        target: Number(target),
        average: Number(sum / dailyHours.length)
    }
    
}


try {
  const { target, dailyHours } = parser(process.argv);
  calculateExcercises(target, dailyHours);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
