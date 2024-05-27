#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

let player1 = "";
let player2 = "";
let playerName = "";
let playerScore = 0;
let opponentScore = 0;

async function initialize() {
  let answer = await inquirer.prompt({
    name: "player_Name",
    type: "input",
    message: "What is your name?",
    default() {
      return "player";
    },
  });

  playerName = answer.player_Name;

  console.log(chalk.green.inverse(`\t Hello ${playerName}, hope you will enjoy the game!!!\n`));

  let answers = await inquirer.prompt({
    name: "select",
    type: "list",
    message: "Select one of the players:",
    choices: ["Spiderman", "Batman", "Superman", "Hulk"],
  });

  if (answers.select === "Spiderman") {
    player1 = answers.select;
    console.log(
      chalk.redBright.bold(
        "\t\n You selected to play with Spiderman and he often disguises in red dress"
      )
    );
  } else if (answers.select === "Batman") {
    player1 = answers.select;
    console.log(
      chalk.blue.bold(
        "\t\n You selected to play with Batman and he often disguises in blue dress"
      )
    );
  } else if (answers.select === "Superman") {
    player1 = answers.select;
    console.log(
      chalk.blue.bold(
        "\t\n You selected to play with Superman and he often disguises in blue dress"
      )
    );
  } else if (answers.select === "Hulk") {
    player1 = answers.select;
    console.log(
      chalk.green.bold(
        "\t\n You selected to play with Hulk and he is a well known green monster"
      )
    );
  }

  const spinner = createSpinner(
    "In order to continue playing, first, you need to have a potion, as a player fuel"
  ).start();
  console.log("\n");

  console.log(chalk.cyanBright.inverse(`\t\n You selected to play with ${answers.select}`));
  console.log("\n");

  setTimeout(async () => {
    spinner.success();
    await promptForPotion();
    await selectOpponent();
    await repeatFaceoff();
  }, 1000);
}

console.log(chalk.yellowBright.inverse("\t -*-*-*- Welcome to the Adventure Game -*-*-*-"));
console.log("")
console.log(chalk.blueBright.inverse("\t Before proceeding further, you must enter your name:\n"));
await initialize();

async function promptForPotion() {
  let potionAnswer = await inquirer.prompt({
    name: "selectPotion",
    type: "list",
    message: "Select one of the following:",
    choices: ["Grapes", "Apple", "WaterMelon", "Pomegranate"],
  });

  if (potionAnswer.selectPotion === "Grapes") {
    console.log(
      "\t\n Your fuel level is 70%",
      chalk.green.inverse("---------------")
    );
  } else if (potionAnswer.selectPotion === "Apple") {
    console.log(
      "\t\n Your fuel level is 80%",
      chalk.magenta.inverse("----------------")
    );
  } else if (potionAnswer.selectPotion === "WaterMelon") {
    console.log(
      "\t\n Your fuel level is 90%",
      chalk.red.inverse("----------------------")
    );
  } else if (potionAnswer.selectPotion === "Pomegranate") {
    console.log(
      "\t\n Your fuel level is 100%",
      chalk.yellow.inverse("-------------------------")
    );
  }
}

async function selectOpponent() {
  let opponent = await inquirer.prompt({
    name: "selectOppo",
    type: "list",
    message: "Select one of the following:",
    choices: ["Loki", "Thanos", "Green Goblin", "Ultron"],
  });

  if (opponent.selectOppo === "Loki") {
    player2 = opponent.selectOppo;
    console.log(
      chalk.blue.inverse("\t You selected Loki as an Opponent"),
      chalk.yellow.italic("\t\n remember Loki is a mischievous opponent")
    );
  } else if (opponent.selectOppo === "Thanos") {
    player2 = opponent.selectOppo;
    console.log(chalk.red.inverse("\t You selected Thanos as Opponent"),chalk.green.italic(
      "\t\n Thanos is very powerful, you must be strong enough to face him")
    );
  } else if (opponent.selectOppo === "Green Goblin") {
    player2 = opponent.selectOppo;
    console.log(chalk.yellow.inverse("\t You selected Green Goblin as Opponent"),chalk.blueBright.italic(
      "\t\n The Green Goblin possesses a deceptive personality and is a cheater, be careful to face him!")
    );
  } else if (opponent.selectOppo === "Ultron") {
    player2 = opponent.selectOppo;
    console.log(chalk.cyanBright.inverse("\t You selected Ultron as Opponent"),chalk.yellow.italic(
      chalk.redBright.italic(
        "\t\n Ultron is a high tech robotic machine, you must be witty and quick to defeat him!")
      )
    );
  }
}

async function faceoff() {
  console.log(chalk.greenBright.inverse("\n It's time to Faceoff\n"));
  console.log(`\t${chalk.cyanBright(player1)} vs ${chalk.redBright(player2)}\n`);

  let confront = await inquirer.prompt({
    name: 'fight',
    type: 'list',
    message: chalk.yellow.bold("select fight mode:"),
    choices: ["punch in the face", "kick at the heart", "jump to counteract"]
  });

  const outcome = Math.random();
  let playerWin = false;
  if (outcome > 0.5) {
    playerWin = true;
  }

  switch (confront.fight) {
    case "punch in the face":
      console.log("\t You attempt a punch in the face!");
      if (playerWin) {
        console.log("\t It lands successfully!");
      } else {
        console.log("\t The opponent dodges!");
      }
      break;
    case "kick at the heart":
      console.log("\t You try to kick at the heart!");
      if (playerWin) {
        console.log("\t It's a direct hit!");
      } else {
        console.log("\t The opponent blocks it!");
      }
      break;
    case "jump to counteract":
      console.log("\t You jump to counteract!");
      if (playerWin) {
        console.log("\t It was a great move, you landed an attack!");
      } else {
        console.log("\t The opponent anticipated your move!");
      }
      break;
  }
  console.log("");

  if (playerWin) {
    console.log(chalk.green("\t You won this round!"));
    playerScore++;
  } else {
    console.log(chalk.red("\t You lost this round!"));
    opponentScore++;
  }

  console.log(chalk.yellowBright(`\nScore: ${playerName}: ${playerScore}, Opponent: ${opponentScore}\n`));
}

async function repeatFaceoff() {
  let playAgain = true;
  while (playAgain) {
    await faceoff();
    let playAgainAnswer = await inquirer.prompt({
      name: "playAgain",
      type: "confirm",
      message: "Do you want to play another round?",
      default: true,
    });
    playAgain = playAgainAnswer.playAgain;
  }
  console.log(chalk.blueBright("\nThank you for playing! I hope you enjoyed the game.\n"));
}
