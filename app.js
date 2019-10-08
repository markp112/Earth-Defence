class Alien {
    constructor(type, hitPoints, damage, hasDiedGraphic, isLivingGraphic) {
        this.type = type;
        this.hitPoints = hitPoints;
        this.damage = damage;
        this.hasDiedGraphic = hasDiedGraphic;
        this.isLivingGraphic = isLivingGraphic;
    }

    takesHit() {
        this.hitPoints =
            (this.hitPoints -= this.damage) < 0
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
        return this._invasionFleet.filter(invader.type === MOTHERSHIP).isDead;
    }
}

const MotherShip = "Mothership";
const Bomber = "Bomber";
const Fighter = "Fighter";

const initInvasionFleet = () => {
    let invasionFleet = new AlienIvasion();
    let mothership = new Alien(MotherShip, 80, 7, "XxXxX", "T--VoVoV--T");
    invasionFleet.addToFleet(mothership);

    for (bombers = 0; bombers < 6; bombers++) {
        let bomber = new Alien(Bomber, 68, 10, "XxxXXxxX", "+--OO--+");
        invasionFleet.addToFleet(bomber);
    }

    for (fighters = 0; fighters < 8; fighters++) {
        let fighter = new Alien(Fighter, 60, 12, "xxXXxx", "--OO--");
        invasionFleet.addToFleet(fighter);
    }

    console.log("TCL: initInvasionFleet ->  invasionFleet", invasionFleet);
    return invasionFleet;
};

const displayMothership = mothership => {
    $("#mothership").text(
        mothership[0].isLivingGraphic + mothership[0].hitPoints
    );
};

const displayBombers = bombers => {
    $("#bombers span").empty();
    $("#bombers span").each((index, spanTag) => {
        console.log("TCL: spanTag", spanTag);

        const isDead = bombers[index].isDead;
        const hitPoints = bombers[index].hitPoints;
        const bomberImg = isDead
            ? bombers[index].hasDiedGraphic
            : bombers[index].isLivingGraphic;
        spanTag.append(bomberImg + " " + hitPoints);
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

        spanTag.append(fighterImg + " " + hitPoints);
    });
};

const displayPlayer = () => {
    $("#player div").append("^^^");
};

const displayInvasionFleet = invasionFleet => {
    displayMothership(
        invasionFleet.filter(mothership => mothership.type === MotherShip)
    );
    displayBombers(invasionFleet.filter(ship => ship.type === Bomber));
    displayFighters(invasionFleet.filter(ship => ship.type === Fighter));
};

const fireLasers = () => {
    spaceArmada.damageInvader();
    
    displayInvasionFleet(spaceArmada.invasionFleet);
    if(spaceArmada.filter(alien => alien.type=MotherShip)){
        displayGameOver();
        endGame()
    }


    
};

let spaceArmada;

$(document).ready(() => {
    spaceArmada = initInvasionFleet();

    displayInvasionFleet(spaceArmada.invasionFleet);
    displayPlayer();
});
