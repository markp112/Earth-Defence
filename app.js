//constant definitions for repeated text
const MotherShip = "Mothership";
const Bomber = "Bomber";
const Fighter = "Fighter";

class Alien {
    isDead = false;
    constructor(type, hitPoints, damage, hasDiedGraphic, isLivingGraphic) {
        this.type = type;
        this.hitPoints = hitPoints;
        this.damage = damage;
        this.hasDiedGraphic = hasDiedGraphic;
        this.isLivingGraphic = isLivingGraphic;
    }

    takesHit() {
        this.hitPoints =
            (this.hitPoints -= this.damage) <= 0
                ? 0
                : (this.hitPoints -= this.damage);
        this.isDead = this.hitPoints === 0;
    }
}

// class Mothership extends Alien {
//     type = "Mothership"
//     hitPoints = 80;
//     damage = 7;
// }

// class Bomber extends Alien {
//     type = "Bomber"
//     hitPoints = 68;
//     damage = 10;
// }

// class Fighter extends Alien {
//     type = "Fighter"
//     hitPoints = 60;
//     damage = 12;
// }

class AlienIvasion {
    _invasionFleet = [];

    get invasionFleet() {
        return this._invasionFleet;
    }

    addToFleet(invader) {
        this._invasionFleet.push(invader);
    }

    damageInvader() {
        const aliensLeft = this._invasionFleet.filter(
            invader => !invader.isDead
        ).length;
        const index = Math.floor(Math.random() * aliensLeft);
        this._invasionFleet[index].takesHit();
    }

    isQueenDead() {
        const mothership = this._invasionFleet.filter(
            invader => invader.type === "Mothership"
        );

        return mothership[0].isDead;
    }
}

const initInvasionFleet = () => {
    let invasionFleet = new AlienIvasion();
    let mothership = new Alien(MotherShip, 80, 7);
    invasionFleet.addToFleet(mothership);

    for (bombers = 0; bombers < 6; bombers++) {
        let bomber = new Alien(
            Bomber,
            68,
            10
    
        );
        invasionFleet.addToFleet(bomber);
    }

    for (fighters = 0; fighters < 8; fighters++) {
        let fighter = new Alien(Fighter, 60, 12);
        invasionFleet.addToFleet(fighter);
    }
    return invasionFleet;
};

const displayMothership = mothership => {
    $("#mothership span").empty();
    $("#mothership span").append(
        mothership[0].hitPoints
    );
};

const displayBombers = bombers => {
    $("#bombers span").empty();
    $("#bombers span").each((index, spanTag) => {
        const isDead = bombers[index].isDead;
        const hitPoints = bombers[index].hitPoints;
        const bomberImg = isDead
            ? bombers[index].hasDiedGraphic
            : bombers[index].isLivingGraphic;
        spanTag.append(hitPoints);
    });
};

const displayFighters = fighters => {
    $("#fighters span").empty();

    $("#fighters span").each((index, spanTag) => {
        const isDead = fighters[index].isDead;
        const hitPoints = fighters[index].hitPoints;
        const fighterImg = isDead
            ? fighters[index].hasDiedGraphic
            : fighters[index].isLivingGraphic;

        spanTag.append(hitPoints);
    });
};

const displayPlayer = () => {
};

const displayInvasionFleet = invasionFleet => {
    displayMothership(
        invasionFleet.filter(mothership => mothership.type === MotherShip)
    );
    displayBombers(invasionFleet.filter(ship => ship.type === Bomber));
    displayFighters(invasionFleet.filter(ship => ship.type === Fighter));
};

const displayGameOver = () => {
    console.log("End of Game");
    $("#winning-message").removeClass("hidden");
    $("#winning-message").addClass("visible");
};

const fireLasers = () => {
console.log("TCL: fireLasers -> fireLasers", fireLasers)
        
    spaceArmada.damageInvader();

    displayInvasionFleet(spaceArmada.invasionFleet);
    console.log(
        "TCL: fireLasers -> spaceArmada.isQueenDead",
        spaceArmada.isQueenDead()
    );

    if (spaceArmada.isQueenDead()) {
        displayGameOver();
        // endGame();
    }
};

let spaceArmada;

const startGame = () =>{
    spaceArmada = initInvasionFleet();
    $("#winning-message").addClass("hidden");
    displayInvasionFleet(spaceArmada.invasionFleet);
    displayPlayer();
}
$(document).ready(() => {
    startGame();
});
