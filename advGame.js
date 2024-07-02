#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let monsters = ["Skeleton", "Zombie", "Warriors", "Assasin"];
let maxMonsterHealth = 125;
let monsterAttackDamage = 50;
let playerHealth = 150;
let attackDamage = 75;
let numHealthPotions = 5;
let healthPortionHealAmount = 50;
let healthPortionDropChance = 70; // Percent
let playerLevel = 1;
let running = true;
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min) + min;
};
console.log(chalk.yellowBright.bold("\t\t>>>>>====================================>>>>>"));
console.log(chalk.yellowBright.bold("\t\t         Welcome to the Monster House"));
console.log(chalk.yellowBright.bold("\t\t>>>>>====================================>>>>>"));
Game: while (running) {
    console.log(chalk.yellowBright.bold("\t-----------------------------\n"));
    let monsterHealth = getRandomNumber(1, maxMonsterHealth);
    let monster = monsters[getRandomNumber(0, monsters.length - 1)];
    console.log(chalk.bgGreenBright.bold(`\t${monster} has appeared\n`));
    console.log(chalk.yellowBright.bold("\t-----------------------------\n"));
    while (monsterHealth > 0) {
        console.log(chalk.bgRedBright.bold(`\tYour HP: ${playerHealth}`));
        console.log(chalk.bgRedBright.bold(`\t${monster} HP: ${monsterHealth}`));
        let control = await inquirer.prompt([
            {
                name: "cammand",
                type: "list",
                message: (chalk.blueBright.bold("\n\tWhat would you like to do?\n")),
                choices: ["\tAttack", "\tDrink Health Potion", "\tRun"],
            }
        ]);
        switch (control.cammand) {
            case "\tAttack":
                let strikeDamage = getRandomNumber(1, attackDamage);
                let damageTaken = getRandomNumber(1, monsterAttackDamage);
                playerHealth -= damageTaken;
                monsterHealth -= strikeDamage;
                console.log(chalk.green.bold(`\tYou strike the ${monster} with ${strikeDamage} damage.`));
                console.log(chalk.green.bold(`\tYou received ${damageTaken} damage from the ${monster}.\n`));
                if (playerHealth < 1) {
                    console.log(chalk.blue.bold(`\tYou have taken too much damage. You are too weak to go on.`));
                    break;
                }
                break;
            case "\tDrink Health Potion":
                if (numHealthPotions > 0) {
                    playerHealth += healthPortionHealAmount;
                    numHealthPotions--;
                    console.log(chalk.green.bold(`\tYou drink health potion, healing yourself for ${healthPortionDropChance}`));
                    console.log(chalk.yellowBright.bold(`\n\tYou now have ${playerHealth} HP\n\tYou now have ${numHealthPotions} health potion(s) left.\n`));
                }
                else {
                    console.log(chalk.red.bold(`\tYou have no health potions left, defeat monsters for a chance to get one.`));
                }
                break;
            case "\tRun":
                console.log(chalk.red.bold(`\n\tYou ran away from the ${monster}.`));
                continue Game;
                break;
        }
    }
    if (playerHealth < 1) {
        console.log(chalk.bgRedBright.bold(`\tYou limp out of the monster house, you weak for battle`));
        break;
    }
    console.log(chalk.yellowBright.bold(`\t--------------------------------------------.\n`));
    console.log(chalk.red.bold(`\t${monster} has been defeated.`));
    console.log(chalk.red.bold(`\tYou have ${playerHealth} HP left.\n`));
    playerLevel++;
    console.log(chalk.red.bold(`\tNow you enter in level ${playerLevel}.\n`));
    if (getRandomNumber(1, 100) < healthPortionDropChance) {
        numHealthPotions++;
        console.log(chalk.blueBright(`\t${monster} dropped a health potion`));
        console.log(chalk.blueBright(`\tNow you have ${numHealthPotions} health potion(s).`));
    }
    let stateControl = await inquirer.prompt({
        name: "command",
        type: "list",
        message: (chalk.blueBright.bold("\n\tWhat would you like to do?\n")),
        choices: ["\tContinue Fighting", "\t Exit from moster house"],
    });
    if (stateControl.command == "\tContinue Fighting") {
        console.log(chalk.bgYellowBright.bold(`\n\tYour adventure has been continue!`));
    }
    else {
        console.log(chalk.bgGreenBright.bold(`\n\tYou exit the monster house with successfully`));
        break;
    }
}
console.log(chalk.yellowBright.bold(`\n\t\t#############################################`));
console.log(chalk.yellowBright.bold(`\t\t         THANK YOU FOR PLAYING`));
console.log(chalk.yellowBright.bold(`\t\t###############################################`));
