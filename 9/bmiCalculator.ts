interface Values {
  height: number;
  weight: number;
}

const parseArgs = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (height: number, weight: number) => {
   let bmi = (weight / (height / 100)**2);

    if (bmi < 18.5) {
        console.log('low range');
     } else if (bmi < 25) {
        console.log('normal range');
     } else if (25 < bmi && bmi < 30) {
        console.log('high range');
     } else {
        console.log('highest range');
     }
}


try {
  const { height, weight } = parseArgs(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}