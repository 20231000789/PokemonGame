//  Log "Hello World" to the console
console.log("Hello World");

// Step 4: Create a "trainer" object using object literals
let trainer = {
    name: "Rowne",
    age: 23,
    activePokemon: null,
    pokemonTeam: [],
    // Method to train a Pokemon
    trainPokemon: function(pokemon) {
        console.log(`${this.name} is training ${pokemon.name}!`);
        pokemon.levelUp();
    },
    // Method to switch active Pokémon
    switchPokemon: function(index) {
        if (index >= 0 && index < this.pokemonTeam.length) {
            this.activePokemon = this.pokemonTeam[index];
            console.log(`${this.name} switched to ${this.activePokemon.name}!`);
        } else {
            console.log("Invalid Pokémon index!");
        }
    },
    // Method to attack opponent's Pokémon
    attackOpponent: function(opponent) {
        if (this.activePokemon && opponent.activePokemon) {
            this.activePokemon.attack(opponent.activePokemon);
        } else {
            console.log("No active Pokémon to attack!");
        }
    },
    // Method to display Pokémon team and their stats
    viewPokemonTeam: function() {
        console.log(`${this.name}'s Pokémon Team:`);
        this.pokemonTeam.forEach((pokemon, index) => {
            console.log(`${index + 1}. ${pokemon.name} (Level ${pokemon.level}) - Health: ${pokemon.health}`);
        });
    },
    // Method to start a battle
    startBattle: function(opponentTrainer) {
        console.log(`${this.name} starts a battle with ${opponentTrainer.name}!`);
        if (!this.activePokemon) {
            console.log("No active Pokémon to start the battle!");
            return;
        }
        this.activePokemon = this.pokemonTeam[0]; // Assume first Pokémon is active for simplicity
        let opponentPokemon = opponentTrainer.pokemonTeam[0]; // Assume first Pokémon is active for simplicity

        // Add an active Pokémon to the opponent's team
        opponentTrainer.activePokemon = opponentTrainer.pokemonTeam[0];

        // Continue the battle until one side's Pokémon faints
        while (this.activePokemon && opponentPokemon) {
            // Trainer's turn
            let action = prompt("Select an action: attack or switch");
            if (action === "attack") {
                // Player attacks opponent
                this.attackOpponent(opponentTrainer);
                // Check if opponent's Pokémon fainted after the attack
                if (opponentPokemon.health <= 0) {
                    console.log(`${opponentPokemon.name} fainted!`);
                    opponentPokemon = null;
                    this.activePokemon.addExp(50); // Reward the active Pokemon with experience points
                    break;
                }
                // Opponent's turn
                opponentTrainer.attackOpponent(this);
                // Check if trainer's Pokémon fainted after the attack
                if (this.activePokemon.health <= 0) {
                    console.log(`${this.activePokemon.name} fainted!`);
                    this.activePokemon = null;
                    break;
                }
            } else if (action === "switch") {
                this.viewPokemonTeam();
                let index = parseInt(prompt("Select a Pokémon to switch to (1, 2, etc.)")) - 1;
                this.switchPokemon(index);
            } else {
                console.log("Invalid action!");
                continue;
            }
        }
        console.log("Battle ended!");
    }
};

// Constructor function for creating pokemon
function Pokemon(name, level, health) {
    this.name = name;
    this.level = level;
    this.health = health;
    this.exp = 0; // Initialize experience points
    // Define the levelUp method
    this.levelUp = function() {
        console.log(`${this.name} leveled up! New level: ${this.level}`);
    };
    // Define the attack method
    this.attack = function(opponent) {
        console.log(`${this.name} attacks ${opponent.name}!`);
        opponent.health -= 10; // Decrease opponent's health
        console.log(`${opponent.name}'s health is now ${opponent.health}`);
    };
    // Method to add experience points
    this.addExp = function(exp) {
        this.exp += exp;
        console.log(`${this.name} gained ${exp} experience points!`);
        this.checkLevelUp();
    };
    // Method to check and level up
    this.checkLevelUp = function() {
        if (this.exp >= this.level * 100) {
            this.level++;
            this.exp = 0; // Reset experience points after leveling up
            console.log(`${this.name} leveled up! New level: ${this.level}`);
        }
    };
}

// Instantiate several pokemon using the constructor function
let pikachu = new Pokemon("Pikachu", 10, 100);
let dorara = new Pokemon("Dorara", 8, 90);

// Initialize/add trainer object properties
trainer.pokemonTeam.push(pikachu);
trainer.pokemonTeam.push(dorara);

// Example usage of battle feature
let opponentTrainer = {
    name: "Opponent",
    pokemonTeam: [new Pokemon("Dorara", 8, 90)], // Change this to include Dorara
    activePokemon: null, // Initialize activePokemon to null
    switchPokemon: function(index) {
        if (index >= 0 && index < this.pokemonTeam.length) {
            this.activePokemon = this.pokemonTeam[index];
            console.log(`${this.name} switched to ${this.activePokemon.name}!`);
        } else {
            console.log("Invalid Pokémon index!");
        }
    },
    attackOpponent: function(opponent) {
        if (this.activePokemon && opponent.activePokemon) {
            this.activePokemon.attack(opponent.activePokemon);
        } else {
            console.log("No active Pokémon to attack!");
        }
    },
};

// Instantly switch to the first Pokémon in the opponent's team
opponentTrainer.switchPokemon(0);
