// Goal is to write a application that provides a random stimulant for the day respecting intermittent use and rest days.

// The days with stimulants per week should be between 3-4 days.
// The maximum of days in a row with stimulants should be 3 days.
// The maximum of days for the special stimulant should be 1-2 per month.
// The maximum of days in a row with add-ons should be 3 days.

//Option 1:
// This number of days should be determined on the beginning of the week and saved for the rest of the week.
// The combination of stimulants and add-ons should be generated each day but restricted by the past days.

//Option 2:
// Determine days and stimulants at the beginning of the week and just cycle through it. (Better for testing?)
// Yes. The first click of the week determines the amount of days, the combinations for the days.
// The subsequent button presses will only cycle through these results until the next generation day.
// I.e. First press: generate. Press two to seven: cycle through the results. Press eight: start over.

// In any way the button click should not activate if it is still the same day.

// Amphetamines should only be taken 1-2 times per month.
// On stimulant days it should say: Today you will enjoy the stimulant: [stimulant] and the add-on: [add-on].
// On days without stimulants or add-ons it should say: Today you will enjoy pure life. Careful!

//How choose the days per week only once per week on Mondays? Execute getDate() only on Mondays. Save the result but don't tell the user.
//Where to store the value of the days per week?
//How to make the stimulants and special stimulants mutually exclusive?
//Do I want to press the button each day or only once per week?

// First Version - Commented Out

const regularStimulants = ["caffeine", "modafinil"];
const addOns = ["nicotine", "niacin"];
const specials = ["low-dose amphetamines 1", "low-dose amphetamines 2"];

function chooseStimulant() {

    const useSpecial = Math.random() < 1 / 15;  // max. 2 times per month

    let stimulant, special;

    if (useSpecial) {
        stimulant = "nothing";
        special = specials[Math.floor(Math.random() * specials.length)];

    } else {
        stimulant = regularStimulants[Math.floor(Math.random() * regularStimulants.length)];
        special = "nothing";

    }
    
    const addOn = addOns[Math.floor(Math.random() * addOns.length)];

    return {stimulant, special, addOn};
}

// const result = chooseStimulant();
// console.log(`Stimulant: ${result.stimulant}, Add-on: ${result.addOn}, Special: ${result.special}, Days per week: ${daysPerWeek}`);

// // ...existing code for arrays and constants...

function generateWeekPlan() {
    
    const daysPerWeek = 3 + Math.floor(Math.random() * 2);
    console.log(`Days per week: ${daysPerWeek}`);

    const weekPlan = Array(7).fill(null);
    
    const stimulantDays = new Set();
    while (stimulantDays.size < daysPerWeek) {
        stimulantDays.add(Math.floor(Math.random() * 7));
    }
    
    for (let i = 0; i < 7; i++) {
        if (stimulantDays.has(i)) {
            weekPlan[i] = chooseStimulant();
        } else {
            weekPlan[i] = { stimulant: "nothing", addOn: "nothing", special: "nothing" };
        }
    }
    
    return weekPlan;
}

const weekPlan = generateWeekPlan();
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const today = new Date().getDay();
const adjustedDay = today === 0 ? 6 : today - 1;

if (weekPlan[adjustedDay].special === "nothing") {

    console.log(`This ${dayNames[adjustedDay]} you shall enjoy ${weekPlan[adjustedDay].stimulant}, with a side of ${weekPlan[adjustedDay].addOn}.`);

} else {

    console.log(`This ${dayNames[adjustedDay]} you have the privilege to fry your brain with ${weekPlan[adjustedDay].special}.`);

}

// Optional: Display full week plan
console.table(weekPlan.map((day, index) => ({
    Day: dayNames[index],
    Stimulant: day.stimulant,
    "Add-on": day.addOn,
    Special: day.special
})));

